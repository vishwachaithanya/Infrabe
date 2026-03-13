import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "../config/database";
import { usersTable } from "../models";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt";
import { seedUserData } from "./seedService";

export async function loginUser(email: string, password: string) {
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (users.length === 0) {
    throw new Error("Invalid credentials");
  }

  const user = users[0];
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return { token, consumerName: user.name, userId: user.id };
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }
  console.log("here come")

//   const existing = await db.select().from(usersTable).limit(1)
//   .then(() => console.log("✅ Database Connected Successfully"))
//   .catch((err) => console.log("❌ Database Connection Failed:", err.message));
// console.log("2")
  // if (existing.length > 0) {
  //   throw new Error("Email already registered");
  // }

  const hashedPassword = await bcrypt.hash(password, 10);
  const meterNumber = `METER-${Date.now().toString().slice(-8)}`;

  // FIX: MySQL returns a result object header instead of the row data.
  // We destructure the first element to get the 'insertId'.
  const [result] = await db
    .insert(usersTable)
    .values({ 
      name, 
      email, 
      password: hashedPassword, 
      meterNumber 
    });

  // result.insertId is the ID created by MySQL for the new user
  const newUserId = result.insertId;

  // Pass the ID and name to your seed service
  await seedUserData(newUserId, name);

  return { message: "Registration successful. Please login." };
}
import { eq } from "drizzle-orm";
import { db } from "../config/database";
import { usersTable } from "../models";

export async function getUserProfile(userId: number) {
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  if (users.length === 0) throw new Error("User not found");

  const user = users[0];
  
  // Return fields that exist in your models/index.ts
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    meterNumber: user.meterNumber,
  };
}

export async function updateUserProfile(
  userId: number,
  updates: { name?: string; phone?: string; address?: string }
) {
  // 1. Perform the update (MySQL returns a result header, not the row)
  await db
    .update(usersTable)
    .set(updates)
    .where(eq(usersTable.id, userId));

  // 2. Fetch the updated user to return the new data
  const updatedUser = await getUserProfile(userId);

  return updatedUser;
}
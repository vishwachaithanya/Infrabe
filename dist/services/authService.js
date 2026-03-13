"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = loginUser;
exports.registerUser = registerUser;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const drizzle_orm_1 = require("drizzle-orm");
const database_1 = require("../config/database");
const models_1 = require("../models");
const jwt_1 = require("../config/jwt");
const seedService_1 = require("./seedService");
async function loginUser(email, password) {
    const users = await database_1.db
        .select()
        .from(models_1.usersTable)
        .where((0, drizzle_orm_1.eq)(models_1.usersTable.email, email))
        .limit(1);
    if (users.length === 0) {
        throw new Error("Invalid credentials");
    }
    const user = users[0];
    const passwordMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error("Invalid credentials");
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, jwt_1.JWT_SECRET, {
        expiresIn: jwt_1.JWT_EXPIRES_IN,
    });
    return { token, consumerName: user.name, userId: user.id };
}
async function registerUser(name, email, password, confirmPassword) {
    if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }
    console.log("here come");
    //   const existing = await db.select().from(usersTable).limit(1)
    //   .then(() => console.log("✅ Database Connected Successfully"))
    //   .catch((err) => console.log("❌ Database Connection Failed:", err.message));
    // console.log("2")
    // if (existing.length > 0) {
    //   throw new Error("Email already registered");
    // }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const meterNumber = `METER-${Date.now().toString().slice(-8)}`;
    // FIX: MySQL returns a result object header instead of the row data.
    // We destructure the first element to get the 'insertId'.
    const [result] = await database_1.db
        .insert(models_1.usersTable)
        .values({
        name,
        email,
        password: hashedPassword,
        meterNumber
    });
    // result.insertId is the ID created by MySQL for the new user
    const newUserId = result.insertId;
    // Pass the ID and name to your seed service
    await (0, seedService_1.seedUserData)(newUserId, name);
    return { message: "Registration successful. Please login." };
}

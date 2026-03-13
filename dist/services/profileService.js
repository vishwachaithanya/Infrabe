"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = getUserProfile;
exports.updateUserProfile = updateUserProfile;
const drizzle_orm_1 = require("drizzle-orm");
const database_1 = require("../config/database");
const models_1 = require("../models");
async function getUserProfile(userId) {
    const users = await database_1.db
        .select()
        .from(models_1.usersTable)
        .where((0, drizzle_orm_1.eq)(models_1.usersTable.id, userId))
        .limit(1);
    if (users.length === 0)
        throw new Error("User not found");
    const user = users[0];
    // Return fields that exist in your models/index.ts
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        meterNumber: user.meterNumber,
    };
}
async function updateUserProfile(userId, updates) {
    // 1. Perform the update (MySQL returns a result header, not the row)
    await database_1.db
        .update(models_1.usersTable)
        .set(updates)
        .where((0, drizzle_orm_1.eq)(models_1.usersTable.id, userId));
    // 2. Fetch the updated user to return the new data
    const updatedUser = await getUserProfile(userId);
    return updatedUser;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserNotifications = getUserNotifications;
const drizzle_orm_1 = require("drizzle-orm");
const database_1 = require("../config/database");
const models_1 = require("../models");
async function getUserNotifications(userId) {
    const notifications = await database_1.db
        .select()
        .from(models_1.notificationsTable)
        .where((0, drizzle_orm_1.eq)(models_1.notificationsTable.userId, userId))
        .orderBy(models_1.notificationsTable.createdAt);
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    return {
        notifications: notifications.reverse().map((n) => ({
            id: n.id,
            title: n.title,
            description: n.description,
            type: n.type,
            isRead: n.isRead,
            createdAt: n.createdAt?.toISOString(),
        })),
        unreadCount,
    };
}

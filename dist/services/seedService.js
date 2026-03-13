"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUserData = seedUserData;
const database_1 = require("../config/database");
const models_1 = require("../models");
async function seedUserData(userId, name) {
    // 1. Initial Meter Data
    await database_1.db.insert(models_1.meterDataTable).values({
        userId,
        currentReading: "0.00",
        status: "active"
    });
    // 2. 30 Days of Usage History
    for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        const value = (8 + Math.random() * 8).toFixed(2);
        await database_1.db.insert(models_1.usageHistoryTable).values({ userId, date: dateStr, value });
    }
    // 3. Initial Alerts
    await database_1.db.insert(models_1.alertsTable).values([
        { userId, serialNumber: "ALT-001", meterSerialNumber: `MTR-${userId}001`, consumerName: name, alertType: "Low Balance" },
        { userId, serialNumber: "ALT-002", meterSerialNumber: `MTR-${userId}002`, consumerName: name, alertType: "Bill Due" }
    ]);
    // 4. Initial Notifications
    await database_1.db.insert(models_1.notificationsTable).values([
        { userId, title: "Welcome", description: "Welcome to the Infra app!", type: "info", isRead: false }
    ]);
}

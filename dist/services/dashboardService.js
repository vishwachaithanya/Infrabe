"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = getDashboardData;
const drizzle_orm_1 = require("drizzle-orm");
const database_1 = require("../config/database");
const models_1 = require("../models");
async function getDashboardData(userId) {
    // 1. Fetch User and Meter details (Joins users + meter_data)
    const [userData] = await database_1.db
        .select({
        userName: models_1.usersTable.name,
        meterNumber: models_1.usersTable.meterNumber, // From your 'users' table screenshot
        meterStatus: models_1.meterDataTable.status,
        lastSync: models_1.meterDataTable.lastUpdated,
        // Add balance/dueAmount columns here if they exist in your meter_data table
    })
        .from(models_1.usersTable)
        .leftJoin(models_1.meterDataTable, (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(models_1.meterDataTable.userId, models_1.usersTable.id)))
        .where((0, drizzle_orm_1.eq)(models_1.usersTable.id, userId))
        .limit(1);
    // 2. Fetch usage history (Maps 'value' to Number)
    const history = await database_1.db
        .select()
        .from(models_1.usageHistoryTable)
        .where((0, drizzle_orm_1.eq)(models_1.usageHistoryTable.userId, userId))
        .orderBy((0, drizzle_orm_1.desc)(models_1.usageHistoryTable.date))
        .limit(7);
    // 3. Fetch recent alerts
    const recentAlerts = await database_1.db
        .select()
        .from(models_1.alertsTable)
        .where((0, drizzle_orm_1.eq)(models_1.alertsTable.userId, userId))
        .orderBy((0, drizzle_orm_1.desc)(models_1.alertsTable.createdAt))
        .limit(5);
    // 4. Transform to match your 'DashboardData' Interface EXACTLY
    return {
        consumerName: userData?.userName || "Consumer",
        meterNumber: userData?.meterNumber || "N/A",
        balance: 0.00, // Replace with actual column if added to DB
        dueAmount: 0.00, // Replace with actual column if added to DB
        dueDate: "", // Replace with actual column if added to DB
        lastCommunication: userData?.lastSync || new Date().toISOString(),
        // Mocked stats (or calculate these from history)
        monthlyUsage: 120.5,
        avgDailyUsage: 4.2,
        peakUsage: 15.9,
        // Map history and ensure 'value' is a Number for the graph
        usageHistory: history.map((h) => ({
            date: h.date,
            value: Number(h.value), // Crucial: Converts string "8.84" to number 8.84
        })),
        // Map alerts to match frontend keys
        alerts: recentAlerts.map((a) => ({
            id: a.id,
            serialNumber: a.serialNumber,
            meterSerialNumber: userData?.meterNumber || "N/A",
            consumerName: userData?.userName || "Consumer",
            alertType: a.alertType,
            createdAt: a.createdAt,
        })),
    };
}

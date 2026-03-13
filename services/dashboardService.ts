import { eq, and, desc } from "drizzle-orm";
import { db } from "../config/database";
import { meterDataTable, usageHistoryTable, alertsTable, usersTable } from "../models";

export async function getDashboardData(userId: number) {
  // 1. Fetch User and Meter details (Joins users + meter_data)
  const [userData] = await db
    .select({
      userName: usersTable.name,
      meterNumber: usersTable.meterNumber, // From your 'users' table screenshot
      meterStatus: meterDataTable.status,
      lastSync: meterDataTable.lastUpdated,
      // Add balance/dueAmount columns here if they exist in your meter_data table
    })
    .from(usersTable)
    .leftJoin(
        meterDataTable, 
        and(
            eq(meterDataTable.userId, usersTable.id),
        )
    )
    .where(eq(usersTable.id, userId))
    .limit(1);

  // 2. Fetch usage history (Maps 'value' to Number)
  const history = await db
    .select()
    .from(usageHistoryTable)
    .where(eq(usageHistoryTable.userId, userId))
    .orderBy(desc(usageHistoryTable.date))
    .limit(7);

  // 3. Fetch recent alerts
  const recentAlerts = await db
    .select()
    .from(alertsTable)
    .where(eq(alertsTable.userId, userId))
    .orderBy(desc(alertsTable.createdAt))
    .limit(5);

  // 4. Transform to match your 'DashboardData' Interface EXACTLY
  return {
    consumerName: userData?.userName || "Consumer",
    meterNumber: userData?.meterNumber || "N/A",
    balance: 0.00, // Replace with actual column if added to DB
    dueAmount: 0.00, // Replace with actual column if added to DB
    dueDate: "",     // Replace with actual column if added to DB
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
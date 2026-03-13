import { db } from "../config/database";
import { usageHistoryTable, alertsTable, notificationsTable, meterDataTable } from "../models";

export async function seedUserData(userId: number, name: string) {
  // 1. Initial Meter Data
  await db.insert(meterDataTable).values({
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
    await db.insert(usageHistoryTable).values({ userId, date: dateStr, value });
  }

  // 3. Initial Alerts
  await db.insert(alertsTable).values([
    { userId, serialNumber: "ALT-001", meterSerialNumber: `MTR-${userId}001`, consumerName: name, alertType: "Low Balance" },
    { userId, serialNumber: "ALT-002", meterSerialNumber: `MTR-${userId}002`, consumerName: name, alertType: "Bill Due" }
  ]);

  // 4. Initial Notifications
  await db.insert(notificationsTable).values([
    { userId, title: "Welcome", description: "Welcome to the Infra app!", type: "info", isRead: false }
  ]);
}
import { mysqlTable, serial, varchar, text, int, datetime, boolean, decimal } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  meterNumber: varchar("meter_number", { length: 50 }).unique(),
});

export const alertsTable = mysqlTable("alerts", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  serialNumber: varchar("serial_number", { length: 50 }),
  meterSerialNumber: varchar("meter_serial_number", { length: 50 }),
  consumerName: varchar("consumer_name", { length: 255 }),
  alertType: varchar("alert_type", { length: 100 }),
  createdAt: datetime("created_at").default(new Date()),
});

export const notificationsTable = mysqlTable("notifications", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  type: varchar("type", { length: 100 }),
  isRead: boolean("is_read").default(false),
  createdAt: datetime("created_at").default(new Date()),
});

export const usageHistoryTable = mysqlTable("usage_history", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  date: varchar("date", { length: 20 }),
  value: decimal("value", { precision: 10, scale: 2 }),
});

export const meterDataTable = mysqlTable("meter_data", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  currentReading: decimal("current_reading", { precision: 10, scale: 2 }).default("0.00"),
  status: varchar("status", { length: 50 }).default("active"),
  lastUpdated: datetime("last_updated").default(new Date()),
});
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meterDataTable = exports.usageHistoryTable = exports.notificationsTable = exports.alertsTable = exports.usersTable = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
exports.usersTable = (0, mysql_core_1.mysqlTable)("users", {
    id: (0, mysql_core_1.serial)("id").primaryKey(),
    name: (0, mysql_core_1.varchar)("name", { length: 255 }).notNull(),
    email: (0, mysql_core_1.varchar)("email", { length: 255 }).notNull().unique(),
    password: (0, mysql_core_1.text)("password").notNull(),
    meterNumber: (0, mysql_core_1.varchar)("meter_number", { length: 50 }).unique(),
});
exports.alertsTable = (0, mysql_core_1.mysqlTable)("alerts", {
    id: (0, mysql_core_1.serial)("id").primaryKey(),
    userId: (0, mysql_core_1.int)("user_id").notNull(),
    serialNumber: (0, mysql_core_1.varchar)("serial_number", { length: 50 }),
    meterSerialNumber: (0, mysql_core_1.varchar)("meter_serial_number", { length: 50 }),
    consumerName: (0, mysql_core_1.varchar)("consumer_name", { length: 255 }),
    alertType: (0, mysql_core_1.varchar)("alert_type", { length: 100 }),
    createdAt: (0, mysql_core_1.datetime)("created_at").default(new Date()),
});
exports.notificationsTable = (0, mysql_core_1.mysqlTable)("notifications", {
    id: (0, mysql_core_1.serial)("id").primaryKey(),
    userId: (0, mysql_core_1.int)("user_id").notNull(),
    title: (0, mysql_core_1.varchar)("title", { length: 255 }).notNull(),
    description: (0, mysql_core_1.text)("description").notNull(),
    type: (0, mysql_core_1.varchar)("type", { length: 100 }),
    isRead: (0, mysql_core_1.boolean)("is_read").default(false),
    createdAt: (0, mysql_core_1.datetime)("created_at").default(new Date()),
});
exports.usageHistoryTable = (0, mysql_core_1.mysqlTable)("usage_history", {
    id: (0, mysql_core_1.serial)("id").primaryKey(),
    userId: (0, mysql_core_1.int)("user_id").notNull(),
    date: (0, mysql_core_1.varchar)("date", { length: 20 }),
    value: (0, mysql_core_1.decimal)("value", { precision: 10, scale: 2 }),
});
exports.meterDataTable = (0, mysql_core_1.mysqlTable)("meter_data", {
    id: (0, mysql_core_1.serial)("id").primaryKey(),
    userId: (0, mysql_core_1.int)("user_id").notNull(),
    currentReading: (0, mysql_core_1.decimal)("current_reading", { precision: 10, scale: 2 }).default("0.00"),
    status: (0, mysql_core_1.varchar)("status", { length: 50 }).default("active"),
    lastUpdated: (0, mysql_core_1.datetime)("last_updated").default(new Date()),
});

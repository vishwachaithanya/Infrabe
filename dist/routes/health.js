"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const router = (0, express_1.Router)();
router.get("/healthz", async (_req, res) => {
    try {
        // 1. Test the MySQL connection
        // Note: Use pool.execute for simple heartbeats to bypass the query cache
        await database_1.pool.query("SELECT 1");
        // 2. Return success
        res.json({
            status: "ok",
            database: "connected",
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
        // 3. If DB is down, return a 503 Service Unavailable
        console.error("Health check failed:", error.message);
        res.status(503).json({
            status: "error",
            message: "Database connection failed"
        });
    }
});
exports.default = router;

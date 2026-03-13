"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = getDashboard;
const dashboardService_1 = require("../services/dashboardService");
async function getDashboard(req, res) {
    try {
        const data = await (0, dashboardService_1.getDashboardData)(req.userId);
        res.json(data);
    }
    catch (err) {
        const isNotFound = err.message === "User not found";
        res.status(isNotFound ? 404 : 500).json({
            error: isNotFound ? "Not found" : "Internal server error",
            message: err.message,
        });
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotifications = getNotifications;
const notificationService_1 = require("../services/notificationService");
async function getNotifications(req, res) {
    try {
        const result = await (0, notificationService_1.getUserNotifications)(req.userId);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error", message: err.message });
    }
}

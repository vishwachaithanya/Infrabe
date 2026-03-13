"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
const profileService_1 = require("../services/profileService");
async function getProfile(req, res) {
    try {
        const profile = await (0, profileService_1.getUserProfile)(req.userId);
        res.json(profile);
    }
    catch (err) {
        res.status(err.message === "User not found" ? 404 : 500).json({
            error: "Error",
            message: err.message,
        });
    }
}
async function updateProfile(req, res) {
    try {
        const { name, phone, address } = req.body;
        const updated = await (0, profileService_1.updateUserProfile)(req.userId, { name, phone, address });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error", message: err.message });
    }
}

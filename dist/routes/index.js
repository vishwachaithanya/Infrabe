"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const dashboard_1 = __importDefault(require("./dashboard"));
const health_1 = __importDefault(require("./health"));
const notifications_1 = __importDefault(require("./notifications"));
const profile_1 = __importDefault(require("./profile"));
const auth_2 = require("../middleware/auth");
const router = (0, express_1.Router)();
// 1. Public Routes (No token needed)
router.use("/health", health_1.default);
router.use("/auth", auth_1.default);
// 2. Protected Routes (Token Required)
// Applying authMiddleware here protects all routes below it
router.use("/dashboard", auth_2.authMiddleware, dashboard_1.default);
router.use("/notifications", auth_2.authMiddleware, notifications_1.default);
router.use("/profile", auth_2.authMiddleware, profile_1.default);
exports.default = router;

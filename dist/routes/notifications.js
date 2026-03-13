"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const notificationsController_1 = require("../controllers/notificationsController");
const router = (0, express_1.Router)();
router.get("/alerts", auth_1.authMiddleware, notificationsController_1.getNotifications);
exports.default = router;

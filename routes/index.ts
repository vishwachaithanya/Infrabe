import { Router } from "express";
import authRoutes from "./auth";
import dashboardRoutes from "./dashboard";
import healthRoutes from "./health";
import notificationsRoutes from "./notifications";
import profileRoutes from "./profile";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// 1. Public Routes (No token needed)
router.use("/health", healthRoutes);
router.use("/auth", authRoutes);

// 2. Protected Routes (Token Required)
// Applying authMiddleware here protects all routes below it
router.use("/dashboard", authMiddleware, dashboardRoutes);
router.use("/notifications", authMiddleware, notificationsRoutes);
router.use("/profile", authMiddleware, profileRoutes);

export default router;
import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { getNotifications } from "../controllers/notificationsController";

const router = Router();

router.get("/alerts", authMiddleware, getNotifications);

export default router;

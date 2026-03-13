import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { getDashboard } from "../controllers/dashboardController";

const router = Router();

router.get("/home", authMiddleware, getDashboard);

export default router;

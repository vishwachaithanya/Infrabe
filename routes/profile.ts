import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { getProfile, updateProfile } from "../controllers/profileController";

const router = Router();

router.get("/getRecord", authMiddleware, getProfile);
router.put("/updateRecord", authMiddleware, updateProfile);

export default router;

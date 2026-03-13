import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { getUserNotifications } from "../services/notificationService";

export async function getNotifications(req: AuthRequest, res: Response): Promise<void> {
  try {
    const result = await getUserNotifications(req.userId!);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: "Internal server error", message: err.message });
  }
}

import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { getDashboardData } from "../services/dashboardService";

export async function getDashboard(req: AuthRequest, res: Response): Promise<void> {
  try {
    const data = await getDashboardData(req.userId!);
    res.json(data);
  } catch (err: any) {
    const isNotFound = err.message === "User not found";
    res.status(isNotFound ? 404 : 500).json({
      error: isNotFound ? "Not found" : "Internal server error",
      message: err.message,
    });
  }
}

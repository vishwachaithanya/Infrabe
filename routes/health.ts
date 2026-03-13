import { Router, Request, Response } from "express";
import { pool } from "../config/database"; 

const router: Router = Router();

router.get("/healthz", async (_req: Request, res: Response) => {
  try {
    // 1. Test the MySQL connection
    // Note: Use pool.execute for simple heartbeats to bypass the query cache
    await pool.query("SELECT 1");

    // 2. Return success
    res.json({ 
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    // 3. If DB is down, return a 503 Service Unavailable
    console.error("Health check failed:", error.message);
    res.status(503).json({ 
      status: "error", 
      message: "Database connection failed" 
    });
  }
});

export default router;
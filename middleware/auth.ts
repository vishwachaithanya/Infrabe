import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt";

// This interface allows other files to know req.userId exists
export interface AuthRequest extends Request {
  userId?: number;
}

export function authMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ 
      error: "Unauthorized", 
      message: "No token provided" 
    });
    return; 
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    
    // We cast to AuthRequest here so we can attach the userId
    (req as AuthRequest).userId = decoded.userId;
    
    next();
  } catch (error) {
    res.status(401).json({ 
      error: "Unauthorized", 
      message: "Invalid or expired token" 
    });
  }
}
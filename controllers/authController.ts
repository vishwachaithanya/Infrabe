import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/authService";

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Validation error", message: "Email and password are required" });
      return;
    }

    const result = await loginUser(email.trim().toLowerCase(), password);
    res.json(result);
  } catch (err: any) {
    const isAuthError = err.message === "Invalid credentials";
    res.status(isAuthError ? 401 : 500).json({
      error: isAuthError ? "Unauthorized" : "Internal server error",
      message: err.message,
    });
  }
}

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      res.status(400).json({ error: "Validation error", message: "Please fill all fields" });
      return;
    }

    const result = await registerUser(name, email.trim().toLowerCase(), password, confirmPassword);
    res.status(201).json(result);
  } catch (err: any) {
    const isConflict = err.message === "Email already registered";
    const isValidation = err.message === "Passwords do not match";
    res.status(isConflict || isValidation ? 400 : 500).json({
      error: isConflict ? "Conflict" : "Validation error",
      message: err.message,
    });
  }
}

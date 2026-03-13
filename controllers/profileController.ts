// import { "" } from "express";
import { AuthRequest } from "../middleware/auth";
import { getUserProfile, updateUserProfile } from "../services/profileService";

export async function getProfile(req: AuthRequest, res:any): Promise<void> {
  try {
    const profile = await getUserProfile(req.userId!);
    res.json(profile);
  } catch (err: any) {
    res.status(err.message === "User not found" ? 404 : 500).json({
      error: "Error",
      message: err.message,
    });
  }
}

export async function updateProfile(req: AuthRequest, res: any): Promise<void> {
  try {
    const { name, phone, address } = req.body;
    const updated = await updateUserProfile(req.userId!, { name, phone, address });
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: "Internal server error", message: err.message });
  }
}

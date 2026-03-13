"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
function authMiddleware(req, res, next) {
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
        const decoded = jsonwebtoken_1.default.verify(token, jwt_1.JWT_SECRET);
        // We cast to AuthRequest here so we can attach the userId
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(401).json({
            error: "Unauthorized",
            message: "Invalid or expired token"
        });
    }
}

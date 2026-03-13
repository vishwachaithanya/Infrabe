"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.register = register;
const authService_1 = require("../services/authService");
async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Validation error", message: "Email and password are required" });
            return;
        }
        const result = await (0, authService_1.loginUser)(email.trim().toLowerCase(), password);
        res.json(result);
    }
    catch (err) {
        const isAuthError = err.message === "Invalid credentials";
        res.status(isAuthError ? 401 : 500).json({
            error: isAuthError ? "Unauthorized" : "Internal server error",
            message: err.message,
        });
    }
}
async function register(req, res) {
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (!name || !email || !password || !confirmPassword) {
            res.status(400).json({ error: "Validation error", message: "Please fill all fields" });
            return;
        }
        const result = await (0, authService_1.registerUser)(name, email.trim().toLowerCase(), password, confirmPassword);
        res.status(201).json(result);
    }
    catch (err) {
        const isConflict = err.message === "Email already registered";
        const isValidation = err.message === "Passwords do not match";
        res.status(isConflict || isValidation ? 400 : 500).json({
            error: isConflict ? "Conflict" : "Validation error",
            message: err.message,
        });
    }
}

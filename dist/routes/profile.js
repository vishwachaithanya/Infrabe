"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const profileController_1 = require("../controllers/profileController");
const router = (0, express_1.Router)();
router.get("/getRecord", auth_1.authMiddleware, profileController_1.getProfile);
router.put("/updateRecord", auth_1.authMiddleware, profileController_1.updateProfile);
exports.default = router;

import express from "express";
import { registerOrganization } from "../controllers/organizationController.js";
import { protect, requireAdmin } from "../middleware/authMiddleware.js"; // Assuming you have these middlewares

const router = express.Router();

router.route("/").post(protect, requireAdmin, registerOrganization); // Only accessible by admin or masterAdmin

export default router;

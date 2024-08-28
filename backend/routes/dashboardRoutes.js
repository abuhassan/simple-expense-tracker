import express from "express";
import { protect, requireRole } from "../middleware/authMiddleware.js";
import {
  getDashboard,
  getAdminPanel,
} from "../controllers/dashboardController.js";

const router = express.Router();

// Route for all users to access their dashboard
router.route("/dashboard").get(protect, getDashboard);

// Admin-only route for accessing the admin panel
router
  .route("/admin")
  .get(protect, requireRole("admin", "masterAdmin"), getAdminPanel);

export default router;

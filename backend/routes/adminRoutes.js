import express from "express";
import {
  getUsers,
  getAllTransactions,
} from "../controllers/adminController.js";
import { protect, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/users").get(protect, requireAdmin, getUsers);
router.route("/transactions").get(protect, requireAdmin, getAllTransactions);

export default router;

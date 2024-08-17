import express from "express";
const router = express.Router();
import {
  getMe,
  loginUser,
  registerUser,
  getAllUsers, // New controller to get all users
} from "../controllers/userController.js";
import { protect, requireAdmin } from "../middleware/authMiddleware.js";

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/all", protect, requireAdmin, getAllUsers); // New route to get all users

export default router;

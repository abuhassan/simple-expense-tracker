import express from "express";
const router = express.Router();
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transactions.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getTransactions).post(protect, addTransaction);

router
  .route("/:id")
  .delete(protect, deleteTransaction)
  .put(protect, updateTransaction);

export default router;

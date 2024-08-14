import express from "express";
const router = express.Router();
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transactions.js";

router.route("/").get(getTransactions).post(addTransaction);

router.route("/:id").delete(deleteTransaction).put(updateTransaction);

export default router;

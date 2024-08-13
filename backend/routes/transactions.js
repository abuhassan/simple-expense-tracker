import express from "express";
const router = express.Router();
import {
  getTransactions,
  addTransactions,
  deleteTransactions,
} from "../controllers/transactions.js";

router.route("/").get(getTransactions).post(addTransactions);

router.route("/:id").delete(deleteTransactions);

export default router;

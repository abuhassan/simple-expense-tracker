import Transaction from "../models/Transaction.js";
import asyncHandler from "express-async-handler";
// @desc get all transactions
// @route GET /api/transactions
// @access Public

export const getTransactions = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: "GET transactions" });
});
// @desc add transaction
// @route POST /api/transactions
// @access Public

export const addTransaction = asyncHandler(async (req, res, next) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.status(200).json({ message: `Add transaction` });
});

// @desc update transaction
// @route PUT /api/transactions/:id
// @access Public

export const updateTransaction = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: `Update transaction ${req.params.id}` });
});
// @desc delete transaction
// @route DELETE /api/transactions/:id
// @access Public

export const deleteTransaction = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: `Delete transaction ${req.params.id}` });
});

import Transaction from "../models/Transaction.js";
// import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import transactionEmitter from "../events.js";

// @desc get all transactions
// @route GET /api/transactions
// @access Public

export const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id });

  res.status(200).json(transactions);
});
// @desc add a new transaction
// @route POST /api/transactions
// @access Public

export const addTransaction = asyncHandler(async (req, res) => {
  const { description, amount, date } = req.body;

  const newTransaction = new Transaction({
    description,
    amount,
    date,
    user: req.user._id, // Add the user to the transaction
  });

  const savedTransaction = await newTransaction.save();

  transactionEmitter.emit("newTransaction", savedTransaction);

  res.status(201).json(savedTransaction);
});

// @desc update transaction
// @route PUT /api/transactions/:id
// @access Public

export const updateTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  const user = await User.findById(req.user._id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if the user is the owner of the transaction
  if (transaction.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not authorized to update this transaction");
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedTransaction);
});
// @desc delete transaction
// @route DELETE /api/transactions/:id
// @access Public

export const deleteTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  const user = await User.findById(req.user._id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check if the user is the owner of the transaction
  if (transaction.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not authorized to delete this transaction");
  }

  await Transaction.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

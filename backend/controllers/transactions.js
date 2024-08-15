import Transaction from "../models/Transaction.js";
import asyncHandler from "express-async-handler";
import transactionEmitter from "../events.js";

// @desc get all transactions
// @route GET /api/transactions
// @access Public

export const getTransactions = asyncHandler(async (req, res, next) => {
  const transactions = await Transaction.find();

  res.status(200).json(transactions);
});
// @desc add a new transaction
// @route POST /api/transactions
// @access Public

export const addTransaction = asyncHandler(async (req, res, next) => {
  const { description, amount: rawAmount, date } = req.body;

  // Convert the amount to a number
  const amount = Number(rawAmount);

  console.log("Received description: ", description);

  console.log("Received amount: ", amount);
  console.log("Is amount a number? ", typeof amount === "number");

  if (typeof amount !== "number" || isNaN(amount)) {
    res.status(400).json({ message: "Amount must be a valid number" });
    return;
  }

  const newTransaction = new Transaction({
    description,
    amount,
    date,
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

  await Transaction.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

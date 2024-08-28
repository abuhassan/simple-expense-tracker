import asyncHandler from "express-async-handler";
import Transaction from "../models/transactionModel.js"; // Assuming you have a transaction model
import User from "../models/userModel.js"; // Assuming you might need user data for the admin panel

// @desc Get the user's dashboard data
// @route GET /dashboard
// @access Private
export const getDashboard = asyncHandler(async (req, res) => {
  // Fetch transactions or any other data specific to the logged-in user
  const transactions = await Transaction.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    data: {
      transactions,
      message: `Welcome to your dashboard, ${req.user.name}!`,
    },
  });
});

// @desc Get admin panel data
// @route GET /admin
// @access Private (Admin Only)
export const getAdminPanel = asyncHandler(async (req, res) => {
  // Fetch data relevant to the admin, such as all users or all transactions
  const users = await User.find({});
  const transactions = await Transaction.find({});

  res.status(200).json({
    success: true,
    data: {
      users,
      transactions,
      message: `Welcome to the admin panel, ${req.user.name}!`,
    },
  });
});

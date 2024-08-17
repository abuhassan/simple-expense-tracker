import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc register new user
// @route POST /api/users
// @access Public

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
// @desc register new user
// @route POST /api/users
// @access Public

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});
// @desc Get user data
// @route GET /api/users/me
// @access Private

export const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user._id);

  res.status(200).json({
    _id,
    name,
    email,
  });
});

// @desc Get all users (Admin only)
// @route GET /api/users/all
// @access Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

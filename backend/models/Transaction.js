import mongoose from "mongoose";
import User from "./UserModel.js";

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },

  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  amount: {
    type: Number,
    required: [true, "Please add a positive or negative number"],
    validate: {
      validator: function (value) {
        return !isNaN(value); // Ensures the value is a number
      },
      message: "Please add a positive or negative number",
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;

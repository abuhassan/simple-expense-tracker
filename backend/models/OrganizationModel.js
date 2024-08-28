import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to User model
      },
    ],
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;

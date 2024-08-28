import asyncHandler from "express-async-handler";
import Organization from "../models/organizationModel.js";

// @desc Register a new organization
// @route POST /api/organizations
// @access Private (Admin or MasterAdmin only)
export const registerOrganization = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Organization name is required");
  }

  // Check if organization already exists
  const orgExists = await Organization.findOne({ name });

  if (orgExists) {
    res.status(400);
    throw new Error("Organization already exists");
  }

  // Create new organization
  const organization = await Organization.create({
    name,
    description,
    user: req.user._id, // Assuming the user creating the organization is stored in req.user
  });

  if (organization) {
    res.status(201).json({
      _id: organization._id,
      name: organization.name,
      description: organization.description,
      user: organization.users,
    });
  } else {
    res.status(400);
    throw new Error("Invalid organization data");
  }
});

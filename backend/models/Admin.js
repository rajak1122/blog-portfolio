const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    role: {
      type: String,
      enum: ["super_admin", "admin"],
      required: true,
      default: "admin",
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "revoked"],
      required: true,
      default: "active",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Admin", adminSchema);

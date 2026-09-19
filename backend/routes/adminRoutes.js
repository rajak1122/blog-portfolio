const express = require("express");
const Admin = require("../models/Admin");

const auth = require("../config/firebaseAdmin");

const authenticateUser = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/adminMiddleware");
const requireSuperAdmin = require("../middleware/superAdminMiddleware");

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  requireAdmin,
  requireSuperAdmin,
  async (req, res) => {
    try {
      const { firebaseUid } = req.body;

      if (!firebaseUid) {
        return res.status(400).json({
          message: "Firebase UID is required",
        });
      }

      // Check whether Firebase user actually exists
      const firebaseUser = await auth.getUser(firebaseUid);

      // Check whether user is already an admin
      const existingAdmin = await Admin.findOne({
        firebaseUid,
      });

      if (existingAdmin) {
        return res.status(409).json({
          message: "User is already an admin",
        });
      }

      // Create admin
      const admin = await Admin.create({
        firebaseUid: firebaseUser.uid,
        name: firebaseUser.displayName || "Admin",
        email: firebaseUser.email,
        role: "admin",
        status: "active",
      });

      res.status(201).json({
        message: "Admin created successfully",
        admin,
      });
    } catch (error) {
      console.error("Create admin error:", error);

      res.status(500).json({
        message: "Failed to create admin",
      });
    }
  },
);

router.get("/", authenticateUser, requireAdmin, async (req, res) => {
  try {
    const admins = await Admin.find().select("-__v");

    res.status(200).json({
      admins,
    });
  } catch (error) {
    console.error("Fetch admins error:", error);

    res.status(500).json({
      message: "Failed to fetch admins",
    });
  }
});

router.patch(
  "/:id/revoke",
  authenticateUser,
  requireAdmin,
  requireSuperAdmin,
  async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id);

      if (!admin) {
        return res.status(404).json({
          message: "Admin not found",
        });
      }

      if (admin.role === "super_admin") {
        return res.status(403).json({
          message: "Super admin cannot be revoked",
        });
      }

      admin.status = "revoked";

      await admin.save();

      res.status(200).json({
        message: "Admin access revoked successfully",
        admin,
      });
    } catch (error) {
      console.error("Revoke admin error:", error);

      res.status(500).json({
        message: "Failed to revoke admin access",
      });
    }
  },
);

module.exports = router;

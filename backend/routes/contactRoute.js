const express = require("express");

const Contact = require("../models/Contact");

const authenticateUser = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/adminMiddleware");
const requireSuperAdmin = require("../middleware/superAdminMiddleware");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = await Contact.create({
      name,
      email,
      message,
    });
    res.status(201).json({
      message: "Contact saved sucessfully",
      contact: newContact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save contact message",
      error: error.message,
    });
  }
});

router.get("/", authenticateUser, requireAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      contacts,
    });
  } catch (error) {
    console.error("Fetch contacts error:", error);

    res.status(500).json({
      message: "Failed to fetch contact messages",
    });
  }
});

router.patch(
  "/:id/status",
  authenticateUser,
  requireAdmin,
  async (req, res) => {
    try {
      const { status } = req.body;

      if (!["pending", "completed"].includes(status)) {
        return res.status(400).json({
          message: "Invalid status",
        });
      }

      const contact = await Contact.findById(req.params.id);

      if (!contact) {
        return res.status(404).json({
          message: "Contact response not found",
        });
      }

      contact.status = status;

      await contact.save();

      res.status(200).json({
        message: "Contact status updated successfully",
        contact,
      });
    } catch (error) {
      console.error("Update contact status error:", error);

      res.status(500).json({
        message: "Failed to update contact status",
      });
    }
  },
);

router.delete(
  "/:id",
  authenticateUser,
  requireAdmin,
  requireSuperAdmin,
  async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);

      if (!contact) {
        return res.status(404).json({
          message: "Contact response not found",
        });
      }

      await Contact.findByIdAndDelete(req.params.id);

      res.status(200).json({
        message: "Contact response deleted successfully",
      });
    } catch (error) {
      console.error("Delete contact error:", error);

      res.status(500).json({
        message: "Failed to delete contact response",
      });
    }
  },
);

module.exports = router;

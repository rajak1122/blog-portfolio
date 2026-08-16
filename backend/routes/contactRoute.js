const express = require("express");
const Contact = require("../models/Contact");

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

module.exports = router;

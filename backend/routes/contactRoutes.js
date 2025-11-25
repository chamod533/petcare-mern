const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();

    res.json({ message: "Message saved successfully" });
  } catch (err) {
    console.error("Contact save error:", err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

module.exports = router;

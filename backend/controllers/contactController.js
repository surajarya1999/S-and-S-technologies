const Contact = require("../models/Contact");

// @desc    Submit new contact message
// @route   POST /api/contacts
// @access  Public
const createContact = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newContact = await Contact.create({
      fullName,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Your message has been submitted successfully!",
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all contact submissions (For Admin)
// @route   GET /api/contacts
// @access  Private/Admin
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createContact, getContacts };
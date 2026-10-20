const Feedback = require("../models/Feedback");

// @desc    Get all approved feedbacks (For Website Display)
// @route   GET /api/feedbacks
const getApprovedFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ isApproved: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: feedbacks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all feedbacks (For Admin Dashboard)
// @route   GET /api/feedbacks/all
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: feedbacks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Submit new feedback from client
// @route   POST /api/feedbacks
const createFeedback = async (req, res) => {
  try {
    const { clientName, companyOrRole, rating, comment } = req.body;

    if (!clientName || !rating || !comment) {
      return res.status(400).json({ success: false, message: "Please fill all required fields." });
    }

    const feedback = await Feedback.create({
      clientName,
      companyOrRole,
      rating,
      comment,
      isApproved: false, // Default pending for admin review
    });

    res.status(201).json({
      success: true,
      message: "Thank you for your feedback! It will be published after review.",
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Approve/Reject Feedback (Admin)
// @route   PATCH /api/feedbacks/:id/status
const toggleApproveFeedback = async (req, res) => {
  try {
    const { isApproved } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ success: false, message: "Feedback not found" });
    }

    res.status(200).json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getApprovedFeedbacks,
  getAllFeedbacks,
  createFeedback,
  toggleApproveFeedback,
};
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    companyOrRole: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    isApproved: { type: Boolean, default: false }, // Admin approval flag
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
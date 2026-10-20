const express = require("express");
const router = express.Router();
const {
  getApprovedFeedbacks,
  getAllFeedbacks,
  createFeedback,
  toggleApproveFeedback,
} = require("../controllers/feedbackController");

router.get("/", getApprovedFeedbacks);
router.get("/all", getAllFeedbacks);
router.post("/", createFeedback);
router.patch("/:id/status", toggleApproveFeedback);

module.exports = router;
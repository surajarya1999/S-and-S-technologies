const express = require("express");
const router = express.Router();
const { getProjects, createProject, deleteProject } = require("../controllers/projectController");
const upload = require("../middleware/uploadMiddleware");

// Handles 2 image file fields: image1 and image2
const cpUpload = upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
]);

router.get("/", getProjects);
router.post("/", cpUpload, createProject);
router.delete("/:id", deleteProject);

module.exports = router;
const Project = require("../models/Project");

// @desc    Get all projects
// @route   GET /api/projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new project with 2 images
// @route   POST /api/projects
const createProject = async (req, res) => {
  try {
    const { title, description, category, liveLink, githubLink, featured } = req.body;

    if (!req.files || !req.files.image1 || !req.files.image2) {
      return res.status(400).json({
        success: false,
        message: "Please upload both Image 1 and Image 2",
      });
    }

    const image1 = req.files.image1[0].path;
    const image2 = req.files.image2[0].path;

    const project = await Project.create({
      title,
      description,
      category,
      image1,
      image2,
      liveLink,
      githubLink,
      featured: featured === "true",
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully!",
      data: project,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProjects, createProject, deleteProject };
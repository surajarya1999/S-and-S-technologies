const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, // e.g., Next.js, Full-Stack
    image1: { type: String, required: true }, // Cloudinary Image 1 URL
    image2: { type: String, required: true }, // Cloudinary Image 2 URL
    liveLink: { type: String },
    githubLink: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
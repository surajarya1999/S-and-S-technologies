const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database/db");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000", "https://sns-web-technologies.vercel.app/"], // Local aur Vercel dono ke liye
  credentials: true
}));


// Routes (Exact file path ke sath)
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/feedbacks", require("./routes/feedbackRoutes"));


if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

app.get('/', (req, res) => {
  res.send('API is running successfully! 🚀');
});

module.exports = app;
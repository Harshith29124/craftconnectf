const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const apiRoutes = require("./src/routes/api");

// --- INITIALIZATION ---
const app = express();
const PORT = process.env.PORT || 5001;

// --- MIDDLEWARE ---
const corsOptions = {
  origin: process.env.CLIENT_URL, // Allow requests from your frontend URL
  credentials: true, // Allow cookies to be sent with requests
};
app.use(cors(corsOptions));
app.use(express.json());

// --- DATABASE CONNECTION ---
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- API ROUTES ---
app.use("/api", apiRoutes);

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`🔧 Google Cloud Project: ${process.env.GOOGLE_PROJECT_ID}`);
});

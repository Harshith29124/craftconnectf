const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import your existing controller
const {
  analyzeBusinessAudio,
} = require("./src/controllers/aiBusinessAnalyzer");

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Rate limiting - adjusted for development
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === "development" ? 100 : 50, // More lenient in dev
  message: {
    success: false,
    error: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Configure multer for audio uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    console.log(
      "File upload - mimetype:",
      file.mimetype,
      "originalname:",
      file.originalname
    );

    // Accept audio files and common audio formats
    const allowedMimes = [
      "audio/webm",
      "audio/wav",
      "audio/mp3",
      "audio/mpeg",
      "audio/ogg",
      "audio/mp4",
      "video/webm", // Sometimes audio is sent as video/webm
    ];

    if (
      allowedMimes.includes(file.mimetype) ||
      file.originalname.endsWith(".webm")
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Invalid file type: ${file.mimetype}. Only audio files are allowed.`
        ),
        false
      );
    }
  },
});

// Logging middleware for debugging
app.use("/api/", (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Request body keys:", Object.keys(req.body));
  }
  next();
});

// Health check endpoint - detailed diagnostics
app.get("/api/health", (req, res) => {
  const health = {
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    services: {
      speech: !!process.env.GOOGLE_APPLICATION_CREDENTIALS,
      vertexai: !!process.env.GOOGLE_PROJECT_ID,
      vision: !!process.env.GOOGLE_APPLICATION_CREDENTIALS,
    },
    google_project: process.env.GOOGLE_PROJECT_ID || "NOT_SET",
    credentials_path: process.env.GOOGLE_APPLICATION_CREDENTIALS || "NOT_SET",
  };

  console.log("Health check requested:", health);
  res.json(health);
});

// Main business analysis endpoint - this uses your existing aiBusinessAnalyzer.js
app.post("/api/analyze-business", upload.single("audio"), (req, res, next) => {
  console.log("=== ANALYZE BUSINESS REQUEST ===");
  console.log(
    "File received:",
    req.file
      ? {
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size,
        }
      : "NO FILE"
  );
  console.log("Body:", req.body);

  // Call your existing controller
  analyzeBusinessAudio(req, res, next);
});

// WhatsApp message generation endpoint (placeholder for now)
app.post(
  "/api/generate-whatsapp-message",
  upload.single("image"),
  (req, res) => {
    console.log("WhatsApp message generation requested");

    // This is a simplified implementation - you can enhance this later
    const { transcription, analysis } = req.body;

    const mockMessage = `🎨 **Traditional Craft Business**

${transcription || "Welcome to our craft business!"}

✨ **What makes us special:**
• Authentic handcrafted products with cultural heritage
• Years of traditional craftsmanship expertise
• Unique designs that blend tradition with modern appeal
• Personalized customer service and custom orders

📱 **Ready to serve you:**
We're passionate about bringing you the finest traditional crafts. Each piece tells a story of dedication, skill, and cultural pride.

*Message us to start your craft journey!* 🙏`;

    res.json({
      success: true,
      polishedMessage: mockMessage,
      imageAnalyzed: !!req.file,
    });
  }
);

// Cost tracking endpoint
app.get("/api/usage-stats", (req, res) => {
  // Mock implementation - you can enhance this with actual tracking
  res.json({
    success: true,
    totalCost: 0.02,
    budgetLimit: 100,
    requestsToday: 5,
    estimatedCostPerRequest: 0.004,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("=== ERROR ===");
  console.error("Error details:", err);
  console.error("Stack trace:", err.stack);

  // Handle different types of errors
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      error: "File upload error",
      details: err.message,
      code: err.code,
    });
  }

  if (err.message && err.message.includes("Invalid file type")) {
    return res.status(400).json({
      success: false,
      error: "Invalid file type",
      details: err.message,
    });
  }

  // Google Cloud API errors
  if (err.code && (err.code === "ENOTFOUND" || err.code === "ECONNREFUSED")) {
    return res.status(503).json({
      success: false,
      error: "Google Cloud API unavailable",
      details: "Unable to connect to Google Cloud services",
    });
  }

  // Default error response
  const isDevelopment = process.env.NODE_ENV === "development";

  res.status(err.status || 500).json({
    success: false,
    error: "Internal server error",
    message: isDevelopment ? err.message : "Something went wrong",
    ...(isDevelopment && { stack: err.stack }),
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
    path: req.originalUrl,
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log("🚀 CraftConnect Backend Server Started");
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`🌍 API available at http://localhost:${PORT}/api`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(
    `🤖 Google Cloud Project: ${process.env.GOOGLE_PROJECT_ID || "NOT_SET"}`
  );
  console.log(
    `🔑 Credentials: ${process.env.GOOGLE_APPLICATION_CREDENTIALS || "NOT_SET"}`
  );

  // Warn about missing configuration
  if (!process.env.GOOGLE_PROJECT_ID) {
    console.warn(
      "⚠️  WARNING: GOOGLE_PROJECT_ID not set in environment variables"
    );
  }
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.warn(
      "⚠️  WARNING: GOOGLE_APPLICATION_CREDENTIALS not set in environment variables"
    );
  }
});

module.exports = app;

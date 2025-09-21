const express = require("express");
const multer = require("multer");
const aiController = require("../controllers/aiController");

const router = express.Router();

// Configure multer for in-memory file storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// --- API ENDPOINTS ---

// Handles audio analysis (Speech-to-Text and Vertex AI)
router.post(
  "/analyze-business",
  upload.single("audio"),
  aiController.analyzeBusinessAudio
);

// Handles WhatsApp message generation
router.post(
  "/generate-whatsapp-message",
  upload.single("image"),
  aiController.generateWhatsAppMessage
);

module.exports = router;

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
  (req, res, next) => {
    console.log("Route /analyze-business hit");
    next();
  },
  upload.single("audio"),
  (req, res, next) => {
    console.log("Multer upload.single(\"audio\") middleware executed");
    if (!req.file) {
      console.log("Multer: No file uploaded");
    } else {
      console.log(`Multer: File uploaded - originalname: ${req.file.originalname}, mimetype: ${req.file.mimetype}, size: ${req.file.size} bytes`);
    }
    next();
  },
  aiController.analyzeBusinessAudio
);

// Handles WhatsApp message generation
router.post(
  "/generate-whatsapp-message",
  upload.single("image"),
  aiController.generateWhatsAppMessage
);

module.exports = router;

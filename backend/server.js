const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { SpeechClient } = require('@google-cloud/speech');
const { PredictionServiceClient } = require('@google-cloud/aiplatform');

console.log("Server.js: Application starting up.");

const apiRoutes = require('./src/routes/api');

// Initialize Google Cloud Speech client
const speech = new SpeechClient();

// Initialize Vertex AI client
const aiplatform = new PredictionServiceClient({
  apiEndpoint: 'us-central1-aiplatform.googleapis.com',
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
console.log(`🌐 CLIENT_URL: ${process.env.CLIENT_URL}`);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`🔧 Google Cloud Project: ${process.env.GOOGLE_CLOUD_PROJECT}`);
});

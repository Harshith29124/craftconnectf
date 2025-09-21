import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 second timeout
});

export const analyzeBusinessAudio = (audioBlob) => {
  const formData = new FormData();
  formData.append("audio", audioBlob, "recording.webm");
  return apiClient.post("/analyze-business", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const generateWhatsAppMessage = (data) => {
  return apiClient.post("/generate-whatsapp-message", data);
};

import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5001/api", // Your backend URL
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

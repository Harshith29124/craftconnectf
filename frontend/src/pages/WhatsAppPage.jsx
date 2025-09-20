import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { generateWhatsAppMessage } from "../services/api";

const WhatsAppPage = () => {
  const location = useLocation();
  const { analysis, transcript } = location.state || {};
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateMessage = async () => {
    setIsLoading(true);
    try {
      const { data } = await generateWhatsAppMessage({
        businessType: analysis.businessType,
        detectedFocus: analysis.detectedFocus,
        transcript: transcript,
      });
      if (data.success) {
        setMessage(data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="whatsapp" className="view active">
      <div className="container">
        <div className="module-header">
          <h1>📱 WhatsApp Business Setup</h1>
        </div>
        <button
          onClick={handleGenerateMessage}
          disabled={isLoading}
          className="btn btn--primary"
        >
          {isLoading ? "Generating..." : "Generate WhatsApp Message"}
        </button>
        {message && (
          <div className="message-preview">
            <div className="message-content" style={{ whiteSpace: "pre-wrap" }}>
              {message}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhatsAppPage;

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { generateWhatsAppMessage } from "../services/api";

const WhatsAppPage = () => {
  const location = useLocation();
  const { analysis, transcript } = location.state || {};
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generationSuccess, setGenerationSuccess] = useState(false);

  const handleGenerateMessage = async () => {
    setIsLoading(true);
    setGenerationSuccess(false);
    try {
      const { data } = await generateWhatsAppMessage({
        businessType: analysis.businessType,
        detectedFocus: analysis.detectedFocus,
        transcript: transcript,
      });
      if (data.success) {
        setMessage(data.message);
        setGenerationSuccess(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy message: ", err);
    }
  };

  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  return (
    <section id="whatsapp" className="view active">
      <div className="container">
        <div className="module-header">
          <h1>📱 WhatsApp Business Setup</h1>
          <p>Generate a personalized WhatsApp message based on your business analysis and easily share it with your contacts.</p>
        </div>

        {!analysis || !transcript ? (
          <div className="info-message">
            <p>Please go to the <a href="/insights">Insights Page</a> first to generate an analysis and transcript.</p>
          </div>
        ) : (
          <div className="whatsapp-controls">
            <button
              onClick={handleGenerateMessage}
              disabled={isLoading || !analysis || !transcript}
              className="btn btn--primary btn--large"
            >
            {isLoading ? "Generating..." : "Generate WhatsApp Message"}
            </button>
            {generationSuccess && (
              <div className="success-message">
                <p>✅ WhatsApp message generated successfully!</p>
              </div>
            )}
            {copySuccess && (
              <div className="copy-success-message">
                <p>📋 Message copied to clipboard!</p>
              </div>
            )}
            {message && (
              <div className="message-preview">
                <div className="message-content" style={{ whiteSpace: "pre-wrap" }}>
                  {message}
                </div>
                <button
                  onClick={handleCopyMessage}
                  className="btn btn--secondary"
                  style={{ marginTop: '1rem' }}
                >
                  📋 Copy Message
                </button>
                <button
                  onClick={openWhatsApp}
                  className="btn btn--primary"
                  style={{ marginTop: '1rem', marginLeft: '10px' }}
                >
                  💬 Open WhatsApp Business
                </button>
              </div>
         )}
       </div>
        )}
      </div>
    </section>
  );
};

export default WhatsAppPage;

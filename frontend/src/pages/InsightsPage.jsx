import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const InsightsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { transcript, analysis } = location.state || {
    transcript: "",
    analysis: null,
  };

  if (!analysis) {
    return (
      <div className="container text-center">
        <h1>No Analysis Data</h1>
        <p>Please go back and record your business description first.</p>
        <button onClick={() => navigate("/")} className="btn btn--primary">
          Go Home
        </button>
      </div>
    );
  }

  const { businessType, detectedFocus, confidence, recommendedSolutions } =
    analysis;

  return (
    <section id="insights" className="view active">
      <div className="container">
        <div className="insights-header">
          <h1>🎯 AI Analysis Results</h1>
          <p>Based on your recording, here are personalized recommendations.</p>
        </div>

        <div className="analysis-summary">{/* Summary card goes here */}</div>

        <div id="solutionsGrid" className="solutions-grid">
          <SolutionCard
            solutionId={recommendedSolutions.primary.id}
            reason={recommendedSolutions.primary.reason}
            isRecommended={true}
          />
          <SolutionCard
            solutionId={recommendedSolutions.secondary.id}
            reason={recommendedSolutions.secondary.reason}
          />
        </div>
      </div>
    </section>
  );
};

const SolutionCard = ({ solutionId, reason, isRecommended = false }) => {
  const details = {
    whatsapp: { icon: "📱", title: "WhatsApp Business" },
    instagram: { icon: "📸", title: "Instagram Marketing" },
    website: { icon: "🌐", title: "Professional Website" },
  };

  return (
    <div className={`solution-card ${isRecommended ? "recommended" : ""}`}>
      {isRecommended && (
        <div className="recommendation-badge">AI Recommended</div>
      )}
      <h3>
        {details[solutionId].icon} {details[solutionId].title}
      </h3>
      <p className="description">{reason}</p>
      <Link to={`/${solutionId}`} className="btn btn--primary">
        Get Started
      </Link>
    </div>
  );
};

export default InsightsPage;

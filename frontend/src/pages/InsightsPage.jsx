import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const InsightsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { transcript, analysis } = location.state || { transcript: "", analysis: null };

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

  const { businessType, detectedFocus, recommendedSolutions } =
    analysis;

  const allSolutionIds = ["whatsapp", "instagram", "website"];
  const primaryId = recommendedSolutions.primary.id;
  const secondaryId = recommendedSolutions.secondary.id;
  const thirdSolutionId = allSolutionIds.find(
    (id) => id !== primaryId && id !== secondaryId
  );

  const thirdSolution = {
    id: thirdSolutionId,
    reason: `Explore ${thirdSolutionId} to expand your reach.`,
  };

  return (
    <section id="insights" className="view active">
      <div className="container">
        <div className="insights-header">
          <h1>🎯 AI Analysis Results</h1>
          <p>Based on your recording, here are personalized recommendations.</p>
        </div>

        <div className="analysis-summary">
          <h2>Summary of Analysis</h2>
          <p><strong>Business Type:</strong> {businessType}</p>
          <p><strong>Detected Focus:</strong> {detectedFocus}</p>
        </div>

        <div id="solutionsGrid" className="solutions-grid">
          <SolutionCard
            solutionId={recommendedSolutions.primary.id}
            reason={recommendedSolutions.primary.reason}
            isRecommended={true}
            analysis={analysis}
            transcript={transcript}
          />
          <SolutionCard
            solutionId={recommendedSolutions.secondary.id}
            reason={recommendedSolutions.secondary.reason}
            analysis={analysis}
            transcript={transcript}
          />
          <SolutionCard
            solutionId={thirdSolution.id}
            reason={thirdSolution.reason}
            analysis={analysis}
            transcript={transcript}
          />
        </div>
      </div>
    </section>
  );
};

const SolutionCard = ({ solutionId, reason, isRecommended = false, analysis, transcript }) => {
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
      <div className="solution-icon">{details[solutionId].icon}</div>
      <h3>{details[solutionId].title}</h3>
      <p className="description">{reason}</p>
      <Link
        to={`/${solutionId}`}
        state={{ analysis, transcript }}
        className={`btn btn--primary ${isRecommended ? "btn--recommended" : ""}`}
      >
        Get Started
      </Link>
    </div>
  );
};

export default InsightsPage;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProgressBar = () => {
  const location = useLocation();
  let currentStep = 1;
  if (location.pathname === "/insights") currentStep = 3;
  if (location.pathname === "/whatsapp") currentStep = 4;

  const steps = ["Record", "Process", "Insights", "Setup"];

  return (
    <div id="progressBar" className="progress-bar">
      <div className="progress-container">
        {steps.map((label, index) => {
          const stepNum = index + 1;
          let stepClass = "progress-step";
          if (stepNum < currentStep) stepClass += " completed";
          if (stepNum === currentStep) stepClass += " active";

          return (
            <div key={stepNum} className={stepClass} data-step={stepNum}>
              <div className="step-circle">{stepNum}</div>
              <span>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div
            className="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <span className="logo-icon">🚀</span>
            <span className="logo-text">CraftConnect</span>
          </div>
        </div>
      </div>
    </header>
  );
};

const Layout = ({ children }) => {
  return (
    <>
      <ProgressBar />
      <Header />
      <main className="main">{children}</main>
    </>
  );
};

export default Layout;

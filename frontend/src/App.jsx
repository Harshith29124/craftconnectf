import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import ProcessingPage from "./components/ProcessingPage";
import BusinessInsights from "./components/BusinessInsights";
import WhatsAppModule from "./components/WhatsAppModule";
import Header from "./components/Header";
import "./App.css";

function App() {
  // State to enforce proper flow - no shortcuts allowed!
  const [hasRecordedAudio, setHasRecordedAudio] = useState(false);
  const [audioProcessed, setAudioProcessed] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [selectedSolution, setSelectedSolution] = useState(null);

  // Load state from sessionStorage on app start
  useEffect(() => {
    const savedAudioData = sessionStorage.getItem("audioProcessed");
    const savedAnalysis = sessionStorage.getItem("analysisData");
    const savedSolution = sessionStorage.getItem("selectedSolution");

    if (savedAudioData === "true") {
      setAudioProcessed(true);
      setHasRecordedAudio(true);
    }

    if (savedAnalysis) {
      try {
        setAnalysisData(JSON.parse(savedAnalysis));
      } catch (e) {
        console.error("Failed to parse saved analysis data");
      }
    }

    if (savedSolution) {
      setSelectedSolution(savedSolution);
    }
  }, []);

  // Clear all data and reset flow
  const resetFlow = () => {
    setHasRecordedAudio(false);
    setAudioProcessed(false);
    setAnalysisData(null);
    setSelectedSolution(null);
    sessionStorage.clear();
    console.log("Flow reset - user must start from recording");
  };

  return (
    <Router>
      <div className="App">
        <Header
          showNavigation={audioProcessed}
          onReset={resetFlow}
          currentStep={
            !hasRecordedAudio
              ? 1
              : !audioProcessed
              ? 2
              : !selectedSolution
              ? 3
              : 4
          }
        />

        <Routes>
          {/* Step 1: Voice Recording - Always accessible */}
          <Route
            path="/"
            element={
              <HomePage
                onAudioRecorded={(recorded) => {
                  setHasRecordedAudio(recorded);
                  console.log("Audio recorded, proceeding to processing");
                }}
                hasRecorded={hasRecordedAudio}
              />
            }
          />

          {/* Step 2: Processing - Only after recording */}
          <Route
            path="/processing"
            element={
              hasRecordedAudio ? (
                <ProcessingPage
                  onProcessingComplete={(data) => {
                    console.log("Processing complete:", data);
                    setAudioProcessed(true);
                    setAnalysisData(data);
                    sessionStorage.setItem("audioProcessed", "true");
                    sessionStorage.setItem(
                      "analysisData",
                      JSON.stringify(data)
                    );
                  }}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Step 3: Business Insights - Only after processing */}
          <Route
            path="/insights"
            element={
              audioProcessed && analysisData ? (
                <BusinessInsights
                  analysisData={analysisData}
                  onSolutionSelected={(solution) => {
                    console.log("Solution selected:", solution);
                    setSelectedSolution(solution);
                    sessionStorage.setItem("selectedSolution", solution);
                  }}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Step 4: WhatsApp Module - Only after selecting WhatsApp */}
          <Route
            path="/whatsapp"
            element={
              selectedSolution === "whatsapp" ? (
                <WhatsAppModule analysisData={analysisData} />
              ) : (
                <Navigate to={audioProcessed ? "/insights" : "/"} replace />
              )
            }
          />

          {/* Redirect any other routes to appropriate step */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InsightsPage from "./pages/InsightsPage";
import WhatsAppPage from "./pages/WhatsAppPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import Layout from "./components/Layout";

function App() {
  return (
    <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/whatsapp" element={<WhatsAppPage />} />
          <Route path="/instagram" element={<ComingSoonPage />} />
          <Route path="/website" element={<ComingSoonPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

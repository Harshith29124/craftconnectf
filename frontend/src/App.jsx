import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InsightsPage from "./pages/InsightsPage";
import WhatsAppPage from "./pages/WhatsAppPage";
import VoiceRecordingPage from "./pages/VoiceRecordingPage";
import AnalyzeProductImagePage from "./pages/AnalyzeProductImagePage";
import ArtisanHubPage from "./pages/ArtisanHubPage";
import SmartProductEnhancerPage from "./pages/SmartProductEnhancerPage";
import QuotationResultPage from "./pages/QuotationResultPage";
import InstagramReviewPostPage from "./pages/InstagramReviewPostPage";
import WhatsAppSendPage from "./pages/WhatsAppSendPage";
import ShopifyLaunchPage from "./pages/ShopifyLaunchPage";

// Import EmptyStates for placeholder pages
import { EmptyStates } from "./components/EmptyState";
import Layout from "./components/Layout";

// Temporary placeholder components that use EmptyState
const InstagramPage = () => (
  <div className="min-h-screen bg-[#FFFCF9]">
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <EmptyStates.Instagram />
    </div>
  </div>
);

const WebsitePage = () => (
  <div className="min-h-screen bg-[#FFFCF9]">
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <EmptyStates.Website />
    </div>
  </div>
);

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
          
          {/* Replace ComingSoon with proper placeholders */}
          <Route path="/instagram" element={<InstagramPage />} />
          <Route path="/website" element={<WebsitePage />} />
          
          {/* Core workflow pages */}
          <Route path="/voice-recording" element={<VoiceRecordingPage />} />
          <Route path="/analyze-image" element={<AnalyzeProductImagePage />} />
          
          {/* Hub and tools */}
          <Route path="/hub" element={<ArtisanHubPage />} />
          <Route path="/enhancer" element={<SmartProductEnhancerPage />} />
          <Route path="/quotation" element={<QuotationResultPage />} />
          
          {/* Channel-specific pages */}
          <Route path="/instagram-post" element={<InstagramReviewPostPage />} />
          <Route path="/whatsapp-send" element={<WhatsAppSendPage />} />
          <Route path="/shopify-launch" element={<ShopifyLaunchPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
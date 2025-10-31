import React from "react";
import { useNavigate } from "react-router-dom";
import EnhancerSlider from "../components/EnhancerSlider";

const SmartProductEnhancerPage = () => {
  const navigate = useNavigate();
  
  const originalUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuA1waSSomWEVOwpxAs0qqfNwD44WPLhYdDsoDk_3oXC9ooayu0OnwI51WoGQWhmMLXIMIcbeKPsYqK224d3L7LaDJPK_bIkcPreWGyiDpi891oFNgG171Mlhd_1aafiGaNEbRRPneaKfIcJeXjS7iozc9LQGWc7Zml6enPnOiyGAybTMFw7i5FzE8uo-1U_BY0QuoaDIGjflnt_yiGBqR0MgGWxiAAECR0jC9jWfn1v8IDzXfHcRgmb8rxnq6VwsnOsXCzPX5TsZME";
  const enhancedUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuB8JmPRAtBs59CHIiMrX5ZmIpHuL2Anmyk48mTO_ECuf-f7oKrdOJ5AhjzE7YR1PL3YPzZkUN_RNhydIk5B5LOaNb3SQUB0u5GzH3ckebCJJ51Nvx07A7uUKFYSwysDOeBNtoB_LkIO9AePdeyeba-itMBA3MdlOH0EYGmnqtF9AqUdmz7IDbMJYlxABj4YKtWARnWcJdyKe7_cFVMsUEg46vmgsUUC2LCTR6YHLZkKFuSIx7_Y6AZ4Fgm9884YozwP4_FdzY9QRN0";

  const handleDownload = () => {
    console.log("Download enhanced image");
    // TODO: Implement actual download
  };
  
  const handleUseForQuotation = () => {
    console.log("Use for quotation");
    navigate('/quotation');
  };
  
  const handlePostToInstagram = () => {
    console.log("Post to Instagram");
    navigate('/instagram-post');
  };

  return (
    <div className="min-h-screen bg-[#FFFCF9]">
      {/* Header */}
      <header className="border-b border-[#f4f2f0] px-4 sm:px-6 md:px-10 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/hub')}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#897261] hover:bg-[#fef3e9] transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="h-6 w-6 text-[#ec6d13]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"/>
              </svg>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#181411]">
              CraftConnect
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => navigate('/hub')}
              className="text-sm font-medium text-[#897261] hover:text-[#181411] transition-colors"
            >
              Dashboard
            </button>
            <button className="text-sm font-medium text-[#897261] hover:text-[#181411] transition-colors">
              My Products
            </button>
            <span className="text-sm font-bold text-[#ec6d13]">Enhancer</span>
            <button className="text-sm font-medium text-[#897261] hover:text-[#181411] transition-colors">
              Help
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="h-8 sm:h-10 rounded-full bg-[#ec6d13] px-3 sm:px-4 text-xs sm:text-sm font-semibold text-white hover:bg-[#d8620f] transition-colors">
              Help
            </button>
            <div 
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-cover bg-center" 
              style={{backgroundImage:"url('https://lh3.googleusercontent.com/aida-public/AB6AXuCitLj7JdbfonvYjGkk_QnRXQYZdw2WRwTBN4Muj67hts1ofdAgr0zx2xYQf5fgh_5YyYEGQH7E83mF-fTs7MV1rO4lmLmQnzxG1tiiraf6JGYIJk2NXKWXM8SunfVDy-hfb8y2Ze2YZ3vZrbdlBDZYcxSlleq-tSXMlmIpMJIZQ8Z3t9ilXGKb0s5zliMLr-bg0m8H9gs_pXDmRWPtxjHFszWjalw4ApX4vssbpEipT2gEJpu4i2qHZIDl67TgBr_t5637LFYXm8I')"}} 
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#181411] mb-3">
            Smart Product Enhancer
          </h2>
          <p className="text-[#897261] text-base sm:text-lg">
            Review your AI-enhanced image below. Drag the slider to compare.
          </p>
        </div>

        {/* Enhanced Image Comparison */}
        <div className="bg-white border border-[#f4f2f0] rounded-2xl p-6 shadow-sm mb-8">
          <EnhancerSlider originalUrl={originalUrl} enhancedUrl={enhancedUrl} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
          <button 
            onClick={handleDownload}
            className="w-full sm:w-auto h-12 px-6 rounded-xl bg-[#ec6d13] text-white font-semibold hover:bg-[#d8620f] focus:outline-none focus:ring-4 focus:ring-[#ec6d13]/50 transition-all duration-200"
          >
            Download Enhanced Image
          </button>
          <button 
            onClick={handleUseForQuotation}
            className="w-full sm:w-auto h-12 px-6 rounded-xl bg-white border border-[#f4f2f0] text-[#181411] font-semibold hover:bg-[#fef3e9] hover:border-[#ec6d13]/20 transition-all duration-200"
          >
            Use for Quotation
          </button>
          <button 
            onClick={handlePostToInstagram}
            className="w-full sm:w-auto h-12 px-6 rounded-xl bg-white border border-[#f4f2f0] text-[#181411] font-semibold hover:bg-[#fef3e9] hover:border-[#ec6d13]/20 transition-all duration-200"
          >
            Post to Instagram
          </button>
        </div>
      </main>
    </div>
  );
};

export default SmartProductEnhancerPage;
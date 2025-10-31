import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AnalyzeProductImagePage = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFileName(file.name);
      setError("");
    } else {
      setError("Please upload a valid image file (JPG or PNG)");
    }
  };

  const onClickUpload = () => inputRef.current?.click();

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFileName(file.name);
      setError("");
    } else {
      setError("Please upload a valid image file (JPG or PNG)");
    }
  };

  const onProcess = async () => {
    if (!fileName) {
      setError("Please upload an image first");
      return;
    }
    
    setIsProcessing(true);
    setError("");
    
    try {
      // TODO: Implement actual API call
      console.log("Processing image:", fileName);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to insights (placeholder for now)
      navigate("/insights");
    } catch (err) {
      setError("Failed to process image. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#FFFCF9]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#f4f2f0] px-4 sm:px-6 md:px-10 py-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#897261] hover:bg-[#fef3e9] transition-colors sm:hidden"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div className="h-6 w-6 text-[#ec6d13]">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"/>
            </svg>
          </div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#181411]">CraftConnect</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-8 sm:h-10 rounded-full bg-[#ec6d13] px-3 sm:px-4 text-xs sm:text-sm font-semibold text-white hover:bg-[#d8620f] transition-colors">
            Help
          </button>
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-300" />
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-center justify-center py-8 sm:py-16">
        <div className="w-full max-w-2xl px-4 sm:px-6">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#181411]">
              Analyze Your Product Image
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#897261]">
              Get AI-Powered Insights for your craft
            </p>
          </div>

          {/* Upload Card */}
          <div className="bg-white border border-[#f4f2f0] rounded-2xl p-4 sm:p-6 shadow-sm mb-6">
            <div
              onClick={onClickUpload}
              onDrop={onDrop}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              className="flex flex-col items-center gap-4 sm:gap-6 rounded-xl border-2 border-dashed border-[#e6e0db] px-4 sm:px-6 py-12 sm:py-16 hover:border-[#ec6d13] hover:bg-[#ec6d13]/5 transition-all duration-300 cursor-pointer group"
            >
              {/* Upload Icon */}
              <div className="h-12 w-12 sm:h-16 sm:w-16 text-[#897261] group-hover:text-[#ec6d13] transition-colors">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                </svg>
              </div>
              
              <div className="text-center max-w-sm">
                <h3 className="text-lg sm:text-xl font-semibold text-[#181411] mb-2">
                  Tap or Drag to Upload Product Image
                </h3>
                <p className="text-sm sm:text-base text-[#897261]">
                  Supports JPG, PNG formats.
                </p>
                {fileName && (
                  <div className="mt-4 p-3 bg-[#fef3e9] border border-[#ec6d13]/20 rounded-lg">
                    <p className="text-sm font-medium text-[#ec6d13]">
                      Selected: {fileName}
                    </p>
                  </div>
                )}
              </div>
              
              <input 
                ref={inputRef} 
                type="file" 
                accept="image/png,image/jpeg" 
                className="hidden" 
                onChange={onFileChange} 
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Process Button */}
          <div className="flex justify-center">
            <button
              onClick={onProcess}
              disabled={!fileName || isProcessing}
              className="flex h-12 sm:h-14 w-full max-w-md items-center justify-center gap-2 rounded-full bg-[#ec6d13] px-6 text-base sm:text-lg font-semibold text-white hover:bg-[#d8620f] focus:outline-none focus:ring-4 focus:ring-[#ec6d13]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isProcessing ? (
                <>
                  <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                "Process Data & Get Insights"
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyzeProductImagePage;
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeBusinessAudio } from "../services/api";

const HomePage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const [textInput, setTextInput] = useState("");
  const recordingTimeRef = useRef(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  // Effect to handle recording timer
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  useEffect(() => {
    recordingTimeRef.current = recordingTime;
  }, [recordingTime]);

  const startRecording = async () => {
    try {
      setError("");
      setRecordingTime(0);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mimeType = MediaRecorder.isTypeSupported("audio/webm; codecs=opus")
        ? "audio/webm; codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "audio/mp4";
          
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        if (recordingTimeRef.current < 10) {
          setError("Recording too short. Please speak for at least 10 seconds.");
          setIsRecording(false);
          setRecordingTime(0);
          return;
        }
        
        setIsProcessing(true);
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mimeType,
        });
        
        try {
          const { data } = await analyzeBusinessAudio(audioBlob);
          if (data.success) {
            navigate("/insights", { state: { ...data } });
          } else {
            setError(data.error || "Failed to analyze audio.");
            setIsProcessing(false);
          }
        } catch (err) {
          console.error("API Error:", err);
          setError("Server error. Please try again.");
          setIsProcessing(false);
        }
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start(1000);
      setIsRecording(true);
    } catch (err) {
      console.error("Recording Error:", err);
      setError("Microphone access denied. Please allow microphone access.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleMicrophoneClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (textInput.trim()) {
      // Handle text input submission - could navigate to insights with text analysis
      console.log("Text input:", textInput);
      // For now, we'll just clear it
      setTextInput("");
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#FFFCF9]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#f4f2f0] px-4 sm:px-6 md:px-10 py-3">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 text-[#ec6d13]">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
            </svg>
          </div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#181411]">
            CraftConnect
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-8 sm:h-10 w-8 sm:w-10 flex items-center justify-center rounded-full bg-[#fef3e9] text-[#181411] transition-colors hover:bg-[#ec6d13]/20">
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 256 256">
              <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
            </svg>
          </button>
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-300"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:py-16 text-center">
        <div className="w-full max-w-lg">
          {/* Hero Title */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#181411]">
              How can I help you today?
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed text-[#897261]">
              Tap the microphone to speak about your business.
            </p>
          </div>

          {/* Recording Status */}
          {isRecording && (
            <div className="mb-6 p-4 bg-[#fef3e9] border border-[#ec6d13]/20 rounded-xl">
              <p className="text-base font-semibold text-[#ec6d13]">
                Recording: {formatTime(recordingTime)}
              </p>
              {recordingTime < 10 && (
                <p className="text-sm text-[#897261] mt-2">
                  Please continue for at least {10 - recordingTime} more seconds
                </p>
              )}
            </div>
          )}

          {/* Processing Status */}
          {isProcessing && (
            <div className="mb-6 flex flex-col items-center p-6">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#ec6d13] mb-4"></div>
              <p className="text-base font-medium text-[#ec6d13] mb-2">
                Processing your recording...
              </p>
              <p className="text-sm text-[#897261]">
                This may take a moment.
              </p>
            </div>
          )}

          {/* Microphone Button */}
          <div className="mb-8 flex flex-col items-center justify-center">
            <button 
              onClick={handleMicrophoneClick}
              disabled={isProcessing}
              className="group relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-[#ec6d13] text-white shadow-xl transition-all duration-300 ease-out hover:scale-110 hover:bg-[#d8620f] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#ec6d13]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {!isProcessing && (
                <span className="absolute h-full w-full animate-ping rounded-full bg-[#ec6d13] opacity-20"></span>
              )}
              <svg className="h-8 w-8 sm:h-10 sm:w-10" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,176a48.05,48.05,0,0,0,48-48V64a48,48,0,0,0-96,0v64A48.05,48.05,0,0,0,128,176ZM96,64a32,32,0,0,1,64,0v64a32,32,0,0,1-64,0Zm40,143.6V232a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64,64,0,0,0,128,0,8,8,0,0,1,16,0A80.11,80.11,0,0,1,136,207.6Z"></path>
              </svg>
            </button>

            {/* Listening Animation Bars */}
            {isRecording && (
              <div className="listening-bar mt-6">
                <span className="listening-dot"></span>
                <span className="listening-dot"></span>
                <span className="listening-dot"></span>
              </div>
            )}
          </div>

          {/* Alternative Actions */}
          {!isRecording && !isProcessing && (
            <div className="space-y-6">
              {/* Quick Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                <button
                  onClick={() => navigate('/analyze-image')}
                  className="flex items-center justify-center gap-2 h-12 px-4 bg-white border border-[#f4f2f0] rounded-xl text-[#181411] font-medium hover:bg-[#fef3e9] hover:border-[#ec6d13]/20 transition-all duration-200"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                  </svg>
                  Upload Image
                </button>
                <button
                  onClick={() => navigate('/insights')}
                  className="flex items-center justify-center gap-2 h-12 px-4 bg-white border border-[#f4f2f0] rounded-xl text-[#181411] font-medium hover:bg-[#fef3e9] hover:border-[#ec6d13]/20 transition-all duration-200"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                  View Insights
                </button>
              </div>

              {/* Text Input Alternative */}
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-xs">
                  <form onSubmit={handleTextSubmit} className="relative">
                    <input 
                      className="w-full h-10 rounded-full border border-[#f4f2f0] bg-white px-4 pr-12 text-[#181411] placeholder-[#897261] focus:border-[#ec6d13] focus:outline-none focus:ring-2 focus:ring-[#ec6d13]/20 transition-all duration-200" 
                      placeholder="Or type your request..." 
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                    />
                    <button 
                      type="submit"
                      disabled={!textInput.trim()}
                      className="absolute right-1 top-1 h-8 w-8 flex items-center justify-center rounded-full bg-[#ec6d13] text-white hover:bg-[#d8620f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Footer Text */}
          <div className="mt-8 sm:mt-12">
            <p className="text-sm text-[#897261]">
              CraftConnect Assistant is powered by AI. 
              <button 
                className="font-semibold text-[#ec6d13] underline hover:text-[#d8620f] ml-1 transition-colors" 
                onClick={(e) => e.preventDefault()}
              >
                Learn more
              </button>
            </p>
          </div>
        </div>
      </main>
      
      <style jsx>{`
        .listening-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 2rem;
          gap: 0.25rem;
        }
        .listening-dot {
          width: 4px;
          height: 4px;
          background-color: #ec6d13;
          border-radius: 9999px;
          animation: listen 1.5s infinite ease-in-out;
        }
        .listening-dot:nth-child(1) {
          animation-delay: -0.4s;
        }
        .listening-dot:nth-child(2) {
          animation-delay: -0.2s;
        }
        .listening-dot:nth-child(3) {
          animation-delay: 0s;
        }
        @keyframes listen {
          0%, 100% {
            transform: scaleY(1);
            opacity: 0.3;
          }
          50% {
            transform: scaleY(3);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
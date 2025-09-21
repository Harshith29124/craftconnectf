import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeBusinessAudio } from "../services/api";

const HomePage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingTimeRef = useRef(0); // New ref to track recording time
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
      
      // Try to use webm with opus, but fallback to other formats if needed
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

      mediaRecorderRef.current.start(1000); // Collect data every second
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

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="home" className="view active">
      <div className="container">
        <div className="recording-flow">
          <div className="flow-header">
            <h1 className="hero-title">Transform Your Business with AI</h1>
            <p className="hero-description">
              Tell us about your business and let our AI analyze the best
              solutions for growth
            </p>
          </div>
          
          {isProcessing ? (
            <div className="processing-state">
              <div className="spinner"></div>
              <p>Processing your recording... This may take a moment.</p>
            </div>
          ) : (
            <>
              {isRecording ? (
                <div className="recording-state">
                  <div className={`recording-indicator ${recordingTime < 10 ? 'recording-indicator--too-short' : ''}`}></div>
                  <p className="recording-time">Recording: {formatTime(recordingTime)}</p>
                  <p className="recording-hint">
                    {recordingTime < 10 
                      ? `Please continue for at least ${10 - recordingTime} more seconds. A minimum of 10 seconds is required.` 
                      : "You can stop recording when ready."}
                  </p>
                  <button onClick={stopRecording} className="btn btn--primary">
                    Stop Recording
                  </button>
                </div>
              ) : (
                <button onClick={startRecording} className="btn btn--primary">
                  Start Recording
                </button>
              )}
            </>
          )}
          
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePage;

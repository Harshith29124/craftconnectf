import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = ({ onAudioRecorded, hasRecorded }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [canStop, setCanStop] = useState(false);
  const [error, setError] = useState("");
  const [audioLevel, setAudioLevel] = useState(0);

  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);
  const analyzerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const navigate = useNavigate();

  const MINIMUM_RECORDING_TIME = 10; // 10 seconds minimum

  // Audio level monitoring for visual feedback
  const monitorAudioLevel = (stream) => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    analyser.smoothingTimeConstant = 0.3;
    analyser.fftSize = 512;
    microphone.connect(analyser);

    analyzerRef.current = { analyser, dataArray, audioContext };

    const updateAudioLevel = () => {
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      setAudioLevel(average);

      if (isRecording) {
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
      }
    };

    updateAudioLevel();
  };

  const startRecording = async () => {
    try {
      setError("");
      console.log("Starting recording...");

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 48000,
          channelCount: 1,
        },
      });

      streamRef.current = stream;

      // Start audio level monitoring
      monitorAudioLevel(stream);

      // Configure MediaRecorder with optimal settings for Google Speech API
      let options = { mimeType: "audio/webm;codecs=opus" };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: "audio/webm" };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          options = { mimeType: "audio/mp4" };
        }
      }

      mediaRecorderRef.current = new MediaRecorder(stream, options);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          console.log("Audio chunk received, size:", event.data.size);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mediaRecorderRef.current.mimeType,
        });

        console.log(
          "Recording stopped, blob size:",
          audioBlob.size,
          "type:",
          audioBlob.type
        );

        // Store audio for processing
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          sessionStorage.setItem("recordedAudio", reader.result);
          sessionStorage.setItem(
            "audioMimeType",
            mediaRecorderRef.current.mimeType
          );
          sessionStorage.setItem("recordingDuration", recordingTime.toString());

          console.log(
            "Audio saved to sessionStorage, duration:",
            recordingTime
          );

          onAudioRecorded(true);
          navigate("/processing");
        };

        // Cleanup
        if (analyzerRef.current) {
          analyzerRef.current.audioContext.close();
        }
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start(1000); // Collect data every second
      setIsRecording(true);
      setRecordingTime(0);
      setCanStop(false);
      setAudioLevel(0);

      console.log("MediaRecorder started with options:", options);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= MINIMUM_RECORDING_TIME) {
            setCanStop(true);
          }
          console.log("Recording time:", newTime);
          return newTime;
        });
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setError(
        "Microphone access denied. Please allow microphone access and try again."
      );
    }
  };

  const stopRecording = () => {
    if (canStop && mediaRecorderRef.current && isRecording) {
      console.log("Stopping recording...");

      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setAudioLevel(0);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (analyzerRef.current) {
        analyzerRef.current.audioContext.close();
      }
    };
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getRecordButtonClass = () => {
    let className = "record-button";
    if (isRecording) {
      className += " recording";
      if (audioLevel > 50) {
        className += " high-volume";
      } else if (audioLevel > 20) {
        className += " medium-volume";
      }
    }
    return className;
  };

  return (
    <div className="homepage">
      <div className="container">
        <div className="hero-section">
          <span className="eyebrow">AI-POWERED BUSINESS ANALYSIS</span>
          <h1 className="hero-title">Tell Your Craft Story</h1>
          <p className="hero-subtitle">
            Speak for at least 10 seconds about your traditional craft business.
            Our AI will analyze your voice using Google Cloud APIs and provide
            personalized recommendations.
          </p>
          <div className="powered-by">
            <span>🤖 Powered by Google Cloud Speech-to-Text & Vertex AI</span>
          </div>
        </div>

        <div className="recording-section">
          <div className="recording-card">
            <div className="recording-interface">
              <button
                className={getRecordButtonClass()}
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isRecording && !canStop}
                style={{
                  transform: isRecording
                    ? `scale(${1 + audioLevel / 500})`
                    : "scale(1)",
                }}
              >
                <span className="mic-icon">🎤</span>
                {isRecording && <div className="pulse-ring"></div>}
                {isRecording && (
                  <div
                    className="audio-level-ring"
                    style={{
                      opacity: audioLevel / 100,
                      transform: `scale(${1 + audioLevel / 200})`,
                    }}
                  ></div>
                )}
              </button>

              <div className="recording-status">
                {isRecording ? (
                  <div className="recording-active">
                    <p className="recording-time">
                      {formatTime(recordingTime)}
                    </p>
                    {!canStop ? (
                      <p className="recording-instruction">
                        Keep speaking... (minimum {MINIMUM_RECORDING_TIME}s)
                        <br />
                        <small>Audio level: {Math.round(audioLevel)}%</small>
                      </p>
                    ) : (
                      <p className="can-stop">✅ Click to finish recording</p>
                    )}
                  </div>
                ) : (
                  <div className="recording-ready">
                    <p className="ready-text">
                      Click the microphone to start recording
                    </p>
                    <p className="instruction-text">
                      Describe your craft business, challenges, and goals
                    </p>
                  </div>
                )}
              </div>

              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>

          <div className="instructions-card">
            <h3>💡 What to say (speak clearly):</h3>
            <ul className="instruction-list">
              <li>
                <strong>Craft Type:</strong> What do you make? (pottery,
                jewelry, textiles, etc.)
              </li>
              <li>
                <strong>Experience:</strong> How long have you been crafting?
              </li>
              <li>
                <strong>Challenges:</strong> What problems do you face?
              </li>
              <li>
                <strong>Customers:</strong> Who buys your products?
              </li>
              <li>
                <strong>Goals:</strong> What do you want to achieve?
              </li>
            </ul>

            <div className="example-section">
              <p className="example-label">
                <strong>📝 Example (speak like this):</strong>
              </p>
              <p className="example-text">
                "I make traditional blue pottery in Jaipur. I've been doing this
                craft for 15 years, learning from my father. My main challenge
                is reaching customers online - I don't know how to use social
                media or create a website. I make unique designs but struggle
                with pricing and marketing. I want to expand my business and
                reach more people who appreciate handmade crafts."
              </p>
            </div>

            <div className="tips-section">
              <p className="tips-label">
                <strong>🎯 Tips for better results:</strong>
              </p>
              <ul className="tips-list">
                <li>Speak clearly and at normal pace</li>
                <li>Mention specific craft types and materials</li>
                <li>Describe your biggest business challenges</li>
                <li>Keep talking until you can click stop</li>
              </ul>
            </div>
          </div>
        </div>

        {hasRecorded && (
          <div className="success-message">
            <p>
              ✅ Recording completed! You can now proceed to see your AI
              analysis.
            </p>
            <button
              className="proceed-button"
              onClick={() => navigate("/processing")}
            >
              View AI Analysis →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

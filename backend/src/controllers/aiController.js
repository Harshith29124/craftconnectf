const { SpeechClient } = require("@google-cloud/speech");
const { VertexAI } = require("@google-cloud/vertexai");

// --- INITIALIZE GOOGLE CLOUD CLIENTS ---
const speechClient = new SpeechClient();
const vertexAI = new VertexAI({
  project: process.env.GOOGLE_PROJECT_ID,
  location: process.env.GOOGLE_LOCATION,
});

const generativeModel = vertexAI.getGenerativeModel({
  model: process.env.VERTEX_MODEL,
});

// --- CONTROLLER FUNCTIONS ---

/**
 * Transcribes audio using Google Speech-to-Text API.
 */
async function transcribeAudio(audioBuffer) {
  const audio = {
    content: audioBuffer.toString("base64"),
  };
  const config = {
    encoding: "WEBM_OPUS",
    sampleRateHertz: 48000,
    languageCode: "en-US",
    enableAutomaticPunctuation: true,
    model: "latest_long",
  };
  const request = { audio, config };

  const [response] = await speechClient.recognize(request);
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");
  return transcription;
}

/**
 * Analyzes business transcript using Vertex AI (Gemini).
 */
async function analyzeTranscriptWithVertexAI(transcript) {
  const prompt = `
        Analyze the following business description from an artisan. Your task is to extract key information and return it as a valid JSON object.

        **Business Description:**
        "${transcript}"

        **JSON Output Format:**
        {
          "businessType": "A short, descriptive category like 'Pottery & Ceramics', 'Handmade Jewelry', or 'Textile Arts'.",
          "detectedFocus": "A string of comma-separated keywords of products or services mentioned, like 'ceramic bowls, vases, custom orders'.",
          "topProblems": [
            "A key challenge or problem the user mentioned.",
            "Another challenge if mentioned."
          ],
          "recommendedSolutions": {
            "primary": {
              "id": "whatsapp | instagram | website",
              "reason": "A brief, compelling reason why this is the best first step for the user."
            },
            "secondary": {
              "id": "whatsapp | instagram | website",
              "reason": "A brief reason for the second-best option."
            }
          },
          "confidence": "An integer between 80 and 95 representing your confidence in this analysis."
        }

        **CRITICAL:** Only return the JSON object. Do not include any other text, explanations, or markdown formatting like \`\`\`json.
    `;

  const req = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  };
  const result = await generativeModel.generateContent(req);
  const responseText = result.response.candidates[0].content.parts[0].text;

  // Clean and parse the JSON response
  return JSON.parse(
    responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()
  );
}

// --- EXPORTED API HANDLERS ---

exports.analyzeBusinessAudio = async (req, res) => {
  if (!req.file || !req.file.buffer) {
    return res
      .status(400)
      .json({ success: false, error: "Audio file is required." });
  }

  try {
    console.log("1. Transcribing audio...");
    const transcript = await transcribeAudio(req.file.buffer);
    if (!transcript) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Could not detect any speech in the audio.",
        });
    }
    console.log("2. Transcription complete:", transcript);

    console.log("3. Analyzing transcript with Vertex AI...");
    const analysis = await analyzeTranscriptWithVertexAI(transcript);
    console.log("4. Analysis complete:", analysis);

    res.json({
      success: true,
      transcript: transcript,
      analysis: analysis,
    });
  } catch (error) {
    console.error("❌ Error in AI processing pipeline:", error);
    res
      .status(500)
      .json({ success: false, error: "An error occurred during AI analysis." });
  }
};

exports.generateWhatsAppMessage = async (req, res) => {
  // This function can be expanded later to use Vision AI if an image is uploaded
  const { businessType, detectedFocus, transcript } = req.body;

  const prompt = `
        You are an expert marketing copywriter for small craft businesses. 
        Your task is to generate a professional, friendly, and engaging WhatsApp Business message.

        **Business Context:**
        - Type: ${businessType}
        - Products/Focus: ${detectedFocus}
        - User's own words: "${transcript}"

        **Instructions:**
        - Start with a friendly greeting.
        - Use emojis to make the message visually appealing.
        - Briefly introduce the business and its specialty.
        - Use bullet points to highlight key features or products.
        - End with a clear call-to-action, encouraging the customer to reply.
        - Keep the message concise and easy to read.

        Generate the message now.
    `;

  try {
    const req = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    };
    const result = await generativeModel.generateContent(req);
    const message = result.response.candidates[0].content.parts[0].text;

    res.json({ success: true, message });
  } catch (error) {
    console.error("❌ Error generating WhatsApp message:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to generate message." });
  }
};

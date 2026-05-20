const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
  res.send("AI Backend is running...");
});

app.post("/analyze-writing", async (req, res) => {
  try {
    const { essay } = req.body;

    if (!essay) {
      return res.status(400).json({
        success: false,
        error: "Essay is required",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are an IELTS Writing examiner.

Analyze the essay and return ONLY valid JSON. Do not include markdown, code fences, or extra text.

Return this exact structure:
{
  "overallBand": "7.0",
  "criterionScores": {
    "taskResponse": "6.5",
    "coherenceCohesion": "7.0",
    "lexicalResource": "7.0",
    "grammaticalRangeAccuracy": "7.0"
  },
  "summary": "Short overall summary",
  "mainMistakes": [
    "Mistake 1",
    "Mistake 2",
    "Mistake 3"
  ],
  "suggestions": [
    "Suggestion 1",
    "Suggestion 2",
    "Suggestion 3"
  ],
  "improvedEssay": "Optional improved version or short improvement note"
}

Essay:
${essay}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    // Remove possible markdown fences if the model adds them
    text = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.log("Raw model output:", text);

      return res.status(500).json({
        success: false,
        error: "AI returned invalid JSON",
        raw: text,
      });
    }

    return res.json({
      success: true,
      feedback: parsed,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "AI analysis failed",
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
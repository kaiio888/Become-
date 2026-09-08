const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Please enter a message."
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: message
    });

    res.json({
      answer: response.text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Become AI could not connect to the AI."
    });
  }
});

app.listen(3000, () => {
  console.log("Become AI server is running");
});

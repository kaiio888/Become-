import { GoogleGenAI } from "@google/genai";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders()
    }
  });
}

export default {
  async fetch(request, env) {

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders()
      });
    }

    if (request.method !== "POST") {
      return new Response("Become AI is running.", {
        headers: corsHeaders()
      });
    }

    try {
      const body = await request.json();
      const message = body.message;

      if (!message) {
        return json({ error: "Please enter a message." }, 400);
      }

      if (!env.GEMINI_API_KEY) {
        return json({ error: "GEMINI_API_KEY is not configured." }, 500);
      }

      const ai = new GoogleGenAI({
        apiKey: env.GEMINI_API_KEY
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message
      });

      return json({
        answer: response.text
      });

    } catch (error) {
      console.error(error);

      return json({
        error: "AI error: " + error.message
      }, 500);
    }
  }
};

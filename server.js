import { GoogleGenAI } from "@google/genai";

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    if (request.method !== "POST") {
      return new Response("Become AI is running.");
    }

    try {
      const { message } = await request.json();

      if (!message) {
        return new Response(
          JSON.stringify({ error: "Please enter a message." }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
      }

      const ai = new GoogleGenAI({
        apiKey: env.GEMINI_API_KEY
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message
      });

      return new Response(
        JSON.stringify({
          answer: response.text
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );

    } catch (error) {
      console.error(error);

      return new Response(
        JSON.stringify({
          error: "Become AI could not connect to the AI."
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }
  }
};

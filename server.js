import { GoogleGenAI } from "@google/genai";

export default {
  async fetch(request, env) {

    // Allow your website to talk to the Worker
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    // Test the Worker in a browser
    if (request.method === "GET") {
      return new Response("Become AI is running.", {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed.", { status: 405 });
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

      if (!env.GEMINI_API_KEY) {
        return new Response(
          JSON.stringify({ error: "Gemini API key is missing." }),
          {
            status: 500,
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

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message
      });

      return new Response(
        JSON.stringify({
          answer: result.text
        }),
        {
          status: 200,
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
          error: error.message || "AI request failed."
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

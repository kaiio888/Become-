export default {
  async fetch(request, env) {

    // CORS
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

    // Test the Worker
    if (request.method === "GET") {
      return new Response("Become AI is running.", {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed.", {
        status: 405
      });
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

      const geminiResponse = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": env.GEMINI_API_KEY
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: message
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await geminiResponse.json();

      if (!geminiResponse.ok) {
        return new Response(
          JSON.stringify({
            error: data.error?.message || "Gemini request failed."
          }),
          {
            status: geminiResponse.status,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
      }

      const answer =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Gemini returned no answer.";

      return new Response(
        JSON.stringify({ answer }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );

    } catch (error) {
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

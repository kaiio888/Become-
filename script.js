const API_URL = "https://become.keshavsamone.workers.dev/api/chat";

async function askAI() {
  const question = document.getElementById("question").value.trim();
  const answer = document.getElementById("answer");

  if (!question) {
    alert("Ask me something first.");
    return;
  }

  answer.style.display = "block";
  answer.innerHTML = "🧠 Become AI is thinking...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: question
      })
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      answer.innerHTML = "⚠️ " + (data.error || "Something went wrong.");
      return;
    }

    answer.innerHTML = `
      <strong>Become AI</strong>
      <br><br>
      ${formatAnswer(data.answer)}
    `;

  } catch (error) {
    console.error(error);
    answer.innerHTML = "⚠️ Could not connect to Become AI.";
  }
}

function formatAnswer(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");
}

function research() {
  const question = document.getElementById("question").value.trim();

  if (!question) {
    alert("Enter a question to research.");
    return;
  }

  alert("Research mode is coming next.");
}

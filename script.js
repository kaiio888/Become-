function askAI() {
  const question = document.getElementById("question").value.trim();
  const answer = document.getElementById("answer");

  if (!question) {
    alert("Ask me something first.");
    return;
  }

  answer.style.display = "block";

  answer.innerHTML = `
    <strong>Become AI</strong>
    <br><br>
    I received your question:
    <br><br>
    "${question}"
    <br><br>
    <span style="color:#8b5cf6">
      AI engine coming next...
    </span>
  `;
}

function research() {
  const question = document.getElementById("question").value.trim();

  if (!question) {
    alert("Enter a question to research.");
    return;
  }

  const answer = document.getElementById("answer");

  answer.style.display = "block";

  answer.innerHTML = `
    <strong>🔎 Research Mode</strong>
    <br><br>
    Become AI will research:
    <br><br>
    "${question}"
    <br><br>
    <span style="color:#8b5cf6">
      Research engine coming next...
    </span>
  `;
}

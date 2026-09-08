const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      error: "No message provided"
    });
  }

  // AI connection will go here
  res.json({
    answer: "Become AI received: " + message
  });
});

app.listen(3000, () => {
  console.log("Become AI server running on port 3000");
});

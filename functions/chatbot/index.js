// index.js - Appwrite function
const fetch = require('node-fetch');

module.exports = async function (req, res) {
  const { question } = req.payload;  // Get question from frontend

  if (!question) {
    return res.json({ error: "Question is required" });
  }

  const apiKey = process.env.OPENAI_API_KEY;  // Get the API key from environment variable

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.json({ error: data.error.message });
    }

    return res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    return res.json({ error: "Error connecting to OpenAI" });
  }
};

import { Client, Functions } from "node-appwrite";
import fetch from "node-fetch";

// Appwrite function entry point
export default async function(req, res) {
    try {
        // Get user input from request payload
        const { question } = JSON.parse(req.body);

        if (!question) {
            return res.json({ error: "Question is required" }, 400);
        }

        // Get OpenAI API key from environment variables
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return res.json({ error: "Missing OpenAI API Key" }, 500);
        }

        // Make request to OpenAI's API
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: question }]
            })
        });

        const data = await response.json();

        if (response.ok) {
            return res.json({ answer: data.choices[0].message.content });
        } else {
            return res.json({ error: data.error.message || "Failed to get response" }, 500);
        }

    } catch (error) {
        return res.json({ error: error.message || "Internal Server Error" }, 500);
    }
}

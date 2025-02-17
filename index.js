import { Client, Functions } from "node-appwrite";
import fetch from "node-fetch";

// Appwrite function entry point
export default async function(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (or specify your frontend domain)
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); // Allow specific methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.send('OK', 200);
    }

    try {
        // Get user input from request payload
        const { question } = JSON.parse(req.payload);

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
        console.error("Error:", error); // Log the error for debugging
        return res.json({ error: error.message || "Internal Server Error" }, 500);
    }
}
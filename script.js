// This is our site Java Script
document.addEventListener('DOMContentLoaded', function() {
  const affirmations = document.querySelectorAll('.affirmations li');
  affirmations.forEach(affirmation => affirmation.style.display = 'none');

  const buttons = document.querySelectorAll('.genreButtons button');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      affirmations.forEach(affirmation => affirmation.style.display = 'none');
      const randomIndex = Math.floor(Math.random() * affirmations.length);
      affirmations[randomIndex].style.display = 'block';
    });
  });
});

const appwriteApiKey = process.env.BOB_APP_APPWRITE_API_KEY;

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  const question = input.value.trim();
  if (!question) return;

  // Display user message
  chatbox.innerHTML += `<div class="message user">${question}</div>`;

  input.value = ""; // Clear input

  try {
      const response = await fetch("https://cloud.appwrite.io/v1/functions/b0b5ap1funct1ono2/executions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${appwriteApiKey}`
        },
        body: JSON.stringify({ question: question })
      });

      const data = await response.json();
      chatbox.innerHTML += `<div class="message bot">${data.reply || "Error processing request"}</div>`;
  } catch (error) {
      chatbox.innerHTML += `<div class="message bot">Error connecting to server</div>`;
      console.error("Error:", error); // Log the error for debugging
  }
}


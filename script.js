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

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  const question = input.value.trim();
  if (!question) return;

  // Display user message
  chatbox.innerHTML += `<div class="message user">${question}</div>`;

  input.value = ""; // Clear input

  try {
      const response = await fetch("https://cloud.appwrite.io/v1/functions/67b29c5b8143655a6b04/executions", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "X-Appwrite-Project": "67b349e4b057e5d42db4", // Replace with your Appwrite project ID
          },
          body: JSON.stringify({ question }),
      });
      const data = await response.json();
      chatbox.innerHTML += `<div class="message bot">${data.reply || "Error processing request"}</div>`;
  } catch (error) {
      chatbox.innerHTML += `<div class="message bot">Error connecting to server</div>`;
  }
}
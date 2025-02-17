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

import { Client, Functions } from 'appwrite';

// Initialize Appwrite Client
const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1') // Make sure to set the Appwrite endpoint
      .setProject('b0batt3mpt2'); // Replace with your project ID

// Initialize Functions service
const functions = new Functions(client);

// Chatbot function (sending message)
export async function sendMessage() {  // Export the function to make it available in global scope
  const input = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  const question = input.value.trim();
  if (!question) return;

  // Display user message
  chatbox.innerHTML += `<div class="message user">${question}</div>`;

  input.value = ""; // Clear input

  try {
    // Send the question to the Appwrite function
    const response = await functions.createExecution('b0b5ap1funct1ono2', JSON.stringify({ question }));

    // Check if the response contains a 'reply' field
    chatbox.innerHTML += `<div class="message bot">${response.result.reply || "Error processing request"}</div>`;
  } catch (error) {
    chatbox.innerHTML += `<div class="message bot">Error connecting to server</div>`;
  }
}

// Event listener for genre buttons (affirmations)
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

// Attach the sendMessage function to the button click in HTML
document.getElementById("sendMessageButton").addEventListener("click", sendMessage);

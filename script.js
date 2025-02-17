import { Client, Functions } from 'appwrite';  // Correct import

// Initialize Appwrite Client and Functions
const client = new Client();
const functions = new Functions(client);

// Set your Appwrite project ID here
client
    .setEndpoint('https://cloud.appwrite.io/v1')  // Your Appwrite endpoint
    .setProject('b0batt3mpt2')  // Your project ID
    .setKey(process.env.APPWRITE_API_KEY);  // Use environment variables for your API key

// This function will be used for sending the message
async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  const question = input.value.trim();
  if (!question) return;

  // Display user message
  chatbox.innerHTML += `<div class="message user">${question}</div>`;

  input.value = ""; // Clear input
  
  try {
    const response = await functions.createExecution('b0b5ap1funct1ono2', JSON.stringify({ question }));
    
    // Log the entire response to inspect all available fields
    console.log('Full Response:', response);
  
    // Use the most relevant field based on the response structure
    // For example, check if `response.text` or a different field holds the response from the function
    const reply = response.result ? response.result.reply : "No reply from server.";
    
    chatbox.innerHTML += `<div class="message bot">${reply}</div>`;
  } catch (error) {
    console.error('Error details:', error);
    chatbox.innerHTML += `<div class="message bot">Error connecting to server</div>`;
  }
}

// Event listener for genre buttons (affirmations)
document.addEventListener('DOMContentLoaded', function () {
  const affirmations = document.querySelectorAll('.affirmations li');
  affirmations.forEach(affirmation => affirmation.style.display = 'none');

  const buttons = document.querySelectorAll('.genreButtons button');
  buttons.forEach(button => {
    button.addEventListener('click', function () {
      affirmations.forEach(affirmation => affirmation.style.display = 'none');
      const randomIndex = Math.floor(Math.random() * affirmations.length);
      affirmations[randomIndex].style.display = 'block';
    });
  });

  // Attach the sendMessage function to the button click in HTML
  const sendMessageButton = document.getElementById("sendMessageButton");
  if (sendMessageButton) {
    sendMessageButton.addEventListener("click", sendMessage);
  }
});

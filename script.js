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

const sendMessage = async (message) => {
  try {
      const response = await fetch('https://cloud.appwrite.io/v1/functions/67b29c5b8143655a6b04/executions', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-Appwrite-Project': '67b2ba1be1e39622c21d', // Replace with your Appwrite project ID
          },
          body: JSON.stringify({ question: message }),
      });

      const data = await response.json();
      console.log(data); // Handle the response
  } catch (error) {
      console.error('Error:', error);
  }
};

// Example usage
document.getElementById('sendButton').addEventListener('click', () => {
  const message = document.getElementById('messageInput').value;
  sendMessage(message);
});

// Example usage
sendQuestion("What is the capital of France?");
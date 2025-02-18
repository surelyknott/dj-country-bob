// affirmations 
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
                const response = await fetch("67b29c5b8143655a6b04.appwrite.global", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ question }),
                });
                const data = await response.json();
                chatbox.innerHTML += `<div class="message bot">${data.reply || "Error processing request"}</div>`;
            } catch (error) {
                chatbox.innerHTML += `<div class="mess.age bot">Error connecting to server</div>`;
            }
        }

// Playlist update
function playPlaylist(playlistId, imageUrl,) {
  const playlistUrl = `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
  document.getElementById('youTubeContainer').src = playlistUrl;
  
  document.getElementById('bobImage').src = imageUrl;  
}


//Changing backgrounds
function changeBackground(imageUrl) {
  document.body.style.backgroundImage = `url(${imageUrl})`;
}






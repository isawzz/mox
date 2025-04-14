let gameState = {
  message: "Initial state"
};

const backendURL = 'http://localhost:8080/mox/isi/backend';

function pollState() {
  fetch(`${backendURL}/get_state.php`)
    .then(res => res.json())
    .then(state => {
      if (JSON.stringify(state) !== JSON.stringify(gameState)) {
        gameState = state;
        updateUI();
      }
    });
}

function saveState() {
  fetch(`${backendURL}/save_state.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gameState)
  })
  .then(res => res.json())
  .then(data => console.log("Saved:", data))
  .catch(err => console.error("Save error:", err));
}


function claimSet(selectedCards, playerName) {
  if (!isValidSet(selectedCards) || isAlreadyClaimed(selectedCards)) {
    alert("Invalid or already claimed set.");
    return;
  }

  gameState.claimed_sets.push({
    set: selectedCards,
    player: playerName,
    time: Date.now()
  });
  gameState.scores[playerName] = (gameState.scores[playerName] || 0) + 1;

  saveState();
  updateUI();
}

function isAlreadyClaimed(selected) {
  return gameState.claimed_sets.some(claimed => 
    JSON.stringify(claimed.set.sort()) === JSON.stringify(selected.sort())
  );
}

function isValidSet(cards) {
  return true; // placeholder logic
}

function updateUI() {
  const area = document.getElementById('game-area');
  area.innerHTML = '<pre>' + JSON.stringify(gameState, null, 2) + '</pre>';
  console.log("UI updated:", gameState);
}

function generateDeck() {
  return Array.from({ length: 81 }, (_, i) => 'card' + (i + 1));
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('testButton');
  button.addEventListener('click', () => {
    // 🔄 Change the game state (for demo purposes)
    gameState.message = "Updated at " + new Date().toLocaleTimeString();
    
    // 💾 Send the updated game state to the server
    saveState();
  });

  // Optional: Start polling if you want
  setInterval(pollState, 1000);
});
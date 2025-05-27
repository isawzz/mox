
function quickUi(dParent) {
  dParent = toElem(dParent);
  let html = `
    <div>
      <h1>Game Interface</h1>

      <section>
        <h2>Start a Game</h2>
        <label for="gameSelect">Game:</label>
        <select id="gameSelect"></select>
        <button id="startGameBtn">Start</button>
      </section>

      <section>
        <h2>Make a Move</h2>
        <label for="gameIdInput">Game ID:</label>
        <input type="text" id="gameIdInput" placeholder="Enter game ID" />
        <label for="moveInput">Move (JSON):</label>
        <input type="text" id="moveInput" value='{"row":0,"col":1}' />
        <button id="makeMoveBtn">Submit Move</button>
      </section>

      <section>
        <h2>Game State</h2>
        <label for="stateGameId">Game ID:</label>
        <input type="text" id="stateGameId" />
        <button id="fetchStateBtn">Get State</button>
        <pre id="gameState"></pre>
      </section>

      <section>
        <h2>Global Chat</h2>
        <div id="chatBox" style="border:1px solid #ccc; height:150px; overflow-y:scroll; padding:5px;"></div>
        <input type="text" id="chatInput" placeholder="Say something..." />
        <button id="sendChatBtn">Send</button>
      </section>
    </div>
    `;
  dParent.innerHTML = html;
}


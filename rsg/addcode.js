function stringAfterLast(sFull, sSub) {
	let parts = sFull.split(sSub);
	return arrLast(parts);
}
function stringBefore(sFull, sSub) {
	let idx = sFull.indexOf(sSub);
	if (idx < 0) return sFull;
	return sFull.substring(0, idx);
}
function stringBeforeLast(sFull, sSub) {
	let parts = sFull.split(sSub);
	return sFull.substring(0, sFull.length - arrLast(parts).length - 1);
}
function stringBetween(sFull, sStart, sEnd) {
	return stringBefore(stringAfter(sFull, sStart), isdef(sEnd) ? sEnd : sStart);
}
function stringBetweenLast(sFull, sStart, sEnd) {
	let s1 = stringBeforeLast(sFull, isdef(sEnd) ? sEnd : sStart);
	return stringAfterLast(s1, sStart);
}

function renderCard(cardKey, targetDiv) {
	if (!targetDiv || !(targetDiv instanceof HTMLElement)) {
		throw new Error("Invalid target element.");
	}

	const svgHtml = getCardSvg(cardKey);
	targetDiv.innerHTML = svgHtml;
}
function renderCardInContainer(key, fill, stroke, container) {
	if (!container || !(container instanceof HTMLElement)) {
		throw new Error("Invalid container element.");
	}

	const svgContent = cardSvgs[key];
	if (!svgContent) {
		throw new Error(`Card key "${key}" not found.`);
	}

	// Set the SVG with dynamic fill/stroke and full scaling
	const svgHtml = `
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 226 314"
         width="100%" height="100%"
         preserveAspectRatio="xMidYMid meet"
         style="display: block;">
      <g fill="${fill}" stroke="${stroke}">
        ${svgContent}
      </g>
    </svg>
  `;

	container.innerHTML = svgHtml;
}


// === Game Actions ===
function startGame(gameName, players = ["Player1"], options = {}) {
	DA.socket.emit("start_game", {
		gamename: gameName,
		players: players,
		options: options
	});
}

function makeMove(gameId, move) {
	DA.socket.emit("make_move", {
		gameid: gameId,
		move: move
	});
}

function getGameState(gameId) {
	DA.socket.emit("get_state", {
		gameid: gameId
	});
}

function fetchGamesList() {
	console.log("Fetching games list");
	DA.socket.emit("games_list");
}

// === UI Handlers ===
function startSelectedGame() {
	const game = document.getElementById("gameSelect").value;
	startGame(game, ["Alice", "Bob"]);
}

function makeSelectedMove() {
	const gameId = document.getElementById("gameIdInput").value;
	let moveText = document.getElementById("moveInput").value;
	try {
		const move = JSON.parse(moveText);
		makeMove(gameId, move);
	} catch (err) {
		alert("Invalid move JSON");
	}
}

function fetchGameState() {
	const gameId = document.getElementById("stateGameId").value;
	getGameState(gameId);
}

function sendChat() {
	const input = document.getElementById("chatInput");
	const msg = input.value.trim();
	console.log("Sending chat message:", msg);
	if (msg) {
		DA.socket.emit("chat_message", msg);
		input.value = "";
	}
}
function sendChat() {
	const input = document.getElementById("chatInput");
	const msg = input.value.trim();
	console.log("Sending chat message:", msg);
	if (msg) {
		// Emit an object containing both username and message
		DA.socket.emit("chat_message", { username: DA.username, message: msg });
		input.value = "";
	}
}


// === Utility ===
function updateGameState(state) {
	document.getElementById("gameState").textContent = JSON.stringify(state, null, 2);
}

function initSockets(username) {
	let socket = DA.socket = io("http://localhost:5000");  // Adjust if needed
	socket.on("connect", () => {
		console.log("Connected to server");
	});

	// === Socket Event Listeners ===
	// socket.on("chat_message", data => {
	// 	console.log('got message',data)
	// 	const chatBox = document.getElementById("chatBox");
	// 	const div = document.createElement("div");
	// 	div.textContent = data;
	// 	chatBox.appendChild(div);
	// 	chatBox.scrollTop = chatBox.scrollHeight;
	// });
	socket.on("chat_message", function (data) {
		var chatBox = document.getElementById("chatBox");
		var newMessage = document.createElement("div");
		newMessage.textContent = data.username + ": " + data.message;
		chatBox.appendChild(newMessage);
		chatBox.scrollTop = chatBox.scrollHeight;
	});
	socket.on("games_list", games => {
		console.log("Games list:", games);
		const sel = document.getElementById("gameSelect");
		sel.innerHTML = "";
		console.log('games', games)
		games.forEach(g => {
			const opt = document.createElement("option");
			opt.value = g;
			opt.textContent = g;
			sel.appendChild(opt);
		});
		if (games.length > 0) {
			sel.value = arrLast(games);
		}
	});

	socket.on("game_started", data => {
		console.log("Game started:", data);
		document.getElementById("gameIdInput").value = data.gameid;
		document.getElementById("stateGameId").value = data.gameid;
		updateGameState(data.state);
	});

	socket.on("game_update", updateGameState);
	socket.on("state", updateGameState);

	socket.on("error", err => {
		console.error("Error:", err.message);
		alert("Server error: " + err.message);
	});

	socket.on("user_joined", msg => {
		const chatBox = document.getElementById("chatBox");
		const div = document.createElement("div");
		div.textContent = `[JOIN] ${msg}`;
		div.style.color = "green";
		chatBox.appendChild(div);
	});

	socket.on("user_left", msg => {
		const chatBox = document.getElementById("chatBox");
		const div = document.createElement("div");
		div.textContent = `[LEAVE] ${msg}`;
		div.style.color = "red";
		chatBox.appendChild(div);
	});

	socket.emit("register", { username });
}
function stringBetween(sFull, sStart, sEnd) {
	return stringBefore(stringAfter(sFull, sStart), isdef(sEnd) ? sEnd : sStart);
}
function stringBetweenLast(sFull, sStart, sEnd) {
	let s1 = stringBeforeLast(sFull, isdef(sEnd) ? sEnd : sStart);
	return stringAfterLast(s1, sStart);
}



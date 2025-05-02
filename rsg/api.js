
// --- Configuration ---
const API_BASE = getBackendUrl();// 'https://your-api-domain.com/api';  // Change this to your backend address
console.log("API_BASE:", API_BASE);

// --- Generic API helper ---
async function api(method, endpoint, body = null) {
	try {
		const response = await fetch(`${API_BASE}${endpoint}`, {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: body ? JSON.stringify(body) : null
		});

		if (!response.ok) {
			throw new Error(`Server error: ${response.status}`);
		}

		const data = await response.json();
		console.log("API response:", data);
		return data;
	} catch (error) {
		console.error("API error:", error);
		alert(`API error: ${error.message}`);
		return null;
	}
}

// --- Game actions ---
// Get all saved game data
async function getAllTables() {
	const tables = await api('GET', '/get_tables');
	console.log(tables);
}

// Get all saved game IDs
async function getTableNames() {
	const names = await api('GET', '/get_table_names');
	console.log(names);
}

async function startGame(gameName, players, options = {}) {
	const data = {
		gamename: gameName,
		players,
		options
	};
	return await api('POST', '/start_game', data);
}

async function makeMove(gameId, move) {
	return await api('POST', `/make_move/${gameId}`, { move });
}

async function loadGame(gameId) {
	return await api('GET', `/load_game/${gameId}`);
}

async function saveGame(gameId, data) {
	return await api('POST', `/save_game/${gameId}`, data);
}

async function deleteGame(gameId) {
	return await api('DELETE', `/delete_game/${gameId}`);
}

async function getGameState(gameId) {
	return await api('GET', `/game_state/${gameId}`);
}

async function restartGame() {
	return await api('POST', '/restart');
}


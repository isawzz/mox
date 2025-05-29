
function genTTT4() {
	// Generalized Multi-player Tic Tac Toe with Setup Screen

	let settings = {
		rows: 6,
		cols: 7,
		winLength: 4,
		players: []
	};

	let board;
	let currentPlayerIdx = 0;

	function initializeBoard(rows, cols) {
		return Array.from({ length: rows }, () => Array(cols).fill(null));
	}

	function showSetupScreen() {
		document.body.innerHTML = `
    <style>
      .row { display: flex; }
      .cell {
        width: 40px;
        height: 40px;
        border: 1px solid #999;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        cursor: pointer;
      }
      .setup-container {
        font-family: sans-serif;
        padding: 1rem;
      }
      .setup-container input {
        margin-right: 1rem;
      }
    </style>
    <div class="setup-container">
      <h2>Game Setup</h2>
      <label>Rows: <input id="rows" type="number" value="6" min="3" max="10"></label><br>
      <label>Columns: <input id="cols" type="number" value="7" min="3" max="10"></label><br>
      <label>Win Length: <input id="winLength" type="number" value="4" min="3" max="7"></label><br><br>
      <label>Number of Players: <input id="numPlayers" type="number" value="2" min="2" max="8"></label><br>
      <div id="playerSetup"></div>
      <button onclick="genTTT4().startGame()">Start Game</button>
    </div>
  `;

		document.getElementById("numPlayers").addEventListener("input", () => {
			const n = parseInt(document.getElementById("numPlayers").value);
			const container = document.getElementById("playerSetup");
			container.innerHTML = '';
			for (let i = 0; i < n; i++) {
				container.innerHTML += `
        <label>
          Player ${i + 1} Symbol: <input id="p${i}sym" value="${String.fromCharCode(88 + i)}" maxlength="1">
          Is AI: <input id="p${i}ai" type="checkbox">
        </label><br>
      `;
			}
		});

		document.getElementById("numPlayers").dispatchEvent(new Event("input"));
	}

	function startGame() {
		settings.rows = parseInt(document.getElementById("rows").value);
		settings.cols = parseInt(document.getElementById("cols").value);
		settings.winLength = parseInt(document.getElementById("winLength").value);
		const numPlayers = parseInt(document.getElementById("numPlayers").value);
		settings.players = [];
		for (let i = 0; i < numPlayers; i++) {
			const symbol = document.getElementById(`p${i}sym`).value;
			const isAI = document.getElementById(`p${i}ai`).checked;
			settings.players.push({ symbol, isAI });
		}
		board = initializeBoard(settings.rows, settings.cols);
		currentPlayerIdx = 0;
		renderBoard();
		requestNextTurn();
	}

	function getLegalMoves(board) {
		const moves = [];
		for (let r = 0; r < board.length; r++) {
			for (let c = 0; c < board[0].length; c++) {
				if (board[r][c] === null) {
					moves.push({ row: r, col: c });
				}
			}
		}
		return moves;
	}

	function applyMove(board, move, playerSymbol) {
		const newBoard = board.map(row => row.slice());
		newBoard[move.row][move.col] = playerSymbol;
		return newBoard;
	}

	function isTerminal(board) {
		return settings.players.some(p => hasWon(board, p.symbol, settings.winLength)) || getLegalMoves(board).length === 0;
	}

	function evaluate(board) {
		return settings.players.map(p => {
			if (hasWon(board, p.symbol, settings.winLength)) return 1000;
			return countPartialLines(board, p.symbol, settings.winLength - 1);
		});
	}

	function hasWon(board, player, winLength) {
		const rows = board.length;
		const cols = board[0].length;
		const directions = [
			{ dr: 0, dc: 1 },
			{ dr: 1, dc: 0 },
			{ dr: 1, dc: 1 },
			{ dr: 1, dc: -1 }
		];
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				if (board[r][c] !== player) continue;
				for (let { dr, dc } of directions) {
					let count = 0;
					for (let k = 0; k < winLength; k++) {
						const nr = r + dr * k;
						const nc = c + dc * k;
						if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === player) {
							count++;
						} else {
							break;
						}
					}
					if (count === winLength) return true;
				}
			}
		}
		return false;
	}

	function countPartialLines(board, player, targetLength) {
		const directions = [
			{ dr: 0, dc: 1 },
			{ dr: 1, dc: 0 },
			{ dr: 1, dc: 1 },
			{ dr: 1, dc: -1 }
		];
		const rows = board.length;
		const cols = board[0].length;
		let count = 0;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				for (let { dr, dc } of directions) {
					let playerCount = 0;
					let emptyCount = 0;
					let blocked = false;
					for (let k = 0; k < targetLength; k++) {
						const nr = r + dr * k;
						const nc = c + dc * k;
						if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
							blocked = true;
							break;
						}
						const cell = board[nr][nc];
						if (cell === player) playerCount++;
						else if (cell === null) emptyCount++;
						else {
							blocked = true;
							break;
						}
					}
					if (!blocked && playerCount + emptyCount === targetLength) {
						count++;
					}
				}
			}
		}
		return count;
	}

	function minimax(board, depth, maximizingPlayerIdx) {
		if (depth === 0 || isTerminal(board)) {
			const evals = evaluate(board);
			return { score: evals[maximizingPlayerIdx], move: null };
		}
		const legalMoves = getLegalMoves(board);
		let bestMove = null;
		let bestScore = -Infinity;
		for (let move of legalMoves) {
			const newBoard = applyMove(board, move, settings.players[maximizingPlayerIdx].symbol);
			const nextIdx = (maximizingPlayerIdx + 1) % settings.players.length;
			const result = minimax(newBoard, depth - 1, nextIdx);
			const score = -result.score;
			if (score > bestScore) {
				bestScore = score;
				bestMove = move;
			}
		}
		return { score: bestScore, move: bestMove };
	}

	function makeAIMove() {
		const currentPlayer = settings.players[currentPlayerIdx];
		const { move } = minimax(board, 2, currentPlayerIdx);
		if (move) {
			board = applyMove(board, move, currentPlayer.symbol);
			currentPlayerIdx = (currentPlayerIdx + 1) % settings.players.length;
			renderBoard();
			checkGameEnd();
			requestNextTurn();
		}
	}

	function requestNextTurn() {
		if (settings.players[currentPlayerIdx].isAI) {
			setTimeout(makeAIMove, 300);
		}
	}

	function renderBoard() {
		document.body.innerHTML = '<div id="board"></div>';
		const boardDiv = document.getElementById("board");
		board.forEach((row, r) => {
			const rowDiv = document.createElement("div");
			rowDiv.className = "row";
			row.forEach((cell, c) => {
				const cellDiv = document.createElement("div");
				cellDiv.className = "cell";
				cellDiv.textContent = cell || '';
				if (cell === null && !settings.players[currentPlayerIdx].isAI) {
					cellDiv.addEventListener("click", () => {
						board = applyMove(board, { row: r, col: c }, settings.players[currentPlayerIdx].symbol);
						currentPlayerIdx = (currentPlayerIdx + 1) % settings.players.length;
						renderBoard();
						checkGameEnd();
						requestNextTurn();
					});
				}
				rowDiv.appendChild(cellDiv);
			});
			boardDiv.appendChild(rowDiv);
		});
	}

	function checkGameEnd() {
		const prevPlayer = settings.players[(currentPlayerIdx - 1 + settings.players.length) % settings.players.length];
		if (hasWon(board, prevPlayer.symbol, settings.winLength)) {
			alert(`Player ${prevPlayer.symbol} wins!`);
		} else if (getLegalMoves(board).length === 0) {
			alert("It's a draw!");
		}
	}

	showSetupScreen();

}
function genTTT() {
	// Generalized Multi-player Tic Tac Toe (n x m board, k in a row to win) with UI and Minimax AI

	const settings = {
		rows: 6,
		cols: 7,
		winLength: 4,
		players: [
			{ symbol: 'X', isAI: false },
			{ symbol: 'O', isAI: true },
			{ symbol: 'A', isAI: true }
		]
	};

	let board = initializeBoard(settings.rows, settings.cols);
	let currentPlayerIdx = 0;

	function initializeBoard(rows, cols) {
		return Array.from({ length: rows }, () => Array(cols).fill(null));
	}

	function getLegalMoves(board) {
		const moves = [];
		for (let r = 0; r < board.length; r++) {
			for (let c = 0; c < board[0].length; c++) {
				if (board[r][c] === null) {
					moves.push({ row: r, col: c });
				}
			}
		}
		return moves;
	}

	function applyMove(board, move, playerSymbol) {
		const newBoard = board.map(row => row.slice());
		newBoard[move.row][move.col] = playerSymbol;
		return newBoard;
	}

	function isTerminal(board) {
		return settings.players.some(p => hasWon(board, p.symbol, settings.winLength)) || getLegalMoves(board).length === 0;
	}

	function evaluate(board) {
		return settings.players.map(p => {
			if (hasWon(board, p.symbol, settings.winLength)) return 1000;
			return countPartialLines(board, p.symbol, settings.winLength - 1);
		});
	}

	function hasWon(board, player, winLength) {
		const rows = board.length;
		const cols = board[0].length;
		const directions = [
			{ dr: 0, dc: 1 },
			{ dr: 1, dc: 0 },
			{ dr: 1, dc: 1 },
			{ dr: 1, dc: -1 }
		];
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				if (board[r][c] !== player) continue;
				for (let { dr, dc } of directions) {
					let count = 0;
					for (let k = 0; k < winLength; k++) {
						const nr = r + dr * k;
						const nc = c + dc * k;
						if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === player) {
							count++;
						} else {
							break;
						}
					}
					if (count === winLength) return true;
				}
			}
		}
		return false;
	}

	function countPartialLines(board, player, targetLength) {
		const directions = [
			{ dr: 0, dc: 1 },
			{ dr: 1, dc: 0 },
			{ dr: 1, dc: 1 },
			{ dr: 1, dc: -1 }
		];
		const rows = board.length;
		const cols = board[0].length;
		let count = 0;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				for (let { dr, dc } of directions) {
					let playerCount = 0;
					let emptyCount = 0;
					let blocked = false;
					for (let k = 0; k < targetLength; k++) {
						const nr = r + dr * k;
						const nc = c + dc * k;
						if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
							blocked = true;
							break;
						}
						const cell = board[nr][nc];
						if (cell === player) playerCount++;
						else if (cell === null) emptyCount++;
						else {
							blocked = true;
							break;
						}
					}
					if (!blocked && playerCount + emptyCount === targetLength) {
						count++;
					}
				}
			}
		}
		return count;
	}

	function minimax(board, depth, maximizingPlayerIdx) {
		if (depth === 0 || isTerminal(board)) {
			const evals = evaluate(board);
			return { score: evals[maximizingPlayerIdx], move: null };
		}
		const legalMoves = getLegalMoves(board);
		let bestMove = null;
		let bestScore = -Infinity;
		for (let move of legalMoves) {
			const newBoard = applyMove(board, move, settings.players[maximizingPlayerIdx].symbol);
			const nextIdx = (maximizingPlayerIdx + 1) % settings.players.length;
			const result = minimax(newBoard, depth - 1, nextIdx);
			const score = -result.score; // Simplified Max^n turn structure
			if (score > bestScore) {
				bestScore = score;
				bestMove = move;
			}
		}
		return { score: bestScore, move: bestMove };
	}

	function makeAIMove() {
		const currentPlayer = settings.players[currentPlayerIdx];
		const { move } = minimax(board, 2, currentPlayerIdx); // Adjustable depth
		if (move) {
			board = applyMove(board, move, currentPlayer.symbol);
			currentPlayerIdx = (currentPlayerIdx + 1) % settings.players.length;
			renderBoard();
			checkGameEnd();
			requestNextTurn();
		}
	}

	function requestNextTurn() {
		if (settings.players[currentPlayerIdx].isAI) {
			setTimeout(makeAIMove, 300);
		}
	}

	function renderBoard() {
		const boardDiv = document.getElementById("board");
		boardDiv.innerHTML = '';
		board.forEach((row, r) => {
			const rowDiv = document.createElement("div");
			rowDiv.className = "row";
			row.forEach((cell, c) => {
				const cellDiv = document.createElement("div");
				cellDiv.className = "cell";
				cellDiv.textContent = cell || '';
				if (cell === null && !settings.players[currentPlayerIdx].isAI) {
					cellDiv.addEventListener("click", () => {
						board = applyMove(board, { row: r, col: c }, settings.players[currentPlayerIdx].symbol);
						currentPlayerIdx = (currentPlayerIdx + 1) % settings.players.length;
						renderBoard();
						checkGameEnd();
						requestNextTurn();
					});
				}
				rowDiv.appendChild(cellDiv);
			});
			boardDiv.appendChild(rowDiv);
		});
	}

	function checkGameEnd() {
		const prevPlayer = settings.players[(currentPlayerIdx - 1 + settings.players.length) % settings.players.length];
		if (hasWon(board, prevPlayer.symbol, settings.winLength)) {
			alert(`Player ${prevPlayer.symbol} wins!`);
		} else if (getLegalMoves(board).length === 0) {
			alert("It's a draw!");
		}
	}

	document.body.innerHTML = `
			<style>
				.row { display: flex; }
				.cell {
					width: 40px;
					height: 40px;
					border: 1px solid #999;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 20px;
					cursor: pointer;
				}
			</style>
			<div id="board"></div>
		`;

	renderBoard();
	requestNextTurn();

}

function genT() {
	// Generalized Multi-player Tic Tac Toe (n x m board, k in a row to win)

	const players = ['X', 'O', 'A']; // Up to 8 players
	const winLength = 4;
	const rows = 6;
	const cols = 7;
	let currentPlayerIdx = 0;
	let board = initializeBoard(rows, cols);

	function initializeBoard(rows, cols) {
		return Array.from({ length: rows }, () => Array(cols).fill(null));
	}

	function printBoard(board) {
		console.log(board.map(row => row.map(cell => cell || '.').join(' ')).join('\n'));
	}

	function getLegalMoves(board) {
		const moves = [];
		for (let r = 0; r < board.length; r++) {
			for (let c = 0; c < board[0].length; c++) {
				if (board[r][c] === null) {
					moves.push({ row: r, col: c });
				}
			}
		}
		return moves;
	}

	function applyMove(board, move, player) {
		const newBoard = board.map(row => row.slice());
		newBoard[move.row][move.col] = player;
		return newBoard;
	}

	function isTerminal(board, players, winLength) {
		return players.some(p => hasWon(board, p, winLength)) || getLegalMoves(board).length === 0;
	}

	function evaluate(board, players, winLength) {
		return players.map(p => {
			if (hasWon(board, p, winLength)) return 1000;
			return countPartialLines(board, p, winLength - 1);
		});
	}

	function hasWon(board, player, winLength) {
		const rows = board.length;
		const cols = board[0].length;
		const directions = [
			{ dr: 0, dc: 1 },
			{ dr: 1, dc: 0 },
			{ dr: 1, dc: 1 },
			{ dr: 1, dc: -1 }
		];
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				if (board[r][c] !== player) continue;
				for (let { dr, dc } of directions) {
					let count = 0;
					for (let k = 0; k < winLength; k++) {
						const nr = r + dr * k;
						const nc = c + dc * k;
						if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === player) {
							count++;
						} else {
							break;
						}
					}
					if (count === winLength) return true;
				}
			}
		}
		return false;
	}

	function countPartialLines(board, player, targetLength) {
		const directions = [
			{ dr: 0, dc: 1 },
			{ dr: 1, dc: 0 },
			{ dr: 1, dc: 1 },
			{ dr: 1, dc: -1 }
		];
		const rows = board.length;
		const cols = board[0].length;
		let count = 0;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				for (let { dr, dc } of directions) {
					let playerCount = 0;
					let emptyCount = 0;
					let blocked = false;
					for (let k = 0; k < targetLength; k++) {
						const nr = r + dr * k;
						const nc = c + dc * k;
						if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
							blocked = true;
							break;
						}
						const cell = board[nr][nc];
						if (cell === player) playerCount++;
						else if (cell === null) emptyCount++;
						else {
							blocked = true;
							break;
						}
					}
					if (!blocked && playerCount + emptyCount === targetLength) {
						count++;
					}
				}
			}
		}
		return count;
	}

	// Example play loop for console:
	function playGame() {
		while (!isTerminal(board, players, winLength)) {
			printBoard(board);
			const player = players[currentPlayerIdx];
			const moves = getLegalMoves(board);
			const move = moves[Math.floor(Math.random() * moves.length)]; // replace with AI later
			board = applyMove(board, move, player);
			if (hasWon(board, player, winLength)) {
				printBoard(board);
				console.log(`Player ${player} wins!`);
				return;
			}
			currentPlayerIdx = (currentPlayerIdx + 1) % players.length;
		}
		printBoard(board);
		console.log("It's a draw!");
	}

	playGame();
}
function genTT() {
	// Generalized Multi-player Tic Tac Toe (n x m board, k in a row to win) with UI and Minimax AI

	const players = ['X', 'O', 'A']; // Up to 8 players
	const winLength = 4;
	const rows = 6;
	const cols = 7;
	let currentPlayerIdx = 0;
	let board = initializeBoard(rows, cols);

	function initializeBoard(rows, cols) {
		return Array.from({ length: rows }, () => Array(cols).fill(null));
	}

	function getLegalMoves(board) {
		const moves = [];
		for (let r = 0; r < board.length; r++) {
			for (let c = 0; c < board[0].length; c++) {
				if (board[r][c] === null) {
					moves.push({ row: r, col: c });
				}
			}
		}
		return moves;
	}

	function applyMove(board, move, player) {
		const newBoard = board.map(row => row.slice());
		newBoard[move.row][move.col] = player;
		return newBoard;
	}

	function isTerminal(board, players, winLength) {
		return players.some(p => hasWon(board, p, winLength)) || getLegalMoves(board).length === 0;
	}

	function evaluate(board, players, winLength) {
		return players.map(p => {
			if (hasWon(board, p, winLength)) return 1000;
			return countPartialLines(board, p, winLength - 1);
		});
	}

	function hasWon(board, player, winLength) {
		const rows = board.length;
		const cols = board[0].length;
		const directions = [
			{ dr: 0, dc: 1 },
			{ dr: 1, dc: 0 },
			{ dr: 1, dc: 1 },
			{ dr: 1, dc: -1 }
		];
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				if (board[r][c] !== player) continue;
				for (let { dr, dc } of directions) {
					let count = 0;
					for (let k = 0; k < winLength; k++) {
						const nr = r + dr * k;
						const nc = c + dc * k;
						if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === player) {
							count++;
						} else {
							break;
						}
					}
					if (count === winLength) return true;
				}
			}
		}
		return false;
	}

	function countPartialLines(board, player, targetLength) {
		const directions = [
			{ dr: 0, dc: 1 },
			{ dr: 1, dc: 0 },
			{ dr: 1, dc: 1 },
			{ dr: 1, dc: -1 }
		];
		const rows = board.length;
		const cols = board[0].length;
		let count = 0;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				for (let { dr, dc } of directions) {
					let playerCount = 0;
					let emptyCount = 0;
					let blocked = false;
					for (let k = 0; k < targetLength; k++) {
						const nr = r + dr * k;
						const nc = c + dc * k;
						if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
							blocked = true;
							break;
						}
						const cell = board[nr][nc];
						if (cell === player) playerCount++;
						else if (cell === null) emptyCount++;
						else {
							blocked = true;
							break;
						}
					}
					if (!blocked && playerCount + emptyCount === targetLength) {
						count++;
					}
				}
			}
		}
		return count;
	}

	function minimax(board, depth, maximizingPlayerIdx) {
		if (depth === 0 || isTerminal(board, players, winLength)) {
			const evals = evaluate(board, players, winLength);
			return { score: evals[maximizingPlayerIdx], move: null };
		}
		const legalMoves = getLegalMoves(board);
		let bestMove = null;
		let bestScore = -Infinity;
		for (let move of legalMoves) {
			const newBoard = applyMove(board, move, players[maximizingPlayerIdx]);
			const nextIdx = (maximizingPlayerIdx + 1) % players.length;
			const result = minimax(newBoard, depth - 1, nextIdx);
			const score = -result.score; // Simplified Max^n turn structure
			if (score > bestScore) {
				bestScore = score;
				bestMove = move;
			}
		}
		return { score: bestScore, move: bestMove };
	}

	function makeAIMove() {
		const currentPlayer = players[currentPlayerIdx];
		const { move } = minimax(board, 2, currentPlayerIdx); // Adjustable depth
		if (move) {
			board = applyMove(board, move, currentPlayer);
			currentPlayerIdx = (currentPlayerIdx + 1) % players.length;
			renderBoard();
			checkGameEnd();
		}
	}

	function renderBoard() {
		const boardDiv = document.getElementById("board");
		boardDiv.innerHTML = '';
		board.forEach((row, r) => {
			const rowDiv = document.createElement("div");
			rowDiv.className = "row";
			row.forEach((cell, c) => {
				const cellDiv = document.createElement("div");
				cellDiv.className = "cell";
				cellDiv.textContent = cell || '';
				if (cell === null) {
					cellDiv.addEventListener("click", () => {
						board = applyMove(board, { row: r, col: c }, players[currentPlayerIdx]);
						currentPlayerIdx = (currentPlayerIdx + 1) % players.length;
						renderBoard();
						checkGameEnd();
						if (players[currentPlayerIdx] === 'A') {
							setTimeout(makeAIMove, 300);
						}
					});
				}
				rowDiv.appendChild(cellDiv);
			});
			boardDiv.appendChild(rowDiv);
		});
	}

	function checkGameEnd() {
		const currentPlayer = players[(currentPlayerIdx - 1 + players.length) % players.length];
		if (hasWon(board, currentPlayer, winLength)) {
			alert(`Player ${currentPlayer} wins!`);
		} else if (getLegalMoves(board).length === 0) {
			alert("It's a draw!");
		}
	}

	document.body.innerHTML = `
  <style>
    .row { display: flex; }
    .cell {
      width: 40px;
      height: 40px;
      border: 1px solid #999;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      cursor: pointer;
    }
  </style>
  <div id="board"></div>
`;

	renderBoard();
	if (players[currentPlayerIdx] === 'A') makeAIMove();

}


class Game {
	constructor(players, options = null) {
		this.players = players;
		this.turn = 0;
		this.state = "setup";
	}
	serialize() {
		return {
			players: this.players,
			turn: this.turn,
			state: this.state,
		};
	}
	deserialize(data) {
		this.players = data.players;
		this.turn = data.turn;
		this.state = data.state;
	}
	get_state() {
		return {
			state: this.serialize(),
			possible_moves: ["roll_dice", "build_road", "end_turn"],
			current_players: this.players,
		};
	}
	make_move(move) {
		const action = move.action;
		if (action === "end_turn") {
			this.turn = (this.turn + 1) % this.players.length;
		}
		return this.get_state();
	}
}
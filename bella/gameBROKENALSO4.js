
// game.js

let settings = {
	rows: 3,
	cols: 3,
	winLength: 3,
	players: [] // Will be set in setup screen
};

function setupPlayers(numPlayers) {
	settings.players = [];
	for (let i = 0; i < numPlayers; i++) {
		settings.players.push({
			type: 'human', // or 'ai'
			difficulty: 'medium' // easy, medium, hard
		});
	}
}

function initializeBoard(rows, cols) {
	const board = [];
	for (let r = 0; r < rows; r++) {
		const row = [];
		for (let c = 0; c < cols; c++) {
			row.push(null);
		}
		board.push(row);
	}
	return board;
}

function isTerminal(board) {
	return getLegalMoves(board).length === 0 || evaluate(board) !== 0;
}

function getLegalMoves(board) {
	const moves = [];
	for (let r = 0; r < board.length; r++) {
		for (let c = 0; c < board[0].length; c++) {
			if (board[r][c] === null) {
				moves.push([r, c]);
			}
		}
	}
	return moves;
}

function evaluate(board) {
	const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
	for (let r = 0; r < board.length; r++) {
		for (let c = 0; c < board[0].length; c++) {
			const player = board[r][c];
			if (player === null) continue;
			for (const [dr, dc] of directions) {
				let count = 1;
				let nr = r + dr, nc = c + dc;
				while (
					nr >= 0 && nr < board.length &&
					nc >= 0 && nc < board[0].length &&
					board[nr][nc] === player
				) {
					count++;
					if (count >= settings.winLength) return player + 1;
					nr += dr;
					nc += dc;
				}
			}
		}
	}
	return 0; // no winner yet
}

function minimax(board, depth, alpha, beta, maximizingPlayer, currentPlayer) {
	if (depth === 0 || isTerminal(board)) {
		return { score: evaluate(board) === currentPlayer + 1 ? 10 : -10 };
	}

	const moves = getLegalMoves(board);
	let bestMove = null;

	if (maximizingPlayer) {
		let maxEval = -Infinity;
		for (const [r, c] of moves) {
			board[r][c] = currentPlayer;
			const evalResult = minimax(board, depth - 1, alpha, beta, false, currentPlayer);
			board[r][c] = null;
			if (evalResult.score > maxEval) {
				maxEval = evalResult.score;
				bestMove = [r, c];
			}
			alpha = Math.max(alpha, evalResult.score);
			if (beta <= alpha) break;
		}
		return { score: maxEval, move: bestMove };
	} else {
		let minEval = Infinity;
		for (const [r, c] of moves) {
			board[r][c] = (currentPlayer + 1) % settings.players.length;
			const evalResult = minimax(board, depth - 1, alpha, beta, true, currentPlayer);
			board[r][c] = null;
			if (evalResult.score < minEval) {
				minEval = evalResult.score;
				bestMove = [r, c];
			}
			beta = Math.min(beta, evalResult.score);
			if (beta <= alpha) break;
		}
		return { score: minEval, move: bestMove };
	}
}

function getAIDepth(difficulty) {
	switch (difficulty) {
		case 'easy': return 1;
		case 'medium': return 3;
		case 'hard': return 5;
		default: return 2;
	}
}

function getAIMove(board, currentPlayer) {
	const { difficulty } = settings.players[currentPlayer];
	const depth = getAIDepth(difficulty);
	return minimax(board, depth, -Infinity, Infinity, true, currentPlayer).move;
}


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

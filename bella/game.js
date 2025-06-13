
function cryptid(){

}

function genTTT() {

	const settings = {
		rows: 6,
		cols: 6,
		winLength: 4,
		players: [
			{ symbol: 'X', isAI: true, level: 'hard', color: 'red' },
			{ symbol: 'O', isAI: false, level: 'easy', color: 'blue' },
			{ symbol: 'A', isAI: true, level: 'easy', color: 'gold' },
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



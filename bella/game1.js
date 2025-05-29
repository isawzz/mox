
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

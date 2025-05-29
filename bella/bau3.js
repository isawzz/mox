
function genttt(){
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
function isTerminal(board, players, winLength) {
	return players.some(p => hasWon(board, p, winLength)) || getLegalMoves(board).length === 0;
}
function evaluate(board, players, winLength) {
	const scores = players.map(p => {
		if (hasWon(board, p, winLength)) return 1000;
		let partialLines = countPartialLines(board, p, winLength - 1);
		return partialLines;
	});
	return scores;
}
function hasWon(board, player, winLength) {
	const rows = board.length;
	const cols = board[0].length;

	const directions = [
		{ dr: 0, dc: 1 },   // horizontal
		{ dr: 1, dc: 0 },   // vertical
		{ dr: 1, dc: 1 },   // diagonal down-right
		{ dr: 1, dc: -1 }   // diagonal down-left
	];

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (board[r][c] !== player) continue;

			for (let { dr, dc } of directions) {
				let count = 0;
				for (let k = 0; k < winLength; k++) {
					const nr = r + dr * k;
					const nc = c + dc * k;
					if (
						nr >= 0 && nr < rows &&
						nc >= 0 && nc < cols &&
						board[nr][nc] === player
					) {
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

}



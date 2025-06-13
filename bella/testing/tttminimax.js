
function getBestMove(board, isMaximizing = true) {
	let bestScore = isMaximizing ? -Infinity : Infinity;
	let bestMove = null;

	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			if (board[row][col] === null) {
				// Try the move
				board[row][col] = isMaximizing ? 'X' : 'O';

				// Recursively score the move
				let score = minimax(board, 0, !isMaximizing);

				// Undo the move
				board[row][col] = null;

				if (isMaximizing ? score > bestScore : score < bestScore) {
					bestScore = score;
					bestMove = { row, col };
				}
			}
		}
	}

	return bestMove;
}

function minimax(board, depth, isMaximizing) {
	const result = checkWinner(board);
	if (result !== null) {
		return score(result, depth);
	}

	let best = isMaximizing ? -Infinity : Infinity;

	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			if (board[row][col] === null) {
				board[row][col] = isMaximizing ? 'X' : 'O';
				let eval = minimax(board, depth + 1, !isMaximizing);
				board[row][col] = null;
				best = isMaximizing ? Math.max(best, eval) : Math.min(best, eval);
			}
		}
	}

	return best;
}

function score(result, depth) {
	if (result === 'X') return 10 - depth;
	if (result === 'O') return depth - 10;
	return 0;
}

function checkWinner(board) {
	const lines = [
		// rows
		[[0, 0], [0, 1], [0, 2]],
		[[1, 0], [1, 1], [1, 2]],
		[[2, 0], [2, 1], [2, 2]],
		// columns
		[[0, 0], [1, 0], [2, 0]],
		[[0, 1], [1, 1], [2, 1]],
		[[0, 2], [1, 2], [2, 2]],
		// diagonals
		[[0, 0], [1, 1], [2, 2]],
		[[0, 2], [1, 1], [2, 0]]
	];

	for (const [[a1, a2], [b1, b2], [c1, c2]] of lines) {
		const val = board[a1][a2];
		if (val && val === board[b1][b2] && val === board[c1][c2]) {
			return val;
		}
	}

	if (board.flat().every(cell => cell !== null)) {
		return 'draw';
	}

	return null;
}

async function test1_minimax0() {
	const board = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
		// ['X', null, null],
		// ['O', 'X', null],
		// ['O', null, null]
	];

	const move = getBestMove(board);
	console.log("AI should play at:", move);
	// Output: { row: 2, col: 2 } or similar optimal move
}

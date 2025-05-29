
function maxNttt() {
	function maxN(state, depth, players, currentPlayerIdx, evaluate, getLegalMoves, applyMove, isTerminal) {
		if (depth === 0 || isTerminal(state)) {
			return {
				move: null,
				score: evaluate(state)
			};
		}

		const currentPlayer = players[currentPlayerIdx];
		let bestScore = null;
		let bestMove = null;

		for (const move of getLegalMoves(state, currentPlayer)) {
			const newState = applyMove(state, move, currentPlayer);
			const result = maxN(
				newState,
				depth - 1,
				players,
				(currentPlayerIdx + 1) % players.length,
				evaluate,
				getLegalMoves,
				applyMove,
				isTerminal
			);

			if (
				!bestScore ||
				result.score[currentPlayerIdx] > bestScore[currentPlayerIdx]
			) {
				bestScore = result.score;
				bestMove = move;
			}
		}

		return { move: bestMove, score: bestScore };
	}
	function getLegalMoves(board, player) {
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
		const newBoard = board.map(row => row.slice()); // deep copy
		newBoard[move.row][move.col] = player;
		return newBoard;
	}

	function isTerminal(board) {
		return board.flat().every(cell => cell !== null);
	}

	function evaluate(board) {
		// Dummy evaluation: count number of cells each player owns
		const scores = {};
		for (let row of board) {
			for (let cell of row) {
				if (cell != null) {
					scores[cell] = (scores[cell] || 0) + 1;
				}
			}
		}

		// Return scores as a vector ordered by player ID
		return ['A', 'B', 'C'].map(p => scores[p] || 0);
	}
}

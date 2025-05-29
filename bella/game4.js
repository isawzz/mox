
function genTTTT() {
	// Generalized Tic Tac Toe Game Logic with Setup Support

	let settings = {
		rows: 3,
		cols: 3,
		winLength: 3,
		players: [] // e.g., [{type: 'human'}, {type: 'ai', difficulty: 'medium'}]
	};

	let board = [];
	let currentPlayer = 0;

	function initializeBoard(rows, cols) {
		return Array.from({ length: rows }, () => Array(cols).fill(null));
	}

	function startGame(rows, cols, winLength, playerSettings) {
		settings.rows = rows;
		settings.cols = cols;
		settings.winLength = winLength;
		settings.players = playerSettings;
		board = initializeBoard(rows, cols);
		currentPlayer = 0;
		renderBoard();
	}

	function renderBoard() {
		const boardDiv = document.getElementById('board');
		boardDiv.style.gridTemplateColumns = `repeat(${settings.cols}, 40px)`;
		boardDiv.innerHTML = '';

		for (let r = 0; r < settings.rows; r++) {
			for (let c = 0; c < settings.cols; c++) {
				const cell = document.createElement('div');
				cell.className = 'cell';
				cell.textContent = board[r][c] !== null ? board[r][c] + 1 : '';
				cell.onclick = () => handleMove(r, c);
				boardDiv.appendChild(cell);
			}
		}

		if (settings.players[currentPlayer].type === 'ai') {
			const move = getAIMove(board, currentPlayer, settings.players[currentPlayer].difficulty);
			if (move) setTimeout(() => handleMove(...move), 300);
		}
	}

	function handleMove(r, c) {
		if (board[r][c] !== null || settings.players[currentPlayer].type === 'ai') return;
		board[r][c] = currentPlayer;
		if (evaluate(board, currentPlayer, settings.winLength) > 0 || isTerminal(board)) {
			alert(`Player ${currentPlayer + 1} wins or game over!`);
			return;
		}
		currentPlayer = (currentPlayer + 1) % settings.players.length;
		renderBoard();
	}

	function evaluate(board, player, winLength) {
		// Check rows, cols, diags for winLength in a row for player
		const rows = board.length;
		const cols = board[0].length;

		function countDirection(r, c, dr, dc) {
			let count = 0;
			while (
				r >= 0 && r < rows &&
				c >= 0 && c < cols &&
				board[r][c] === player
			) {
				count++;
				r += dr;
				c += dc;
			}
			return count;
		}

		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				if (board[r][c] !== player) continue;
				if (
					countDirection(r, c, 0, 1) >= winLength ||
					countDirection(r, c, 1, 0) >= winLength ||
					countDirection(r, c, 1, 1) >= winLength ||
					countDirection(r, c, 1, -1) >= winLength
				) {
					return 1;
				}
			}
		}
		return 0;
	}

	function getLegalMoves(board) {
		const moves = [];
		for (let r = 0; r < board.length; r++) {
			for (let c = 0; c < board[0].length; c++) {
				if (board[r][c] === null) moves.push([r, c]);
			}
		}
		return moves;
	}

	function isTerminal(board) {
		return getLegalMoves(board).length === 0;
	}

	function getAIMove(board, player, difficulty) {
		const legalMoves = getLegalMoves(board);
		if (difficulty === 'easy') {
			return legalMoves[Math.floor(Math.random() * legalMoves.length)];
		}
		// Medium and hard use minimax with increasing depth
		const depth = difficulty === 'medium' ? 2 : 4;
		const [move] = minimax(board, player, depth, -Infinity, Infinity, true);
		return move;
	}

	function minimax(board, player, depth, alpha, beta, maximizing) {
		const opponent = (player + 1) % settings.players.length;
		if (depth === 0 || isTerminal(board)) {
			const score = evaluate(board, player, settings.winLength) - evaluate(board, opponent, settings.winLength);
			return [null, score];
		}

		const legalMoves = getLegalMoves(board);
		let bestMove = null;

		if (maximizing) {
			let maxEval = -Infinity;
			for (const [r, c] of legalMoves) {
				board[r][c] = player;
				const [, evalScore] = minimax(board, player, depth - 1, alpha, beta, false);
				board[r][c] = null;
				if (evalScore > maxEval) {
					maxEval = evalScore;
					bestMove = [r, c];
				}
				alpha = Math.max(alpha, evalScore);
				if (beta <= alpha) break;
			}
			return [bestMove, maxEval];
		} else {
			let minEval = Infinity;
			for (const [r, c] of legalMoves) {
				board[r][c] = opponent;
				const [, evalScore] = minimax(board, player, depth - 1, alpha, beta, true);
				board[r][c] = null;
				if (evalScore < minEval) {
					minEval = evalScore;
					bestMove = [r, c];
				}
				beta = Math.min(beta, evalScore);
				if (beta <= alpha) break;
			}
			return [bestMove, minEval];
		}
	}

}
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
  const directions = [[1,0], [0,1], [1,1], [1,-1]];
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

function minimaxAlphaBeta(board, depth, alpha, beta, isMaximizingPlayer, get_possible_moves, evaluate_board, apply_move) {
    const possibleMoves = get_possible_moves(board, isMaximizingPlayer);

    if (depth === 0 || possibleMoves.length === 0) {
        return evaluate_board(board, depth);
    }

    if (isMaximizingPlayer) {
        let maxEval = -Infinity;
        for (const move of possibleMoves) {
            // Apply the move to get a new board state
            // IMPORTANT: apply_move must return a NEW board object, not modify the original.
            const newBoard = apply_move(board, move);

            // Recursively call minimax for the opponent's turn
            const evalScore = minimaxAlphaBeta(newBoard, depth - 1, alpha, beta, false, get_possible_moves, evaluate_board, apply_move);
            maxEval = Math.max(maxEval, evalScore);
            alpha = Math.max(alpha, evalScore);

            // Alpha-Beta Pruning: if beta <= alpha, the minimizing player (parent)
            // already has a better option, so we can prune this branch.
            if (beta <= alpha) {
                break;
            }
        }
        return maxEval;
    } else { // Minimizing player
        let minEval = Infinity;
        for (const move of possibleMoves) {
            // Apply the move to get a new board state
            const newBoard = apply_move(board, move);

            // Recursively call minimax for the opponent's turn
            const evalScore = minimaxAlphaBeta(newBoard, depth - 1, alpha, beta, true, get_possible_moves, evaluate_board, apply_move);
            minEval = Math.min(minEval, evalScore);
            beta = Math.min(beta, evalScore);

            // Alpha-Beta Pruning: if beta <= alpha, the maximizing player (parent)
            // already has a better option, so we can prune this branch.
            if (beta <= alpha) {
                break;
            }
        }
        return minEval;
    }
}

function findBestMove(initialBoard, depth, get_possible_moves, evaluate_board, apply_move, isMaximizingPlayerInitially = true) {
    if (depth <= 0) {
        console.error("Search depth must be greater than 0.");
        return { move: null, score: evaluate_board(initialBoard, 0) };
    }

    let bestMove = null;
    let bestValue;

    const possibleMoves = get_possible_moves(initialBoard, isMaximizingPlayerInitially);

    if (possibleMoves.length === 0) {
        // No moves possible from the initial state (e.g., game already over)
        return { move: null, score: evaluate_board(initialBoard, depth) };
    }

    if (isMaximizingPlayerInitially) {
        bestValue = -Infinity;
        for (const move of possibleMoves) {
            const newBoard = apply_move(initialBoard, move);
            // For the next level, it's the opponent's turn (minimizing player)
            // Initial alpha is -Infinity, initial beta is Infinity for the children of the root.
            const value = minimaxAlphaBeta(newBoard, depth - 1, -Infinity, Infinity, false, get_possible_moves, evaluate_board, apply_move);
            if (value > bestValue) {
                bestValue = value;
                bestMove = move;
            }
            // Note: No alpha/beta update at the root for choosing the *best move* itself,
            // alpha/beta is for pruning *within* the minimaxAlphaBeta calls.
            // However, if you wanted to pass the root's evolving alpha/beta to its children,
            // you could, but the standard approach is to re-initialize for each child's minimax call.
        }
    } else { // Initial player is minimizing
        bestValue = Infinity;
        for (const move of possibleMoves) {
            const newBoard = apply_move(initialBoard, move);
            // For the next level, it's the opponent's turn (maximizing player)
            const value = minimaxAlphaBeta(newBoard, depth - 1, -Infinity, Infinity, true, get_possible_moves, evaluate_board, apply_move);
            if (value < bestValue) {
                bestValue = value;
                bestMove = move;
            }
        }
    }

    return { move: bestMove, score: bestValue };
}

// --- Example Placeholder Functions (User must implement these for their specific game) ---

/*
function example_get_possible_moves(board, isMaximizingPlayer) {
    // CONSOLE LOGGING FOR DEBUG PURPOSES
    // console.log(`get_possible_moves called for player: ${isMaximizingPlayer ? 'Maximizing' : 'Minimizing'} on board:`, JSON.stringify(board));

    // Implement game-specific logic to find all valid moves
    // Example for a simple linear game where moves are just numbers to add/subtract
    const moves = [];
    if (board.value < 10 && board.value > -10) { // Some arbitrary game condition
        moves.push({ action: 'add', amount: 1 });
        moves.push({ action: 'add', amount: 2 });
        if (isMaximizingPlayer) {
             moves.push({ action: 'special_max_move', amount: 5 });
        } else {
             moves.push({ action: 'special_min_move', amount: -3 });
        }
    }
    // console.log("Possible moves:", moves);
    return moves;
}

function example_apply_move(board, move) {
    // CONSOLE LOGGING FOR DEBUG PURPOSES
    // console.log(`apply_move called with move:`, move, `on board:`, JSON.stringify(board));

    // IMPORTANT: Create a DEEP COPY of the board to avoid modifying the original
    const newBoard = JSON.parse(JSON.stringify(board)); // Simple deep copy for object/array based boards

    // Implement game-specific logic to apply the move
    if (move.action === 'add') {
        newBoard.value += move.amount;
    } else if (move.action === 'special_max_move') {
        newBoard.value += move.amount;
        newBoard.max_used_special = true;
    } else if (move.action === 'special_min_move') {
        newBoard.value += move.amount;
        newBoard.min_used_special = true;
    }
    // console.log("New board state:", newBoard);
    return newBoard;
}

function example_evaluate_board(board, currentDepth) {
    // CONSOLE LOGGING FOR DEBUG PURPOSES
    // console.log(`evaluate_board called at depth ${currentDepth} for board:`, JSON.stringify(board));

    // Implement game-specific heuristic evaluation
    // Higher score is better for the maximizing player
    // Check for terminal states (win/loss/draw)
    if (board.value >= 10) return Infinity; // Max player wins
    if (board.value <= -10) return -Infinity; // Min player wins (Max loses)

    let score = board.value;
    // Example heuristic: give bonus for using special move
    if (board.max_used_special) score += 2;
    if (board.min_used_special) score -= 1; // Assuming this is bad for max player

    // console.log("Evaluated score:", score);
    return score;
}
*/

function setupGame() {
    // --- Example Usage (Illustrative - requires the example functions above to be uncommented and adapted) ---
    const initialBoardState = { value: 0 }; // Example board state
    const searchDepth = 3; // How many moves ahead to look
    
    console.log("Finding best move for Maximizing Player...");
    const resultMax = findBestMove(
        initialBoardState,
        searchDepth,
        example_get_possible_moves,
        example_evaluate_board,
        example_apply_move,
        true // isMaximizingPlayerInitially
    );
    console.log("Best move for Maximizing Player:", resultMax.move, "with score:", resultMax.score);
    
    /*    
    const slightlyDifferentBoard = { value: 1 };
    console.log("\nFinding best move for Minimizing Player (if they were to start)...");
    const resultMin = findBestMove(
        slightlyDifferentBoard,
        searchDepth,
        example_get_possible_moves,
        example_evaluate_board,
        example_apply_move,
        false // isMaximizingPlayerInitially
    );
    console.log("Best move for Minimizing Player:", resultMin.move, "with score:", resultMin.score);
    */


}

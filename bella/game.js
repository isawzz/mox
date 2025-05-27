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
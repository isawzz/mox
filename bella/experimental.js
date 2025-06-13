
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
function mColorSuccession(styles, bgdefault, fgdefault) {
	let bg = styles.bg || styles.background || bgdefault;
	let fg = styles.fg || styles.color || fgdefault;
	if (fg == 'contrast') fg = colorIdealText(bg); else fg = colorFrom(fg);
	return [colorFrom(bg), fg];

}
function mSvg(dParent, styles = {}, opts = {}) {
	// let html = `
	//       <svg id="svg2" width="500" height="500" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg" stroke="black"
	//           fill="lightblue" stroke-width="0.005">
	//           ${res}
	//       </svg>
	//       `;
	// d.innerHTML = html;
	dParent = toElem(dParent);
	let [w, h] = mSizeSuccession(styles, 500);
	let [bg, fg] = mColorSuccession(styles, 'white', 'black');
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	console.log(svg)
	// svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
	svg.setAttribute("viewBox", `0 0 ${1} ${1}`);
	svg.setAttribute("width", w);
	svg.setAttribute("height", h);
	svg.setAttribute("fill", 'lightblue');
	svg.setAttribute("stroke", 'white');
	svg.setAttribute("stroke-width", 0.005);
	//svg.setAttribute("preserveAspectRatio", "none");
	applyOpts(svg, opts);
	dParent.appendChild(svg);
	return svg;

}

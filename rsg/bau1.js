
class _hexgridY {
	constructor({
		bid = 'gridY',
		rows = 4,
		cols = 4,
		w = 100,
		h = 100,
		gName = 'g',
		x = 0,
		y = 0,
		margin = 10,
		gap = 10,
		board = { level: 1, ipal: 2, bg: undefined, fg: undefined, shape: undefined, border: undefined, thickness: undefined },
		fields = { level: 6, ipal: 3, bg: undefined, fg: undefined, shape: 'hex', border: undefined, thickness: undefined },
		cities = { level: 6, ipal: 2, bg: undefined, fg: undefined, shape: 'circle', border: undefined, thickness: undefined },
		streets = { level: 6, ipal: 4, bg: undefined, fg: undefined, shape: 'line', border: 'blue', thickness: 10 }
	}) {
		this.prelim(bid, rows, cols, w, h, x, y, margin);
		this.createBoard(gName, x, y, board);
		this.createFields(bid, gName, rows, cols, gap, fields);
		addNodes(this, bid, gName, cities);
		addEdges(this, bid, gName, streets);
		drawElems(this.fields);
		drawElems(this.edges);
		drawElems(this.nodes);
	}
	prelim(bid, rows, cols, w, h, x, y, margin) {
		this.id = bid;
		rows = rows % 2 != 0 ? rows : rows + 1;
		this.topcols = cols;
		this.colarr = calc_hex_col_array(rows, this.topcols);
		this.maxcols = Math.max(...this.colarr);
		this.rows = rows;
		this.cols = cols;
		this.w = w;
		this.h = h;
		this.x = x;
		this.y = y;
		let wFieldMax = (w - 2 * margin) / this.maxcols;
		let hFieldMax = (h - 2 * margin) / rows;
		hFieldMax /= 0.75;
		let hField = (2 * this.wFieldMax) / 1.73;
		let hBoard = hField * 0.75 * rows;
		if (hBoard > h - 2 * margin) {
			this.hField = roundEven(hFieldMax);
			this.wField = roundEven((1.73 * hField) / 2);
		} else {
			this.wField = roundEven(wFieldMax);
			this.hField = roundEven((2 * this.wField) / 1.73);
		}
		this.wBoard = roundEven(this.wField * this.maxcols);
		this.hBoard = roundEven(this.hField * 0.75 * rows + this.hField / 4);
	}
	createBoard(gName, x, y, board) {
		this.board = makeElemY('board', null, gName, board.level, {
			w: this.wBoard,
			h: this.hBoard,
			x: x,
			y: y,
			ipal: board.ipal,
			bg: board.bg,
			fg: board.fg,
			shape: board.shape,
			border: board.border,
			thickness: board.thickness
		});
	}
	createFields(bid, gName, rows, cols, gap, fields) {
		this.fields = [];
		this.fieldsByRowCol = [];
		let imiddleRow = (rows - 1) / 2;
		for (let irow = 0; irow < this.colarr.length; irow++) {
			this.fieldsByRowCol[irow + 1] = [];
			let colstart = this.maxcols - this.colarr[irow];
			let y = this.hField * 0.75 * (irow - imiddleRow);
			for (let j = 0; j < this.colarr[irow]; j++) {
				var icol = colstart + 2 * j;
				let x = (icol * this.wField) / 2 + this.wField / 2 - this.wBoard / 2;
				let approx = 12;
				let field = makeElemY('field', bid, gName, fields.level, {
					row: irow + 1,
					col: icol + 1,
					w: this.wField,
					h: this.hField,
					gap: gap,
					x: x,
					y: y,
					ipal: fields.ipal,
					bg: fields.bg,
					fg: fields.fg,
					shape: fields.shape,
					border: fields.border,
					thickness: fields.thickness
				});
				this.fields.push(field.id);
				this.fieldsByRowCol[irow + 1][icol + 1] = field.id;
				field.edges = [];
				field.fields = [];
				field.nodes = [];
				let hex = [[0, -0.5], [0.5, -0.25], [0.5, 0.25], [0, 0.5], [-0.5, 0.25], [-0.5, -0.25]];
				field.poly = getPoly(hex, field.x, field.y, field.w, field.h);
				x += this.wField;
			}
		}
	}
	isValid(r, c) {
		return r in this.fields && c in this.fields[r];
	}
}



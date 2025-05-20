
function _triangleTessellationCenters(rows, cols, w, h) {
  const centers = [];

  for (let r = 0; r < rows; r++) {
    const baseY = r * (h / 2); // every row is half-height offset
    const startX = (r % 2 === 1) ? w / 2 : 0; // staggered rows

    for (let c = 0; c < cols; c++) {
      const x = startX + c * w;
      const isUp = (r % 2 === 0);
      const y = baseY + (isUp ? h / 3 : (2 * h) / 3);

      centers.push({ x, y, up: isUp });
    }
  }

  return centers;
}

function _triangleTessellationCenters(rows, cols, n) {
  const centers = [];
  const h = (Math.sqrt(3) / 2) * n;

  for (let r = 0; r < rows; r++) {
    const y = r * h;
    for (let c = 0; c < cols; c++) {
      const x = c * n + ((r % 2) * n) / 2;
      const isPointingUp = (r + c) % 2 === 0;
      centers.push({ x, y: isPointingUp ? y + h / 3 : y + (2 * h) / 3, up: isPointingUp });
    }
  }

  return centers;
}
function _drawTriangleAtCenter(parent, center, n, pointingUp = true, color = 'black') {
  const h = (Math.sqrt(3) / 2) * n;
  const div = document.createElement('div');

  div.style.position = 'absolute';
  div.style.width = `${n}px`;
  div.style.height = `${h}px`;
  div.style.left = `${center.x - n / 2}px`;
  div.style.top = `${center.y - h / 2}px`;
  div.style.backgroundColor = color;
  div.style.clipPath = pointingUp
    ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
    : 'polygon(0% 0%, 100% 0%, 50% 100%)';

  parent.appendChild(div);
  return div;
}
//hexgrid versuche
function createHexShapedGridX(containerId, rows = 5, maxCols = 5, sz = 50, gap = 1) {
  if (rows % 2 === 0) {
    console.error("Number of rows must be odd for a symmetrical hexagon grid.");
    return;
  }

  const container = toElem(containerId);
  //const frag=document.createDocumentFragment();
  container.innerHTML = '';

  const hexWidth = sz * 2;
  const hexHeight = hexWidth; //Math.sqrt(3) * sideLength;
  const vertSpacing = hexHeight * 0.75;

  const midRow = Math.floor(rows / 2);
  const tiles = {}; // id -> tile object
  let [w, h] = [hexWidth - gap, hexHeight - gap];

  for (let r = 0; r < rows; r++) {
    const offsetFromMiddle = Math.abs(midRow - r);
    const cols = maxCols - offsetFromMiddle;
    const totalRowOffset = ((maxCols - cols) / 2) * hexWidth;
    const horizontalOffset = (r % 2 === 1) ? hexWidth / 2 : 0;
    const y = r * vertSpacing;
    for (let i = 0; i < cols; i++) {
      const x = i * hexWidth + totalRowOffset;// + horizontalOffset;
      const c = Math.round(x / (hexWidth / 2)); // GLOBAL COLUMN INDEX
      const id = `r${r}_c${c}`;

      let div = mDom(container, { className: 'hex', left: x, top: y, w, h }, { id })
      const tile = { id, div, x, y, sz, c, r, NE: null, E: null, SE: null, SW: null, W: null, NW: null };

      tiles[id] = tile;
    }

  }

  // After all tiles are created, link neighbors
  for (const id in tiles) {
    const tile = tiles[id];
    let [r, c] = [tile.r, tile.c];

    function getTile(rr, cc) { return tiles[`r${rr}_c${cc}`] || null; }
    //   if (isdef(tiles[`r${rr}_c${cc}`])) return `r${rr}_c${cc}`; //tileMap[`r${rr}_c${cc}`];
    //   else return null;
    // }

    // Neighbor lookup varies by row parity
    tile.E = getTile(r, c + 2);
    tile.W = getTile(r, c - 2);
    tile.NE = getTile(r - 1, c + 1);
    tile.NW = getTile(r - 1, c - 1);
    tile.SE = getTile(r + 1, c + 1);
    tile.SW = getTile(r + 1, c - 1);

  }

  // container.style.height = `${rows * vertSpacing + hexHeight * 0.25}px`;
  let hGrid = rows * vertSpacing + hexHeight * 0.25;
  let wGrid = maxCols * hexWidth;
  console.log(w, h)
  mStyle(container, { w: wGrid, h: hGrid }); //,bg:'skyblue'})
  //container.appendChild(frag);

  return tiles;
}
function getHexCorners(x, y, radius) {
  const corners = [];
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 3 * i - Math.PI / 6; // -30° to make flat top
    const cornerX = x + radius * Math.cos(angle);
    const cornerY = y + radius * Math.sin(angle);
    corners.push([cornerX, cornerY]);
  }
  return corners;
}
function createHexShapedGrid(containerId, rows = 5, maxCols = 5, sideLength = 50, gap = 1) {
  if (rows % 2 === 0) {
    console.error("Number of rows must be odd for a symmetrical hexagon grid.");
    return;
  }

  const container = toElem(containerId);
  container.innerHTML = '';

  const hexWidth = sideLength * 2;
  const hexHeight = hexWidth; //Math.sqrt(3) * sideLength;
  const vertSpacing = hexHeight * 0.75;

  const midRow = Math.floor(rows / 2);
  const tiles = {}; // id -> tile object

  for (let r = 0; r < rows; r++) {
    const offsetFromMiddle = Math.abs(midRow - r);
    const cols = maxCols - offsetFromMiddle;

    for (let i = 0; i < cols; i++) {


      const horizontalOffset = (r % 2 === 1) ? hexWidth / 2 : 0;
      const totalRowOffset = ((maxCols - cols) / 2) * hexWidth;

      const x = i * hexWidth + totalRowOffset;// + horizontalOffset;
      const y = r * vertSpacing;
      const c = Math.round(x / (hexWidth / 2)); // GLOBAL COLUMN INDEX
      const id = `r${r}_c${c}`;

      // const div = document.createElement('div');
      // div.className = 'hex';
      // div.style.width = `${hexWidth - gap}px`;
      // div.style.height = `${hexHeight - gap}px`;
      // div.style.left = `${x}px`;
      // div.style.top = `${y}px`;
      // div.id = id;
      // container.appendChild(div);

      let div=mDom(container,{className:'hex',left:x,top:y,w:hexWidth-gap,h:hexHeight-gap},{id})
      const tile = { id, div, x, y, c, r, NE: null, E: null, SE: null, SW: null, W: null, NW: null };

      tiles[id] = tile;
    }

  }

  // After all tiles are created, link neighbors
  for (const id in tiles) {
    const tile = tiles[id];
    let [r, c] = [tile.r, tile.c];
    const isOdd = r % 2 === 1;

    function getTile(rr, cc) {
      if (isdef(tiles[`r${rr}_c${cc}`])) return `r${rr}_c${cc}`; //tileMap[`r${rr}_c${cc}`];
      else return null;
    }

    // Neighbor lookup varies by row parity
    tile.E = getTile(r, c + 2);
    tile.W = getTile(r, c - 2);
    tile.NE = getTile(r - 1, c + 1);
    tile.NW = getTile(r - 1, c - 1);
    tile.SE = getTile(r + 1, c + 1);
    tile.SW = getTile(r + 1, c - 1);

  }

  // container.style.height = `${rows * vertSpacing + hexHeight * 0.25}px`;
  let h = rows * vertSpacing + hexHeight * 0.25;
  let w = maxCols * hexWidth;
  console.log(w,h)
  mStyle(container,{w,h}); //,bg:'skyblue'})

  return tiles;
}
function addCities(container, grid, sideLength) {
  const cityMap = {}; // key: `r_c` => city object

  for (const row of grid) {
    for (const tile of row) {
      const { x, y, r, c } = tile;
      //let [tx,ty]=[x+sideLength/2,y+sideLength/2];
      for (let i = 0; i < 6; i++) {
        const angle_deg = 60 * i - 30;
        const angle_rad = Math.PI / 180 * angle_deg;
        const cx = x + sideLength * Math.cos(angle_rad);
        const cy = y + sideLength * Math.sin(angle_rad); // - sideLength / 2;

        // Determine index of the tile *below* and to the *left* of the corner
        // Here, we use angle to determine ownership
        let rowIndex = r;
        let colIndex = c;
        if (i === 2 || i === 3) rowIndex += 1; // bottom corners
        if (i === 3 || i === 4 || i === 5) colIndex -= 1; // left side

        addCity(cityMap, container, rowIndex, colIndex, 0 - 10, 0 - 10); //cx, cy);
        return;
      }
      return;
    }
  }

  return cityMap;
}

function createHexShapedGrid(containerId, rows = 5, maxCols = 5, sideLength = 50, gap = 1) {
  if (rows % 2 === 0) {
    console.error("Number of rows must be odd for a symmetrical hexagon grid.");
    return;
  }

  const container = toElem(containerId);
  container.innerHTML = '';

  const hexWidth = sideLength * 2;
  const hexHeight = hexWidth; //Math.sqrt(3) * sideLength;
  const vertSpacing = hexHeight * 0.75;

  const midRow = Math.floor(rows / 2);
  const tileMap = {}; // id -> tile object
  const boardRows = [];    // row-wise storage

  for (let r = 0; r < rows; r++) {
    const offsetFromMiddle = Math.abs(midRow - r);
    const cols = maxCols - offsetFromMiddle;
    const row = [];

    for (let i = 0; i < cols; i++) {
      const div = document.createElement('div');
      div.className = 'hex';
      div.style.width = `${hexWidth - gap}px`;
      div.style.height = `${hexHeight - gap}px`;

      const horizontalOffset = (r % 2 === 1) ? hexWidth / 2 : 0;
      const totalRowOffset = ((maxCols - cols) / 2) * hexWidth;

      const x = i * hexWidth + totalRowOffset;// + horizontalOffset;
      const y = r * vertSpacing;

      const c = Math.round(x / (hexWidth / 2)); // GLOBAL COLUMN INDEX

      div.style.left = `${x}px`;
      div.style.top = `${y}px`;

      const id = `r${r}_c${c}`;
      const tile = { id, div, x, y, c, r, NE: null, E: null, SE: null, SW: null, W: null, NW: null };

      div.addEventListener('mouseenter', () => {
        for (const dir of ['NE', 'E', 'SE', 'SW', 'W', 'NW']) {
          const neighbor = tileMap[tile[dir]];
          if (neighbor) neighbor.div.classList.add('neighbor-highlight');
        }
      });

      div.addEventListener('mouseleave', () => {
        for (const dir of ['NE', 'E', 'SE', 'SW', 'W', 'NW']) {
          const neighbor = tileMap[tile[dir]];
          if (neighbor) neighbor.div.classList.remove('neighbor-highlight');
        }
      });
      tileMap[id] = tile;
      row.push(tile);
      container.appendChild(div);
    }

    boardRows.push(row);
  }

  // After all tiles are created, link neighbors
  for (let r = 0; r < boardRows.length; r++) {
    for (let i = 0; i < boardRows[r].length; i++) {
      const tile = boardRows[r][i];
      let c = tile.c;
      const isOdd = r % 2 === 1;

      function getTile(rr, cc) {
        if (isdef(tileMap[`r${rr}_c${cc}`])) return `r${rr}_c${cc}`; //tileMap[`r${rr}_c${cc}`];
        else return null;
      }

      // Neighbor lookup varies by row parity
      tile.E = getTile(r, c + 2);
      tile.W = getTile(r, c - 2);
      tile.NE = getTile(r - 1, c + 1);
      tile.NW = getTile(r - 1, c - 1);
      tile.SE = getTile(r + 1, c + 1);
      tile.SW = getTile(r + 1, c - 1);
      // tile.E = getTile(r, c + 1);
      // tile.W = getTile(r, c - 1);
      // tile.NE = getTile(r - 1, c + (isOdd ? 0 : -1));
      // tile.NW = getTile(r - 1, c + (isOdd ? -1 : 0));
      // tile.SE = getTile(r + 1, c + (isOdd ? 0 : -1));
      // tile.SW = getTile(r + 1, c + (isOdd ? -1 : 0));

    }
  }

  container.style.height = `${rows * vertSpacing + hexHeight * 0.25}px`;

  return { boardRows, tileMap, tiles:arrFlatten(boardRows) };
}
function createHexShapedGrid(containerId, rows = 5, maxCols = 5, sideLength = 50, gap = 1) {
  if (rows % 2 === 0) {
    console.error("Number of rows must be odd for a symmetrical hexagon grid.");
    return;
  }

  const container = toElem(containerId);
  container.innerHTML = '';

  const hexWidth = sideLength * 2;
  const hexHeight = hexWidth; //Math.sqrt(3) * sideLength;
  const vertSpacing = hexHeight * 0.75;

  const midRow = Math.floor(rows / 2);

  let tiles = [];

  for (let r = 0; r < rows; r++) {
    const offsetFromMiddle = Math.abs(midRow - r);
    const cols = maxCols - offsetFromMiddle;

    for (let c = 0; c < cols; c++) {
      const hex = document.createElement('div');
      hex.className = 'hex';
      hex.style.width = `${hexWidth - gap}px`;
      hex.style.height = `${hexHeight - gap}px`;

      const horizontalOffset = (r % 2 === 1) ? hexWidth / 2 : 0;
      const totalRowOffset = ((maxCols - cols) / 2) * hexWidth;

      const x = c * hexWidth + totalRowOffset; // + horizontalOffset - (r%2 == 1?hexWidth/2:0);
      const y = r * vertSpacing;

      hex.style.left = `${x}px`;
      hex.style.top = `${y}px`;

      container.appendChild(hex);
      tiles.push({ div: hex, x, y, c, r })
    }
  }

  container.style.height = `${rows * vertSpacing + hexHeight * 0.25}px`;
  return tiles;
}
function createHexGrid(d, rows, cols, sideLength = 50) {
  const container = toElem(d)
  container.innerHTML = ''; // clear previous grid

  const hexWidth = sideLength * 2;
  const hexHeight = hexWidth; // Math.sqrt(3) * sideLength;

  for (let r = 0; r < rows; r++) {
    const row = document.createElement('div');
    row.className = 'hex-row' + (r % 2 ? ' offset' : '');
    for (let c = 0; c < cols; c++) {
      const hex = document.createElement('div');
      hex.className = 'hex';
      hex.style.width = `${hexWidth}px`;
      hex.style.height = `${hexHeight}px`;
      row.appendChild(hex);
    }
    container.appendChild(row);
  }
}
function createHexGrid(d, rows, cols, sideLength = 50) {
  const container = toElem(d);
  container.innerHTML = '';
  const hexWidth = sideLength * 2;
  const hexHeight = Math.sqrt(3) * sideLength;
  const vertSpacing = hexHeight * 0.75;

  container.style.height = `${vertSpacing * rows + hexHeight * 0.25}px`;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const hex = document.createElement('div');
      hex.className = 'hex';
      hex.style.width = `${hexWidth - 1}px`;
      hex.style.height = `${hexHeight - 1}px`;

      const xOffset = (r % 2) * (hexWidth / 2);
      const x = c * hexWidth + xOffset;
      const y = r * vertSpacing;

      hex.style.left = `${x}px`;
      hex.style.top = `${y}px`;

      container.appendChild(hex);
    }
  }
}

function createHexShapedGrid(containerId, rows = 5, maxCols = 5, sideLength = 50, gap=1) {
  if (rows % 2 === 0) {
    console.error("Number of rows must be odd for a symmetrical hexagon grid.");
    return;
  }

  const container = toElem(containerId);
  container.innerHTML = '';

  const hexWidth = sideLength * 2;
  const hexHeight = Math.sqrt(3) * sideLength;
  const vertSpacing = hexHeight * 0.75;

  const midRow = Math.floor(rows / 2);

  for (let r = 0; r < rows; r++) {
    // Number of columns in this row (symmetric)
    const offsetFromMiddle = Math.abs(midRow - r);
    const cols = maxCols - offsetFromMiddle;

    for (let c = 0; c < cols; c++) {
      const hex = document.createElement('div');
      hex.className = 'hex';
      hex.style.width = `${hexWidth}px`;
      hex.style.height = `${hexHeight}px`;

      // Center the row horizontally
      const rowOffset = ((maxCols - cols) / 2) * hexWidth + ((r % 2) * hexWidth / 2);
      const x = c * hexWidth + rowOffset;
      const y = r * vertSpacing;

      hex.style.left = `${x}px`;
      hex.style.top = `${y}px`;

      container.appendChild(hex);
    }
  }

  // Set container height and maybe width
  container.style.height = `${rows * vertSpacing + hexHeight * 0.25}px`;
}
function createHexShapedGrid(containerId, rows = 5, maxCols = 5, sideLength = 50) {
  if (rows % 2 === 0) {
    console.error("Number of rows must be odd for a symmetrical hexagon grid.");
    return;
  }

  const container = toElem(containerId);
  container.innerHTML = '';

  const hexWidth = sideLength * 2;
  const hexHeight = Math.sqrt(3) * sideLength;
  const vertSpacing = hexHeight * 0.75;

  const midRow = Math.floor(rows / 2);

  for (let r = 0; r < rows; r++) {
    const offsetFromMiddle = Math.abs(midRow - r);
    const cols = maxCols - offsetFromMiddle;

    for (let c = 0; c < cols; c++) {
      const hex = document.createElement('div');
      hex.className = 'hex';
      hex.style.width = `${hexWidth}px`;
      hex.style.height = `${hexHeight}px`;

      // CORRECTED: Even rows are offset by half a hex width
      const evenRow = r % 2 === 0;
      const centerOffset = ((maxCols - cols) / 2) * hexWidth;
      const x = c * hexWidth + centerOffset + (evenRow ? hexWidth / 2 : 0);
      const y = r * vertSpacing;

      hex.style.left = `${x}px`;
      hex.style.top = `${y}px`;

      container.appendChild(hex);
    }
  }

  container.style.height = `${rows * vertSpacing + hexHeight * 0.25}px`;
}
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

//scroll versuche!!!
function onPgDown(ev) {
	let container = mBy('msGrid', 'class')
	container.scrollBy({
		top: container.clientHeight,
		left: 0,
		behavior: 'smooth'  // smooth scrolling animation
	});
}
function onPgUp(ev) {
	let container = mBy('msGrid', 'class')
	container.scrollBy({
		top: -container.clientHeight,
		left: 0,
		behavior: 'smooth'  // smooth scrolling animation
	});
}
async function test0_msGrid() {
	await initTest();
	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); mFlex('dMain');
	let cols = 7, w = cols * 130 + 30, h = 5 * 130 + 10;
	let container = mDom('dMain', { className: 'msGrid', bg: 'violet' }); //,w,h });
	let list = M.byType.fa6; //Object.keys(M.superdi); // M.byType.fa6; //M.byCat.transport; //M.byCat.sport; // ['circumscribed_multiplication'];//, 'circumscribed_addition', 'circumscribed_subtraction', 'circumscribed_division', 'circumscribed_exponentiation', 'circumscribed_square_root', 'circumscribed_square_root_2', 'circumscribed_square_root_3', 'circumscribed_square_root_4'];
	console.log('list', list);
	let elemStyle = {};// display: 'block', align:'center', w100: true, h100: true, box: true, fg: 'white', bg: 'grey', padding: 10, cursor: 'pointer' };
	for (const k of list) {
		let o = M.superdi[k];
		// if (isdef(o.fa6)) { d = mDom(dParent, { ...elemStyle, family: Families.fa6 }, { html: `&#x${o.fa6};` }); }
		let d = msKey(k, container);

	}
	const rowHeight = 120 + 8; // row height + vertical gap
	let isScrolling = false;
	container.tabIndex = 0;
	container.addEventListener('keydown', (e) => {
		if (e.key === 'PageDown' || e.key === 'PageUp') {
			e.preventDefault();
			const direction = e.key === 'PageDown' ? 1 : -1;
			container.scrollBy({
				top: direction * rowHeight * 5, // container.clientHeight,
				behavior: 'smooth'
			});
		}
	});

	// Handle mouse wheel: scroll one screen per wheel tick
	container.addEventListener('wheel', (e) => {
		e.preventDefault();

		if (isScrolling) return;
		isScrolling = true;

		const direction = e.deltaY > 0 ? 1 : -1;
		container.scrollBy({
			top: direction * rowHeight * 5, // container.clientHeight,
			behavior: 'smooth'
		});

		setTimeout(() => {
			isScrolling = false;
		}, 300); // adjust timeout to match animation duration
	}, { passive: false });
}
async function test0_msGrid() {
	await initTest();
	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); mFlex('dMain');
	let cols = 7, w = cols * 130 + 30, h = 5 * 130 + 10;
	let grid = mDom('dMain', { className: 'msGrid', bg: 'violet' }); //,w,h });
	let list = M.byType.fa6; //Object.keys(M.superdi); // M.byType.fa6; //M.byCat.transport; //M.byCat.sport; // ['circumscribed_multiplication'];//, 'circumscribed_addition', 'circumscribed_subtraction', 'circumscribed_division', 'circumscribed_exponentiation', 'circumscribed_square_root', 'circumscribed_square_root_2', 'circumscribed_square_root_3', 'circumscribed_square_root_4'];
	console.log('list', list);
	let elemStyle = {};// display: 'block', align:'center', w100: true, h100: true, box: true, fg: 'white', bg: 'grey', padding: 10, cursor: 'pointer' };
	for (const k of list) {
		let o = M.superdi[k];
		// if (isdef(o.fa6)) { d = mDom(dParent, { ...elemStyle, family: Families.fa6 }, { html: `&#x${o.fa6};` }); }
		let d = msKey(k, grid);

	}



	const rowHeight = 120 + 8; // row height + vertical gap

	// grid.addEventListener('keydown', (e) => {
	// 	if (e.key === 'PageDown' || e.key === 'PageUp') {
	// 		e.preventDefault();

	// 		const visibleHeight = grid.clientHeight;
	// 		const rowsPerPage = Math.floor(visibleHeight / rowHeight);
	// 		const scrollAmount = rowsPerPage * rowHeight;

	// 		const direction = e.key === 'PageDown' ? 1 : -1;
	// 		const newScrollTop = Math.round(grid.scrollTop / rowHeight) * rowHeight + scrollAmount * direction;

	// 		grid.scrollTo({
	// 			top: Math.max(0, newScrollTop),
	// 			behavior: 'smooth'
	// 		});
	// 	}
	// });
	let timeout;

	//this one goes down and then corrects up: ugly
	// grid.addEventListener('scroll', () => {
	// 	clearTimeout(timeout);
	// 	timeout = setTimeout(() => {
	// 		const scrollTop = grid.scrollTop;
	// 		const snappedTop = Math.round(scrollTop / rowHeight) * rowHeight;
	// 		grid.scrollTo({ top: snappedTop, behavior: 'smooth' });
	// 	}, 100); // Snap after 100ms of no scrolling
	// });
	// Allow grid to receive keyboard events

	//this one stops breifly before correcting further down: still ugly
	// grid.addEventListener('scroll', () => {
	// 	clearTimeout(timeout);
	// 	timeout = setTimeout(() => {
	// 		const scrollTop = grid.scrollTop;

	// 		// Always round UP to the next full row (never backwards)
	// 		const snappedTop = Math.ceil(scrollTop / rowHeight) * rowHeight;

	// 		// Only scroll if we're not already aligned
	// 		if (scrollTop % rowHeight !== 0) {
	// 			grid.scrollTo({ top: snappedTop, behavior: 'smooth' });
	// 		}
	// 	}, 100); // delay after scroll ends
	// });

	//this one does not work at all!!!!
	// const grid = document.getElementById('grid-container');
	// const rowHeight = 128; // e.g., 120px row + 8px gap
	// let lastScrollTop = 0;
	// let isScrolling = false;
	// let animationFrame;

	// function smoothSnap() {
	//   const currentTop = grid.scrollTop;
	//   const delta = currentTop - lastScrollTop;
	//   lastScrollTop = currentTop;

	//   if (Math.abs(delta) < 1 && isScrolling) {
	//     // Scrolling has mostly stopped
	//     const remainder = currentTop % rowHeight;
	//     if (remainder !== 0) {
	//       const target =
	//         delta >= 0
	//           ? currentTop + (rowHeight - remainder)
	//           : currentTop - remainder;

	//       animateTo(target);
	//     }
	//     isScrolling = false;
	//     return;
	//   }

	//   isScrolling = true;
	//   animationFrame = requestAnimationFrame(smoothSnap);
	// }

	// function animateTo(target) {
	//   const start = grid.scrollTop;
	//   const distance = target - start;
	//   const duration = 300;
	//   const startTime = performance.now();

	//   function step(currentTime) {
	//     const elapsed = currentTime - startTime;
	//     const progress = Math.min(elapsed / duration, 1);
	//     const ease = easeOutCubic(progress);
	//     grid.scrollTop = start + distance * ease;
	//     if (progress < 1) requestAnimationFrame(step);
	//   }

	//   requestAnimationFrame(step);
	// }

	// function easeOutCubic(t) {
	//   return 1 - Math.pow(1 - t, 3);
	// }

	// grid.addEventListener('scroll', () => {
	//   cancelAnimationFrame(animationFrame);
	//   animationFrame = requestAnimationFrame(smoothSnap);
	// });




	grid.tabIndex = 0;
}
function loadSuperdiAssets() {
	let [di, byColl, byFriendly, byCat, allImages] = [M.superdi, {}, {}, {}, {}];
	// for (const k in Symbols) {
	// 	let kNew = isdef(di[k]) && isdef(di[k].text) ? k + '_uni' : k;
	// 	if (k == 'writing_hand') console.log(k, di[k], kNew)
	// 	if (isdef(di[k]) && nundef(di[k].text)) {
	// 		assertion(k != 'writing_hand')
	// 		let o = di[k];
	// 		if (nundef(o.colls)) o.colls = [];
	// 		o.colls.push('unicode');
	// 		if (isdef(o.text)) console.log(':text', k, o.text);
	// 		else o.text = Symbols[k];
	// 	} else di[kNew] = { key: kNew, friendly: k, text: Symbols[k], colls: ['unicode'], cats: [] };
	// }
	// for (const k of MathKeys) {
	// 	di[k].cats.push('math');
	// 	lookupAddIfToList(byCat, ['math'], k);
	// }
	for (const k in di) {
		let o = di[k];
		for (const cat of o.cats) lookupAddIfToList(byCat, [cat], k);
		//for (const coll of o.colls) lookupAddIfToList(byColl, [coll], k);
		//let friendly=
		//lookupAddIfToList(byFriendly, [o.friendly], k)
		if (isdef(o.img)) {
			let fname = stringAfterLast(o.img, '/')
			allImages[k] = { fname, path: o.img, key: k };
		}
		if (isdef(o.photo)) {
			let fname = stringAfterLast(o.photo, '/')
			allImages[k + '_photo'] = { fname, path: o.photo, key: k };
		}
	}
	for (const k in M.superdi) { M.superdi[k].key = k; }

	M.allImages = allImages;
	M.byCat = byCat;
	//M.byCollection = byColl;
	//M.byFriendly = byFriendly;
	M.categories = Object.keys(byCat); M.categories.sort();
	//M.collections = Object.keys(byColl); M.collections.sort();
	//M.names = Object.keys(byFriendly); M.names.sort();
	let byType = {};
	for (const k in M.superdi) {
		let o = M.superdi[k];
		for (const fk in Families) {
			//console.log('fk', fk, o[fk]);
			if (isdef(o[fk])) { lookupAddIfToList(byType, [fk], k); }

		}
		//break;
	}
	M.byType = byType;
}

function mKey(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let o = imgKey.includes('.') ? { src: imgKey } : opts.prefer == 'plain' ? { plain: imgKey } : lookup(M.superdi, [imgKey]);
	let type = opts.prefer;
	let types = ['src', 'img', 'photo', 'uni', 'emo', 'fa6', 'fa', 'ga', 'plain'];
	if (nundef(o[type])) type = types.find(x => isdef(o[x]));

	let d0 = mDom(d, styles, opts); //mClass(d0,'centered-text');	//mCenterCenterFlex(d0);
	let [_, h] = mSizeSuccession(styles, 100);

	if (['img', 'src', 'photo'].includes(type)) {
		let astyle = { h, fit: o && o.cats.includes('card') ? 'contain' : 'cover', 'object-position': 'center center' };

		mDom(d0, astyle, { ...opts, tag: 'img', src: o[type], alt: imgKey });

	} else {
		let family = Families[type] || 'inherit';
		let text = ['fa6', 'fa', 'ga'].includes(type) ? `&#x${o[type]};` : o[type];
		let fz = h; // h*.9;

		let astyles = {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			align: 'center',
			width: '100%',
			height: '100%',
			box: true,
			fz,
			family,
			hline: '1', // Ensure consistent vertical alignment
			'vertical-align': 'middle', // Align text vertically
			padding: '0', // Remove any padding that might affect alignment
			margin: '0' // Remove any margin that might affect alignment
		};

		// let x = mDom(d0, { family, fz, wmin: 100, align: 'center' }, { ...opts, html: text });
		let x = mDom(d0, astyles, { ...opts, html: text });


		// let data;
		// if (type != 'plain'){
		// 	let charCode = toCharCode(text);
		// 	data = measureCharCodeInFont(charCode, fz,family);
		// 	console.log('measureCharCodeInFont', charCode, fz, family, data);
		// }else {
		// 	data = measureTextInFont(text, fz, family);
		// 	console.log('measureTextInFont', text, fz, family, data);
		// }

		// mFlex(d0);
		//mStyle(x,{h:data.height});
		// mClass(x, 'centered-text');

	}
	return d0;

}
function mKey(imgKey, d, styles = {}, opts = {}) {
	//console.log('___mKey', imgKey, styles, opts);
	styles = jsCopy(styles);
	let o = imgKey.includes('.') ? { src: imgKey } : opts.prefer == 'plain' ? { plain: imgKey } : lookup(M.superdi, [imgKey]);
	let type = opts.prefer;
	let types = ['src', 'img', 'photo', 'uni', 'emo', 'fa6', 'fa', 'ga', 'plain'];
	if (nundef(o[type])) type = types.find(x => isdef(o[x]));

	let d0 = mDom(d, styles, opts); mClass(d0, 'centered-text');
	mCenterCenterFlex(d0);
	let [_, h] = mSizeSuccession(styles, 100);

	if (['img', 'src', 'photo'].includes(type)) {
		addKeys({ h, w: h, fit: o && o.cats.includes('card') ? 'contain' : 'cover', 'object-position': 'center center' }, styles);

		mDom(d0, styles, { ...opts, tag: 'img', src: o[type], alt: imgKey });

	} else {
		const families = { uni: "'Noto Sans', sans-serif", emo: 'emoNoto', fa6: 'fa6', fa: 'pictoFa', ga: 'pictoGame' };
		let family = families[type] || 'inherit';
		addKeys({ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100%', height: '100%', fontSize: styles.fz || 'inherit', family, lineHeight: '1', verticalAlign: 'middle' }, styles);
		let html = ['fa6', 'fa', 'ga'].includes(type) ? `&#x${o[type]};` : o[type];

		mDom(d0, styles, { ...opts, html });

	}
	return d0;

}
function mKey(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let o = imgKey.includes('.') ? { src: imgKey } : opts.prefer == 'plain' ? { plain: imgKey } : lookup(M.superdi, [imgKey]);
	let type = opts.prefer;
	let types = ['src', 'img', 'photo', 'uni', 'emo', 'fa6', 'fa', 'ga', 'plain'];
	if (nundef(o[type])) type = types.find(x => isdef(o[x]));

	let d0 = mDom(d, styles, opts);
	mClass(d0, 'centered-text');
	mCenterCenterFlex(d0);
	let [_, h] = mSizeSuccession(styles, 100);

	if (['img', 'src', 'photo'].includes(type)) {
		addKeys({ h, w: h, fit: o && o.cats.includes('card') ? 'contain' : 'cover', 'object-position': 'center center' }, styles);
		mDom(d0, styles, { ...opts, tag: 'img', src: o[type], alt: imgKey });
	} else {
		const families = { uni: "'Noto Sans', sans-serif", emo: 'emoNoto', fa6: 'fa6', fa: 'pictoFa', ga: 'pictoGame' };
		let family = families[type] || 'inherit';

		// Updated styles for vertical centering
		addKeys({
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			align: 'center',
			width: '100%',
			height: '100%',
			box: true,
			fz: '100%',
			family,
			hline: '1', // Ensure consistent vertical alignment
			'vertical-align': 'middle', // Align text vertically
			padding: '0', // Remove any padding that might affect alignment
			margin: '0' // Remove any margin that might affect alignment
		}, styles);

		let html = ['fa6', 'fa', 'ga'].includes(type) ? `&#x${o[type]};` : o[type];

		console.log(html, styles.fz, family)
		let x = measureCharacterBounds(html, styles.fz, family); console.log('x', x);


		return mDom(d0, styles, { ...opts, html });
	}

	return d0;
}

function fitTextToBox(div, maxWidth, maxHeight, options = {}) {
	const {
		minFontSize = 10,
		maxFontSize = 100,
		fontStep = 1,
		lineHeight = 1.2
	} = options;

	const style = window.getComputedStyle(div);
	const originalText = div.textContent;

	// Create an off-screen clone for measurement
	const testDiv = document.createElement("div");
	document.body.appendChild(testDiv);
	testDiv.style.position = "absolute";
	testDiv.style.visibility = "hidden";
	testDiv.style.whiteSpace = "pre-wrap";
	testDiv.style.wordBreak = "break-word";

	// Copy CSS that affects size
	const keysToCopy = ["fontFamily", "fontWeight", "fontStyle", "letterSpacing", "padding", "border"];
	keysToCopy.forEach(key => {
		testDiv.style[key] = style[key];
	});

	let fontSize = maxFontSize;
	testDiv.textContent = originalText;

	while (fontSize >= minFontSize) {
		testDiv.style.fontSize = `${fontSize}px`;
		testDiv.style.lineHeight = lineHeight;

		if (
			testDiv.offsetWidth <= maxWidth &&
			testDiv.offsetHeight <= maxHeight
		) {
			break;
		}

		fontSize -= fontStep;
	}

	// Apply the final font size to the actual div
	div.style.fontSize = `${fontSize}px`;
	div.style.lineHeight = lineHeight;

	document.body.removeChild(testDiv);
	return fontSize;
}
function fitTextToBox(text, fontFamily, maxWidth, maxHeight, options = {}) {
	const {
		minFontSize = 10,
		maxFontSize = 100,
		fontStep = 1,
		lineHeight = 1.2,
		fontWeight = "normal",
		fontStyle = "normal",
		letterSpacing = "normal",
		padding = "0"
	} = options;

	// Create a hidden measuring element
	const testDiv = document.createElement("div");
	document.body.appendChild(testDiv);
	testDiv.style.position = "absolute";
	testDiv.style.visibility = "hidden";
	testDiv.style.whiteSpace = "pre-wrap";
	testDiv.style.wordBreak = "break-word";
	testDiv.style.padding = padding;
	testDiv.style.fontFamily = fontFamily;
	testDiv.style.fontWeight = fontWeight;
	testDiv.style.fontStyle = fontStyle;
	testDiv.style.letterSpacing = letterSpacing;
	testDiv.textContent = text;

	let fontSize = maxFontSize;

	while (fontSize >= minFontSize) {
		testDiv.style.fontSize = `${fontSize}px`;
		testDiv.style.lineHeight = lineHeight;

		if (
			testDiv.offsetWidth <= maxWidth &&
			testDiv.offsetHeight <= maxHeight
		) {
			break;
		}

		fontSize -= fontStep;
	}

	document.body.removeChild(testDiv);
	return fontSize;
}

function showItem(key, d, styles, opts, simpleOnclickLabel, simpleOnclickItem) {

	//mClass(d, 'magnifiable')
	let id = getUID();
	let dSym = mKey(key, d, styles, { prefer: 'emo' }); // simpleShowImageInBatch(key, d, {}, { prefer: 'photo' });
	//return;

	// mStyle(d,{position:'relative',pabottom:18});
	let dLabel = mDom(d, { align: 'center', fz: 13, cursor: 'pointer' }, { html: key, className: 'ellipsis hoverHue' });
	dLabel.onclick = simpleOnclickLabel;
	mStyle(dSym, { cursor: 'pointer' });
	dSym.onclick = simpleOnclickItem;
	dSym.setAttribute('key', key);
	dSym.setAttribute('draggable', true)
	dSym.ondragstart = ev => { ev.dataTransfer.setData('itemkey', key); }
	return dSym;


	d.id = id; //console.log('d1', d1);
	let item = { div: d, key };
	DA.items[id] = item;
	if (isList(DA.selectedImages) && DA.selectedImages.includes(key)) mSelect(d);

}
function lazyLoad(prop = 'src') {
	let dataProp = 'data-' + prop;
	let tag = prop == 'src' ? 'img' : 'div';
	const elems = document.querySelectorAll(`${tag}[${dataProp}]`);
	const observer = new IntersectionObserver((entries, obs) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const elem = entry.target;
				elem.innerHTML = elem.dataset[prop];
				//elem[prop] = elem.dataset[prop];
				elem.removeAttribute(dataProp);
				obs.unobserve(elem);
			}
		});
	});
	elems.forEach(img => observer.observe(img));
}
async function showCollection(k, d = 'dMain', outerStyles = {}, symbolStyles = {}, labelStyles = {}, opts = {}) {

	let [w, h] = mSizeSuccession(outerStyles, 100); let gap = valf(outerStyles.gap, 10)

	mClear(d);
	let dParent = mDom(d, { display: 'flex', gap, padding: gap, wrap: true, box: true }, { id: "table", });
	mCenterFlex(dParent);
	let keys = isList(k) ? k : M.byCat[k]; console.log('keys', keys);

	outerStyles = addKeys({ w, h, 'place-items': 'center', display: 'grid', border: 'solid 2px silver', bg: 'dimgray', fg: 'contrast', padding: 10, rounding: 10 }, outerStyles);
	if (opts.onclick) outerStyles.cursor = 'pointer';

	labelStyles = addKeys({ fg: 'contrast', 'text-overflow': 'ellipsis', 'white-space': 'nowrap', overflow: 'hidden', fz: 16, align: 'center' }, labelStyles);

	symbolStyles = addKeys({ h: h - labelStyles.fz, box: true, padding: 4, fg: 'skyblue' }, symbolStyles);

	addKeys({ prefer: 'img' }, opts);
	let optsSymbol = { prefer: opts.prefer };
	let i = 0;
	let n = Math.floor(window.innerWidth / (outerStyles.w + 10)) * Math.floor(window.innerHeight / (outerStyles.h + 10));
	//console.log('n', n);
	for (const k of keys) {
		// let o = M.superdi[k];
		let d1 = mDom(dParent, outerStyles, opts);
		mKey(k, d1, symbolStyles, optsSymbol);
		mDom(d1, labelStyles, { html: k, title: k })
		if (0 === ++i % n) await mSleep(50);
	}
}
function toggleItemSelection(item, classSelected = 'framedPicture', selectedItems = null) {
	if (nundef(item)) return;
	let ui = iDiv(item);
	item.isSelected = nundef(item.isSelected) ? true : !item.isSelected;
	if (item.isSelected) mClass(ui, classSelected); else mRemoveClass(ui, classSelected);
	if (isdef(selectedItems)) {
		if (item.isSelected) {
			console.assert(!selectedItems.includes(item), 'UNSELECTED PIC IN PICLIST!!!!!!!!!!!!')
			selectedItems.push(item);
		} else {
			console.assert(selectedItems.includes(item), 'PIC NOT IN PICLIST BUT HAS BEEN SELECTED!!!!!!!!!!!!')
			removeInPlace(selectedItems, item);
		}
	}
}


function collectCats(klist) {
	let cats = [];
	for (const k of klist) {
		M.superdi[k].cats.map(x => addIf(cats, x));
	}
	return cats;
}
function simpleShowImageInBatch(key, dParent, styles = {}, opts = {}) {
	let o = M.superdi[key]; o.key = key;
	addKeys({ bg: rColor() }, styles);
	mClear(dParent);
	[w, h] = [dParent.offsetWidth, dParent.offsetHeight];
	let [sz, fz] = [.9 * w, .8 * h];
	let d1 = mDom(dParent, { position: 'relative', w: '100%', h: '100%', padding: 11, box: true });//overflow: 'hidden', 
	mCenterCenterFlex(d1)
	let el = null;
	let src = (opts.prefer == 'photo' && isdef(o.photo)) ? o.photo : valf(o.img, null);
	if (isdef(src)) {
		if (o.cats.includes('card')) {
			el = mDom(d1, { h: '100%', 'object-fit': 'cover', 'object-position': 'center center' }, { tag: 'img', src });
			mDom(d1, { h: 1, w: '100%' })
		} else {
			el = mDom(d1, { w: '100%', h: '100%', 'object-fit': 'cover', 'object-position': 'center center' }, { tag: 'img', src });
		}
	}
	else if (isdef(o.uni)) el = mDom(d1, { fz: fz, hline: fz, family: "'Noto Sans', sans-serif", fg: rColor(), display: 'inline' }, { html: o.uni });
	else if (isdef(o.emo)) el = mDom(d1, { fz: fz, hline: fz, family: 'emoNoto', fg: rColor(), display: 'inline' }, { html: o.emo });
	else if (isdef(o.fa)) el = mDom(d1, { fz: fz, hline: fz, family: 'pictoFa', bg: 'transparent', fg: rColor(), display: 'inline' }, { html: String.fromCharCode('0x' + o.fa) });
	else if (isdef(o.ga)) el = mDom(d1, { fz: fz, hline: fz, family: 'pictoGame', bg: 'beige', fg: rColor(), display: 'inline' }, { html: String.fromCharCode('0x' + o.ga) });
	else if (isdef(o.fa6)) el = mDom(d1, { fz: fz, hline: fz, family: 'fa6', bg: 'transparent', fg: rColor(), display: 'inline' }, { html: String.fromCharCode('0x' + o.fa6) });
	assertion(el, 'PROBLEM!!! ' + key);
	let label = mDom(d1, { fz: 11, cursor: 'pointer' }, { html: o.key, className: 'ellipsis hoverHue' });
	label.onclick = simpleOnclickLabel;
	mStyle(d1, { cursor: 'pointer' });
	d1.onclick = simpleOnclickItem;
	d1.setAttribute('key', key);
	d1.setAttribute('draggable', true)
	d1.ondragstart = ev => { ev.dataTransfer.setData('itemkey', key); }
	return d1;
}
async function simpleOnclickItem(ev) {
	let id = evToId(ev); console.log('item', id, DA.items[id]);
	let item = DA.items[id]; if (nundef(item)) return;
	let selkey = item.key;
	toggleSelectionOfPicture(iDiv(item), selkey, DA.selectedImages);
	//simpleCheckCommands();
}
async function simpleOnclickLabel(ev) {
	evNoBubble(ev);
	let id = evToId(ev); console.log('id', id)
	let o = lookup(UI.simple, ['items', id]);
	if (!o) return;
	console.log('clicked label of', o);
	let [key, elem, collname] = [o.key, o.name, iDiv(o)];
	let newfriendly = await mGather(ev.target);
	if (!newfriendly) return;
	if (isEmpty(newfriendly)) {
		showMessage(`ERROR: name invalid: ${newfriendly}`);
		return;
	}
	console.log('rename friendly to', newfriendly)
	let item = M.superdi[key];
	item.friendly = newfriendly;
	let di = {};
	di[key] = item;
	let res = await mPostRoute('postUpdateSuperdi', { di });
	console.log('postUpdateSuperdi', res)
	await loadAssets();
	ev.target.innerHTML = newfriendly;
}
async function simpleOnDropImage(ev, elem) {
	let dt = ev.dataTransfer;
	if (dt.types.includes('itemkey')) {
		let data = ev.dataTransfer.getData('itemkey');
		await simpleOnDroppedItem(data);
	} else {
		const files = ev.dataTransfer.files;
		if (files.length > 0) {
			const reader = new FileReader();
			reader.onload = async (evReader) => {
				let data = evReader.target.result;
				await simpleOnDroppedUrl(data, UI.simple);
			};
			reader.readAsDataURL(files[0]);
		}
	}
}
async function simpleOnDroppedItem(itemOrKey, key, sisi) {
	if (nundef(sisi)) sisi = UI.simple;
	let item;
	if (isString(itemOrKey)) { key = itemOrKey; item = M.superdi[key]; } else { item = itemOrKey; }
	assertion(isdef(key), 'NO KEY!!!!!');
	lookupAddIfToList(item, ['colls'], sisi.name);
	let o = M.superdi[key];
	if (isdef(o)) {
		console.log(`HA! ${key} already there`);
		let changed = false;
		for (const k in item) {
			let val = item[k];
			if (isLiteral(val) && o[k] != item[k]) { changed = true; break; }
			else if (isList(val) && !sameList(val, o[k])) { changed = true; break; }
		}
		if (!changed) return;
	}
	console.log(`........But changed!!!`);
	let di = {}; di[key] = item;
	await updateSuperdi(di);
	simpleInit(sisi.name, sisi)
}
async function simpleOnDroppedUrl(src, sisi) {
	let sz = 400;
	let dPopup = mDom(document.body, { position: 'fixed', top: 40, left: 0, wmin: sz, hmin: sz, bg: 'pink' });
	let dParent = mDom(dPopup);
	let d = mDom(dParent, { w: sz, h: sz, border: 'dimgray', margin: 10 });
	let canvas = createPanZoomCanvas(d, src, sz, sz);
	let instr = mDom(dPopup, { align: 'center', mabot: 10 }, { html: `- panzoom image to your liking -` })
	let dinp = mDom(dPopup, { padding: 10, align: 'right', display: 'inline-block' })
	mDom(dinp, { display: 'inline-block' }, { html: 'Name: ' });
	let inpFriendly = mDom(dinp, { outline: 'none', w: 200 }, { className: 'input', name: 'friendly', tag: 'input', type: 'text', placeholder: `<enter name>` });
	let defaultName = '';
	let iDefault = 1;
	let k = sisi.masterKeys.find(x => x == `${sisi.name}${iDefault}`);
	while (isdef(k)) { iDefault++; k = sisi.masterKeys.find(x => x == `${sisi.name}${iDefault}`); }
	defaultName = `${sisi.name}${iDefault}`;
	inpFriendly.value = defaultName;
	mDom(dinp, { h: 1 });
	mDom(dinp, { display: 'inline-block' }, { html: 'Categories: ' })
	let inpCats = mDom(dinp, { outline: 'none', w: 200 }, { className: 'input', name: 'cats', tag: 'input', type: 'text', placeholder: `<enter categories>` });
	let db2 = mDom(dPopup, { padding: 10, display: 'flex', gap: 10, 'justify-content': 'end' });
	mButton('Cancel', () => dPopup.remove(), db2, { w: 70 }, 'input');
	mButton('Save', () => simpleFinishEditing(canvas, dPopup, inpFriendly, inpCats, sisi), db2, { w: 70 }, 'input');
}
function onclickItem(ev) {
	//console.log('onclickItem', ev.target);
	let id = evToId(ev); //console.log('item',id,DA.items[id]); return;
	let item = DA.items[id]; if (nundef(item)) return;
	let selkey = item.key;
	toggleSelection(iDiv(item), selkey, DA.selectedImages);
}
function toggleSelection(elem, selkey, selectedPics, className = 'framedPicture') {
	if (selectedPics.includes(selkey)) {
		removeInPlace(selectedPics, selkey); mClassRemove(elem, className);
	} else {
		selectedPics.push(selkey); mClass(elem, className);
	}
}
function findAncestorWith(elem, { attribute = null, className = null, id = null }) {
	elem = toElem(elem);
	while (elem) {
		if ((attribute && elem.hasAttribute && elem.hasAttribute(attribute))
			|| (className && elem.classList && elem.classList.contains(className))
			|| (id && isdef(elem.id))) { return elem; }
		elem = elem.parentNode;
	}
	return null;
}
function findParentWithId(elem) { while (elem && !(elem.id)) { elem = elem.parentNode; } return elem; }

function evToId(ev) {
	let elem = findAncestorWith(ev.target, { id: true });
	return elem.id;
}
function showItem(key, d) {

	//mClass(d, 'magnifiable')
	let id = getUID();
	let d1 = mKey(key, d, {}, { prefer: 'emo' }); // simpleShowImageInBatch(key, d, {}, { prefer: 'photo' });
	d1.id = id; //console.log('d1', d1);
	let item = { div: d1, key };
	DA.items[id] = item;
	if (isList(DA.selectedImages) && DA.selectedImages.includes(key)) mSelect(d1);

}

function mKey(imgKey, d, styles = {}, opts = {}) {
	//console.log('___mKey', imgKey, styles, opts);
	styles = jsCopy(styles);
	let o = imgKey.includes('.') ? { src: imgKey } : opts.prefer == 'plain' ? { plain: imgKey } : lookup(M.superdi, [imgKey]);
	//console.log(o)
	let type = opts.prefer;
	let types = ['src', 'img', 'photo', 'uni', 'emo', 'fa6', 'fa', 'ga', 'plain'];
	if (nundef(o[type])) type = types.find(x => isdef(o[x]));
	//console.log(type, o)

	let d0 = mDom(d, styles, opts);
	mCenterCenterFlex(d0);

	if (['img', 'src', 'photo'].includes(type)) {
		let [_, h] = mSizeSuccession(styles, 40);
		console.log(':::IMAGE type', o[type], h);
		addKeys({ h, w: h, fit: 'cover', 'object-position': 'center center' }, styles);
		mDom(d0, styles, { ...opts, tag: 'img', src: o[type], alt: imgKey });
		// mDom(d0, {...styles, h, w:h, fit:'cover', round:true}, { ...opts, tag: 'img', src: o[type], alt: imgKey });
		//mImg(o.type, d0, { h: mSizeSuccession(styles, 40)[1] }, opts);
		//let [_, h] = mSizeSuccession(styles, 40);
		//copyKeys({ h, w:h, fit: 'cover', 'object-position': 'center center' }, styles);
		//copyKeys({ tag: 'img', src:o[type] }, opts)
		//let img = mDom(d0, styles, opts);
	} else {
		const families = { uni: "'Noto Sans', sans-serif", emo: 'emoNoto', fa6: 'fa6', fa: 'pictoFa', ga: 'pictoGame' };
		let family = families[type] || 'inherit';
		addKeys({ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100%', height: '100%', fontSize: styles.fz || 'inherit', family, lineHeight: '1', verticalAlign: 'middle' }, styles);
		let html = ['fa6', 'fa', 'ga'].includes(type) ? `&#x${o[type]};` : o[type];
		//console.log('mKey', imgKey, type, o[type], html, styles.family);
		mDom(d0, styles, { ...opts, html });
	}
	return d0;

}

function mKey2(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let o = lookup(M.superdi, [imgKey]);
	let type = determineType(o, opts.prefer);
	let src = !o ? (imgKey.includes('.') ? imgKey : null) : (type && o[type] ? o[type] : null);

	if (!o) type = src ? null : 'plain';
	else if (!type || !o[type]) type = determineType(o);

	let d0 = mDom(d, styles, opts);
	mCenterCenterFlex(d0);

	if (isdef(src)) {
		mImg(src, d0, { h: mSizeSuccession(styles, 40)[1] }, { tag: 'img', src });
	} else if (type === 'text' || type === 'uni') {
		renderContent(o.text, d0, styles, type === 'uni' ? "'Noto Sans', sans-serif" : 'emoNoto');
	} else if (type !== 'plain') {
		renderContent(`&#x${o[type]};`, d0, styles, type === 'fa6' ? 'fa6' : type === 'fa' ? 'pictoFa' : 'pictoGame');
	} else {
		mDom(d0, styles, { html: imgKey });
	}

	return d0;
}
function determineType(o, prefer) {
	return prefer == 'plain' ? prefer :
		prefer && (!o || o[prefer]) ? prefer :
			isdef(o.img) ? 'img' :
				isdef(o.photo) ? 'photo' :
					isdef(o.text) ? (o.colls.includes('unicode') ? 'uni' : 'text') :
						isdef(o.fa6) ? 'fa6' :
							isdef(o.fa) ? 'fa' :
								isdef(o.ga) ? 'ga' : 'plain';
}

function mKey0(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let type = opts.prefer;
	let o = type !== 'plain' ? lookup(M.superdi, [imgKey]) : null;
	let src;

	if (!o) {
		if (imgKey.includes('.')) {
			src = imgKey;
		} else {
			type = 'plain';
		}
	} else if (!type || !o[type]) {
		console.log('o', o)
		type = isdef(o.img) ? 'img' :
			isdef(o.photo) ? 'photo' :
				isdef(o.text) ? o.colls.includes('unicode') ? 'uni' : 'text' :
					isdef(o.fa6) ? 'fa6' :
						isdef(o.fa) ? 'fa' :
							isdef(o.ga) ? 'ga' : null;
		if (type === 'img' || type === 'photo') src = o[type];
	}

	let d0 = mDom(d, styles, opts);
	mCenterCenterFlex(d0); // Ensure the container is centered
	console.log('type', type, 'imgKey', imgKey);

	if (isdef(src)) {
		let [w, h] = mSizeSuccession(styles, 40);
		let imgStyles = { h };
		let imgOpts = { tag: 'img', src };
		mImg(src, d0, imgStyles, imgOpts);
	} else if (type === 'text' || type === 'uni') {
		// Center the text inside the container
		let family = valf(styles.family, type == 'uni' ? "'Noto Sans', sans-serif" : 'emoNoto');
		let textStyles = {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
			width: '100%',
			height: '100%',
			fontSize: styles.fz || 'inherit',
			family,
			//fontFamily: styles.family || 'inherit',
			lineHeight: '1', // Ensure consistent vertical alignment
			verticalAlign: 'middle' // Align text vertically
		};
		mDom(d0, textStyles, { html: o.text });
	} else if (type !== 'plain') {
		//let family = type === 'fa6' ? 'Font Awesome 6 Free' : 'Font Awesome 5 Free';
		let family = type == 'fa6' ? 'fa6' : type == 'fa' ? 'pictoFa' : 'pictoGame';
		let textStyles = {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
			width: '100%',
			height: '100%',
			fontSize: styles.fz || 'inherit',
			family,
			//fontFamily: styles.family || 'inherit',
			lineHeight: '1', // Ensure consistent vertical alignment
			verticalAlign: 'middle' // Align text vertically
		};
		let html = `&#x${o[type]};`;
		addKeys({ family }, styles);
		mDom(d0, textStyles, { html });
	} else {
		addKeys({ html: imgKey }, opts);
		mDom(d0, styles, opts);
	}

	return d0;
}

function mKey1(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let type = opts.prefer;
	let o = type !== 'plain' ? lookup(M.superdi, [imgKey]) : null;
	let src;

	// Determine the type and source
	if (!o) {
		src = imgKey.includes('.') ? imgKey : null;
		type = src ? null : 'plain';
	} else if (!type || !o[type]) {
		type = determineType1(o);
		if (type === 'img' || type === 'photo') src = o[type];
	}

	// Create the container
	let d0 = mDom(d, styles, opts);
	mCenterCenterFlex(d0);

	// Render based on type
	if (isdef(src)) {
		renderImage(src, d0, styles);
	} else if (type === 'text' || type === 'uni') {
		renderText(o.text, d0, styles, type);
	} else if (type !== 'plain') {
		renderIcon(o[type], d0, styles, type);
	} else {
		renderPlain(imgKey, d0, styles, opts);
	}

	return d0;
}

// Helper to determine the type
function determineType1(o) {
	return isdef(o.img) ? 'img' :
		isdef(o.photo) ? 'photo' :
			isdef(o.text) ? (o.colls.includes('unicode') ? 'uni' : 'text') :
				isdef(o.fa6) ? 'fa6' :
					isdef(o.fa) ? 'fa' :
						isdef(o.ga) ? 'ga' : null;
}

// Helper to render an image
function renderImage(src, d0, styles) {
	let [w, h] = mSizeSuccession(styles, 40);
	let imgStyles = { h };
	let imgOpts = { tag: 'img', src };
	mImg(src, d0, imgStyles, imgOpts);
}

// Helper to render text
function renderText(text, d0, styles, type) {
	let family = valf(styles.family, type === 'uni' ? "'Noto Sans', sans-serif" : 'emoNoto');
	let textStyles = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		width: '100%',
		height: '100%',
		fontSize: styles.fz || 'inherit',
		family,
		lineHeight: '1',
		verticalAlign: 'middle'
	};
	mDom(d0, textStyles, { html: text });
}

// Helper to render an icon
function renderIcon(iconCode, d0, styles, type) {
	let family = type === 'fa6' ? 'fa6' : type === 'fa' ? 'pictoFa' : 'pictoGame';
	let textStyles = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		width: '100%',
		height: '100%',
		fontSize: styles.fz || 'inherit',
		family,
		lineHeight: '1',
		verticalAlign: 'middle'
	};
	let html = `&#x${iconCode};`;
	mDom(d0, textStyles, { html });
}

// Helper to render plain text
function renderPlain(imgKey, d0, styles, opts) {
	addKeys({ html: imgKey }, opts);
	mDom(d0, styles, opts);
}

function mKey2(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let type = opts.prefer;
	let o = type !== 'plain' ? lookup(M.superdi, [imgKey]) : null;
	let src = !o ? (imgKey.includes('.') ? imgKey : null) : (type && o[type] ? o[type] : null);

	if (!o) type = src ? null : 'plain';
	else if (!type || !o[type]) type = determineType2(o);

	let d0 = mDom(d, styles, opts);
	mCenterCenterFlex(d0);

	if (isdef(src)) {
		mImg(src, d0, { h: mSizeSuccession(styles, 40)[1] }, { tag: 'img', src });
	} else if (type === 'text' || type === 'uni') {
		renderContent(o.text, d0, styles, type === 'uni' ? "'Noto Sans', sans-serif" : 'emoNoto');
	} else if (type !== 'plain') {
		renderContent(`&#x${o[type]};`, d0, styles, type === 'fa6' ? 'fa6' : type === 'fa' ? 'pictoFa' : 'pictoGame');
	} else {
		mDom(d0, styles, { html: imgKey });
	}

	return d0;
}

function determineType2(o) {
	return isdef(o.img) ? 'img' :
		isdef(o.photo) ? 'photo' :
			isdef(o.text) ? (o.colls.includes('unicode') ? 'uni' : 'text') :
				isdef(o.fa6) ? 'fa6' :
					isdef(o.fa) ? 'fa' :
						isdef(o.ga) ? 'ga' : null;
}

function renderContent(html, d0, styles, family) {
	mDom(d0, {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		width: '100%',
		height: '100%',
		fontSize: styles.fz || 'inherit',
		family,
		lineHeight: '1',
		verticalAlign: 'middle'
	}, { html });
}
function mKey0(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let o = opts.prefer !== 'plain' ? lookup(M.superdi, [imgKey]) : null;
	let type = opts.prefer || (o ? determineType(o) : imgKey.includes('.') ? null : 'plain');
	let src = o && (type === 'img' || type === 'photo') ? o[type] : imgKey.includes('.') ? imgKey : null;

	let d0 = mDom(d, styles, opts);
	mCenterCenterFlex(d0);

	if (isdef(src)) {
		mImg(src, d0, { h: mSizeSuccession(styles, 40)[1] }, { tag: 'img', src });
	} else if (type === 'uni' || type === 'emo') {
		renderContent(o[type], d0, styles, type === 'uni' ? "'Noto Sans', sans-serif" : 'emoNoto');
	} else if (type !== 'plain') {
		renderContent(`&#x${o[type]};`, d0, styles, type === 'fa6' ? 'fa6' : type === 'fa' ? 'pictoFa' : 'pictoGame');
	} else {
		mDom(d0, styles, { html: imgKey });
	}

	return d0;
}

function determineType(o) {
	return isdef(o.img) ? 'img' :
		isdef(o.photo) ? 'photo' :
			isdef(o.uni) ? 'uni' :
				isdef(o.emo) ? 'emo' :
					isdef(o.fa6) ? 'fa6' :
						isdef(o.fa) ? 'fa' :
							isdef(o.ga) ? 'ga' : 'plain';
}

function renderContent(html, d0, styles, family) {
	mDom(d0, {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		width: '100%',
		height: '100%',
		fontSize: styles.fz || 'inherit',
		family,
		lineHeight: '1',
		verticalAlign: 'middle'
	}, { html });
}
async function mKeyO(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let type = opts.prefer;
	let o = type != 'plain' ? lookup(M.superdi, [imgKey]) : null;
	let src;
	if (nundef(o) && imgKey.includes('.')) src = imgKey;
	else if (isdef(o) && (type == 'img' || type == 'photo') && isdef(o[type])) src = o[type];
	else if (isdef(o) && isdef(o.img)) src = o.img;
	if (isdef(src)) {
		let [w, h] = mSizeSuccession(styles, 40);
		addKeys({ w, h }, styles);
		addKeys({ tag: 'img', src }, opts);
		let d0 = mDom(d, styles, opts);
		mCenterCenterFlex(d0);
		let img = await mImgAsync(d0, styles, opts, roundIfTransparentCorner);
		return d0;
	} else if (isdef(o)) {
		let [w, h] = mSizeSuccession(styles, 40);
		let sz = h;
		addKeys({ h }, styles);
		if (nundef(type)) type = isdef(o.text) ? 'text' : isdef(o.fa6) ? 'fa6' : isdef(o.fa) ? 'fa' : isdef(o.ga) ? 'ga' : null;
		let family = type == 'text' ? 'emoNoto' : type == 'fa6' ? 'fa6' : type == 'fa' ? 'pictoFa' : 'pictoGame';
		let html = type == 'text' ? o.text : String.fromCharCode('0x' + o[type]);
		addKeys({ family }, styles);
		let d0 = mDom(d, styles, opts);
		mCenterCenterFlex(d0);
		let d1 = mDom(d0, {}, { html });
		let r = getRect(d1);
		[w, h] = [r.w, r.h];
		let scale = Math.min(sz / w, sz / h);
		d1.style.transformOrigin = 'center center';
		d1.style.transform = `scale(${scale})`;
		d1.style.transform = `scale(${scale})`;
		return d0;
	} else {
		addKeys({ html: imgKey }, opts)
		let img = mDom(d, styles, opts);
		return img;
	}
	console.log('type', type)
}
async function mKey(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let type = opts.prefer; console.log(type)
	let o = type != 'plain' ? lookup(M.superdi, [imgKey]) : null;
	let src;
	if (nundef(o) && imgKey.includes('.')) src = imgKey;
	else if (isdef(o) && (type == 'img' || type == 'photo') && isdef(o[type])) src = o[type];
	else if (isdef(o) && isdef(o.img) && nundef(type)) src = o.img;
	if (isdef(src)) {
		let d0 = mDom(d, styles, opts);
		mCenterCenterFlex(d0);
		let [w, h] = mSizeSuccession(styles, 40);
		let imgStyles = { h }, imgOpts = { tag: 'img', src }
		let img = await mImgAsync(d0, imgStyles, imgOpts, roundIfTransparentCorner);
		return d0;
	} else if (isdef(o)) {
		if (nundef(type)) type = isdef(o.text) ? 'text' : isdef(o.fa6) ? 'fa6' : isdef(o.fa) ? 'fa' : isdef(o.ga) ? 'ga' : null;
		let family = type == 'text' ? 'emoNoto' : type == 'fa6' ? 'fa6' : type == 'fa' ? 'pictoFa' : 'pictoGame';
		let html = type == 'text' ? o.text : String.fromCharCode('0x' + o[type]);
		addKeys({ family }, styles);
		let d0 = mDom(d, styles, opts);
		mCenterCenterFlex(d0);
		let d1 = mDom(d0, {}, { html });
		let r = getRect(d1);
		[w, h] = [r.w, r.h];
		return d0;
	} else {
		addKeys({ html: imgKey }, opts)
		let img = mDom(d, styles, opts);
		return img;
	}
}

function mKey(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let type = opts.prefer;
	let o = type !== 'plain' ? lookup(M.superdi, [imgKey]) : null;
	let src;

	if (!o) {
		if (imgKey.includes('.')) {
			src = imgKey;
		} else {
			type = 'plain';
		}
	} else if (!type || !o[type]) {
		type = isdef(o.img) ? 'img' :
			isdef(o.photo) ? 'photo' :
				isdef(o.text) ? o.colls.includes('unicode') ? 'uni' : 'text' :
					isdef(o.fa6) ? 'fa6' :
						isdef(o.fa) ? 'fa' :
							isdef(o.ga) ? 'ga' : null;
		if (type === 'img' || type === 'photo') src = o[type];
	}

	let d0 = mDom(d, styles, opts);
	mCenterCenterFlex(d0); // Ensure the container is centered

	if (isdef(src)) {
		let [w, h] = mSizeSuccession(styles, 40);
		let imgStyles = { h };
		let imgOpts = { tag: 'img', src };
		mImg(src, d0, imgStyles, imgOpts);
	} else if (type === 'text') {
		// Center the text inside the container
		console.log('family', styles.family)
		let textStyles = {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
			width: '100%',
			height: '100%',
			fontSize: styles.fz || 'inherit',
			fontFamily: styles.family || 'inherit'
		};
		mDom(d0, textStyles, { html: o.text });
	} else if (type !== 'plain') {
		// let family = type === 'fa6' ? 'Font Awesome 6 Free' : 'Font Awesome 5 Free';
		let family = type == 'uni' ? "'Noto Sans', sans-serif" : type == 'text' ? 'emoNoto' : type == 'fa6' ? 'fa6' : type == 'fa' ? 'pictoFa' : 'pictoGame';
		//let html = type == 'text' ? o.text : String.fromCharCode('0x' + o[type]);
		let html = `&#x${o[type]};`;
		addKeys({ family }, styles);
		mDom(d0, styles, { html });
	} else {
		addKeys({ html: imgKey }, opts);
		mDom(d0, styles, opts);
	}

	return d0;
}


function mKey(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let type = opts.prefer;
	let o = type !== 'plain' ? lookup(M.superdi, [imgKey]) : null;
	let src;

	if (!o) {
		if (imgKey.includes('.')) {
			src = imgKey;
		} else {
			type = 'plain';
		}
	} else if (!type || !o[type]) {
		type = isdef(o.img) ? 'img' :
			isdef(o.photo) ? 'photo' :
				isdef(o.text) ? 'text' :
					isdef(o.fa6) ? 'fa6' :
						isdef(o.fa) ? 'fa' :
							isdef(o.ga) ? 'ga' : null;
		if (type === 'img' || type === 'photo') src = o[type];
	}

	let d0 = mDom(d, styles, opts);
	mCenterCenterFlex(d0);

	if (isdef(src)) {
		let [w, h] = mSizeSuccession(styles, 40);
		let imgStyles = { h };
		let imgOpts = { tag: 'img', src };
		mImg(src, d0, imgStyles, imgOpts); // Use mImg directly for synchronous image creation
	} else if (type !== 'plain') {
		let family = type === 'text' ? 'emoNoto' :
			type === 'fa6' ? 'fa6' :
				type === 'fa' ? 'pictoFa' : 'pictoGame';
		// console.log('o', o, 'type', type, 'imgKey', imgKey);
		//let html = type === 'text' ? o.text : `&#x${o[type]};`;
		let html = type === 'text' ? o.text : String.fromCharCode('0x' + o[type]);
		addKeys({ family }, styles);
		let d1 = mDom(d0, styles, { html });
		// let r = getRect(d1);
		// let [w, h] = [r.w, r.h];
	} else {
		addKeys({ html: imgKey }, opts);
		mDom(d0, styles, opts);
	}

	return d0;
}


async function uiFilter(dParent, filter) {
	// Create a container for the filter bar
	let dFilterBar = mDom(dParent, { gap: 10, padding: 12, display: 'flex', alignItems: 'center', flexFlow: 'wrap' });

	// Collection input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold' }, { html: 'Collection:' });
	let collectionList = Object.keys(M.byCollection);
	let dlCollection = mDatalist(dFilterBar, collectionList, { placeholder: "<select from list>" });
	dlCollection.inpElem.oninput = ev => {
		console.log('Selected Collection:', ev.target.value);
		filter.collection = ev.target.value;
	};

	// Category input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold' }, { html: 'Category:' });
	let categoryList = Object.keys(M.byCat);
	let dlCategory = mDatalist(dFilterBar, categoryList, { placeholder: "<select from list>" });
	dlCategory.inpElem.oninput = ev => {
		console.log('Selected Category:', ev.target.value);
		filter.category = ev.target.value;
	};

	// Search input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold' }, { html: 'Search:' });
	let searchInput = mDom(dFilterBar, { width: 180, marginLeft: 4 }, { tag: 'input', className: 'input', placeholder: "<enter search term>" });
	searchInput.oninput = ev => {
		console.log('Search Term:', ev.target.value);
		filter.search = ev.target.value;
	};
}
async function uiFilter(dParent, filter) {
	// Create a container for the filter bar
	let dFilterBar = mDom(dParent, { gap: 10, padding: 12, display: 'flex', alignItems: 'center', flexFlow: 'wrap' });

	// Collection/Category input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold' }, { html: 'Filter By:' });
	let optionsList = [...Object.keys(M.byCollection), ...Object.keys(M.byCat)];
	let dlFilterBy = mDatalist(dFilterBar, optionsList, { placeholder: "<select collection or category>" });
	dlFilterBy.inpElem.oninput = ev => {
		console.log('Selected Filter:', ev.target.value);
		filter.filterBy = ev.target.value;
	};

	// Search input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold' }, { html: 'Search:' });
	let searchInput = mDom(dFilterBar, { width: 180, marginLeft: 4 }, { tag: 'input', className: 'input', placeholder: "<enter search term>" });
	searchInput.oninput = ev => {
		console.log('Search Term:', ev.target.value);
		filter.search = ev.target.value;
	};
}
async function uiFilter(dParent, filter) {
	// Create a container for the filter bar
	let dFilterBar = mDom(dParent, { gap: 10, padding: 12, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' });

	// Collection/Category input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold' }, { html: 'Filter By:' });
	let optionsList = [...Object.keys(M.byCollection), ...Object.keys(M.byCat)].sort(); // Sort alphabetically
	let dlFilterBy = mDatalist(dFilterBar, optionsList, { placeholder: "<select collection or category>" });
	dlFilterBy.inpElem.oninput = ev => {
		console.log('Selected Filter:', ev.target.value);
		filter.filterBy = ev.target.value;
	};

	// Search input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold', marginTop: 10 }, { html: 'Search:' });
	let searchInput = mDom(dFilterBar, { width: 180 }, { tag: 'input', className: 'input', placeholder: "<enter search term>" });
	searchInput.oninput = ev => {
		console.log('Search Term:', ev.target.value);
		filter.search = ev.target.value;
	};
}
function enableCustomTooltip() {
	// Create a tooltip element
	const tooltip = document.createElement('div');
	tooltip.style.position = 'absolute';
	tooltip.style.backgroundColor = 'black';
	tooltip.style.color = 'white';
	tooltip.style.padding = '5px';
	tooltip.style.borderRadius = '4px';
	tooltip.style.fontSize = '12px';
	tooltip.style.zIndex = '1000';
	tooltip.style.display = 'none'; // Initially hidden
	document.body.appendChild(tooltip);

	// Add event listeners to elements with a title attribute
	document.querySelectorAll('[title]').forEach(el => {
		el.addEventListener('mouseover', (event) => {
			const title = el.getAttribute('title');
			if (!title) return;

			// Show the tooltip
			tooltip.textContent = title;
			tooltip.style.display = 'block';

			// Position the tooltip
			const rect = el.getBoundingClientRect();
			const tooltipRect = tooltip.getBoundingClientRect();
			let top = rect.bottom + window.scrollY + 5; // Below the element
			let left = rect.left + window.scrollX;

			// Adjust if the tooltip goes out of the viewport
			if (left + tooltipRect.width > window.innerWidth) {
				left = window.innerWidth - tooltipRect.width - 5; // Adjust to fit within the viewport
			}
			if (top + tooltipRect.height > window.innerHeight) {
				top = rect.top + window.scrollY - tooltipRect.height - 5; // Place above the element
			}

			tooltip.style.top = `${top}px`;
			tooltip.style.left = `${left}px`;
		});

		el.addEventListener('mouseout', () => {
			// Hide the tooltip
			tooltip.style.display = 'none';
		});
	});
}
document.addEventListener('DOMContentLoaded', enableCustomTooltip);

function uiFilterElement() {
	let html = `
		<div class="title" style="gap: 10px; padding: 12px; display: flex; align-items: center; flex-flow: wrap;">
			<div style="display: flex; align-items: center;">
				<div style="font-size: 24px; font-weight: bold;">Collection:</div>
				<div><input class="input" placeholder="&lt;select from list&gt;" list="dl_1" style="width: 180px; margin-left: 4px;"><datalist id="dl_1" class="datalist">
				<option value="airports"></option>
				<option value="all"></option>
				<option value="amanda"></option><option value="birds"></option><option value="emo"></option><option value="fa6"></option><option value="icon"></option><option value="nations"></option><option value="spotit"></option><option value="story"></option><option value="tierspiel"></option><option value="users"></option></datalist></div></div><div style="display: flex; align-items: center;"><div edit="true" style="font-size: 24px; font-weight: bold; width: auto; text-align: right;">Filter:</div><div><input class="input" placeholder="&lt;enter value&gt;" list="dl_2" style="width: 180px; margin-left: 4px;"><datalist id="dl_2" class="datalist"><option value="animal"></option><option value="insect"></option></datalist></div></div><div style="gap: 10px; text-align: right;"><button class="input" id="bPrev" style="width: 70px; margin: 0px 0px 0px 10px;">prev</button><button class="input" id="bNext" style="width: 70px; margin: 0px 0px 0px 10px;">next</button></div></div>
	`;
	return html
}
async function uiFilterMenu(dParent, name = 'all') {
	if (nundef(name)) name = 'emo';
	let list = [];
	if (name == 'all' || isEmpty(name)) { list = Object.keys(M.superdi); }
	else if (isdef(M.byCollection[name])) { list = M.byCollection[name]; }
	else list = [];
	let dMenu = mDom(dParent)
	mClear(dMenu);
	let d = mDom(dMenu); mFlex(d);
	mDom(d, { fz: 24, weight: 'bold' }, { html: 'Collection:' });
	let collNames = M.collections;
	let dlColl = mDatalist(d, collNames, { placeholder: "<select from list>" });
	dlColl.inpElem.oninput = ev => { console.log(sisi.name, ev.target.value); simpleInit(ev.target.value, sisi); }
	dlColl.inpElem.value = name;
	list = sortByFunc(list, x => M.superdi[x].friendly);
	DA.masterKeys = list;
	let keys = DA.keys = DA.filter ? collFilterImages(sisi, sisi.filter) : list;
	let cats = collectCats(keys);
	cats.sort();
	d = mDom(dMenu); mFlex(d);
	let wLabel = 'auto'; //sisi.cols < 6 ? 117 : 'auto';
	mDom(d, { fz: 24, weight: 'bold', w: wLabel, align: 'right' }, { edit: true, html: 'Filter:' });
	let dlCat = mDatalist(d, cats, { edit: false, placeholder: "<enter value>", value: DA.filter });
	dlCat.inpElem.oninput = ev => {
		let coll = UI.simple;
		let s = ev.target.value.toLowerCase().trim();
		let list = collFilterImages(coll, s);
		coll.keys = list;
		coll.filter = s;
		coll.index = 0; coll.pageIndex = 1; simpleClearSelections();
		simpleShowImageBatch(coll, 0, false);
	};
	return keys;
	// d = mDom(dMenu, { gap: 10, align: 'right' });
	// mButton('prev', () => simpleShowImageBatch(sisi, -1), d, { w: 70, margin: 0, maleft: 10 }, 'input', 'bPrev');
	// mButton('next', () => simpleShowImageBatch(sisi, 1), d, { w: 70, margin: 0, maleft: 10 }, 'input', 'bNext');
	//simpleClearSelections();
	//simpleShowImageBatch(sisi);

}
async function _mKey(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let type = opts.prefer;
	let o = type != 'plain' ? lookup(M.superdi, [imgKey]) : null;
	let src;
	if (nundef(o)) if (imgKey.includes('.')) src = imgKey; else type = 'plain';
	else if (nundef(type) || nundef(o[type])) {
		type = isdef(o.img) ? 'img' : isdef(o.photo) ? o.photo : isdef(o.text) ? 'text' : isdef(o.fa6) ? 'fa6' : isdef(o.fa) ? 'fa' : isdef(o.ga) ? 'ga' : null;
		if (type == 'img' || type == 'photo') src = o[type];
	}
	if (isdef(src)) {
		let d0 = mDom(d, styles, opts);
		mCenterCenterFlex(d0);
		let [w, h] = mSizeSuccession(styles, 40);
		let imgStyles = { h }, imgOpts = { tag: 'img', src }
		let img = await mImgAsync(d0, imgStyles, imgOpts, roundIfTransparentCorner);
		return d0;
	} else if (type != 'plain') {
		let family = type == 'text' ? 'emoNoto' : type == 'fa6' ? 'fa6' : type == 'fa' ? 'pictoFa' : 'pictoGame';
		let html = type == 'text' ? o.text : String.fromCharCode('0x' + o[type]);
		addKeys({ family }, styles);
		let d0 = mDom(d, styles, opts);
		mCenterCenterFlex(d0);
		let d1 = mDom(d0, {}, { html });
		let r = getRect(d1);
		[w, h] = [r.w, r.h];
		return d0;
	} else {
		addKeys({ html: imgKey }, opts)
		let img = mDom(d, styles, opts);
		return img;
	}
}

function createStickyAndContentDivs() {

	let stickyDiv = mDom(document.body, { position: 'sticky', top: 0, zIndex: 1000, padding: 10, bg: '#00000080' }, { id: 'dSticky' });
	mInsert('dPage', stickyDiv);
	// {box:true,className:'section',position:'sticky',height:'auto',top:0,zIndex:1000,padding:10,bg:'#00000080'},{id:'dSticky'}//const body = document.body;

	// Create the sticky div
	//const stickyDiv = document.createElement('div');
	// stickyDiv.id = 'dSticky';
	// stickyDiv.style.position = 'sticky';
	// stickyDiv.style.top = '0';
	// stickyDiv.style.zIndex = '1000';
	// stickyDiv.style.padding = '10px';
	// stickyDiv.innerText = 'I am a sticky div';
	//body.appendChild(stickyDiv);

	// // Create the content div
	// const contentDiv = document.createElement('div');
	// contentDiv.id = 'content';
	// contentDiv.style.padding = '20px';
	// contentDiv.innerText = 'This is the content below the sticky div.';
	// body.appendChild(contentDiv);

	// Adjust padding for the content div
	adjustContentPadding();
}
function createStickyAndContentDivs() {
	let stickyDiv = mDom(null, {
		position: 'sticky',
		top: 0,
		zIndex: 1000,
		padding: 10,
		bg: '#00000080',
		width: '100%', // Ensure it spans the full viewport width
		left: 0,        // Align to the left edge
		right: 0        // Align to the right edge
	}, { id: 'dSticky' });
	mInsert('dPage', stickyDiv);

	// Adjust padding for the content div
	adjustContentPadding();
}
function adjustContentPadding() {
	const sticky = document.getElementById('dSticky');
	const content = document.getElementById('dPage');
	if (sticky && content) {
		content.style.paddingTop = sticky.offsetHeight + 'px';
	}
}


function createCard1(rank = "10", suit = "♣", width = 240, height = 336) {
	const layout = {
		'2': [[1, 0], [1, 4]],
		'3': [[1, 0], [1, 2], [1, 4]],
		'4': [[0, 0], [2, 0], [0, 4], [2, 4]],
		'5': [[0, 0], [2, 0], [1, 2], [0, 4], [2, 4]],
		'6': [[0, 0], [2, 0], [0, 2], [2, 2], [0, 4], [2, 4]],
		'7': [[0, 0], [2, 0], [0, 2], [1, 1], [2, 2], [0, 4], [2, 4]],
		'8': [[0, 0], [2, 0], [0, 2], [1, 1], [2, 2], [0, 4], [2, 4], [1, 3]],
		'9': [[0, 0], [2, 0], [0, 2], [1, 1], [2, 2], [0, 4], [2, 4], [1, 3], [1, 2]],
		'10': [[0, 0], [2, 0], [0, 1.5], [2, 1.5], [1, 1], [1, 2], [1, 3], [0, 3.5], [2, 3.5], [0, 4]],
	};

	const card = document.createElement("div");
	card.style.position = "relative";
	card.style.width = width + "px";
	card.style.height = height + "px";
	card.style.border = "1px solid black";
	card.style.borderRadius = "12px";
	card.style.background = "white";
	card.style.fontFamily = "serif";

	const colX = [0.2, 0.5, 0.8].map(x => x * width);
	const rowY = [0.08, 0.23, 0.38, 0.53, 0.68].map(y => y * height);

	layout[rank].forEach(([col, row]) => {
		const pip = document.createElement("div");
		pip.textContent = suit;
		pip.style.position = "absolute";
		pip.style.left = (colX[col] - 10) + "px";
		pip.style.top = (rowY[row] - 12) + "px";
		pip.style.fontSize = Math.floor(height * 0.09) + "px";
		card.appendChild(pip);
	});

	// Top-left corner: rank and suit
	const top = document.createElement("div");
	top.innerHTML = `<div>${rank}</div><div style="text-align:center">${suit}</div>`;
	top.style.position = "absolute";
	top.style.left = "4px";
	top.style.top = "2px";
	top.style.fontSize = Math.floor(height * 0.08) + "px";
	card.appendChild(top);

	// Bottom-right corner (rotated)
	const bottom = top.cloneNode(true);
	bottom.style.left = "";
	bottom.style.right = "4px";
	bottom.style.top = "";
	bottom.style.bottom = "2px";
	bottom.style.transform = "rotate(180deg)";
	bottom.style.textAlign = "center";
	card.appendChild(bottom);

	return card;
}
function createCard2(rank = "10", suit = "♣", width = 240, height = 336) {
	const card = document.createElement("div");
	card.style.position = "relative";
	card.style.width = width + "px";
	card.style.height = height + "px";
	card.style.border = "1px solid black";
	card.style.borderRadius = "12px";
	card.style.background = "white";
	card.style.fontFamily = "serif";

	const centerX = width / 2;
	const colOffset = width * 0.25; // for left/right columns
	const colX = [centerX - colOffset, centerX, centerX + colOffset];

	const numRows = 4; // max for side columns
	const topMargin = height * 0.12;
	const pipSpacing = (height - 2 * topMargin) / (numRows - 1);

	// Pip positions for 10: 4-3-4 in 3 columns
	const pipData = [
		[0, [0, 1, 2, 3]],     // left column
		[1, [0.5, 2, 3.5]],    // center column (slightly staggered)
		[2, [0, 1, 2, 3]]      // right column
	];

	pipData.forEach(([col, rows]) => {
		rows.forEach(rowIndex => {
			const pip = document.createElement("div");
			pip.textContent = suit;
			pip.style.position = "absolute";
			pip.style.left = (colX[col] - width * 0.035) + "px";
			pip.style.top = (topMargin + pipSpacing * rowIndex - height * 0.045) + "px";
			pip.style.fontSize = Math.floor(height * 0.09) + "px";
			card.appendChild(pip);
		});
	});

	// Top-left: rank and suit
	const top = document.createElement("div");
	top.innerHTML = `<div>${rank}</div><div style="text-align:center">${suit}</div>`;
	top.style.position = "absolute";
	top.style.left = "6px";
	top.style.top = "4px";
	top.style.fontSize = Math.floor(height * 0.08) + "px";
	card.appendChild(top);

	// Bottom-right: rotated rank and suit
	const bottom = top.cloneNode(true);
	bottom.style.left = "";
	bottom.style.right = "6px";
	bottom.style.top = "";
	bottom.style.bottom = "4px";
	bottom.style.transform = "rotate(180deg)";
	bottom.style.textAlign = "center";
	card.appendChild(bottom);

	return card;
}
function createCard3(rank = "10", suit = "♣", width = 240, height = 336) {
	const card = document.createElement("div");
	card.style.position = "relative";
	card.style.width = width + "px";
	card.style.height = height + "px";
	card.style.border = "1px solid black";
	card.style.borderRadius = "12px";
	card.style.background = "white";
	card.style.fontFamily = "serif";

	const centerX = width / 2;
	const colOffset = width * 0.25;
	const colX = [centerX - colOffset, centerX, centerX + colOffset];

	const topMargin = height * 0.12;
	const pipSpacing = (height - 2 * topMargin) / 3;

	// Pip patterns for ranks 1 (Ace) to 10
	const pipPatterns = {
		1: [[1, [1.5]]],
		2: [[1, [0, 3]]],
		3: [[1, [0, 1.5, 3]]],
		4: [[0, [0, 3]], [2, [0, 3]]],
		5: [[0, [0, 3]], [1, [1.5]], [2, [0, 3]]],
		6: [[0, [0, 1.5, 3]], [2, [0, 1.5, 3]]],
		7: [[0, [0, 1.5, 3]], [1, [0]], [2, [0, 1.5, 3]]],
		8: [[0, [0, 1.5, 3]], [1, [0.75, 2.25]], [2, [0, 1.5, 3]]],
		9: [[0, [0, 1.5, 3]], [1, [0.5, 1.5, 2.5]], [2, [0, 1.5, 3]]],
		10: [[0, [0, 1, 2, 3]], [1, [0.5, 2, 3.5]], [2, [0, 1, 2, 3]]]
	};

	const value = parseInt(rank);
	const pipData = pipPatterns[value];
	const pipFontSize = height * 0.09;

	pipData.forEach(([col, rows]) => {
		rows.forEach(rowIndex => {
			const pip = document.createElement("div");
			pip.textContent = suit;
			pip.style.position = "absolute";
			pip.style.left = (colX[col] - pipFontSize * 0.35) + "px";
			pip.style.top = (topMargin + pipSpacing * rowIndex - pipFontSize * 0.5) + "px";
			pip.style.fontSize = pipFontSize + "px";
			card.appendChild(pip);
		});
	});

	// Top-left: rank and suit
	const top = document.createElement("div");
	top.innerHTML = `<div>${rank}</div><div style="text-align:center">${suit}</div>`;
	top.style.position = "absolute";
	top.style.left = "6px";
	top.style.top = "4px";
	top.style.fontSize = Math.floor(height * 0.08) + "px";
	card.appendChild(top);

	// Bottom-right: rotated rank and suit
	const bottom = top.cloneNode(true);
	bottom.style.left = "";
	bottom.style.right = "6px";
	bottom.style.top = "";
	bottom.style.bottom = "4px";
	bottom.style.transform = "rotate(180deg)";
	bottom.style.textAlign = "center";
	card.appendChild(bottom);

	return card;
}
function createCardGrid(rank = "10", suit = "♣", width = 240, height = 336) {
	const card = document.createElement("div");
	card.style.position = "relative";
	card.style.width = width + "px";
	card.style.height = height + "px";
	card.style.border = "1px solid black";
	card.style.borderRadius = "12px";
	card.style.background = "white";
	card.style.fontFamily = "serif";
	card.style.display = "grid";
	card.style.gridTemplateColumns = "1fr 1fr 1fr";
	card.style.gridTemplateRows = "repeat(12, 1fr)";
	card.style.boxSizing = "border-box";

	const pipFontSize = height * 0.09;

	// Left column (4 pips spanning 3 rows each)
	[0, 3, 6, 9].forEach(row => {
		const pip = document.createElement("div");
		pip.textContent = suit;
		pip.style.gridColumn = "1";
		pip.style.gridRow = `${row + 1} / span 3`;
		pip.style.fontSize = `${pipFontSize}px`;
		pip.style.display = "flex";
		pip.style.alignItems = "center";
		pip.style.justifyContent = "center";
		card.appendChild(pip);
	});

	// Right column (4 pips spanning 3 rows each)
	[0, 3, 6, 9].forEach(row => {
		const pip = document.createElement("div");
		pip.textContent = suit;
		pip.style.gridColumn = "3";
		pip.style.gridRow = `${row + 1} / span 3`;
		pip.style.fontSize = `${pipFontSize}px`;
		pip.style.display = "flex";
		pip.style.alignItems = "center";
		pip.style.justifyContent = "center";
		card.appendChild(pip);
	});

	// Center column (2 pips spanning 4 rows each, centered vertically)
	[2, 6].forEach(row => {
		const pip = document.createElement("div");
		pip.textContent = suit;
		pip.style.gridColumn = "2";
		pip.style.gridRow = `${row + 1} / span 4`;
		pip.style.fontSize = `${pipFontSize}px`;
		pip.style.display = "flex";
		pip.style.alignItems = "center";
		pip.style.justifyContent = "center";
		card.appendChild(pip);
	});

	// Top-left corner: rank and suit
	const top = document.createElement("div");
	top.innerHTML = `<div>${rank}</div><div style="text-align:center">${suit}</div>`;
	top.style.position = "absolute";
	top.style.left = "6px";
	top.style.top = "4px";
	top.style.fontSize = Math.floor(height * 0.08) + "px";
	card.appendChild(top);

	// Bottom-right corner: rotated rank and suit
	const bottom = top.cloneNode(true);
	bottom.style.left = "";
	bottom.style.right = "6px";
	bottom.style.top = "";
	bottom.style.bottom = "4px";
	bottom.style.transform = "rotate(180deg)";
	bottom.style.textAlign = "center";
	card.appendChild(bottom);

	return card;
}
function createCard343(rank = "10", suit = "♣", width = 240, height = 336) {
	const card = document.createElement("div");
	card.style.position = "relative";
	card.style.width = width + "px";
	card.style.height = height + "px";
	card.style.border = "1px solid black";
	card.style.borderRadius = "12px";
	card.style.background = "white";
	card.style.fontFamily = "serif";
	card.style.display = "grid";
	card.style.gridTemplateColumns = "1fr 1fr 1fr";
	card.style.gridTemplateRows = "repeat(12, 1fr)";
	card.style.boxSizing = "border-box";

	const pipFontSize = height * 0.09;

	// Utility to create and place a pip
	function placePip(col, row, span) {
		const pip = document.createElement("div");
		pip.textContent = suit;
		pip.style.gridColumn = col;
		pip.style.gridRow = `${row} / span ${span}`;
		pip.style.fontSize = `${pipFontSize}px`;
		pip.style.display = "flex";
		pip.style.alignItems = "center";
		pip.style.justifyContent = "center";
		card.appendChild(pip);
	}

	// Left column: 3 pips (each spans 3 rows), centered in 12 rows
	[1, 5, 9].forEach(r => placePip(1, r, 3));

	// Center column: 4 pips (each spans 2 rows), evenly spaced
	[1, 4, 7, 10].forEach(r => placePip(2, r, 2));

	// Right column: 3 pips (each spans 3 rows), same as left
	[1, 5, 9].forEach(r => placePip(3, r, 3));

	// Top-left corner: rank and suit
	const top = document.createElement("div");
	top.innerHTML = `<div>${rank}</div><div style="text-align:center">${suit}</div>`;
	top.style.position = "absolute";
	top.style.left = "6px";
	top.style.top = "4px";
	top.style.fontSize = Math.floor(height * 0.08) + "px";
	card.appendChild(top);

	// Bottom-right corner: rotated rank and suit
	const bottom = top.cloneNode(true);
	bottom.style.left = "";
	bottom.style.right = "6px";
	bottom.style.top = "";
	bottom.style.bottom = "4px";
	bottom.style.transform = "rotate(180deg)";
	bottom.style.textAlign = "center";
	card.appendChild(bottom);

	return card;
}


function showCollection(dParent, callback, styles = {}) {
	// {	container,	imageUrlCallback,   // function(index) => url	imageWidth = 300,	imageHeight = 200,	bufferPages = 1,	imagesPerRow = 3}) {
	let imageHeight = valf(styles.h, 100);
	let imageWidth = valf(styles.w, imageHeight);
	let bufferPages = 1;
	let wParent = mGetStyle(dParent, 'w'); console.log('parent width', dParent.clientWidth);
	let imagesPerRow = Math.floor(wParent / imageWidth); console.log(imagesPerRow); //10;
	let page = 0;
	let isLoading = false;
	const imagesPerPage = imagesPerRow * Math.ceil(window.innerHeight / imageHeight);

	function loadImages() {
		if (isLoading) return;
		isLoading = true;

		const fragment = document.createDocumentFragment();
		for (let i = 0; i < imagesPerPage * (1 + bufferPages); i++) {
			const index = page * imagesPerPage + i;
			const img = document.createElement("img");
			img.src = callback(index);
			img.loading = "lazy";
			img.className = "lazy-img";
			img.width = imageWidth;
			img.height = imageHeight;
			fragment.appendChild(img);
		}
		dParent.insertBefore(fragment, sentinel);
		page++;
		isLoading = false;
	}

	// Sentinel element to observe scrolling near bottom
	const sentinel = document.createElement("div");
	sentinel.style.height = "1px";
	dParent.appendChild(sentinel);

	const observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			loadImages();
		}
	}, {
		rootMargin: "200px"
	});

	observer.observe(sentinel);

	// Initial load
	loadImages();
}


function createLazyImageLoader({
	container,
	imageUrlCallback,   // function(index) => url
	imageWidth = 300,
	imageHeight = 200,
	bufferPages = 1,
	imagesPerRow = 3
}) {
	let page = 0;
	let isLoading = false;
	const imagesPerPage = imagesPerRow * Math.ceil(window.innerHeight / imageHeight);

	function loadImages() {
		if (isLoading) return;
		isLoading = true;

		const fragment = document.createDocumentFragment();
		for (let i = 0; i < imagesPerPage * (1 + bufferPages); i++) {
			const index = page * imagesPerPage + i;
			const img = document.createElement("img");
			img.src = imageUrlCallback(index);
			img.loading = "lazy";
			img.className = "lazy-img";
			img.width = imageWidth;
			img.height = imageHeight;
			fragment.appendChild(img);
		}
		container.insertBefore(fragment, sentinel);
		page++;
		isLoading = false;
	}

	// Sentinel element to observe scrolling near bottom
	const sentinel = document.createElement("div");
	sentinel.style.height = "1px";
	container.appendChild(sentinel);

	const observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			loadImages();
		}
	}, {
		rootMargin: "200px"
	});

	observer.observe(sentinel);

	// Initial load
	loadImages();
}

function _showCollection(key) {
	const imageContainer = document.getElementById("image-container");
	const imagesPerPage = 20; // Adjust depending on image size/layout
	let page = 0;
	let isLoading = false;

	function loadImages(pageNum) {
		if (isLoading) return;
		isLoading = true;

		// Simulated image URLs (replace with real source or API call)
		const urls = Array.from({ length: imagesPerPage }, (_, i) =>
			`https://picsum.photos/300/200?random=${pageNum * imagesPerPage + i}`
		);

		urls.forEach(url => {
			const img = document.createElement("img");
			img.src = url;
			img.loading = "lazy";
			img.style = "margin: 4px; width: 300px; height: 200px;";
			imageContainer.appendChild(img);
		});

		isLoading = false;
	}

	// Set up observer for triggering load when nearing bottom
	const sentinel = document.createElement("div");
	sentinel.id = "sentinel";
	imageContainer.appendChild(sentinel);

	const observer = new IntersectionObserver(entries => {
		if (entries[0].isIntersecting && !isLoading) {
			page++;
			loadImages(page);
		}
	}, {
		rootMargin: "100px" // Start loading slightly before reaching the bottom
	});

	observer.observe(sentinel);

	// Initial load: just enough to fill viewport + one more page
	function preloadInitial() {
		const viewportHeight = window.innerHeight;
		let imagesLoaded = 0;

		const tempImg = document.createElement("img");
		tempImg.src = "https://picsum.photos/300/200";
		tempImg.style.display = "none";
		document.body.appendChild(tempImg);

		tempImg.onload = () => {
			const imgHeight = tempImg.naturalHeight;
			const imagesPerViewport = Math.ceil(viewportHeight / imgHeight) * 2;

			for (let i = 0; i < imagesPerViewport; i++) {
				const url = `https://picsum.photos/300/200?random=${i}`;
				const img = document.createElement("img");
				img.src = url;
				img.loading = "lazy";
				img.style = "margin: 4px; width: 300px; height: 200px;";
				imageContainer.insertBefore(img, sentinel);
			}

			document.body.removeChild(tempImg);
		};
	}

	preloadInitial();
}


async function showCollection(key, d, styles = {}, opts = {}) {
	mClear(d);
	mClass(d, 'symbolContainer');
	mDom(d, { className: 'symbol' }, { html: '<div class="symbol">&#x2718;</div>' });
	mStyle(document.body, { className: 'symbolContainer' })

	for (const k of M.byCollection[key]) {
		let sym = M.superdi[k];
		let d1 = mDom(d, { margin: 10 });
		//mDom(d1,{},{tag:'pre',html:sym.text});
		mDom(d1, { className: 'symbol' }, { html: `<div class="symbol">${sym.text}</div>` }); //sym.text
		let dimg = await mKey(k, d1, styles, opts);
		let dlabel = mDom(d1, { align: 'center', fz: 12, bg: 'yellow', fg: 'black' }, { html: k });
	}
}

//#region generateSvgWithImage
// --- Example Usage (assuming you have an HTML element with id="svgContainer") ---
// You would call this function and inject the returned SVG string into your HTML.

/*
// Example: Generate SVG for a hypothetical image and display it
const myImageFilename = 'images/my_card_figure.png'; // Replace with your actual image path/URL
const svgContainer = document.getElementById('svgContainer'); // Replace with the ID of your container element

if (svgContainer) {
	const generatedSvg = generateSvgWithImage(myImageFilename, 150, 200); // Generate SVG with specific dimensions
	svgContainer.innerHTML = generatedSvg; // Inject the generated SVG into the HTML
} else {
	console.warn("HTML element with id 'svgContainer' not found. Cannot display example SVG.");
}
*/

// --- Example of how you might use this in your card display logic ---
/*
// Inside your displayCard function, when you determine the card requires an image:
const cardKey = rankKey + suitKey; // e.g., 'KH'
const imagePath = getImageForCard(cardKey); // You would need a function like this

if (imagePath) {
	const cardSVG = generateSvgWithImage(imagePath, 100, 140); // Adjust dimensions as needed
	// Then inject cardSVG into your card container HTML structure
	cardContainer.innerHTML = `
			<div class="card-corner ${textColorClass}">
					<span>${rank}</span>
					<span>${suit}</span>
			</div>
			<div class="card-figure">
					${cardSVG}
			</div>
			<div class="card-corner ${textColorClass} transform rotate-180">
					<span>${rank}</span>
					<span>${suit}</span>
			</div>
	`;
} else {
	// Fallback to text or handle cards without images
}

// You would need a function like this to map card keys to image paths
function getImageForCard(cardKey) {
	const imageMap = {
			'KH': 'images/king_of_hearts.png',
			'QS': 'images/queen_of_spades.png',
			// ... add paths for all your face card images
	};
	return imageMap[cardKey] || null; // Return image path or null if not found
}
*/

//#endregion


function replaceFillRedWithParam(svgString, color) {
	return svgString.replace(/fill=['"]red['"]/g, `fill='${color}'`);
}
function replaceStrokeRedWithParam(svgString, color) {
	return svgString.replace(/stroke=['"]red['"]/g, `stroke='${color}'`);
}
function replaceFillBlackWithParam(svgString, color) {
	return svgString.replace(/fill=['"]black['"]/g, `fill='${color}'`);
}
function replaceStrokeBlackWithParam(svgString, color) {
	return svgString.replace(/stroke=['"]black['"]/g, `stroke='${color}'`);
}
function replaceColorsInCard(s, by) {
	let snew = replaceFillRedWithParam(s, by);
	snew = replaceStrokeRedWithParam(snew, by);
	snew = replaceFillBlackWithParam(snew, by);
	snew = replaceStrokeBlackWithParam(snew, by);
	return snew;

}
function renderCard(key, color, border) {
	let svg = __cardSvgs[key];
	let [r, s] = key;
	if ('0123456789TA'.includes(r)) {
		let beforeRect = stringBeforeLast(svg, '<rect');
		let afterRect = stringAfterLast(svg, '/rect>');
		let between = stringBetween(svg, beforeRect, afterRect); console.log('between', between)
		svg = replaceColorsInCard(beforeRect, color) + replaceColorsInCard(between, border) + replaceColorsInCard(afterRect, color);

	} else {

	}
	return svg;
}
function renderCard(cardKey, targetDiv) {
	if (!targetDiv || !(targetDiv instanceof HTMLElement)) {
		throw new Error("Invalid target element.");
	}

	const svgHtml = getCardSvg(cardKey);
	targetDiv.innerHTML = svgHtml;
}

async function mToggleButton(dParent, styles = {}) {
	addKeys({ display: 'flex', wrap: 'wrap', aitems: 'center' }, styles)
	let d1 = mDom(dParent, styles);
	let list = Array.from(arguments).slice(2);
	let buttons = [];
	let style = { hpadding: 4, display: 'flex', 'flex-wrap': 'nowrap', 'align-items': 'center', cursor: 'pointer' };
	for (const l of list) {
		let b = mDom(d1, style, { onclick: l.onclick });
		mDom(b, { maright: 6 }, { html: l.label });
		if (l.key) await mKey(l.key, b, { h: styles.h, fz: styles.h }); //:fz:valf(styles.h,50) });
		buttons.push(b);
	}
	return mToggleCompose(...buttons);
}
async function mToggleButton(dParent, styles = {}) {
	addKeys({ display: 'flex', wrap: 'wrap', aitems: 'center' }, styles)
	let d1 = mDom(dParent, styles);
	let list = Array.from(arguments).slice(2);
	let buttons = [];
	let style = { display: 'flex', 'flex-wrap': 'nowrap', aitems: 'center', cursor: 'pointer' };

	let words = list.map(x => x.label);
	let w = getMaxWordWidth(words, d1) + styles.h * 1.25 + 2; console.log(w);
	mStyle(d1, { w });

	for (const l of list) {

		let b = mDom(d1, style, { onclick: l.onclick });
		mDom(b, { maright: 6 }, { html: l.label });
		await mKey(l.key, b, { h: styles.h, w: styles.h, fz: styles.h }); //:fz:valf(styles.h,50) });

		// let dAuto = mDom(d1,{ cursor: 'pointer'}, { onclick: uiAuto });	
		// mDom(dAuto, {}, { html: 'uiState:' });
		// await mKey('display', dAuto,{sz:24});

		buttons.push(b);

	}

	return mToggleCompose(...buttons);

}

function _mFlex(d, or = 'h') {
	d = toElem(d);
	d.style.display = 'flex';
	d.style.flexFlow = (or == 'v' ? 'column' : 'row') + ' ' + (or == 'w' ? 'wrap' : 'nowrap');
}
function _mFlexBaseline(d) { mStyle(d, { display: 'flex', 'align-items': 'baseline' }); }
function _mFlexLR(d) { mStyle(d, { display: 'flex', 'justify-content': 'space-between', 'align-items': 'center' }); }
function _mFlexLine(d, startEndCenter = 'center') { mStyle(d, { display: 'flex', 'justify-content': startEndCenter, 'align-items': 'center' }); }
function _mFlexSpacebetween(d) { mFlexLR(d); }
function _mFlexV(d) { mStyle(d, { display: 'flex', 'align-items': 'center' }); }
function _mFlexVWrap(d) { mStyle(d, { display: 'flex', 'align-items': 'center', 'flex-flow': 'row wrap' }); }
function _mFlexWrap(d) { mFlex(d, 'w'); }
async function showStateButtons(d) {
	//uiState manual or auto
	let d1 = mDom(d, { maleft: 10, bg: 'black', fg: 'white', hpadding: 4, h: 24, w: 84 }); mFlexV(d1);




	mDom(d1, {}, { html: 'uiState:' });
	let bManual = DA.bManual = await mKey('hand', d1, { h: 24, w: 24, cursor: 'pointer', round: true }, { id: 'bManual', onclick: uiAuto });
	let bAuto = DA.bAuto = await mKey('robot', d1, { h: 24, w: 24, cursor: 'pointer', round: true }, { id: 'bAuto', onclick: uiManual });
	DA.dControlUiState = mToggleButton(bAuto, bManual);

	// let bPoll = DA.bPoll = await mKey('circle_right', d, { fz:24,cursor: 'pointer', round: true, fg: 'green' }, { onclick: pollResume });
	// let bStop = DA.bStop = await mKey('circle_stop', d, { fz:24,cursor: 'pointer', round: true, fg: 'red' }, { onclick: pollStop });
	// dController = mToggleButton(bPoll, bStop);

}
async function test0_game1() {
	DA.gamelist = ['setgame', 'button96']; //'accuse aristo bluff ferro fishgame fritz huti lacuna nations setgame sheriff spotit wise'; if (DA.TEST0) gamelist += ' a_game'; gamelist = toWords(gamelist);
	DA.funcs = { setgame: setgame(), button96: button96() }; //implemented games!
	for (const gname in DA.gamelist) {
		if (isdef(DA.funcs[gname])) continue;
		DA.funcs[gname] = defaultGameFunc();
	}

	await loadAssetsStatic();
	await loadTables();

	let elems = mLayoutTM('dPage'); mStyle('dMain', { overy: 'auto' }); mCenterFlex('dMain');

	mLayoutTopTestExtraMessageTitle('dTop'); mFlexV('dTop'); //mStyle('dTop', { hmin: 32 }); mStyle('dExtra', { hmin: 32 })

	let names = ['amanda', 'felix', 'lauren', 'mimi', 'gul'];
	let d = mBy('dTestRight'); mFlexV(d);
	for (const name of names) { let b = mDom(d, { className: 'button' }, { tag: 'button', html: name, onclick: async () => await switchToUser(name) }); }

	//await mSleep(rNumber(0,2000));
	let username = rChoose(names); //['felix','lauren','diana','mimi','amanda','guest','gul']); //localStorage.getItem('username') ?? 'hans'; 
	//if (username == 'felix') username = 'mimi'; else { username = 'felix';}
	await switchToUser(username);

	d = mBy('dTestLeft'); mFlexV(d);
	// mDom(d, { className: 'button', bg: 'green' }, { tag: 'button', html: 'POLL', onclick: pollResume });
	// mDom(d, { className: 'button', bg: 'red' }, { tag: 'button', html: 'STOP', onclick: pollStop });
	let bPoll = await mKey('circle_right', d, { fz: 24, cursor: 'pointer', round: true, fg: 'green' }, { onclick: pollResume });
	let bStop = await mKey('circle_stop', d, { fz: 24, cursor: 'pointer', round: true, fg: 'red' }, { onclick: pollStop });
	// let bExpand = await mKey('circle_chevron_down', dParent, styles, { tag: 'button', onclick: expandAll });
	// let bCollapse = await mKey('circle_chevron_up', dParent, styles, { tag: 'button', onclick: collapseAll });
	dController = mToggleButton(bPoll, bStop);
	mDom(d, { className: 'button', maleft: 10 }, { tag: 'button', html: 'delete', onclick: async () => await tablesDeleteAll() });

	//await showGamesAndTables();
	//pollChangeState('lobby');


}
async function tableCreate(gamename, players, options) {
	if (nundef(gamename)) gamename = "setgame";
	if (nundef(players)) players = { mimi: userToPlayer('mimi', gamename), felix: userToPlayer('felix', gamename), amanda: userToPlayer('amanda', gamename) };
	if (nundef(options)) options = MGetGameOptions(gamename);
	console.log('tableCreate', gamename, players, options);
	let me = UGetName();
	let playerNames = [me]; console.log('me', me)
	assertion(me in players, "_createOpenTable without owner!!!!!")
	for (const name in players) { addIf(playerNames, name); }
	let table = {
		status: 'open',
		id: generateTableId(),
		fen: null,
		game: gamename,
		owner: playerNames[0],
		friendly: generateTableName(playerNames.length, []), //MGetTableNames()),
		players,
		playerNames: playerNames,
		options
	};
	let tid = table.id;
	let tData = table;
	let res = await mPhpPost('mox0', { action: 'create', tid, tData });
	if (res.tid) {
		console.log("Game Creation:", res.tid);
		let data = M.tables[tid] = await tableGetDefault(res.tid); console.log(data);
		M.tableFilenames.push(tid);
		DA.tid = tid; DA.tData = tData;
	} else {
		console.log("Game Creation failed");
		return null;
	}
	return table;
}

async function showTable(id) {
	let me = UGetName();
	DA.pollFunc = 'showTable';
	let tid = valf(id, DA.tid);
	if (nundef(tid)) tid = valf(localStorage.getItem('tid'), arrLast(Object.keys(M.tables)));
	if (nundef(tid)) { return await showTables(); }
	DA.tid = tid;
	let tData = await loadStaticYaml(`y/tables/${tid}.yaml`);
	if (!tData) { showMessage('table deleted!'); return await showTables(); }
	let changes = deepCompare(M.tables[tid], tData);
	if (!changes) { return console.log('no changes', changes, tid); }
	console.log('changes', changes);
	M.tables[tid] = DA.tData = tData;
	let func = DA.funcs[tData.game];
	T = tData;
	clearMain();
	mClassRemove('dExtra', 'p10hide');
	showTitleGame(tData);
	if (func.hasInstruction) prepInstruction(tData);
	func.prepLayout(tData);
	let items = [];
	await func.stats(tData);
	if (tData.status == 'over') { showGameover(tData, 'dTitle'); return; }
	assertion(tData.status == 'started', `showTable status ERROR ${tData.status}`);
	func.activate(tData, items);
}

async function onsockConfig(x) {
	console.log('SOCK::config', x)
	Serverdata.config = x; console.log(Serverdata.config);
}
async function onsockEvent(x) {
	console.log('SOCK::event', x)
	if (isdef(Serverdata.events)) Serverdata.events[x.id] = x;
}
async function onsockMerged(x) {
	console.log('SOCK::merged', x)
	if (!isSameTableOpen(x.id)) return;
	await showTable(x);
}
async function onsockPending(id) {
	console.log('SOCK::pending', id)
	if (!isSameTableOpen(id)) return;
	await showTable(id);
}
async function onsockSuperdi(x) {
	console.log('SOCK::superdi', x)
}
async function onsockTable(x) {
	console.log('SOCK::table', x);
	let [msg, id, turn, isNew] = [x.msg, x.id, x.turn, x.isNew];
	let menu = getMenu();
	let me = UGetName();
	console.log('menu', menu, 'me', me, 'turn', turn, 'isNew', isNew)
	if (turn.includes(me) && menu == 'play') { Tid = id; await switchToMainMenu('table'); }
	else if (isNew && menu == 'play') { Tid = id; await switchToMainMenu('table'); }
	else if (menu == 'table') await showTable(id);
	else if (menu == 'play') await showGamesAndTables();
}
async function onsockTables(x) {
	console.log('SOCK::tables', x)
	let menu = getMenu();
	if (menu == 'play') await showTables('onsockTables');
	else if (menu == 'table') {
		assertion(isdef(T), "menu table but no table!!!")
		let id = T.id;
		let exists = x.find(t => t.id == id);
		if (nundef(exists)) { Tid = T = null; await switchToMenu(UI.nav, 'play'); }
	}
}
function sockInit(port = '3000') {
	let type = detectSessionType();
	let server = type == 'live' ? `http://localhost:${port}` : type == 'fastcomet' ? `https://moxito.online:${port}` : null;//getServer(); //getServerurl();
	console.log('::sockInit:', type, server); return;
	if (!server) { console.log('::sockInit: NO SOCKETS!!!', type, server); return; }

	Socket = io(server);
	Socket.on('disconnect', x => console.log('::io disconnect:', x));
	Socket.on('connection', x => console.log('::io connect:', x));
	// Socket.on('config', onsockConfig);
	// Socket.on('event', onsockEvent);
	Socket.on('message', o => console.log('message', o)); //showChatMessage);
	// Socket.on('merged', onsockMerged);
	// Socket.on('pending', onsockPending);
	// Socket.on('table', onsockTable);
	// Socket.on('tables', onsockTables);
	// Socket.on('superdi', onsockSuperdi);
}
function sockPostUserChange(oldname, newname) {
	Socket.emit('userChange', { oldname, newname });
}
async function mPhpGetFiles(dir, projectName = 'ilms', verbose = false, jsonResult = true) {
	let server = getServer();
	if (verbose) console.log('to php:', server + `${projectName}/php/mox0.php`, dir);
	let res = await fetch(server + `${projectName}/php/list_files.php?dir=${encodeURIComponent(dir)}`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		}
	);
	let text;
	try {
		text = await res.text();
		if (!jsonResult) {
			return text;
		}
		let obj = JSON.parse(text);
		if (verbose) console.log('from php:\n', obj);
		let mkeys = ["config", "superdi", "users", "details"];
		for (const k of mkeys) {
			if (isdef(obj[k])) {
				M[k] = obj[k];
				if (k == "superdi") {
					loadSuperdiAssets();
				} else if (k == "users") {
					loadUsers();
				}
			}
		}
		return obj;
	} catch (e) {
		return isString(text) ? text : e;
	}
}

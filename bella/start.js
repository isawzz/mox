onload = start; VERBOSE = false; TESTING = true;

function start() { API_BASE = getBackendUrl(); test1_neighbors(); }
async function test1_neighbors() {
	await initTest();
	let [cols, rows, tessname] = [10, 7, 'PythagoreanTessagon'];
	U = generateListTessellation(cols, rows, tessname); console.log(U.list)
	T = generateSvgTessellation(cols, rows, tessname); console.log(T)
	showSvg('dMain', T.svg);

	let neinfo = computeFaceNeighborsTwoOrMoreSharedVerts(U.list.face_list);
	console.log(neinfo);

	let svgElem = document.getElementsByTagName('svg')[1];
	const gElement = svgElem.querySelector('g'); //console.log(gElement)
	let nei = precomputePolygonNeighborsFromSvg(gElement);
	console.log(nei);

	addPolygonNeighborClick(gElement);

}
async function test1_inspect() {
	await initTest();
	let [cols, rows, tessname] = [4, 4, 'HexTessagon'];
	U = generateListTessellation(cols, rows, tessname); console.log(U.list)
	T = generateSvgTessellation(cols, rows, tessname); console.log(T)
	showSvg('dMain', T.svg);

	let svgElem = document.getElementsByTagName('svg')[1];

	add_face_indices_to_svg(svgElem, U.list.face_list, U.list.vert_list);

	const gElement = svgElem.querySelector('g'); console.log(gElement)
	precomputePolygonNeighbors(gElement);
	addPolygonNeighborClick(gElement);

	let o = { face_list: U.list.face_list, vert_list: U.list.vert_list };
	downloadAsYaml(o, 'info');



	// console.log(svgElem)


	// let x = compute_face_neighbors(U.list); console.log(x);

	// setup_face_hover_highlight(svgElem, U.list)
}
async function test1_mytess() {
	await initTest();

	// let res = generateSvgTessellation(u_num = 4, v_num = 3, shapeFunc = TriTessagon);
	// console.log('res',res);
	// showSvg('dMain',res);

	mStyle('dMain', { padding: 10 });

	let list = getTessagonDict();
	for (const k in list) {
		mDom(dLeft, {}, { tag: 'button', 'html': k, onclick: onclickTessName });
		mLinebreak(dLeft);
	}
	showTessJs('HexTessagon');
}
async function test0_tessagon1() {
	await initTest();
	let list = Object.keys(M.byCat).sort();
	tessagon_class_dict = [
		'BigHexTriTessagon',
		'BrickTessagon',
		'CloverdaleTessagon',
		'DissectedHexQuadTessagon',
		"DissectedHexTriTessagon",
		"DissectedSquareTessagon",
		"DissectedTriangleTessagon",
		"DodecaTessagon",
		"DodecaTriTessagon",
		"FloretTessagon",
		"HexBigTriTessagon",
		"HexSquareTriTessagon",
		"HexTessagon",
		"HexTriTessagon",
		"IslamicHexStarsTessagon",
		"IslamicStarsCrossesTessagon",
		"OctoTessagon",
		"PentaTessagon",
		"Penta2Tessagon",
		"PythagoreanTessagon",
		"RhombusTessagon",
		"SquareTessagon",
		"SquareTriTessagon",
		"SquareTri2Tessagon",
		"StanleyParkTessagon",
		"TriTessagon",
		"ValemountTessagon",
		"WeaveTessagon",
		"ZigZagTessagon",
	];

	for (const k of tessagon_class_dict) {
		mDom(dLeft, {}, { tag: 'button', 'html': k, onclick: showTessellation });
		mLinebreak(dLeft);
	}
	//clickOn('SnubHexTessagon')
}



// ***** DEPR *****
async function test0_createTess() {
	const vertices = [
		[0, 0], [100, 0], [100, 100], [0, 100],  // square corners
		[50, 50], // center point
	];
	const faces = [
		[0, 1, 4, 3],
		[1, 2, 4],
		[2, 3, 4],
	];

	const container = document.getElementById('dPage');
	createTessellationDivs(container, faces, vertices, {
		width: 200,
		height: 200,
		backgroundColor: '#88c',
	});
}
async function test0_tessagon0() {
	await initTest();
	let list = Object.keys(M.byCat).sort();
	list = [
		'HexTessagon',
		'SquareTessagon',
		'TriangleTessagon',
		'BrickTessagon',
		'DiamondTessagon',
		'RhombusTessagon',
		'ParallelogramTessagon',
		'RectangleTessagon',
		'IsoTriangleTessagon',
		'RightTriangleTessagon',
		'TrapezoidTessagon',
		'CairoTessagon',
		'PentagonTessagon',
		'HexHexDualTessagon',
		'HexTriangleDualTessagon',
		'OctoDiamondTessagon',
		'OctoSquareTessagon',
		'WeaveTessagon',
		'ZigZagTessagon',
		'SnubSquareTessagon',
		'SnubHexTessagon',
		'RhombusTriangleTessagon',
		'RhombusHexTessagon',
		'WindmillTessagon'
	].sort();

	for (const k of list) {
		mDom(dLeft, {}, { tag: 'button', 'html': k, onclick: showTessellation });
		mLinebreak(dLeft);
	}
	//clickOn('SnubHexTessagon')

	let html = `
	<h1>Tessagon SVG Viewer</h1>
	<form id="tess-form">
		<label>Tiles in U: <input type="number" id="u-num" value="4" min="1" /></label>
		<label>Tiles in V: <input type="number" id="v-num" value="4" min="1" /></label>
		<button type="submit">Generate</button>
	</form>

	<svg id="svg2" width="500" height="500" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg" stroke="black"
		fill="lightblue" stroke-width="0.005">
	</svg>
	`;
	let d = mBy('dMain');
	d.innerHTML = html;
	document.getElementById('tess-form').addEventListener('submit', async function (e) {
		e.preventDefault();
		const u = document.getElementById('u-num').value;
		const v = document.getElementById('v-num').value;

		const response = await fetch(`http://localhost:5000/tessellate?u=${u}&v=${v}`);
		//console.log(response)
		const svgText = await response.text();
		//console.log(svgText)
		let svg = document.getElementById('svg2');
		svg.innerHTML = svgText;
		setTimeout(() => {
			let svg = document.getElementById('svg2');
			const gElement = svg.querySelector('g');
			const centers = getPolygonCentersFromG(gElement);
			console.log(centers);
		}, 100)
	});
}


async function test0_voro0() {

	mBy('dPage').appendChild(svg);

}
async function test0_randomTiling() {
	const { tiles } = generateRandomTilingWithNCorners({
		width: 800,
		height: 600,
		rows: 4,
		cols: 4,
		jitter: 0.5,
		corners: 3,
	});

	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('width', 800);
	svg.setAttribute('height', 600);
	svg.style.background = '#111';

	tiles.forEach(tile => {
		const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
		poly.setAttribute(
			'points',
			tile.map(p => `${p.x},${p.y}`).join(' ')
		);
		poly.setAttribute('fill', `hsl(${Math.random() * 360}, 60%, 50%)`);
		poly.setAttribute('stroke', '#333');
		svg.appendChild(poly);
	});

	mBy('dPage').appendChild(svg);

}
async function test0_tess0Cairo() {
	await initTest();
	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); //mFlex('dMain');
	let rows = 10, cols = 10, gap = 0, w = 10, h = 10;
	let d = mDom('dMain', { bg: 'blue', padding: 20, display: 'inline-block' });
	let grid = mDom(d, { position: 'relative' });

	cairoTiling(grid, rows, cols, w, h);
}
async function test0_tess0penta() {
	await initTest();
	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); //mFlex('dMain');
	let rows = 3, cols = 4, gap = 0, w = 30, h = 24;
	let d = mDom('dMain', { bg: 'blue', padding: 20, display: 'inline-block' });
	let grid = mDom(d, { position: 'relative' });

	let centers = pentagonTessellationCenters(rows, cols, w, h); //console.log(centers);
	//calculate total w and h needed for tesselation
	let wTotal = cols * w / 2 + w / 2;
	let hTotal = rows * h;
	for (const center of centers) {
		console.log(center)
		drawPentagonAtCenter(grid, center, w - gap, h - gap, 'red');
	}
	mStyle(d, { w: wTotal, h: hTotal })
}
async function test0_tess0triangle() {
	await initTest();
	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); //mFlex('dMain');
	let rows = 3, cols = 4, gap = 2, w = 30, h = 24;
	let d = mDom('dMain', { bg: 'blue', padding: 20, display: 'inline-block' });
	let grid = mDom(d, { position: 'relative' });

	let centers = triangleTessellationCenters(rows, cols, w, h); //console.log(centers);
	//calculate total w and h needed for tesselation
	let wTotal = cols * w / 2 + w / 2;
	let hTotal = rows * h;
	for (const center of centers) {
		console.log(center)
		drawTriangleAtCenter(grid, center, w - 2 * gap, h - gap, center.up, 'red');
	}
	mStyle(d, { w: wTotal, h: hTotal })
}
async function test0_squareGrid() {
	await initTest();
	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); //mFlex('dMain');
	let gap = 1, sz = 50;
	let rows = 1, maxcols = 2;
	let d = mDom('dMain', { bg: 'blue', padding: 20, display: 'inline-block' });
	let grid = mDom(d, { gap, position: 'relative' });
	let tiles = createHexShapedGrid(grid, rows, maxcols, sz, gap); let func = getHexCornerList, npoly = 6;
	//let tiles = createSquareGrid(grid, rows, maxcols, sz, gap); let func = getQuadCornerList, npoly = 4;
	console.log('tiles', tiles);
	for (const id in tiles) {
		let o = tiles[id];
		mStyle(iDiv(o), { bg: 'rand' })
	}
	let rgrid = getRectInt(grid); console.log(rgrid)
	let r = getRectInt(d); console.log(r)

	let cities = {}, streets = {};
	for (const id in tiles) {
		let t = tiles[id];
		// test0_tile(id, tiles, grid, sz);
		let adj = getCorners(t.x, t.y, sz, func);
		let seg = getSegments(t.x, t.y, sz, npoly); console.log(seg)
		cities = addKeys(adj, cities);
		streets = addKeys(seg, streets);
		for (const sk in seg) { if (streets[sk] || seg[sk].d == 'cc') continue; streets[sk] = seg[sk]; }
		mStyle(iDiv(t), { bg: 'rand' });
	}
	for (const id in streets) {
		let [x1, y1, x2, y2] = allNumbers(id); //console.log(x1, y1, x2, y2);
		drawLineSegmentDiv(x1, y1, x2, y2, grid, thickness = 8, color = 'black')
	}
	for (const id in cities) {
		let [x, y] = allNumbers(id); //console.log(x,y);
		drawCircle(grid, x, y, 20, 'red');
		drawCircle(grid, x, y, 14, 'yellow');
	}
	console.log(Object.values(cities));
	console.log(Object.values(streets));
	console.log(Object.keys(cities));
	console.log(Object.keys(streets));
}
async function test0_addCities() {
	await initTest();
	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); //mFlex('dMain');
	let d = mDom('dMain', { padding: 0, margin: 10 });
	let gap = 6, sz = 50;
	let grid = mDom(d, { bg: 'blue', gap, margin: 0, position: 'relative' });
	let tiles = createHexShapedGrid(grid, 5, 5, sz, gap / 2);

	let rgrid = getRectInt(grid); console.log(rgrid)
	let r = getRectInt(d); console.log(r)

	let cities = {}, streets = {};
	for (const id in tiles) {
		let t = tiles[id];
		// test0_tile(id, tiles, grid, sz);
		let adj = getHexCorners(t.x, t.y, sz);
		let seg = getHexSegments(t.x, t.y, sz);
		cities = addKeys(adj, cities);
		streets = addKeys(seg, streets);
		mStyle(iDiv(t), { bg: 'rand' });
	}
	//console.log(Object.keys(cities));
	for (const id in streets) {
		//get x, y from city id
		let [x1, y1, x2, y2] = allNumbers(id); //console.log(x1, y1, x2, y2);
		drawLineSegmentDiv(x1, y1, x2, y2, grid, thickness = 8, color = 'black')
	}
	for (const id in cities) {
		//get x,y from city id
		let [x, y] = allNumbers(id); //console.log(x,y);
		drawCircle(grid, x, y, 20, 'red');
		drawCircle(grid, x, y, 14, 'yellow');
	}


}
async function test0_hexboardComparison() {
	await initTest();
	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); //mFlex('dMain');
	let gap = 2, sz = 10;

	// let topcols = 15, side = 25;
	// let maxcols = topcols + side - 1;
	// let rows = side * 2 - 1;
	let rows = 45, maxcols = 45;

	//let dhex = hexFromCenter(d, { x: 100, y: 100 }, {bg:'red'}); //return;

	let t0 = getNow();

	let d = mDom('dMain');
	let grid = mDom(d, { bg: 'blue', gap, margin: 0, position: 'relative' });
	let tiles = createHexShapedGrid(grid, rows, maxcols, sz / 2, gap / 2);
	//console.log('tiles', tiles);
	for (const id in tiles) {
		let o = tiles[id];
		mStyle(iDiv(o), { bg: 'rand' })
	}

	let t1 = showTimeSince(t0);

	let d1 = mDom('dMain');
	let grid1 = mDom(d1, { bg: 'green', gap, margin: 0, position: 'relative' });
	let tiles1 = createHexShapedGridOptimized(grid1, rows, maxcols, sz / 2, gap / 2);
	const allTiles = tiles1.flat().filter(Boolean);
	//console.log(allTiles)
	// let grid = mDom(d, { className: 'hexGrid', gap });
	// let { tiles, tileMap } = createHexShapedGrid(grid, 25, 16, sz / 2, gap / 2);
	// for (const id in tiles) {
	// 	let o = tiles[id];
	for (const o of allTiles) {
		mStyle(iDiv(o), { bg: 'rand' })
	}
	let t2 = showTimeSince(t1);
	return;

	let board = drawHexBoard(topcols, side, d, { display: 'inline-block', bg: 'green', gap: gap / 2 }, { bg: 'rand', sz });

	let t3 = showTimeSince(t2);

	console.log('tiles', tiles, '\nboard', board)

}
function test0_tileDict(id, tiles, grid, sz) {

	let t = tiles[id]; console.log(t);
	console.log(t);
	let di = getHexCorners(t.x, t.y, sz);
	for (let i = 0; i < list.length / 2; i++) {
		drawCircle(grid, list[2 * i], list[2 * i + 1], 20, 'red');
		drawCircle(grid, list[2 * i], list[2 * i + 1], 14, 'yellow');

	}
}
function test0_tile(id, tiles, grid, sz) {

	let t = tiles[id]; console.log(t);
	console.log(t);
	let list = getHexCornerList(t.x, t.y, sz);
	for (let i = 0; i < list.length / 2; i++) {
		drawCircle(grid, list[2 * i], list[2 * i + 1], 20, 'red');
		drawCircle(grid, list[2 * i], list[2 * i + 1], 14, 'yellow');

	}
	return;
	drawCircle(grid, t.x + 100, t.y + 25, 20);
	let [cx, cy] = [t.cx, t.cy] = [t.x + sz, t.y + sz];
	drawCircle(grid, cx, cy + 50, 20);
	drawCircle(grid, cx, cy + 50, 14, 'yellow');
	let corners = getHexCorners(cx, cy, sz); console.log(corners);
	let [c0, c1] = [corners[1], corners[2]]
	let [x0, y0, x1, y1, x2, y2, x3, y3] = getCoordinates(...corners);

	drawCircle(grid, x0, y0, 14, 'yellow');

}
async function test0_hexboard() {
	await initTest();
	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); //mFlex('dMain');
	let d = mDom('dMain', { padding: 10 });
	let gap = 2, sz = 50;
	let grid = mDom(d, { className: 'hexGrid', gap });
	let tiles = createHexShapedGrid(grid, 5, 5, sz, gap / 2);
	for (const id in tiles) { let o = tiles[id]; mStyle(iDiv(o), { bg: 'rand' }) }
	for (const id in tiles) {
		let t = tiles[id];
		let d = iDiv(t);
		mCenterCenterFlex(d);
		let factor = 1;
		msKey(rChoose(Object.keys(M.superdi)), d, { hmax: sz * factor, fz: sz * factor, fg: rColor() })

		d.addEventListener('mouseenter', () => {
			for (const dir of ['NE', 'E', 'SE', 'SW', 'W', 'NW']) {
				const neighbor = tiles[t[dir]]; console.log(neighbor)
				if (neighbor) neighbor.div.classList.add('neighbor-highlight');
			}
		});

		d.addEventListener('mouseleave', () => {
			for (const dir of ['NE', 'E', 'SE', 'SW', 'W', 'NW']) {
				const neighbor = tiles[t[dir]];
				if (neighbor) neighbor.div.classList.remove('neighbor-highlight');
			}
		});

	}
	console.log(Object.values(tiles)[4])
}
//************* deprecated ******************** */
async function test0_fields() {
	await initTest();
	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); //mFlex('dMain');
	let d = mDom('dMain');
	let gap = 2, sz = 50;
	let grid = mDom(d, { className: 'hexGrid', gap });
	let { tiles, tileMap } = createHexShapedGrid(grid, 5, 5, sz, gap / 2);
	for (const id in tileMap) { let o = tileMap[id]; mStyle(iDiv(o), { bg: 'rand' }) }
	for (const id in tileMap) {
		let t = tileMap[id];
		let d = iDiv(t);
		mCenterCenterFlex(d);
		let factor = 1;
		msKey(rChoose(Object.keys(M.superdi)), d, { hmax: sz * factor, fz: sz * factor, fg: rColor() })
	}
	console.log(Object.values(tileMap)[4])
}
async function test0_board2() {
	await initTest();
	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); //mFlex('dMain');
	let [gap, padding, sz, rows, maxcols] = [2, 10, 44, 5, 6]; //rows must be odd number!!!!
	let [wtotal, htotal] = [sz * 2 * maxcols, sz * rows * .75 * 2 + sz / 2];
	let board = mDom('dMain', { w: wtotal, h: htotal, bg: 'red', padding }); //{w:520,h:420,bg:'green',patop:1})
	let grid = mDom(board, { className: 'hexGrid', gap });
	let { boardRows, tileMap, tiles } = createHexShapedGrid(grid, rows, maxcols, sz, gap / 2);
	let r = getRectInt(grid); //console.log('rect',r,wtotal,htotal)
	//console.log('tiles',tileMap)
	for (const id in tileMap) {
		let t = tileMap[id];
		let d = iDiv(t);
		mCenterCenterFlex(d);
		let factor = 1;
		msKey(rChoose(Object.keys(M.superdi)), d, { hmax: sz * factor, fz: sz * factor, fg: rColor() })
	}
	//let tiles = arrFlatten(boardRows);//
	console.log('tiles', tiles)
	let cityMap = {}; // key: `r_c` => city object

	let t = tileMap[tiles[0]];
	console.log('tile', t);
	let [x, y] = [t.x + sz + 10, t.y + sz + 10]; console.log(x, y);


	//addCity(cityMap, grid, 0, 0, x, y, padding);
	//x=

	//mDom(grid,{bg:'blue',w:100,h:100,position:'absolute',left:50,top:50});
	//addCity(cityMap,grid,0,0,tiles[0].x,tiles[0].y,padding);

	//const cityMap = addCities(grid, boardRows, 50);
}
async function test0_board1() {
	await initTest();
	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); //mFlex('dMain');
	let [gap, padding, sz, rows, maxcols] = [2, 10, 44, 5, 6]; //rows must be odd number!!!!
	let [wtotal, htotal] = [sz * 2 * maxcols, sz * rows * .75 * 2 + sz / 2];
	let board = mDom('dMain', { w: wtotal, h: htotal, bg: 'red', padding }); //{w:520,h:420,bg:'green',patop:1})
	let grid = mDom(board, { className: 'hexGrid', gap });
	let tiles = createHexShapedGrid(grid, rows, maxcols, sz, gap / 2);
	let r = getRectInt(grid); console.log('rect', r, wtotal, htotal)
	console.log('tiles', tiles)
}
async function test0_board0() {
	await initTest();
	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); //mFlex('dMain');
	let grid = mGrid(3, 3, 'dMain', { bg: 'red', gap: 2, padding: 2, box: true, margin: 4 });
	for (const i of range(9)) {
		let d = mDom(grid, { bg: 'blue', w: 100, h: 100 });
	}
	let r = getRectInt(grid); console.log('rect', r)
}
async function test0_msGrid() {
	await initTest();
	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); mFlex('dMain');
	//let cols = 7, w = cols * 130 + 30, h = 5 * 130 + 10;
	let list = M.byCat.sport; //Object.keys(M.superdi); //M.byType.fa6; //Object.keys(M.superdi); // M.byCat.transport; //  ['circumscribed_multiplication'];//, 'circumscribed_addition', 'circumscribed_subtraction', 'circumscribed_division', 'circumscribed_exponentiation', 'circumscribed_square_root', 'circumscribed_square_root_2', 'circumscribed_square_root_3', 'circumscribed_square_root_4'];

	let container = mDom('dMain', { className: 'gallery fadeIn', bg: 'sienna' }); //,w,h });
	//console.log('list', list);
	let elemStyle = {};// display: 'block', align:'center', w100: true, h100: true, box: true, fg: 'white', bg: 'grey', padding: 10, cursor: 'pointer' };
	let i = 0;
	let n = Math.floor(window.innerWidth / (130)) * Math.floor(window.innerHeight / (130)); console.log('n', n);
	for (const k of list) {
		let o = M.superdi[k];
		// if (isdef(o.fa6)) { d = mDom(dParent, { ...elemStyle, family: Families.fa6 }, { html: `&#x${o.fa6};` }); }
		let d = mDom(container, { rounding: 3, bg: 'beige', fg: 'black' })
		let d1 = msKey(k, d, { hmax: 64 }, { prefer: 'photo' });
		mLinebreak(d)
		let d2 = mDom(d, { className: 'label' }, { html: k, title: k })
		if (0 === ++i % n) await mSleep(20);

	}

	mScrollBehavior(container, 654, 654); // 5 times row height + vertical gap
}
async function test0_showKeys() {
	await initTest();

	let list = Object.keys(M.superdi); // M.byType.fa6; //M.byCat.transport; //M.byCat.sport; // ['circumscribed_multiplication'];//, 'circumscribed_addition', 'circumscribed_subtraction', 'circumscribed_division', 'circumscribed_exponentiation', 'circumscribed_square_root', 'circumscribed_square_root_2', 'circumscribed_square_root_3', 'circumscribed_square_root_4'];
	let [w, h, gap] = [120, 100, 10];
	let dParent = mDom('dMain', { display: 'grid', gridTemplateCols: `repeat(auto-fill, ${w}px)`, gridTemplateRows: h, justifyContent: 'center', gap, padding: gap, wrap: true, w100: true, box: true }, { id: 'grid-container' });
	let i = 0;
	let n = Math.floor(window.innerWidth / (w + gap)) * Math.floor(window.innerHeight / (h + gap)); console.log('n', n);
	//let elemStyle = {className: 'grid-cell', bg: 'silver', padding: gap, cursor: 'pointer'}
	let elemStyle = { display: 'block', align: 'center', w100: true, h100: true, box: true, fg: 'white', bg: 'grey', padding: gap, cursor: 'pointer' };
	for (const k of list) {

		let o = M.superdi[k]; //console.log(o)
		let d;
		//type:plain: all superdi objects have this type since its just the key
		d = mDom(dParent, { ...elemStyle, breakWord: true }, { html: k, id: getUID(), onclick: onclickItem });

		//type emo
		if (isdef(o.emo)) {
			d = mDom(dParent, { ...elemStyle, fz: h * 0.8, family: Families.emo }, { html: o.emo });
		}
		//type:img:
		if (isdef(o.img)) {
			d = mDom(dParent, { ...elemStyle, fit: o.cats.includes('card') ? 'contain' : 'cover', 'object-position': 'center center' }, { tag: 'img', src: o.img, alt: k });
		}

		//type photo
		if (isdef(o.photo)) {
			d = mDom(dParent, { ...elemStyle, fit: o.cats.includes('card') ? 'contain' : 'cover', 'object-position': 'center center' }, { tag: 'img', src: o.photo, alt: k });
		}

		//type uni:
		if (isdef(o.uni)) {
			d = mDom(dParent, { ...elemStyle, fz: h * 0.8, family: Families.uni }, { html: o.uni });
		}
		//type fa6:
		if (isdef(o.fa6)) {
			d = mDom(dParent, { ...elemStyle, fz: h * 0.8, family: Families.fa6 }, { html: `&#x${o.fa6};` });
		}

		//type:ga:
		if (isdef(o.ga)) {
			d = mDom(dParent, { ...elemStyle, fz: h * 0.8, family: Families.ga }, { html: `&#x${o.ga};` });
		}
		//type:fa:
		if (isdef(o.fa)) {
			d = mDom(dParent, { ...elemStyle, fz: h * 0.8, family: Families.fa }, { html: `&#x${o.fa};` });
		}
		// let d1 = mKey(k, dParent, {className:'grid-cell',w,h}, {prefer:'plain'}); //, html: o.fa6 }); //'data-innerHTML': o.fa6 });
		if (0 === ++i % n) await mSleep(20);
	}
}
async function test0_showCollection() {
	await initTest();
	let list = Object.keys(M.byCat).sort()
	for (const k of list) {
		mDom(dLeft, {}, { tag: 'button', 'html': k, onclick: showCollection });
		mLinebreak(dLeft);
	}
	clickOn('math')
}
async function test0_showItem() {
	await initTest();
	let keys = M.byCat.animal; //Object.keys(M.superdi); // M.byCat.animal;

	let [gap, w, h] = [10, 100, 100];
	let dGrid = mDom('dMain', { display: 'flex', fg: 'black', gap, padding: gap, wrap: true });
	let i = 0;
	let n = Math.floor(window.innerWidth / (w + gap)) * Math.floor(window.innerHeight / (h + gap)); console.log('n', n);
	for (const k of keys) {
		let d = mDom(dGrid, { bg: 'silver', padding: gap, cursor: 'pointer' }, { id: getUID(), onclick: onclickItem });
		mKey(k, d, { w, h, fz: h, box: true, fg: 'black', bg: 'white' });
		mDom(d, { w, fg: 'black', 'text-overflow': 'ellipsis', 'white-space': 'nowrap', overflow: 'hidden', fz: 16, align: 'center' }, { html: k });
		DA.items[d.id] = { div: d, key: k };
		if (0 === ++i % n) await mSleep(20);
	}
}
async function test0_() {
	await loadAssetsStatic(); console.log('M', M);
	for (const k in M.superdi) { M.superdi[k].key = k; }
	stickyHeaderCode();

	let elems = mLayoutLM('dPage');
	mStyle('dMain', { overy: 'auto' });

	let dLeft = mBy('dLeft');
	mStyle(dLeft, { overy: 'auto' });

	//mKey('ballet_shoes', dMain, { h: 100, w: 100, box: true, fg: 'black', bg: 'white' }); return;
	let keys = rChoose(Object.keys(M.superdi), 10); //
	//keys = ['complementary','ballet_shoes']; //[,'ballet_shoes']
	//showCollection(keys); return;
	let list = Object.keys(M.byCat).sort();
	let outerStyles = {}; // {border:'solid 3px silver',bg:'dimgray',fg:'white'};
	let symbolStyles = { round: true };
	let labelStyles = {}; //family:'algerian'}
	let opts = { prefer: 'plain', onclick: toggleSelection };
	for (const k of list) {
		mDom(dLeft, {}, { tag: 'button', 'html': k, onclick: ev => showCollection(k, 'dMain', outerStyles, symbolStyles, labelStyles, opts) });
		//mDom(dLeft, {}, { tag: 'button', 'html': k, onclick: ev => showCollection(k, 'dMain') });
		mLinebreak(dLeft);
	}
	clickOn('user')

}
async function test0_listkeys() {
	await loadAssetsStatic();
	let keys = Object.keys(M.superdi);
	let dinew = {};
	keys.sort();
	for (const k of keys) {
		let o1 = M.superdi[k];
		let o2 = null, k2 = k;

		if (k.endsWith('_uni')) {
			console.log('uni', k, o1.text);
			k2 = k.replace('_uni', '');
			o2 = M.superdi[k2];
			assertion(o2, `MISSING KEY ${k2}`);
			o2.uni = o1.text;
		} else if (o1.coll2 && o1.colls.includes('unicode')) {
			assertion(o1.text, `MISSING TEXT ${k}`);
			o2 = { uni: o1.text };
		} else if (o1.text && o1.text.startsWith('&')) {
			o2 = { emo: o1.text };
		} else o2 = {};
		//copy cats
		if (o1.cats) o2.cats = o1.cats;

		//copy fa,ga,fa6,img,photo
		if (o1.fa) o2.fa = o1.fa;
		if (o1.ga) o2.ga = o1.ga;
		if (o1.fa6) o2.fa6 = o1.fa6;
		if (o1.img) {
			o2.img = o1.img;
			if (o1.img.includes('/cards')) addIf(o2.cats, 'card');
		}
		if (o1.photo) o2.photo = o1.photo;

		if (o2) dinew[k2] = o2;
	}

	// downloadAsText(keys.join('\n'), 'keys');
	downloadAsYaml(dinew, 'superdi');

}
//*********** deprecated (o.colls removed in superdi) ************** */
async function test0_showCollection0() {
	await loadAssetsStatic();
	for (const k in M.superdi) { M.superdi[k].key = k; }
	stickyHeaderCode();

	let elems = mLayoutLM('dPage');
	mStyle('dMain', { overy: 'auto' });

	let dLeft = mBy('dLeft');
	mStyle(dLeft, { overy: 'auto' });

	let list = [...Object.keys(M.byCollection), ...Object.keys(M.byCat)].sort();
	for (const k of list) {
		mDom(dLeft, {}, { tag: 'button', 'html': k, onclick: ev => showCollection(k, 'dMain') });
		mLinebreak(dLeft);
	}
	clickOn('math')
}

//*************************** deprecated! *****************************/
async function test0_lazyload() {
	await loadAssetsStatic();

	// console.log('colors',M.colorNames); mStyle('dPage', { bg: 'aubergine', fg: 'white' }); return;
	let dPage = mBy('dPage');
	mStyle(dPage, { matop: 60 });//position:'relative',top:80})
	let elems = mLayoutLM('dPage');
	//let d=mDom(dPage, { position:'sticky',bg: 'black', fg: 'white', padding: 10, gap: 10, display: 'flex', wrap: true });
	//mInsert(dPage,d)
	let d = mDom(document.body, { top: 0, zIndex: 1000, position: 'sticky', bg: 'black', fg: 'white', padding: 0, margin: 0, gap: 10, display: 'flex', wrap: true });
	mInsert(dPage, d)

	return;
	//createStickyAndContentDivs();return;

	// let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); mCenterFlex('dMain');
	//let dFilter = mDom('dMain',{bg:'violet'},{html:uiFilterElement()}); //mAppend('dMain', dFilter)
	for (const k in M.superdi) { M.superdi[k].key = k; }

	let dTop = mDom('dSticky', { bg: 'black', fg: 'white', w100: true, box: true, padding: 10, gap: 10, display: 'flex', wrap: true }, { id: 'dTop' });
	let keys = await uiFilterMenu('dTop', 'all'); //console.log(keys)
	let dParent = mDom('dMain', { display: 'flex', gap: 10, padding: 10, wrap: true, w100: true, box: true }, { id: "table", });
	//keys = M.byCollection.emo;
	//let keys = 'turkey turtle twelve_oclock twelve_thirty two_hearts two_hump_camel two_oclock two_thirty umbrella';keys=keys.split(' ');
	let sz = 200;
	let style = { fz: sz / 1.25, w: sz, h: sz, box: true, padding: 4, fg: 'skyblue' };

	//machzuerst nur 100, dann mehr
	let i = 0;
	for (const k of keys) {
		let o = M.superdi[k];
		let d1 = mDom(dParent, { display: 'grid' });
		await mKey(k, d1, style, { prefer: 'fa6' }); //, html: o.fa6 }); //'data-innerHTML': o.fa6 });
		mDom(d1, { w100: true, wmax: sz, fg: 'black', 'text-overflow': 'ellipsis', 'white-space': 'nowrap', overflow: 'hidden', fz: 16, align: 'center' }, { html: o.key })
		if (++i % 100 == 0) await mSleep(10);
		//console.log(o); return;
	}

	// let images = keys.map(x => M.superdi[x]).filter(x => isdef(x.img)); //allImages);//.map(x => x.path); console.log(images)
	// console.log(images[10])
	// for (const o of images) {
	// 	let d1 = mDom(dParent, { display: 'grid' });
	// 	mDom(d1, style, { tag: 'img', 'data-src': o.img })
	// 	mDom(d1, { w100: true, wmax: sz, fg: 'black', 'text-overflow': 'ellipsis', 'white-space': 'nowrap', overflow: 'hidden', fz: 16, align: 'center' }, { html: o.key })
	// }

	//lazyLoad('innerHTML'); //Images();

	//downloadAsYaml(M, 'm');
}

async function test0_showCollections1() {
	await loadAssetsStatic();

	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); mCenterFlex('dMain');
	let dLeft = mBy('dLeft');
	let family = "'Noto Sans', sans-serif"; // "Arial Unicode MS"; //'"Segoe UI", "DejaVu Sans", "Arial Unicode MS", sans-serif'
	let styles = { family, fz: 48, sz: 100, bg: 'white', fg: 'black' };

	// let dParent = mDom('dMain', { display: 'flex', wrap: true, w:500 }, { id: "table", });
	let dParent = mDom('dMain', { display: 'flex', wrap: true, w100: true, box: true }, { id: "table", });
	iconViewer();
	return;

	// let container = mDom('dMain', { display: 'flex', wrap: true, w100:true, box:true }, { id: "image-container", });
	let container = mDom('dMain', { display: 'flex', wrap: true, w: 500 }, { id: "image-container", });

	// Example usage
	//const container = document.getElementById("image-container");
	let images = dict2list(M.allImages).map(x => x.path); console.log(images)

	showCollection(container, index => images[index], { h: 100 });
	// createLazyImageLoader({
	// 	container: container,
	// 	imageUrlCallback: index => images[index], //`https://picsum.photos/300/200?random=${index}`,
	// 	imageWidth: 100,
	// 	imageHeight: 100,
	// 	bufferPages: 1,
	// 	imagesPerRow: 3
	// });

	// showCollection();


	//collections and categories zeigen
	//filter zeigen
	//alles rausfiltern und zeigen
}
async function test0_showMathSymbols() {
	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); mCenterFlex('dMain');
	let d = mGrid(null, 5, 'dMain');

	for (const k of MathKeys) {
		let text = Symbols[k];
		let d1 = mDom(d, { margin: 10, display: 'grid', bg: 'pink', justify: 'center', align: 'center' });
		//mDom(d1,{},{tag:'pre',html:sym.text});
		//let dSym = mDom(d1, {  }, { html: `<div class="symbol">${text}</div>` }); //sym.text
		let dSym = mDom(d1, { className: 'symbol' }, { html: text }); //sym.text
		let dlabel = mDom(d1, { align: 'center', fz: 12, bg: 'yellow', fg: 'black' }, { html: k });
	}
}
async function test0_showSymbols() {
	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); mCenterFlex('dMain');
	let d = mGrid(null, 5, 'dMain');

	for (const k in newDict) {
		if (nundef(Symbols[k])) {
			let text = newDict[k];
			let d1 = mDom(d, { margin: 10 });
			//mDom(d1,{},{tag:'pre',html:sym.text});
			let dSym = mDom(d1, { className: 'symbol' }, { html: `<div class="symbol">${text}</div>` }); //sym.text
			let dlabel = mDom(d1, { align: 'center', fz: 12, bg: 'yellow', fg: 'black' }, { html: k });

		} else if (Symbols[k] != newDict[k]) {
			let text = newDict[k];
			let d1 = mDom(d, { margin: 10 });
			//mDom(d1, {}, {tag:'pre', html:sym.text});
			let dNew = mDom(d1, { className: 'symbol' }, { html: `<div class="symbol">${newDict[k]}</div>` }); //sym.text
			let dSym = mDom(d1, { className: 'symbol' }, { html: `<div class="symbol">${Symbols[k]}</div>` }); //sym.text
			let dlabel = mDom(d1, { align: 'center', fz: 12, bg: 'yellow', fg: 'black' }, { html: k });
			//mStyle(dSym, { bg: 'red' });
		}
	}


	console.log(arrMinus(Object.keys(newDict), Object.keys(Symbols)));
	console.log(arrMinus(Object.values(newDict), Object.values(Symbols)));
	// console.log(arrMinus(Object.keys(Symbols),Object.keys(Symbols1))); 
	return;

}
async function test0_showCollections() {

	await loadAssetsStatic();

	for (const k of MathKeys) {
		if (nundef(M.superdi[k])) console.log('missing key', k);
	}
	return;
	//console.log(M.byCollection.unicode); return;

	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); mCenterFlex('dMain');
	let dLeft = mBy('dLeft');
	let family = "'Noto Sans', sans-serif"; // "Arial Unicode MS"; //'"Segoe UI", "DejaVu Sans", "Arial Unicode MS", sans-serif'
	let styles = { family, fz: 48, sz: 100, bg: 'white', fg: 'black' };
	let opts = { prefer: 'text' };
	for (const k of M.collections) {
		mDom(dLeft, {}, { tag: 'button', 'html': k, onclick: ev => showCollection(k, 'dMain', styles, { prefer: ev.target.innerHTML == 'unicode' ? 'text' : null }) }); mLinebreak(dLeft)
	}

	await showCollection('unicode', 'dMain', styles, opts);
	return;
	let d = mDom('dPage'); mStyle(d, { gap: 10, display: 'flex', wrap: true, padding: 10 });
	let keys = filterKeys('emo', 'sport', x => x.img && x.img.includes('emo'));// console.log(keys); //return;
	for (const i of range(30)) {
		let sym = M.superdi[rChoose(keys)];// console.log(sym);
		let src = sym.img;
		let svg = generateSvgWithImage(src, 200, 200)
		let d1 = mDom(d, { h: 200, w: 200, display: 'grid' });
		mDom(d1, {}, { html: svg }); //return;
	}

}
async function test0_imageSymbols() {
	await loadAssetsStatic();
	let dict = M.c52Symbols = await loadStaticYaml('assets/c52symbols.yaml');
	//console.log('c52Symbols', M.c52Symbols);
	//console.log(M)
	let d = mDom('dPage'); mStyle(d, { gap: 10, display: 'flex', wrap: true, padding: 10 });

	mDom(d, { h: 200, w: 140 }, { html: __cardSvgs['TC'] });

	for (const rank of range(1, 11)) {
		d.appendChild(createCard('' + rank, "♣", 100));
	}

	// 	// Example usage:
	// 	d.appendChild(createCard("10", "♣", 240, 336));
	// 	d.appendChild(createCard1("10", "♣", 240, 336));
	// //	d.appendChild(createCard2("10", "♣", 240, 336));
	// 	d.appendChild(createCard3("10", "♣", 240, 336));
	// 	d.appendChild(createCard343("10", "♣", 240, 336));
	// 	d.appendChild(createCardGrid("10", "♣", 240, 336));
	return;

	let keys = filterKeys('emo', 'sport', x => x.img && x.img.includes('emo'));// console.log(keys); //return;
	for (const i of range(30)) {
		svg = createCardSVG("2H", "VC2", "SC2"); console.log(svg)
		let d1 = mDom(d);
		mAppend(d1, svg); //return;

		// let sym = M.superdi[rChoose(keys)];// console.log(sym);
		// let src = sym.img;
		// let svg = generateSvgWithImage(src, 200, 200)
		// let d1 = mDom(d, { h: 200, w: 200, display: 'grid' });
		//mDom(d1, {}, { html: svg }); return;
	}
}
async function test0_createCard() {
	await loadAssetsStatic();
	let dict = M.c52Symbols = await loadStaticYaml('assets/c52symbols.yaml');
	//console.log('c52Symbols', M.c52Symbols);
	//console.log(M)
	let d = mDom('dPage'); mStyle(d, { gap: 10, display: 'flex', wrap: true, padding: 10 });
	let keys = filterKeys('emo', 'sport', x => x.img && x.img.includes('emo'));// console.log(keys); //return;
	for (const i of range(30)) {
		svg = createCardSVG("2H", "VC2", "SC2"); console.log(svg)
		let d1 = mDom(d);
		mAppend(d1, svg);
	}
}
async function test0_displayEmoAsSymbol() {
	await loadAssetsStatic();
	let dict = M.c52Symbols = await loadStaticYaml('assets/c52symbols.yaml');
	//console.log('c52Symbols', M.c52Symbols);
	//console.log(M)
	let d = mDom('dPage'); mStyle(d, { gap: 10, display: 'flex', wrap: true, padding: 10 });
	let keys = filterKeys('emo', 'sport', x => x.img && x.img.includes('emo'));// console.log(keys); //return;
	for (const i of range(30)) {
		let sym = M.superdi[rChoose(keys)];// console.log(sym);
		let src = sym.img;
		let svg = generateSvgWithImage(src, 200, 200)
		let d1 = mDom(d, { h: 200, w: 200, display: 'grid' });
		mDom(d1, {}, { html: svg });
	}
}
async function test0_displayImgAsSymbol() {
	await loadAssetsStatic();
	let dict = M.c52Symbols = await loadStaticYaml('assets/c52Symbols.yaml');
	//console.log('c52Symbols', M.c52Symbols);
	//console.log(M)
	let d = mDom('dPage'); mStyle(d, { gap: 10, display: 'flex', wrap: true, padding: 10 });
	for (const i of range(3)) {
		let src = rChoose(Object.values(M.allImages)); console.log(src);
		let svg = generateSvgWithImage(src.path, 200, 200)
		let d1 = mDom(d, { h: 200, w: 200, display: 'grid' });
		mDom(d1, {}, { html: svg });
	}
}
async function test0_displaySymbols() {
	await loadAssetsStatic();
	let dict = M.c52Symbols = await loadStaticYaml('assets/c52Symbols.yaml');
	//console.log('c52Symbols', M.c52Symbols);
	console.log(M)
	let d = mDom('dPage'); mStyle(d, { gap: 10, display: 'flex', wrap: true, padding: 10 });
	for (const s in dict) {
		//console.log(s, dict[s]);
		let d1 = mDom(d, { h: 200, w: 200, display: 'grid' });
		displaySymbol(dict[s], d1); //return;
		mDom(d1, {}, { html: s });
	}
}
async function test0_symbols() {
	let d = mDom('dPage'); mStyle(d, { gap: 10, display: 'flex', wrap: true, padding: 10 });
	let dict = {};
	for (const key in __cardSvgs) {
		let svg = __cardSvgs[key];
		extractSymbols(svg, dict);
		//let dc = mDom(d, { h: 200, w: 140 }, { html: svg });
	}
	console.log('dict', dict);
	downloadAsYaml(dict, 'symbols');
}
async function test0_svgcard() {
	//await DAInit();
	let d = mDom('dPage'); mStyle(d, { gap: 10, display: 'flex', wrap: true, padding: 10 });
	for (const key of ['2H', 'KS', 'TC']) {
		let svg = __cardSvgs[key];
		svg = updateSuit(svg, 'H');
		let dc = mDom(d, { h: 200, w: 140 }, { html: svg });
	}
}
async function test0_c52() {
	//await DAInit();
	let d = mDom('dPage'); mStyle(d, { gap: 10, display: 'flex', wrap: true, padding: 10 });
	for (const r of toWords('2 3 4 5 6 7 8 9 T J Q K A')) {
		for (const s of toWords('S H D C')) {
			let key = `${r}${s}`;
			let svg = __cardSvgs[key];
			svg = replaceCardLabel(svg, 'H');

			let parts = svg.split("fill='white' stroke='black'");
			let [color, bg, border] = [rColor(), rColor(), rColor()];
			svg = replaceColorsInCard(parts[0], color) + ` fill='${bg}' stroke='${border}' ` + replaceColorsInCard(parts[1], color);

			//let code = renderCard(key,'green','orange'); console.log(code)
			let dc = mDom(d, { h: 200, w: 140 }, { html: svg });
			//let dc=mDom(d,{h:200,w:140});
			//renderCardInContainer(key,rColor(),rColor(),dc)

		}
	}
	// let dc = mDom(d, { h: 200, w: 140 }, { html: cardSvgs['0J'] });
	// dc = mDom(d, { h: 200, w: 140 }, { html: cardSvgs['1J'] });
	//showDeck(['2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD', 'AD'],'dPage','left',100,100);
}

async function test0_delete_and_create() {
	let res = await deleteGames(); console.log('res', res);
	res = await pyStartGame(); console.log('res', res);
}
async function test0_folding() {
	// --- Example usage ---
	const result = testCartesianFunctions();
	console.log("Compact:", result.compact);
	console.log("Expanded:", result.expanded);

}
async function test0_flask() {
	await DAInit(true);
	await clickOn('games');
	if (TESTING) await clickOn(rChoose(['gul', 'felix', 'amanda', 'lauren', 'mimi'])); await mSleep(10);
	await clickOn(DA.bPoll); //starts
	await clickOn(DA.bPoll); //stops
}
async function test0_game0() {
	await DAInit(true);

	await clickOn('games');
	if (TESTING) await clickOn(rChoose(['gul', 'felix', 'amanda', 'lauren', 'mimi']));

	clickOn(DA.bPoll);
	//console.log('....polling started',DA.pollInterval);


	//wenn mPhp... mache soll DA.bPoll ganz rot werden, danach wieder normal
	//const pulse = b.animate([{ opacity: 1 }, { opacity: 0.3 }, { opacity: 1 }], { duration: 1000, iterations: 1 });

}
async function test0_buttons_NO() {
	await DAInit(true);
	let TESTING = true;
	mStyle('dPage', { bg: 'green', fg: 'white' });
	let d = mBy('dTopLeft'); mStyle(d, { display: 'flex', vStretch: true, gap: 10, padding: 10, box: true }); //, box:true, vStretch:true, hCenter: true, padding: 10, gap: 10 }) //mClass(d,'flex')

	let bStyles = { hPadding: 10, h: 25, wmin: 70, vPadding: 6, rounding: 10, cursor: 'pointer', className: 'hover', vCenter: true, display: 'flex', hCenter: true };
	mDom(d, bStyles, { html: 'game', onclick: onclickTest, menu: 'top' });
	mDom(d, bStyles, { html: 'An', onclick: onclickTest, menu: 'top' });
	mDom(d, bStyles, { html: 'Lop', onclick: onclickTest, menu: 'top' });
	mDom(d, bStyles, { html: 'Miq', onclick: onclickTest, menu: 'top' });
	let b = mKey('watch', d, bStyles, { onclick: onclickTest, menu: 'top' });
}
async function test0_flex() {
	let d = mDom('dPage', { display: 'flex', vStretch: true, bg: 'blue', fg: 'white', gap: 10, padding: 10, box: true, h: 75 });
	let b = mDom(d, { className: 'vert_align_button', alignSelf: 'baseline', bg: 'red' }, { html: 'Help' });
	b = mDom(d, { className: 'vert_align_button', bg: 'red' }, { html: 'Help' });
	b = mDom(d, { className: 'vert_align_button', alignSelf: 'center', bg: 'red' }, { html: 'Help' });
	b = mDom(d, { className: 'vert_align_button', alignSelf: 'start', bg: 'red' }, { html: 'Help' });
	b = mDom(d, { className: 'vert_align_button', alignSelf: 'end', bg: 'red' }, { html: 'Help' });

	b = mDom(d, { alignSelf: 'baseline', bg: 'green' }, { html: 'Help' });
	b = mDom(d, { bg: 'green' }, { html: 'Help' });
	b = mDom(d, { alignSelf: 'center', bg: 'green' }, { html: 'Help' });
	b = mDom(d, { alignSelf: 'start', bg: 'green' }, { html: 'Help' });
	b = mDom(d, { alignSelf: 'end', bg: 'green' }, { html: 'Help' });
}
async function test0_save_state() {
	await DAInit(true);
	let state = await showTable(); //if (VERBOSE) console.log('vorher', jsCopy(state));

	state.num = rNumber();

	let res = await DASaveState(state); //if (VERBOSE) console.log('nachher', res);

}
async function test0_get_state() {

	await DAInit();
	let state = await showTable();

	if (VERBOSE) console.log('DONE!', state);
}
async function test0_php0() {
	await loadAssetsStatic();
	// let res = await mPhpPost('all', { action: 'dir', dir:'tables' },'simple0',true); if (VERBOSE) console.log('res', res)
	// let files = await mGetFilenames('tables'); //if (VERBOSE) console.log('files', files);
	M.tables = await MPollTables();
	if (VERBOSE) console.log('M', M)
}
async function test0() {
	if (VERBOSE) console.log('YEAH!');
}	
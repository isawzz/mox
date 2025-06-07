
function cryBoard(dParent, cols, rows, sz) {
	dParent = toElem(dParent);
	let [w, h] = [sz * cols + sz + 20, (sz * .75) * cols + 40];
	//let [cols, rows, sz] = [9, 10, 80];
	// let w=sz*cols+sz+20;
	// let h=(sz*.75)*cols+40;
	let dBoard = mDom(dParent, { w, h });//(sz/.7)*rows+sz+20});//,acontent:'center',jcontent:'center' });

	let d = mDom(dBoard, { gap: 10, margin: 10, position: 'relative' });

	let clip = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

	let dihab = { mountain: 'gray', desert: 'yellow', forest: 'green', water: 'blue', swamp: 'brown' };
	let diterr = { all: null, bear: 'black', puma: 'red' };

	let items = [];
	for (let r = 0; r < rows; r++) {
		let x = r % 2;
		let thiscols = x > 0 ? cols : cols + 1;
		for (let c = 0; c < cols; c++) {
			//let db=mDom(d,{bg:'white',clip,w:sz-1, h:sz-1, position:'absolute', left:x*sz*.5, top:r*sz*.75}); //, bg:rChoose(Object.keys(dihab))})
			//let db=mDom(d,{className:'hex1',clip,w:sz-1, h:sz-1, position:'absolute', left:x*sz*.5, top:r*sz*.75}); //, bg:rChoose(Object.keys(dihab))})
			let gap = 0;
			let db = mDom(d, { clip, w: sz - gap, h: sz - gap, position: 'absolute', left: x * sz * .5, top: r * sz * .75 }); //, bg:rChoose(Object.keys(dihab))})

			let shrink = 0;
			let habitat = rChoose(Object.keys(dihab));
			let territory = rChoose(Object.keys(diterr));
			let bg = dihab[habitat];

			if (territory == 'puma') { shrink = 4; mStyle(db, getDashedHexBorder('red',bg)); }
			else if (territory == 'bear') { shrink = 4; mStyle(db, getDashedHexBorder('silver',bg)); }
			else { shrink = 4; mStyle(db, { bg }); } //shrink=4;
			let d1 = mDom(db, { left: 2, top: 2, clip, position: 'absolute', w: sz - (gap + shrink), h: sz - (gap + shrink), bg });
			//return;
			//let d1 = mDom(d, { left: x * sz *.5, top: r * sz*.75, clip, position: 'absolute', w: sz-4, h: sz-4, bg: rChoose(Object.values(dihab)) });
			//mStyle(d1,{className:'hex'})
			x += 2;
			mCenterCenterFlex(d1);
			items.push({ r, c, div: d1, habitat, territory })
		}
	}
	return items;
}
function getDashedHexBorder(color,bg='transparent') {
	//return {border:'2px solid white'} NO
	//return {bg:color};
	return {
		background: `repeating-linear-gradient(0deg, ${color}, ${color} 4px, ${bg} 4px, ${bg} 10px),
		repeating-linear-gradient(60deg, ${color}, ${color} 4px, ${bg} 4px, ${bg} 10px)`
	}
	bg='transparent';
	return {
		background: `repeating-linear-gradient(-60deg, ${color}, ${color} 4px, ${bg} 4px, ${bg} 10px),
    repeating-linear-gradient(60deg, ${color}, ${color} 4px, ${bg} 4px, ${bg} 10px),
    repeating-linear-gradient(0deg, ${color}, ${color} 4px, ${bg} 4px, ${bg} 10px)`,
		bgSize: '100% 100%'

	}
	return {
		background: `repeating-linear-gradient(-60deg, ${color}, ${color} 4px, transparent 4px, transparent 10px)`,
		// repeating - linear - gradient(
		//   60deg, red, red 4px, transparent 4px, transparent 10px
		// ),
		// repeating - linear - gradient(
		//   0deg, red, red 4px, transparent 4px, transparent 10px
		// );
		bgSize: '100% 100%'
	};
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
function getTessSvgFacesVerts(TessClass, cols = 3, rows = 3, options = {}) {
	addKeys({
		function: planeFunction,
		u_range: [0.0, 1.0],
		v_range: [0.0, 1.0],
		u_num: cols,
		v_num: rows,
		u_cyclic: false,
		v_cyclic: false,
		adaptor_class: SvgAdaptor
	}, options);

	const tessagon = new TessClass(options);
	const gCode = tessagon.create_mesh();
	const faces = tessagon.mesh_adaptor.face_list;
	const verts = tessagon.mesh_adaptor.vert_list;
	return { tessagon, faces, verts, gCode };
}

/**
 * Create an SVG tessellation of the given tessagon class inside the given div, applying styles, and return the polygons.
 * @param {HTMLElement|string} dParent - The container div or its id.
 * @param {Function} TessClass - The tessagon class constructor (e.g. HexTessagon).
 * @param {Object} [styles={}] - Optional styles to apply to each polygon (e.g. {fill: 'orange', stroke: 'black'}).
 * @param {Object} [options={}] - Optional tessellation options (cols, rows, etc).
 * @returns {NodeListOf<SVGPolygonElement>} The list of SVG polygon elements created.
 */
function createSvgTessellationPolygons(dParent, TessClass, styles = {}, options = {}) {
	dParent = toElem(dParent);
	mClear(dParent);

	// Default tessellation options
	const cols = options.cols || 5;
	const rows = options.rows || 5;

	// Create tessagon mesh
	const tessagon = new TessClass({
		function: planeFunction,
		u_range: [0.0, 1.0],
		v_range: [0.0, 1.0],
		u_num: cols,
		v_num: rows,
		u_cyclic: false,
		v_cyclic: false,
		adaptor_class: SvgAdaptor
	});
	const svgElem = tessagon.create_mesh();

	// Insert SVG into parent
	dParent.appendChild(svgElem);

	// Apply styles to polygons
	const polygons = svgElem.querySelectorAll('polygon');
	polygons.forEach(poly => {
		for (const [k, v] of Object.entries(styles)) {
			poly.setAttribute(k, v);
		}
	});

	return polygons;
}

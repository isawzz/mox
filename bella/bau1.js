
function mColorSuccession(styles,bgdefault,fgdefault){
	let bg = styles.bg || styles.background || bgdefault;
	let fg = styles.fg || styles.color || fgdefault;
	if (fg == 'contrast') fg = colorIdealText(bg); else fg = colorFrom(fg);
	return [colorFrom(bg), fg];

}
function mSvg(dParent, styles={}, opts={}) {
	// let html = `
  //       <svg id="svg2" width="500" height="500" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg" stroke="black"
  //           fill="lightblue" stroke-width="0.005">
  //           ${res}
  //       </svg>
  //       `;
	// d.innerHTML = html;
	dParent = toElem(dParent);
	let [w,h] = mSizeSuccession(styles,500);
	let [bg,fg] = mColorSuccession(styles, 'white','black');
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
function getTessSvgFacesVerts(TessClass, cols=3, rows=3, options={}) {
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

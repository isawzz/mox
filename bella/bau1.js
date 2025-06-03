
function getTessSvgFacesVerts(func, options) {
	const tessagon = new TessClass(options);
	const svgElem = tessagon.create_mesh();
	const faces = tessagon.face_list;
	const verts = tessagon.vert_list;
	return { tessagon, faces, verts, svgElem };
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


function centerOfDiv(div) {
  const rect = div.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  return {
    x: rect.left + scrollLeft + rect.width / 2,
    y: rect.top + scrollTop + rect.height / 2
  };
}

function cryptidTile(d, x, r, sz, gap, clip, bg, territory) {
	let sznet = sz - gap;
	let posnet = sz - gap / 2;
	let [w, h, left, top] = [sznet, sznet, x * posnet * .5, r * posnet * .75];
	//let d1 = mDom(d, { cursor:'pointer', position: 'absolute', left: x * sz * .5, top: r * sz * .75, w: sz, h: sz, clip, bg });

	let html = `
						<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" pointer-events="none">
							<polygon
								points="50,0 100,25 100,75 50,100 0,75 0,25"
								stroke="${territory == 'puma' ? 'red' : territory == 'bear' ? 'silver' : bg}"
								stroke-width="2"
								fill="${bg}"
								${territory == 'puma' || territory == 'bear' ? 'stroke-dasharray="2,2"' : ''}
								stroke-linejoin="round"
							/>
						</svg>

			`; //vector-effect="non-scaling-stroke" points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" 

	let d1 = mDom(d, { cursor: 'pointer', position: 'absolute', left, top, w, h, clip, bg }, { html });
	mCenterCenterFlex(d1);
	return d1;

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

function add_face_indices_to_svg(svg, face_list, vert_list) {
	const polygons = Array.from(svg.querySelectorAll('polygon'));

	// Normalize polygon points for comparison (string of rounded x,y pairs)
	function normalize_coords(coords) {
		return coords.map(([x, y]) => `${x.toFixed(6)},${y.toFixed(6)}`).join(' ');
	}

	// Create normalized point strings for each face in face_list
	const face_coords_map = face_list.map((face) => {
		const coords = face.map(i => vert_list[i].slice(0, 2));  // ignore z
		return normalize_coords(coords);
	});

	polygons.forEach(polygon => {
		const pointsAttr = polygon.getAttribute('points').trim();
		const points = pointsAttr.split(/\s+/).map(pt => pt.split(',').map(Number));
		const norm = normalize_coords(points);

		const face_index = face_coords_map.findIndex(f => f === norm);
		if (face_index !== -1) {
			polygon.setAttribute('data-face-index', face_index);
		} else {
			console.warn('Polygon did not match any face in face_list:', norm);
		}
	});
}

function addPolygonEvents(groupElement, onClickHandler, onEnterHandler, onLeaveHandler) {
	if (!groupElement || !(groupElement instanceof SVGGElement)) {
		console.error("Invalid group element provided.");
		return;
	}

	const polygons = groupElement.querySelectorAll('polygon');

	polygons.forEach(polygon => {
		if (onClickHandler) { polygon.addEventListener('click', onClickHandler); }
		if (onEnterHandler) { polygon.addEventListener('mouseenter', onEnterHandler); }
		if (onLeaveHandler) { polygon.addEventListener('mouseleave', onLeaveHandler); }
	});
}

function addPolygonNeighborClick(groupElement, fillColor = 'yellow') {
	if (!groupElement || !(groupElement instanceof SVGGElement)) {
		console.error("Invalid group element.");
		return;
	}

	const polygons = groupElement.querySelectorAll('polygon');

	polygons.forEach(polygon => {
		polygon.addEventListener('click', () => {
			const neighbors = polygon.dataset.neighbors?.split(',') || [];

			neighbors.forEach(id => {
				const neighbor = document.getElementById(id.trim());
				console.log('neighbor', neighbor);
				if (neighbor) {
					neighbor.style.fill = fillColor;
				}
			});
		});

		// polygon.addEventListener('mouseover', () => {
		//   polygon.style.cursor = 'pointer';
		// });
	});
}

function compute_face_neighbors(mesh) {
	const face_list = mesh.face_list;
	const edge_to_faces = {};

	// Build edge-to-faces map
	face_list.forEach((face, face_index) => {
		const num_vertices = face.length;
		for (let i = 0; i < num_vertices; i++) {
			const v1 = face[i];
			const v2 = face[(i + 1) % num_vertices];
			const edge = [v1, v2].sort((a, b) => a - b).join(',');
			if (!(edge in edge_to_faces)) {
				edge_to_faces[edge] = new Set();
			}
			edge_to_faces[edge].add(face_index);
		}
	});

	// Initialize neighbor list
	const face_neighbors = Array.from({ length: face_list.length }, () => new Set());

	// Populate neighbors
	for (const edge in edge_to_faces) {
		const faces = Array.from(edge_to_faces[edge]);
		if (faces.length > 1) {
			for (const f1 of faces) {
				for (const f2 of faces) {
					if (f1 !== f2) {
						face_neighbors[f1].add(f2);
					}
				}
			}
		}
	}

	// Convert sets to sorted arrays
	return face_neighbors.map(neigh => Array.from(neigh).sort((a, b) => a - b));
}

function computeFaceNeighbors(face_list) {
	// Map vertex -> set of face indices containing it
	const vertexToFaces = new Map();

	face_list.forEach((faceVerts, faceIdx) => {
		faceVerts.forEach((v) => {
			if (!vertexToFaces.has(v)) vertexToFaces.set(v, new Set());
			vertexToFaces.get(v).add(faceIdx);
		});
	});

	const neighbors = {};

	face_list.forEach((faceVerts, faceIdx) => {
		const neighborSet = new Set();

		faceVerts.forEach((v) => {
			const facesWithV = vertexToFaces.get(v);
			facesWithV.forEach((neighborFaceIdx) => {
				if (neighborFaceIdx !== faceIdx) {
					neighborSet.add(neighborFaceIdx);
				}
			});
		});

		// Convert Set to sorted Array for consistency
		neighbors[faceIdx] = Array.from(neighborSet).sort((a, b) => a - b);
	});

	return neighbors;
}

function computeFaceNeighborsTwoOrMoreSharedVerts(face_list) {
	// Map vertex -> set of face indices containing it
	const vertexToFaces = new Map();

	face_list.forEach((faceVerts, faceIdx) => {
		faceVerts.forEach((v) => {
			if (!vertexToFaces.has(v)) vertexToFaces.set(v, new Set());
			vertexToFaces.get(v).add(faceIdx);
		});
	});

	const neighbors = {};

	face_list.forEach((faceVerts, faceIdx) => {
		// Count how many shared vertices each other face has with current face
		const sharedCount = new Map();

		faceVerts.forEach((v) => {
			const facesWithV = vertexToFaces.get(v);
			facesWithV.forEach((otherFaceIdx) => {
				if (otherFaceIdx !== faceIdx) {
					sharedCount.set(otherFaceIdx, (sharedCount.get(otherFaceIdx) || 0) + 1);
				}
			});
		});

		// Only keep faces with 2 or more shared vertices
		const neighborsList = [];
		for (const [otherFaceIdx, count] of sharedCount.entries()) {
			if (count >= 2) neighborsList.push(otherFaceIdx);
		}

		neighbors[faceIdx] = neighborsList.sort((a, b) => a - b);
	});

	return neighbors;
}

function createTessellationDivs(container, faces, vertices, options = {}) {
	const width = options.width || 600;
	const height = options.height || 600;
	const scaleX = options.scaleX || 1;
	const scaleY = options.scaleY || 1;
	const tileClass = options.tileClass || 'tessagon-tile';
	const tileStyle = options.tileStyle || {}; // Additional styles per tile

	container.style.position = 'relative';
	container.style.width = width + 'px';
	container.style.height = height + 'px';

	// Clear previous tiles
	container.innerHTML = '';

	console.log('faces', faces)
	faces.forEach((face, i) => {
		const div = document.createElement('div');
		div.className = tileClass;

		// Build polygon clip-path from face vertex indices
		const polygonPoints = face.map(idx => {
			const [x, y] = vertices[idx];
			// Scale and convert to percentage relative to container size
			const px = (x * scaleX / width) * 100;
			const py = (y * scaleY / height) * 100;
			return `${px}% ${py}%`;
		}).join(', ');
		console.log('polygonPoints', polygonPoints)

		div.style.position = 'absolute';
		div.style.top = '0';
		div.style.left = '0';
		div.style.width = '100%';
		div.style.height = '100%';
		div.style.clipPath = `polygon(${polygonPoints})`;

		// Optional styling
		div.style.backgroundColor = options.backgroundColor || `hsl(${(i * 30) % 360}, 60%, 70%)`;
		div.style.border = options.border || '1px solid #333';
		div.style.boxSizing = 'border-box';

		// Apply any extra styles
		Object.entries(tileStyle).forEach(([k, v]) => div.style[k] = v);

		container.appendChild(div);
	});
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

function generateListTessellation(cols = 10, rows = 10, name = 'HexTessagon') {
	let shapeFunc = getTessagonDict()[name]
	const options = {
		function: planeFunction,
		u_range: [0.0, 1.0],
		v_range: [0.0, 1.0],
		u_num: cols,
		v_num: rows,
		u_cyclic: false,
		v_cyclic: false,
		adaptor_class: ListAdaptor
	};

	const tessagon = new shapeFunc(options); //console.log(tessagon)
	const list = tessagon.create_mesh();
	return { tessagon, list };
}

function generateSvgTessellation(cols = 10, rows = 10, name = 'HexTessagon') {
	let shapeFunc = getTessagonDict()[name]; //console.log('shapeFunc', shapeFunc)
	const options = {
		function: planeFunction,
		u_range: [0.0, 1.0],
		v_range: [0.0, 1.0],
		u_num: cols,
		v_num: rows,
		u_cyclic: false,
		v_cyclic: false,
		adaptor_class: SvgAdaptor
	};

	const tessagon = new shapeFunc(options); //console.log(tessagon)
	const svg = tessagon.create_mesh();
	return { tessagon, svg };
}

function getPolyNeighbors(poly) {
	const neighbors = poly.getAttribute('data-neighbors').split(','); //console.log(neighbors);
	return neighbors.map(x => mBy(x));
}

function getTessagonDict() {
	return {
		BigHexTriTessagon: BigHexTriTessagon,
		BrickTessagon: BrickTessagon,
		CloverdaleTessagon: CloverdaleTessagon,
		DissectedHexQuadTessagon: DissectedHexQuadTessagon,
		DissectedHexTriTessagon: DissectedHexTriTessagon,
		DissectedSquareTessagon: DissectedSquareTessagon,
		DissectedTriangleTessagon: DissectedTriangleTessagon,
		DodecaTessagon: DodecaTessagon,
		DodecaTriTessagon: DodecaTriTessagon,
		FloretTessagon: FloretTessagon,
		HexBigTriTessagon: HexBigTriTessagon,
		HexSquareTriTessagon: HexSquareTriTessagon,
		HexTessagon: HexTessagon,
		HexTriTessagon: HexTriTessagon,
		IslamicHexStarsTessagon: IslamicHexStarsTessagon,
		IslamicStarsCrossesTessagon: IslamicStarsCrossesTessagon,
		OctoTessagon: OctoTessagon,
		PentaTessagon: PentaTessagon,
		Penta2Tessagon: Penta2Tessagon,
		PythagoreanTessagon: PythagoreanTessagon,
		RhombusTessagon: RhombusTessagon,
		SquareTessagon: SquareTessagon,
		SquareTriTessagon: SquareTriTessagon,
		SquareTri2Tessagon: SquareTri2Tessagon,
		StanleyParkTessagon: StanleyParkTessagon,
		TriTessagon: TriTessagon,
		ValemountTessagon: ValemountTessagon,
		WeaveTessagon: WeaveTessagon,
		ZigZagTessagon: ZigZagTessagon,
	};
}

function getTessagonList() {
	return [
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
}

function getPolygonCentersFromG(gElement) {
	// If input is a string, parse it to a DOM element
	if (typeof gElement === 'string') {
		const parser = new DOMParser();
		const doc = parser.parseFromString(`<svg>${gElement}</svg>`, 'image/svg+xml');
		gElement = doc.querySelector('g');
	}

	const polygons = gElement.querySelectorAll('polygon');
	const centers = [];

	polygons.forEach(polygon => {
		const pointsStr = polygon.getAttribute('points').trim();
		// Parse points into array of {x, y}
		const points = pointsStr.split(/\s+/).map(pair => {
			const [x, y] = pair.split(',').map(Number);
			return { x, y };
		});

		// Calculate centroid
		let area = 0;
		let cx = 0;
		let cy = 0;
		for (let i = 0; i < points.length; i++) {
			const { x: x0, y: y0 } = points[i];
			const { x: x1, y: y1 } = points[(i + 1) % points.length];
			const cross = x0 * y1 - x1 * y0;
			area += cross;
			cx += (x0 + x1) * cross;
			cy += (y0 + y1) * cross;
		}
		area /= 2;
		cx /= (6 * area);
		cy /= (6 * area);

		centers.push({ x: cx, y: cy });
	});

	return centers;
}

function gHighlight(poly, color = 'neon_yellow', mem = true) {
	if (mem) {
		let orig = mGetAttr(poly, 'orig');
		if (nundef(orig)) mSetAttr(poly, 'orig', mGetAttr(poly, 'fill'));
	}
	mSetAttr(poly, 'fill', colorFrom(color));
}

function gUnhighlight(poly, color = 'grey', mem = true) {
	mSetAttr(poly, 'fill', mem ? mGetAttr(poly, 'orig') : color);
}

function mButtonList(dParent, di) {
	dParent = toElem(dParent);
	// Create a container div for centering and stretching
	const container = document.createElement('div');
	container.style.display = 'flex';
	container.style.flexDirection = 'column';
	container.style.alignItems = 'center';
	container.style.width = '100%';
	for (const key in di) {
		const btn = document.createElement('button');
		btn.textContent = key;
		btn.style.margin = '5px';
		btn.style.alignSelf = 'stretch'; // Stretch button to container width
		btn.onclick = () => di[key]();
		container.appendChild(btn);
	}
	dParent.appendChild(container);
}

function mGetAttr(elem, prop) { return elem.getAttribute(prop); }

function mSetAttr(elem, prop, val) { elem.setAttribute(prop, val); }

function mShortestPath(elem1, elem2) {
	//elems must have id and data-neighbors='id1,id2,...'
	//console.log(elem1.id,'=>',elem2.id);
	if (elem1 === elem2) return [elem1];

	const queue = [elem1];
	const visited = new Set([elem1]);
	const parentMap = new Map();

	while (queue.length > 0) {
		const current = queue.shift();

		const nbrs = getPolyNeighbors(current) || [];
		for (const nbr of nbrs) {
			if (!visited.has(nbr)) {
				visited.add(nbr);
				parentMap.set(nbr, current);
				if (nbr === elem2) {
					const path = [];
					let f = elem2;
					while (f !== undefined) {
						path.push(f);
						f = parentMap.get(f);
					}
					return path.reverse();
				}
				queue.push(nbr);
			}
		}
	}

	// No path found
	return null;
}

function mStyle(elem, styles = {}, opts = {}) {
	elem = toElem(elem);
	let styles1 = mStyles(styles); //console.log(styles1)
	for (const key in styles1) {
		elem.style.setProperty(key, styles1[key]);
	}
	// applyOpts(elem, opts);
}

function mStyles(styles) {
	let res = {};
	for (const k in styles) {
		let key = k, val = styles[k];
		//console.log(key, val);
		if (k in STYLES) {
			let dival = STYLES[k];
			//console.log('dival', dival);
			if (typeof dival == 'function') {
				val = dival(val, styles.bg);
				if (isList(val)) [key, val] = val;
			}
			else if (isList(dival)) {
				[key, val] = dival;
				// assertion(false,'THE END')
			} else if (isString(dival)) key = dival;
			else val = dival;
		}
		// let noUnit = ['opacity', 'flex', 'grow', 'shrink', 'grid', 'z', 'iteration', 'count', 'orphans', 'widows', 'weight', 'order', 'index'];
		let val1 = isNumber(val) && !NO_UNIT_STYLES.some(x => key.startsWith(x)) || key == 'fz' ? '' + Number(val) + 'px' : val;

		res[key] = val1;
	}
	return res;
}

function onclickPoly(ev) {
	console.log('Polygon clicked:', ev.target);
	ev.target.style.fill = rColor();
}

function onclickPolyShortestPath(ev) {
	let poly = ev.target; //console.log('poly', poly)
	if (DA.firstSelected === null) {
		DA.firstSelected = poly;
		gHighlight(poly);
	} else if (DA.pathHighlighted === null) {
		const path = mShortestPath(DA.firstSelected, poly);
		console.log('path', path);
		if (path) {
			DA.pathHighlighted = path;
			for (const poly of path) { gHighlight(poly); }
		} else {
			console.log('No path found');
		}
	} else {
		for (const poly of DA.pathHighlighted) gUnhighlight(poly);
		DA.firstSelected = null;
		DA.pathHighlighted = null;
	}
	//console.log('first',DA.firstSelected,'path',DA.pathHighlighted)
}

function onclickTessName(ev) {
	let name = ev.target.innerHTML; showTessJs(name)
}

function onenterPoly(ev) {
	console.log('Polygon enter:', ev.target);
	ev.target.style.fill = rColor();
}

function onleavePoly(ev) {
	console.log('Polygon leave:', ev.target);
	ev.target.style.fill = rColor();
}

function planeFunction(u, v) {
	return [u, v, 0]; // flat 2D plane
}

function precomputePolygonNeighbors(groupElement) {
	if (!groupElement || !(groupElement instanceof SVGGElement)) {
		console.error("Invalid group element.");
		return;
	}

	const polygons = Array.from(groupElement.querySelectorAll('polygon'));

	// Ensure each polygon has an ID
	polygons.forEach((polygon, i) => {
		if (!polygon.id) {
			polygon.id = `poly-${i}`;
		}
	});

	// Helper to parse points into Set of strings "x,y"
	function getPointSet(polygon) {
		return new Set(
			polygon.getAttribute('points')
				.trim()
				.split(/\s+/)
				.map(p => p.trim())
		);
	}

	// Map polygon ID to its point set
	const pointSets = new Map();
	polygons.forEach(p => {
		pointSets.set(p.id, getPointSet(p));
	});

	// Compute neighbors by comparing shared points
	polygons.forEach(p1 => {
		const id1 = p1.id;
		const set1 = pointSets.get(id1);
		const neighbors = [];

		polygons.forEach(p2 => {
			const id2 = p2.id;
			if (id1 === id2) return;

			const set2 = pointSets.get(id2);
			const shared = [...set1].filter(point => set2.has(point));
			if (shared.length >= 2) {
				neighbors.push(id2);
			}
		});

		p1.dataset.neighbors = neighbors.join(',');
	});
}

function precomputePolygonNeighborsFromSvg(groupElement) {
	if (!groupElement || !(groupElement instanceof SVGGElement)) {
		console.error("Invalid group element.");
		return;
	}

	const polygons = Array.from(groupElement.querySelectorAll('polygon'));

	let nei = {};
	// Ensure each polygon has an ID
	polygons.forEach((polygon, i) => {
		if (!polygon.id) {
			polygon.id = `poly-${i}`;
			nei[i] = [];
		}
	});

	// Helper to parse points into Set of strings "x,y"
	function getPointSet(polygon) {
		return new Set(
			polygon.getAttribute('points')
				.trim()
				.split(/\s+/)
				.map(p => p.trim())
		);
	}

	// Map polygon ID to its point set
	const pointSets = new Map();
	polygons.forEach(p => {
		pointSets.set(p.id, getPointSet(p));
	});

	// Compute neighbors by comparing shared points
	polygons.forEach(p1 => {
		const id1 = p1.id;
		const set1 = pointSets.get(id1);
		const neighbors = [];

		polygons.forEach(p2 => {
			const id2 = p2.id;
			if (id1 === id2) return;

			const set2 = pointSets.get(id2);
			const shared = [...set1].filter(point => set2.has(point));
			if (shared.length >= 2) {
				neighbors.push(id2);
			}
		});
		let i = Number(id1.split('-')[1]);
		nei[i] = neighbors.map(x => Number(x.split('-')[1]));
		p1.dataset.neighbors = neighbors.join(',');
	});
	return nei;
}

function quickUi(dParent) {
	dParent = toElem(dParent);
	let html = `
    <div>
      <h1>Game Interface</h1>

      <section>
        <h2>Start a Game</h2>
        <label for="gameSelect">Game:</label>
        <select id="gameSelect"></select>
        <button id="startGameBtn">Start</button>
      </section>

      <section>
        <h2>Make a Move</h2>
        <label for="gameIdInput">Game ID:</label>
        <input type="text" id="gameIdInput" placeholder="Enter game ID" />
        <label for="moveInput">Move (JSON):</label>
        <input type="text" id="moveInput" value='{"row":0,"col":1}' />
        <button id="makeMoveBtn">Submit Move</button>
      </section>

      <section>
        <h2>Game State</h2>
        <label for="stateGameId">Game ID:</label>
        <input type="text" id="stateGameId" />
        <button id="fetchStateBtn">Get State</button>
        <pre id="gameState"></pre>
      </section>

      <section>
        <h2>Global Chat</h2>
        <div id="chatBox" style="border:1px solid #ccc; height:150px; overflow-y:scroll; padding:5px;"></div>
        <input type="text" id="chatInput" placeholder="Say something..." />
        <button id="sendChatBtn">Send</button>
      </section>
    </div>
    `;
	dParent.innerHTML = html;
}

function showChatMessage(data) {
	var chatBox = document.getElementById("chatBox");
	var newMessage = document.createElement("div");
	newMessage.textContent = data.username + ": " + data.message;
	chatBox.appendChild(newMessage);
	chatBox.scrollTop = chatBox.scrollHeight;
}

function showGamesList(games) {
	console.log("Games list:", games);
	let dsel = mDom('dMain', {}, { tag: 'select' })
	const sel = document.getElementById("gameSelect");
	sel.innerHTML = "";
	console.log('games', games)
	games.forEach(g => {
		const opt = document.createElement("option");
		opt.value = g;
		opt.textContent = g;
		sel.appendChild(opt);
	});
	if (games.length > 0) {
		sel.value = arrLast(games);
	}
}

function showSvg(dParent, gCode) {
	dParent = toElem(dParent);
	mClear(dParent);
	let html = `
        <svg id="svg2" width="800" height="500" viewBox="-0.1 -0.1 1.2 1.2" xmlns="http://www.w3.org/2000/svg" stroke="orange"
            fill="gold" stroke-width="0.005">
            ${gCode}
        </svg>
        `;
	dParent.innerHTML = html;
}

async function showTessellation(ev) {
	let name = ev.target.innerHTML;
	const response = await fetch(`http://localhost:5000/tesvg?u=${2}&v=${2}&shape=${name}`);
	//console.log(response)
	const res = await response.text();
	console.log(res)
	//let o = JSON.parse(res);
	mClear('dMain')
	let d = mBy('dMain');
	let html = `
        <svg id="svg2" width="500" height="500" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg" stroke="black"
            fill="lightblue" stroke-width="0.005">
            ${res}
        </svg>
        `;
	d.innerHTML = html;

	// mBy(svg2).innerHTML = res;
	// createTessellationDivs(d, o.face_list, o.vert_list);
	const gElement = document.querySelector('g');
	precomputePolygonNeighbors(gElement);
	addPolygonNeighborClick(gElement);
	// addPolygonEvents(gElement, onclickPoly, onenterPoly, onleavePoly);
}

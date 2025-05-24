
function precomputePolygonNeighborsFromSvg(groupElement) {
	if (!groupElement || !(groupElement instanceof SVGGElement)) {
		console.error("Invalid group element.");
		return;
	}

	const polygons = Array.from(groupElement.querySelectorAll('polygon'));

	let nei={};
	// Ensure each polygon has an ID
	polygons.forEach((polygon, i) => {
		if (!polygon.id) {
			polygon.id = `poly-${i}`;
			nei[i]=[];
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
		let i=Number(id1.split('-')[1]); 
		nei[i]=neighbors.map(x=>Number(x.split('-')[1]));
		p1.dataset.neighbors = neighbors.join(',');
	});
	return nei;
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
function onclickPoly(ev) {
	console.log('Polygon clicked:', ev.target);
	ev.target.style.fill = rColor();
}
function onenterPoly(ev) {
	console.log('Polygon enter:', ev.target);
	ev.target.style.fill = rColor();
}
function onleavePoly(ev) {
	console.log('Polygon leave:', ev.target);
	ev.target.style.fill = rColor();
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



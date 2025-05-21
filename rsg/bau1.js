


async function showTessellation(ev) {
	let name = ev.target.innerHTML;
	const response = await fetch(`http://localhost:5000/teslist?u=${2}&v=${2}&shape=${name}`);
	//console.log(response)
	const res = await response.text();
	console.log(res)
	let o = JSON.parse(res);

	let d = mBy('dMain');
	createTessellationDivs(d, o.face_list, o.vert_list);

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



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

function setup_face_hover_highlight(svg, mesh) {
  const face_neighbors = compute_face_neighbors(mesh);console.log(face_neighbors)

  // Map face index to SVG element
  const face_elements = Array.from(svg.querySelectorAll('polygon'));
  const face_map = {};
  face_elements.forEach(el => {
    const index = parseInt(el.dataset.faceIndex, 10);
    face_map[index] = el;
  });

  function highlight_neighbors(face_index) {
    const neighbors = face_neighbors[face_index];
    neighbors.forEach(i => {
      if (face_map[i]) {
        face_map[i].classList.add('highlight');
      }
    });
  }

  function unhighlight_neighbors() {
    face_elements.forEach(el => el.classList.remove('highlight'));
  }

  // Attach hover listeners
  face_elements.forEach(el => {
    const index = parseInt(el.dataset.faceIndex, 10);
    el.addEventListener('mouseenter', () => highlight_neighbors(index));
    el.addEventListener('mouseleave', unhighlight_neighbors);
  });
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

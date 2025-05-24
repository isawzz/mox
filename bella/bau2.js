
function shortestFacePath(neighbors, face1, face2) {
  if (face1 === face2) return [face1];

  const queue = [face1];
  const visited = new Set([face1]);
  // To reconstruct path: child face → parent face
  const parentMap = new Map();

  while (queue.length > 0) {
    const current = queue.shift();

    const nbrs = neighbors[current] || [];
    for (const nbr of nbrs) {
      if (!visited.has(nbr)) {
        visited.add(nbr);
        parentMap.set(nbr, current);
        if (nbr === face2) {
          // reconstruct path from face2 to face1
          const path = [];
          let f = face2;
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


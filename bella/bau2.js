
function getPolyNeighbors(poly){
  const neighbors = poly.getAttribute('data-neighbors').split(','); //console.log(neighbors);
  return neighbors.map(x=>mBy(x));

}
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



function createSquareGrid(dParent, rows = 5, cols = 5, sz = 50, gap = 1) {
  const container = toElem(dParent);
  container.innerHTML = '';
  container.style.position = 'relative';
  container.style.width = `${cols * (sz + gap)}px`;
  container.style.height = `${rows * (sz + gap)}px`;

  const tiles = {}; // id → tile

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const div = document.createElement('div');
      div.className = 'tile';
      div.style.position = 'absolute';
      div.style.width = `${sz}px`;
      div.style.height = `${sz}px`;
      div.style.left = `${c * (sz + gap)}px`;
      div.style.top = `${r * (sz + gap)}px`;

      const id = `r${r}_c${c}`;
      const tile = { id, r, c, x: c * (sz + gap), y: r * (sz + gap), div, N: null, E: null, S: null, W: null };
      tiles[id] = tile;

      container.appendChild(div);
    }
  }

  // Link neighbors
  for (const id in tiles) {
    const t = tiles[id];
    t.N = tiles[`r${t.r - 1}_c${t.c}`] || null;
    t.S = tiles[`r${t.r + 1}_c${t.c}`] || null;
    t.E = tiles[`r${t.r}_c${t.c + 1}`] || null;
    t.W = tiles[`r${t.r}_c${t.c - 1}`] || null;
  }

  return tiles;
}



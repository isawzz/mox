
function generateRandomTilingWithNCorners({
  width,
  height,
  rows,
  cols,
  jitter = 0.4,
  corners = 5,
}) {
  const points = [];
  const tiles = [];
  const dx = width / (cols - 1);
  const dy = height / (rows - 1);

  // Step 1: create jittered points on a grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * dx + (Math.random() - 0.5) * dx * jitter;
      const y = row * dy + (Math.random() - 0.5) * dy * jitter;
      points.push({ x, y, row, col });
    }
  }

  function pointAt(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return null;
    return points[r * cols + c];
  }

  // Step 2: build tiles around internal points
  for (let row = 1; row < rows - 1; row++) {
    for (let col = 1; col < cols - 1; col++) {
      const center = pointAt(row, col);
      const neighbors = [];

      // Collect 8 surrounding points (Moore neighborhood)
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const pt = pointAt(row + dr, col + dc);
          if (pt) neighbors.push(pt);
        }
      }

      // Sort neighbors by angle around the center
      neighbors.sort((a, b) => {
        const angleA = Math.atan2(a.y - center.y, a.x - center.x);
        const angleB = Math.atan2(b.y - center.y, b.x - center.x);
        return angleA - angleB;
      });

      // Pick N nearest angular neighbors
      const selected = neighbors.slice(0, corners - 1); // center + (N-1) = N
      const polygon = [center, ...selected];

      tiles.push(polygon);
    }
  }

  return { points, tiles };
}


function generateRandomTiling({
  width,
  height,
  rows,
  cols,
  jitter = 0.4
}) {
  const points = [];
  const tiles = [];
  const dx = width / (cols - 1);
  const dy = height / (rows - 1);

  // Step 1: generate jittered grid of points
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * dx + (Math.random() - 0.5) * dx * jitter;
      const y = row * dy + (Math.random() - 0.5) * dy * jitter;
      points.push({ x, y, row, col });
    }
  }

  // Helper to get point at (r, c)
  function pointAt(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return null;
    return points[r * cols + c];
  }

  // Step 2: generate tiles (faces) from 4 neighboring points
  for (let row = 0; row < rows - 1; row++) {
    for (let col = 0; col < cols - 1; col++) {
      const p1 = pointAt(row, col);
      const p2 = pointAt(row, col + 1);
      const p3 = pointAt(row + 1, col + 1);
      const p4 = pointAt(row + 1, col);

      // Create a polygon (quad) face
      tiles.push([p1, p2, p3, p4]);
    }
  }

  return { points, tiles };
}

function cairoTiling(container, rows, cols, w = 100, h = 100) {
  container.style.position = 'relative';
  container.innerHTML = '';

  for (let r = 0; r < rows; r++) {
    const y = r * h; // r * (h * 0.85); // slight vertical overlap
    const xOffset = (r % 2) * (w / 2);

    for (let c = 0; c < cols; c++) {
      const x = c * w + xOffset;
      const flip = (r + c) % 2 === 1;
      drawCairoTile(container, x, y, w, h, flip, '#ccc');
    }
  }
}

function drawCairoTile(parent, x, y, w, h, flip = false, color = 'black') {
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.width = `${w}px`;
  div.style.height = `${h}px`;
  div.style.left = `${x}px`;
  div.style.top = `${y}px`;
  div.style.backgroundColor = color;
  div.style.clipPath = getCairoPentagonClipPath();
  if (flip) div.style.transform = 'scaleX(-1)';

  parent.appendChild(div);
  return div;
}

function getCairoPentagonClipPath() {
  // % coordinates based on bounding box (w x h)
  return 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
}

function drawPentagonAtCenter(parent, center, w, h, color = 'black') {
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.width = `${w}px`;
  div.style.height = `${h}px`;
  div.style.left = `${center.x - w / 2}px`;
  div.style.top = `${center.y - h / 2}px`;
  div.style.backgroundColor = color;
  div.style.clipPath = generatePentagonClipPath();

  parent.appendChild(div);
  return div;
}

function generatePentagonClipPath() {
  const points = [];
  const cx = 50, cy = 50;
  const r = 50;
  const angleOffset = -90; // start with top point

  for (let i = 0; i < 5; i++) {
    const angleDeg = angleOffset + i * 72;
    const angleRad = (angleDeg * Math.PI) / 180;
    const x = cx + r * Math.cos(angleRad);
    const y = cy + r * Math.sin(angleRad);
    points.push(`${x}% ${y}%`);
  }

  return `polygon(${points.join(', ')})`;
}

function pentagonTessellationCenters(rows, cols, w, h) {
  const centers = [];

  for (let r = 0; r < rows; r++) {
    const y = r * h;
    const xOffset = (r % 2) * (w / 2); // staggered rows

    for (let c = 0; c < cols; c++) {
      const x = c * w + xOffset;
      centers.push({ x, y });
    }
  }

  return centers;
}
function _drawPentagonAtCenter(parent, center, w, h, color = 'black') {
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.width = `${w}px`;
  div.style.height = `${h}px`;
  div.style.left = `${center.x - w / 2}px`;
  div.style.top = `${center.y - h / 2}px`;
  div.style.backgroundColor = color;

  // A "house"-shaped pentagon
  div.style.clipPath = 'polygon(50% 0%, 100% 30%, 70% 100%, 30% 100%, 0% 30%)';

  parent.appendChild(div);
  return div;
}




function circleCenters(rows, cols, wCell, hCell) {
  let [w, h] = [cols * wCell, rows * hCell];
  let cx = w / 2;
  let cy = h / 2;
  let centers = [{ x: cx, y: cy }];
  let rx = cx + wCell / 2; let dradx = rx / wCell;
  let ry = cy + hCell / 2; let drady = ry / hCell;
  let nSchichten = Math.floor(Math.min(dradx, drady));
  for (let i = 1; i < nSchichten; i++) {
    let [newCenters, wsch, hsch] = oneCircleCenters(i * 2 + 1, i * 2 + 1, wCell, hCell);
    for (const nc of newCenters) {
      centers.push({ x: nc.x + cx - wsch / 2, y: nc.y + cy - hsch / 2 });
    }
  }
  return [centers, wCell * cols, hCell * rows];
}
function getCenters(layout, rows, cols, wCell, hCell,) {
  if (layout == 'quad') { return quadCenters(rows, cols, wCell, hCell); }
  else if (layout == 'hex') { return hexCenters(rows, cols, wCell, hCell); }
  else if (layout == 'hex1') { info = hex1Centers(rows, cols, wCell, hCell); }
  else if (layout == 'circle') { return circleCenters(rows, cols, wCell, hCell); }
}
function getCentersFromAreaSize(layout, wBoard, hBoard, wCell, hCell) {
  let info;
  let [rows, cols] = [Math.ceil(wBoard / wCell), Math.ceil(hBoard / hCell)]
  if (layout == 'quad') { info = quadCenters(rows, cols, wCell, hCell); }
  else if (layout == 'hex') { info = hexCenters(rows, cols, wCell, hCell); }
  else if (layout == 'hex1') { info = hex1Centers(rows, cols, wCell, hCell); }
  else if (layout == 'circle') { info = circleCenters(rows, cols, wCell, hCell); }
  return info;
}
function getCentersFromRowsCols(layout, rows, cols, wCell, hCell) {
  let info;
  if (layout == 'quad') { info = quadCenters(rows, cols, wCell, hCell); }
  else if (layout == 'hex') { info = hexCenters(rows, cols, wCell, hCell); }
  else if (layout == 'hex1') { info = hex1Centers(rows, cols, wCell, hCell); }
  else if (layout == 'circle') { info = circleCenters(rows, cols, wCell, hCell); }
  return info;
}
function quadCenters(rows, cols, wCell, hCell) {
  let offX = wCell / 2, offY = hCell / 2;
  let centers = [];
  let x = 0; y = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let center = { x: x + offX, y: y + offY };
      centers.push(center);
      x += wCell;
    }
    y += hCell; x = 0;
  }
  return [centers, wCell * cols, hCell * rows];
}
function hexCenters(rows, cols, wCell = 100, hCell) {
  if (nundef(hCell)) hCell = (hCell / .866);
  let hline = hCell * .75;
  let offX = wCell / 2, offY = hCell / 2;
  let centers = [];
  let startSmaller = Math.floor(rows / 2) % 2 == 1;
  let x = 0; y = 0;
  for (let r = 0; r < rows; r++) {
    let isSmaller = startSmaller && r % 2 == 0 || !startSmaller && r % 2 == 1;
    let curCols = isSmaller ? cols - 1 : cols;
    let dx = isSmaller ? wCell / 2 : 0;
    dx += offX;
    for (let c = 0; c < curCols; c++) {
      let center = { x: dx + c * wCell, y: offY + r * hline };
      centers.push(center);
    }
  }
  return [centers, wCell * cols, hCell / 4 + rows * hline];
}
function hex1Centers(rows, cols, wCell = 100, hCell = null) {
  let colarr = _calc_hex_col_array(rows, cols);
  let maxcols = arrMax(colarr);
  if (nundef(hCell)) hCell = (hCell / .866);
  let hline = hCell * .75;
  let offX = wCell / 2, offY = hCell / 2;
  let centers = [];
  let x = 0; y = 0;
  for (let r = 0; r < colarr.length; r++) {
    let n = colarr[r];
    for (let c = 0; c < n; c++) {
      let dx = (maxcols - n) * wCell / 2;
      let dy = r * hline;
      let center = { x: dx + c * wCell + offX, y: dy + offY };
      centers.push(center);
    }
  }
  return [centers, wCell * maxcols, hCell / 4 + rows * hline];
}
function _calc_hex_col_array(rows, cols) {
  let colarr = [];
  let even = rows % 2 == 0;
  for (let i = 0; i < rows; i++) {
    colarr[i] = cols;
    if (even && i < (rows / 2) - 1) cols += 1;
    else if (even && i > rows / 2) cols -= 1;
    else if (!even && i < (rows - 1) / 2) cols += 1;
    else if (!even || i >= (rows - 1) / 2) cols -= 1;
  }
  return colarr;
}
function getTriangleDownPoly(x, y, w, h) {
  let tridown = [[-0.5, 0.5], [0.5, 0.5], [-0.5, 0.5]];
  return getPoly(tridown, x, y, w, h);
}
function getTriangleUpPoly(x, y, w, h) {
  let triup = [[0, -0.5], [0.5, 0.5], [-0.5, 0.5]];
  return getPoly(triup, x, y, w, h);
}
function mShapeR(shape = 'hex', dParent = null, styles = {}, pos, classes) {
  let x;
  let bg = isdef(styles.bg) ? computeColorX(styles.bg) : 'conic-gradient(green,pink,green)';
  let sz = isdef(styles.sz) ? styles.sz : isdef(styles.w) ? styles.w : isdef(styles.h) ? styles.h : null;
  if (isdef(PolyClips[shape])) {
    sz = valf(sz, 80);
    let html = `<div style=
    "--b:${bg};
    --clip:${PolyClips[shape]};
    --patop:100%;
    --w:${sz}px;
    "></div>`;
    x = createElementFromHtml(html);
  } else {
    x = mShape(shape, dParent, styles, pos, classes);
    return x;
  }
  if (sz) {
    bvar = sz > 120 ? 8 : sz > 80 ? 5 : sz > 50 ? 3 : 1;
    mClass(x, "weired" + bvar);
    mStyle(x, { w: sz });
  }
  if (isdef(dParent)) mAppend(dParent, x);
  if (isdef(classes)) mClass(x, classes);
  if (isdef(pos)) { mPlace(x, pos); }
  return x;
}

function triangleTessellationCenters(rows, cols, w, h) {
  const centers = [];

  for (let r = 0; r < rows; r++) {
    const baseY = r * h;
    let x = 0;
    for (let c = 0; c < cols; c++) {
      const isUp = (r + c) % 2 === 0;
      const y = baseY; // + (isUp ? h / 3 : (2 * h) / 3);

      centers.push({ x, y, up: isUp });
      x = x + w / 2;//*2/3; //c * w * 2/3;// + ((r % 2) * w) / 2;
    }
  }

  return centers;
}
function drawTriangleAtCenter(parent, center, w, h, pointingUp = true, color = 'black') {
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.width = `${w}px`;
  div.style.height = `${h}px`;
  div.style.left = `${center.x - w / 2}px`;
  div.style.top = `${center.y - h / 2}px`;
  div.style.backgroundColor = color;

  div.style.clipPath = pointingUp
    ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
    : 'polygon(0% 0%, 100% 0%, 50% 100%)';

  parent.appendChild(div);
  return div;
}



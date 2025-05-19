
function createHexShapedGrid(containerId, rows = 5, maxCols = 5, sz = 50, gap = 1) {
  if (rows % 2 === 0) {
    console.error("Number of rows must be odd for a symmetrical hexagon grid.");
    return;
  }

  const container = toElem(containerId);
  //const frag=document.createDocumentFragment();
  container.innerHTML = '';

  const hexWidth = sz * 2;
  const hexHeight = hexWidth; //Math.sqrt(3) * sideLength;
  const vertSpacing = hexHeight * 0.75;

  const midRow = Math.floor(rows / 2);
  const tiles = {}; // id -> tile object
  let [w, h] = [hexWidth - gap, hexHeight - gap];

  for (let r = 0; r < rows; r++) {
    const offsetFromMiddle = Math.abs(midRow - r);
    const cols = maxCols - offsetFromMiddle;
    const totalRowOffset = ((maxCols - cols) / 2) * hexWidth;
    const horizontalOffset = (r % 2 === 1) ? hexWidth / 2 : 0;
    const y = r * vertSpacing;
    for (let i = 0; i < cols; i++) {
      const x = i * hexWidth + totalRowOffset;// + horizontalOffset;
      const c = Math.round(x / (hexWidth / 2)); // GLOBAL COLUMN INDEX
      const id = `r${r}_c${c}`;

      let div = mDom(container, { className: 'hex', left: x, top: y, w, h }, { id })
      const tile = { id, div, x, y, sz, c, r, NE: null, E: null, SE: null, SW: null, W: null, NW: null };

      tiles[id] = tile;
    }

  }

  // After all tiles are created, link neighbors
  for (const id in tiles) {
    const tile = tiles[id];
    let [r, c] = [tile.r, tile.c];

    function getTile(rr, cc) { return tiles[`r${rr}_c${cc}`] || null; }
    //   if (isdef(tiles[`r${rr}_c${cc}`])) return `r${rr}_c${cc}`; //tileMap[`r${rr}_c${cc}`];
    //   else return null;
    // }

    // Neighbor lookup varies by row parity
    tile.E = getTile(r, c + 2);
    tile.W = getTile(r, c - 2);
    tile.NE = getTile(r - 1, c + 1);
    tile.NW = getTile(r - 1, c - 1);
    tile.SE = getTile(r + 1, c + 1);
    tile.SW = getTile(r + 1, c - 1);

  }

  // container.style.height = `${rows * vertSpacing + hexHeight * 0.25}px`;
  let hGrid = rows * vertSpacing + hexHeight * 0.25;
  let wGrid = maxCols * hexWidth;
  //console.log(w, h)
  mStyle(container, { w: wGrid, h: hGrid }); //,bg:'skyblue'})
  //container.appendChild(frag);

  return tiles;
}
function createHexShapedGridX(containerId, rows = 5, maxCols = 5, sz = 50, gap = 1) {
  if (rows % 2 === 0) {
    console.error("Number of rows must be odd for a symmetrical hexagon grid.");
    return;
  }

  const container = toElem(containerId);
  //const frag=document.createDocumentFragment();
  container.innerHTML = '';

  const hexWidth = sz * 2;
  const hexHeight = hexWidth; //Math.sqrt(3) * sideLength;
  const vertSpacing = hexHeight * 0.75;

  const midRow = Math.floor(rows / 2);
  const tiles = {}; // id -> tile object
  let [w, h] = [hexWidth - gap, hexHeight - gap];

  for (let r = 0; r < rows; r++) {
    const offsetFromMiddle = Math.abs(midRow - r);
    const cols = maxCols - offsetFromMiddle;
    const totalRowOffset = ((maxCols - cols) / 2) * hexWidth;
    const horizontalOffset = (r % 2 === 1) ? hexWidth / 2 : 0;
    const y = r * vertSpacing;
    for (let i = 0; i < cols; i++) {
      const x = i * hexWidth + totalRowOffset;// + horizontalOffset;
      const c = Math.round(x / (hexWidth / 2)); // GLOBAL COLUMN INDEX
      const id = `r${r}_c${c}`;

      let div = mDom(container, { className: 'hex', left: x, top: y, w, h }, { id })
      const tile = { id, div, x, y, sz, c, r, NE: null, E: null, SE: null, SW: null, W: null, NW: null };

      tiles[id] = tile;
    }

  }

  // After all tiles are created, link neighbors
  for (const id in tiles) {
    const tile = tiles[id];
    let [r, c] = [tile.r, tile.c];

    function getTile(rr, cc) { return tiles[`r${rr}_c${cc}`] || null; }
    //   if (isdef(tiles[`r${rr}_c${cc}`])) return `r${rr}_c${cc}`; //tileMap[`r${rr}_c${cc}`];
    //   else return null;
    // }

    // Neighbor lookup varies by row parity
    tile.E = getTile(r, c + 2);
    tile.W = getTile(r, c - 2);
    tile.NE = getTile(r - 1, c + 1);
    tile.NW = getTile(r - 1, c - 1);
    tile.SE = getTile(r + 1, c + 1);
    tile.SW = getTile(r + 1, c - 1);

  }

  // container.style.height = `${rows * vertSpacing + hexHeight * 0.25}px`;
  let hGrid = rows * vertSpacing + hexHeight * 0.25;
  let wGrid = maxCols * hexWidth;
  console.log(w, h)
  mStyle(container, { w: wGrid, h: hGrid }); //,bg:'skyblue'})
  //container.appendChild(frag);

  return tiles;
}

function mGrid(rows, cols, dParent, styles = {}, opts = {}) {
  [rows, cols] = [Math.ceil(rows), Math.ceil(cols)]
  addKeys({ display: 'inline-grid', gridCols: 'repeat(' + cols + ',1fr)' }, styles);
  if (rows) styles.gridRows = 'repeat(' + rows + ',auto)';
  else styles.overy = 'auto';
  let d = mDom(dParent, styles, opts);
  return d;
}

function arrFlatten(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      res.push(arr[i][j]);
    }
  }
  return res;
}

function createHexShapedGridOptimized(containerId, rows = 5, maxCols = 5, sz = 50, gap = 1) {
  // Input validation
  if (rows <= 0 || maxCols <= 0 || sz <= 0 || gap < 0) {
    console.error("Invalid input parameters: rows, maxCols, and sz must be positive, gap must be non-negative.");
    return null;
  }
  if (rows % 2 === 0) {
    console.error("Number of rows must be odd for a symmetrical hexagon grid.");
    return null;
  }

  // Get the container element
  // Assume toElem is a function that gets an element by id, or use standard method
  const container = typeof toElem !== 'undefined' ? toElem(containerId) : document.getElementById(containerId);
  if (!container) {
    console.error(`Container element with id "${containerId}" not found.`);
    return null;
  }

  container.innerHTML = ''; // Clear previous content

  // Calculate key dimensions of the hexagon and grid layout
  const hexWidth = sz * 2;
  // Assuming hexHeight is based on hexWidth for layout as in original code.
  // A more geometrically accurate height would be Math.sqrt(3) * sz.
  const hexHeight = hexWidth;
  const vertSpacing = hexHeight * 0.75; // Vertical distance between centers of hexes in adjacent rows

  const midRow = Math.floor(rows / 2); // Index of the middle row

  // Determine the necessary width of the 2D array.
  // The column index 'c' is calculated based on horizontal position, where a step of hexWidth/2 corresponds to a change of 1 in 'c'.
  // The maximum 'c' value occurs in the middle row at the rightmost hex: round(((maxCols - 1) * hexWidth) / (hexWidth / 2)) = 2 * (maxCols - 1).
  // The minimum 'c' value occurs in the middle row at the leftmost hex: round(0 / (hexWidth / 2)) = 0.
  // For other rows, the column indices will be offset but still within a predictable range.
  // A safe width for the 2D array to hold all possible 'c' indices is 2 * maxCols.
  const gridWidth = 2 * maxCols; // Sufficient width to cover all relevant 'c' indices

  // Create the 2D array to store tile objects
  const grid = [];

  // Variables to track the extent of the placed tiles for container sizing
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;


  // First pass: Create tiles and populate the 2D array
  for (let r = 0; r < rows; r++) {
    // Initialize each row as an array filled with nulls.
    // The size is gridWidth to accommodate all possible 'c' values for this grid configuration.
    grid[r] = new Array(gridWidth).fill(null);

    const offsetFromMiddle = Math.abs(midRow - r); // Distance of the current row from the middle row
    const cols = maxCols - offsetFromMiddle; // Number of columns in the current row
    // The horizontal offset for the start of the current row to maintain the hexagonal shape.
    // This offset is applied to the starting x position (when i=0).
    const totalRowOffset = ((maxCols - cols) / 2) * hexWidth;

    for (let i = 0; i < cols; i++) {
      // Calculate the top-left position for rendering the hex div (assuming origin is top-left based on original code).
      const x = i * hexWidth + totalRowOffset;
      const y = r * vertSpacing;

      // Calculate the offset column index 'c' for the 2D array.
      // This index uniquely identifies the hex's horizontal position in the offset coordinate system.
      const c = Math.round(x / (hexWidth / 2));

      // Update min/max position for container sizing.
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);


      // Check if the calculated column index is within the bounds of our 2D array's width.
      // This check is a safeguard and helps verify the gridWidth calculation.
      if (c >= 0 && c < gridWidth) {
        // Create the tile object
        const tile = {
          r: r, // Row index in the 2D array
          c: c, // Column index in the 2D array (offset coordinate)
          x: x, // X position for rendering (based on original code)
          y: y, // Y position for rendering (based on original code)
          sz: sz, // Size parameter
          // Neighbor references will be set in the second pass
          NE: null,
          E: null,
          SE: null,
          SW: null,
          W: null,
          NW: null,
          div: null // Reference to the created DOM element
        };

        // Create the DOM element for the hex
        const tileId = `hex_${r}_${c}`;
        const tileW = hexWidth - gap;
        const tileH = hexHeight - gap;

        // Use provided mDom function or fallback to standard createElement
        // Positioning based on the calculated x, y which is assumed to be top-left for the div.
        let div = typeof mDom !== 'undefined' ? mDom(container, { className: 'hex', left: x, top: y, w: tileW, h: tileH }, { id: tileId }) : null;

        if (div) {
          tile.div = div;
        } else {
          // Fallback if mDom is not available: create and style manually
          div = document.createElement('div');
          div.id = tileId;
          div.className = 'hex';
          div.style.position = 'absolute';
          div.style.left = `${x}px`;
          div.style.top = `${y}px`;
          div.style.width = `${tileW}px`;
          div.style.height = `${tileH}px`;
          // Optional: add background or border for visualization
          // div.style.backgroundColor = 'lightgray';
          // div.style.border = '1px solid black';
          // div.style.boxSizing = 'border-box';

          container.appendChild(div);
          tile.div = div;
        }

        grid[r][c] = tile; // Store the tile object in the 2D array at its calculated position
      } else {
        // This warning indicates a potential issue with the column indexing or gridWidth calculation.
        // The tile is not added to the grid array if its calculated column index is out of bounds.
        console.warn(`Calculated column index ${c} out of bounds [0, ${gridWidth - 1}] for row ${r}. Tile at i=${i}, x=${x}. This tile will not be added to the grid array.`);
      }
    }
  }

  // Second pass: Link neighbors for all created tiles
  // Iterate through the 2D array. We only need to process cells that contain a tile object (not null).
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < gridWidth; c++) {
      const tile = grid[r][c];
      if (tile) { // If a tile exists at this [r][c] position in the grid
        // Define the relative row and column changes for each neighbor direction
        // These offsets are based on the specific 'c' (offset column) indexing used,
        // where a horizontal step corresponds to a +/- 1 change in 'c' for diagonal neighbors
        // and a +/- 2 change in 'c' for horizontal neighbors.
        const neighbors = {
          E: { dr: 0, dc: 2 },
          W: { dr: 0, dc: -2 },
          NE: { dr: -1, dc: 1 },
          NW: { dr: -1, dc: -1 },
          SE: { dr: 1, dc: 1 },
          SW: { dr: 1, dc: -1 }
        };

        for (const dir in neighbors) {
          const neighborPos = neighbors[dir];
          const nr = r + neighborPos.dr; // Calculated neighbor row index
          const nc = c + neighborPos.dc; // Calculated neighbor column index

          // Check if the calculated neighbor coordinates are within the overall grid bounds
          if (nr >= 0 && nr < rows && nc >= 0 && nc < gridWidth) {
            // Get the potential neighbor tile from the grid.
            // Check if grid[nr] exists before accessing grid[nr][nc] to prevent errors if nr is out of bounds.
            const neighborTile = grid[nr] ? grid[nr][nc] : null;

            if (neighborTile) { // If a tile object actually exists at the neighbor position (it's not null)
              tile[dir] = neighborTile; // Link the neighbor tile object
            }
          }
        }
      }
    }
  }

  // Set container size based on the extent of the placed tiles.
  // This ensures the container is large enough to show all hexes.
  // The width covers the distance from the leftmost edge of the leftmost hex
  // to the rightmost edge of the rightmost hex.
  // Assuming x is the left edge: width = (maxX + (hexWidth - gap)) - minX
  let wGrid = (maxX - minX) + (hexWidth - gap);

  // The height covers the distance from the top edge of the topmost hex
  // to the bottom edge of the bottommost hex.
  let hGrid = (maxY - minY) + (hexHeight - gap);


  // Use provided mStyle function or fallback to standard style to set container size and position.
  if (typeof mStyle !== 'undefined') {
    mStyle(container, { w: wGrid, h: hGrid });
  } else {
    container.style.width = `${wGrid}px`;
    container.style.height = `${hGrid}px`;
    container.style.position = 'relative'; // Ensure positioning context for absolute children
    container.style.overflow = 'hidden'; // Hide potential overflow
  }


  // console.log(`Grid created with dimensions: ${rows}x${gridWidth} (2D array)`);
  // console.log(`Container size set to: ${wGrid}x${hGrid}`);

  // Return the 2D array representing the grid
  return grid;
}

// Dummy toElem, mDom, and mStyle functions provided for completeness if they are not
// defined elsewhere in the environment where this code is used.
// In a real application, these would typically be part of a separate utility file or library.

if (typeof toElem === 'undefined') {
  /**
   * Dummy function to get an element by ID.
   * @param {string} id The ID of the element.
   * @returns {HTMLElement|null} The element or null if not found.
   */
  function toElem(id) {
    return document.getElementById(id);
  }
}

if (typeof mDom === 'undefined') {
  /**
   * Dummy function to create a DOM element with styles and attributes and append to a container.
   * @param {HTMLElement} container The container element.
   * @param {Object} styles CSS styles to apply.
   * @param {Object} attrs Attributes to set.
   * @returns {HTMLElement} The created element.
   */
  function mDom(container, styles, attrs) {
    const div = document.createElement('div');
    if (styles) {
      for (const prop in styles) {
        // Handle width, height, left, top separately to add 'px'
        if (['w', 'h', 'left', 'top'].includes(prop)) {
          div.style[prop] = `${styles[prop]}px`;
        } else {
          div.style[prop] = styles[prop];
        }
      }
    }
    if (attrs) {
      for (const prop in attrs) {
        div[prop] = attrs[prop];
      }
    }
    if (container) {
      container.appendChild(div);
    }
    return div;
  }
}

if (typeof mStyle === 'undefined') {
  /**
   * Dummy function to set styles on a DOM element.
   * @param {HTMLElement} elem The element to style.
   * @param {Object} styles CSS styles to apply.
   */
  function mStyle(elem, styles) {
    if (elem && styles) {
      for (const prop in styles) {
        if (['w', 'h', 'left', 'top'].includes(prop)) {
          elem.style[prop] = `${styles[prop]}px`;
        } else {
          elem.style[prop] = styles[prop];
        }
      }
      // Ensure the container has a position context for absolute children
      if (!elem.style.position || elem.style.position === 'static') {
        elem.style.position = 'relative';
      }
    }
  }
}
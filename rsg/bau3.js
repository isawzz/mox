

function drawLineSegmentDiv(x1, y1, x2, y2, parent, thickness = 5, color = 'black') {
  const length = Math.hypot(x2 - x1, y2 - y1);
  const angleRad = Math.atan2(y2 - y1, x2 - x1);
  const angleDeg = angleRad * 180 / Math.PI;

  const line = document.createElement('div');
  line.style.position = 'absolute';
  line.style.left = `${x1}px`;
  line.style.top = `${y1 - thickness / 2}px`; // center vertically
  line.style.width = `${length}px`;
  line.style.height = `${thickness}px`;
  line.style.backgroundColor = color;
  line.style.transform = `rotate(${angleDeg}deg)`;
  line.style.transformOrigin = '0 50%'; // rotate around start point
  line.style.pointerEvents = 'none';

  parent.appendChild(line);
  return line;
}

function normalSegmentThroughMidpoint(x1, y1, x2, y2, length) {
  // Midpoint
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  // Direction vector of the original segment
  const dx = x2 - x1;
  const dy = y2 - y1;

  // Normalized perpendicular vector
  let nx = -dy;
  let ny = dx;
  const norm = Math.hypot(nx, ny);

  if (norm === 0) {
    throw new Error("The two points are identical; cannot compute a normal.");
  }

  nx /= norm;
  ny /= norm;

  // Half-length vector for the normal
  const halfLen = length / 2;
  const xA = mx + nx * halfLen;
  const yA = my + ny * halfLen;
  const xB = mx - nx * halfLen;
  const yB = my - ny * halfLen;

  return [
    { x: xA, y: yA },
    { x: xB, y: yB }
  ];
}

function normalThroughMidpoint(x1, y1, x2, y2) {
  // Midpoint
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  // Slope of the original segment
  const dx = x2 - x1;
  const dy = y2 - y1;

  let slope, normalSlope, intercept;

  if (dx === 0) {
    // Vertical line → normal is horizontal (slope = 0)
    normalSlope = 0;
    intercept = my;
  } else if (dy === 0) {
    // Horizontal line → normal is vertical (infinite slope)
    normalSlope = Infinity; // special case
    intercept = mx;         // x-intercept of vertical line
  } else {
    const originalSlope = dy / dx;
    normalSlope = -1 / originalSlope;
    intercept = my - normalSlope * mx;
  }

  return {
    midpoint: { x: mx, y: my },
    normalLine: {
      slope: normalSlope,
      intercept: intercept,
      form: normalSlope === Infinity
        ? `x = ${intercept}`
        : `y = ${normalSlope}x + ${intercept}`
    }
  };
}
function drawCircle(d, x, y, sz = 4, bg = 'red') {
  mDom(d, { bg, round: true, w: sz, h: sz, position: 'absolute', left: x - sz / 2, top: y - sz / 2 }); //left:0,top:0}); //
}
function getEndPoints(c0, c1) { return [c0[0], c0[1], c1[0], c1[1]]; }
function getCoordinates() {
  let res = [];
  for (const a of arguments) { res.push(a[0]), res.push(a[1]) }
  return res;
}
function getCorners(x, y, sz) {
  let res = {};
  let list = getCornerList(x, y, sz);
  for (let i = 0; i < list.length / 2; i++) {
    let id = `c${list[2 * i]}_${list[2 * i + 1]}`;
    res[id] = { x: list[2 * i], y: list[2 * i + 1] }
  }
  return res;
}
function getSegments(x, y, sz) {
  let res = {};
  let list = getCornerList(x, y, sz);
  for (let i = 0; i < list.length / 2; i++) {
    let x1 = list[2 * i];
    let y1 = list[2 * i + 1];
    let x2 = list[2 * ((i + 1) % 6)];
    let y2 = list[2 * ((i + 1) % 6) + 1];
    let id = `s${x1}_${y1}_${x2}_${y2}`;
    res[id] = { x1, y1, x2, y2 }
  }
  return res;
}
function getCornerList(x, y, sz) { return [x + sz, y, x + 2 * sz, y + sz / 2, x + 2 * sz, y + sz * 3 / 2, x + sz, y + 2 * sz, x, y + sz * 3 / 2, x, y + sz / 2]; }

function getHexCorners(x, y, radius) {
  const corners = [];
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 3 * i - Math.PI / 6; // -30° to make flat top
    const cornerX = x + radius * Math.cos(angle);
    const cornerY = y + radius * Math.sin(angle);
    corners.push([cornerX, cornerY]);
  }
  return corners;
}


function addCity(cityMap, container, r, c, x, y, padding = 0) {
  const key = `${r}_${c}`;
  if (cityMap[key]) return; // avoid duplicates

  const city = document.createElement('div');
  city.className = 'city';
  city.style.position = 'absolute';
  let sz = 30;
  city.style.width = `${sz}px`;
  city.style.height = `${sz}px`;
  city.style.borderRadius = '50%';
  city.style.background = 'green';

  x -= padding;
  y -= padding;

  city.style.left = `${x - sz / 2}px`;
  city.style.top = `${y - sz / 2}px`;

  container.appendChild(city);
  cityMap[key] = { div: city, x, y, r, c };
}


function addCities(container, grid, sideLength) {
  const cityMap = {}; // key: `r_c` => city object

  for (const row of grid) {
    for (const tile of row) {
      const { x, y, r, c } = tile;
      //let [tx,ty]=[x+sideLength/2,y+sideLength/2];
      for (let i = 0; i < 6; i++) {
        const angle_deg = 60 * i - 30;
        const angle_rad = Math.PI / 180 * angle_deg;
        const cx = x + sideLength * Math.cos(angle_rad);
        const cy = y + sideLength * Math.sin(angle_rad); // - sideLength / 2;

        // Determine index of the tile *below* and to the *left* of the corner
        // Here, we use angle to determine ownership
        let rowIndex = r;
        let colIndex = c;
        if (i === 2 || i === 3) rowIndex += 1; // bottom corners
        if (i === 3 || i === 4 || i === 5) colIndex -= 1; // left side

        addCity(cityMap, container, rowIndex, colIndex, 0 - 10, 0 - 10); //cx, cy);
        return;
      }
      return;
    }
  }

  return cityMap;
}


function createHexGrid(d, rows, cols, sideLength = 50, gap = 1) {
  const container = toElem(d);
  container.innerHTML = '';
  const hexWidth = sideLength * 2;
  const hexHeight = hexWidth; //Math.sqrt(3) * sideLength;
  const vertSpacing = hexHeight * 0.75;

  container.style.height = `${vertSpacing * rows + hexHeight * 0.25}px`;


  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const hex = document.createElement('div');
      hex.className = 'hex';
      hex.style.width = `${hexWidth - gap}px`;
      hex.style.height = `${hexHeight - gap}px`;

      const xOffset = (r % 2) * (hexWidth / 2);
      const x = c * hexWidth + xOffset;
      const y = r * vertSpacing;

      hex.style.left = `${x}px`;
      hex.style.top = `${y}px`;

      container.appendChild(hex);
    }
  }
}

function exampleFields0(tiles, sz) {
  for (const id in tiles) {
    let t = tiles[id];
    let d = iDiv(t);
    mCenterCenterFlex(d);
    msKey(rChoose(Object.keys(M.superdi)), d, { hmax: sz, fz: sz, fg: rColor() })

    d.addEventListener('mouseenter', () => {
      for (const dir of ['NE', 'E', 'SE', 'SW', 'W', 'NW']) {
        const neighbor = tiles[t[dir]]; console.log(neighbor)
        if (neighbor) neighbor.div.classList.add('neighbor-highlight');
      }
    });

    d.addEventListener('mouseleave', () => {
      for (const dir of ['NE', 'E', 'SE', 'SW', 'W', 'NW']) {
        const neighbor = tiles[t[dir]];
        if (neighbor) neighbor.div.classList.remove('neighbor-highlight');
      }
    });

  }

}

function mScrollBehavior(container, hScroll, hSnapp) {
  // const rowHeight = 120 + 8; // row height + vertical gap
  // const hScroll=5*rowHeight;
  let isScrolling = false;
  container.tabIndex = 0;
  let isUserScrolling = false;
  let scrollTimeout;

  // Keyboard PageUp/PageDown
  container.addEventListener('keydown', (e) => {
    if (e.key === 'PageDown' || e.key === 'PageUp') {
      e.preventDefault();
      const direction = e.key === 'PageDown' ? 1 : -1;
      smoothScrollBy(container, direction * hScroll); //container.clientHeight);
    }
  });

  // Wheel scroll: scroll exactly one screen
  let wheelScrolling = false;
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (wheelScrolling) return;
    wheelScrolling = true;
    const direction = e.deltaY > 0 ? 1 : -1;
    smoothScrollBy(container, direction * hScroll); //container.clientHeight);
    setTimeout(() => {
      wheelScrolling = false;
    }, 340);
  }, { passive: false });

  // Scroll event: detect manual scrolling (including scrollbar drag/click)
  container.addEventListener('scroll', () => {
    isUserScrolling = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      snapScroll(container);
      isUserScrolling = false;
    }, 150); // adjust delay for scroll end detection
  });

  // Smooth scroll helper
  function smoothScrollBy(element, distance) {
    element.scrollBy({
      top: distance,
      behavior: 'smooth'
    });
  }

  // Snap scroll position to nearest full page (container height)
  function snapScroll(element) {
    const pageHeight = hSnapp; //element.clientHeight;
    const currentScroll = element.scrollTop;
    const pageIndex = Math.round(currentScroll / pageHeight);
    const targetScroll = pageIndex * pageHeight;

    if (Math.abs(targetScroll - currentScroll) > 2) {
      element.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  }

}
function mKey(imgKey, d, styles = {}, opts = {}) {
  styles = jsCopy(styles);
  let o = imgKey.includes('.') ? { src: imgKey } : opts.prefer == 'plain' ? { plain: imgKey } : lookup(M.superdi, [imgKey]);
  let type = opts.prefer;
  let types = ['src', 'img', 'photo', 'uni', 'emo', 'fa6', 'fa', 'ga', 'plain'];
  if (nundef(o[type])) type = types.find(x => isdef(o[x]));

  let d0 = mDom(d, styles, opts);
  let [w, h] = mSizeSuccession(styles, 100);

  if (['img', 'src', 'photo'].includes(type)) {
    let astyle = { w, h, fit: o && o.cats.includes('card') ? 'contain' : 'cover', 'object-position': 'center center' };

    mDom(d0, astyle, { ...opts, tag: 'img', src: o[type], alt: imgKey });

  } else if (type == 'plain') {
    let x = mDom(d0, {}, { ...opts, html: o[type] });

  } else {
    let family = Families[type] || 'inherit';
    let text = ['fa6', 'fa', 'ga'].includes(type) ? `&#x${o[type]};` : o[type];
    let fz = type == 'plain' ? 18 : h * .8; // h*.9;

    let astyles = {
      fz,
      family,
      //matop:-12
      // display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center',
      // align: 'center',
      // width: '100%',
      // height: '100%',
      // box: true,
      // hline: '1', // Ensure consistent vertical alignment
      // 'vertical-align': 'middle', // Align text vertically
      // padding: '0', // Remove any padding that might affect alignment
      // margin: '0' // Remove any margin that might affect alignment
    };

    // let x = mDom(d0, { family, fz, wmin: 100, align: 'center' }, { ...opts, html: text });
    let x = mDom(d0, astyles, { ...opts, html: text });

  }
  return d0;

}

function msKey(key, d, styles = {}, opts = {}) {
  styles = jsCopy(styles);
  let o = key.includes('.') ? { src: key } : opts.prefer == 'plain' ? { plain: key } : lookup(M.superdi, [key]);
  let type = opts.prefer;
  let types = ['src', 'img', 'photo', 'uni', 'emo', 'fa6', 'fa', 'ga', 'plain'];
  if (nundef(o[type])) type = types.find(x => isdef(o[x]));

  //type = 'fa6'
  let d0;

  if (['img', 'src', 'photo'].includes(type)) {
    d0 = mDom(d, { ...styles, h: 100 }, { ...opts, tag: 'img', src: o[type], alt: key });
  } else if (type == 'plain') {
    d0 = mDom(d, { styles, className: 'label' }, { ...opts, html: o[type], title: o[type] });
  } else {
    let family = Families[type] || 'inherit';
    let text = ['fa6', 'fa', 'ga'].includes(type) ? `&#x${o[type]};` : o[type];
    d0 = mDom(d, { ...styles, family }, { ...opts, html: text });

  }
  return d0;
}

function showCollection(ev) {
  let name = ev.target.innerHTML;
  let keys = M.byCat[name]; //Object.keys(M.superdi); // M.byCat.animal;
  showKeys(keys, 'dMain');
}
async function showKeys(keys, d) {
  let centered = { display: 'flex', alignItems: 'center', justifyContent: 'center', baseline: 'middle' };
  mClear(d);
  let [gap, w, h] = [10, 100, 100];
  let dGrid = mDom(d, { display: 'flex', fg: 'black', gap, padding: gap, wrap: true });
  let i = 0;
  let n = Math.floor(window.innerWidth / (w + gap)) * Math.floor(window.innerHeight / (h + gap)); console.log('n', n);
  for (const k of keys) {
    let d = mDom(dGrid, { bg: 'silver', padding: gap, cursor: 'pointer' }, { id: getUID(), onclick: onclickItem });

    let x = mKey(k, d, { w, h, fz: h, hline: h, box: true, fg: 'black', bg: 'white' }, { special: true });

    mDom(d, { w, fg: 'black', 'text-overflow': 'ellipsis', 'white-space': 'nowrap', overflow: 'hidden', fz: 16, align: 'center' }, { html: k, title: k });
    DA.items[d.id] = { div: d, key: k };
    if (0 === ++i % n) await mSleep(20);
  }
}

function fitFzToBox(div, maxWidth, maxHeight, options = {}) {
  const {
    minFontSize = 10,
    maxFontSize = 100,
    fontStep = 1,
    lineHeight = 1
  } = options;

  const style = window.getComputedStyle(div);
  const originalText = div.textContent;

  // Create an off-screen clone for measurement
  const testDiv = document.createElement("div");
  document.body.appendChild(testDiv);
  testDiv.style.position = "absolute";
  testDiv.style.visibility = "hidden";
  testDiv.style.whiteSpace = "pre-wrap";
  testDiv.style.wordBreak = "break-word";

  // Copy CSS that affects size
  const keysToCopy = ["fontFamily", "fontWeight", "fontStyle", "letterSpacing", "padding", "border"];
  keysToCopy.forEach(key => {
    testDiv.style[key] = style[key];
  });

  let fontSize = maxFontSize;
  testDiv.textContent = originalText;

  while (fontSize >= minFontSize) {
    testDiv.style.fontSize = `${fontSize}px`;
    testDiv.style.lineHeight = lineHeight;

    if (
      testDiv.offsetWidth <= maxWidth &&
      testDiv.offsetHeight <= maxHeight
    ) {
      break;
    }

    fontSize -= fontStep;
  }

  // Apply the final font size to the actual div
  div.style.fontSize = `${fontSize}px`;
  div.style.lineHeight = lineHeight;

  document.body.removeChild(testDiv);
  return fontSize;
}

function fitTextToBox(text, family, maxWidth, maxHeight, options = {}) {
  const {
    minFontSize = 10,
    maxFontSize = 100,
    fontStep = 1,
    lineHeight = 1.2,
    weight = "normal",
    fontStyle = "normal",
    letterSpacing = "normal",
    padding = "0"
  } = options;

  // Create a hidden measuring element
  const testDiv = mDom(document.body, {}, { tag: 'div', html: text });
  mStyle(testDiv, {
    position: 'absolute',
    visibility: 'hidden',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    padding,
    family,
    weight,
    fontStyle,
    letterSpacing
  });

  let fz = maxFontSize;

  // Adjust font size to fit within the box
  while (fz >= minFontSize) {
    mStyle(testDiv, { fz, lineHeight });
    if (testDiv.offsetWidth <= maxWidth && testDiv.offsetHeight <= maxHeight) break;
    fz -= fontStep;
  }

  // Clean up and return the calculated font size
  testDiv.remove();
  return fz;
}
async function initTest() {
  DA.items = {};
  DA.selectedImages = [];
  await loadAssetsStatic(); //console.log('M', M);
  stickyHeaderCode();

  let elems = mLayoutLM('dPage');
  mStyle('dMain', { overy: 'auto' });

  let dLeft = mBy('dLeft');
  mStyle(dLeft, { overy: 'auto' });


}

function toCharCode(uniEmoText) {
  //remove the ';' at the end of unicode text
  if (uniEmoText.endsWith(';')) uniEmoText = uniEmoText.slice(0, -1);
  //console.log('toCharCode', uniEmoText);
  return String.fromCodePoint(parseInt(uniEmoText.replace('&#', '0'), 16));
}

function measureCharCodeInFont(charCode, fontSize, fontFamily, fontWeight = "normal") {
  const char = String.fromCharCode(charCode);  // Convert charCode to character
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const metrics = ctx.measureText(char);

  return {
    width: metrics.width,
    actualBoundingBoxLeft: metrics.actualBoundingBoxLeft,
    actualBoundingBoxRight: metrics.actualBoundingBoxRight,
    actualBoundingBoxAscent: metrics.actualBoundingBoxAscent,
    actualBoundingBoxDescent: metrics.actualBoundingBoxDescent,
    height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
  };
}

function measureTextInFont(text, fontSize, fontFamily, fontWeight = "normal") {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const metrics = ctx.measureText(text);

  return {
    width: metrics.width,
    actualBoundingBoxLeft: metrics.actualBoundingBoxLeft,
    actualBoundingBoxRight: metrics.actualBoundingBoxRight,
    actualBoundingBoxAscent: metrics.actualBoundingBoxAscent,
    actualBoundingBoxDescent: metrics.actualBoundingBoxDescent,
    height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
  };
}

async function measureUsedAreaOfDiv(div) {
  // Render the div onto a canvas
  const canvas = await html2canvas(div, {
    backgroundColor: null, // preserve transparency
    scale: 1
  });

  const ctx = canvas.getContext("2d");
  const { width, height } = canvas;
  const imageData = ctx.getImageData(0, 0, width, height).data;

  let minX = width, minY = height, maxX = 0, maxY = 0;
  let hasContent = false;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const alpha = imageData[index + 3];
      if (alpha > 0) {
        hasContent = true;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (!hasContent) return null;

  return {
    left: minX,
    top: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1
  };
}


function measureCharacterBounds(char, fontSize, fontFamily) {
  // Create an off-screen container
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "-9999px";
  //container.style.whiteSpace = "pre";
  container.style.fontSize = `${fontSize}px`;
  container.style.fontFamily = fontFamily;
  container.style.lineHeight = "normal";
  container.style.padding = "0";
  container.style.margin = "0";
  container.style.border = "none";

  // Insert the character
  container.textContent = char;

  // Append to body for measurement
  document.body.appendChild(container);

  // Get exact pixel bounds
  const rect = container.getBoundingClientRect();

  // Cleanup
  document.body.removeChild(container);

  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left
  };
}


function onclickItem(ev) { toggleSelection(evToId(ev), DA.selectedImages); }
function toggleSelection(id, selist, className = 'framedPicture') {
  if (selist.includes(id)) { removeInPlace(selist, id); mClassRemove(id, className); } else { selist.push(id); mClass(id, className); }
}
function stickyHeaderCode() {
  const header = document.querySelector('.sticky_header');
  const contentArea = document.querySelector('.content_area');

  // Function to set the height and top margin of the content area
  const setContentAreaHeight = () => {
    const headerHeight = header.offsetHeight;
    contentArea.style.height = `calc(100vh - ${headerHeight}px)`;
    // Although not strictly necessary with the height calculation,
    // a margin-top equal to header height can prevent content from
    // initially being hidden behind a fixed header in some layouts.
    // In this sticky/flex-like approach, height calculation is sufficient.
    // contentArea.style.marginTop = `${headerHeight}px`;
  };

  // Set the height initially
  setContentAreaHeight();

  // Recalculate height on window resize
  window.addEventListener('resize', setContentAreaHeight);

}




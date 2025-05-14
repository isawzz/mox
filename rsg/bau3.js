

function toCharCode(uniEmoText){
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




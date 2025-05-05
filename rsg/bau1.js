
function createImageSymbol(src,id){
	return `
			<symbol id="${id}" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
				<image href="${src}" x="0" y="0" width="100" height="100" />
			</symbol>
		`;
}

function createCardSVG(face, valueSymbolId, suitSymbolId) {
  const xmlns = "http://www.w3.org/2000/svg";
  const xlink = "http://www.w3.org/1999/xlink";

  const svg = document.createElementNS(xmlns, "svg");
  svg.setAttribute("class", "card");
  svg.setAttribute("face", face);
  svg.setAttribute("viewBox", "-120 -168 240 336");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("xmlns", xmlns);
  svg.setAttribute("xmlns:xlink", xlink);

  // Background rect
  const rect = document.createElementNS(xmlns, "rect");
  rect.setAttribute("x", "-119.5");
  rect.setAttribute("y", "-167.5");
  rect.setAttribute("width", "239");
  rect.setAttribute("height", "335");
  rect.setAttribute("rx", "12");
  rect.setAttribute("ry", "12");
  rect.setAttribute("fill", "white");
  rect.setAttribute("stroke", "black");
  svg.appendChild(rect);

  // Top left value
  const valueUse = document.createElementNS(xmlns, "use");
  valueUse.setAttributeNS(xlink, "xlink:href", `#${valueSymbolId}`);
  valueUse.setAttribute("x", "-114.4");
  valueUse.setAttribute("y", "-156");
  valueUse.setAttribute("height", "32");
  svg.appendChild(valueUse);

  // Top left suit
  const suitUse = document.createElementNS(xmlns, "use");
  suitUse.setAttributeNS(xlink, "xlink:href", `#${suitSymbolId}`);
  suitUse.setAttribute("x", "-111.784");
  suitUse.setAttribute("y", "-119");
  suitUse.setAttribute("height", "26.769");
  svg.appendChild(suitUse);

  // Center pip
  const centerUse = document.createElementNS(xmlns, "use");
  centerUse.setAttributeNS(xlink, "xlink:href", `#${suitSymbolId}`);
  centerUse.setAttribute("x", "-35");
  centerUse.setAttribute("y", "-135.501");
  centerUse.setAttribute("height", "70");
  svg.appendChild(centerUse);

  // Mirrored bottom
  const g = document.createElementNS(xmlns, "g");
  g.setAttribute("transform", "rotate(180)");

  const valueUse2 = valueUse.cloneNode();
  const suitUse2 = suitUse.cloneNode();
  const centerUse2 = centerUse.cloneNode();

  g.appendChild(valueUse2);
  g.appendChild(suitUse2);
  g.appendChild(centerUse2);
  svg.appendChild(g);

  return svg;
}

function generateSvgWithImage(imageSrc, width = 100, height = 100) {
	if (!imageSrc || typeof imageSrc !== 'string') {
			console.error("Invalid image source provided to generateSvgWithImage.");
			return ''; // Return empty string or handle error as appropriate
	}

	const svgCode = `
			<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<image xlink:href="${imageSrc}" x="0" y="0" width="${width}" height="${height}"/>
			</svg>
	`;

	return svgCode;
}
function _filterKeys(collection,cat,func){
	let keys = isdef(collection)?M.byCollection[collection]:M.names;
	if (isdef(cat)) {
		let catKeys = M.byCat[cat]; //console.log(catKeys)
		keys=keys.filter(x=>catKeys.includes(x));
	}
	if (isdef(func)) keys=keys.filter(x=>func(M.superdi[x]));
	return keys;
}
// --- Example Usage (assuming you have an HTML element with id="svgContainer") ---
// You would call this function and inject the returned SVG string into your HTML.

/*
// Example: Generate SVG for a hypothetical image and display it
const myImageFilename = 'images/my_card_figure.png'; // Replace with your actual image path/URL
const svgContainer = document.getElementById('svgContainer'); // Replace with the ID of your container element

if (svgContainer) {
	const generatedSvg = generateSvgWithImage(myImageFilename, 150, 200); // Generate SVG with specific dimensions
	svgContainer.innerHTML = generatedSvg; // Inject the generated SVG into the HTML
} else {
	console.warn("HTML element with id 'svgContainer' not found. Cannot display example SVG.");
}
*/

// --- Example of how you might use this in your card display logic ---
/*
// Inside your displayCard function, when you determine the card requires an image:
const cardKey = rankKey + suitKey; // e.g., 'KH'
const imagePath = getImageForCard(cardKey); // You would need a function like this

if (imagePath) {
	const cardSVG = generateSvgWithImage(imagePath, 100, 140); // Adjust dimensions as needed
	// Then inject cardSVG into your card container HTML structure
	cardContainer.innerHTML = `
			<div class="card-corner ${textColorClass}">
					<span>${rank}</span>
					<span>${suit}</span>
			</div>
			<div class="card-figure">
					${cardSVG}
			</div>
			<div class="card-corner ${textColorClass} transform rotate-180">
					<span>${rank}</span>
					<span>${suit}</span>
			</div>
	`;
} else {
	// Fallback to text or handle cards without images
}

// You would need a function like this to map card keys to image paths
function getImageForCard(cardKey) {
	const imageMap = {
			'KH': 'images/king_of_hearts.png',
			'QS': 'images/queen_of_spades.png',
			// ... add paths for all your face card images
	};
	return imageMap[cardKey] || null; // Return image path or null if not found
}
*/


function displaySymbol(symbolString, containerDiv) {
  // Create an SVG wrapper and insert the symbol into <defs>
  const tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  tempSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  // Extract the symbol ID
  const idMatch = symbolString.match(/<symbol[^>]*id=['"]([^'"]+)['"]/);
  if (!idMatch) {
    console.error("Symbol ID not found");
    return;
  }
  const symbolId = idMatch[1];

  // Insert the symbol definition
  tempSvg.innerHTML = `
    <defs>${symbolString}</defs>
    <use href="#${symbolId}" x="0" y="0" />
  `;

  // Style it (optional)
  tempSvg.setAttribute("width", "100");
  tempSvg.setAttribute("height", "100");

  // Append the SVG to the container div
  containerDiv.innerHTML = ""; // Clear previous content
  containerDiv.appendChild(tempSvg);
}


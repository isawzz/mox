

function createCard(rank = "10", suit = "♣", width = 240, height = 336) {
	const card = document.createElement("div");
	card.style.position = "relative";
	card.style.width = width + "px";
	card.style.height = height + "px";
	card.style.border = "1px solid black";
	card.style.borderRadius = "12px";
	card.style.background = "white";
	card.style.fontFamily = "serif";
	card.style.display = "grid";
	card.style.gridTemplateColumns = "1fr 1fr 1fr";
	card.style.gridTemplateRows = "repeat(12, 1fr)";
	card.style.boxSizing = "border-box";

	const pipFontSize = height * 0.09;

	// Left column (4 pips spanning 3 rows each)
	[0, 3, 6, 9].forEach(row => {
		const pip = document.createElement("div");
		pip.textContent = suit;
		pip.style.gridColumn = "1";
		pip.style.gridRow = `${row + 1} / span 3`;
		pip.style.fontSize = `${pipFontSize}px`;
		pip.style.display = "flex";
		pip.style.alignItems = "center";
		pip.style.justifyContent = "center";
		card.appendChild(pip);
	});

	// Right column (4 pips spanning 3 rows each)
	[0, 3, 6, 9].forEach(row => {
		const pip = document.createElement("div");
		pip.textContent = suit;
		pip.style.gridColumn = "3";
		pip.style.gridRow = `${row + 1} / span 3`;
		pip.style.fontSize = `${pipFontSize}px`;
		pip.style.display = "flex";
		pip.style.alignItems = "center";
		pip.style.justifyContent = "center";
		card.appendChild(pip);
	});

	// Center column (2 pips spanning 4 rows each, centered vertically)
	[2, 6].forEach(row => {
		const pip = document.createElement("div");
		pip.textContent = suit;
		pip.style.gridColumn = "2";
		pip.style.gridRow = `${row + 1} / span 4`;
		pip.style.fontSize = `${pipFontSize}px`;
		pip.style.display = "flex";
		pip.style.alignItems = "center";
		pip.style.justifyContent = "center";
		card.appendChild(pip);
	});

	// Top-left corner: rank and suit
	const top = document.createElement("div");
	top.innerHTML = `<div>${rank}</div><div style="text-align:center">${suit}</div>`;
	top.style.position = "absolute";
	top.style.left = "6px";
	top.style.top = "4px";
	top.style.fontSize = Math.floor(height * 0.08) + "px";
	card.appendChild(top);

	// Bottom-right corner: rotated rank and suit
	const bottom = top.cloneNode(true);
	bottom.style.left = "";
	bottom.style.right = "6px";
	bottom.style.top = "";
	bottom.style.bottom = "4px";
	bottom.style.transform = "rotate(180deg)";
	bottom.style.textAlign = "center";
	card.appendChild(bottom);

	return card;
}
function createCard343(rank = "10", suit = "♣", width = 240, height = 336) {
	const card = document.createElement("div");
	card.style.position = "relative";
	card.style.width = width + "px";
	card.style.height = height + "px";
	card.style.border = "1px solid black";
	card.style.borderRadius = "12px";
	card.style.background = "white";
	card.style.fontFamily = "serif";
	card.style.display = "grid";
	card.style.gridTemplateColumns = "1fr 1fr 1fr";
	card.style.gridTemplateRows = "repeat(12, 1fr)";
	card.style.boxSizing = "border-box";

	const pipFontSize = height * 0.09;

	// Utility to create and place a pip
	function placePip(col, row, span) {
		const pip = document.createElement("div");
		pip.textContent = suit;
		pip.style.gridColumn = col;
		pip.style.gridRow = `${row} / span ${span}`;
		pip.style.fontSize = `${pipFontSize}px`;
		pip.style.display = "flex";
		pip.style.alignItems = "center";
		pip.style.justifyContent = "center";
		card.appendChild(pip);
	}

	// Left column: 3 pips (each spans 3 rows), centered in 12 rows
	[1, 5, 9].forEach(r => placePip(1, r, 3));

	// Center column: 4 pips (each spans 2 rows), evenly spaced
	[1, 4, 7, 10].forEach(r => placePip(2, r, 2));

	// Right column: 3 pips (each spans 3 rows), same as left
	[1, 5, 9].forEach(r => placePip(3, r, 3));

	// Top-left corner: rank and suit
	const top = document.createElement("div");
	top.innerHTML = `<div>${rank}</div><div style="text-align:center">${suit}</div>`;
	top.style.position = "absolute";
	top.style.left = "6px";
	top.style.top = "4px";
	top.style.fontSize = Math.floor(height * 0.08) + "px";
	card.appendChild(top);

	// Bottom-right corner: rotated rank and suit
	const bottom = top.cloneNode(true);
	bottom.style.left = "";
	bottom.style.right = "6px";
	bottom.style.top = "";
	bottom.style.bottom = "4px";
	bottom.style.transform = "rotate(180deg)";
	bottom.style.textAlign = "center";
	card.appendChild(bottom);

	return card;
}
function createCard2(rank = "10", suit = "♣", width = 240, height = 336) {
	const card = document.createElement("div");
	card.style.position = "relative";
	card.style.width = width + "px";
	card.style.height = height + "px";
	card.style.border = "1px solid black";
	card.style.borderRadius = "12px";
	card.style.background = "white";
	card.style.fontFamily = "serif";

	const centerX = width / 2;
	const colOffset = width * 0.25; // for left/right columns
	const colX = [centerX - colOffset, centerX, centerX + colOffset];

	const numRows = 4; // max for side columns
	const topMargin = height * 0.12;
	const pipSpacing = (height - 2 * topMargin) / (numRows - 1);

	// Pip positions for 10: 4-3-4 in 3 columns
	const pipData = [
		[0, [0, 1, 2, 3]],     // left column
		[1, [0.5, 2, 3.5]],    // center column (slightly staggered)
		[2, [0, 1, 2, 3]]      // right column
	];

	pipData.forEach(([col, rows]) => {
		rows.forEach(rowIndex => {
			const pip = document.createElement("div");
			pip.textContent = suit;
			pip.style.position = "absolute";
			pip.style.left = (colX[col] - width * 0.035) + "px";
			pip.style.top = (topMargin + pipSpacing * rowIndex - height * 0.045) + "px";
			pip.style.fontSize = Math.floor(height * 0.09) + "px";
			card.appendChild(pip);
		});
	});

	// Top-left: rank and suit
	const top = document.createElement("div");
	top.innerHTML = `<div>${rank}</div><div style="text-align:center">${suit}</div>`;
	top.style.position = "absolute";
	top.style.left = "6px";
	top.style.top = "4px";
	top.style.fontSize = Math.floor(height * 0.08) + "px";
	card.appendChild(top);

	// Bottom-right: rotated rank and suit
	const bottom = top.cloneNode(true);
	bottom.style.left = "";
	bottom.style.right = "6px";
	bottom.style.top = "";
	bottom.style.bottom = "4px";
	bottom.style.transform = "rotate(180deg)";
	bottom.style.textAlign = "center";
	card.appendChild(bottom);

	return card;
}
function createCard1(rank = "10", suit = "♣", width = 240, height = 336) {
	const layout = {
		'2': [[1, 0], [1, 4]],
		'3': [[1, 0], [1, 2], [1, 4]],
		'4': [[0, 0], [2, 0], [0, 4], [2, 4]],
		'5': [[0, 0], [2, 0], [1, 2], [0, 4], [2, 4]],
		'6': [[0, 0], [2, 0], [0, 2], [2, 2], [0, 4], [2, 4]],
		'7': [[0, 0], [2, 0], [0, 2], [1, 1], [2, 2], [0, 4], [2, 4]],
		'8': [[0, 0], [2, 0], [0, 2], [1, 1], [2, 2], [0, 4], [2, 4], [1, 3]],
		'9': [[0, 0], [2, 0], [0, 2], [1, 1], [2, 2], [0, 4], [2, 4], [1, 3], [1, 2]],
		'10': [[0, 0], [2, 0], [0, 1.5], [2, 1.5], [1, 1], [1, 2], [1, 3], [0, 3.5], [2, 3.5], [0, 4]],
	};

	const card = document.createElement("div");
	card.style.position = "relative";
	card.style.width = width + "px";
	card.style.height = height + "px";
	card.style.border = "1px solid black";
	card.style.borderRadius = "12px";
	card.style.background = "white";
	card.style.fontFamily = "serif";

	const colX = [0.2, 0.5, 0.8].map(x => x * width);
	const rowY = [0.08, 0.23, 0.38, 0.53, 0.68].map(y => y * height);

	layout[rank].forEach(([col, row]) => {
		const pip = document.createElement("div");
		pip.textContent = suit;
		pip.style.position = "absolute";
		pip.style.left = (colX[col] - 10) + "px";
		pip.style.top = (rowY[row] - 12) + "px";
		pip.style.fontSize = Math.floor(height * 0.09) + "px";
		card.appendChild(pip);
	});

	// Top-left corner: rank and suit
	const top = document.createElement("div");
	top.innerHTML = `<div>${rank}</div><div style="text-align:center">${suit}</div>`;
	top.style.position = "absolute";
	top.style.left = "4px";
	top.style.top = "2px";
	top.style.fontSize = Math.floor(height * 0.08) + "px";
	card.appendChild(top);

	// Bottom-right corner (rotated)
	const bottom = top.cloneNode(true);
	bottom.style.left = "";
	bottom.style.right = "4px";
	bottom.style.top = "";
	bottom.style.bottom = "2px";
	bottom.style.transform = "rotate(180deg)";
	bottom.style.textAlign = "center";
	card.appendChild(bottom);

	return card;
}

function extractSymbols(svgString, symbolDict) {
	const symbolRegex = /<symbol id='([^']+)'[^>]*>[\s\S]*?<\/symbol>/g;

	let match;
	while ((match = symbolRegex.exec(svgString)) !== null) {
		const id = match[1];
		const fullSymbol = match[0];
		symbolDict[id] = fullSymbol;
	}

}

function downloadAsYaml(o, filename) {
	let y = jsyaml.dump(o);
	downloadAsText(y, filename + '.yaml');
}

function downloadAsText(text, filename) {
	const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(link.href);
}






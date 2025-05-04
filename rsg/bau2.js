
function extractSymbols(svgString,symbolDict) {
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






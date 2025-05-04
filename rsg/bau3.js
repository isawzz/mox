function updateSuit(svgStr, newLabel){  return updateCardValue(svgStr, newLabel, 1);} 
function updateRank(svgStr, newLabel) {  return updateCardValue(svgStr, newLabel, 0);}
function updateCardValue(svgStr, newLabel, index=0) {
  // Step 1: Extract all symbol IDs
  const symbolIdMatches = [...svgStr.matchAll(/<symbol id='([^']+)'/g)];
  const symbolIds = symbolIdMatches.map(match => match[1]);

  console.log('symbolIds', symbolIds); //return;

  // Step 2: Find the one for the value label (starts with 'VD')
  const valueSymbolId = symbolIds[index]; // symbolIds.find(id => id.startsWith('VD'));
  if (!valueSymbolId) return svgStr; // Fail-safe: nothing to change

  // Step 3: Replace the contents of that symbol with a text element
  const updatedSvg = svgStr.replace(
    new RegExp(`<symbol id='${valueSymbolId}'[^>]*>[\\s\\S]*?<\\/symbol>`),
    `<symbol id='${valueSymbolId}' viewBox='-500 -500 1000 1000' preserveAspectRatio='xMinYMid'>
       <text x='-200' y='300' font-size='800' font-family='serif' fill='red'>${newLabel}</text>
     </symbol>`
  );

  return updatedSvg;
}

function replaceCardLabel(svgStr, newLabel) {
  // Replace the #VD2 symbol definition with a text element
  svgStr = svgStr.replace(
    /<symbol id='VD2'[^>]*>[\s\S]*?<\/symbol>/,
    `<symbol id='VD2' viewBox='-500 -500 1000 1000' preserveAspectRatio='xMinYMid'>
      <text x='-200' y='300' font-size='800' font-family='serif' fill='red'>${newLabel}</text>
    </symbol>`
  );

  return svgStr;
}
function replaceCardRank(svgStr, newLabel) {
  // Match the value symbol ID, e.g., id='VD2', id='VDQ', etc.
  const match = svgStr.match(/<symbol id='(VD[^']*)'/);
  if (!match) return svgStr; // Fail-safe: return original if not found

  const symbolId = match[1]; console.log('symbolId', symbolId)

  // Replace that symbol's content with a <text> element showing newLabel
  const updatedSvg = svgStr.replace(
    new RegExp(`<symbol id='${symbolId}'[^>]*>[\\s\\S]*?<\\/symbol>`),
    `<symbol id='${symbolId}' viewBox='-500 -500 1000 1000' preserveAspectRatio='xMinYMid'>
       <text x='-200' y='300' font-size='800' font-family='serif' fill='red'>${newLabel}</text>
     </symbol>`
  );

  return updatedSvg;
}

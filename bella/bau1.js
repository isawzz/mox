
function gHighlight(poly, color = 'neon_yellow', mem = true) {
  if (mem) {
    let orig = mGetAttr(poly,'orig');
    if (nundef(orig)) mSetAttr(poly, 'orig', mGetAttr(poly, 'fill'));
  }
  mSetAttr(poly, 'fill', colorFrom(color));
}
function gUnhighlight(poly, color = 'grey', mem = true) {
  mSetAttr(poly, 'fill', mem ? mGetAttr(poly, 'orig') : color);
}

function onPolygonClick(ev) {
  let poly = ev.target; //console.log('poly', poly)
  if (DA.firstSelected === null) {
    DA.firstSelected = poly;
    gHighlight(poly);
  } else if (DA.pathHighlighted === null) {
    const path = shortestFacePath(DA.firstSelected, poly);
    console.log('path', path);
    if (path) {
      DA.pathHighlighted = path;
      for (const poly of path) { gHighlight(poly); }
    } else {
      console.log('No path found');
    }
  } else {
    for (const poly of DA.pathHighlighted) gUnhighlight(poly);
    DA.firstSelected = null;
    DA.pathHighlighted = null;
  }
  console.log('first',DA.firstSelected,'path',DA.pathHighlighted)
}



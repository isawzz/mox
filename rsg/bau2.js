
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


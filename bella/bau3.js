
function cryptidBoard(dParent, cols, rows, sz) {
	dParent = toElem(dParent);
	let [w, h] = [sz * cols + sz + 20, (sz * .75) * cols + 40];
	let dBoard = mDom(dParent, { w, h });

	let d = mDom(dBoard, { gap: 0, margin: 0, position: 'relative' });

	let clip = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

	let dihab = { mountain: 'gray', desert: 'yellow', forest: 'green', water: 'blue', swamp: 'brown' };
	let diterr = { all: null, bear: 'black', puma: 'red' };
	let distruct = { all: null, shack: 'green', stone:'grey', hut: 'brown', house: 'blue', castle: 'white'};

	let items = [];
	for (let r = 0; r < rows; r++) {
		let x = r % 2;
		let thiscols = x > 0 ? cols : cols + 1;
		for (let c = 0; c < cols; c++) {

			let gap = 2;
			let habitat = rChoose(Object.keys(dihab));
			let territory = rChoose(Object.keys(diterr));
			let structure = rChoose(Object.keys(distruct));
			let bg = dihab[habitat];

			let d1 = cryptidTile(d, x, r, sz, gap, clip, bg, territory, structure);
			let center=centerOfDiv(d1);
			items.push({ row:r, col:c, cx:center.x, cy:center.y, w:sz, h:sz, div: d1, habitat, territory, structure })

			x += 2;
		}
	}
	return items;
}

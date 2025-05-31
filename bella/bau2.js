
function mStyles(styles) {
	let res = {};
	for (const k in styles) {
		let key = k, val = styles[k];
		//console.log(key, val);
		if (k in STYLES) {
			let dival = STYLES[k];
			//console.log('dival', dival);
			if (typeof dival == 'function') {
				val = dival(val);
				if (isList(val)) [key, val] = val;
			}
			else if (isList(dival)) {
				[key, val] = dival;
				// assertion(false,'THE END')
			} else if (isString(dival)) key = dival;
			else val = dival;
		}
		let noUnit = ['opacity', 'flex', 'grow', 'shrink', 'grid', 'z', 'iteration', 'count', 'orphans', 'widows', 'weight', 'order', 'index'];
		let val1 = isNumber(val) && !noUnit.some(x => key.includes(x)) || key == 'fz' ? '' + Number(val) + 'px' : val;

		res[key] = val1;
	}
	return res;
}
function mStyle(elem, styles = {}, opts = {}) {
	elem = toElem(elem);
	let styles1 = mStyles(styles);
	for (const key in styles1) {
		elem.style.setProperty(key, styles1[key]);
	}
	// applyOpts(elem, opts);
}





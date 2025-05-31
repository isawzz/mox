
// === Cached style key processing ===
const _mStyleCache = new Map();
const NO_UNIT_KEYS = ['opacity', 'flex', 'grow', 'shrink', 'grid', 'z', 'iteration', 'count', 'orphans', 'widows', 'weight', 'order', 'index'];

function mStylesX(styles) {
	let res = {};
	for (const k in styles) {
		let origKey = k, val = styles[k];

		// === Lookup + cache transformed key/value handling ===
		let cacheEntry = _mStyleCache.get(k);
		if (!cacheEntry) {
			let newKey = k, converter = null;
			if (k in STYLES) {
				const mapped = STYLES[k];
				if (typeof mapped == 'function') {
					converter = mapped;
				} else if (Array.isArray(mapped)) {
					[newKey, val] = mapped; // fixed output
					_mStyleCache.set(k, [newKey, null, true]);
					res[newKey] = val;
					continue;
				} else if (typeof mapped == 'string') {
					newKey = mapped;
				} else {
					val = mapped;
				}
			}
			const needsPx = !NO_UNIT_KEYS.some(x => newKey.includes(x)) && newKey !== 'fz';
			_mStyleCache.set(k, [newKey, converter, needsPx]);
			cacheEntry = [newKey, converter, needsPx];
		}

		let [key, fn, needsPx] = cacheEntry;
		if (fn) {
			val = fn(val);
			if (Array.isArray(val)) [key, val] = val;
		}
		if (typeof val === 'number' && needsPx) val = val + 'px';
		res[key] = val;
	}
	return res;
}

function mStyleX(elem, styles = {}, opts = {}) {
	elem = toElem(elem);
	const styleObj = mStylesX(styles);
	for (const key in styleObj) {
		elem.style.setProperty(key, styleObj[key]);
	}
	applyOpts(elem, opts);
}

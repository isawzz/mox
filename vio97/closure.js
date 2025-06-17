
function addKeys(ofrom, oto) { for (const k in ofrom) if (!oto.hasOwnProperty(k)) oto[k] = ofrom[k]; return oto; }
function alphaToHex(a01) {
	a01 = Math.round(a01 * 100) / 100;
	var alpha = Math.round(a01 * 255);
	var hex = (alpha + 0x10000).toString(16).slice(-2).toUpperCase();
	return hex;
}
function applyOpts(d, opts = {}) {
	const aliases = {
		classes: 'className',
		inner: 'innerHTML',
		html: 'innerHTML',
		w: 'width',
		h: 'height',
	};
	for (const opt in opts) {
		let name = valf(aliases[opt], opt), val = opts[opt];
		if (name == 'recClick') { d.onclick = async (ev) => { recUserEvent(); await val(ev); } }
		else if (['style', 'tag', 'innerHTML', 'className', 'checked', 'value'].includes(name) || name.startsWith('on')) d[name] = val;
		else d.setAttribute(name, val);
	}
}
function arrCycle(arr, count) { return arrRotate(arr, count); }
function arrLast(arr) { return arr.length > 0 ? arr[arr.length - 1] : null; }
function arrNoDuplicates(arr) { return [...new Set(arr)]; }
function arrRange(from = 1, to = 10, step = 1) { let res = []; for (let i = from; i <= to; i += step)res.push(i); return res; }
function arrRemovip(arr, el) {
	let i = arr.indexOf(el);
	if (i > -1) arr.splice(i, 1);
	return i;
}
function arrRotate(arr, count) {
	var unshift = Array.prototype.unshift,
		splice = Array.prototype.splice;
	var len = arr.length >>> 0, count = count >> 0;
	let arr1 = jsCopy(arr);
	unshift.apply(arr1, splice.call(arr1, count % len, len));
	return arr1;
}
function arrShuffle(arr) { if (isEmpty(arr)) return []; else return fisherYates(arr); }
function assertion(cond) {
	if (!cond) {
		let args = [...arguments];
		for (const a of args) {
			console.log('\n', a);
		}
		throw new Error('TERMINATING!!!')
	}
}
function capitalize(s) {
	if (typeof s !== 'string') return '';
	return s.charAt(0).toUpperCase() + s.slice(1);
}
function coin(percent = 50) { return Math.random() * 100 < percent; }
function colorFrom(c, a) {
	c = colorToHex79(c);
	if (nundef(a)) return c;
	return c.substring(0, 7) + (a < 1 ? alphaToHex(a) : '');
}
function colorHex45ToHex79(c) {
	let r = c[1];
	let g = c[2];
	let b = c[3];
	if (c.length == 5) return `#${r}${r}${g}${g}${b}${b}${c[4]}${c[4]}`;
	return `#${r}${r}${g}${g}${b}${b}`;
}
function colorHex79ToRgbArray(c) {
	let r = 0, g = 0, b = 0;
	r = parseInt(c[1] + c[2], 16);
	g = parseInt(c[3] + c[4], 16);
	b = parseInt(c[5] + c[6], 16);
	if (c.length == 7) return [r, g, b];
	let a = parseInt(c[7] + c[8], 16) / 255;
	return [r, g, b, a];
}
function colorHexToRgbArray(c) {
	if (c.length < 7) c = colorHex45ToHex79(c);
	return colorHex79ToRgbArray(c);
}
function colorHexToRgbObject(c) {
	let arr = colorHexToRgbArray(c);
	let o = { r: arr[0], g: arr[1], b: arr[2] };
	if (arr.length > 3) o.a = arr[3];
	return o;
}
function colorHsl01ArgsToHex79(h, s, l, a) {
	let rgb = colorHsl01ArgsToRgbArray(h, s, l, a);
	let res = colorRgbArgsToHex79(rgb[0], rgb[1], rgb[2], rgb.length > 3 ? rgb[3] : null);
	return res;
}
function colorHsl01ArgsToRgbArray(h, s, l, a) {
	let r, g, b;
	function hue2rgb(p, q, t) {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1 / 6) return p + (q - p) * 6 * t;
		if (t < 1 / 2) return q;
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		return p;
	}
	if (s === 0) {
		r = g = b = l;
	} else {
		let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		let p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}
	let res = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	if (nundef(a) || a == 1) return res;
	res.push(a);
	return res;
}
function colorHsl01ObjectToHex79(c) {
	if (isdef(c.a)) return colorHsl01ArgsToHex79(c.h, c.s, c.l, c.a);
	return colorHsl01ArgsToHex79(c.h, c.s, c.l);
}
function colorHsl360ArgsToHex79(h, s, l, a) {
	let o01 = colorHsl360ArgsToHsl01Object(h, s, l, a);
	return colorHsl01ArgsToHex79(o01.h, o01.s, o01.l, o01.a)
}
function colorHsl360ArgsToHsl01Object(h, s, l, a) {
	let res = { h: h / 360, s: s / 100, l: l / 100 };
	if (isdef(a)) res.a = a;
	return res;
}
function colorHsl360ObjectToHex79(c) {
	let o01 = colorHsl360ArgsToHsl01Object(c.h, c.s, c.l, c.a);
	return colorHsl01ObjectToHex79(o01)
}
function colorHsl360StringToHex79(c) {
	let o360 = colorHsl360StringToHsl360Object(c);
	let o01 = colorHsl360ArgsToHsl01Object(o360.h, o360.s, o360.l, o360.a);
	return colorHsl01ObjectToHex79(o01);
}
function colorHsl360StringToHsl360Object(c) {
	let [h, s, l, a] = c.match(/\d+\.?\d*/g).map(Number);
	if (isdef(a) && a > 1) a /= 10;
	return { h, s, l, a };
}
function colorIdealText(bg, grayPreferred = false, nThreshold = 105) {
	let rgb = colorHexToRgbObject(colorFrom(bg));
	let r = rgb.r;
	let g = rgb.g;
	let b = rgb.b;
	var bgDelta = r * 0.299 + g * 0.587 + b * 0.114;
	var foreColor = 255 - bgDelta < nThreshold ? 'black' : 'white';
	if (grayPreferred) foreColor = 255 - bgDelta < nThreshold ? 'dimgray' : 'snow';
	return foreColor;
}
function colorIsHex79(c) { return isString(c) && c[0] == '#' && (c.length == 7 || c.length == 9); }
function colorRgbArgsToHex79(r, g, b, a) {
	r = Math.round(r).toString(16).padStart(2, '0');
	g = Math.round(g).toString(16).padStart(2, '0');
	b = Math.round(b).toString(16).padStart(2, '0');
	if (nundef(a)) return `#${r}${g}${b}`;
	a = Math.round(a * 255).toString(16).padStart(2, '0');
	return `#${r}${g}${b}${a}`;
}
function colorRgbArrayToHex79(arr) { return colorRgbArgsToHex79(...arr); }
function colorRgbStringToHex79(c) {
	let parts = c.split(',');
	let r = firstNumber(parts[0]);
	let g = firstNumber(parts[1]);
	let b = firstNumber(parts[2]);
	let a = parts.length > 3 ? Number(stringBefore(parts[3], ')')) : null;
	return colorRgbArgsToHex79(r, g, b, a);
}
function colorToHex79(c) {
	if (colorIsHex79(c)) return c;
	ColorDi = M.colorByName;
	let tString = isString(c), tArr = isList(c), tObj = isDict(c);
	if (tString && c[0] == '#') return colorHex45ToHex79(c);
	else if (tString && isdef(ColorDi) && lookup(ColorDi, [c])) { return ColorDi[c].hex; }
	else if (tString && c.startsWith('rand')) {
		let spec = capitalize(c.substring(4));
		let func = window['color' + spec];
		c = isdef(func) ? func() : rColor();
		assertion(colorIsHex79(c), 'ERROR coloFrom!!!!!!!!! (rand)');
		return c;
	} else if (tString && (c.startsWith('linear') || c.startsWith('radial'))) return c;
	else if (tString && c.startsWith('rgb')) return colorRgbStringToHex79(c);
	else if (tString && c.startsWith('hsl')) return colorHsl360StringToHex79(c);
	else if (tString && c == 'transparent') return '#00000000';
	else if (tString && c == 'inherit') return c;
	else if (tString) { ensureColorDict(); let c1 = ColorDi[c]; assertion(isdef(c1), `UNKNOWN color ${c}`); return c1.hex; }
	else if (tArr && (c.length == 3 || c.length == 4) && isNumber(c[0])) return colorRgbArrayToHex79(c);
	else if (tArr) return colorToHex79(rChoose(tArr));
	else if (tObj && 'h' in c && c.h > 1) { return colorHsl360ObjectToHex79(c); }
	else if (tObj && 'h' in c) return colorHsl01ObjectToHex79(c);
	else if (tObj && 'r' in c) return colorRgbArgsToHex79(c.r, c.g, c.b, c.a);
	assertion(false, `NO COLOR FOUND FOR ${c}`);
}
function colorTrans(cAny, alpha = 0.5) { return colorFrom(cAny, alpha); }
function dict2list(di, keyName = 'id') {
	let vals = Object.values(di);
	if (vals.length == 0) return [];
	let res = [];
	if (!isDict(vals[0])) {
		for (const v of vals) res.push({ value: v });
	} else res = vals;
	let keys = Object.keys(di);
	for (let i = 0; i < res.length; i++) { res[i][keyName] = keys[i]; }
	return res;
}
function ensureColorDict() {
	if (isdef(ColorDi)) return;
	ColorDi = {};
	let names = getColorNames();
	let hexes = getColorHexes();
	for (let i = 0; i < names.length; i++) {
		ColorDi[names[i].toLowerCase()] = { hex: '#' + hexes[i] };
	}
	const newcolors = {
		black: { hex: '#000000', D: 'schwarz' },
		blue: { hex: '#0000ff', D: 'blau' },
		BLUE: { hex: '#4363d8', E: 'blue', D: 'blau' },
		BLUEGREEN: { hex: '#004054', E: 'bluegreen', D: 'blaugrün' },
		BROWN: { hex: '#96613d', E: 'brown', D: 'braun' },
		deepyellow: { hex: '#ffed01', E: 'yellow', D: 'gelb' },
		FIREBRICK: { hex: '#800000', E: 'darkred', D: 'rotbraun' },
		gold: { hex: 'gold', D: 'golden' },
		green: { hex: 'green', D: 'grün' },
		GREEN: { hex: '#3cb44b', E: 'green', D: 'grün' },
		grey: { hex: 'grey', D: 'grau' },
		lightblue: { hex: 'lightblue', D: 'hellblau' },
		LIGHTBLUE: { hex: '#42d4f4', E: 'lightblue', D: 'hellblau' },
		lightgreen: { hex: 'lightgreen', D: 'hellgrün' },
		LIGHTGREEN: { hex: '#afff45', E: 'lightgreen', D: 'hellgrün' },
		lightyellow: { hex: '#fff620', E: 'lightyellow', D: 'gelb' },
		NEONORANGE: { hex: '#ff6700', E: 'neonorange', D: 'neonorange' },
		NEONYELLOW: { hex: '#efff04', E: 'neonyellow', D: 'neongelb' },
		olive: { hex: 'olive', D: 'oliv' },
		OLIVE: { hex: '#808000', E: 'olive', D: 'oliv' },
		orange: { hex: 'orange', D: 'orange' },
		ORANGE: { hex: '#f58231', E: 'orange', D: 'orange' },
		PINK: { hex: 'deeppink', D: 'rosa' },
		pink: { hex: 'pink', D: 'rosa' },
		purple: { hex: 'purple', D: 'lila' },
		PURPLE: { hex: '#911eb4', E: 'purple', D: 'lila' },
		red: { hex: 'red', D: 'rot' },
		RED: { hex: '#e6194B', E: 'red', D: 'rot' },
		skyblue: { hex: 'skyblue', D: 'himmelblau' },
		SKYBLUE: { hex: 'deepskyblue', D: 'himmelblau' },
		teal: { hex: '#469990', D: 'blaugrün' },
		TEAL: { hex: '#469990', E: 'teal', D: 'blaugrün' },
		transparent: { hex: '#00000000', E: 'transparent', D: 'transparent' },
		violet: { hex: 'violet', E: 'violet', D: 'violett' },
		VIOLET: { hex: 'indigo', E: 'violet', D: 'violett' },
		white: { hex: 'white', D: 'weiss' },
		yellow: { hex: 'yellow', D: 'gelb' },
		yelloworange: { hex: '#ffc300', E: 'yellow', D: 'gelb' },
		YELLOW: { hex: '#ffe119', E: 'yellow', D: 'gelb' },
	};
	for (const k in newcolors) {
		let cnew = newcolors[k];
		if (cnew.hex[0] != '#' && isdef(ColorDi[k])) cnew.hex = ColorDi[k].hex;
		ColorDi[k] = cnew;
	}
}
function evToId(ev) { let elem = findAncestorWithAttribute(ev.target, 'id'); return elem.id; }
function findAncestorWithAttribute(el, attrName) {
	while (el) {
		if (el.hasAttribute && el.hasAttribute(attrName)) return el;
		el = el.parentElement;
	}
	return null;
}
function firstNumber(s) {
	if (s) {
		let m = s.match(/-?\d+/);
		if (m) {
			let sh = m.shift();
			if (sh) { return Number(sh); }
		}
	}
	return null;
}
function fisherYates(arr) {
	if (arr.length == 2 && coin()) { return arr; }
	var rnd, temp;
	let last = arr[0];
	for (var i = arr.length - 1; i; i--) {
		rnd = Math.random() * i | 0;
		temp = arr[i];
		arr[i] = arr[rnd];
		arr[rnd] = temp;
	}
	return arr;
}
function getColorHexes(x) {
	return [
		'f0f8ff',
		'faebd7',
		'00ffff',
		'7fffd4',
		'f0ffff',
		'f5f5dc',
		'ffe4c4',
		'000000',
		'ffebcd',
		'0000ff',
		'8a2be2',
		'a52a2a',
		'deb887',
		'5f9ea0',
		'7fff00',
		'd2691e',
		'ff7f50',
		'6495ed',
		'fff8dc',
		'dc143c',
		'00ffff',
		'00008b',
		'008b8b',
		'b8860b',
		'a9a9a9',
		'a9a9a9',
		'006400',
		'bdb76b',
		'8b008b',
		'556b2f',
		'ff8c00',
		'9932cc',
		'8b0000',
		'e9967a',
		'8fbc8f',
		'483d8b',
		'2f4f4f',
		'2f4f4f',
		'00ced1',
		'9400d3',
		'ff1493',
		'00bfff',
		'696969',
		'696969',
		'1e90ff',
		'b22222',
		'fffaf0',
		'228b22',
		'ff00ff',
		'dcdcdc',
		'f8f8ff',
		'ffd700',
		'daa520',
		'808080',
		'808080',
		'008000',
		'adff2f',
		'f0fff0',
		'ff69b4',
		'cd5c5c',
		'4b0082',
		'fffff0',
		'f0e68c',
		'e6e6fa',
		'fff0f5',
		'7cfc00',
		'fffacd',
		'add8e6',
		'f08080',
		'e0ffff',
		'fafad2',
		'd3d3d3',
		'd3d3d3',
		'90ee90',
		'ffb6c1',
		'ffa07a',
		'20b2aa',
		'87cefa',
		'778899',
		'778899',
		'b0c4de',
		'ffffe0',
		'00ff00',
		'32cd32',
		'faf0e6',
		'ff00ff',
		'800000',
		'66cdaa',
		'0000cd',
		'ba55d3',
		'9370db',
		'3cb371',
		'7b68ee',
		'00fa9a',
		'48d1cc',
		'c71585',
		'191970',
		'f5fffa',
		'ffe4e1',
		'ffe4b5',
		'ffdead',
		'000080',
		'fdf5e6',
		'808000',
		'6b8e23',
		'ffa500',
		'ff4500',
		'da70d6',
		'eee8aa',
		'98fb98',
		'afeeee',
		'db7093',
		'ffefd5',
		'ffdab9',
		'cd853f',
		'ffc0cb',
		'dda0dd',
		'b0e0e6',
		'800080',
		'663399',
		'ff0000',
		'bc8f8f',
		'4169e1',
		'8b4513',
		'fa8072',
		'f4a460',
		'2e8b57',
		'fff5ee',
		'a0522d',
		'c0c0c0',
		'87ceeb',
		'6a5acd',
		'708090',
		'708090',
		'fffafa',
		'00ff7f',
		'4682b4',
		'd2b48c',
		'008080',
		'd8bfd8',
		'ff6347',
		'40e0d0',
		'ee82ee',
		'f5deb3',
		'ffffff',
		'f5f5f5',
		'ffff00',
		'9acd32'
	];
}
function getColorNames() {
	return [
		'AliceBlue',
		'AntiqueWhite',
		'Aqua',
		'Aquamarine',
		'Azure',
		'Beige',
		'Bisque',
		'Black',
		'BlanchedAlmond',
		'Blue',
		'BlueViolet',
		'Brown',
		'BurlyWood',
		'CadetBlue',
		'Chartreuse',
		'Chocolate',
		'Coral',
		'CornflowerBlue',
		'Cornsilk',
		'Crimson',
		'Cyan',
		'DarkBlue',
		'DarkCyan',
		'DarkGoldenRod',
		'DarkGray',
		'DarkGrey',
		'DarkGreen',
		'DarkKhaki',
		'DarkMagenta',
		'DarkOliveGreen',
		'DarkOrange',
		'DarkOrchid',
		'DarkRed',
		'DarkSalmon',
		'DarkSeaGreen',
		'DarkSlateBlue',
		'DarkSlateGray',
		'DarkSlateGrey',
		'DarkTurquoise',
		'DarkViolet',
		'DeepPink',
		'DeepSkyBlue',
		'DimGray',
		'DimGrey',
		'DodgerBlue',
		'FireBrick',
		'FloralWhite',
		'ForestGreen',
		'Fuchsia',
		'Gainsboro',
		'GhostWhite',
		'Gold',
		'GoldenRod',
		'Gray',
		'Grey',
		'Green',
		'GreenYellow',
		'HoneyDew',
		'HotPink',
		'IndianRed',
		'Indigo',
		'Ivory',
		'Khaki',
		'Lavender',
		'LavenderBlush',
		'LawnGreen',
		'LemonChiffon',
		'LightBlue',
		'LightCoral',
		'LightCyan',
		'LightGoldenRodYellow',
		'LightGray',
		'LightGrey',
		'LightGreen',
		'LightPink',
		'LightSalmon',
		'LightSeaGreen',
		'LightSkyBlue',
		'LightSlateGray',
		'LightSlateGrey',
		'LightSteelBlue',
		'LightYellow',
		'Lime',
		'LimeGreen',
		'Linen',
		'Magenta',
		'Maroon',
		'MediumAquaMarine',
		'MediumBlue',
		'MediumOrchid',
		'MediumPurple',
		'MediumSeaGreen',
		'MediumSlateBlue',
		'MediumSpringGreen',
		'MediumTurquoise',
		'MediumVioletRed',
		'MidnightBlue',
		'MintCream',
		'MistyRose',
		'Moccasin',
		'NavajoWhite',
		'Navy',
		'OldLace',
		'Olive',
		'OliveDrab',
		'Orange',
		'OrangeRed',
		'Orchid',
		'PaleGoldenRod',
		'PaleGreen',
		'PaleTurquoise',
		'PaleVioletRed',
		'PapayaWhip',
		'PeachPuff',
		'Peru',
		'Pink',
		'Plum',
		'PowderBlue',
		'Purple',
		'RebeccaPurple',
		'Red',
		'RosyBrown',
		'RoyalBlue',
		'SaddleBrown',
		'Salmon',
		'SandyBrown',
		'SeaGreen',
		'SeaShell',
		'Sienna',
		'Silver',
		'SkyBlue',
		'SlateBlue',
		'SlateGray',
		'SlateGrey',
		'Snow',
		'SpringGreen',
		'SteelBlue',
		'Tan',
		'Teal',
		'Thistle',
		'Tomato',
		'Turquoise',
		'Violet',
		'Wheat',
		'White',
		'WhiteSmoke',
		'Yellow',
		'YellowGreen'
	];
}
async function getDA(key, fast = true) {
	if (isdef(DA[key])) return DA[key];
	let loc = window.location.href;
	DA.isMoxito = loc.includes('moxito.online');
	DA.isLocal = !DA.isMoxito && !loc.includes('telecave');
	DA.isLive = !loc.includes('localhost');
	DA.project = stringAfterLast(stringBeforeLast(loc, '/'), '/'); //console.log('project', DA.project);
	DA.staticUrl = DA.isLive ? '../' : 'https://moxito.online/';
	DA.phpUrl = (DA.isLocal ? 'http://localhost:8080/mox/' : 'https://moxito.online/') + DA.project + '/php/';
	DA.flaskUrl = (DA.isLocal ? 'http://localhost:5000/' : 'https://moxito.online/flaskgame0/');
	DA.nodeUrl = (DA.isLocal ? 'http://localhost:3000/' : 'https://games.moxito.online/');
	if (!fast) {
		try {
			let flaskLocal = await fetch(DA.flaskUrl);
		} catch { DA.flaskUrl = 'https://moxito.online/flaskgame0/' }
		try {
			let nodeLocal = await fetch(DA.nodeUrl);
		} catch { DA.nodeUrl = 'https://games.moxito.online/' }
	}
	return DA[key];
}
function getListAndDictsForDicolors() {
	let bucketlist = Object.keys(M.dicolor);
	bucketlist = arrCycle(bucketlist, 8);
	let dicolorlist = [];
	for (const bucket of bucketlist) {
		let list = dict2list(M.dicolor[bucket]);
		for (const c of list) {
			let o = w3color(c.value);
			o.name = c.id;
			o.hex = c.value;
			o.bucket = bucket;
			dicolorlist.push(o);
		}
	}
	let byhex = list2dict(dicolorlist, 'hex');
	let byname = list2dict(dicolorlist, 'name');
	return [dicolorlist, byhex, byname];
}
function getNow() { return Date.now(); }
function getUID(pref = '') {
	UIDCounter += 1;
	return pref + '_' + UIDCounter;
}
function isDict(d) { let res = (d !== null) && (typeof (d) == 'object') && !isList(d); return res; }
function isEmpty(arr) {
	return arr === undefined || !arr
		|| (isString(arr) && (arr == 'undefined' || arr == ''))
		|| (Array.isArray(arr) && arr.length == 0)
		|| Object.entries(arr).length === 0;
}
function isList(arr) { return Array.isArray(arr); }
function isNumber(x) { return x !== ' ' && x !== true && x !== false && isdef(x) && (x == 0 || !isNaN(+x)); }
function isString(param) { return typeof param == 'string'; }
function isdef(x) { return x !== null && x !== undefined && x !== 'undefined'; }
function jsCopy(o) { return JSON.parse(JSON.stringify(o)); }
function jsonToYaml(o) { let y = jsyaml.dump(o); return y; }
function last(arr) {
	return arr.length > 0 ? arr[arr.length - 1] : null;
}
function list2dict(arr, keyprop = 'id', uniqueKeys = true) {
	let di = {};
	for (const a of arr) {
		let key = typeof (a) == 'object' ? a[keyprop] : a;
		if (uniqueKeys) lookupSet(di, [key], a);
		else lookupAddToList(di, [key], a);
	}
	return di;
}
async function loadAssetsStatic() {
	if (nundef(M)) M = {};
	M = await loadStaticYaml('y/m.yaml');
	M.superdi = await loadStaticYaml('y/superdi.yaml');
	M.details = await loadStaticYaml('y/details.yaml');
	M.config = await loadStaticYaml('y/config.yaml');
	M.users = await loadStaticYaml('y/users.yaml');
	loadColors();
	loadSuperdiAssets();
	if (nundef(M.asciiCapitals)) {
		let except = ["Noum", 'Bras', 'Reykja'];
		M.asciiCapitals = M.capital.filter(x => !x.includes('.') && !except.some(y => x.startsWith(y)));
	}
	let dict = M.c52Symbols = await loadStaticYaml('assets/c52symbols.yaml');
}
function loadColors(bh = 18, bs = 20, bl = 20) {
	if (nundef(M.dicolor)) {
		M.dicolor = dicolor;
	}
	if (nundef(M.colorList)) {
		[M.colorList, M.colorByHex, M.colorByName] = getListAndDictsForDicolors();
		M.colorNames = Object.keys(M.colorByName); M.colorNames.sort();
	}
	let list = M.colorList;
	for (const x of list) {
		let fg = colorIdealText(x.hex);
		x.fg = fg;
		x.sorth = Math.round(x.hue / bh) * bh;
		x.sortl = Math.round(x.lightness * 100 / bl) * bl;
		x.sorts = Math.round(x.sat * 100 / bs) * bs;
	}
	list = sortByMultipleProperties(list, 'fg', 'sorth', 'sorts', 'sortl', 'hue');
	return list;
}
async function loadStaticYaml(path) {
	let server = await getDA('staticUrl'); //console.log('server', server);
	let res = await fetch(server + path);
	if (!res.ok) return null;
	return jsyaml.load(await res.text());
}
function loadSuperdiAssets() {
	let [di, byType, byCat, allImages] = [M.superdi, {}, {}, {}];
	for (const k in di) {
		let o = di[k];
		for (const cat of o.cats) lookupAddIfToList(byCat, [cat], k);
		if (isdef(o.img)) {
			let fname = stringAfterLast(o.img, '/')
			allImages[k] = { fname, path: o.img, key: k };
		}
		if (isdef(o.photo)) {
			let fname = stringAfterLast(o.photo, '/')
			allImages[k + '_photo'] = { fname, path: o.photo, key: k };
		}
	}
	for (const k in M.superdi) { M.superdi[k].key = k; }
	M.allImages = allImages;
	M.byCat = byCat;
	M.categories = Object.keys(byCat); M.categories.sort();
	for (const k in M.superdi) {
		let o = M.superdi[k];
		for (const fk in Families) {
			if (isdef(o[fk])) { lookupAddIfToList(byType, [fk], k); }
		}
	}
	M.byType = byType;
}
function loadUsers() {
	console.log('hier werden users updated was immer zu tun ist!!!')
}
function lookup(dict, keys) {
	if (nundef(dict)) return null;
	let d = dict;
	let ilast = keys.length - 1;
	let i = 0;
	for (const k of keys) {
		if (k === undefined) break;
		let e = d[k];
		if (e === undefined || e === null) return null;
		d = d[k];
		if (i == ilast) return d;
		i += 1;
	}
	return d;
}
function lookupAddIfToList(dict, keys, val) {
	let lst = lookup(dict, keys);
	if (isList(lst) && lst.includes(val)) return;
	return lookupAddToList(dict, keys, val);
}
function lookupAddToList(dict, keys, val) {
	let d = dict;
	let ilast = keys.length - 1;
	let i = 0;
	for (const k of keys) {
		if (i == ilast) {
			if (nundef(k)) {
				console.assert(false, 'lookupAddToList: last key indefined!' + keys.join(' '));
				return null;
			} else if (isList(d[k])) {
				d[k].push(val);
			} else {
				d[k] = [val];
			}
			return d[k];
		}
		if (nundef(k)) continue;
		if (d[k] === undefined) d[k] = {};
		d = d[k];
		i += 1;
	}
	return d;
}
function lookupSet(dict, keys, val) {
	let d = dict;
	let ilast = keys.length - 1;
	let i = 0;
	for (const k of keys) {
		if (nundef(k)) continue;
		if (nundef(d[k])) d[k] = (i == ilast ? val : {});
		d = d[k];
		if (i == ilast) return d;
		i += 1;
	}
	return d;
}
function mAppend(d, child) { toElem(d).appendChild(child); return child; }
function mAreas(dParent, areas, gridCols, gridRows) {
	mClear(dParent); mStyle(dParent, { padding: 0 })
	let names = arrNoDuplicates(toWords(areas));
	let dg = mDom(dParent, { w100: true, h100: true, box: true });
	for (const name of names) {
		let d = mDom(dg, { family: 'opensans' }, { id: name });
		d.style.gridArea = name;
	}
	mStyle(dg, { display: 'grid', gridCols, gridRows });
	dg.style.gridTemplateAreas = areas;
	return names;
}
function mBy(id, what, elem) {
	if (nundef(elem)) elem = document;
	if (nundef(what)) return elem.getElementById(id);
	switch (what) {
		case 'class': return Array.from(elem.getElementsByClassName(id)); break;
		case 'tag': return Array.from(elem.getElementsByTagName(id)); break;
		case 'name': return Array.from(elem.getElementsByName(id)); break;
		case 'query': return Array.from(elem.querySelectorAll(id)); break;
		default: return elem.getElementById(id);
	}
}
function mClass(d) {
	d = toElem(d);
	if (arguments.length == 2) {
		let arg = arguments[1];
		if (isString(arg) && arg.indexOf(' ') > 0) { arg = toWords(arg); }
		else if (isString(arg)) arg = [arg];
		if (isList(arg)) {
			for (let i = 0; i < arg.length; i++) {
				d.classList.add(arg[i]);
			}
		}
	} else for (let i = 1; i < arguments.length; i++) d.classList.add(arguments[i]);
}
function mClassRemove(d) { d = toElem(d); for (let i = 1; i < arguments.length; i++) d.classList.remove(arguments[i]); }
function mClear(d) {
	d = toElem(d); if (d) d.innerHTML = '';
}
function mCreate(tag, styles, id) { let d = document.createElement(tag); if (isdef(id)) d.id = id; if (isdef(styles)) mStyle(d, styles); return d; }
function mDom(dParent, styles = {}, opts = {}) {
	let tag = valf(opts.tag, 'div');
	let d = document.createElement(tag);
	if (tag == 'textarea') styles.wrap = 'hard';
	mStyle(d, styles);
	applyOpts(d, opts);
	if (isdef(dParent)) mAppend(dParent, d);
	return d;
}
async function mGetFilenames(dir) {
	let res = await mPhpPost('all', { action: 'dir', dir });
	return res.dir.filter(x => x != '.' && x != '..');
}
function mInsert(dParent, elem, index = 0) {
	dParent = toElem(dParent)
	if (dParent.childNodes.length <= index) {
		dParent.appendChild(elem);
	} else {
		dParent.insertBefore(elem, dParent.childNodes[index]);
	}
	return elem;
}
function mKey(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let o = imgKey.includes('.') ? { src: imgKey } : opts.prefer == 'plain' ? { plain: imgKey } : lookup(M.superdi, [imgKey]);
	let type = opts.prefer;
	let types = ['src', 'img', 'photo', 'uni', 'emo', 'fa6', 'fa', 'ga', 'plain'];
	if (nundef(o[type])) type = types.find(x => isdef(o[x]));
	let d0 = mDom(d, styles, opts);
	let [w, h] = mSizeSuccession(styles, 100);
	if (['img', 'src', 'photo'].includes(type)) {
		let astyle = { w, h, fit: o && o.cats.includes('card') ? 'contain' : 'cover', 'object-position': 'center center' };
		mDom(d0, astyle, { ...opts, tag: 'img', src: o[type], alt: imgKey });
	} else if (type == 'plain') {
		let [family, fz] = [valf(styles.family, 'opensans'), valf(styles.fz, 12)]; console.log('fz', fz)
		let x = mDom(d0, { family, fz }, { ...opts, html: o[type] }); console.log(x)
	} else {
		let family = Families[type] || 'inherit';
		let text = ['fa6', 'fa', 'ga'].includes(type) ? `&#x${o[type]};` : o[type];
		let fz = styles.fz;
		let astyles = {
			fz,
			family,
		};
		let x = mDom(d0, astyles, { ...opts, html: text });
	}
	return d0;
}
function mLayout(dParent, rowlist, colt, rowt, styles = {}, opts = {}) {
	dParent = toElem(dParent);
	mStyle(dParent, styles);
	rowlist = rowlist.map(x => x.replaceAll('@', valf(opts.suffix, ''))); //console.log(rowlist);
	rowt = rowt.replaceAll('@', valf(opts.hrow, 30));
	colt = colt.replaceAll('@', valf(opts.wcol, 30));
	let areas = `'${rowlist.join("' '")}'`;
	if (nundef(M.divNames)) M.divNames = [];
	let newNames = mAreas(dParent, areas, colt, rowt);
	let names = M.divNames = Array.from(new Set(M.divNames.concat(newNames)));
	if (nundef(styles.bgSrc)) mShade(newNames, 2, 1);
	return names.map(x => mBy(x));
}
function mLayoutTM(dParent, styles = {}, opts = {}, hrow = 30) {
	let rowlist = [`dTop@`, `dMain@`];
	let colt = `1fr`;
	let rowt = `minmax(@px, auto) 1fr`;
	return mLayout(dParent, rowlist, colt, rowt, styles, opts);
}
function mNode(o, dParent, title, isSized = false) {
	let d = mCreate('div');
	mYaml(d, o);
	let pre = d.getElementsByTagName('pre')[0];
	pre.style.fontFamily = 'inherit';
	if (isdef(title)) mInsert(d, mText(title));
	if (isdef(dParent)) mAppend(dParent, d);
	if (isDict(o)) d.style.textAlign = 'left';
	if (isSized) addClass(d, 'centered');
	return d;
}
async function mPhpPost(cmd, o, verbose = false, jsonResult = true) {
	let server = await getDA('phpUrl');
	if (isdef(o.path) && (o.path.startsWith('zdata') || o.path.startsWith('y'))) o.path = '../../' + o.path;
	if (verbose) console.log('to php:', server + `${cmd}.php`, o);
	let res = await fetch(server + `${cmd}.php`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(o),
		}
	);
	let text;
	try {
		text = await res.text();
		if (!jsonResult) {
			return text;
		}
		let obj = JSON.parse(text);
		if (verbose) console.log('from php:\n', obj);
		let mkeys = ["config", "superdi", "users", "details"];
		for (const k of mkeys) {
			if (isdef(obj[k])) {
				M[k] = obj[k];
				if (k == "superdi") {
					loadSuperdiAssets();
				} else if (k == "users") {
					loadUsers();
				}
			}
		}
		return obj;
	} catch (e) {
		return isString(text) ? text : e;
	}
}
function mShade(names, offset = 1, contrast = 1) {
	let palette = paletteTransWhiteBlack(names.length * contrast + 2 * offset).slice(offset);
	for (const name of names) {
		let d = toElem(name);
		mStyle(d, { bg: palette.shift(), fg: 'contrast', box: true });
	}
}
function mSizeSuccession(styles = {}, szDefault = 100, fromWidth = true) {
	let [w, h] = [styles.w, styles.h];
	if (fromWidth) {
		w = valf(w, styles.sz, h, szDefault);
		h = valf(h, styles.sz, w, szDefault);
	} else {
		h = valf(h, styles.sz, w, szDefault);
		w = valf(w, styles.sz, h, szDefault);
	}
	return [w, h];
}
function mSleep(ms = 1000) {
	return new Promise(
		(res, rej) => {
			if (ms > 10000) { ms = 10000; }
			if (isdef(TO.SLEEPTIMEOUT)) clearTimeout(TO.SLEEPTIMEOUT);
			TO.SLEEPTIMEOUT = setTimeout(res, ms);
		});
}
function mStyle(elem, styles = {}, opts = {}) {
	elem = toElem(elem);
	let styles1 = mStyles(styles);
	for (const key in styles1) {
		elem.style.setProperty(key, styles1[key]);
	}
	applyOpts(elem, opts);
}
function mStyles(styles) {
	let res = {};
	for (const k in styles) {
		let key = k, val = styles[k];
		if (k in STYLES) {
			let dival = STYLES[k];
			if (typeof dival == 'function') {
				val = dival(val, styles.bg);
				if (isList(val)) [key, val] = val;
			}
			else if (isList(dival)) {
				[key, val] = dival;
			} else if (isString(dival)) key = dival;
			else val = dival;
		}
		let val1 = isNumber(val) && !NO_UNIT_STYLES.some(x => key.startsWith(x)) || key == 'fz' ? '' + Number(val) + 'px' : val;
		res[key] = val1;
	}
	return res;
}
function mText(text, dParent, styles, classes) {
	if (!isString(text)) text = text.toString();
	let d = mDom(dParent);
	if (!isEmpty(text)) { d.innerHTML = text; }
	if (isdef(styles)) mStyle(d, styles);
	if (isdef(classes)) mClass(d, classes);
	return d;
}
function mYaml(d, js) {
	d.innerHTML = '<pre>' + jsonToYaml(js) + '</pre>';
}
function nundef(x) { return x === null || x === undefined || x === 'undefined'; }
function onclickItem(ev) { toggleSelection(evToId(ev), DA.selectedImages); }
function paletteTransWhiteBlack(n = 9) {
	let c = 'white';
	let pal = [c];
	let [iw, ib] = [Math.floor(n / 2), Math.floor((n - 1) / 2)];
	let [incw, incb] = [1 / (iw + 1), 1 / (ib + 1)];
	for (let i = 1; i < iw; i++) {
		let alpha = 1 - i * incw;
		pal.push(colorTrans(c, alpha));
	}
	pal.push('transparent');
	c = 'black';
	for (let i = 1; i < ib; i++) {
		let alpha = i * incb;
		pal.push(colorTrans(c, alpha));
	}
	pal.push(c);
	return pal;
}
function rChoose(arr, n = 1, func = null, exceptIndices = null) {
	if (isDict(arr)) arr = dict2list(arr, 'key');
	let indices = arrRange(0, arr.length - 1);
	if (isdef(exceptIndices)) {
		for (const i of exceptIndices) removeInPlace(indices, i);
	}
	if (isdef(func)) indices = indices.filter(x => func(arr[x]));
	if (n == 1) {
		let idx = Math.floor(Math.random() * indices.length);
		return arr[indices[idx]];
	}
	arrShuffle(indices);
	return indices.slice(0, n).map(x => arr[x]);
}
function rColor(lum100OrAlpha01 = 1, alpha01 = 1, hueVari = 60) {
	let c;
	if (lum100OrAlpha01 <= 1) {
		c = '#';
		for (let i = 0; i < 6; i++) { c += rChoose(['f', 'c', '9', '6', '3', '0']); }
		alpha01 = lum100OrAlpha01;
	} else {
		let hue = rHue(hueVari);
		let sat = 100;
		let b = isNumber(lum100OrAlpha01) ? lum100OrAlpha01 : lum100OrAlpha01 == 'dark' ? 25 : lum100OrAlpha01 == 'light' ? 75 : 50;
		c = colorHsl360ArgsToHex79(hue, sat, b);
	}
	return alpha01 < 1 ? colorTrans(c, alpha01) : c;
}
function rHue(vari = 36) { return (rNumber(0, vari) * Math.round(360 / vari)) % 360; }
function rNumber(min = 0, max = 100) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function range(f, t, st = 1) {
	if (nundef(t)) {
		t = f - 1;
		f = 0;
	}
	let arr = [];
	for (let i = f; i <= t; i += st) {
		arr.push(i);
	}
	return arr;
}
function recUserEvent() { DA.prevEvUser = DA.evUser; DA.evUser = getNow(); DA.evList.push({ user: DA.evUser }); }
function removeInPlace(arr, el) {
	arrRemovip(arr, el);
}
function replaceAll(str, search, replacement) {
	return str.split(search).join(replacement);
}
async function showKeys(keys, d) {
	let centered = { display: 'flex', alignItems: 'center', justifyContent: 'center', baseline: 'middle' };
	mClear(d);
	let [gap, w, h] = [10, 100, 100];
	let dGrid = mDom(d, { display: 'flex', fg: 'black', gap, padding: gap, wrap: true });
	let i = 0;
	let n = Math.floor(window.innerWidth / (w + gap)) * Math.floor(window.innerHeight / (h + gap)); console.log('n', n);
	for (const k of keys) {
		let d = mDom(dGrid, { bg: 'silver', padding: gap, cursor: 'pointer' }, { id: getUID(), onclick: onclickItem });
		let x = mKey(k, d, { w, h, fz: h, hline: h, box: true, fg: 'black', bg: 'white' }, { special: true });
		mDom(d, { w, fg: 'black', 'text-overflow': 'ellipsis', 'white-space': 'nowrap', overflow: 'hidden', fz: 16, align: 'center' }, { html: k, title: k });
		DA.items[d.id] = { div: d, key: k };
		if (0 === ++i % n) await mSleep(20);
	}
}
function showObject(o, keys, dParent, styles = {}, opts = {}) {
	if (nundef(keys)) { keys = Object.keys(o); opts.showKeys = true; styles.align = 'left' }
	addKeys({ align: 'center', padding: 2, bg: 'dimgrey', fg: 'contrast' }, styles);
	let d = mDom(dParent, styles, opts);
	let onew = {};
	for (const k of keys) onew[k] = o[k];
	mNode(onew, d, opts.title);
	return d;
}
function sortByMultipleProperties(list) {
	let props = Array.from(arguments).slice(1);
	return list.sort((a, b) => {
		for (const p of props) {
			if (a[p] < b[p]) return -1;
			if (a[p] > b[p]) return 1;
		}
		return 0;
	});
}
async function start() { await test0_p5(); }
function startsWith(s, sSub) {
	return s.substring(0, sSub.length) == sSub;
}
function stringAfterLast(sFull, sSub) {
	let parts = sFull.split(sSub);
	return arrLast(parts);
}
function stringBefore(sFull, sSub) {
	let idx = sFull.indexOf(sSub);
	if (idx < 0) return sFull;
	return sFull.substring(0, idx);
}
function stringBeforeLast(sFull, sSub) {
	let parts = sFull.split(sSub);
	return sFull.substring(0, sFull.length - arrLast(parts).length - 1);
}
function toElem(d) { return isString(d) ? mBy(d) : d; }
function toWords(s, allow_ = false) {
	let arr = allow_ ? s.split(/[\W]+/) : s.split(/[\W|_]+/);
	return arr.filter(x => !isEmpty(x));
}
function toggleSelection(id, selist, className = 'framedPicture') {
	if (selist.includes(id)) { removeInPlace(selist, id); mClassRemove(id, className); } else { selist.push(id); mClass(id, className); }
}
function valf() {
	for (const arg of arguments) if (isdef(arg)) return arg;
	return null;
}

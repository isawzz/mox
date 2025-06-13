
var A = null;
const ANIM = {};
var Animation1;
var B = {};
const BLUE = '#4363d8';
const BLUEGREEN = '#004054';
const BROWN = '#96613d';
const CORNERS = ['◢', '◣', '◤', '◥'];
var Categories;
var ColorDi;
var ColorThiefObject;
var DA = {};
const FIREBRICK = '#800000';
const GREEN = '#3cb44b';
var I;
var IsControlKeyDown = false;
var Items = {};
const LIGHTBLUE = '#42d4f4';
const LIGHTGREEN = '#afff45';
var M = {};
var MAGNIFIER_IMAGE;
var Menu = null;
const NEONORANGE = '#ff6700';
const NEONYELLOW = '#efff04';
const OLIVE = '#808000';
const ORANGE = '#f58231';
var P;
const PURPLE = '#911eb4';
var Pictures = [];
var Players;
var PolyClips = {
	diamond: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
	hex: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
	test1: 'inset(50% 0% 100% 25% 100% 75% 50% 100% 0% 75% 0% 25% round 10px)',
	test0: 'inset(45% 0% 33% 10% round 10px)',
	hexagon: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
	hexF: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
	hexFlat: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
	hexflat: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
	rect: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
	sq: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
	square: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
	tri: 'polygon(50% 0%, 100% 100%, 0% 100%)',
	triangle: 'polygon(50% 0%, 100% 100%, 0% 100%)',
	triUp: 'polygon(50% 0%, 100% 100%, 0% 100%)',
	triup: 'polygon(50% 0%, 100% 100%, 0% 100%)',
	triDown: 'polygon(0% 0%, 100% 0%, 50% 100%)',
	tridown: 'polygon(0% 0%, 100% 0%, 50% 100%)',
	triright: 'polygon(0% 0%, 100% 50%, 0% 100%)',
	triRight: 'polygon(0% 0%, 100% 50%, 0% 100%)',
	trileft: 'polygon(0% 50%, 100% 0%, 100% 100%)',
	triLeft: 'polygon(0% 50%, 100% 0%, 100% 100%)',
	splayup: 'polygon(0% 70%, 100% 70%, 100% 100%, 0% 100%)',
}
const RED = '#e6194B';
var S = {};
var SLEEP_WATCHER = null;
const STYLE_PARAMS = {
	acontent: 'align-content',
	aitems: 'align-items',
	align: 'text-align',
	aspectRatio: 'aspect-ratio',
	bg: 'background-color',
	bgBlend: 'background-blend-mode', //'mix-blend-mode', //
	bgImage: 'background-image',
	bgRepeat: 'background-repeat',
	bgSize: 'background-size',
	deco: 'text-decoration',
	dir: 'flex-direction',
	family: 'font-family',
	fg: 'color',
	fontSize: 'font-size',
	fStyle: 'font-style',
	fz: 'font-size',
	gridCols: 'grid-template-columns',
	gridRows: 'grid-template-rows',
	h: 'height',
	hgap: 'column-gap',
	hmin: 'min-height',
	hmax: 'max-height',
	hline: 'line-height',
	jcontent: 'justify-content',
	jitems: 'justify-items',
	justify: 'justify-content',
	matop: 'margin-top',
	maleft: 'margin-left',
	mabottom: 'margin-bottom',
	maright: 'margin-right',
	origin: 'transform-origin',
	overx: 'overflow-x',
	overy: 'overflow-y',
	patop: 'padding-top',
	paleft: 'padding-left',
	pabottom: 'padding-bottom',
	paright: 'padding-right',
	place: 'place-items',
	rounding: 'border-radius',
	valign: 'align-items',
	vgap: 'row-gap',
	w: 'width',
	wmin: 'min-width',
	wmax: 'max-width',
	weight: 'font-weight',
	x: 'left',
	xover: 'overflow-x',
	y: 'top',
	yover: 'overflow-y',
	z: 'z-index'
};
var Serverdata = {};
var Settings;
var Socket = null;
var Syms;
var T = null;
const TEAL = '#469990';
var TESTING = false;
var TO = {};
var TOFleetingMessage;
var Tid = null;
var U = {};
var UI = {};
var UID = 0;
var UIDCounter = 0;
var WhichCorner = 0;
const YELLOW = '#ffe119';
var Z;
var Zones = {};
function addDummy(dParent, place) {
	let b = mButton('', null, dParent, { opacity: 0, h: 0, w: 0, padding: 0, margin: 0, outline: 'none', border: 'none', bg: 'transparent' });
	if (isdef(place)) mPlace(b, place);
	b.id = 'dummy';
}
function addIf(arr, el) { if (!arr.includes(el)) arr.push(el); }
function addKeys(ofrom, oto) { for (const k in ofrom) if (nundef(oto[k])) oto[k] = ofrom[k]; return oto; }
function allElementsFromPoint(x, y) {
	var element, elements = [];
	var old_visibility = [];
	while (true) {
		element = document.elementFromPoint(x, y);
		if (!element || element === document.documentElement) {
			break;
		}
		elements.push(element);
		old_visibility.push(element.style.visibility);
		element.style.visibility = 'hidden';
	}
	for (var k = 0; k < elements.length; k++) {
		elements[k].style.visibility = old_visibility[k];
	}
	elements.reverse();
	return elements;
}
function allNumbers(s, func) {
	let m = s.match(/\-.\d+|\-\d+|\.\d+|\d+\.\d+|\d+\b|\d+(?=\w)/g);
	if (nundef(m)) return [];
	let arr = m.map(v => +v);
	if (isdef(func)) arr = arr.map(x => func(x));
	return arr;
}
function allPlToPlayer(name) {
	let allPl = DA.allPlayers[name];
	return jsCopyExceptKeys(allPl, ['div', 'isSelected']);
}
function alphaToHex(a01) {
	a01 = Math.round(a01 * 100) / 100;
	var alpha = Math.round(a01 * 255);
	var hex = (alpha + 0x10000).toString(16).slice(-2).toUpperCase();
	return hex;
}
function amIHuman(table) { return isPlayerHuman(table, getUname()); }
function animatedTitle(msg = 'DU BIST DRAN!!!!!') {
	TO.titleInterval = setInterval(() => {
		let corner = CORNERS[WhichCorner++ % CORNERS.length];
		document.title = `${corner} ${msg}`; //'⌞&amp;21543;    U+231E \0xE2Fo\u0027o Bar';
	}, 1000);
}
function arrAllSameOrDifferent(arr) {
	if (arr.length === 0) {
		return true;
	}
	const allSame = arr.every(element => element === arr[0]);
	if (allSame) {
		return true;
	}
	const uniqueElements = new Set(arr);
	const allDifferent = uniqueElements.size === arr.length;
	return allDifferent;
}
function arrAverage(arr, prop) {
	if (isDict(arr)) arr = Object.values(arr);
	let n = arr.length; if (!n) return 0;
	let sum = arrSum(arr, prop);
	return sum / n;
}
function arrBalancedAverage(arr, prop) {
	if (arr.length != 2) return arrAverage(arr, prop);
	let o = arrMinMax(arr, x => x[prop]);
	let [min, max] = [o.min, o.max];
	if (max < min * 1000) return (min + max) / 2;
	let s = '' + max; //console.log('smax',s)
	let snew = '';
	for (let i = 0; i < s.length; i++) {
		let ch = s[i];
		if (ch == '0' || ch == '.') snew += ch; else snew += '1';
	}
	let nnew = Number(snew);
	return (min + nnew) / 2;
}
function arrCycle(arr, count) { return arrRotate(arr, count); }
function arrFindKeywordFromIndex(keywords, words, iStart) {
	for (let i = iStart; i < words.length; i++) {
		let w = words[i];
		if (keywords.some(x => x == w)) return { i, w };
	}
	return null;
}
function arrLast(arr) { return arr.length > 0 ? arr[arr.length - 1] : null; }
function arrMinMax(arr, func) {
	if (nundef(func)) func = x => x;
	else if (isString(func)) { let val = func; func = x => x[val]; }
	let min = func(arr[0]), max = func(arr[0]), imin = 0, imax = 0;
	for (let i = 1, len = arr.length; i < len; i++) {
		let v = func(arr[i]);
		if (v < min) {
			min = v; imin = i;
		} else if (v > max) {
			max = v; imax = i;
		}
	}
	return { min: min, imin: imin, max: max, imax: imax, elmin: arr[imin], elmax: arr[imax] };
}
function arrMinus(arr, b) { if (isList(b)) return arr.filter(x => !b.includes(x)); else return arr.filter(x => x != b); }
function arrNext(list, el) {
	let iturn = list.indexOf(el);
	let elnext = list[(iturn + 1) % list.length];
	return elnext;
}
function arrRange(from = 1, to = 10, step = 1) { let res = []; for (let i = from; i <= to; i += step)res.push(i); return res; }
function arrRemovip(arr, el) {
	let i = arr.indexOf(el);
	if (i > -1) arr.splice(i, 1);
	return i;
}
function arrReplace1(arr, elweg, eldazu) {
	let i = arr.indexOf(elweg);
	arr[i] = eldazu;
	return arr;
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
function arrSum(arr, props) {
	if (nundef(props)) return arr.reduce((a, b) => a + b);
	if (!isList(props)) props = [props];
	return arr.reduce((a, b) => a + (lookup(b, props) || 0), 0);
}
function arrTake(arr, n = 0, from = 0) {
	if (isDict(arr)) {
		let keys = Object.keys(arr);
		return n > 0 ? keys.slice(from, from + n).map(x => (arr[x])) : keys.slice(from).map(x => (arr[x]));
	} else return n > 0 ? arr.slice(from, from + n) : arr.slice(from);
}
function arrTakeFromTo(arr, a, b) { return takeFromTo(arr, a, b); }
function arrTakeWhile(arr, func) {
	let res = [];
	for (const a of arr) {
		if (func(a)) res.push(a); else break;
	}
	return res;
}
function arrWithout(arr, b) { return arrMinus(arr, b); }
function assertion(cond) {
	if (!cond) {
		let args = [...arguments];
		for (const a of args) {
			console.log('\n', a);
		}
		throw new Error('TERMINATING!!!')
	}
}
function bgImageFromPath(path) { return isdef(path) ? `url('${path}')` : null; }
function button96() {
	function setup(table) {
		let fen = {};
		for (const name in table.players) {
			let pl = table.players[name];
			pl.score = 0;
		}
		fen.cards = [1, 2, 3];
		fen.deck = range(4, table.options.numCards);
		table.plorder = jsCopy(table.playerNames);
		table.turn = jsCopy(table.playerNames);
		return fen;
	}
	function stats(table) {
		let [me, players] = [getUname(), table.players];
		let style = { patop: 8, mabottom: 20, wmin: 80, bg: 'beige', fg: 'contrast' };
		let player_stat_items = uiTypePlayerStats(table, me, 'dStats', 'rowflex', style)
		for (const plname in players) {
			let pl = players[plname];
			let item = player_stat_items[plname];
			if (pl.playmode == 'bot') { mStyle(item.img, { rounding: 0 }); }
			let d = iDiv(item); mCenterFlex(d); mLinebreak(d); mIfNotRelative(d);
			playerStatCount('star', pl.score, d); //, {}, {id:`stat_${plname}_score`});
		}
	}
	function present(table) {
		let fen = table.fen;
		mStyle('dTable', { padding: 25, w: 400, h: 400 });
		let d = mDom('dTable', { gap: 10, padding: 0 }); mCenterFlex(d);
		let items = [];
		for (const card of fen.cards) {
			let item = cNumber(card);
			mAppend(d, iDiv(item));
			items.push(item);
		}
		return items;
	}
	async function activate(table, items) {
		await showInstructionStandard(table, 'must click a card'); //browser tab and instruction if any
		if (!isMyTurn(table)) { return; }
		for (const item of items) {
			let d = iDiv(item);
			mStyle(d, { cursor: 'pointer' });
			d.onclick = ev => onclickCard(table, item, items);
		}
		if (isEmpty(table.fen.cards)) return gameoverScore(table);
		if (amIHuman(table) && table.options.gamemode == 'multi') return;
		let name = amIHuman(table) && table.options.gamemode == 'solo' ? someOtherPlayerName(table) : getUname();
		if (nundef(name)) return;
		await botMove(name, table, items);
	}
	async function botMove(name, table, items) {
		let ms = rChoose(range(2000, 5000));
		TO.bot = setTimeout(async () => {
			let item = rChoose(items);
			toggleItemSelection(item);
			TO.bot1 = setTimeout(async () => await evalMove(name, table, item.key), 500);
		}, rNumber(ms, ms + 2000));
	}
	async function onclickCard(table, item, items) {
		toggleItemSelection(item);
		try { await mSleep(200); } catch (err) { return; }
		await evalMove(getUname(), table, item.key);
	}
	async function evalMove(name, table, key) {
		clearEvents();
		mShield('dTable', { bg: 'transparent' });
		let id = table.id;
		let step = table.step;
		let best = arrMinMax(table.fen.cards).min;
		let succeed = key == best;
		if (succeed) {
			table.players[name].score += 1;
			let fen = table.fen;
			let newCards = deckDeal(fen.deck, 1);
			if (newCards.length > 0) arrReplace1(fen.cards, key, newCards[0]); else removeInPlace(fen.cards, key);
		} else {
			table.players[name].score -= 1;
		}
		lookupAddToList(table, ['moves'], { step, name, move: key, change: succeed ? '+1' : '-1', score: table.players[name].score });
		let o = { id, name, step, table };
		if (succeed) o.stepIfValid = step + 1;
		let res = await mPostRoute('table', o);
	}
	return { setup, present, stats, activate };
}
function cBlank(dParent, styles = {}, opts = {}) {
	if (nundef(styles.h)) styles.h = valf(styles.sz, 100);
	if (nundef(styles.w)) styles.w = styles.h * .7;
	if (nundef(styles.bg)) styles.bg = 'white';
	styles.position = 'relative';
	if (nundef(styles.rounding)) styles.rounding = Math.min(styles.w, styles.h) / 21;
	addKeys({ className: 'card' }, opts);
	let d = mDom(dParent, styles, opts);
	opts.type = 'card';
	addKeys(styles, opts);
	let item = mItem(d ? { div: d } : {}, opts);
	return item;
}
function cNumber(ckey, styles = {}, opts = {}) {
	addKeys({ border: 'silver', h: 100 }, styles);
	addKeys({ backcolor: BLUE, ov: .3, key: ckey, type: 'num' }, opts);
	let c = cPortrait(null, styles, opts);
	if (isNumeric(ckey)) { ckey = `${ckey}_blue`; }
	let sym = c.rank = stringBefore(ckey, '_');
	let color = c.suit = c.val = stringAfter(ckey, '_');
	let sz = c.h;
	let [sm, lg, w, h] = [sz / 8, sz / 4, c.w, c.h];
	let styleSmall = { fg: color, h: sm, fz: sm, hline: sm, weight: 'bold' };
	cPrintSym(c, sym, styleSmall, 'tl')
	cPrintSym(c, sym, styleSmall, 'tr')
	styleSmall.transform = 'rotate(180deg)';
	cPrintSym(c, sym, styleSmall, 'bl')
	cPrintSym(c, sym, styleSmall, 'br')
	let styleBig = { matop: (h - lg) / 2, family: 'algerian', fg: color, fz: lg, h: lg, w: w, hline: lg, align: 'center' }
	styleBig = { display: 'inline', family: 'algerian', fg: color, fz: lg, hline: lg }
	cPrintSym(c, sym, styleBig, 'cc')
	return c;
}
function cPortrait(dParent, styles = {}, opts = {}) {
	if (nundef(styles.h)) styles.h = 100;
	if (nundef(styles.w)) styles.w = styles.h * .7;
	return cBlank(dParent, styles, opts);
}
function cPrintSym(card, sym, styles, pos) {
	let d = iDiv(card);
	let opts = {};
	if (isNumber(sym)) {
		opts.html = sym;
	} else if (sym.includes('/')) {
		opts.tag = 'img';
		opts.src = sym;
	}
	let d1 = mDom(d, styles, opts);
	mPlace(d1, pos, pos[0] == 'c' ? 0 : 2, pos[1] == 'c' ? 0 : 2);
}
function calcBotLevel(table) {
	let humanPlayers = dict2list(table.players).filter(x => x.playmode == 'human');
	if (isEmpty(humanPlayers) || getGameOption('use_level') == 'no') return null;
	let level = arrAverage(humanPlayers, 'level');
	return level;
}
function calcLifespan(s) {
	let arr = allNumbers(s, Math.abs);
	let num, unit, lifespan;
	if (!isEmpty(arr)) {
		if (arr.length > 2) arr = arr.slice(0, 2)
		let n = arrAverage(arr);
		unit = s.includes('year') ? 'y' : s.includes('month') ? 'm' : s.includes('week') ? 'w' : s.includes('day') ? 'd' : s.includes('hour') ? 'h' : 'y';
		num = calcYears(n, unit);
		lifespan = yearsToReadable(num);
	} else {
		let s1 = s.toLowerCase();
		let words = toWords(s1);
		if (s1.includes('a few')) {
			unit = wordAfter(words, 'few');
			let n = calcYears(3, unit);
			arr.push(n);
		}
		if (s1.includes('several')) {
			unit = wordAfter(words, 'several'); //console.log('unit',unit)
			let n = calcYears(3, unit);
			arr.push(n);
			let next = wordAfter(words, unit);
			if (next == 'to') {
				unit = wordAfter(words, 'to'); //console.log('unit',unit)
				if (['day', 'week', 'month', 'year'].some(x => unit.startsWith(x))) {
					let n = calcYears(3, unit);
					arr.push(n);
				}
			}
		}
		let di = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, fifteen: 15, twenty: 20 };
		for (const w of Object.keys(di)) {
			if (s.includes(w)) {
				let n = calcYears(di[w], stringAfter(s, w));
				arr.push(n);
			}
		}
		let n = arrAverage(arr);
		unit = 'year';
		lifespan = yearsToReadable(n);
		num = allNumbers(lifespan)[0];
		unit = stringAfter(lifespan, ' ');
	}
	unit = unit[0];
	return { s, text: lifespan, num, unit };
}
function calcNumericInfo(str, diunit, base) {
	if (nundef(str)) return { str: '', num: 0, base, text: '' };
	let s = str.toLowerCase(); s = replaceAll(s, '-', ' ');
	let words1 = stringSplit(s);
	let words = words1.map(x => x == 'few' || x == 'several' ? 3 : x); //console.log(words)
	let arr = allNumbers(words.join(' ')); //console.log(arr)
	if (isEmpty(arr)) {
		console.log('could NOT find any numbers!!!!')
		return { str, num: 1, unit: base, text: s };
	}
	let num, unit, text;
	let units = Object.keys(diunit);
	let arrunits = [];
	let unitFound = base;
	for (const n of arr) {
		let i = words.indexOf('' + n); //console.log('...',n,arr,words,i); //return;
		unit = arrFindKeywordFromIndex(units, words, i);
		if (unit) {
			unitFound = unit.w;
			arrunits.push({ n, unit: unit.w });
		}
		words = words.slice(i + 1);
	}
	for (const o of arrunits) {
		o.nnorm = o.n * diunit[o.unit];
	}
	let avg = arrBalancedAverage(arrunits, 'nnorm'); //let av2=arrBalancedAverage(arrunits,'nnorm')
	unit = arrunits[0].unit;
	num = avg / diunit[unit];
	text = `${num.toFixed(1)} ${unit}`;
	return { str, num, unit, text, avg };
}
function calcOffsprings(str) {
	let s = str.toLowerCase(); s = replaceAll(s, '-', ' '); s = replaceAll(s, ',', '');
	if (s.includes('incub')) s = stringBefore(s, 'incub');
	let arr = allNumbers(s);
	if (isEmpty(arr) && s.includes('hundred') && s.includes('thousand')) { s = s.replace('hundred', '100 '); s = s.replace('thousand', '1000 '); arr = [100, 1000]; }
	else if (isEmpty(arr) && s.includes('hundred')) { s = s.replace('hundred', '100 '); arr = [100]; }
	else if (isEmpty(arr) && s.includes('thousand')) { s = s.replace('thousand', '1000 '); arr = [1000]; }
	else if (isEmpty(arr) && s.includes('ten')) { s = s.replace('ten', '10 '); arr = [10]; }
	else if (isEmpty(arr) && s.includes('dozen')) { s = s.replace('dozen', '20 '); arr = [20]; }
	let words = toWords(s).filter(x => x != 's');
	if (isEmpty(arr)) return 1;
	let newarr = [];
	for (const n of arr) {
		let w = wordAfter(words, n);
		if (isdef(w) && ['day', 'month', 'week', 'year'].some(x => w.includes(x))) break;
		newarr.push(n);
	}
	let num = arrAverage(newarr);
	let text = newarr.length > 1 ? `${newarr[0]}-${newarr[1]} children}` : `${num} child${num == 1 ? '' : 'ren'}`;
	return { str, num, unit: 'child', text };
}
function calcSize(str) {
	return calcNumericInfo(str, { cm: .01, centimeter: .01, centimeters: .01, mm: .001, millimeter: .001, millimeters: .001, meter: 1, meters: 1, m: 1 }, 'm');
}
function calcWeight(str) {
	return calcNumericInfo(str, { kg: 1, kilogram: 1, kilograms: 1, mg: .000001, milligram: .000001, milligrams: .000001, grams: .001, gram: .001, g: .001, ton: 1000, tons: 1000 }, 'kg');
}
function calcYears(n, unit) {
	let ch = unit[0];
	let frac = ch == 'y' ? 1 : ch == 'm' ? 12 : ch == 'w' ? 52 : ch == 'd' ? 365 : ch == 'h' ? 365 * 24 : 1;
	return n / frac;
}
function calculateGoodColors(bg, fg) {
	let fgIsLight = isdef(fg) ? colorIdealText(fg) == 'black' : colorIdealText(bg) == 'white';
	let bgIsDark = colorIdealText(bg) == 'white';
	if (nundef(fg)) fg = colorIdealText(bg);
	let bgNav = bg;
	fg = colorToHex79(fg);
	if (fgIsLight) {
		if (isEmpty(U.texture)) { bgNav = '#00000040'; }
		else if (bgIsDark) { bgNav = colorTrans(bg, .8); }
		else { bgNav = colorTrans(colorDark(bg, 50), .8); }
	} else {
		if (isEmpty(U.texture)) { bgNav = '#ffffff40'; }
		else if (!bgIsDark) { bgNav = colorTrans(bg, .8); }
		else { bgNav = colorTrans(colorLight(bg, 50), .8); }
	}
	let realBg = bg;
	if (bgNav == realBg) bgNav = fgIsLight ? colorDark(bgNav, .2) : colorLight(bgNav, .2);
	let bgContrast = fgIsLight ? colorDark(bgNav, .2) : colorLight(bgNav, .2);
	let fgContrast = fgIsLight ? '#ffffff80' : '#00000080';
	return [realBg, bgContrast, bgNav, fg, fgContrast];
}
function capitalize(s) {
	if (typeof s !== 'string') return '';
	return s.charAt(0).toUpperCase() + s.slice(1);
}
function clearElement(elem) {
	if (isString(elem)) elem = document.getElementById(elem);
	if (window.jQuery == undefined) { elem.innerHTML = ''; return elem; }
	while (elem.firstChild) {
		$(elem.firstChild).remove();
	}
	return elem;
}
function clearEvents() {
	for (const k in TO) { clearTimeout(TO[k]); TO[k] = null; }
	for (const k in ANIM) { if (isdef(ANIM[k])) ANIM[k].cancel(); ANIM[k] = null; }
	if (SLEEP_WATCHER) { SLEEP_WATCHER.cancel(); console.log('clearEvents: ACHTUNG SLEEP_WATCHER!!!') }
}
function clearFleetingMessage() {
	if (isdef(dFleetingMessage)) { dFleetingMessage.remove(); dFleetingMessage = null; }
}
function clearMain() { UI.commands = {}; staticTitle(); clearEvents(); mClear('dMain'); mClear('dTitle'); clearMessage(); }
function clearMessage(remove = false) { if (remove) mRemove('dMessage'); else mStyle('dMessage', { h: 0 }); }
function clearZones() {
	for (const k in Zones) {
		clearElement(Zones[k].dData);
	}
}
async function clickOnPlayer(name) { return await showGameMenuPlayerDialog(name); }
function closeLeftSidebar() { mClear('dLeft'); mStyle('dLeft', { w: 0, wmin: 0 }) }
function closePopup(name = 'dPopup') { if (isdef(mBy(name))) mBy(name).remove(); }
function cmdDisable(key) { mClass(mBy(key), 'disabled') }
function cmdEnable(key) { mClassRemove(mBy(key), 'disabled') }
function coin(percent = 50) { return Math.random() * 100 < percent; }
function collFilterImages(coll, s) {
	let di = {};
	for (const k of coll.masterKeys) { di[k] = true; }
	let list = isEmpty(s) ? Object.keys(di) : isdef(M.byCat[s]) ? M.byCat[s].filter(x => isdef(di[x])) : [];
	if (nundef(list) || isEmpty(list)) {
		list = [];
		for (const k of coll.masterKeys) {
			let o = M.superdi[k];
			if (k.includes(s) || o.friendly.toLowerCase().includes(s)) list.push(k);
		}
	}
	return list;
}
function collectCats(klist) {
	let cats = [];
	for (const k of klist) {
		M.superdi[k].cats.map(x => addIf(cats, x));
	}
	return cats;
}
function collectOptions() {
	let poss = getGameConfig(DA.gamename).options;
	let options = DA.options = {};
	if (nundef(poss)) return options;
	for (const p in poss) {
		let fs = mBy(`d_${p}`);
		let val = getCheckedRadios(fs)[0];
		options[p] = isNumber(val) ? Number(val) : val;
	}
	return options;
}
function collectPlayers() {
	let players = {};
	for (const name of DA.playerList) { players[name] = allPlToPlayer(name); }
	return players;
}
function colorCalculator(p, c0, c1, l) {
	function pSBCr(d) {
		let i = parseInt, m = Math.round, a = typeof c1 == 'string';
		let n = d.length,
			x = {};
		if (n > 9) {
			([r, g, b, a] = d = d.split(',')), (n = d.length);
			if (n < 3 || n > 4) return null;
			(x.r = parseInt(r[3] == 'a' ? r.slice(5) : r.slice(4))), (x.g = parseInt(g)), (x.b = parseInt(b)), (x.a = a ? parseFloat(a) : -1);
		} else {
			if (n == 8 || n == 6 || n < 4) return null;
			if (n < 6) d = '#' + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : '');
			d = parseInt(d.slice(1), 16);
			if (n == 9 || n == 5) (x.r = (d >> 24) & 255), (x.g = (d >> 16) & 255), (x.b = (d >> 8) & 255), (x.a = m((d & 255) / 0.255) / 1000);
			else (x.r = d >> 16), (x.g = (d >> 8) & 255), (x.b = d & 255), (x.a = -1);
		}
		return x;
	}
	let r, g, b, P, f, t, h, i = parseInt, m = Math.round, a = typeof c1 == 'string';
	if (typeof p != 'number' || p < -1 || p > 1 || typeof c0 != 'string' || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null;
	h = c0.length > 9;
	h = a ? (c1.length > 9 ? true : c1 == 'c' ? !h : false) : h;
	f = pSBCr(c0);
	P = p < 0;
	t = c1 && c1 != 'c' ? pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 };
	p = P ? p * -1 : p;
	P = 1 - p;
	if (!f || !t) return null;
	if (l) { r = m(P * f.r + p * t.r); g = m(P * f.g + p * t.g); b = m(P * f.b + p * t.b); }
	else { r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5); g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5); b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5); }
	a = f.a;
	t = t.a;
	f = a >= 0 || t >= 0;
	a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0;
	if (h) return 'rgb' + (f ? 'a(' : '(') + r + ',' + g + ',' + b + (f ? ',' + m(a * 1000) / 1000 : '') + ')';
	else return '#' + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2);
}
function colorDark(c, percent = 50, log = true) {
	if (nundef(c)) c = rColor(); else c = colorFrom(c);
	let zero1 = -percent / 100;
	return colorCalculator(zero1, c, undefined, !log);
}
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
function colorLight(c, percent = 20, log = true) {
	if (nundef(c)) {
		return colorHsl360ArgsToHex79(rHue(), 100, 85);
	} else c = colorFrom(c);
	let zero1 = percent / 100;
	return colorCalculator(zero1, c, undefined, !log);
}
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
	else if (tString && isdef(ColorDi) && lookup(ColorDi, [c])) return ColorDi[c].hex;
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
	else if (tString && c == 'inherit') return 'inherit';
	else if (tString) { ensureColorDict(); let c1 = ColorDi[c]; assertion(isdef(c1), `UNKNOWN color ${c}`); return c1.hex; }
	else if (tArr && (c.length == 3 || c.length == 4) && isNumber(c[0])) return colorRgbArrayToHex79(c);
	else if (tArr) return colorToHex79(rChoose(tArr));
	else if (tObj && 'h' in c && c.h > 1) { return colorHsl360ObjectToHex79(c); } //console.log('!!!');
	else if (tObj && 'h' in c) return colorHsl01ObjectToHex79(c);
	else if (tObj && 'r' in c) return colorRgbArgsToHex79(c.r, c.g, c.b, c.a);
	assertion(false, `NO COLOR FOUND FOR ${c}`);
}
function colorTrans(cAny, alpha = 0.5) { return colorFrom(cAny, alpha); }
function colorsFromBFA(bg, fg, alpha) {
	if (fg == 'contrast') {
		if (bg != 'inherit') bg = colorFrom(bg, alpha);
		fg = colorIdealText(bg);
	} else if (bg == 'contrast') {
		fg = colorFrom(fg);
		bg = colorIdealText(fg);
	} else {
		if (isdef(bg) && bg != 'inherit') bg = colorFrom(bg, alpha);
		if (isdef(fg) && fg != 'inherit') fg = colorFrom(fg);
	}
	return [bg, fg];
}
function contains(s, sSub) { return s.toLowerCase().includes(sSub.toLowerCase()); }
var coorsField = {
	"type": "Feature",
	"properties": {
		"popupContent": "Coors Field"
	},
	"geometry": {
		"type": "Point",
		"coordinates": [-104.99404191970824, 39.756213909328125]
	}
};
function copyKeys(ofrom, oto, except = {}, only = null) {
	let keys = isdef(only) ? only : Object.keys(ofrom);
	for (const k of keys) {
		if (isdef(except[k])) continue;
		oto[k] = ofrom[k];
	}
	return oto;
}
function createBatchGridCells(d, w, h, styles = {}, opts = {}) {
	let gap = valf(styles.gap, 4);
	if (nundef(styles.w)) styles.w = 128;
	if (nundef(styles.h)) styles.h = styles.w;
	if (nundef(styles.margin)) styles.margin = gap;
	let sz = styles.w + styles.margin;
	let cols = Math.floor((w - 20) / sz);
	let rows = Math.floor((h - 20) / sz);
	let dGrid = mGrid(rows, cols, d, { margin: 'auto', gap })
	let cells = [];
	for (let i = 0; i < rows * cols; i++) {
		let d = mDom(dGrid, styles, opts);
		mCenterCenterFlex(d);
		cells.push(d);
	}
	return { dGrid, cells, rows, cols };
}
function createGamePlayer(name, gamename, opts = {}) {
	let pl = userToPlayer(name, gamename);
	copyKeys(opts, pl);
	return pl;
}
function createOpenTable(gamename, players, options) {
	let me = getUname();
	let playerNames = [me]; console.log('me', me)
	assertion(me in players, "_createOpenTable without owner!!!!!")
	for (const name in players) { addIf(playerNames, name); }
	let table = {
		status: 'open',
		id: generateTableId(),
		fen: null,
		game: gamename,
		owner: playerNames[0],
		friendly: generateTableName(),
		players,
		playerNames: playerNames,
		options
	};
	return table;
}
function createPanZoomCanvas(parentElement, src, wCanvas, hCanvas) {
	const canvas = document.createElement('canvas');
	canvas.width = wCanvas;
	canvas.height = hCanvas;
	parentElement.appendChild(canvas);
	const ctx = canvas.getContext('2d');
	let image = new Image();
	image.src = src;
	let scale = 1;
	let originX = 0;
	let originY = 0;
	let startX = 0;
	let startY = 0;
	let isDragging = false;
	image.onload = () => {
		if (image.width < canvas.width) canvas.width = image.width;
		if (image.height < canvas.height) canvas.height = image.height;
		const scaleX = canvas.width / image.width;
		const scaleY = canvas.height / image.height;
		scale = Math.min(scaleX, scaleY, 1);
		originX = (canvas.width - image.width * scale) / 2;
		originY = (canvas.height - image.height * scale) / 2;
		draw();
	};
	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.save();
		ctx.translate(originX, originY);
		ctx.scale(scale, scale);
		ctx.drawImage(image, 0, 0);
		ctx.restore();
	}
	canvas.addEventListener('mousedown', (e) => {
		isDragging = true;
		startX = e.clientX - originX;
		startY = e.clientY - originY;
		canvas.style.cursor = 'grabbing';
	});
	canvas.addEventListener('mousemove', (e) => {
		if (isDragging) {
			originX = e.clientX - startX;
			originY = e.clientY - startY;
			draw();
		}
	});
	canvas.addEventListener('mouseup', () => {
		isDragging = false;
		canvas.style.cursor = 'grab';
	});
	canvas.addEventListener('mouseout', () => {
		isDragging = false;
		canvas.style.cursor = 'grab';
	});
	canvas.addEventListener('wheel', (e) => {
		e.preventDefault();
		const zoom = Math.exp(e.deltaY * -0.0005);
		scale *= zoom;
		if (scale >= 1) scale = 1;
		const mouseX = e.clientX - canvas.offsetLeft;
		const mouseY = e.clientY - canvas.offsetTop;
		originX = mouseX - (mouseX - originX) * zoom;
		originY = mouseY - (mouseY - originY) * zoom;
		draw();
	});
	let touchStartX = 0;
	let touchStartY = 0;
	canvas.addEventListener('touchstart', (e) => {
		if (e.touches.length === 1) {
			isDragging = true;
			touchStartX = e.touches[0].clientX - originX;
			touchStartY = e.touches[0].clientY - originY;
			canvas.style.cursor = 'grabbing';
		}
	});
	canvas.addEventListener('touchmove', (e) => {
		if (e.touches.length === 1 && isDragging) {
			originX = e.touches[0].clientX - touchStartX;
			originY = e.touches[0].clientY - touchStartY;
			draw();
		}
	});
	canvas.addEventListener('touchend', () => {
		isDragging = false;
		canvas.style.cursor = 'grab';
	});
	return canvas;
}
function deckDeal(deck, n) { return deck.splice(0, n); }
function defaultGameFunc() {
	function setup(table) { let fen = { players: table.players, turn: [table.owner] }; delete table.players; }
	function present(dParent, table) { mClear('dMain'); } //showMessage(`BINGO!!! ${table.friendly} view ${name}: NOT IMPLEMENTED!!!!!`,1000); } 
	async function activate(table) { console.log('activate for', getUname()) }
	function checkGameover(table) { return false; }
	async function hybridMove(table) { console.log('hybrid moves for', getUname()) }
	async function botMove(table) { console.log('robot moves for', getUname()) }
	async function stepComplete(table, o) { console.log(`integrate if step complete for ${table.friendly}`); }
	return { setup, activate, checkGameover, present, hybridMove, botMove, stepComplete };
}
async function deleteEvent(id) {
	let result = await simpleUpload('postEvent', { id });
	delete Items[id];
	mBy(id).remove();
}
function detectSessionType() {
	let loc = window.location.href;
	DA.sessionType =
		loc.includes('vidulus') ? 'vps' :
			loc.includes('telecave') ? 'telecave' : loc.includes('8080') ? 'php'
				: loc.includes(':40') ? 'nodejs'
					: loc.includes(':60') ? 'flask' : 'live';
	return DA.sessionType;
}
function dict2list(d, keyName = 'id') {
	let res = [];
	for (const key in d) {
		let val = d[key];
		let o;
		if (isDict(val)) { o = jsCopy(val); } else { o = { value: val }; }
		o[keyName] = key;
		res.push(o);
	}
	return res;
}
function disableButton(b) { mClass(toElem(b), 'disabled') }
function drag(ev) {
	let elem = ev.target;
	dragStartOffset = getRelCoords(ev, $(elem));
	draggedElement = elem;
}
var dragStartOffset;
var draggedElement;
function draw() {
	background(51);
	for (let i = 0; i < tree.length; i++) {
		tree[i].show();
		if (jittering) tree[i].jitter();
	}
	for (let i = 0; i < leaves.length; i++) {
		let l = leaves[i].current;
		noStroke();
		fill(0, 255, 100, 100);
		ellipse(l.x, l.y, 8, 8);
		if (jittering) leaves[i].current.y += random(0, 2);
	}
}
function drawPoint(dParent, p, addLabel = true) {
	let html = isdef(p.owner) && addLabel ? p.owner[0].toUpperCase() : '';
	addKeys({ sz: 20, bg: rColor(), id: getUID() }, p);
	let d1 = p.div = mDom(dParent, { round: true, left: p.x, top: p.y, w: p.sz, h: p.sz, position: 'absolute', bg: p.bg, align: 'center', fg: 'contrast' }, { html, id: p.id });
	d1.style.cursor = 'default';
	if (isdef(p.border)) mStyle(d1, { outline: `solid ${p.border} 4px` });
	let rect = getRect(d1);
	p.cx = p.x + p.sz / 2; p.cy = p.y + p.sz / 2;
	p.xPage = rect.x; p.yPage = rect.y;
	p.cxPage = rect.x + p.sz / 2; p.cyPage = rect.y + p.sz / 2;
	return p;
}
function drop(ev) {
	ev.preventDefault();
	let targetElem = findDragTarget(ev);
	targetElem.appendChild(draggedElement);
	setDropPosition(ev, draggedElement, targetElem, isdef(draggedElement.dropPosition) ? draggedElement.dropPosition : dropPosition);
}
var dropPosition = 'none';
function enableDataDrop(elem, onDropCallback) {
	const originalBorderStyle = elem.style.border;
	elem.addEventListener('dragover', ev => { ev.preventDefault(); }); // Prevent default behavior for dragover and drop events to allow drop
	elem.addEventListener('dragenter', ev => {
		console.log(ev);
		let els = ev.srcElement;
		if (isAncestorOf(els, elem)) return;
		elem.style.border = '2px solid red';
	});
	elem.addEventListener('drop', ev => {
		ev.preventDefault();
		elem.style.border = originalBorderStyle;
		console.log('border', elem.style.border)
		onDropCallback(ev, elem);
	});
}
function endsWith(s, sSub) { let i = s.indexOf(sSub); return i >= 0 && i == s.length - sSub.length; }
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
function evNoBubble(ev) { ev.preventDefault(); ev.cancelBubble = true; }
function evToAttr(ev, attr) {
	let elem = ev.target;
	let val = null;
	while (nundef(val) && isdef(elem)) {
		val = elem.getAttribute(attr);
		if (isdef(val)) return val;
		elem = elem.parentNode;
	}
	return null;
}
function evToId(ev) {
	let elem = findParentWithId(ev.target);
	return elem.id;
}
function extendRect(r4) { r4.l = r4.x; r4.t = r4.y; r4.r = r4.x + r4.w; r4.b = r4.t + r4.h; }
function extractColors(s, colors) {
	let words = toWords(s);
	words = words.map(x => strRemoveTrailing(x, 'ish')).map(x => x.toLowerCase());
	if (nundef(colors)) colors = Object.keys(M.colorByName);
	let res = [];
	for (const w of words) {
		for (const c of colors) {
			if (w == c) res.push(c);
		}
	}
	return res;
}
function extractFoodAndType(s) {
	let carni = ['mouse', 'bird', 'fish', 'beetle', 'spider', 'animal', 'frog', 'lizard', 'worm', 'deer', 'zebra', 'shrimp', 'squid', 'snail'];
	let insecti = ['worm', 'ant', 'insect', 'moth', 'flies', 'grasshopper',]
	let herbi = ['grass', 'grasses', 'leaves', 'fruit', 'flowers', 'grain', 'berries', 'plant', 'bamboo', 'tree', 'wood', 'reed', 'twig', 'crops', 'herbs'];
	s = s.toLowerCase();
	let words = toWords(s, true).map(x => strRemoveTrailing(x, 's'));
	let di = { herbi, carni, insecti };
	let types = [];
	let contained = [];
	for (const type in di) {
		let arr = di[type];
		for (const a of arr) {
			let w = strRemoveTrailing(a, 's');
			if (words.includes(w)) {
				addIf(contained, a);
				addIf(types, type);
				continue;
			}
		}
	}
	let type;
	for (const t of ['omni', 'herbi', 'carni', 'insecti']) {
		if (s.includes(t)) type = t + 'vorous';
	}
	if (nundef(type)) {
		if (isEmpty(types)) { type = 'unknown' }
		if (types.includes('herbi') && types.length >= 2) type = 'omnivorous';
		else if (types.length >= 2) type = 'carnivorous';
		else type = types[0] + 'vorous';
	}
	return [contained, type];
}
function extractHabitat(str, ignore = []) {
	let s = str.toLowerCase();
	let habit = [];
	let di = M.habitat;
	for (const k in di) {
		if (k == 'geo') continue;
		for (const hab of di[k]) {
			if (ignore.includes(hab)) continue;
			if (s.includes(hab)) { addIf(habit, k); break; }
		}
	}
	return habit;
}
function extractSpecies(s) {
	s = s.toLowerCase();
	let words = toWords(s);
	if (words.length <= 2) { s = s.replace('suborder', ''); s = s.replace('genus', ''); return s.trim(); }
	s = s.replace(' x ', ', ');
	if (s.includes('hybrid')) return s;
	if (s.includes('including')) return arrTake(toWords(stringAfter(s, 'including')), 2).join(' ');
	if (s.includes('suborder')) return wordAfter(s, 'suborder');
	let firstTwo = arrTake(words, 2).join(' '); //console.log(slower);
	return firstTwo;
}
function extractTime(input) {
	const regex = /\b([0-9]|1[0-9]|2[0-3])[h:]*\S*\b/g;
	const match = input.match(regex);
	if (match) {
		let time = match[0];
		let text = input.replace(time, '').trim();
		return [time, text];
	} else {
		return ['', input];
	}
}
function extractWords(s, allowed) {
	let specialChars = getSeparators(allowed);
	let parts = splitAtAnyOf(s, specialChars.join('')).map(x => x.trim());
	return parts.filter(x => !isEmpty(x));
}
function filterIsolatedPairs(pairs, blockers, threshold = 10) {
	let newPairs = [];
	for (const pair of pairs) {
		const [ax, ay] = [pair[0].x, pair[0].y];
		const [bx, by] = [pair[1].x, pair[1].y];
		let isIsolated = true;
		for (const blocker of blockers) {
			const [px, py] = [blocker.x, blocker.y];
			const distance = pointToLineDistance(px, py, ax, ay, bx, by);
			if (distance < threshold) {
				isIsolated = false;
				break;
			}
		}
		if (isIsolated) {
			newPairs.push(pair);
		}
	}
	return newPairs;
}
function findClosestMeeple(p) {
	let fen = T.fen;
	let dist = 9999999;
	let closestMeeple = null;
	for (const meeple of fen.meeples) {
		let d = getDistanceBetweenCenters(mBy(p.id), mBy(meeple.id));
		if (d < dist) {
			dist = d;
			closestMeeple = meeple;
		}
	}
	return closestMeeple;
}
function findDragTarget(ev) {
	let targetElem = ev.target;
	while (!targetElem.ondragover) targetElem = targetElem.parentNode;
	return targetElem;
}
function findIsolatedPairs(nodes, prop = 'bg', threshold = 3) {
	const isolatedPairs = [], obstaclePairs = [];
	for (let i = 0; i < nodes.length; i++) {
		for (let j = i + 1; j < nodes.length; j++) {
			if (nodes[i][prop] != nodes[j][prop]) continue;
			const [ax, ay] = [nodes[i].x, nodes[i].y];
			const [bx, by] = [nodes[j].x, nodes[j].y];
			let isIsolated = true;
			for (let k = 0; k < nodes.length; k++) {
				if (k === i || k === j) continue;
				const [px, py] = [nodes[k].x, nodes[k].y];
				const distance = pointToLineDistance(px, py, ax, ay, bx, by);
				if (distance < threshold) {
					isIsolated = false;
					break;
				}
			}
			let pair = nodes[i].x <= nodes[j].x ? [nodes[i], nodes[j]] : [nodes[j], nodes[i]]; //console.log(pair[0].x,pair[1].x);
			assertion(pair[0].x <= pair[1].x, "NOT SORTED!!!!!!!!!!!!!!!!");
			if (isIsolated) {
				isolatedPairs.push(pair);
			} else {
				obstaclePairs.push(pair);
			}
		}
	}
	return { isolatedPairs, obstaclePairs };
}
function findParentWithId(elem) { while (elem && !(elem.id)) { elem = elem.parentNode; } return elem; }
function findPlayerWithMeeplesLeft(name) {
	let pnamesWithMeeplesLeft = [];
	for (const pname of T.playerNames) {
		let meeplesOfThatPlayer = T.fen.meeples.filter(x => x.owner == pname);
		if (meeplesOfThatPlayer.length < T.options.numMeeples) pnamesWithMeeplesLeft.push(pname);
	}
	if (pnamesWithMeeplesLeft.length == 0) return null;
	let nextPlayer = null;
	while (!nextPlayer) {
		nextPlayer = arrNext(T.plorder, name);
		if (!pnamesWithMeeplesLeft.includes(nextPlayer)) { name = nextPlayer; nextPlayer = null; }
	}
	return nextPlayer;
}
function findUniqueSuperdiKey(friendly) {
	console.log('friendly', friendly)
	let name = friendly;
	let i = 1;
	let imgname = null;
	while (true) {
		let o = M.superdi[name];
		if (nundef(o)) { break; }
		console.log(o.colls.includes('emo'))
		if (isdef(o.img) && isdef(o.photo) || ['emo', 'fa6', 'icon'].every(x => !o.colls.includes(x))) { name = friendly + (i++); continue; }
		else if (isdef(o.img)) { imgname = 'photo'; break; }
		else { imgname = 'img'; break; }
	}
	return [name, imgname];
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
function fishgame() {
	function setup(table) { wsSetup(table); }
	function stats(table) { wsStats(table); }
	function present(table) { wsPresent(table); }
	async function activate(table, items) {
		await showInstructionStandard(table, 'may pick your initial cards'); //browser tab and instruction if any
		for (const item of items) {
			let d = iDiv(item);
			d.onclick = wsOnclickCard;
		}
		return;
		if (!isMyTurn(table)) { return; }
		for (const item of items) {
			let d = iDiv(item);
			mStyle(d, { cursor: 'pointer' });
			d.onclick = ev => onclickCard(table, item, items);
		}
		if (isEmpty(table.fen.cards)) return gameoverScore(table);
		if (amIHuman(table) && table.options.gamemode == 'multi') return;
		let name = amIHuman(table) && table.options.gamemode == 'solo' ? someOtherPlayerName(table) : getUname();
		if (nundef(name)) return;
		await botMove(name, table, items);
	}
	async function botMove(name, table, items) {
		let ms = rChoose(range(2000, 5000));
		TO.bot = setTimeout(async () => {
			let item = rChoose(items);
			toggleItemSelection(item);
			TO.bot1 = setTimeout(async () => await evalMove(name, table, item.key), 500);
		}, rNumber(ms, ms + 2000));
	}
	async function onclickCard(table, item, items) {
		toggleItemSelection(item);
		try { await mSleep(200); } catch (err) { return; }
		await evalMove(getUname(), table, item.key);
	}
	async function evalMove(name, table, key) {
		clearEvents();
		mShield('dTable', { bg: 'transparent' });
		let id = table.id;
		let step = table.step;
		let best = arrMinMax(table.fen.cards).min;
		let succeed = key == best;
		if (succeed) {
			table.players[name].score += 1;
			let fen = table.fen;
			let newCards = deckDeal(fen.deck, 1);
			if (newCards.length > 0) arrReplace1(fen.cards, key, newCards[0]); else removeInPlace(fen.cards, key);
		} else {
			table.players[name].score -= 1;
		}
		lookupAddToList(table, ['moves'], { step, name, move: key, change: succeed ? '+1' : '-1', score: table.players[name].score });
		let o = { id, name, step, table };
		if (succeed) o.stepIfValid = step + 1;
		let res = await mPostRoute('table', o);
	}
	return { setup, present, stats, activate };
}
function fleetingMessage(msg, d, styles, ms, fade) {
	if (isString(msg)) {
		dFleetingMessage.innerHTML = msg;
		mStyle(dFleetingMessage, styles);
	} else {
		mAppend(dFleetingMessage, msg);
	}
	if (fade) Animation1 = mAnimate(dFleetingMessage, 'opacity', [1, .4, 0], null, ms, 'ease-in', 0, 'both');
	return dFleetingMessage;
}
function formatLegend(key) {
	return key.includes('per') ? stringBefore(key, '_') + '/' + stringAfterLast(key, '_')
		: key.includes('_') ? replaceAll(key, '_', ' ') : key;
}
var freeBus = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[-105.00341892242432, 39.75383843460583],
					[-105.0008225440979, 39.751891803969535]
				]
			},
			"properties": {
				"popupContent": "This is a free bus line that will take you across downtown.",
				"underConstruction": false
			},
			"id": 1
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[-105.0008225440979, 39.751891803969535],
					[-104.99820470809937, 39.74979664004068]
				]
			},
			"properties": {
				"popupContent": "This is a free bus line that will take you across downtown.",
				"underConstruction": true
			},
			"id": 2
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[-104.99820470809937, 39.74979664004068],
					[-104.98689651489258, 39.741052354709055]
				]
			},
			"properties": {
				"popupContent": "This is a free bus line that will take you across downtown.",
				"underConstruction": false
			},
			"id": 3
		}
	]
};
function fromNormalized(s, sep = '_') {
	let x = replaceAll(s, sep, ' ');
	let words = toWords(x).map(x => capitalize(x)).join(' ');
	return words;
}
async function gameoverScore(table) {
	table.winners = getPlayersWithMaxScore(table);
	table.status = 'over';
	table.turn = [];
	let id = table.id;
	let name = getUname();
	let step = table.step;
	let stepIfValid = step + 1;
	let o = { id, name, step, stepIfValid, table };
	let res = await mPostRoute('table', o); //console.log(res);
}
function generateEventId(tsDay, tsCreated) { return `${rLetter()}_${tsDay}_${tsCreated}`; }
function generateHotspots(dParent, pointPairs, sz = 20, color = 'red') {
	let t = getNow();
	let hotspots = [];
	let linesByPair = {};
	for (const pair of pointPairs) {
		unlockLengthyProcess();
		let ids = pair.map(x => x.id);
		let key = ids.join(',');
		let [pStart, pEnd] = [B.diPoints[ids[0]], B.diPoints[ids[1]]];
		let line = getEquidistantPoints(pStart, pEnd, sz / 2);
		for (const p of line) {
			p.bg = color;
			p.sz = sz;
			p.start = ids[0];
			p.end = ids[1];
			p.startX = pStart.x;
			p.endX = pEnd.x;
			p.startY = pStart.y;
			p.endY = pEnd.y;
			p.id = getUID();
			p.pairs = [key];
			hotspots.push(p);
		}
		linesByPair[key] = line;
	}
	let dihotspots = lacunaDrawPoints(dParent, hotspots);
	if (color == 'transparent') hotspots.map(x => mStyle(x.div, { opacity: 0 }))
	let [c1, c2, c3, c4, c5, c6] = [0, 0, 0, 0, 0, 0];
	for (const p1 of hotspots) {
		assertion(p1.startX <= p1.endX, "NOT SORTED!!!!!")
		for (const p2 of hotspots) {
			unlockLengthyProcess();
			if (p1 == p2) { c3++; continue; }
			if (p1.startX > p2.endX) { c1++; continue; }
			if (p2.startX > p1.endX) { c2++; continue; }
			if (p1.start == p2.start && p1.end == p2.end) { c4++; continue; }
			if (p1.start == p2.end && p1.end == p2.start) { c5++; continue; }
			let miny1 = Math.min(p1.startY, p1.endY);
			let maxy1 = Math.max(p1.startY, p1.endY);
			let miny2 = Math.min(p2.startY, p2.endY);
			let maxy2 = Math.max(p2.startY, p2.endY);
			if (miny1 > maxy2 || miny2 > maxy1) { c5++; continue; }
			c6++;
			let dist = getDistanceBetweenPoints(p1, p2);
			if (dist < sz / 3) {
				let newlist = new Set(p1.pairs.concat(p2.pairs));
				p1.pairs = Array.from(newlist);
				p2.pairs = Array.from(newlist);
				if (color != 'transparent') {
					p1.bg = 'blue'; mStyle(p1.div, { bg: 'blue' });
					p2.bg = 'blue'; mStyle(p2.div, { bg: 'blue' });
				}
			}
		}
	}
	return [hotspots, linesByPair];
}
function generateRandomPointsRound(n, w, h, rand = 0.8) {
	let [radx, rady] = [w / 2, h / 2];
	const goldenAngle = Math.PI * (3 - Math.sqrt(5));
	const points = [];
	for (let i = 1; i < n + 1; i++) {
		const angle = i * goldenAngle + (Math.random() - 0.5) * goldenAngle * rand / 4;
		const distance = Math.sqrt(i / n);
		let x = radx + distance * radx * Math.cos(angle);
		let y = rady + distance * rady * Math.sin(angle);
		points.push({ x: Math.round(x), y: Math.round(y) });
	}
	return points;
}
function generateTableId() { return rUniqueId(20); }
function generateTableName(n) {
	let existing = Serverdata.tables.map(x => x.friendly);
	while (true) {
		let cap = rChoose(M.capital);
		let parts = cap.split(' ');
		if (parts.length == 2) cap = stringBefore(cap, ' '); else cap = stringBefore(cap, '-');
		cap = cap.trim();
		let arr = ['battle of ', 'rally of ', 'showdown in ', 'summit of ', 'joust of ', 'tournament of ', 'rendezvous in ', 'soirée in ', 'festival of '];//,'encounter in ']; //['battle of ', 'war of ']
		let s = (n == 2 ? 'duel of ' : rChoose(arr)) + cap;
		if (!existing.includes(s)) return s;
	}
}
function getAbstractSymbol(n) {
	if (nundef(n)) n = rChoose(range(1, 100));
	else if (isList(n)) n = rChoose(n);
	return `abstract_${String(n).padStart(3, '0')}`;
}
function getButtonCaptionName(name) { return `bTest${name}`; }
function getCSSVariable(varname) { return getCssVar(varname); }
function getCheckedRadios(rg) {
	let inputs = rg.getElementsByTagName('INPUT');
	let list = [];
	for (const ch of inputs) {
		if (ch.checked) list.push(ch.value);
	}
	return list;
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
function getCssVar(varname) { return getComputedStyle(document.body).getPropertyValue(varname); }
function getDetailedSuperdi(key) {
	let o = M.superdi[key];
	let details = valf(M.details[key], M.details[o.friendly]);
	if (nundef(details)) return null;
	addKeys(details, o);
	o.key = key;
	o.class = o.class.toLowerCase();
	if (isdef(o.lifespan)) o.olifespan = calcLifespan(o.lifespan);
	if (isdef(o.food)) {
		[o.foodlist, o.foodtype] = extractFoodAndType(o.food);
		let foodTokens = [];
		if (['berries', 'fruit'].some(x => o.foodlist.includes(x))) foodTokens.push('cherries');
		if (['fish', 'shrimp', 'squid'].some(x => o.foodlist.includes(x))) foodTokens.push('fish');
		if (['wheat', 'grain', 'crops'].some(x => o.foodlist.includes(x))) foodTokens.push('grain');
		if (o.foodtype.startsWith('insect')) foodTokens.push('worm');
		else if (o.foodtype.startsWith('carni')) foodTokens.push('mouse');
		else if (o.foodtype.startsWith('omni')) foodTokens.push('omni');
		else if (o.foodtype.startsWith('herbi')) foodTokens.push('seedling');
		o.foodTokens = arrTake(foodTokens, 3);
	}
	if (isdef(o.offsprings)) o.ooffsprings = calcOffsprings(o.offsprings);
	if (isdef(o.weight)) { o.oweight = calcWeight(o.weight); o.nweight = o.oweight.avg; }
	if (isdef(o.size)) { o.osize = calcSize(o.size); o.nsize = o.osize.avg; }
	if (isdef(o.species)) {
		let x = o.species; o.longSpecies = x; o.species = extractSpecies(x);
	}
	if (isdef(o.habitat)) {
		let text = o.habitat;
		let hlist = o.hablist = extractHabitat(text, ['coastal']);
		let habTokens = [];
		if (['wetland'].some(x => hlist.includes(x))) { habTokens.push('wetland'); } //colors.push('lightblue'); imgs.push('../assets/games/wingspan/wetland.png'); }
		if (['dwellings', 'grassland', 'desert'].some(x => hlist.includes(x))) { habTokens.push('grassland'); } //{ colors.push('goldenrod'); imgs.push('../assets/games/wingspan/grassland2.png'); }
		if (['forest', 'mountain', 'ice'].some(x => hlist.includes(x))) { habTokens.push('forest'); } //{ colors.push('emerald'); imgs.push('../assets/games/wingspan/forest1.png'); }
		o.habTokens = habTokens;
	}
	let colors = ['turquoise', 'bluegreen', 'teal', 'brown', 'gray', 'green', 'violet', 'blue', 'black', 'yellow', 'white', 'lavender', 'orange', 'buff', 'red', 'pink', 'golden', 'cream', 'grey', 'sunny', 'beige'];
	if (isdef(o.color)) o.colors = extractColors(o.color, colors);
	o = sortDictionary(o);
	return o;
}
function getDistanceBetweenCenters(div1, div2) {
	const rect1 = div1.getBoundingClientRect();
	const rect2 = div2.getBoundingClientRect();
	const centerX1 = rect1.left + rect1.width / 2;
	const centerY1 = rect1.top + rect1.height / 2;
	const centerX2 = rect2.left + rect2.width / 2;
	const centerY2 = rect2.top + rect2.height / 2;
	const dx = centerX2 - centerX1;
	const dy = centerY2 - centerY1;
	return Math.sqrt(dx * dx + dy * dy);
}
function getDistanceBetweenPoints(p1, p2) {
	if (isString(p1)) p1 = B.diPoints[p1];
	if (isString(p2)) p2 = B.diPoints[p2];
	return getDistanceBetweenCenters(p1.div, p2.div);
}
function getEquidistantPoints(p1, p2, d = 10, includeEnds = false) {
	const points = [];
	const dx = p2.x - p1.x;
	const dy = p2.y - p1.y;
	const distance = Math.sqrt(dx * dx + dy * dy);
	const numPoints = Math.floor(distance / d);
	let istart = includeEnds ? 0 : 1;
	let iend = includeEnds ? numPoints : numPoints - 1;
	for (let i = istart; i <= iend; i++) {
		const t = i / numPoints;
		const x = p1.x + t * dx;
		const y = p1.y + t * dy;
		points.push({ x, y });
	}
	return points;
}
function getEventValue(o) {
	if (isEmpty(o.time)) return o.text;
	return o.time + ' ' + stringBefore(o.text, '\n');
}
async function getEvents(cachedOk = false) {
	if (!cachedOk) Serverdata.events = await mGetRoute('events');
	return Serverdata.events;
}
function getGameConfig(gamename) { return Serverdata.config.games[gamename]; }
function getGameFriendly(gamename) { return getGameConfig(gamename).friendly; }
function getGameOption(prop) { return lookup(T, ['options', prop]); }
function getGameOptions(gamename) { return getGameConfig(gamename).options; }
function getGamePlayerOptions(gamename) { return getGameConfig(gamename).ploptions; }
function getGamePlayerOptionsAsDict(gamename) { return valf(getGamePlayerOptions(gamename), {}); }
function getGameProp(prop) { return getGameConfig(T.game)[prop]; }
function getItem(k) { return infoToItem(Syms[k]); }
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
function getMenu() { return isdef(Menu) ? Menu.key : null; }
function getNavBg() { return mGetStyle('dNav', 'bg'); }
function getNow() { return Date.now(); }
function getPlayerProp(prop, name) { let pl = T.players[valf(name, getUname())]; return pl[prop]; }
function getPlayersWithMaxScore(table) {
	let list = dict2list(table.players, 'name');
	list = sortByDescending(list, 'score');
	maxlist = arrTakeWhile(list, x => x.score == list[0].score);
	return maxlist.map(x => x.name);
}
function getRadioValue(prop) {
	let fs = mBy(`d_${prop}`);
	if (nundef(fs)) return null;
	let val = getCheckedRadios(fs)[0];
	return isNumber(val) ? Number(val) : val;
}
function getRect(elem, relto) {
	if (isString(elem)) elem = document.getElementById(elem);
	let res = elem.getBoundingClientRect();
	if (isdef(relto)) {
		let b2 = relto.getBoundingClientRect();
		let b1 = res;
		res = {
			x: b1.x - b2.x,
			y: b1.y - b2.y,
			left: b1.left - b2.left,
			top: b1.top - b2.top,
			right: b1.right - b2.right,
			bottom: b1.bottom - b2.bottom,
			width: b1.width,
			height: b1.height
		};
	}
	let r = { x: res.left, y: res.top, w: res.width, h: res.height };
	addKeys({ l: r.x, t: r.y, r: r.x + r.w, b: r.y + r.h }, r);
	return r;
}
function getRectInt(elem, relto) {
	if (isString(elem)) elem = document.getElementById(elem);
	let res = elem.getBoundingClientRect();
	if (isdef(relto)) {
		let b2 = relto.getBoundingClientRect();
		let b1 = res;
		res = {
			x: b1.x - b2.x,
			y: b1.y - b2.y,
			left: b1.left - b2.left,
			top: b1.top - b2.top,
			right: b1.right - b2.right,
			bottom: b1.bottom - b2.bottom,
			width: b1.width,
			height: b1.height
		};
	}
	let r4 = { x: Math.round(res.left), y: Math.round(res.top), w: Math.round(res.width), h: Math.round(res.height) };
	extendRect(r4);
	return r4;
}
function getRelCoords(ev, elem) {
	let x = ev.pageX - elem.offset().left;
	let y = ev.pageY - elem.offset().top;
	return { x: x, y: y };
}
function getSeparators(allowed) {
	let specialChars = toLetters(' ,-.!?;:');
	if (isdef(allowed)) specialChars = arrMinus(specialChars, toLetters(allowed));
	return specialChars;
}
function getServerurl(port = 3000) {
	let type = detectSessionType();
	let server = type == 'vps' ? 'https://server.vidulusludorum.com' : `http://localhost:${port}`;
	return server;
}
function getStyleProp(elem, prop) { return getComputedStyle(elem).getPropertyValue(prop); }
function getThemeFg() { return getCSSVariable('--fgButton'); }
function getTid() { return Tid; }
function getTurnPlayers(table) {
	return table.turn.join(', ');
}
function getUID(pref = '') {
	UIDCounter += 1;
	return pref + '_' + UIDCounter;
}
function getUname() { return U.name; }
async function getUser(name, cachedOk = false) {
	let res = lookup(Serverdata, ['users', name]);
	if (!res || !cachedOk) res = await mGetRoute('user', { name });
	if (!res) {
		let key = isdef(M.superdi[name]) ? name : rChoose(Object.keys(M.superdi))
		res = await postUserChange({ name, color: rChoose(M.playerColors), key });
	}
	Serverdata.users[name] = res;
	return res;
}
function getUserColor(uname) { return Serverdata.users[uname].color; }
function getUserOptionsForGame(name, gamename) { return lookup(Serverdata.users, [name, 'games', gamename]); }
function getWaitingHtml(sz = 30) { return `<img src="../assets/icons/active_player.gif" height="${sz}" style="margin:0px ${sz / 3}px" />`; }
function hFunc(content, funcname, arg1, arg2, arg3) {
	let html = `<a style='color:blue' href="javascript:${funcname}('${arg1}','${arg2}','${arg3}');">${content}</a>`;
	return html;
}
function highlightHotspots(ev) {
	let [x, y] = [ev.clientX, ev.clientY];
	let els = allElementsFromPoint(x, y);
	let endPoints = [], possiblePairs = [];
	for (const elem of els) {
		let p = B.hotspotDict[elem.id];
		if (isdef(p)) {
			addIf(endPoints, p.start);
			addIf(endPoints, p.end);
			let pair = [p.start, p.end]; pair.sort();
			addIf(possiblePairs, pair.join(','));
		}
	}
	stopPulsing(endPoints);
	startPulsing(endPoints);
	B.endPoints = endPoints;
	B.selectedPoints = [];
	B.possiblePairs = possiblePairs;
}
function highlightPlayerItem(item) { mStyle(iDiv(item), { bg: getUserColor(item.name), fg: 'white', border: `white` }); }
function homeSidebar(wmin = 150) {
	mStyle('dLeft', { wmin });
	let d = mDom('dLeft', { wmin: wmin - 10, matop: 20, h: window.innerHeight - getRect('dLeft').y - 102 }); //, bg:'#00000020'  }); 
	let gap = 5;
	let stylesTitles = { matop: 10, bg: '#ffffff80', fg: 'black' };
	let cmds = {};
	cmds.homeNew = mCommand(d, 'homeNew', 'New Entry'); mNewline(d, gap);
	UI.commands = cmds;
}
function iDiv(i) { return isdef(i.live) ? i.live.div : valf(i.div, i.ui, i); } //isdef(i.div) ? i.div : i; }
function iRegister(item, id) { let uid = isdef(id) ? id : getUID(); Items[uid] = item; return uid; }
const img = document.createElement('img')
function imgToDataUrl(img) {
	const canvas = document.createElement('canvas');
	canvas.width = img.width;
	canvas.height = img.height;
	const ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	const dataUrl = canvas.toDataURL('image/png');
	return dataUrl;
}
function infoToItem(x) { let item = { info: x, key: x.key }; item.id = iRegister(item); return item; }
function isAlphaNum(s) { query = /^[a-zA-Z0-9]+$/; return query.test(s); }
function isAncestorOf(elem, elemAnc) {
	while (elem) {
		if (elem === elemAnc) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}
function isColor(s) { return isdef(M.colorByName[s]) || s.length == 7 && s[0] == '#'; }
function isDict(d) { let res = (d !== null) && (typeof (d) == 'object') && !isList(d); return res; }
function isEmpty(arr) {
	return arr === undefined || !arr
		|| (isString(arr) && (arr == 'undefined' || arr == ''))
		|| (Array.isArray(arr) && arr.length == 0)
		|| Object.entries(arr).length === 0;
}
function isFilename(s) { return s.includes('../'); }
function isList(arr) { return Array.isArray(arr); }
function isLiteral(x) { return isString(x) || isNumber(x); }
function isMyTurn(table) { return table.turn.includes(getUname()) }
function isNumber(x) { return x !== ' ' && x !== true && x !== false && isdef(x) && (x == 0 || !isNaN(+x)); }
function isNumeric(x) { return !isNaN(+x); }
function isPlayerHuman(table, name) { return table.players[name].playmode != 'bot'; }
function isPointOutsideOf(form, x, y) { const r = form.getBoundingClientRect(); return (x < r.left || x > r.right || y < r.top || y > r.bottom); }
function isSameDate(date1, date2) {
	return date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate();
}
function isSameTableOpen(id) { return T && T.id == id; }
function isSet(x) { return (isDict(x) && (x.set || x._set)); }
function isString(param) { return typeof param == 'string'; }
function isSvg(elem) { return startsWith(elem.constructor.name, 'SVG'); }
function isdef(x) { return x !== null && x !== undefined && x !== 'undefined'; }
function jsCopy(o) { return JSON.parse(JSON.stringify(o)); }
function jsCopyExceptKeys(o, keys = []) {
	if (!isDict(o)) return jsCopy(o);
	let onew = {};
	for (const k in o) { if (keys.includes(k)) continue; onew[k] = o[k]; }
	return JSON.parse(JSON.stringify(onew));
}
function keyDownHandler(ev) {
	if (IsControlKeyDown && MAGNIFIER_IMAGE) return;
	if (!MAGNIFIER_IMAGE && ev.key == 'Control') {
		IsControlKeyDown = true;
		let hoveredElements = document.querySelectorAll(":hover");
		let cand = Array.from(hoveredElements).find(x => mHasClass(x, 'magnifiable'));
		if (isdef(cand)) showDetailsAndMagnify(cand);
	}
}
function keyUpHandler(ev) {
	if (ev.key == 'Control') {
		IsControlKeyDown = false;
		mMagnifyOff();
		if (isdef(mBy('hallo'))) mBy('hallo').remove();
	}
}
function lacuna() {
	function setup(table) {
		let opts = table.options;
		opts = { numPoints: 10, numColors: 2, numMeeples: 1 };
		let n = opts.numPoints;
		let neach = opts.numPoints / opts.numColors;
		let points = lacunaGenerateFenPoints(n, neach, 1000, 1000);
		let fen = { points }; console.log('points', points)
		for (const name in table.players) {
			let pl = table.players[name];
			pl.score = 0;
			pl.positions = [];
			pl.flowers = {};
			for (const c of range(opts.numColors)) { pl.flowers[c] = 0; }
		}
		fen.meeples = [];
		table.plorder = jsCopy(table.playerNames);
		table.turn = [rChoose(table.playerNames)];
		return fen;
	}
	function stats(table) {
		let [me, players] = [getUname(), table.players];
		let style = { patop: 8, mabottom: 20, wmin: 80, bg: 'beige', fg: 'contrast' };
		let player_stat_items = uiTypePlayerStats(table, me, 'dStats', 'colflex', style)
		for (const plname in players) {
			let pl = players[plname];
			let item = player_stat_items[plname];
			if (pl.playmode == 'bot') { mStyle(item.img, { rounding: 0 }); }
			let d = iDiv(item); mCenterFlex(d); mLinebreak(d); mIfNotRelative(d);
			for (const c in pl.flowers) {
				let n = pl.flowers[c];
				playerStatCount(c, n, d);
			}
			if (table.turn.includes(plname)) { mDom(d, { position: 'absolute', left: -3, top: 0 }, { html: getWaitingHtml() }); }
		}
	}
	function present(table) {
		let fen = table.fen; console.log(fen);
		console.log(table.fen, table.players);
		B = {};
		let dTable = presentBgaRoundTable();
		B.points = lacunaPresentPoints(fen.points, dTable);
	}
	function muell(table) {
		let [w, h, sz, n, neach, points, meeples] = [fen.w, fen.h, fen.sz, fen.n, fen.neach, jsCopy(fen.points), jsCopy(fen.meeples)];
		let padding = 20;
		mStyle(dTable, { bg: 'midnight_purple', position: 'relative', padding, wmin: w + 2 * padding, hmin: h + 2 * padding });
		let dParent = B.dParent = mDom(dTable, { w, h, position: 'absolute', left: 2 * padding, top: 2 * padding }, { id: 'dCanvas' });
		B.points = points;
		B.sz = sz;
		B.diPoints = lacunaDrawPoints(dParent, points);
		B.meeples = meeples;
		B.diMeeples = lacunaDrawPoints(dParent, meeples);
		return B.points;
	}
	async function activate(table, items) {
		if (!isMyTurn(table)) return;
		setInstruction('must place a meeple'); //browser tab and instruction if any
		console.log('AAAAAAAAAAAAAAAA')
		return;
		setTimeout(() => lacunaStartMove(), 10);
	}
	return { setup, present, stats, activate, hasInstruction: true };
}
function lacunaColorName(val) {
	let clist = { red: "#E63946", green: "#06D6A0", blue: "#118AB2", cyan: "#0F4C75", magenta: "#D81159", yellow: "#FFD166", orange: "#F4A261", purple: "#9D4EDD", pink: "#FF80AB", brown: "#8D6E63", lime: "#A7FF83", indigo: "#3A0CA3", violet: "#B5838D", gold: "#F5C518", teal: "#008080" };
	for (const k in clist) {
		if (val == clist[k]) return k;
	}
	return 'unknown';
}
function lacunaDrawPoints(dParent, points, addLabel = true) {
	let items = [];
	for (const p of points) {
		let html = isdef(p.owner) && addLabel ? p.owner[0].toUpperCase() : ''; //p.id.substring(1) : ''
		let d1 = p.div = mDom(dParent, { round: true, left: p.x, top: p.y, w: p.sz, h: p.sz, position: 'absolute', bg: p.bg, align: 'center', fg: 'contrast' }, { html, id: p.id });
		d1.style.cursor = 'default';
		if (isdef(p.border)) mStyle(d1, { outline: `solid ${p.border} 4px` });
		let rect = getRect(d1);
		p.cx = p.x + p.sz / 2; p.cy = p.y + p.sz / 2;
		p.xPage = rect.x; p.yPage = rect.y;
		p.cxPage = rect.x + p.sz / 2; p.cyPage = rect.y + p.sz / 2;
		items[p.id] = p;
	}
	return items;
}
async function lacunaGameover() {
	showMessage('Game over');
	console.log('Game over');
	let [fen, players] = [T.fen, T.players];
	for (const p of fen.points) {
		let closestMeeple = findClosestMeeple(p);
		if (closestMeeple) {
			let owner = closestMeeple.owner;
			players[owner].flowers[p.bg] += 1;
			p.owner = owner;
		}
	}
	for (const plname of T.playerNames) {
		let pl = T.players[plname];
		for (const f in pl.flowers) pl.score += pl.flowers[f];
	}
	let table = T;
	table.winners = getPlayersWithMaxScore(table);
	table.status = 'over';
	table.turn = [];
	let id = table.id;
	let name = getUname();
	let step = table.step;
	let o = { id, name, step, table };
	let res = await mPostRoute('table', o); //console.log(res);
}
function lacunaGenerateFenPoints(n, nColors, w = 1000, h = 1000, rand = .8) {
	let pts = generateRandomPointsRound(n, w, h, rand);
	return pts.map(p => `${p.x}_${p.y}_${rChoose(range(nColors))}`); //.join(' ');
}
function lacunaMakeSelectableME() {
	for (const id of B.endPoints) {
		let div = mBy(id);
		mClass(div, 'selectable')
		div.onclick = ev => lacunaSelectPointME(ev);
	}
}
async function lacunaMoveCompletedME(idlist) {
	let [fen, players, me, table] = [T.fen, T.players, T.players[getUname()], T]
	B.endPoints.map(x => lacunaUnselectable(x));
	showMessage("________Move completed, removing", idlist);
	assertion(idlist.length == 2 || idlist.length == 0, `WTF3!!! ${idlist.length}`);
	if (idlist.length == 2) {
		fen.points = fen.points.filter(x => x.id != idlist[0] && x.id != idlist[1]);
		let color = B.diPoints[idlist[0]].bg;
		let flower = lacunaColorName(color);
		let n = lookup(me, ['flowers', color]);
		lookupSetOverride(me, ['flowers', color], n ? n + 2 : 2);
	}
	let nextPlayer = findPlayerWithMeeplesLeft(getUname()); console.log('nextPlayer', nextPlayer);
	if (nextPlayer) {
		table.turn = [nextPlayer];
		let o = { id: table.id, name: me, step: table.step + 1, table };
		let res = await mPostRoute('table', o); //console.log(res);
	} else await lacunaGameover();
}
function lacunaPresentPoints(points, d) {
	let [w, h, sz, margin, padding] = [400, 400, 10, 10, 20];
	B.sz = sz;
	let dParent = B.dParent = mDom(d, { w, h, margin, padding, position: 'relative', bg: '#eee' }, { id: 'dCanvas' });
	for (const p of points) {
		let p1 = pointFromFenRaw(p);
		p1.x = mapRange(p1.x, 0, 1000, 0, w - sz);
		p1.y = mapRange(p1.y, 0, 1000, 0, h - sz);
		p1 = pointAddMargin(p1, padding);
		p1.sz = sz;
		p1 = drawPoint(dParent, p1);
	}
}
async function lacunaSelectPointME(ev) {
	let [fen, players, pl] = [T.fen, T.players, T.players[getUname()]]
	let id = evToId(ev);
	let p = B.diPoints[id];
	lookupAddIfToList(B, ['selectedPoints'], id); //console.log(B.selectedPoints.length)
	assertion(B.selectedPoints.length >= 1, "WTF");
	if (B.selectedPoints.length == 1) {
		let eps = [];
		for (const pair of B.possiblePairs.map(x => x.split(',').map(x => B.diPoints[x]))) {
			let p1 = pair[0];
			let p2 = pair[1];
			if (p1.id != id && p2.id != id) continue;
			if (p1.id == id) addIf(eps, p2.id); else addIf(eps, p1.id);
		}
		let unselect = B.endPoints.filter(x => !eps.includes(x));
		unselect.map(x => lacunaUnselectable(x));
		B.endPoints = eps;
		if (B.endPoints.length < 2) {
			B.selectedPoints.push(B.endPoints[0]);
			await lacunaMoveCompletedME(B.selectedPoints);
		}
	} else {
		assertion(B.selectedPoints.length == 2, "WTF2!!!!!!!!!!!!!");
		await lacunaMoveCompletedME(B.selectedPoints);
	}
}
function lacunaStartMove() {
	lockForLengthyProcess();
	let t = getNow();
	h = { meeples: B.meeples, dParent: B.dParent, points: B.points, sz: B.sz };
	let [points, dParent, sz] = [B.points, B.dParent, B.sz];
	let result = findIsolatedPairs(points, sz * 1.2);
	let isolated = B.isolatedPairs = filterIsolatedPairs(result.isolatedPairs, B.meeples, 15);
	let [hotspots, linesByPair] = generateHotspots(dParent, isolated, sz, 'transparent');
	B.hotspots = hotspots;
	B.linesByPair = linesByPair;
	B.pairs = linesByPair;
	B.hotspotList = hotspots;
	B.hotspotDict = list2dict(hotspots, 'id');
	dParent.onmousemove = highlightHotspots;
	dParent.onclick = placeYourMeepleME;
	unlock();
}
function lacunaUnselectable(id) {
	let div = mBy(id);
	mClassRemove(div, 'selectable');
	div.onclick = null;
}
function last(arr) {
	return arr.length > 0 ? arr[arr.length - 1] : null;
}
function lastWord(s) { return arrLast(toWords(s)); }
function list2dict(arr, keyprop = 'id', uniqueKeys = true) {
	let di = {};
	for (const a of arr) {
		let key = typeof (a) == 'object' ? a[keyprop] : a;
		if (uniqueKeys) lookupSet(di, [key], a);
		else lookupAddToList(di, [key], a);
	}
	return di;
}
async function loadAssets() {
	M = await mGetYaml('../y/m.yaml');
	M.superdi = await mGetYaml('../y/superdi.yaml');
	M.details = await mGetYaml('../y/details.yaml');
	let [di, byColl, byFriendly, byCat, allImages] = [M.superdi, {}, {}, {}, {}];
	for (const k in di) {
		let o = di[k];
		for (const cat of o.cats) lookupAddIfToList(byCat, [cat], k);
		for (const coll of o.colls) lookupAddIfToList(byColl, [coll], k);
		lookupAddIfToList(byFriendly, [o.friendly], k)
		if (isdef(o.img)) {
			let fname = stringAfterLast(o.img, '/')
			allImages[fname] = { fname, path: o.img, k };
		}
	}
	M.allImages = allImages;
	M.byCat = byCat;
	M.byCollection = byColl;
	M.byFriendly = byFriendly;
	M.categories = Object.keys(byCat); M.categories.sort();
	M.collections = Object.keys(byColl); M.collections.sort();
	M.names = Object.keys(byFriendly); M.names.sort();
	M.dicolor = await mGetYaml(`../assets/dicolor.yaml`);
	[M.colorList, M.colorByHex, M.colorByName] = getListAndDictsForDicolors();
}
function lockForLengthyProcess() {
	DA.LengthyProcessRunning = true;
	console.log('LOCK!!!!!!!!!!!!!!!!!!!!!!');
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
function lookupSetOverride(dict, keys, val) {
	let d = dict;
	let ilast = keys.length - 1;
	let i = 0;
	for (const k of keys) {
		if (i == ilast) {
			if (nundef(k)) {
				return null;
			} else {
				d[k] = val;
			}
			return d[k];
		}
		if (nundef(k)) continue;
		if (nundef(d[k])) d[k] = {};
		d = d[k];
		i += 1;
	}
	return d;
}
function mAdjustPage(wmargin) {
	let r = getRect('dBuffer');
	let r2 = getRect('dExtra');
	let [w, h] = [window.innerWidth - wmargin, window.innerHeight - (r.h + r2.h)];
	mStyle('dMain', { w, h });
	mStyle('dPage', { w, h });
}
function mAnchorTo(elem, dAnchor, align = 'bl') {
	let rect = dAnchor.getBoundingClientRect();
	let drect = elem.getBoundingClientRect();
	let [v, h] = [align[0], align[1]];
	let vPos = v == 'b' ? { top: rect.bottom } : v == 'c' ? { top: rect.top } : { top: rect.top - drect.height };
	let hPos = h == 'l' ? { left: rect.left } : v == 'c' ? { left: rect.left } : { right: window.innerWidth - rect.right };
	let posStyles = { position: 'absolute' };
	addKeys(vPos, posStyles);
	addKeys(hPos, posStyles);
	mStyle(elem, posStyles);
}
function mAnimate(elem, prop, valist, callback, msDuration = 1000, easing = 'cubic-bezier(1,-0.03,.86,.68)', delay = 0, forwards = 'none') {
	let kflist = [];
	for (const perc in valist) {
		let o = {};
		let val = valist[perc];
		o[prop] = isString(val) || prop == 'opacity' ? val : '' + val + 'px';
		kflist.push(o);
	}
	let opts = { duration: msDuration, fill: forwards, easing: easing, delay: delay };
	let a = toElem(elem).animate(kflist, opts);
	if (isdef(callback)) { a.onfinish = callback; }
	return a;
}
function mAppend(d, child) { toElem(d).appendChild(child); return child; }
function mButton(caption, handler, dParent, styles, classes, id) {
	let x = mCreate('button');
	x.innerHTML = caption;
	if (isdef(handler)) x.onclick = handler;
	if (isdef(dParent)) toElem(dParent).appendChild(x);
	if (isdef(styles)) mStyle(x, styles);
	if (isdef(classes)) mClass(x, classes);
	if (isdef(id)) x.id = id;
	return x;
}
function mButtonX(dParent, handler = null, sz = 22, offset = 5, color = 'contrast') {
	mIfNotRelative(dParent);
	let bx = mDom(dParent, { position: 'absolute', top: -2 + offset, right: -5 + offset, w: sz, h: sz, cursor: 'pointer' }, { className: 'hop1' });
	bx.onclick = ev => { evNoBubble(ev); if (!handler) dParent.remove(); else handler(ev); }
	let o = M.superdi.xmark;
	let bg = mGetStyle(dParent, 'bg'); if (isEmpty(bg)) bg = 'white';
	let fg = color == 'contrast' ? colorIdealText(bg, true) : color;
	el = mDom(bx, { fz: sz, hline: sz, family: 'fa6', fg, display: 'inline' }, { html: String.fromCharCode('0x' + o.fa6) });
}
function mBy(id) { return document.getElementById(id); }
function mByAttr(key, val) {
	const selector = val ? `[${key}="${val}"]` : `[${key}]`;
	let list = Array.from(document.querySelectorAll(selector));
	return (list.length == 1) ? list[0] : list;
}
function mCenterCenter(d, gap) { mCenterCenterFlex(d, gap); }
function mCenterCenterFlex(d, gap) { mCenterFlex(d, true, true, true, gap); }
function mCenterFlex(d, hCenter = true, vCenter = false, wrap = true, gap = null) {
	let styles = { display: 'flex' };
	if (hCenter) styles['justify-content'] = 'center';
	styles['align-content'] = vCenter ? 'center' : 'flex-start';
	if (wrap) styles['flex-wrap'] = 'wrap';
	if (gap) styles.gap = gap;
	mStyle(d, styles);
}
function mClass(d) {
	d = toElem(d);
	if (arguments.length == 2) {
		let arg = arguments[1];
		if (isString(arg) && arg.indexOf(' ') > 0) { arg = [toWords(arg)]; }
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
	toElem(d).innerHTML = '';
}
function mClearAllSelections() {
	let arr = Array.from(document.getElementsByClassName('framedPicture'));//find all visible uis for selected images
	arr.forEach(mUnselect);
	UI.selectedImages = [];
}
function mColFlex(dParent, chflex = [1, 5, 1], bgs) {
	let styles = { opacity: 1, display: 'flex', aitems: 'stretch', 'flex-flow': 'nowrap' };
	mStyle(dParent, styles);
	let res = [];
	for (let i = 0; i < chflex.length; i++) {
		let bg = isdef(bgs) ? bgs[i] : null;
		let d1 = mDiv(dParent, { flex: chflex[i], bg: bg });
		res.push(d1);
	}
	return res;
}
function mCommand(dParent, key, html, opts = {}) {
	if (nundef(html)) html = capitalize(key);
	let close = valf(opts.close, () => { console.log('close', key) });
	let save = valf(opts.save, false);
	let open = valf(opts.open, window[`onclick${capitalize(key)}`]);
	let d = mDom(dParent, { display: 'inline-block' }, { key: key });
	let a = mDom(d, {}, { id: `${key}`, key: `${key}`, tag: 'a', href: '#', html: html, className: 'nav-link', onclick: onclickCommand })
	let cmd = { dParent, elem: d, div: a, key, open, close, save };
	addKeys(opts, cmd);
	return cmd;
}
function mCreate(tag, styles, id) { let d = document.createElement(tag); if (isdef(id)) d.id = id; if (isdef(styles)) mStyle(d, styles); return d; }
function mCreateFrom(htmlString) {
	var div = document.createElement('div');
	div.innerHTML = htmlString.trim();
	return div.firstChild;
}
function mDataTable(reclist, dParent, rowstylefunc, headers, id, showheaders = true) {
	if (nundef(headers)) headers = Object.keys(reclist[0]);
	let t = mTable(dParent, headers, showheaders);
	if (isdef(id)) t.id = `t${id}`;
	let rowitems = [];
	let i = 0;
	for (const u of reclist) {
		let rid = isdef(id) ? `r${id}_${i}` : null;
		r = mTableRow(t, u, headers, rid);
		if (isdef(rowstylefunc)) mStyle(r.div, rowstylefunc(u));
		rowitems.push({ div: r.div, colitems: r.colitems, o: u, id: rid, index: i });
		i++;
	}
	return { div: t, rowitems: rowitems };
}
function mDatalist(dParent, list, opts = {}) {
	var mylist = list;
	var opts = opts;
	addKeys({ alpha: true, filter: 'contains' }, opts);
	let d = mDiv(toElem(dParent));
	let optid = getUID('dl');
	let inp = mDom(d, { w: 180, maleft: 4 }, { tag: 'input', className: 'input', placeholder: valf(opts.placeholder, '') });
	if (isdef(opts.value)) inp.value = opts.value;
	let datalist = mDom(d, {}, { tag: 'datalist', id: optid, className: 'datalist' });
	var elem = d;
	for (const w of mylist) { mDom(datalist, {}, { tag: 'option', value: w }); }
	inp.setAttribute('list', optid);
	if (opts.onupdate) {
		inp.addEventListener('keyup', opts.onupdate);
	} else if (isdef(opts.edit)) {
		inp.onmousedown = () => inp.value = '';
	} else {
		inp.onblur = () => {
			const isValueSelected = list.includes(inp.value);
			if (!isValueSelected) {
				inp.value = inp.getAttribute('prev_value'); // Restore the previous value if no selection is made
			}
		}
		inp.onmousedown = () => { inp.setAttribute('prev_value', inp.value); inp.value = ''; }
	}
	return {
		list: mylist,
		elem: elem,
		inpElem: inp,
		listElem: datalist,
		opts: opts,
	}
}
function mDiv(dParent, styles, id, inner, classes, sizing) {
	dParent = toElem(dParent);
	let d = mCreate('div');
	if (dParent) mAppend(dParent, d);
	if (isdef(styles)) mStyle(d, styles);
	if (isdef(classes)) mClass(d, classes);
	if (isdef(id)) d.id = id;
	if (isdef(inner)) d.innerHTML = inner;
	if (isdef(sizing)) { setRect(d, sizing); }
	return d;
}
function mDom(dParent, styles = {}, opts = {}) {
	let tag = valf(opts.tag, 'div');
	let d = document.createElement(tag);
	if (isdef(dParent)) mAppend(dParent, d);
	if (tag == 'textarea') styles.wrap = 'hard';
	const aliases = {
		classes: 'className',
		inner: 'innerHTML',
		html: 'innerHTML',
		w: 'width',
		h: 'height',
	};
	for (const opt in opts) {
		let name = valf(aliases[opt], opt), val = opts[opt];
		if (['style', 'tag', 'innerHTML', 'className', 'checked', 'value'].includes(name) || name.startsWith('on')) d[name] = val;
		else d.setAttribute(name, val);
	}
	mStyle(d, styles);
	return d;
}
function mDom100(dParent, styles = {}, opts = {}) { copyKeys({ w100: true, h100: true, box: true }, styles); return mDom(dParent, styles, opts); }
function mDummyFocus() {
	if (nundef(mBy('dummy'))) addDummy(document.body, 'cc');
	mBy('dummy').focus();
}
function mFlex(d, or = 'h') {
	d = toElem(d);
	d.style.display = 'flex';
	d.style.flexFlow = (or == 'v' ? 'column' : 'row') + ' ' + (or == 'w' ? 'wrap' : 'nowrap');
}
function mFlexLine(d, startEndCenter = 'center') { mStyle(d, { display: 'flex', 'justify-content': startEndCenter, 'align-items': 'center' }); }
function mFlexV(d) { mStyle(d, { display: 'flex', 'align-items': 'center' }); }
function mFlexVWrap(d) { mStyle(d, { display: 'flex', 'align-items': 'center', 'flex-flow': 'row wrap' }); }
function mFlexWrap(d) { mFlex(d, 'w'); }
function mGather(dAnchor, styles = {}, opts = {}) {
	return new Promise((resolve, _) => {
		let [content, type] = [valf(opts.content, 'name'), valf(opts.type, 'text')]; //defaults
		let dbody = document.body;
		let dDialog = mDom(dbody, { bg: '#00000040', box: true, w: '100vw', h: '100vh' }, { tag: 'dialog', id: 'dDialog' });
		let d = mDom(dDialog);
		let funcName = `uiGadgetType${capitalize(type)}`; //console.log(funcName)
		let uiFunc = window[funcName];
		let dx = uiFunc(d, content, x => { dDialog.remove(); resolve(x) }, styles, opts);
		if (isdef(opts.title)) mInsert(dx, mCreateFrom(`<h2>Details for ${opts.title}</h2>`))
		dDialog.addEventListener('mouseup', ev => {
			if (opts.type != 'select' && isPointOutsideOf(dx, ev.clientX, ev.clientY)) {
				resolve(null);
				dDialog.remove();
			}
		});
		dDialog.addEventListener('keydown', ev => {
			if (ev.key === 'Escape') {
				dDialog.remove();
				console.log('RESOLVE NULL ESCAPE');
				resolve(null);
			}
		});
		dDialog.showModal();
		if (isdef(dAnchor)) mAnchorTo(dx, toElem(dAnchor), opts.align);
		else { mStyle(d, { h: '100vh' }); mCenterCenterFlex(d); }
	});
}
async function mGetFiles(dir, port = 3000) {
	let server = getServerurl(port);
	let data = await mGetJsonCors(`${server}/filenames?directory=${dir}`);
	return data.files;
}
async function mGetJsonCors(url) {
	let res = await fetch(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		mode: 'cors' // Set CORS mode to enable cross-origin requests
	});
	let json = await res.json();
	return json;
}
async function mGetRoute(route, o = {}, port = 3000) {
	let server = getServerurl(port);
	server += `/${route}?`;
	for (const k in o) { server += `${k}=${o[k]}&`; }
	const response = await fetch(server, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		mode: 'cors',
	});
	return tryJSONParse(await response.text());
}
function mGetStyle(elem, prop) {
	let val;
	elem = toElem(elem);
	if (prop == 'bg') { val = getStyleProp(elem, 'background-color'); if (isEmpty(val)) return getStyleProp(elem, 'background'); }
	else if (isdef(STYLE_PARAMS[prop])) { val = getStyleProp(elem, STYLE_PARAMS[prop]); }
	else {
		switch (prop) {
			case 'vmargin': val = stringBefore(elem.style.margin, ' '); break;
			case 'hmargin': val = stringAfter(elem.style.margin, ' '); break;
			case 'vpadding': val = stringBefore(elem.style.padding, ' '); break;
			case 'hpadding': val = stringAfter(elem.style.padding, ' '); break;
			case 'box': val = elem.style.boxSizing; break;
			case 'dir': val = elem.style.flexDirection; break;
		}
	}
	if (nundef(val)) val = getStyleProp(elem, prop);
	if (val.endsWith('px')) return firstNumber(val); else return val;
}
function mGetStyles(elem, proplist) {
	let res = {};
	for (const p of proplist) { res[p] = mGetStyle(elem, p) }
	return res;
}
async function mGetYaml(path = '../base/assets/m.txt') {
	let res = await fetch(path);
	let text = await res.text();
	let di = jsyaml.load(text);
	return di;
}
function mGrid(rows, cols, dParent, styles = {}, opts = {}) {
	[rows, cols] = [Math.ceil(rows), Math.ceil(cols)]
	addKeys({ display: 'inline-grid', gridCols: 'repeat(' + cols + ',1fr)' }, styles);
	if (rows) styles.gridRows = 'repeat(' + rows + ',auto)';
	else styles.overy = 'auto';
	let d = mDiv(dParent, styles, opts);
	return d;
}
function mHasClass(el, className) {
	if (el.classList) return el.classList.contains(className);
	else {
		let x = !!el.className;
		return isString(x) && !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}
}
function mIfNotRelative(d) { d = toElem(d); if (isEmpty(d.style.position)) d.style.position = 'relative'; }
function mInsert(dParent, el, index = 0) { dParent.insertBefore(el, dParent.childNodes[index]); return el; }
function mItem(liveprops = {}, opts = {}) {
	let id = valf(opts.id, getUID());
	let item = opts;
	item.live = liveprops;
	item.id = id;
	let d = iDiv(item); if (isdef(d)) d.id = id;
	Items[id] = item;
	return item;
}
function mKey(imgKey, d, styles = {}, opts = {}) {
	let o = lookup(M.superdi, [imgKey]);
	let src;
	if (nundef(o) && imgKey.includes('.')) src = imgKey;
	else if (isdef(o) && isdef(opts.prefer)) src = valf(o[opts.prefer], o.img);
	else if (isdef(o)) src = valf(o.img, o.photo)
	if (nundef(src)) src = rChoose(M.allImages).path;
	let [w, h] = mSizeSuccession(styles, 40);
	addKeys({ w, h }, styles)
	let img = mDom(d, styles, { tag: 'img', src });
	return img;
}
function mLMR(dParent) {
	dParent = toElem(dParent);
	let d = mDom(dParent, { display: 'flex', 'align-items': 'center', 'justify-content': 'space-between', 'flex-flow': 'row nowrap' });
	let stflex = { gap: 10, display: 'flex', 'align-items': 'center' };
	let [l, m, r] = [mDom(d, stflex), mDom(d, stflex), mDom(d, stflex)];
	return [d, l, m, r];
}
function mLinebreak(dParent, gap) {
	dParent = toElem(dParent);
	let d;
	let display = getComputedStyle(dParent).display;
	if (display == 'flex') {
		d = mDiv(dParent, { fz: 2, 'flex-basis': '100%', h: 0, w: '100%' }, null, ' &nbsp; ');
	} else {
		d = mDiv(dParent, {}, null, '<br>');
	}
	if (isdef(gap)) { d.style.minHeight = gap + 'px'; d.innerHTML = ' &nbsp; '; d.style.opacity = .2; }
	return d;
}
function mMagnify(elem, scale = 5) {
	elem.classList.add(`topmost`);
	MAGNIFIER_IMAGE = elem;
	const rect = elem.getBoundingClientRect();
	let [w, h] = [rect.width * scale, rect.height * scale];
	let [cx, cy] = [rect.width / 2 + rect.left, rect.height / 2 + rect.top];
	let [l, t, r, b] = [cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2];
	let originX = 'center';
	let originY = 'center';
	let [tx, ty] = [0, 0];
	if (l < 0) { tx = -l / scale; }
	if (t < 0) { ty = -t / scale; }
	if (r > window.innerWidth) { tx = -(r - window.innerWidth) / scale; }
	if (b > window.innerHeight) { ty = -(b - window.innerHeight) / scale; }
	elem.style.transform = `scale(${scale}) translate(${tx}px,${ty}px)`;
	elem.style.transformOrigin = `${originX} ${originY}`;
}
function mMagnifyOff() {
	if (!MAGNIFIER_IMAGE) return;
	let elem = MAGNIFIER_IMAGE;
	MAGNIFIER_IMAGE = null;
	elem.classList.remove(`topmost`); //magnify4`); 
	elem.style.transform = null;
}
function mMenu(dParent, key) { let [d, l, m, r] = mLMR(dParent); return { dParent, elem: d, l, m, r, key, cur: null }; }
function mNewline(d, gap = 1) { mDom(d, { h: gap }); }
function mOnEnter(elem, handler) {
	elem.addEventListener('keydown', ev => {
		if (ev.key == 'Enter') {
			ev.preventDefault();
			mDummyFocus();
			if (handler) handler(ev);
		}
	});
}
function mPlace(elem, pos, offx, offy) {
	elem = toElem(elem);
	pos = pos.toLowerCase();
	let dParent = elem.parentNode; mIfNotRelative(dParent);
	let hor = valf(offx, 0);
	let vert = isdef(offy) ? offy : hor;
	if (pos[0] == 'c' || pos[1] == 'c') {
		let dpp = dParent.parentNode;
		let opac = mGetStyle(dParent, 'opacity'); //console.log('opac', opac);
		if (nundef(dpp)) { mAppend(document.body, dParent); mStyle(dParent, { opacity: 0 }) }
		let rParent = getRect(dParent);
		let [wParent, hParent] = [rParent.w, rParent.h];
		let rElem = getRect(elem);
		let [wElem, hElem] = [rElem.w, rElem.h];
		if (nundef(dpp)) { dParent.remove(); mStyle(dParent, { opacity: valf(opac, 1) }) }
		switch (pos) {
			case 'cc': mStyle(elem, { position: 'absolute', left: hor + (wParent - wElem) / 2, top: vert + (hParent - hElem) / 2 }); break;
			case 'tc': mStyle(elem, { position: 'absolute', left: hor + (wParent - wElem) / 2, top: vert }); break;
			case 'bc': mStyle(elem, { position: 'absolute', left: hor + (wParent - wElem) / 2, bottom: vert }); break;
			case 'cl': mStyle(elem, { position: 'absolute', left: hor, top: vert + (hParent - hElem) / 2 }); break;
			case 'cr': mStyle(elem, { position: 'absolute', right: hor, top: vert + (hParent - hElem) / 2 }); break;
		}
		return;
	}
	let di = { t: 'top', b: 'bottom', r: 'right', l: 'left' };
	elem.style.position = 'absolute';
	let kvert = di[pos[0]], khor = di[pos[1]];
	elem.style[kvert] = vert + 'px'; elem.style[khor] = hor + 'px';
}
function mPopup(dParent, styles = {}, opts = {}) {
	if (nundef(dParent)) dParent = document.body;
	if (isdef(mBy(opts.id))) mRemove(opts.id);
	mIfNotRelative(dParent);
	let animation = 'diamond-in-center .5s ease-in-out'; let transition = 'opacity .5s ease-in-out';
	addKeys({ animation, bg: 'white', fg: 'black', padding: 20, rounding: 12, top: 50, left: '50%', transform: 'translateX(-50%)', position: 'absolute' }, styles);
	let popup = mDom(dParent, styles, opts);
	mButtonX(popup);
	return popup;
}
function mPos(d, x, y, unit = 'px') { mStyle(d, { left: x, top: y, position: 'absolute' }, unit); }
async function mPostRoute(route, o = {}) {
	let server = getServerurl();
	server += `/${route}`;
	const response = await fetch(server, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		mode: 'cors',
		body: JSON.stringify(o)
	});
	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		return 'ERROR 1';
	}
}
function mRadio(label, val, name, dParent, styles = {}, onchangeHandler, group_id, is_on) {
	let cursor = styles.cursor; delete styles.cursor;
	let d = mDiv(dParent, styles, group_id + '_' + val);
	let id = isdef(group_id) ? `i_${group_id}_${val}` : getUID();
	let type = isdef(group_id) ? 'radio' : 'checkbox';
	let checked = isdef(is_on) ? is_on : false;
	let inp = mCreateFrom(`<input class='radio' id='${id}' type="${type}" name="${name}" value="${val}">`);
	if (checked) inp.checked = true;
	let text = mCreateFrom(`<label for='${inp.id}'>${label}</label>`);
	if (isdef(cursor)) { inp.style.cursor = text.style.cursor = cursor; }
	mAppend(d, inp);
	mAppend(d, text);
	if (isdef(onchangeHandler)) {
		inp.onchange = ev => {
			ev.cancelBubble = true;
			if (onchangeHandler == 'toggle') {
			} else if (isdef(onchangeHandler)) {
				onchangeHandler(ev.target.checked, name, val);
			}
		};
	}
	return d;
}
function mRadioGroup(dParent, styles, id, legend, legendstyles) {
	let dOuter = mDom(dParent, { bg: 'white', rounding: 10, margin: 4 })
	let f = mCreate('fieldset');
	f.id = id;
	if (isdef(styles)) mStyle(f, styles);
	if (isdef(legend)) {
		let l = mCreate('legend');
		l.innerHTML = legend;
		mAppend(f, l);
		if (isdef(legendstyles)) { mStyle(l, legendstyles); }
	}
	mAppend(dOuter, f);
	return f;
}
function mRemove(elem) {
	elem = toElem(elem); if (nundef(elem)) return;
	var a = elem.attributes, i, l, n;
	if (a) {
		for (i = a.length - 1; i >= 0; i -= 1) {
			n = a[i].name;
			if (typeof elem[n] === 'function') {
				elem[n] = null;
			}
		}
	}
	a = elem.childNodes;
	if (a) {
		l = a.length;
		for (i = a.length - 1; i >= 0; i -= 1) {
			mRemove(elem.childNodes[i]);
		}
	}
	elem.remove();
}
function mRemoveClass(d) { for (let i = 1; i < arguments.length; i++) d.classList.remove(arguments[i]); }
function mRemoveIfExists(d) { d = toElem(d); if (isdef(d)) d.remove(); }
function mSelect(elem) { mClass(elem, 'framedPicture'); }
function mShield(dParent, styles = {}, id = null, classnames = null, hideonclick = false) {
	addKeys({ bg: '#00000020' }, styles);
	dParent = toElem(dParent);
	let d = mDiv(dParent, styles, id, classnames);
	mIfNotRelative(dParent);
	mStyle(d, { position: 'absolute', left: 0, top: 0, w: '100%', h: '100%' });
	if (hideonclick) d.onclick = ev => { evNoBubble(ev); d.remove(); };
	else d.onclick = ev => { evNoBubble(ev); };
	mClass(d, 'topmost');
	return d;
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
			setTimeout(() => {
				try {
					rej(`PROMISE REJECT ${isdef(TO.SLEEPTIMEOUT)}`);
				} catch (err) {
					console.log(`WTF!!!!!!!!!!!!!!!!!!`, err);
				}
			}, ms + 1);
		});
}
function mStyle(elem, styles = {}, unit = 'px') {
	elem = toElem(elem);
	let style = styles = jsCopy(styles);
	if (isdef(styles.w100)) style.w = '100%';
	if (isdef(styles.h100)) style.h = '100%';
	let bg, fg;
	if (isdef(styles.bg) || isdef(styles.fg)) {
		[bg, fg] = colorsFromBFA(styles.bg, styles.fg, styles.alpha);
	}
	if (isdef(styles.vpadding) || isdef(styles.hpadding)) {
		styles.padding = valf(styles.vpadding, 0) + unit + ' ' + valf(styles.hpadding, 0) + unit;
	}
	if (isdef(styles.vmargin) || isdef(styles.hmargin)) {
		styles.margin = valf(styles.vmargin, 0) + unit + ' ' + valf(styles.hmargin, 0) + unit;
	}
	if (isdef(styles.upperRounding) || isdef(styles.lowerRounding)) {
		let rtop = '' + valf(styles.upperRounding, 0) + unit;
		let rbot = '' + valf(styles.lowerRounding, 0) + unit;
		styles['border-radius'] = rtop + ' ' + rtop + ' ' + rbot + ' ' + rbot;
	}
	if (isdef(styles.box)) styles['box-sizing'] = 'border-box';
	if (isdef(styles.round)) { elem.style.setProperty('border-radius', '50%'); }
	for (const k in styles) {
		if (['round', 'box'].includes(k)) continue;
		let val = styles[k];
		let key = k;
		if (isdef(STYLE_PARAMS[k])) key = STYLE_PARAMS[k];
		else if (k == 'font' && !isString(val)) {
			let fz = f.size; if (isNumber(fz)) fz = '' + fz + 'px';
			let ff = f.family;
			let fv = f.variant;
			let fw = isdef(f.bold) ? 'bold' : isdef(f.light) ? 'light' : f.weight;
			let fs = isdef(f.italic) ? 'italic' : f.style;
			if (nundef(fz) || nundef(ff)) return null;
			let s = fz + ' ' + ff;
			if (isdef(fw)) s = fw + ' ' + s;
			if (isdef(fv)) s = fv + ' ' + s;
			if (isdef(fs)) s = fs + ' ' + s;
			elem.style.setProperty(k, s);
			continue;
		} else if (k.includes('class')) {
			mClass(elem, styles[k]);
		} else if (k == 'border') {
			if (isNumber(val)) val = `solid ${val}px ${isdef(styles.fg) ? styles.fg : '#ffffff80'}`;
			if (val.indexOf(' ') < 0) val = 'solid 1px ' + val;
		} else if (k == 'ajcenter') {
			elem.style.setProperty('justify-content', 'center');
			elem.style.setProperty('align-items', 'center');
		} else if (k == 'layout') {
			if (val[0] == 'f') {
				val = val.slice(1);
				elem.style.setProperty('display', 'flex');
				elem.style.setProperty('flex-wrap', 'wrap');
				let hor, vert;
				if (val.length == 1) hor = vert = 'center';
				else {
					let di = { c: 'center', s: 'start', e: 'end' };
					hor = di[val[1]];
					vert = di[val[2]];
				}
				let justStyle = val[0] == 'v' ? vert : hor;
				let alignStyle = val[0] == 'v' ? hor : vert;
				elem.style.setProperty('justify-content', justStyle);
				elem.style.setProperty('align-items', alignStyle);
				switch (val[0]) {
					case 'v': elem.style.setProperty('flex-direction', 'column'); break;
					case 'h': elem.style.setProperty('flex-direction', 'row'); break;
				}
			} else if (val[0] == 'g') {
				val = val.slice(1);
				elem.style.setProperty('display', 'grid');
				let n = allNumbers(val);
				let cols = n[0];
				let w = n.length > 1 ? '' + n[1] + 'px' : 'auto';
				elem.style.setProperty('grid-template-columns', `repeat(${cols}, ${w})`);
				elem.style.setProperty('place-content', 'center');
			}
		} else if (k == 'layflex') {
			elem.style.setProperty('display', 'flex');
			elem.style.setProperty('flex', '0 1 auto');
			elem.style.setProperty('flex-wrap', 'wrap');
			if (val == 'v') { elem.style.setProperty('writing-mode', 'vertical-lr'); }
		} else if (k == 'laygrid') {
			elem.style.setProperty('display', 'grid');
			let n = allNumbers(val);
			let cols = n[0];
			let w = n.length > 1 ? '' + n[1] + 'px' : 'auto';
			elem.style.setProperty('grid-template-columns', `repeat(${cols}, ${w})`);
			elem.style.setProperty('place-content', 'center');
		}
		if (key == 'font-weight') { elem.style.setProperty(key, val); continue; }
		else if (key == 'background-color') elem.style.background = bg;
		else if (key == 'color') elem.style.color = fg;
		else if (key == 'opacity') elem.style.opacity = val;
		else if (key == 'wrap') { if (val == 'hard') elem.setAttribute('wrap', 'hard'); else elem.style.flexWrap = 'wrap'; }
		else if (k.startsWith('dir')) {
			isCol = val[0] == 'c';
			elem.style.setProperty('flex-direction', 'column');
		} else if (key == 'flex') {
			if (isNumber(val)) val = '' + val + ' 1 0%';
			elem.style.setProperty(key, makeUnitString(val, unit));
		} else {
			elem.style.setProperty(key, makeUnitString(val, unit));
		}
	}
}
function mTable(dParent, headers, showheaders, styles = { mabottom: 0 }, className = 'table') {
	let d = mDiv(dParent);
	let t = mCreate('table');
	mAppend(d, t);
	if (isdef(className)) mClass(t, className);
	if (isdef(styles)) mStyle(t, styles);
	if (showheaders) {
		let code = `<tr>`;
		for (const h of headers) {
			code += `<th>${h}</th>`
		}
		code += `</tr>`;
		t.innerHTML = code;
	}
	return t;
}
function mTableCol(r, val) {
	let col = mCreate('td');
	mAppend(r, col);
	if (isdef(val)) col.innerHTML = val;
	return col;
}
function mTableCommandify(rowitems, di) {
	for (const item of rowitems) {
		for (const index in di) {
			let colitem = item.colitems[index];
			colitem.div.innerHTML = di[index](item, colitem.val);
		}
	}
}
function mTableRow(t, o, headers, id) {
	let elem = mCreate('tr');
	if (isdef(id)) elem.id = id;
	mAppend(t, elem);
	let colitems = [];
	for (const k of headers) {
		let val = isdef(o[k]) ? isDict(o[k]) ? JSON.stringify(o[k]) : isList(o[k]) ? o[k].join(', ') : o[k] : '';
		let col = mTableCol(elem, val);
		colitems.push({ div: col, key: k, val: val });
	}
	return { div: elem, colitems: colitems };
}
function mTableStylify(rowitems, di) {
	for (const item of rowitems) {
		for (const index in di) {
			let colitem = item.colitems[index];
			mStyle(colitem.div, di[index]);
		}
	}
}
function mText(text, dParent, styles, classes) {
	if (!isString(text)) text = text.toString();
	let d = mDiv(dParent);
	if (!isEmpty(text)) { d.innerHTML = text; }
	if (isdef(styles)) mStyle(d, styles);
	if (isdef(classes)) mClass(d, classes);
	return d;
}
function mUnselect(elem) { mClassRemove(elem, 'framedPicture'); }
function makeArrayWithParts(keys) {
	let arr = []; keys[0].split('_').map(x => arr.push([]));
	for (const key of keys) {
		let parts = key.split('_');
		for (let i = 0; i < parts.length; i++) arr[i].push(parts[i]);
	}
	return arr;
}
function makeSVG(tag, attrs) {
	var el = "<" + tag;
	for (var k in attrs)
		el += " " + k + "=\"" + attrs[k] + "\"";
	return el + "/>";
}
function makeUnitString(nOrString, unit = 'px', defaultVal = '100%') {
	if (nundef(nOrString)) return defaultVal;
	if (isNumber(nOrString)) nOrString = '' + nOrString + unit;
	return nOrString;
}
function mapRange(value, inMin, inMax, outMin, outMax) {
	return Math.round((value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin);
}
function measureElement(el) {
	let info = window.getComputedStyle(el, null);
	return { w: info.width, h: info.height };
}
function measureFieldset(fs) {
	let legend = fs.firstChild;
	let r = getRect(legend);
	let labels = fs.getElementsByTagName('label');
	let wmax = 0;
	for (const l of labels) {
		let r1 = getRect(l);
		wmax = Math.max(wmax, r1.w);
	}
	let wt = r.w;
	let wo = wmax + 24;
	let diff = wt - wo;
	if (diff >= 10) {
		for (const l of labels) { let d = l.parentNode; mStyle(d, { maleft: diff / 2 }); }
	}
	let wneeded = Math.max(wt, wo) + 10;
	mStyle(fs, { wmin: wneeded });
	for (const l of labels) { let d = l.parentNode; mStyle(l, { display: 'inline-block', wmin: 50 }); mStyle(d, { wmin: wneeded - 40 }); }
}
function measureHeightOfTextStyle(dParent, styles = {}) {
	let d = mDom(dParent, styles, { html: 'Hql' });
	let s = measureElement(d);
	d.remove();
	return firstNumber(s.h);
}
function menuCloseCalendar() { closePopup(); delete DA.calendar; clearMain(); }
function menuCloseCurrent(menu) {
	let curKey = lookup(menu, ['cur']);
	if (curKey) {
		let cur = menu.commands[curKey];
		if (nundef(cur)) return;
		mClassRemove(iDiv(cur), 'activeLink'); //unselect cur command
		cur.close();
	}
}
function menuCloseGames() { clearMain(); }
function menuCloseHome() { closeLeftSidebar(); clearMain(); }
async function menuCloseSettings() { delete DA.settings; closeLeftSidebar(); clearMain(); }
function menuCloseSimple() { closeLeftSidebar(); clearMain(); }
function menuCloseTable() { if (T) Tid = T.id; T = null; delete DA.pendingChanges; clearMain(); mClass('dExtra', 'p10hide'); }
function menuCommand(dParent, menuKey, key, html, open, close) {
	let cmd = mCommand(dParent, key, html, { open, close });
	let a = iDiv(cmd);
	a.setAttribute('key', `${menuKey}_${key}`);
	a.onclick = onclickMenu;
	cmd.menuKey = menuKey;
	return cmd;
}
async function menuOpen(menu, key, defaultKey = 'settings') {
	let cmd = menu.commands[key];
	if (nundef(cmd)) { console.log('abandon', key); await switchToMainMenu(defaultKey); return; }
	menu.cur = key;
	mClass(iDiv(cmd), 'activeLink'); //console.log('cmd',cmd)
	if (isdef(mBy('dExtra'))) await updateExtra();
	await cmd.open();
}
function mimali(c, m) {
	let seasonColors = 'winter_blue midnightblue light_azure capri spring_frost light_green deep_green summer_sky yellow_pantone orange pale_fallen_leaves timberwolf'.split(' ');
	let c2 = seasonColors[m - 1];
	let colors = paletteMix(c, c2, 6).slice();
	let wheel = [];
	for (const x of colors) {
		let pal1 = paletteShades(x);
		for (const i of range(7)) wheel.push(pal1[i + 2]);
	}
	return wheel;
}
function mixColors(c1, c2, c2Weight01) {
	let [color1, color2] = [colorFrom(c1), colorFrom(c2)]
	const hex1 = color1.substring(1);
	const hex2 = color2.substring(1);
	const r1 = parseInt(hex1.substring(0, 2), 16);
	const g1 = parseInt(hex1.substring(2, 4), 16);
	const b1 = parseInt(hex1.substring(4, 6), 16);
	const r2 = parseInt(hex2.substring(0, 2), 16);
	const g2 = parseInt(hex2.substring(2, 4), 16);
	const b2 = parseInt(hex2.substring(4, 6), 16);
	const r = Math.floor(r1 * (1 - c2Weight01) + r2 * c2Weight01);
	const g = Math.floor(g1 * (1 - c2Weight01) + g2 * c2Weight01);
	const b = Math.floor(b1 * (1 - c2Weight01) + b2 * c2Weight01);
	const hex = colorRgbArgsToHex79(r, g, b);
	return hex;
}
function name2id(name) { return 'd_' + name.split(' ').join('_'); }
const names = ['felix', 'amanda', 'sabine', 'tom', 'taka', 'microbe', 'dwight', 'jim', 'michael', 'pam', 'kevin', 'darryl', 'lauren', 'anuj', 'david', 'holly'];
function normalizeString(s, sep = '_', keep = []) {
	s = s.toLowerCase().trim();
	let res = '';
	for (let i = 0; i < s.length; i++) { if (isAlphaNum(s[i]) || keep.includes(s[i])) res += s[i]; else if (last(res) != sep) res += sep; }
	return res;
}
function nundef(x) { return x === null || x === undefined || x === 'undefined'; }
async function onEventEdited(id, text, time) {
	console.log('onEventEdited', id, text, time)
	let e = Items[id];
	if (nundef(time)) {
		[time, text] = extractTime(text);
	}
	e.time = time;
	e.text = text;
	let result = await simpleUpload('postUpdateEvent', e);
	console.log('result', result)
	Items[id] = lookupSetOverride(Serverdata, ['events', id], e);
	mBy(id).firstChild.value = getEventValue(e);
	closePopup();
}
async function onclickClearPlayers() {
	let me = getUname();
	DA.playerList = [me];
	for (const name in DA.allPlayers) {
		if (name != me) unselectPlayerItem(DA.allPlayers[name]);
	}
	assertion(!isEmpty(DA.playerList), "uname removed from playerList!!!!!!!!!!!!!!!")
	DA.lastName = me;
	mRemoveIfExists('dPlayerOptions')
}
async function onclickCommand(ev) {
	let key = evToAttr(ev, 'key'); //console.log(key);
	let cmd = key == 'user' ? UI.nav.commands.user : UI.commands[key];
	assertion(isdef(cmd), `command ${key} not in UI!!!`)
	await cmd.open();
}
function onclickDay(d, styles) {
	let tsDay = d.id;
	let tsCreated = Date.now();
	let id = generateEventId(tsDay, tsCreated);
	let uname = U ? getUname() : 'guest';
	let o = { id: id, created: tsCreated, day: tsDay, time: '', text: '', user: uname, shared: false, subscribers: [] };
	Items[id] = o;
	let x = uiTypeEvent(d, o, styles);
	x.inp.focus();
}
async function onclickDeleteTable(id) {
	let res = await mPostRoute('deleteTable', { id });
}
function onclickExistingEvent(ev) { evNoBubble(ev); showEventOpen(evToId(ev)); }
async function onclickGameMenuItem(ev) {
	let gamename = evToAttr(ev, 'gamename');
	await showGameMenu(gamename);
}
async function onclickGameMenuPlayer(ev) {
	let name = evToAttr(ev, 'username'); //console.log('name',name); return;
	let shift = ev.shiftKey;
	await showGameMenuPlayerDialog(name, shift);
}
async function onclickJoinTable(id) {
	let table = Serverdata.tables.find(x => x.id == id);
	let me = getUname();
	assertion(table.status == 'open', 'too late to join! game has already started!')
	assertion(!table.playerNames.includes(me), `${me} already joined!!!`);
	table.players[me] = createGamePlayer(me, table.game);
	table.playerNames.push(me);
	let res = await mPostRoute('postTable', { id, players: table.players, playerNames: table.playerNames });
}
async function onclickLeaveTable(id) {
	let table = Serverdata.tables.find(x => x.id == id);
	let me = getUname();
	assertion(table.status == 'open', 'too late to leave! game has already started!')
	assertion(table.playerNames.includes(me), `${me} NOT in joined players!!!!`);
	delete table.players[me];
	removeInPlace(table.playerNames, me);
	let res = await mPostRoute('postTable', { id, players: table.players, playerNames: table.playerNames });
}
function onclickMenu(ev) {
	let keys = evToAttr(ev, 'key');
	let [menuKey, cmdKey] = keys.split('_');
	let menu = UI[menuKey];
	switchToMenu(menu, cmdKey);
}
async function onclickOpenToJoinGame() {
	let options = collectOptions();
	let players = collectPlayers();
	mRemove('dGameMenu');
	let t = createOpenTable(DA.gamename, players, options);
	let res = await mPostRoute('postTable', t);
}
async function onclickPlan() { await showCalendarApp(); }
async function onclickPlay() {
	await showTables('onclickPlay');
	showGames();
}
async function onclickSimple() {
	let name = valf(localStorage.getItem('sisi'), 'tierspiel'); //console.log(name);
	simpleSidebar(150);
	mAdjustPage(150);
	let div = mDom100('dMain');
	let sisi = UI.simple = { name, div };
	let [w, h, bg, fg] = [sisi.w, sisi.h, sisi.bg, sisi.fg] = [mGetStyle(div, 'w'), mGetStyle(div, 'h'), getNavBg(), getThemeFg()];
	let d1 = mDom(div); mCenterFlex(d1)
	let dMenu = sisi.dMenu = mDom(d1, { gap: 10, padding: 12 }, { className: 'title' }); mFlexVWrap(dMenu);
	let dInstruction = sisi.dInstruction = mDom(d1, { w100: true, align: 'center', fg }, { html: '* press Control key when hovering to magnify image! *' })
	let dBatch = sisi.dBatch = mDom(d1);
	let cellStyles = { bg, fg: 'contrast', box: true, margin: 8, w: 128, h: 128, overflow: 'hidden' };
	let o = createBatchGridCells(dBatch, w * .9, h * .9, cellStyles);
	addKeys(o, sisi);
	mStyle(dInstruction, { w: mGetStyle(sisi.dGrid, 'w') });
	mLinebreak(d1)
	sisi.dPageIndex = mDom(d1, { fg });
	simpleInit(name, sisi);
	sisi.isOpen = true;
	sisi.dInstruction.innerHTML = '* press Ctrl while hovering over an image for details *'; //'* drag images into the shaded area *'
	let grid = sisi.dGrid;
	mStyle(grid, { bg: '#00000030' })
	enableDataDrop(grid, simpleOnDropImage)
}
async function onclickStartGame() {
	await saveDataFromPlayerOptionsUI(DA.gamename);
	let options = collectOptions();
	let players = collectPlayers();
	await startGame(DA.gamename, players, options);
}
async function onclickStartTable(id) {
	let table = Serverdata.tables.find(x => x.id == id);
	if (nundef(table)) table = await mGetRoute('table', { id });
	if (!table) { showMessage('table deleted!'); return await showTables('showTable'); }
	console.log('table', jsCopy(table));
	table = setTableToStarted(table);
	let res = await mPostRoute('postTable', table);
}
async function onclickTable(id) {
	Tid = id;
	await switchToMainMenu('table');
}
async function onclickTableMenu() {
	let id = getTid();
	if (nundef(id)) {
		let me = getUname();
		let table = Serverdata.tables.find(x => x.status == 'started' && x.turn.includes(me));
		if (nundef(table)) table = Serverdata.tables.find(x => x.status == 'started' && x.playerNames.includes(me));
		if (nundef(table)) table = Serverdata.tables.find(x => x.status != 'open' && x.playerNames.includes(me));
		if (nundef(table)) table = Serverdata.tables.find(x => x.status != 'open');
		if (isdef(table)) id = table.id;
	}
	if (isdef(id)) { Tid = null; await showTable(id); } else await switchToMainMenu('play');
}
async function onsockConfig(x) {
	console.log('SOCK::config', x)
	Serverdata.config = x; console.log(Serverdata.config);
}
async function onsockEvent(x) {
	console.log('SOCK::event', x)
	if (isdef(Serverdata.events)) Serverdata.events[x.id] = x;
}
async function onsockMerged(x) {
	console.log('SOCK::merged', x)
	if (!isSameTableOpen(x.id)) return;
	await showTable(x);
}
async function onsockPending(id) {
	console.log('SOCK::pending', id)
	if (!isSameTableOpen(id)) return;
	await showTable(id);
}
async function onsockSuperdi(x) {
	console.log('SOCK::superdi', x)
}
async function onsockTable(x) {
	console.log('SOCK::table', x);
	let [msg, id, turn, isNew] = [x.msg, x.id, x.turn, x.isNew];
	let menu = getMenu();
	let me = getUname();
	console.log('menu', menu, 'me', me, 'turn', turn, 'isNew', isNew)
	if (turn.includes(me) && menu == 'play') { Tid = id; await switchToMainMenu('table'); }
	else if (isNew && menu == 'play') { Tid = id; await switchToMainMenu('table'); }
	else if (menu == 'table') await showTable(id);
	else if (menu == 'play') await showTables();
}
async function onsockTables(x) {
	console.log('SOCK::tables', x)
	let menu = getMenu();
	if (menu == 'play') await showTables('onsockTables');
	else if (menu == 'table') {
		assertion(isdef(T), "menu table but no table!!!")
		let id = T.id;
		let exists = x.find(t => t.id == id);
		if (nundef(exists)) { Tid = T = null; await switchToMenu(UI.nav, 'play'); }
	}
}
function openPopup(name = 'dPopup') {
	closePopup();
	let popup = document.createElement('div');
	popup.id = name;
	let defStyle = { padding: 25, bg: 'white', fg: 'black', zIndex: 100000, rounding: 12, position: 'fixed', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', wmin: 300, hmin: 100, border: '1px solid #ccc', };
	mStyle(popup, defStyle);
	mButtonX(popup, null, 25, 4);
	document.body.appendChild(popup);
	return popup;
}
function pSBCr(d) {
	let i = parseInt, m = Math.round, a = typeof c1 == 'string';
	let n = d.length,
		x = {};
	if (n > 9) {
		([r, g, b, a] = d = d.split(',')), (n = d.length);
		if (n < 3 || n > 4) return null;
		(x.r = parseInt(r[3] == 'a' ? r.slice(5) : r.slice(4))), (x.g = parseInt(g)), (x.b = parseInt(b)), (x.a = a ? parseFloat(a) : -1);
	} else {
		if (n == 8 || n == 6 || n < 4) return null;
		if (n < 6) d = '#' + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : '');
		d = parseInt(d.slice(1), 16);
		if (n == 9 || n == 5) (x.r = (d >> 24) & 255), (x.g = (d >> 16) & 255), (x.b = (d >> 8) & 255), (x.a = m((d & 255) / 0.255) / 1000);
		else (x.r = d >> 16), (x.g = (d >> 8) & 255), (x.b = d & 255), (x.a = -1);
	}
	return x;
}
function paletteMix(startColor, endColor, numSteps) {
	const colors = [];
	let step = 0;
	while (step < numSteps) {
		const currentColor = mixColors(startColor, endColor, step / numSteps);
		colors.push(currentColor);
		step++;
	}
	return colors;
}
function paletteShades(color, from = -0.8, to = 0.8, step = 0.2) {
	let res = [];
	for (let frac = from; frac <= to; frac += step) {
		let c = colorCalculator(frac, color, undefined, true);
		res.push(c);
	}
	return res;
}
async function placeYourMeepleME(ev) {
	let [fen, players, pl] = [T.fen, T.players, T.players[getUname()]]
	stopPulsing();
	d = mBy('dCanvas');
	d.onmousemove = null;
	d.onclick = null;
	for (const p of B.hotspotList) { mStyle(p.div, { z: 0 }) }
	for (const p of B.points) { p.div.style.zIndex = 1000; }
	let sz = 20;
	x = ev.clientX - d.offsetLeft - d.parentNode.offsetLeft;
	y = ev.clientY - d.offsetTop - d.parentNode.offsetTop;
	let pMeeple = { x: x - sz / 2, y: y - sz / 2, sz, bg: 'black', border: getPlayerProp('color'), id: getUID(), owner: getUname() };
	fen.meeples.push(jsCopy(pMeeple));
	showMeeple(d, pMeeple);
	B.meeples.push(pMeeple);
	if (B.endPoints.length == 0) {
		await lacunaMoveCompletedME([]);
	} else if (B.endPoints.length == 2) {
		B.selectedPoints.push(B.endPoints[0]);
		B.selectedPoints.push(B.endPoints[1]);
		await lacunaMoveCompletedME(B.selectedPoints);
	} else lacunaMakeSelectableME();
}
const playerColors = {
	red: '#D01013',
	blue: '#003399',
	green: '#58A813',
	orange: '#FF6600',
	yellow: '#FAD302',
	violet: '#55038C',
	pink: '#ED527A',
	beige: '#D99559',
	sky: '#049DD9',
	brown: '#A65F46',
	white: '#FFFFFF',
};
function playerStatCount(key, n, dParent, styles = {}, opts = {}) {
	let sz = valf(styles.sz, 16);
	addKeys({ display: 'flex', margin: 4, dir: 'column', hmax: 2 * sz, 'align-content': 'center', fz: sz, align: 'center' }, styles);
	let d = mDiv(dParent, styles);
	let o = M.superdi[key];
	if (typeof key == 'function') key(d, { h: sz, hline: sz, w: '100%', fg: 'grey' });
	else if (isFilename(key)) showim2(key, d, { h: sz, hline: sz, w: '100%', fg: 'grey' }, opts);
	else if (isColor(key)) mDom(d, { bg: key, h: sz, fz: sz, w: '100%', fg: key }, { html: ' ' });
	else if (isdef(o)) showim2(key, d, { h: sz, hline: sz, w: '100%', fg: 'grey' }, opts);
	else mText(key, d, { h: sz, fz: sz, w: '100%' });
	d.innerHTML += `<span ${isdef(opts.id) ? `id='${opts.id}'` : ''} style="font-weight:bold;color:inherit">${n}</span>`;
	return d;
}
function pluralOf(s, n) {
	di = { food: '', child: 'ren' };
	return s + (n == 0 || n > 1 ? valf(di[s.toLowerCase()], 's') : '');
}
function pointAddMargin(p, margin) {
	return { x: p.x + margin, y: p.y + margin, type: p.type, owner: p.owner };
}
function pointFromFenRaw(pfen) {
	const [x, y, type, owner] = pfen.split('_').map(val => isNaN(val) ? val : parseInt(val, 10));
	return { x, y, type, owner: nundef(owner) ? null : owner };
}
function pointToLineDistance(x, y, x1, y1, x2, y2) {
	const A = x - x1;
	const B = y - y1;
	const C = x2 - x1;
	const D = y2 - y1;
	const dot = A * C + B * D;
	const len_sq = C * C + D * D;
	const param = len_sq !== 0 ? dot / len_sq : -1;
	let xx, yy;
	if (param < 0) {
		xx = x1;
		yy = y1;
	} else if (param > 1) {
		xx = x2;
		yy = y2;
	} else {
		xx = x1 + param * C;
		yy = y1 + param * D;
	}
	const dx = x - xx;
	const dy = y - yy;
	return Math.sqrt(dx * dx + dy * dy);
}
function posXY(d1, dParent, x, y, unit = 'px', position = 'absolute') {
	if (nundef(position)) position = 'absolute';
	if (dParent && !dParent.style.position) dParent.style.setProperty('position', 'relative');
	d1.style.setProperty('position', position);
	if (isdef(x)) d1.style.setProperty('left', makeUnitString(x, unit));
	if (isdef(y)) d1.style.setProperty('top', makeUnitString(y, unit));
}
async function postImage(img, path) {
	let dataUrl = imgToDataUrl(img);
	let o = { image: dataUrl, filename: path };
	let resp = await mPostRoute('postImage', o);
	console.log('resp', resp); //sollte path enthalten!
}
async function postUserChange(data, override = false) {
	data = valf(data, U);
	return Serverdata.users[data.name] = override ? await mPostRoute('overrideUser', data) : await mPostRoute('postUser', data);
}
async function prelims() {
	await preprelims();
	let t4 = performance.now();
	sockInit();
	let t5 = performance.now();
	window.onkeydown = keyDownHandler;
	window.onkeyup = keyUpHandler;
	DA.funcs = { setgame: setgame(), lacuna: lacuna(), fishgame: fishgame(), button96: button96() }; //implemented games!
	for (const gname in Serverdata.config.games) {
		if (isdef(DA.funcs[gname])) continue;
		DA.funcs[gname] = defaultGameFunc();
	}
	let html = `
    <div style="position:fixed;width:100%;z-index:20000">
      <div id="dNav" class="nav p10"></div>
      <div id="dMessage" style='height:0px;padding-left:10px' class="transh"></div>
    </div>
    <div id="dBuffer" style="height:32px;width:100%" class="nav"></div>
    <div id="dExtra" class="p10hide nav"></div>
    <div id="dTitle"></div>
    <div id="dPage" style="display:grid;grid-template-columns: auto 1fr auto;">
      <div id="dLeft" class="mh100 over0 translow nav">
      </div>
      <div id="dMain"></div>
      <div id="dRight" class="mh100 over0 translow"></div>
    </div>
    <d id="dBottom"></d>
    `;
	document.body.innerHTML = html;
	UI.dTitle = mBy('dTitle');
	UI.commands = {};
	UI.nav = showNavbar();
	staticTitle();
	let cmd = UI.nav.commands.user = mCommand(UI.nav.elem, 'user'); //console.log(cmd)
	iDiv(cmd).classList.add('activeLink');
	await switchToUser(localStorage.getItem('username'), localStorage.getItem('menu'));
}
function prepInstruction(table) {
	if (isdef('dInstruction')) mRemove('dInstruction');
	let myTurn = isMyTurn(table);
	if (!myTurn) staticTitle(table); else animatedTitle();
	let d = mBy('dExtra');
	let style = { matop: 2, bg: 'white', fg: 'black', w100: true, box: true, display: 'flex', 'justify-content': 'center', 'align-items': 'center' };
	let dInst = mDom(d, style, { id: 'dInstruction' });
	let html;
	if (myTurn) {
		html = `
        ${getWaitingHtml(14)}
        <span style="color:red;font-weight:bold;max-height:25px">You</span>
        &nbsp;<span id='dInstructionText'></span>
        `;
	} else { html = `waiting for: ${getTurnPlayers(table)}` }
	dInst.innerHTML = html;
}
async function preprelims() {
	ColorThiefObject = new ColorThief();
	let t1 = performance.now();
	Serverdata = await mGetRoute('session'); //session ist: users,config,events
	let t2 = performance.now();
	await loadAssets();
	let textures = await mGetFiles(`../assets/textures`);
	M.textures = textures.map(x => `../assets/textures/${x}`); //console.log('textures',M.textures)
}
function present() {
	if (Settings.perspective == 'me') presentFor(me);
	else presentAll();
}
function presentAll() {
	clearZones();
	for (const pl of T.players) {
		let zone = Zones[pl.id];
		pl.hand.showDeck(zone.dData, 'right', 0, false);
	}
	showTrick();
}
function presentBgaRoundTable() {
	let d0 = mDom('dMain');
	let [dl, dr] = mColFlex(d0, [4, 1]);
	d = mDom(dl); mCenterFlex(d);
	if (nundef(mBy('dInstruction'))) mDom(d, { className: 'instruction' }, { id: 'dInstruction' }); mLinebreak(d); // instruction
	let minTableSize = 400;
	let dTable = mDom(d, { hmin: minTableSize, wmin: minTableSize, hmargin: 20, round: true, className: 'wood' }, { id: 'dTable' });
	mCenterCenter(dTable);
	let dstats = mDom(dr, {}, { id: 'dStats' });
	return dTable;
}
function presentFor(me) {
	clearElement(dTable);
	let others = arrWithout(T.players, [me]);
	for (const pl of others) {
		pl.hand.showDeck(dTable, 'right', 0, false);
	}
	mLinebreak(dTable);
	T.trick.showDeck(dTable, 'right', 20, true);
	mLinebreak(dTable);
	me.hand.showDeck(dTable, 'right', 0, false);
	showFleetingMessage('click to play a card!');
}
function presentStandardBGA() {
	let dTable = mDom('dMain');
	mClass('dPage', 'wood');
	let [dOben, dOpenTable, dMiddle, dRechts] = tableLayoutMR(dTable); mFlexWrap(dOpenTable)
	mDom(dRechts, {}, { id: 'dStats' });
}
function presentStandardRoundTable() {
	d = mDom('dMain'); mCenterFlex(d);
	mDom(d, { className: 'instruction' }, { id: 'dInstruction' }); mLinebreak(d); // instruction
	mDom(d, {}, { id: 'dStats' }); mLinebreak(d);
	let minTableSize = 400;
	let dTable = mDom(d, { hmin: minTableSize, wmin: minTableSize, margin: 20, round: true, className: 'wood' }, { id: 'dTable' });
	mCenterCenter(dTable);
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
function rLetter(except) { return rLetters(1, except)[0]; }
function rLetters(n, except = []) {
	let all = 'abcdefghijklmnopqrstuvwxyz';
	for (const l of except) all = all.replace(l, '');
	return rChoose(toLetters(all), n);
}
function rNumber(min = 0, max = 100) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function rUniqueId(n = 10, prefix = '') { return prefix + rChoose(toLetters('0123456789abcdefghijklmnopqABCDEFGHIJKLMNOPQRSTUVWXYZ_'), n).join(''); }
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
function removeInPlace(arr, el) {
	arrRemovip(arr, el);
}
function replaceAll(str, sSub, sBy) {
	let regex = new RegExp(sSub, 'g');
	return str.replace(regex, sBy);
}
function sameList(l1, l2) {
	if (l1.length != l2.length) return false;
	for (const s of l1) {
		if (!l2.includes(s)) return false;
	}
	return true;
}
async function saveAndUpdatePlayerOptions(allPl, gamename) {
	let name = allPl.name;
	let poss = getGamePlayerOptionsAsDict(gamename);
	if (nundef(poss)) return;
	let opts = {};
	for (const p in poss) { allPl[p] = getRadioValue(p); if (p != 'playmode') opts[p] = allPl[p]; }
	let id = 'dPlayerOptions'; mRemoveIfExists(id); //dont need UI anymore
	let oldOpts = valf(getUserOptionsForGame(name, gamename), {});
	let changed = false;
	for (const p in poss) {
		if (p == 'playmode') continue;
		if (oldOpts[p] != opts[p]) { changed = true; break; }
	}
	if (changed) {
		let games = valf(Serverdata.users[name].games, {});
		games[gamename] = opts;
		await postUserChange({ name, games })
	}
}
async function saveDataFromPlayerOptionsUI(gamename) {
	let id = 'dPlayerOptions';
	let lastAllPl = DA.lastAllPlayerItem;
	let dold = mBy(id);
	if (isdef(dold)) { await saveAndUpdatePlayerOptions(lastAllPl, gamename); dold.remove(); }
}
function scaleAnimation(elem) {
	elem = toElem(elem);
	let ani = elem.animate([
		{ transform: 'scale(1)' },
		{ transform: 'scale(1.3)' },
	], {
		duration: 1000,
		easing: 'ease-in-out',
		iterations: 2,
		direction: 'alternate'
	});
	return ani;
}
function selectText(el) {
	if (el instanceof HTMLTextAreaElement) { el.select(); return; }
	var sel, range;
	if (window.getSelection && document.createRange) {
		sel = window.getSelection();
		if (sel.toString() == '') {
			window.setTimeout(function () {
				range = document.createRange();
				range.selectNodeContents(el);
				sel.removeAllRanges();
				sel.addRange(range);
			}, 1);
		}
	} else if (document.selection) {
		sel = document.selection.createRange();
		if (sel.text == '') {
			range = document.body.createTextRange();
			range.moveToElementText(el);
			range.select();
		}
	}
}
function setColors(bg, fg) {
	let [realBg, bgContrast, bgNav, fgNew, fgContrast] = calculateGoodColors(bg, fg);
	setCssVar('--bgBody', realBg);
	setCssVar('--bgButton', 'transparent')
	setCssVar('--bgButtonActive', bgContrast)
	setCssVar('--bgNav', bgNav)
	setCssVar('--fgButton', fgNew)
	setCssVar('--fgButtonActive', fgNew)
	setCssVar('--fgButtonDisabled', 'silver')
	setCssVar('--fgButtonHover', fgContrast)
	setCssVar('--fgTitle', fgNew)
	setCssVar('--fgSubtitle', fgContrast);
}
function setCssVar(varname, val) { document.body.style.setProperty(varname, val); }
function setDropPosition(ev, elem, targetElem, dropPos) {
	if (dropPos == 'mouse') {
		var elm = $(targetElem);
		x = ev.pageX - elm.offset().left - dragStartOffset.x;
		y = ev.pageY - elm.offset().top - dragStartOffset.y;
		posXY(elem, targetElem, x, y);
	} else if (dropPos == 'none') {
		return;
	} else if (dropPos == 'center') {
		elem.style.position = elem.style.left = elem.style.top = '';
		elem.classList.add('centeredTL');
	} else if (dropPos == 'centerCentered') {
		elem.style.position = elem.style.left = elem.style.top = '';
		elem.classList.add('centerCentered');
	} else {
		dropPos(ev, elem, targetElem);
	}
}
function setInstruction(s) { mBy('dInstructionText').innerHTML = s; }
async function setPlayerNotPlaying(item, gamename) {
	await saveDataFromPlayerOptionsUI(gamename);
	removeInPlace(DA.playerList, item.name);
	mRemoveIfExists('dPlayerOptions');
	unselectPlayerItem(item);
}
async function setPlayerPlaying(allPlItem, gamename) {
	let [name, da] = [allPlItem.name, allPlItem.div];
	addIf(DA.playerList, name);
	highlightPlayerItem(allPlItem);
	await saveDataFromPlayerOptionsUI(gamename);
	let id = 'dPlayerOptions';
	DA.lastAllPlayerItem = allPlItem;
	let poss = getGamePlayerOptions(gamename);
	if (nundef(poss)) return;
	let dParent = mBy('dGameMenu');
	let bg = getUserColor(name);
	let rounding = 6;
	let d1 = mDom(dParent, { bg: colorLight(bg, 50), border: `solid 2px ${bg}`, rounding, display: 'inline-block', hpadding: 3, rounding }, { id });
	mDom(d1, {}, { html: `${name}` }); //title
	d = mDom(d1, {}); mCenterFlex(d);
	mCenterCenter(d);
	for (const p in poss) {
		let key = p;
		let val = poss[p];
		if (isString(val)) {
			let list = val.split(',');
			let legend = formatLegend(key);
			let fs = mRadioGroup(d, {}, `d_${key}`, legend);
			let handler = key == 'playmode' ? updateUserImageToBotHuman(name) : null;
			for (const v of list) { let r = mRadio(v, isNumber(v) ? Number(v) : v, key, fs, { cursor: 'pointer' }, handler, key, false); }
			let userval = lookup(DA.allPlayers, [name, p]);
			let chi = fs.children;
			for (const ch of chi) {
				let id = ch.id;
				if (nundef(id)) continue;
				let radioval = stringAfterLast(id, '_');
				if (isNumber(radioval)) radioval = Number(radioval);
				if (userval == radioval) ch.firstChild.checked = true;
				else if (nundef(userval) && `${radioval}` == arrLast(list)) ch.firstChild.checked = true;
			}
			measureFieldset(fs);
		}
	}
	let r = getRectInt(da, mBy('dGameMenu'));
	let rp = getRectInt(d1);
	let [y, w, h] = [r.y - rp.h - 4, rp.w, rp.h];
	let x = r.x - rp.w / 2 + r.w / 2;
	if (x < 0) x = r.x - 22;
	if (x > window.innerWidth - w - 100) x = r.x - w + r.w + 14;
	mIfNotRelative(dParent);
	mPos(d1, x, y);
	mButtonX(d1, ev => saveAndUpdatePlayerOptions(allPlItem, gamename), 18, 3, 'dimgray');
}
function setPlayersToMulti() {
	for (const name in DA.allPlayers) {
		lookupSetOverride(DA.allPlayers, [name, 'playmode'], 'human');
		updateUserImageToBotHuman(name, 'human');
	}
	setRadioValue('playmode', 'human');
}
function setPlayersToSolo() {
	for (const name in DA.allPlayers) {
		if (name == getUname()) continue;
		lookupSetOverride(DA.allPlayers, [name, 'playmode'], 'bot');
		updateUserImageToBotHuman(name, 'bot');
	}
	let popup = mBy('dPlayerOptions');
	if (isdef(popup) && popup.firstChild.innerHTML.includes(getUname())) return;
	setRadioValue('playmode', 'bot');
}
function setRadioValue(prop, val) {
	let input = mBy(`i_${prop}_${val}`);
	if (nundef(input)) return;
	input.checked = true;
}
function setRect(elem, options) {
	let r = getRect(elem);
	elem.rect = r;
	elem.setAttribute('rect', `${r.w} ${r.h} ${r.t} ${r.l} ${r.b} ${r.r}`);
	if (isDict(options)) {
		if (options.hgrow) mStyle(elem, { hmin: r.h });
		else if (options.hfix) mStyle(elem, { h: r.h });
		else if (options.hshrink) mStyle(elem, { hmax: r.h });
		if (options.wgrow) mStyle(elem, { wmin: r.w });
		else if (options.wfix) mStyle(elem, { w: r.w });
		else if (options.wshrink) mStyle(elem, { wmax: r.w });
	}
	return r;
}
function setTableToStarted(table) {
	table.status = 'started';
	table.step = 0;
	table.moves = [];
	table.fen = DA.funcs[table.game].setup(table);
	return table;
}
function setTexture(item) {
	let d = document.body;
	let bgImage = valf(item.bgImage, bgImageFromPath(item.texture), '');
	let bgBlend = valf(item.bgBlend, item.blendMode, '');
	d.style.backgroundColor = valf(item.color, item.bg, '');
	d.style.backgroundImage = bgImage;
	d.style.backgroundSize = bgImage.includes('marble') || bgImage.includes('wall') ? '100vw 100vh' : '';
	d.style.backgroundRepeat = 'repeat';
	d.style.backgroundBlendMode = bgBlend;
}
function setUserTheme() {
	setColors(U.color, U.fg);
	setTexture(U);
	settingsCheck();
}
function setgame() {
	function setup(table) {
		let fen = {};
		for (const name in table.players) {
			let pl = table.players[name];
			pl.score = 0;
		}
		fen.deck = setCreateDeck();
		fen.cards = deckDeal(fen.deck, table.options.numCards);
		table.plorder = jsCopy(table.playerNames);
		table.turn = jsCopy(table.playerNames);
		return fen;
	}
	function stats(table) {
		let [me, players] = [getUname(), table.players];
		let style = { patop: 8, mabottom: 20, wmin: 80, bg: 'beige', fg: 'contrast' };
		let player_stat_items = uiTypePlayerStats(table, me, 'dStats', 'rowflex', style)
		for (const plname in players) {
			let pl = players[plname];
			let item = player_stat_items[plname];
			if (pl.playmode == 'bot') { mStyle(item.img, { rounding: 0 }); }
			let d = iDiv(item); mCenterFlex(d); mLinebreak(d); mIfNotRelative(d);
			playerStatCount('star', pl.score, d); //, {}, {id:`stat_${plname}_score`});
		}
	}
	function present(table) {
		presentStandardRoundTable(table);
		const colors = { red: '#e74c3c', green: '#27ae60', purple: 'indigo' };
		setLoadPatterns('dPage', colors);
		let fen = table.fen;
		mStyle('dTable', { padding: 50, wmin: 500 });
		let d = mDom('dTable', { gap: 10, padding: 0 }); mCenterFlex(d);
		let rows = Math.ceil(fen.cards.length / 3);
		let gap = 10;
		let sz = rows <= 4 ? 80 : rows == 5 ? 70 : rows == 6 ? 68 : rows == 7 ? 65 : rows == 8 ? 62 : 60;
		let dBoard = mGrid(rows, 3, d, { gap });
		let items = [];
		for (const c of fen.cards) {
			let dc = setDrawCard(c, dBoard, colors, sz);
			let item = mItem({ div: dc }, { key: c });
			items.push(item);
		}
		let oset = setFindOneSet(items); console.log('=>', oset ? oset.keys[0] : 'NO SET');
		return items;
	}
	async function activate(table, items) {
		if (!isMyTurn(table)) { return; }
		for (const item of items) {
			let d = iDiv(item);
			mStyle(d, { cursor: 'pointer' });
			d.onclick = ev => onclickCard(table, item, items);
		}
		let dParent = mBy('dTable').parentNode; mIfNotRelative(dParent);
		let bNoSet = mButton('No Set', () => onclickNoSet(getUname(), table, items), dParent, {}, 'button', 'bNoSet');
		mPos(bNoSet, window.innerWidth / 2 + 180, 110);
		if (amIHuman(table) && getGameOption('use_level') == 'yes' && getPlayerProp('level') <= 2) {
			let bHint = mButton('Hint', () => onclickHint(table, items), dParent, {}, 'button', 'bHint');
			mPos(bHint, window.innerWidth / 2 - 200 - 80, 110);
		}
		if (isEmpty(table.fen.cards)) return gameoverScore(table);
		if (amIHuman(table) && table.options.gamemode == 'multi') return;
		let name = amIHuman(table) && table.options.gamemode == 'solo' ? someOtherPlayerName(table) : getUname();
		if (nundef(name)) return;
		await botMove(name, table, items);
	}
	async function botMove(name, table, items) {
		let oset = setFindOneSet(items);
		let avg = calcBotLevel(table);
		let ms = avg ? 18000 - avg * 2000 : 1000;
		if (!oset) ms += 2000;
		TO.bot = setTimeout(async () => {
			if (!oset) await onclickNoSet(name, table, items);
			else {
				for (const item of oset.items) toggleItemSelection(item);
				TO.bot1 = setTimeout(async () => await evalMove(name, table, oset.keys), 1000);
			}
		}, rNumber(ms, ms + 2000));
	}
	function setCheckIfSet(keys) {
		let arr = makeArrayWithParts(keys);
		let isSet = arr.every(x => arrAllSameOrDifferent(x));
		return isSet;
	}
	function setCreateDeck() {
		let deck = [];
		['red', 'purple', 'green'].forEach(color => {
			['diamond', 'squiggle', 'oval'].forEach(shape => {
				[1, 2, 3].forEach(num => {
					['solid', 'striped', 'open'].forEach(fill => {
						deck.push(`${color}_${shape}_${num}_${fill}`);
					});
				});
			});
		});
		arrShuffle(deck);
		return deck;
	}
	function setDrawCard(card, dParent, colors, sz = 100) {
		const paths = {
			diamond: "M25 0 L50 50 L25 100 L0 50 Z",
			squiggle: "M38.4,63.4c2,16.1,11,19.9,10.6,28.3c1,9.2-21.1,12.2-33.4,3.8s-15.8-21.2-9.3-38c3.7-7.5,4.9-14,4.8-20 c0-16.1-11-19.9-10.6-28.3C1,0.1,21.6-3,33.9,5.5s15.8,21.2,9.3,38C40.4,50.6,38.5,57.4,38.4,63.4z",
			oval: "M25,95C14.2,95,5.5,85.2,5.5,80V20C5.5,13.2,14.2,5.2,25,5.2S44.5,13.2,44.5,20v60 C44.5,85.2,35.8,95,25,95z"
		}
		let [color, shape, num, fill] = card.split('_');
		var attr = {
			d: paths[shape],
			fill: fill == 'striped' ? `url(#striped-${color})` : fill == 'solid' ? colors[color] : 'none',
			stroke: colors[color],
			'stroke-width': 2,
		};
		let h = sz, w = sz / .65;
		let ws = w / 4;
		let hs = 2 * ws;
		let d0 = mDom(dParent, { display: 'flex', w, h, bg: 'white', rounding: 10 });
		mStyle(d0, { justify: 'center', 'align-items': 'center', gap: 6 })
		let shapeSvg = `<svg viewbox="-2 -2 54 104">` + makeSVG("path", attr) + '</svg>';
		for (const i of range(num)) {
			let d1 = mDom(d0, { h: hs, w: ws }, { html: shapeSvg });
		}
		return d0;
	}
	function setFindAllSets(items) {
		let result = [];
		for (var x = 0; x < items.length; x++) {
			for (var y = x + 1; y < items.length; y++) {
				for (var z = y + 1; z < items.length; z++) {
					assertion(items[x] != items[y], `WTF!?!?!?! ${items[x].key} ${items[y].key}`)
					let list = [items[x], items[y], items[z]];
					let keys = list.map(x => x.key);
					if (setCheckIfSet(keys)) result.push(list);
				}
			}
		}
		if (isEmpty(result)) console.log('no set!')
		return result;
	}
	function setFindOneSet(items) {
		for (var x = 0; x < items.length; x++) {
			for (var y = x + 1; y < items.length; y++) {
				for (var z = y + 1; z < items.length; z++) {
					assertion(items[x] != items[y], `WTF!?!?!?! ${items[x].key} ${items[y].key}`)
					let list = [items[x], items[y], items[z]];
					let keys = list.map(x => x.key);
					if (setCheckIfSet(keys)) return { items: list, keys };
				}
			}
		}
		return null;
	}
	function setLoadPatterns(dParent, colors) {
		dParent = toElem(dParent);
		let id = "setpatterns";
		if (isdef(mBy(id))) { return; }
		let html = `
      <svg id="setpatterns" width="0" height="0">
        <!--  Define the patterns for the different fill colors  -->
        <pattern id="striped-red" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M-1,1 H5" style="stroke:${colors.red}; stroke-width:1" />
        </pattern>
        <pattern id="striped-green" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M-1,1 H5" style="stroke:${colors.green}; stroke-width:1" />
        </pattern>
        <pattern id="striped-purple" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M-1,1 H5" style="stroke:${colors.purple}; stroke-width:1" />
        </pattern>
      </svg>
      `;
		let el = mCreateFrom(html);
		mAppend(dParent, el)
	}
	async function onclickCard(table, item, items) {
		toggleItemSelection(item);
		let selitems = items.filter(x => x.isSelected);
		let [keys, m] = [selitems.map(x => x.key), selitems.length];
		if (m == 3) {
			await evalMove(getUname(), table, keys);
		}
	}
	async function onclickHint(table, items) {
		let oset = setFindOneSet(items);
		let bHint = mBy('bHint');
		disableButton('bHint');
		if (!oset) {
			ANIM.button = scaleAnimation('bNoSet');
		} else {
			let item = rChoose(oset.items);
			await onclickCard(table, item, items);
		}
	}
	async function onclickNoSet(name, table, items) {
		clearEvents();
		mShield('dTable', { bg: 'transparent' });
		let id = table.id;
		let step = table.step;
		let oset = setFindOneSet(items);
		if (!oset) {
			table.players[name].score += 1;
			let fen = table.fen;
			let newCards = deckDeal(fen.deck, 1);
			if (!isEmpty(newCards)) fen.cards.push(newCards[0]); else return await gameoverScore(table);
		} else {
			table.players[name].score -= 1;
		}
		lookupAddToList(table, ['moves'], { step, name, move: ['noSet'], change: oset ? '-1' : '+1', score: table.players[name].score });
		let o = { id, name, step, table };
		if (!oset) o.stepIfValid = step + 1;
		let res = await mPostRoute('table', o); //console.log(res);
	}
	async function evalMove(name, table, keys) {
		clearEvents();
		mShield('dTable', { bg: 'transparent' });
		let id = table.id;
		let step = table.step;
		let isSet = setCheckIfSet(keys);
		if (isSet) {
			table.players[name].score += 1;
			let fen = table.fen;
			let toomany = Math.max(0, fen.cards.length - table.options.numCards);
			let need = Math.max(0, 3 - toomany);
			let newCards = deckDeal(fen.deck, need);
			for (let i = 0; i < 3; i++) if (i < newCards.length) arrReplace1(fen.cards, keys[i], newCards[i]); else removeInPlace(fen.cards, keys[i]);
		} else {
			table.players[name].score -= 1;
		}
		lookupAddToList(table, ['moves'], { step, name, move: keys, change: isSet ? '+1' : '-1', score: table.players[name].score });
		let o = { id, name, step, table };
		if (isSet) o.stepIfValid = step + 1;
		let res = await mPostRoute('table', o); //console.log(res);
	}
	return { setup, present, stats, activate, hasInstruction: false };
}
function settingsCheck() {
	if (isdef(DA.settings)) {
		cmdDisable(UI.commands.settResetAll.key);
		for (const k in DA.settings) {
			if (isLiteral(U[k]) && DA.settings[k] != U[k]) {
				cmdEnable(UI.commands.settResetAll.key); break;
			}
		}
	}
}
async function settingsOpen() {
	DA.settings = jsCopy(U);
	mClear('dMain');
	let d = mDom('dMain', {}, { id: 'dSettingsMenu' });
	let submenu = valf(localStorage.getItem('settingsMenu'), 'settTheme');
	settingsSidebar();
	await UI.commands[submenu].open();
	settingsCheck();
}
function settingsSidebar() {
	let wmin = 170;
	mStyle('dLeft', { wmin: wmin });
	let d = mDom('dLeft', { wmin: wmin - 10, margin: 10, matop: 160, h: window.innerHeight - getRect('dLeft').y - 102 }); //, bg:'#00000020'  }); 
	let gap = 5;
	UI.commands.settMyTheme = mCommand(d, 'settMyTheme', 'My Theme', { save: true }); mNewline(d, gap);
	UI.commands.settTheme = mCommand(d, 'settTheme', 'Themes', { save: true }); mNewline(d, gap);
	UI.commands.settColor = mCommand(d, 'settColor', 'Color', { save: true }); mNewline(d, gap);
	UI.commands.settFg = mCommand(d, 'settFg', 'Text Color', { save: true }); mNewline(d, gap);
	UI.commands.settTexture = mCommand(d, 'settTexture', 'Texture', { save: true }); mNewline(d, gap);
	UI.commands.settBlendMode = mCommand(d, 'settBlendMode', 'Blend Mode', { save: true }); mNewline(d, 2 * gap);
	UI.commands.settRemoveTexture = mCommand(d, 'settRemoveTexture', 'Remove Texture'); mNewline(d, gap);
	UI.commands.settResetAll = mCommand(d, 'settResetAll', 'Revert Settings'); mNewline(d, gap);
	UI.commands.settAddYourTheme = mCommand(d, 'settAddYourTheme', 'Add Your Theme'); mNewline(d, gap);
	UI.commands.settDeleteTheme = mCommand(d, 'settDeleteTheme', 'Delete Theme'); mNewline(d, gap);
}
function show(elem, isInline = false) {
	if (isString(elem)) elem = document.getElementById(elem);
	if (isSvg(elem)) {
		elem.setAttribute('style', 'visibility:visible');
	} else {
		elem.style.display = isInline ? 'inline-block' : null;
	}
	return elem;
}
async function showCalendarApp() {
	if (!U) { console.log('you have to be logged in to use this menu!!!'); return; }
	showTitle('Calendar');
	let d1 = mDiv('dMain', { w: 800, h: 800, margin: 20 }); //, bg: 'white' })
	let x = DA.calendar = await uiTypeCalendar(d1);
}
function showChatMessage(o) {
	let d = mBy('dChatWindow'); if (nundef(d)) return;
	if (o.user == getUname()) mDom(d, { align: 'right' }, { html: `${o.msg}` })
	else mDom(d, { align: 'left' }, { html: `${o.user}: ${o.msg}` })
}
async function showDashboard() {
	let me = getUname();
	if (me == 'guest') { mDom('dMain', { align: 'center', className: 'section' }, { html: 'click username in upper right corner to log in' }); return; }
	homeSidebar(150);
	mAdjustPage(150);
	let div = mDom100('dMain');
	let d1 = mDom(div); mCenterFlex(d1)
	let dta = mDom(d1, { gap: 10, padding: 12 }, { className: 'section' });
	let dblog = mDom(d1, { w100: true, align: 'center' });
	let blog = U.blog;
	if (nundef(blog)) return;
	for (const bl of blog) {
		let dx = mDom(dblog, {}, { className: 'section', html: bl.text });
	}
}
function showDeck(keys, dParent, splay, w, h) {
	let d = mDiv(dParent);
	mStyle(d, { display: 'block', position: 'relative', bg: 'green', padding: 25 });
	let gap = 10;
	let ovPercent = 20;
	let overlap = w * ovPercent / 100;
	let x = y = gap;
	for (let i = 0; i < keys.length; i++) {
		let k = keys[i];
		let c = zInno(k, d);
		mAppend(d, c.div);
		mStyle(c.div, { position: 'absolute', left: x, top: y });
		c.row = 0;
		c.col = i;
		x += overlap;
		Pictures.push(c);
	}
	d.style.width = (x - overlap + w) + 'px';
	console.log(Pictures[0])
	console.log(Pictures[0].div)
	d.style.height = firstNumber(Pictures[0].div.style.height) + 'px';
}
function showDetailsAndMagnify(elem) {
	let key = elem.firstChild.getAttribute('key'); //console.log('key',key)
	if (nundef(key)) return;
	let o = getDetailedSuperdi(key);
	MAGNIFIER_IMAGE = elem;
	if (nundef(o)) { mMagnify(elem); return; }
	let d = mPopup(null, {}, { id: 'hallo' });
	let title = fromNormalized(valf(o.name, o.friendly));
	mDom(d, {}, { tag: 'h1', html: title });
	mDom(d, {}, { tag: 'img', src: valf(o.photo, o.img) });
	showDetailsPresentation(o, d);
}
function showDetailsPresentation(o, dParent) {
	let onew = {};
	let nogo = ['longSpecies', 'ooffsprings', 'name', 'cats', 'colls', 'friendly', 'ga', 'fa', 'fa6', 'text', 'key', 'nsize', 'nweight', 'img', 'photo']
	for (const k in o) {
		if (nogo.includes(k)) continue;
		let val = o[k];
		let knew = k == 'ofoodtype' ? 'foodtype' : k;
		if (isString(val)) {
			val = replaceAll(val, '>-', '');
			val = val.trim();
			if (val.startsWith("'")) val = val.substring(1);
			if (val.endsWith("'")) val = val.substring(0, val.length - 1);
			if (val.includes(':')) val = stringAfter(val, ':')
			onew[knew] = capitalize(val.trim());
		}
		if (k == 'food') console.log(onew[knew])
	}
	onew = sortDictionary(onew);
	return showObjectInTable(onew, dParent, { w: window.innerWidth * .8 });
}
function showEventOpen(id) {
	let e = Items[id];
	if (!e) return;
	let date = new Date(Number(e.day));
	let [day, month, year] = [date.getDate(), date.getMonth(), date.getFullYear()];
	let time = e.time;
	let popup = openPopup();
	let d = mBy(id);
	let [x, y, w, h, wp, hp] = [d.offsetLeft, d.offsetTop, d.offsetWidth, d.offsetHeight, 300, 180];
	let [left, top] = [Math.max(10, x + w / 2 - wp / 2), Math.min(window.innerHeight - hp - 60, y + h / 2 - hp / 2)]
	mStyle(popup, { left: left, top: top, w: wp, h: hp });
	let dd = mDom(popup, { display: 'inline-block', fz: '80%', maleft: 3, pabottom: 4 }, { html: `date: ${day}.${month + 1}.${year}` });
	let dt = mDom(popup, { display: 'inline-block', fz: '80%', maleft: 20, pabottom: 4 }, { html: `time:` });
	let inpt = mDom(popup, { fz: '80%', maleft: 3, mabottom: 4, w: 60 }, { tag: 'input', value: e.time });
	mOnEnter(inpt);
	let ta = mDom(popup, { rounding: 4, matop: 7, box: true, w: '100%', vpadding: 4, hpadding: 10, }, { tag: 'textarea', rows: 7, value: e.text });
	let line = mDom(popup, { matop: 6, w: '100%' }); //,'align-items':'space-between'});
	let buttons = mDom(line, { display: 'inline-block' });
	let bsend = mButton('Save', () => onEventEdited(id, ta.value, inpt.value), buttons);
	mButton('Cancel', () => closePopup(), buttons, { hmargin: 10 })
	mButton('Delete', () => { deleteEvent(id); closePopup(); }, buttons, { fg: 'red' })
	mDom(line, { fz: '90%', maright: 5, float: 'right', }, { html: `by ${e.user}` });
}
function showFleetingMessage(msg, dParent, styles = {}, ms = 3000, msDelay = 0, fade = true) {
	clearFleetingMessage();
	dFleetingMessage = mDiv(dParent);
	if (msDelay) {
		TOFleetingMessage = setTimeout(() => fleetingMessage(msg, dFleetingMessage, styles, ms, fade), msDelay);
	} else {
		TOFleetingMessage = setTimeout(() => fleetingMessage(msg, dFleetingMessage, styles, ms, fade), 10);
	}
}
async function showGameMenu(gamename) {
	let users = Serverdata.users = await mGetRoute('users');//console.log('users',users);
	mRemoveIfExists('dGameMenu');
	let dMenu = mDom('dMain', {}, { className: 'section', id: 'dGameMenu' });
	mDom(dMenu, { maleft: 12 }, { html: `<h2>game options</h2>` });
	let style = { display: 'flex', justify: 'center', w: '100%', gap: 10, matop: 6 };
	let dPlayers = mDiv(dMenu, style, 'dMenuPlayers'); //mCenterFlex(dPlayers);
	let dOptions = mDiv(dMenu, style, 'dMenuOptions'); //mCenterFlex(dOptions);
	let dButtons = mDiv(dMenu, style, 'dMenuButtons');
	DA.gamename = gamename;
	DA.gameOptions = {};
	DA.playerList = [];
	DA.allPlayers = {};
	DA.lastName = null;
	await showGamePlayers(dPlayers, users);
	await showGameOptions(dOptions, gamename);
	let astart = mButton('Start', onclickStartGame, dButtons, {}, ['button', 'input']);
	let ajoin = mButton('Open to Join', onclickOpenToJoinGame, dButtons, {}, ['button', 'input']);
	let acancel = mButton('Cancel', () => mClear(dMenu), dButtons, {}, ['button', 'input']);
	let bclear = mButton('Clear Players', onclickClearPlayers, dButtons, {}, ['button', 'input']);
}
async function showGameMenuPlayerDialog(name, shift = false) {
	let allPlItem = DA.allPlayers[name];
	let gamename = DA.gamename;
	let da = iDiv(allPlItem);
	if (!DA.playerList.includes(name)) await setPlayerPlaying(allPlItem, gamename);
	else await setPlayerNotPlaying(allPlItem, gamename);
}
async function showGameOptions(dParent, gamename) {
	let poss = getGameOptions(gamename);
	if (nundef(poss)) return;
	for (const p in poss) {
		let key = p;
		let val = poss[p];
		if (isString(val)) {
			let list = val.split(',');
			let legend = formatLegend(key);
			let fs = mRadioGroup(dParent, {}, `d_${key}`, legend);
			for (const v of list) { mRadio(v, isNumber(v) ? Number(v) : v, key, fs, { cursor: 'pointer' }, null, key, true); }
			measureFieldset(fs);
		}
	}
	let inpsolo = mBy(`i_gamemode_solo`);//console.log('HALLO',inpsolo)
	let inpmulti = mBy(`i_gamemode_multi`);
	if (isdef(inpsolo)) inpsolo.onclick = setPlayersToSolo;
	if (isdef(inpmulti)) inpmulti.onclick = setPlayersToMulti;
}
async function showGamePlayers(dParent, users) {
	let me = getUname();
	mStyle(dParent, { wrap: true });
	let userlist = ['amanda', 'felix', 'mimi'];
	for (const name in users) addIf(userlist, name);
	for (const name of userlist) {
		let d = mDom(dParent, { align: 'center', padding: 2, cursor: 'pointer', border: `transparent` });
		let img = showUserImage(name, d, 40);
		let label = mDom(d, { matop: -4, fz: 12, hline: 12 }, { html: name });
		d.setAttribute('username', name)
		d.onclick = onclickGameMenuPlayer;
		let item = userToPlayer(name, DA.gamename); item.div = d; item.isSelected = false;
		DA.allPlayers[name] = item;
	}
	await clickOnPlayer(me);
}
function showGameover(table, dParent) {
	let winners = table.winners;
	let msg = winners.length > 1 ? `GAME OVER - The winners are ${winners.join(', ')}!!!` : `GAME OVER - The winner is ${winners[0]}!!!`;
	let d = showRibbon(dParent, msg);
	updateTestButtonsLogin(table.playerNames);
	mDom(d, { h: 12 }, { html: '<br>' })
	mButton('PLAY AGAIN', () => onclickStartTable(table.id), d, { className: 'button', fz: 24 });
}
function showGames(ms = 500) {
	let dParent = mBy('dGameList'); if (isdef(dParent)) { mClear(dParent); } else dParent = mDom('dMain', {}, { className: 'section', id: 'dGameList' });
	mText(`<h2>start new game</h2>`, dParent, { maleft: 12 });
	let d = mDiv(dParent, { fg: 'white' }, 'game_menu'); mFlexWrap(d);
	let gamelist = 'accuse aristo bluff ferro nations spotit wise'; if (DA.TEST0) gamelist += ' a_game'; gamelist = toWords(gamelist);
	gamelist = ['setgame', 'lacuna'] //, 'fishgame'];//, 'button96'];
	for (const gname of gamelist) {
		let g = getGameConfig(gname);
		let bg = g.color;
		let d1 = mDiv(d, { cursor: 'pointer', rounding: 10, margin: 10, padding: 0, patop: 10, w: 140, height: 100, bg, position: 'relative' }, g.id);
		d1.setAttribute('gamename', gname);
		d1.onclick = onclickGameMenuItem;
		mCenterFlex(d1);
		let o = M.superdi[g.logo];
		let fg = colorIdealText(bg);
		let el = mDom(d1, { matop: 0, mabottom: 6, fz: 65, hline: 65, family: 'emoNoto', fg, display: 'inline-block' }, { html: o.text });
		mLinebreak(d1);
		mDiv(d1, { fz: 18, align: 'center', fg }, null, g.friendly);
	}
}
function showMeeple(d, pMeeple) {
	lacunaDrawPoints(d, [pMeeple], false);
	let color = getPlayerProp('color', pMeeple.owner); //console.log('color', color)
	let letter = pMeeple.owner[0].toUpperCase();
	mStyle(iDiv(pMeeple), { border: `${color} 5px solid` });
	iDiv(pMeeple).innerHTML = letter;
}
function showMessage(msg, ms = 3000) {
	let d = mBy('dMessage');
	let isPopup = nundef(d);
	if (nundef(d)) d = mPopup(); d.id = 'dMessage';
	mStyle(d, { h: 21, bg: 'red', fg: 'yellow' });
	d.innerHTML = msg;
	clearTimeout(TO.message);
	TO.message = setTimeout(() => clearMessage(isPopup), ms)
}
function showNavbar() {
	let nav = mMenu('dNav');
	let commands = {};
	commands.home = menuCommand(nav.l, 'nav', 'home', 'HOME', showDashboard, menuCloseHome);
	commands.settings = menuCommand(nav.l, 'nav', 'settings', null, settingsOpen, menuCloseSettings);
	commands.simple = menuCommand(nav.l, 'nav', 'simple', 'Collection', onclickSimple, menuCloseSimple);
	commands.play = menuCommand(nav.l, 'nav', 'play', 'Games', onclickPlay, menuCloseGames);
	commands.table = menuCommand(nav.l, 'nav', 'table', 'Table', onclickTableMenu, menuCloseTable);
	commands.plan = menuCommand(nav.l, 'nav', 'plan', 'Calendar', onclickPlan, menuCloseCalendar);
	nav.commands = commands;
	return nav;
}
function showObjectInTable(onew, dParent, styles = {}, opts = {}) {
	let d = mDom(dParent, styles);
	let t = mTable(d);
	for (const k in onew) {
		let r = mCreate('tr');
		mAppend(t, r);
		let col = mCreate('td'); mAppend(r, col); col.innerHTML = `${k}: `;
		col = mCreate('td'); mAppend(r, col); mDom(col, {}, { html: `${onew[k]}` });
	}
	return t;
}
function showPlaetze(dCard, item, gap, color = 'silver') {
	let n = item.ooffsprings.num;
	let sym = item.class == 'mammal' ? 'paw' : 'big_egg';
	let html = wsGetChildInline(item, color);
	let plaetze = nundef(n) ? 2 : n == 0 ? 0 : n == 1 ? 1 : n < 8 ? 2 : n < 25 ? 3 : n < 100 ? 4 : n < 1000 ? 5 : 6;
	let [rows, cols, w] = [3, plaetze <= 3 ? 1 : 2, plaetze <= 3 ? gap : 3 * gap]
	let dgrid = mGrid(3, cols, dCard, { gap: gap * .8 });//{w,h:5*gap,gap:gap/2});
	for (const i of range(plaetze)) { mDom(dgrid, { w: gap, h: gap, fg: color }, { html }); }
	return dgrid;
}
function showRibbon(dParent, msg) {
	let d = mBy('ribbon'); if (isdef(d)) d.remove();
	let bg = `linear-gradient(270deg, #fffffd, #00000080)`
	d = mDom(dParent, { bg, mabottom: 10, align: 'center', vpadding: 10, fz: 30, w100: true }, { html: msg, id: 'ribbon' });
	return d;
}
function showStyles(elem) { let st = mGetStyles(elem, ['bg', 'fg']); console.log('styles', st); }
async function showTable(id) {
	let me = getUname();
	let table = await mGetRoute('table', { id });  //console.log('table',table)
	if (!table) { showMessage('table deleted!'); return await showTables('showTable'); }
	DA.Interrupt = true;
	while (DA.LengthyProcessRunning === true) { await mSleep(100); }
	DA.Interrupt = false;
	let func = DA.funcs[table.game];
	T = table;
	clearMain(); mClassRemove('dExtra', 'p10hide');
	showTitleGame(table);
	if (func.hasInstruction) prepInstruction(table);
	let items = func.present(table);
	func.stats(table);
	if (table.status == 'over') { showGameover(table, 'dTitle'); return; }
	assertion(table.status == 'started', `showTable status ERROR ${table.status}`);
	await updateTestButtonsLogin(table.playerNames);
	func.activate(table, items);
}
async function showTables(from) {
	await updateTestButtonsLogin();
	let me = getUname();
	let tables = Serverdata.tables = await mGetRoute('tables');
	tables.map(x => x.prior = x.status == 'open' ? 0 : x.turn.includes(me) ? 1 : x.playerNames.includes(me) ? 2 : 3);
	sortBy(tables, 'prior');
	let dParent = mBy('dTableList');
	if (isdef(dParent)) { mClear(dParent); }
	else dParent = mDom('dMain', {}, { className: 'section', id: 'dTableList' });
	if (isEmpty(tables)) { mText('no active game tables', dParent); return []; }
	tables.map(x => x.game_friendly = capitalize(getGameFriendly(x.game)));
	mText(`<h2>game tables</h2>`, dParent, { maleft: 12 })
	let t = UI.tables = mDataTable(tables, dParent, null, ['friendly', 'game_friendly', 'playerNames'], 'tables', false);
	mTableCommandify(t.rowitems.filter(ri => ri.o.status != 'open'), {
		0: (item, val) => hFunc(val, 'onclickTable', item.o.id, item.id),
	});
	mTableStylify(t.rowitems.filter(ri => ri.o.status == 'open'), { 0: { fg: 'blue' }, });
	let d = iDiv(t);
	for (const ri of t.rowitems) {
		let r = iDiv(ri);
		let id = ri.o.id;
		if (ri.o.prior == 1) mDom(r, {}, { tag: 'td', html: getWaitingHtml(24) });
		if (ri.o.status == 'open') {
			let playerNames = ri.o.playerNames;
			if (playerNames.includes(me)) {
				if (ri.o.owner != me) {
					let h1 = hFunc('leave', 'onclickLeaveTable', ri.o.id); let c = mAppend(r, mCreate('td')); c.innerHTML = h1;
				}
			} else {
				let h1 = hFunc('join', 'onclickJoinTable', ri.o.id); let c = mAppend(r, mCreate('td')); c.innerHTML = h1;
			}
		}
		if (ri.o.owner != me) continue;
		let h = hFunc('delete', 'onclickDeleteTable', id); let c = mAppend(r, mCreate('td')); c.innerHTML = h;
		if (ri.o.status == 'open') { let h1 = hFunc('start', 'onclickStartTable', id); let c1 = mAppend(r, mCreate('td')); c1.innerHTML = h1; }
	}
}
function showTitle(title, dParent = 'dTitle') {
	mClear(dParent);
	return mDom(dParent, { maleft: 20 }, { tag: 'h1', html: title, classes: 'title' });
}
function showTitleGame(table) {
	let d = mBy('dExtraLeft');
	let html = `${getGameProp('friendly').toUpperCase()}: ${table.friendly}`;
	mDom(d, { maleft: 10, family: 'algerian' }, { html });
}
function showTrick() {
	let dZone = Zones.table.dData;
	let d = mDiv(dZone);
	mStyle(d, { display: 'flex', position: 'relative' });
	let zIndex = 1;
	for (let i = 0; i < T.trick.length; i++) {
		let c = T.trick[i];
		let direction = i == 0 ? { x: 0, y: -1 } : { x: 0, y: 1 };
		let displ = 10;
		let offset = { x: -35 + direction.x * displ, y: direction.y * displ };
		let d1 = c.div;
		mAppend(d, d1);
		mStyle(d1, { position: 'absolute', left: offset.x, top: offset.y, z: zIndex });
		zIndex += 1;
	}
}
function showUserImage(uname, d, sz = 40) {
	let u = Serverdata.users[uname];
	let key = u.imgKey;
	let m = M.superdi[key];
	if (nundef(m)) {
		key = 'unknown_user';
	}
	return mKey(key, d, { 'object-position': 'center top', 'object-fit': 'cover', h: sz, w: sz, round: true, border: `${u.color} 3px solid` });
}
function showim2(imgKey, d, styles = {}, opts = {}) {
	let o = lookup(M.superdi, [imgKey]);
	let src;
	if (isFilename(imgKey)) src = imgKey;
	else if (isdef(o) && isdef(opts.prefer)) src = valf(o[opts.prefer], o.img);
	else if (isdef(o)) src = valf(o.img, o.photo)
	let [w, h] = mSizeSuccession(styles, 40);
	addKeys({ w, h }, styles);
	if (nundef(o) && nundef(src)) src = rChoose(M.allImages).path;
	if (isdef(src)) return mDom(d, styles, { tag: 'img', src });
	fz = .8 * h;
	let [family, html] = isdef(o.text) ? ['emoNoto', o.text] : isdef(o.fa) ? ['pictoFa', String.fromCharCode('0x' + o.fa)] : isdef(o.ga) ? ['pictoGame', String.fromCharCode('0x' + o.ga)] : isdef(o.fa6) ? ['fa6', String.fromCharCode('0x' + o.fa6)] : ['algerian', o.friendly];
	addKeys({ family, fz, hline: fz, display: 'inline' }, styles);
	let el = mDom(d, styles, { html }); mCenterCenterFlex(el);
	return el;
	if (isdef(o.text)) el = mDom(d, { fz: fz, hline: fz, family: 'emoNoto', fg: rColor(), display: 'inline' }, { html: o.text });
	else if (isdef(o.fa)) el = mDom(d, { fz: fz, hline: fz, family: 'pictoFa', bg: 'transparent', fg: rColor(), display: 'inline' }, { html: String.fromCharCode('0x' + o.fa) });
	else if (isdef(o.ga)) el = mDom(d, { fz: fz, hline: fz, family: 'pictoGame', bg: 'beige', fg: rColor(), display: 'inline' }, { html: String.fromCharCode('0x' + o.ga) });
	else if (isdef(o.fa6)) el = mDom(d, { fz: fz, hline: fz, family: 'fa6', bg: 'transparent', fg: rColor(), display: 'inline' }, { html: String.fromCharCode('0x' + o.fa6) });
	return el;
}
function simpleCheckCommands() {
	if (nundef(UI.selectedImages)) UI.selectedImages = [];
	let n = UI.selectedImages.length;
	for (const k in UI.commands) {
		let cmd = UI.commands[k];
		if (nundef(cmd) || nundef(iDiv(cmd)) || nundef(mBy(k))) continue;
		if (nundef(cmd.fSel) || cmd.fSel(n)) cmdEnable(k); else cmdDisable(k);
	}
}
function simpleClearSelections() {
	mClearAllSelections();
	simpleCheckCommands();
}
async function simpleFinishEditing(canvas, dPopup, inpFriendly, inpCats, sisi) {
	const dataUrl = canvas.toDataURL('image/png'); //davon jetzt die dataUrl!
	if (isEmpty(inpFriendly.value)) inpFriendly.value = 'pic'
	let friendly = inpFriendly.value;
	let [name, imgname] = findUniqueSuperdiKey(friendly);
	console.log('key name will be', name, imgname);
	let key = name, filename = name + '.png';
	let o = { image: dataUrl, coll: sisi.name, filename };
	let resp = await mPostRoute('postImage', o); //console.log('resp', resp); //sollte path enthalten!
	filename = resp.filename;
	let imgPath = `../assets/img/${sisi.name}/${filename}`;
	let cats = extractWords(valf(inpCats.value, ''));
	let item = isdef(M.superdi[key]) ? jsCopy(M.superdi[key]) : { key, friendly, cats, colls: [] };
	item[valf(imgname, 'img')] = imgPath;
	dPopup.remove();
	await simpleOnDroppedItem(item, key, sisi);
}
function simpleInit(name, sisi) {
	if (nundef(name) && isdef(UI.simple)) { sisi = UI.simple; name = sisi.name; }
	let isReload = isdef(sisi.index) && sisi.name == name;
	if (!isReload) { sisi.index = 0; sisi.pageIndex = 1; sisi.name = name; sisi.filter = null; }
	let list = [];
	if (name == 'all' || isEmpty(name)) { list = Object.keys(M.superdi); }
	else if (isdef(M.byCollection[name])) { list = M.byCollection[name]; }
	else list = [];
	localStorage.setItem('sisi', name)
	let dMenu = sisi.dMenu;
	mClear(dMenu);
	let d = mDom(dMenu); mFlexV(d);
	mDom(d, { fz: 24, weight: 'bold' }, { html: 'Collection:' });
	let collNames = M.collections;
	let dlColl = mDatalist(d, collNames, { placeholder: "<select from list>" });
	dlColl.inpElem.oninput = ev => { console.log(sisi.name, ev.target.value); simpleInit(ev.target.value, sisi); }
	dlColl.inpElem.value = name;
	list = sortByFunc(list, x => M.superdi[x].friendly);
	sisi.masterKeys = list;
	sisi.keys = sisi.filter ? collFilterImages(sisi, sisi.filter) : list;
	let cats = collectCats(sisi.keys);
	cats.sort();
	d = mDom(dMenu); mFlexV(d);
	let wLabel = sisi.cols < 6 ? 117 : 'auto';
	mDom(d, { fz: 24, weight: 'bold', w: wLabel, align: 'right' }, { edit: true, html: 'Filter:' });
	let dlCat = mDatalist(d, cats, { edit: false, placeholder: "<enter value>", value: sisi.filter });
	dlCat.inpElem.oninput = ev => {
		let coll = UI.simple;
		let s = ev.target.value.toLowerCase().trim();
		let list = collFilterImages(coll, s);
		coll.keys = list;
		coll.filter = s;
		coll.index = 0; coll.pageIndex = 1; simpleClearSelections();
		simpleShowImageBatch(coll, 0, false);
	};
	d = mDom(dMenu, { gap: 10, align: 'right' });
	mButton('prev', () => simpleShowImageBatch(sisi, -1), d, { w: 70, margin: 0, maleft: 10 }, 'input', 'bPrev');
	mButton('next', () => simpleShowImageBatch(sisi, 1), d, { w: 70, margin: 0, maleft: 10 }, 'input', 'bNext');
	simpleClearSelections();
	simpleShowImageBatch(sisi);
}
function simpleLocked(collname) {
	if (nundef(collname)) collname = lookup(UI, ['simple', 'name']);
	if (!collname) return true;
	return getUname() != '_unsafe' && ['all', 'emo', 'fa6', 'icon', 'nations', 'users'].includes(collname);
}
async function simpleOnDropImage(ev, elem) {
	let dt = ev.dataTransfer;
	if (dt.types.includes('itemkey')) {
		let data = ev.dataTransfer.getData('itemkey');
		await simpleOnDroppedItem(data);
	} else {
		const files = ev.dataTransfer.files;
		if (files.length > 0) {
			const reader = new FileReader();
			reader.onload = async (evReader) => {
				let data = evReader.target.result;
				await simpleOnDroppedUrl(data, UI.simple);
			};
			reader.readAsDataURL(files[0]);
		}
	}
}
async function simpleOnDroppedItem(itemOrKey, key, sisi) {
	if (nundef(sisi)) sisi = UI.simple;
	let item;
	if (isString(itemOrKey)) { key = itemOrKey; item = M.superdi[key]; } else { item = itemOrKey; }
	assertion(isdef(key), 'NO KEY!!!!!');
	lookupAddIfToList(item, ['colls'], sisi.name);
	let o = M.superdi[key];
	if (isdef(o)) {
		console.log(`HA! ${key} already there`);
		let changed = false;
		for (const k in item) {
			let val = item[k];
			if (isLiteral(val) && o[k] != item[k]) { changed = true; break; }
			else if (isList(val) && !sameList(val, o[k])) { changed = true; break; }
		}
		if (!changed) return;
	}
	console.log(`........But changed!!!`);
	let di = {}; di[key] = item;
	await updateSuperdi(di);
	simpleInit(sisi.name, sisi)
}
async function simpleOnDroppedUrl(src, sisi) {
	let sz = 400;
	let dPopup = mDom(document.body, { position: 'fixed', top: 40, left: 0, wmin: sz, hmin: sz, bg: 'pink' });
	let dParent = mDom(dPopup);
	let d = mDom(dParent, { w: sz, h: sz, border: 'dimgray', margin: 10 });
	let canvas = createPanZoomCanvas(d, src, sz, sz);
	let instr = mDom(dPopup, { align: 'center', mabot: 10 }, { html: `- panzoom image to your liking -` })
	let dinp = mDom(dPopup, { padding: 10, align: 'right', display: 'inline-block' })
	mDom(dinp, { display: 'inline-block' }, { html: 'Name: ' });
	let inpFriendly = mDom(dinp, { outline: 'none', w: 200 }, { className: 'input', name: 'friendly', tag: 'input', type: 'text', placeholder: `<enter name>` });
	let defaultName = '';
	let iDefault = 1;
	let k = sisi.masterKeys.find(x => x == `${sisi.name}${iDefault}`);
	while (isdef(k)) { iDefault++; k = sisi.masterKeys.find(x => x == `${sisi.name}${iDefault}`); }
	defaultName = `${sisi.name}${iDefault}`;
	inpFriendly.value = defaultName;
	mDom(dinp, { h: 1 });
	mDom(dinp, { display: 'inline-block' }, { html: 'Categories: ' })
	let inpCats = mDom(dinp, { outline: 'none', w: 200 }, { className: 'input', name: 'cats', tag: 'input', type: 'text', placeholder: `<enter categories>` });
	let db2 = mDom(dPopup, { padding: 10, display: 'flex', gap: 10, 'justify-content': 'end' });
	mButton('Cancel', () => dPopup.remove(), db2, { w: 70 }, 'input');
	mButton('Save', () => simpleFinishEditing(canvas, dPopup, inpFriendly, inpCats, sisi), db2, { w: 70 }, 'input');
}
async function simpleOnclickItem(ev) {
	let id = evToId(ev);
	let item = UI.simple.items[id]; if (nundef(item)) return;
	let selkey = item.key;
	toggleSelectionOfPicture(iDiv(item), selkey, UI.selectedImages);
	simpleCheckCommands();
}
async function simpleOnclickLabel(ev) {
	evNoBubble(ev);
	let id = evToId(ev); console.log('id', id)
	let o = lookup(UI.simple, ['items', id]);
	if (!o) return;
	console.log('clicked label of', o);
	let [key, elem, collname] = [o.key, o.name, iDiv(o)];
	let newfriendly = await mGather(ev.target);
	if (!newfriendly) return;
	if (isEmpty(newfriendly)) {
		showMessage(`ERROR: name invalid: ${newfriendly}`);
		return;
	}
	console.log('rename friendly to', newfriendly)
	let item = M.superdi[key];
	item.friendly = newfriendly;
	let di = {};
	di[key] = item;
	let res = await mPostRoute('postUpdateSuperdi', { di });
	console.log('postUpdateSuperdi', res)
	await loadAssets();
	ev.target.innerHTML = newfriendly;
}
function simpleShowImageBatch(sisi, inc = 0, alertEmpty = false) {
	let [keys, index, numCells] = [sisi.keys, sisi.index, sisi.rows * sisi.cols];
	if (isEmpty(keys) && alertEmpty) showMessage('nothing has been added to this collection yet!');
	if (keys.length <= numCells) inc = 0;
	let newPageIndex = sisi.pageIndex + inc;
	let numItems = keys.length;
	let maxPage = Math.max(1, Math.ceil(numItems / numCells));
	if (newPageIndex > maxPage) newPageIndex = 1;
	if (newPageIndex < 1) newPageIndex = maxPage;
	index = numCells * (newPageIndex - 1);
	let list = arrTakeFromTo(keys, index, index + numCells);
	sisi.index = index; sisi.pageIndex = newPageIndex;
	sisi.items = {};
	let name = sisi.name;
	for (let i = 0; i < list.length; i++) {
		let key = list[i];
		let d = sisi.cells[i];
		mStyle(d, { opacity: 1 });
		mClass(d, 'magnifiable')
		let id = getUID();
		let d1 = simpleShowImageInBatch(key, d, {}, { prefer: sisi.name == 'emo' ? 'img' : 'photo' });
		d1.id = id;
		let item = { div: d1, key, name, id, index: i, page: newPageIndex };
		sisi.items[id] = item;
		if (isList(UI.selectedImages) && UI.selectedImages.includes(key)) mSelect(d1);
	}
	for (let i = list.length; i < numCells; i++) {
		mStyle(sisi.cells[i], { opacity: 0 })
	}
	sisi.dPageIndex.innerHTML = `page ${sisi.pageIndex}/${maxPage}`;
	let [dNext, dPrev] = [mBy('bNext'), mBy('bPrev')];
	if (maxPage == 1) { mClass(dPrev, 'disabled'); mClass(dNext, 'disabled'); }
	else { mClassRemove(dPrev, 'disabled'); mClassRemove(dNext, 'disabled'); }
}
function simpleShowImageInBatch(key, dParent, styles = {}, opts = {}) {
	let o = M.superdi[key]; o.key = key;
	addKeys({ bg: rColor() }, styles);
	mClear(dParent);
	[w, h] = [dParent.offsetWidth, dParent.offsetHeight];
	let [sz, fz] = [.9 * w, .8 * h];
	let d1 = mDiv(dParent, { position: 'relative', w: '100%', h: '100%', padding: 11, box: true });//overflow: 'hidden', 
	mCenterCenterFlex(d1)
	let el = null;
	let src = (opts.prefer == 'photo' && isdef(o.photo)) ? o.photo : valf(o.img, null);
	if (isdef(src)) {
		if (o.cats.includes('card')) {
			el = mDom(d1, { h: '100%', 'object-fit': 'cover', 'object-position': 'center center' }, { tag: 'img', src });
			mDom(d1, { h: 1, w: '100%' })
		} else {
			el = mDom(d1, { w: '100%', h: '100%', 'object-fit': 'cover', 'object-position': 'center center' }, { tag: 'img', src });
		}
	}
	else if (isdef(o.text)) el = mDom(d1, { fz: fz, hline: fz, family: 'emoNoto', fg: rColor(), display: 'inline' }, { html: o.text });
	else if (isdef(o.fa)) el = mDom(d1, { fz: fz, hline: fz, family: 'pictoFa', bg: 'transparent', fg: rColor(), display: 'inline' }, { html: String.fromCharCode('0x' + o.fa) });
	else if (isdef(o.ga)) el = mDom(d1, { fz: fz, hline: fz, family: 'pictoGame', bg: 'beige', fg: rColor(), display: 'inline' }, { html: String.fromCharCode('0x' + o.ga) });
	else if (isdef(o.fa6)) el = mDom(d1, { fz: fz, hline: fz, family: 'fa6', bg: 'transparent', fg: rColor(), display: 'inline' }, { html: String.fromCharCode('0x' + o.fa6) });
	assertion(el, 'PROBLEM mit' + key);
	let label = mDom(d1, { fz: 11, cursor: 'pointer' }, { html: o.friendly, className: 'ellipsis hoverHue' });
	label.onclick = simpleOnclickLabel;
	mStyle(d1, { cursor: 'pointer' });
	d1.onclick = simpleOnclickItem;
	d1.setAttribute('key', key);
	d1.setAttribute('draggable', true)
	d1.ondragstart = ev => { ev.dataTransfer.setData('itemkey', key); }
	return d1;
}
function simpleSidebar(wmin) {
	mStyle('dLeft', { wmin });
	let d = mDom('dLeft', { wmin: wmin - 10, matop: 20, h: window.innerHeight - getRect('dLeft').y - 102 }); //, bg:'#00000020'  }); 
	let gap = 5;
	let stylesTitles = { matop: 10, bg: '#ffffff80', fg: 'black' };
	let cmds = {};
	cmds.simpleNew = mCommand(d, 'simpleNew', 'New'); mNewline(d, gap);
	mDom(d, stylesTitles, { html: 'Selection:' })
	cmds.simpleSelectAll = mCommand(d, 'simpleSelectAll', 'Select All'); mNewline(d, gap);
	cmds.simpleSelectPage = mCommand(d, 'simpleSelectPage', 'Select Page'); mNewline(d, gap);
	cmds.simpleClearSelections = mCommand(d, 'simpleClearSelections', 'Clear Selection', { fSel: x => x >= 1 }); mNewline(d, gap);
	mDom(d, stylesTitles, { html: 'Item:' })
	cmds.setAvatar = mCommand(d, 'setAvatar', 'Set Avatar', { fSel: x => x == 1 }); mNewline(d, gap);
	cmds.editDetails = mCommand(d, 'editDetails', 'Edit Details', { fSel: x => x == 1 }); mNewline(d, gap);
	mDom(d, stylesTitles, { html: 'Items:' })
	cmds.addSelected = mCommand(d, 'addSelected', 'Add To', { fSel: x => (x >= 1) }); mNewline(d, gap);
	cmds.simpleRemove = mCommand(d, 'simpleRemove', 'Remove', { fSel: x => (!simpleLocked() && x >= 1) }); mNewline(d, gap);
	UI.commands = cmds;
	simpleCheckCommands();
}
async function simpleUpload(route, o) {
	let server = getServerurl();
	server += `/${route}`;
	const response = await fetch(server, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		mode: 'cors',
		body: JSON.stringify(o)
	});
	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		return 'ERROR 1';
	}
}
function sockInit() {
	let server = getServerurl();
	Socket = io(server);
	Socket.on('config', onsockConfig);
	Socket.on('disconnect', x => console.log('::SOCK disconnect:', x));
	Socket.on('event', onsockEvent);
	Socket.on('message', showChatMessage);
	Socket.on('merged', onsockMerged);
	Socket.on('pending', onsockPending);
	Socket.on('table', onsockTable);
	Socket.on('tables', onsockTables);
	Socket.on('superdi', onsockSuperdi);
}
function sockPostUserChange(oldname, newname) {
	Socket.emit('userChange', { oldname, newname });
}
function someOtherPlayerName(table) {
	return rChoose(arrWithout(table.playerNames, getUname()));
}
function sortBy(arr, key) {
	function fsort(a, b) {
		let [av, bv] = [a[key], b[key]];
		if (isNumber(av) && isNumber(bv)) return Number(av) < Number(bv) ? -1 : 1;
		if (isEmpty(av)) return -1;
		if (isEmpty(bv)) return 1;
		return av < bv ? -1 : 1;
	}
	arr.sort(fsort);
	return arr;
}
function sortByDescending(arr, key) {
	function fsort(a, b) {
		let [av, bv] = [a[key], b[key]];
		if (isNumber(av) && isNumber(bv)) return Number(av) > Number(bv) ? -1 : 1;
		if (isEmpty(av)) return 1;
		if (isEmpty(bv)) return -1;
		return av > bv ? -1 : 1;
	}
	arr.sort(fsort);
	return arr;
}
function sortByFunc(arr, func) { arr.sort((a, b) => (func(a) < func(b) ? -1 : 1)); return arr; }
function sortDictionary(di) {
	let keys = Object.keys(di);
	keys.sort();
	let newdi = {};
	for (const k of keys) {
		newdi[k] = di[k];
	}
	return newdi;
}
function splitAtAnyOf(s, sep) {
	let arr = [], w = '';
	for (let i = 0; i < s.length; i++) {
		let ch = s[i];
		if (sep.includes(ch)) {
			if (!isEmpty(w)) arr.push(w);
			w = '';
		} else {
			w += ch;
		}
	}
	if (!isEmpty(w)) arr.push(w);
	return arr;
}
const stage = {
	width: 0,
	height: 0,
}
async function start() { TESTING = true; await prelims(); }
async function startGame(gamename, players, options) {
	let table = createOpenTable(gamename, players, options);
	table = setTableToStarted(table);
	let res = await mPostRoute('postTable', table);
}
function startPulsing(idlist) {
	idlist.map(x => B.diPoints[x].div.classList.add('pulseFastInfinite'));
}
function startsWith(s, sSub) {
	return s.substring(0, sSub.length) == sSub;
}
function staticTitle(table) {
	clearInterval(TO.titleInterval);
	let url = window.location.href;
	let loc = url.includes('vidulus') ? '' : '(local)';
	let game = isdef(table) ? lastWord(table.friendly) : '♠ Moxito ♠';
	document.title = `${loc} ${game}`;
}
function stopPulsing(idExcept = []) {
	let drem = document.querySelectorAll('.pulseFastInfinite');
	for (const d of drem) {
		if (idExcept.includes(d.id)) continue;
		d.classList.remove('pulseFastInfinite');
	}
}
function strRemoveTrailing(s, sub) {
	return s.endsWith(sub) ? stringBeforeLast(s, sub) : s;
}
function stringAfter(sFull, sSub) {
	let idx = sFull.indexOf(sSub);
	if (idx < 0) return '';
	return sFull.substring(idx + sSub.length);
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
	return sFull.substring(0, sFull.length - arrLast(parts).length - sSub.length);
}
function stringSplit(input) {
	return input.split(/[\s,]+/);
}
async function switchToMainMenu(name) { return await switchToMenu(UI.nav, name); }
async function switchToMenu(menu, key) {
	menuCloseCurrent(menu);
	Menu = { key }; localStorage.setItem('menu', key);
	await menuOpen(menu, key);
}
async function switchToUser(uname, menu) {
	if (!isEmpty(uname)) uname = normalizeString(uname);
	if (isEmpty(uname)) uname = 'guest';
	sockPostUserChange(U ? getUname() : '', uname); //das ist nur fuer die client id!
	U = await getUser(uname);
	localStorage.setItem('username', uname);
	iDiv(UI.nav.commands.user).innerHTML = uname;
	setUserTheme();
	menu = valf(menu, getMenu(), localStorage.getItem('menu'), 'home');
	await switchToMainMenu(menu);
}
function tableLayoutMR(dParent, m = 7, r = 1) {
	let ui = UI; ui.players = {};
	clearElement(dParent);
	let bg = 'transparent';
	let [dMiddle, dRechts] = [ui.dMiddle, ui.dRechts] = mColFlex(dParent, [m, r], [bg, bg]);
	mCenterFlex(dMiddle, false);
	let dOben = ui.dOben = mDiv(dMiddle, { w: '100%', display: 'block' }, 'dOben');
	let dSelections = ui.dSelections = mDiv(dOben, {}, 'dSelections');
	for (let i = 0; i <= 5; i++) { ui[`dSelections${i}`] = mDiv(dSelections, {}, `dSelections${i}`); }
	let dActions = ui.dActions = mDiv(dOben, { w: '100%' });
	for (let i = 0; i <= 5; i++) { ui[`dActions${i}`] = mDiv(dActions, { w: '100%' }, `dActions${i}`); }
	ui.dError = mDiv(dOben, { w: '100%', bg: 'red', fg: 'yellow', hpadding: 12, box: true }, 'dError');
	let dSubmitOrRestart = ui.dSubmitOrRestart = mDiv(dOben, { w: '100%' });
	let dOpenTable = ui.dOpenTable = mDiv(dMiddle, { w: '100%', padding: 10 }); mFlexWrap(dOpenTable);
	return [dOben, dOpenTable, dMiddle, dRechts];
}
function takeFromTo(ad, from, to) {
	if (isDict(ad)) {
		let keys = Object.keys(ad);
		return keys.slice(from, to).map(x => (ad[x]));
	} else return ad.slice(from, to);
}
async function test0() {
	let d1 = mDom(document.body, { bg: 'red', hline: 0, margin: 0 }, { html: '&nbsp;' });
	let [w, h, margin, padding, border, sz] = [500, 500, 20, 30, 8, 50];
	let dParent = mDom(d1, { w, h, bg: 'inherit', fg: 'inherit' }); //, { border: `${border}px solid #555`, wbox: true, position: 'relative', w, h, bg: '#242430', margin, padding }, { id: 'dCanvas' });
	showStyles(dParent);
	let d = mDom(dParent, { w: sz, h: sz, margin }, { html: 'hallo' }); //default is bg=rgba(0,0,0,0) fg=rgb(0,0,0)
	showStyles(d);
}
function test1(map) {
	var baseballIcon = L.icon({
		iconUrl: '../leaf94/baseball-marker.png',
		iconSize: [32, 37],
		iconAnchor: [16, 37],
		popupAnchor: [0, -28]
	});
	function onEachFeature(feature, layer) {
		var popupContent = '<p>I started out as a GeoJSON ' +
			feature.geometry.type + ", but now I'm a Leaflet vector!</p>";
		if (feature.properties && feature.properties.popupContent) {
			popupContent += feature.properties.popupContent;
		}
		layer.bindPopup(popupContent);
	}
	var bicycleRentalLayer = L.geoJSON([bicycleRental, campus], {
		style: function (feature) {
			return feature.properties && feature.properties.style;
		},
		onEachFeature: onEachFeature,
		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, {
				radius: 8,
				fillColor: '#ff7800',
				color: '#000',
				weight: 1,
				opacity: 1,
				fillOpacity: 0.8
			});
		}
	}).addTo(map);
	var freeBusLayer = L.geoJSON(freeBus, {
		filter: function (feature, layer) {
			if (feature.properties) {
				return feature.properties.underConstruction !== undefined ? !feature.properties.underConstruction : true;
			}
			return false;
		},
		onEachFeature: onEachFeature
	}).addTo(map);
	var coorsLayer = L.geoJSON(coorsField, {
		pointToLayer: function (feature, latlng) {
			return L.marker(latlng, { icon: baseballIcon });
		},
		onEachFeature: onEachFeature
	}).addTo(map);
}
function toElem(d) { return isString(d) ? mBy(d) : d; }
function toLetters(s) { return [...s]; }
function toWords(s, allow_ = false) {
	let arr = allow_ ? s.split(/[\W]+/) : s.split(/[\W|_]+/);
	return arr.filter(x => !isEmpty(x));
}
function toggleItemSelection(item, classSelected = 'framedPicture', selectedItems = null) {
	if (nundef(item)) return;
	let ui = iDiv(item);
	item.isSelected = nundef(item.isSelected) ? true : !item.isSelected;
	if (item.isSelected) mClass(ui, classSelected); else mRemoveClass(ui, classSelected);
	if (isdef(selectedItems)) {
		if (item.isSelected) {
			console.assert(!selectedItems.includes(item), 'UNSELECTED PIC IN PICLIST!!!!!!!!!!!!')
			selectedItems.push(item);
		} else {
			console.assert(selectedItems.includes(item), 'PIC NOT IN PICLIST BUT HAS BEEN SELECTED!!!!!!!!!!!!')
			removeInPlace(selectedItems, item);
		}
	}
}
function toggleSelectionOfPicture(elem, selkey, selectedPics, className = 'framedPicture') {
	if (selectedPics.includes(selkey)) {
		removeInPlace(selectedPics, selkey); mUnselect(elem);
	} else {
		selectedPics.push(selkey); mSelect(elem);
	}
}
function trim(str) {
	return str.replace(/^\s+|\s+$/gm, '');
}
function tryJSONParse(astext) {
	try {
		const data = JSON.parse(astext);
		return data;
	} catch {
		console.log('text', astext)
		return { message: 'ERROR', text: astext }
	}
}
async function uiTypeCalendar(dParent) {
	const [wcell, hcell, gap] = [120, 100, 10];
	let outerStyles = {
		rounding: 4, patop: 4, pabottom: 4, weight: 'bold', box: true,
		paleft: gap / 2, w: wcell, hmin: hcell,
		bg: 'black', fg: 'white', cursor: 'pointer'
	}
	let innerStyles = { box: true, padding: 0, align: 'center', bg: 'beige', rounding: 4 };//, w: '95%', hmin: `calc( 100% - 24px )` }; //cellWidth - 28 };
	innerStyles.w = wcell - 11.75;
	innerStyles.hmin = `calc( 100% - 23px )`;//hcell-32
	let fz = 12;
	let h = measureHeightOfTextStyle(dParent, { fz: fz }); //console.log('h', h)
	let eventStyles = { fz: fz, hmin: h, w: '100%' };
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var dParent = toElem(dParent);
	var container = mDiv(dParent, {}, 'dCalendar');
	var currentDate = new Date();
	var today = new Date();
	let dTitle = mDiv(container, { w: 890, vpadding: gap, fz: 26, family: 'sans-serif', display: 'flex', justify: 'space-between' }, { className: 'title' });
	var dWeekdays = mGrid(1, 7, container, { gap: gap });
	var dDays = [];
	var info = {};
	for (const w of weekdays) { mDiv(dWeekdays, { w: wcell }, null, w, 'subtitle') };
	var dGrid = mGrid(6, 7, container, { gap: gap });
	var dDate = mDiv(dTitle, { display: 'flex', gap: gap }, 'dDate', '', 'title');
	var dButtons = mDiv(dTitle, { display: 'flex', gap: gap });
	mButton('Prev',
		async () => {
			let m = currentDate.getMonth();
			let y = currentDate.getFullYear();
			if (m == 0) setDate(12, y - 1); else await setDate(m, y);
		},
		dButtons, { w: 70, margin: 0 }, 'input');
	mButton('Next',
		async () => {
			let m = currentDate.getMonth();
			let y = currentDate.getFullYear();
			if (m == 11) setDate(1, y + 1); else await setDate(m + 2, y);
		}, dButtons, { w: 70, margin: 0 }, 'input');
	var dMonth, dYear;
	function getDayDiv(dt) {
		if (dt.getMonth() != currentDate.getMonth() || dt.getFullYear() != currentDate.getFullYear()) return null;
		let i = dt.getDate() + info.dayOffset;
		if (i < 1 || i > info.numDays) return null;
		let ui = dDays[i];
		if (ui.style.opacity === 0) return null;
		return ui.children[0];
	}
	async function setDate(m, y) {
		currentDate.setMonth(m - 1);
		currentDate.setFullYear(y);
		mClear(dDate);
		dMonth = mDiv(dDate, {}, 'dMonth', `${currentDate.toLocaleDateString('en-us', { month: 'long' })}`);
		dYear = mDiv(dDate, {}, 'dYear', `${currentDate.getFullYear()}`);
		mClear(dGrid);
		dDays.length = 0;
		let c = getNavBg();
		let dayColors = mimali(c, m).map(x => colorFrom(x))
		for (const i of range(42)) {
			let cell = mDiv(dGrid, outerStyles);
			mStyle(cell, { bg: dayColors[i], fg: 'contrast' })
			dDays[i] = cell;
		}
		populate(currentDate);
		await refreshEvents();
		return { container, date: currentDate, dDate, dGrid, dMonth, dYear, setDate, populate };
	}
	function populate() {
		let dt = currentDate;
		const day = info.day = dt.getDate();
		const month = info.month = dt.getMonth();
		const year = info.year = dt.getFullYear();
		const firstDayOfMonth = info.firstDay = new Date(year, month, 1);
		const daysInMonth = info.numDays = new Date(year, month + 1, 0).getDate();
		const dateString = info.dayString = firstDayOfMonth.toLocaleDateString('en-us', {
			weekday: 'long',
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
		});
		const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
		info.dayOffset = paddingDays - 1;
		for (const i of range(42)) {
			if (i < paddingDays || i >= paddingDays + daysInMonth) { mStyle(dDays[i], { opacity: 0 }); }
		}
		for (let i = paddingDays + 1; i <= paddingDays + daysInMonth; i++) {
			const daySquare = dDays[i - 1];
			let date = new Date(year, month, i - paddingDays);
			daySquare.innerText = i - paddingDays + (isSameDate(date, today) ? ' TODAY' : '');
			let d = mDom(daySquare, innerStyles, { id: date.getTime() });
			daySquare.onclick = ev => { evNoBubble(ev); onclickDay(d, eventStyles); }
		}
	}
	async function refreshEvents() {
		let events = await getEvents();
		for (const k in events) {
			let o = events[k];
			let dt = new Date(Number(o.day));
			let dDay = getDayDiv(dt);
			if (!dDay) continue;
			uiTypeEvent(dDay, o, eventStyles);
		}
		mDummyFocus();
	}
	await setDate(currentDate.getMonth() + 1, currentDate.getFullYear());
	return { container, date: currentDate, dDate, dGrid, dMonth, dYear, info, getDayDiv, refreshEvents, setDate, populate }
}
function uiTypeEvent(dParent, o, styles = {}) {
	Items[o.id] = o;
	let id = o.id;
	let ui = mDom(dParent, styles, { id: id }); //, className:'no_events'}); //onclick:ev=>evNoBubble(ev) }); 
	mStyle(ui, { overflow: 'hidden', display: 'flex', gap: 2, padding: 2, 'align-items': 'center' }); //,'justify-items':'center'})
	let [wtotal, wbutton, h] = [mGetStyle(dParent, 'w'), 17, styles.hmin];
	let fz = 15;
	let stInput = { overflow: 'hidden', hline: fz * 4 / 5, fz: fz, h: h, border: 'solid 1px silver', box: true, margin: 0, padding: 0 };
	let inp = mDom(ui, stInput, { html: o.text, tag: 'input', className: 'no_outline', onclick: ev => { evNoBubble(ev) } }); //;selectText(ev.target);}});
	inp.value = getEventValue(o);
	inp.addEventListener('keyup', ev => { if (ev.key == 'Enter') { mDummyFocus(); onEventEdited(id, inp.value); } });
	fz = 14;
	let stButton = { overflow: 'hidden', hline: fz * 4 / 5, fz: fz, box: true, fg: 'silver', bg: 'white', family: 'pictoFa', display: 'flex' };
	let b = mDom(ui, stButton, { html: String.fromCharCode('0x' + M.superdi.pen_square.fa) });
	ui.onclick = ev => { evNoBubble(ev); onclickExistingEvent(ev); }
	mStyle(inp, { w: wtotal - wbutton });
	return { ui: ui, inp: inp, id: id };
}
function uiTypePlayerStats(table, me, dParent, layout, styles = {}) {
	let dOuter = mDom(dParent); dOuter.setAttribute('inert', true); //console.log(dOuter)
	if (layout == 'rowflex') mStyle(dOuter, { display: 'flex', justify: 'center' });
	else if (layout == 'col') mStyle(dOuter, { display: 'flex', dir: 'column' });
	addKeys({ rounding: 10, bg: '#00000050', margin: 4, box: true, 'border-style': 'solid', 'border-width': 2 }, styles);
	let show_first = me;
	let order = arrCycle(table.plorder, table.plorder.indexOf(show_first));
	let items = {};
	for (const name of order) {
		let pl = table.players[name];
		styles['border-color'] = pl.color;
		let d = mDom(dOuter, styles, { id: name2id(name) })
		let img = showUserImage(name, d, 40); mStyle(img, { box: true })
		items[name] = { div: d, img, name };
	}
	return items;
}
function uid() {
	UID += 1;
	return 'a' + UID;
}
function unlock() {
	DA.LengthyProcessRunning = false;
	console.log('UNLOCK!!!!!!!!!!!!!!!!!!!!!!');
}
function unlockLengthyProcess() {
	try {
		if (DA.Interrupt === true && DA.LengthyProcessRunning === true) {
			DA.LengthyProcessRunning = false;
			console.log('INTERRUPT!!!!!!!!!!!!!!!!!!!!!!');
			throw 1;
		}
	}
	catch (err) { }
}
function unselectPlayerItem(item) { mStyle(iDiv(item), { bg: 'transparent', fg: 'black', border: `transparent` }); }
async function updateExtra() {
	mClear('dExtra');
	let d = mDom('dExtra');
	mStyle(d, { display: 'flex', justify: 'space-between' });
	let [left, right] = [mDom(d, {}, { id: 'dExtraLeft' }), mDom(d, {}, { id: 'dExtraRight' })];
	if (TESTING) await updateTestButtonsLogin();
}
async function updateSuperdi(di, key) {
	let res = await mPostRoute('postUpdateSuperdi', { di });
	await loadAssets();
}
async function updateTestButtonsLogin(names) {
	if (nundef(names)) names = ['amanda', 'felix', 'lauren', 'mimi', 'gul'];
	let d = mBy('dExtraRight'); mClear(d);
	let me = getUname();
	for (const name of names) {
		let idname = getButtonCaptionName(name);
		let b = UI[idname] = mButton(name, async () => await switchToUser(name), d, { maleft: 4, hpadding: 3, wmin: 50, className: 'button' });
		if (me == name) mStyle(b, { bg: 'red', fg: 'white' });
	}
}
function updateUserImageToBotHuman(playername, value) {
	function doit(checked, name, val) {
		let du = mByAttr('username', playername);
		let img = du.getElementsByTagName('img')[0]; //du.firstChild;
		if (checked == true) if (val == 'human') mStyle(img, { round: true }); else mStyle(img, { rounding: 2 });
	}
	if (isdef(value)) doit(true, 0, value); else return doit;
}
function userToPlayer(name, gamename, playmode = 'human') {
	let user = Serverdata.users[name];
	let pl = jsCopyExceptKeys(user, ['games']);
	let options = valf(getUserOptionsForGame(name, gamename), {});
	addKeys(options, pl);
	pl.playmode = playmode;
	let poss = getGamePlayerOptions(gamename);
	for (const p in poss) {
		if (isdef(pl[p])) continue;
		let val = poss[p];
		let defval = arrLast(val.split(','));
		if (isNumber(defval)) defval = Number(defval);
		pl[p] = defval;
	}
	return pl;
}
function valf() {
	for (const arg of arguments) if (isdef(arg)) return arg;
	return null;
}
function without(arr, elementToRemove) {
	return arr.filter(function (el) {
		return el !== elementToRemove;
	});
}
function wordAfter(arr, w) {
	if (isString(arr)) arr = toWords(arr);
	let i = arr.indexOf(w);
	return i >= 0 && arr.length > i ? arr[i + 1] : null;
}
function wsCard(d, w, h) {
	let card = cBlank(d, { h, w, border: 'silver' }); //return;
	let dCard = iDiv(card);
	return [card, dCard];
}
function wsFenFromItem(item) {
	return `${item.key}@${item.valueFactor}@${normalizeString(item.power, '_', [':', '.'])}@${item.colorPower}@${item.abstract}@${item.colorSym}@${item.op}`;
}
function wsFood(tokens, op, dtop, sz) {
	let d = mDom(dtop); mCenterCenterFlex(d);
	let ch = op;
	for (let i = 0; i < tokens.length; i++) {
		let t = tokens[i];
		let d1 = wsPrintSymbol(d, sz, t);
		if (i < tokens.length - 1) mDom(d, { fz: sz * .7, weight: 'bold' }, { html: ch });
	}
}
function wsGenerateCardInfo(key) {
	let bg = rChoose(['white', 'sienna', 'pink', 'lightblue']);
	let palette = wsGetColorRainbow();
	let fg = rChoose(palette);
	sym = getAbstractSymbol([2, 8, 10, 23, 26]);
	power = wsGetPower(bg);
	valueFactor = rChoose(range(1, 3));
	op = rChoose(['+', '/']); //console.log('op',op)
	return wsFenFromItem({ key, valueFactor, power, colorPower: bg, abstract: sym, colorSym: fg, op });
}
function wsGetChildInline(item, color) {
	let type = item.class;
	let key = type == 'mammal' ? 'paw' : 'big_egg';
	let o = M.superdi[key];
	let [fam, sym] = isdef(o.fa6) ? ['fa6', 'fa6'] : isdef(o.fa) ? ['pictoFa', 'fa'] : ['pictoGame', 'ga'];
	let fg = valf(color, colorIdealText(item.colorPower, true));
	return `<span style="color:${fg};vertical-align:middle;line-height:80%;font-size:${item.fz * 1.5}px;font-family:${fam}">${String.fromCharCode('0x' + M.superdi[key][sym])}</span>`;
}
function wsGetColorRainbow() { return ['gold', 'limegreen', 'orangered', 'dodgerblue', 'indigo', 'hotpink']; }
function wsGetColorRainbowText(color) { return { gold: 'gold', limegreen: 'green', orangered: 'red', hotpink: 'pink', indigo: 'violet', dodgerblue: 'blue' }[color]; }
function wsGetFoodlist() { return ['cherries', 'fish', 'grain', 'mouse', 'seedling', 'worm'] }
function wsGetPower(colorOrKey, prop) {
	let powers = {
		_child_1_sym: [],
		_child_2_sym: [],
		_child_1_class: [],
		_child_2_class: [],
		_child_1_color: [],
		_child_2_color: [],
		_draw_1_card_deck: [],
		_draw_2_card_return_1: [],
		_draw_2_card_1: [],
		_tuck_1_pick_feeder: [],
		_tuck_1_pick_supply: [],
		_tuck_1_draw_tray: [],
		_tuck_1_draw_deck: [],
		_tuck_1_place: [],
		_food_1_supply: [],
		_food_1_feeder: [],
		_food_2_supply: [],
		_food_2_tray: [],
		_discard_1_child_pick_2_food_feeder: [],
		_discard_1_child_pick_1_food_supply: [],
		_discard_1_child_draw_2_card: [],
		_discard_1_food_draw_1_card: [],
		_discard_1_card_pick_1_food_supply: [],
		_repeat: [],
		_hunt_food_mouse: [],
		_hunt_food_fish: [],
		_hunt_card_sym: [],
		pink_draw_mission_pick_1_food_feeder: [],
		pink_place_child_pick_1_food_feeder: [],
		pink_hunt_successfully_pick_1_food_feeder: [],
		pink_draw_mission_draw_1_card_deck: [],
		pink_place_child_draw_1_card_deck: [],
		pink_hunt_successfully_draw_1_card_deck: [],
		white_draw_2_mission_return_1: [],
		white_collect_fish: [],
		white_collect_mouse: [],
		white_collect_worm: [],
		white_collect_cherries: [],
		white_child_sym: [],
		white_child_color: [],
		white_child_class: [],
		lightblue_feeder: [],
		lightblue_tray: [],
	};
	let list = Object.keys(powers);
	if (isColor(colorOrKey)) return rChoose(list.filter(x => colorOrKey == 'sienna' ? x.startsWith('_') : x.startsWith(colorOrKey)));
	else if (nundef(colorOrKey)) return rChoose(list);
	else if (nundef(prop)) return powers[colorOrKey];
	else return lookup(powers, [colorOrKey, prop]);
}
function wsGetRandomCards(n = 1, deck = null) {
	if (!deck) deck = jsCopy(M.byCollection.tierspiel).map(x => wsGenerateCardInfo(x)); console.log(deck.length);
	let list = rChoose(deck, n);
	return list.length == 1 ? wsItemFromFen(list[0]) : list.map(x => wsItemFromFen(x));
}
function wsGetSymbolFilename(key) {
	let files = {
		cherries: '../assets/games/wingspan/fruit.svg',
		fish: '../assets/games/wingspan/fish.svg',
		forest: '../assets/games/wingspan/forest1.png',
		grain: '../assets/games/wingspan/wheat.svg',
		grassland: '../assets/games/wingspan/grassland2.png',
		mouse: '../assets/games/wingspan/mouse.svg',
		omni: '../assets/games/wingspan/pie3.svg',
		seedling: '../assets/img/emo/seedling.png',
		wetland: '../assets/games/wingspan/wetland.png',
		worm: '../assets/games/wingspan/worm.svg',
	};
	return files[key];
}
function wsGetSymbolInline(key, fz) { return `&nbsp;<span style="vertical-align:middle;line-height:80%;font-size:${fz * 1.5}px;font-family:pictoGame">${String.fromCharCode('0x' + M.superdi[key].ga)}</span>`; }
function wsHabitat(tokens, dtop, sz) {
	for (let i = 0; i < tokens.length; i++) {
		let t = tokens[i];
		if (i == 2) mLinebreak(dtop);
		let d = wsPrintSymbol(dtop, sz, t);
		if (i == 2) mStyle(d, { matop: -sz * 3 / 2 });
	}
}
function wsItemFromFen(fen) {
	let [key, valueFactor, power, colorPower, sym, colorSym, op] = fen.split('@');
	let o = getDetailedSuperdi(key);
	let item = jsCopy(o);
	let bg = item.colorPower = colorPower;
	let palette = wsGetColorRainbow();
	let fg = item.colorSym = colorSym;
	sym = item.abstract = sym;
	item.power = power;
	valueFactor = item.valueFactor = valueFactor;
	item.op = op;
	item.value = valueFactor * (item.op == '+' ? 1 : item.foodTokens.length);
	return item;
}
function wsOffspringSymbol(dParent, styles = {}) {
	console.log(styles)
	let [w, h] = [styles.h, styles.h];
	console.log(w, h)
	let d = mDom(dParent, { w, h, box: true });//,bg:'orange'}); //w100:true,h100:true,bg:'lime'});
	let fz = styles.h; let hline = fz;
	mIfNotRelative(d);
	let o = M.superdi.big_egg;
	let [fam, sym] = isdef(o.fa6) ? ['fa6', 'fa6'] : isdef(o.fa) ? ['pictoFa', 'fa'] : ['pictoGame', 'ga'];
	let dEgg = mDom(d, { fg: 'grey', family: fam, fz, padding: 0, hline }, { html: String.fromCharCode('0x' + o[sym]) });
	o = M.superdi.paw;
	[fam, sym] = isdef(o.fa6) ? ['fa6', 'fa6'] : isdef(o.fa) ? ['pictoFa', 'fa'] : ['pictoGame', 'ga'];
	let dPaw = mDom(d, { w100: true, fg: 'black', family: fam, fz: 8, hline }, { html: String.fromCharCode('0x' + o[sym]) });
	mCenterFlex(dPaw)
	mPlace(dPaw, 'tc')
}
async function wsOnclickCard(table, item, items) { console.log('click', item) }
function wsPowerText(item, d, styles = {}) {
	mClear(d)
	let key = item.power; if (key.startsWith('_')) key = 'sienna' + key;
	let parts = key.split('_'); //console.log(parts)
	let s = '';
	let color = parts[0];
	if (color == 'sienna') s += 'WHEN ACTIVATED: ';
	else if (color == 'pink') s += 'ONCE BETWEEN TURNS: ';
	else if (color == 'white') s += 'WHEN PLAYED: ';
	else if (color == 'lightblue') s += 'ROUND END: ';
	copyKeys({ bg: color }, styles); mStyle(d, { bg: color, fg: 'contrast' });
	let what = parts[1];
	let verb = '';
	let n = Number(parts[2]);
	if (color == 'sienna') {
		if (what == 'child') {
			verb = 'place';
			s += `${capitalize(verb)} ${n} ${pluralOf('child', n)} on any`;
			let prop = parts[3];
			switch (prop) {
				case 'color':
					s += ` ${n == 1 ? 'card' : '2 cards'} with color <span style="border-radius:${item.fz}px;padding-left:${item.fz / 2}px;padding-right:${item.fz / 2}px;background-color:white;color:${colorFrom(item.colorSym)}">${wsGetColorRainbowText(item.colorSym)}</span>.`; break;
				case 'class':
					s += ` ${item.class}.`; break;
				case 'sym':
				default:
					s += ` ${n == 1 ? 'card' : '2 cards'} with symbol ${wsGetSymbolInline(item.abstract, item.fz)}.`;
			}
			if (n == 2) s += ` Other players may place 1 ${what}.`
		} else if (what == 'draw') {
			verb = 'draw';
			what = parts[3];
			s += `${capitalize(verb)} ${n} ${pluralOf(what, n)}`;
			let prop = parts[4];
			switch (prop) {
				case 'tray':
				case 'deck': s += ` from ${prop}.`; break;
				case 'return': s += `, return 1 at the end of action.`; break;
				case '1': s += ` Other players may draw 1.`; break;
				default: s += '.'; break;
			}
		} else if (what == 'tuck') {
			verb = what;
			what = parts[3];
			s += `${capitalize(verb)} ${n} ${pluralOf('card', n)}`;
			let prop = parts[3];
			switch (prop) {
				case 'pick': s += ` to ${prop} 1 food from ${parts[4]}.`; break;
				case 'draw': s += ` to ${prop} 1 card from ${parts[4]}.`; break;
				case 'place': s += ` to ${prop} 1 child on any card.`; break;
				default:
			}
		} else if (what == 'food') {
			verb = 'pick';
			s += `${capitalize(verb)} ${n} ${what} from ${parts[3]}.`;
			if (n == 2) s += ` Other players ${verb} 1 ${what}.`
		} else if (what == 'all') {
			s += `All players ${parts[2]} ${parts[3]} ${what}.`;
		} else if (what == 'discard') {
			let n1 = Number(parts[5])
			s += `You may ${what} ${n} ${parts[3]} to ${parts[4]}`;
			if (parts.length > 5) {
				let n1 = Number(parts[5]);
				s += ` ${n1} ${pluralOf(parts[6], n1)}`;
				s += parts.length > 7 ? ` from ${parts[7]}.` : '.';
			} else s += '.';
		} else if (what == 'repeat') {
			s += `Repeat another brown power on this habitat.`;
		} else if (what == 'hunt') {
			let verb = what; what = parts[2];
			if (what == 'food') {
				s += `Roll dice in feeder. If there is a ${parts[3]}, keep it.`;
			} else if (what == 'card') {
				s += `Draw a card. `;
				switch (parts[3]) {
					case 'sym':
					default: s += `If it has symbol ${wsGetSymbolInline(item.abstract, item.fz)}, tuck it.`; break;
				}
			}
		}
	}
	if (color == 'pink') {
		let [verb1, what1, verb2, n, what2, from] = parts.slice(1);
		s += `When another player ${verb1}s ${what1}, ${verb2} ${n} ${what2}`;
		s += isdef(from) ? ` from ${from}.` : '.';
	}
	if (color == 'white') {
		if (what == 'draw') {
			verb = 'draw';
			what = parts[3];
			s += `${capitalize(verb)} ${n} ${pluralOf(what, n)}`;
			let prop = parts[4];
			switch (prop) {
				case 'tray':
				case 'deck': s += ` from ${prop}.`; break;
				case 'return': s += `, return 1`; s += what == 'card' ? ` at the end of action.` : '.'; break;
				case '1': s += ` Other players may draw 1.`; break;
				default: s += '.'; break;
			}
		} else if (what == 'collect') {
			s += `Collect all ${parts[2]} from feeder.`
		} else if (what == 'child') {
			s += `Place 1 child on each of your cards with `;
			what = parts[2];
			switch (what) {
				case 'sym': s += `symbol ${wsGetSymbolInline(item.abstract, item.fz)}.`; break;
				case 'class': s += `class ${item.class}.`; break;
				case 'color': s += `color <span style="color:${colorFrom(item.colorSym)}">${wsGetColorRainbowText(item.colorSym)}</span>.`; break;
			}
		}
	}
	if (color == 'lightblue') {
		if (what == 'feeder') s += `Collect all food in feeder.`
		else if (what == 'tray') s += `Collect a card from tray.`
	}
	s = replaceAll(s, 'child', wsGetChildInline(item));
	d.innerHTML = s;
	return d;
}
function wsPresent(table) {
	presentStandardBGA();
	return;
	let fen = table.fen;
	let me = getUname();
	let pl = table.players[me];
	let d = mBy('dTable');
	d.style = '';
	d.className = '';
	mStyle(d, { hmin: 500, w: '90%', margin: 20 });
	d.innerHTML = ' '; mCenterFlex(d)
	let dCards = mDom(d, { gap: 8 }); mCenterFlex(dCards);
	let items = [];
	for (const fencard of pl.cards) {
		let ocard = wsItemFromFen(fencard);
		wsShowCardItem(ocard, dCards, .5);
		items.push(ocard);
	}
	mLinebreak(d, 25)
	let [w, h] = [1467, 1235].map(x => x * .67);
	let bg = U.color;
	let db = mDom(d, { w, h, bg, padding: 10, position: 'relative' });
	let da = mDom(db, { 'transform-origin': 'center', transform: 'rotate( -.3deg )', position: 'relative', w, h });
	let ibg = mDom(da, { position: 'absolute', left: 0, top: 0, w, h }, { tag: 'img', src: '../ode/wsboard1.jpg' });
	let dBoard = mDom(db, { position: 'absolute', left: -2, top: 0, w: w - 18, h: h - 12, wbox: true, border: `20px ${bg} solid` });
	let gap = 12;
	let grid = mGrid(3, 5, dBoard, { paleft: gap / 2, patop: gap, w: w - 52 }); //,position:'absolute'});
	let sym = ['food', 'child', 'card'];
	let n = [1, 1, 2, 2, 3];
	let cost = [0, 1, 1, 2, 2];
	let addon = [0, 1, 0, 1, 0];
	let list = wsGetRandomCards(15, fen.deck);
	for (const i of range(3)) {
		for (const j of range(5)) {
			let d = mDom(grid, { w: 172, h: 250, bg: rColor(), mabottom: 20 }); //,{html:'card'});
			let item = wsShowCardItem(list[i + 3 * j], d, .5)
		}
	}
	return items;
}
function wsPrintSymbol(dParent, sz, key) {
	let files = {
		cherries: '../assets/games/wingspan/fruit.svg',
		fish: '../assets/games/wingspan/fish.svg',
		forest: '../assets/games/wingspan/forest1.png',
		grain: '../assets/games/wingspan/wheat.svg',
		grassland: '../assets/games/wingspan/grassland2.png',
		mouse: '../assets/games/wingspan/mouse.svg',
		omni: '../assets/games/wingspan/pie3.svg',
		seedling: '../assets/img/emo/seedling.png',
		wetland: '../assets/games/wingspan/wetland.png',
		worm: '../assets/games/wingspan/worm.svg',
	};
	let keys = Object.keys(files);
	let styles = { w: sz, h: sz, };
	if (['wetland', 'grassland', 'forest'].includes(key)) styles['clip-path'] = PolyClips.diamond;
	if (key == 'wetland') styles.bg = 'lightblue';
	else if (key == 'grassland') styles.bg = 'goldenrod';
	else if (key == 'forest') styles.bg = 'emerald';
	let src = valf(files[key], key == 'food' ? files[rChoose(keys)] : null);
	if (src) return mDom(dParent, styles, { tag: 'img', width: sz, height: sz, src: files[valf(key, rChoose(keys))] });
	let o = M.superdi[key];
	return showim2(key, dParent, styles);
}
function wsSetup(table) {
	let fen = {};
	fen.deck = jsCopy(M.byCollection.tierspiel).map(x => wsGenerateCardInfo(x));
	arrShuffle(fen.deck);
	for (const name in table.players) {
		let pl = table.players[name];
		pl.score = 0;
		pl.cards = deckDeal(fen.deck, 5);
		pl.missions = [];
		pl.offsprings = 0;
		wsGetFoodlist().map(x => pl[x] = 0);
		pl.forest = [];
		pl.grassland = [];
		pl.wetland = [];
	}
	fen.round = 0;
	fen.phase = 'init';
	fen.stage = 'pick_cards';
	table.plorder = jsCopy(table.playerNames);
	table.turn = jsCopy(table.playerNames);
	return fen;
}
function wsShowCardItem(item, d, fa) {
	let [w, h, sztop, sz, gap, fz] = [340, 500, 100, 30, 8, 16].map(x => x * fa);
	item.fz = fz;
	let [card, dCard] = wsCard(d, w, h);
	let dtop = wsTopLeft(dCard, sztop, card.rounding);
	addKeys(card, item);
	let [bg, fg] = [item.colorPower, item.colorSym];
	wsHabitat(item.habTokens, dtop, sz * 1.1); mLinebreak(dtop, sz / 5);
	wsFood(item.foodTokens, item.op, dtop, sz * .8);
	wsTitle(item, dCard, sztop, fz, gap);
	let [szPic, yPic] = [h / 2, sztop + gap]
	let d1 = showim2(item.key, dCard, { rounding: 12, w: szPic, h: szPic }, { prefer: 'photo' });
	mPlace(d1, 'tr', gap, yPic);
	let leftBorderOfPic = w - (szPic + gap);
	let dleft = mDom(dCard, { w: leftBorderOfPic, h: szPic }); mPlace(dleft, 'tl', gap / 2, sztop + gap);
	mCenterCenterFlex(dleft);
	let dval = mDom(dleft, { fg, w: sz * 1.2, align: 'center', fz: fz * 1.8, weight: 'bold' }, { html: item.value });
	mLinebreak(dleft, 2 * gap)
	let szSym = sz * 1.5;
	let a = showim2(item.abstract, dleft, { w: szSym, h: szSym, fg });
	mLinebreak(dleft, 3 * gap)
	let dPlaetze = item.live.dPlaetze = showPlaetze(dleft, item, gap * 2);
	item.dpower = mDom(dCard, { fz: fz * 1.2, padding: gap, matop: sztop + szPic + gap * 3, w100: true, bg, fg: 'contrast', box: true });
	wsPowerText(item, item.dpower, { fz: item.fz })
	let dinfo = mDom(dCard, { fz, hpadding: gap, box: true, w100: true });
	mPlace(dinfo, 'bl'); mFlexLine(dinfo, 'space-between');
	mDom(dinfo, {}, { html: item.class });
	mDom(dinfo, {}, { html: item.olifespan.text });
	mDom(dinfo, {}, { html: item.osize.text });
	return item;
}
function wsStats(table) {
	let [me, players] = [getUname(), table.players];
	let style = { patop: 8, mabottom: 20, bg: 'beige', fg: 'contrast' };
	let player_stat_items = uiTypePlayerStats(table, me, 'dStats', 'colflex', style)
	for (const plname in players) {
		let pl = players[plname];
		let item = player_stat_items[plname];
		if (pl.playmode == 'bot') { mStyle(item.img, { rounding: 0 }); }
		let d = iDiv(item);
		mStyle(d, { wmin: 200, padding: 12 })
		mCenterFlex(d); mLinebreak(d); mIfNotRelative(d);
		let d1 = mDom(d); mCenterFlex(d1);
		wsGetFoodlist().map(x => playerStatCount(wsGetSymbolFilename(x), pl[x], d1));
		mLinebreak(d, 10);
		let d2 = mDom(d); mCenterFlex(d2);
		playerStatCount('star', pl.score, d2, null, { useSymbol: true }); //, {}, {id:`stat_${plname}_score`});
		playerStatCount('hand_with_fingers_splayed', pl.cards.length, d2, null, { useSymbol: true });
		playerStatCount(wsOffspringSymbol, pl.offsprings, d2);
		if (table.turn.includes(plname)) { mDom(d, { position: 'absolute', left: -3, top: 0 }, { html: getWaitingHtml() }); }
	}
}
function wsTitle(o, dCard, sztop, fz, gap) {
	let dtitle = mDom(dCard, { paleft: gap, wmax: sztop * 1.5 }); mPlace(dtitle, 'tl', sztop, gap)
	mDom(dtitle, { fz: fz * 1.1, weight: 'bold' }, { html: fromNormalized(o.friendly) });
	mDom(dtitle, { fz, 'font-style': 'italic' }, { html: o.species });
}
function wsTopLeft(dCard, sztop, rounding) {
	let dtop = mDom(dCard, { w: sztop, h: sztop, bg: '#ccc' });
	mPlace(dtop, 'tl');
	dtop.style.borderTopLeftRadius = dtop.style.borderBottomRightRadius = `${rounding}px`;
	mCenterCenterFlex(dtop);
	return dtop;
}
function yearsToReadable(n) {
	let di = { y: 1, m: 12, w: 52, d: 365, h: 365 * 24 };
	if (n > 1) return n.toFixed(1) + ' years';
	if (n * 12 > 1) return (n * 12).toFixed(1) + ' months';
	if (n * 52 > 1) return (n * 52).toFixed(1) + ' weeks';
	if (n * 365 > 1) return (n * 365).toFixed(1) + ' days';
	return (n * 365 * 24).toFixed(1) + ' hours';
}


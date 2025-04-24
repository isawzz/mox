async function showTable(force = false) {
	function updateUI() {
		const area = mBy('dMain');
		area.innerHTML = '<pre>' + JSON.stringify(DA.gameState, null, 2) + '</pre>';
		if (VERBOSE) console.log("UI updated:", DA.gameState);
	}

	let res = await fetch(`${DA.backendURL}/get_state.php`);
	if (!res.ok) {
		console.error('Error fetching game state:', res.statusText);
		return null;
	} //else { res = await res.text(); if (VERBOSE) console.log(res) }
	let state = await res.json();
	if (force || JSON.stringify(state) !== JSON.stringify(DA.gameState)) {
		DA.gameState = state;
		updateUI();
		if (VERBOSE) if (VERBOSE) console.log('Game state updated:', state);
	}
	return DA.gameState;

}
async function onclickTable(id) {
	DA.id = id;
	await switchToMenu('table');
}

async function onclickWatch() { }
function getCallerInfo() {
	const err = new Error();
	const stack = err.stack?.split('\n');

	if (!stack || stack.length < 4) {
		return { functionName: null, file: null, line: null };
	}

	// The 3rd item (index 2) is the current function, 4th (index 3) is the caller
	const callerLine = stack[3] || '';
	const match = callerLine.match(/at\s+(.*)\s+\((.*):(\d+):(\d+)\)/) ||
		callerLine.match(/at\s+(.*):(\d+):(\d+)/);

	if (match) {
		return match.length === 5
			? {
				functionName: match[1],
				file: match[2],
				line: parseInt(match[3]),
			}
			: {
				functionName: null,
				file: match[1],
				line: parseInt(match[2]),
			};
	}

	return { functionName: null, file: null, line: null };
}
function findElementBy(value, key = 'html') {
	const all = document.querySelectorAll('*');
	for (const el of all) {
		// Check property
		if (el[key] === value) return el;

		// Check attribute
		if (el.hasAttribute(key) && el.getAttribute(key) === value) return el;

		// Check innerHTML or textContent
		let di = { html: 'innerHTML', text: 'textContent', caption: 'innerHTML' };
		key = valf(di[key], key);
		if ((key === 'innerHTML' || key === 'textContent') && el[key] === value) return el;
	}
	return null;
}
async function clickOn(prop, val) {
	let elem = findElementBy(prop, val);
	//if (VERBOSE) console.log('elem', elem);
	elem.click();

}

async function pollAndShow() {

	if (DA.menu == 'games') {
		await showGamesAndTables();
	} else if (DA.menu == 'table') {

	}

}
function pollStart() {
	if (isdef(TO.poll)) return;
	TO.poll = setInterval(pollAndShow, DA.pollInterval);
}
async function pollStop() {
	clearInterval(TO.poll); if (VERBOSE) console.log('polling stopped', TO.poll);
	await mSleep(100);
	TO.poll = null; if (VERBOSE) console.log('interval reset!', TO.poll);
	await mSleep(400);
	if (VERBOSE) console.log('all clear');

}


async function MPollTables() {
	let files = await mGetFilenames('tables'); //if (VERBOSE) console.log('files', files);
	M.tableFilenames = files.map(x => x.split('.')[0]);
	M.tables = {};
	for (const f of M.tableFilenames) {
		let t = await loadStaticYaml(`y/tables/${f}.yaml`); //if (VERBOSE) console.log(t);
		M.tables[f] = t;
	}
	return M.tables;
}
async function DASaveState(state) {
	if (isdef(state)) DA.gameState = state;
	let res = await fetch(`${DA.backendURL}/save_state.php`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(DA.gameState)
	});
	let data = await res.json();
	if (VERBOSE) if (VERBOSE) console.log('Game state saved:', data, DA.gameState);

	return data;
}

async function showGamesAndTables(force = false) {
	function showGames(dParent) {
		mText(`<h2>games</h2>`, dParent, { maleft: 12 });
		let d = mDom(dParent, { fg: 'white' }, { id: 'game_menu' }); mCenterCenterFlex(d); //mFlexWrap(d);
		let gamelist = DA.gamelist;
		for (const gname of gamelist) {
			let g = MGetGame(gname);
			let bg = g.color;
			let d1 = mDom(d, { cursor: 'pointer', rounding: 10, margin: 10, padding: 0, patop: 10, w: 140, height: 100, bg, position: 'relative' }, { id: g.id });
			d1.setAttribute('gamename', gname);
			d1.onclick = onclickGameMenuItem;
			mCenterFlex(d1);
			let o = M.superdi[g.logo];
			let fg = colorIdealText(bg);
			let el = mDom(d1, { matop: 0, mabottom: 6, fz: 65, hline: 65, family: 'emoNoto', fg, display: 'inline-block' }, { html: o.text });
			mLinebreak(d1);
			mDom(d1, { fz: 18, align: 'center', fg }, { html: capitalize(g.friendly) });
		}
	}
	function showTables(dParent, tables, me) {
		mText(`<h2>tables</h2>`, dParent, { maleft: 12 });
		if (isEmpty(tables)) { mDom(dParent, { maleft: 12, fz: 24, fg: 'blue' }, { html: 'no active game tables' }); return; }
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
						let h1 = hFunc('leave', 'onclickTableLeave', ri.o.id); let c = mAppend(r, mCreate('td')); c.innerHTML = h1;
					}
				} else {
					let h1 = hFunc('join', 'onclickTableJoin', ri.o.id); let c = mAppend(r, mCreate('td')); c.innerHTML = h1;
				}
			}
			if (ri.o.owner != me) continue;
			let h = hFunc('delete', 'onclickTableDelete', id); let c = mAppend(r, mCreate('td')); c.innerHTML = h;
			if (ri.o.status == 'open') { let h1 = hFunc('start', 'onclickTableStart', id); let c1 = mAppend(r, mCreate('td')); c1.innerHTML = h1; }
		}
		return tables;
	}
	let dParent = mBy('dTableList');
	if (nundef(dParent)) { mClear('dMain'); dParent = mDom('dMain', {}, { className: 'section', id: 'dTableList' }); }
	await loadTables();
	let tables = dict2list(M.tables);
	let me = UGetName();
	tables.map(x => x.prior = x.status == 'open' ? 0 : x.turn.includes(me) ? 1 : x.playerNames.includes(me) ? 2 : 3);
	sortBy(tables, 'prior');
	tables.map(x => x.game_friendly = capitalize(MGetGameFriendly(x.game)));
	let changes = deepCompare(DA.tableList, tables);
	DA.tableList = tables;
	if (changes || force) {
		if (VERBOSE) console.log('force', force, 'changes', changes);
		mClear(dParent);
		showTables(dParent, tables, me);
		dParent = mBy('dGameList');
		if (isdef(dParent)) { mClear(dParent); }
		else { dParent = mDom('dMain', {}, { className: 'section', id: 'dGameList' }); }
		showGames(dParent);
	} else if (VERBOSE) console.log('games & tables: no changes', changes);
}
async function onclickHand() {
	await pollStop();
}
async function onclickDisplay() {
	await pollStart();
}

function getElementWithAttribute(key, val) {
	return document.querySelector(`[${key}="${val}"]`);
}
async function mKey(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let type = opts.prefer;
	let o = type != 'plain' ? lookup(M.superdi, [imgKey]) : null;
	let src;
	if (nundef(o) && imgKey.includes('.')) src = imgKey;
	else if (isdef(o) && (type == 'img' || type == 'photo') && isdef(o[type])) src = o[type];
	else if (isdef(o) && isdef(o.img)) src = o.img;
	if (isdef(src)) {
		//if (VERBOSE) console.log('have source!!!!', styles)
		let d0 = mDom(d, styles, opts);
		mCenterCenterFlex(d0);
		let [w, h] = mSizeSuccession(styles, 40);
		let imgStyles = { h }, imgOpts = { tag: 'img', src }
		// addKeys({ w, h }, styles); addKeys({ tag: 'img', src }, opts);
		let img = await mImgAsync(d0, imgStyles, imgOpts, roundIfTransparentCorner);
		return d0;
	} else if (isdef(o)) {
		if (nundef(type)) type = isdef(o.text) ? 'text' : isdef(o.fa6) ? 'fa6' : isdef(o.fa) ? 'fa' : isdef(o.ga) ? 'ga' : null;
		let family = type == 'text' ? 'emoNoto' : type == 'fa6' ? 'fa6' : type == 'fa' ? 'pictoFa' : 'pictoGame';
		let html = type == 'text' ? o.text : String.fromCharCode('0x' + o[type]);
		addKeys({ family }, styles);
		let d0 = mDom(d, styles, opts);
		mCenterCenterFlex(d0);
		let d1 = mDom(d0, {}, { html });
		let r = getRect(d1);
		[w, h] = [r.w, r.h];
		return d0;
	} else {
		//if (VERBOSE) console.log('styles',styles)
		addKeys({ html: imgKey }, opts)
		let img = mDom(d, styles, opts);
		return img;
	}
}
function hToggleClassMenu(ev) {
	let elem = findAncestorWith(ev.target, { attribute: 'menu' });
	if (mHasClass(elem, 'active')) return [elem, elem];
	let menu = elem.getAttribute('menu');
	let others = mBy(`[menu='${menu}']`, 'query').filter(x => x != elem);
	let prev = null;
	for (const o of others) {
		assertion(o != elem);
		if (mHasClass(o, 'active')) { prev = o; mClassRemove(o, 'active'); }
	}
	mClass(elem, 'active');
	return [prev, elem];
}

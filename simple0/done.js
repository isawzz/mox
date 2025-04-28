
function setColors(item) {
	let bg = item.color;
	let fg = item.fg ?? colorIdealText(bg); //console.log('item',item,'fg',fg)
	mStyle('dPage', { bg, fg });
	//mStyle('dOuterTop', { bg:colorTrans(bg,.8), fg  });
}

async function showMenuButtons() {
	let d = mBy('dTopLeft'); mClass(d, 'button_container'); //mFlex(d); // mStyle(d, { display: 'flex', vStretch: true, gap: 10, padding: 4, box: true }); //, box:true, vStretch:true, hCenter: true, padding: 10, gap: 10 }) //mClass(d,'flex')

	mDom(d, {}, { tag: 'button', html: 'games', onclick: switchToMenu, menu: 'top', key: 'games' });
	mDom(d, {}, { tag: 'button', html: 'table', onclick: switchToMenu, menu: 'top', key: 'table' });

	// let bStyles = { hPadding: 10, h: 25, wmin: 70, vPadding: 2, rounding: 10, cursor: 'pointer', className: 'hover', vCenter: true, display: 'flex', hCenter: true };
	// mDom(d, bStyles, { html: 'games', onclick: switchToMenu, menu: 'top', key: 'games' });
	// mDom(d, bStyles, { html: 'table', onclick: switchToMenu, menu: 'top', key: 'table' });
	//if (TESTING) await mKey('watch', d, bStyles, { onclick: onclickWatch, menu: 'top', key: 'watch' });

}
async function showTestButtons() {
	let d = mBy('dTestLeft'); mClass(d, 'button_container');
	//return;
	DA.pollStates = states = [{ color: 'green', blink: false, f: pollStart }, { color: 'red', blink: false, f: pollStop },];
	let b = DA.bPoll = mToggleColorButton(d, {}, { html: 'poll:' }, states);

	mDom(d, {}, { tag: 'button', html: 'delete', onclick: tablesDeleteAll });

	//console.log('b', b);
	pollStart();

}
async function switchToMenu(evOrMenu) {

	let ev = evOrMenu, menu = null;
	if (isString(evOrMenu)) {
		ev = { target: getElementWithAttribute('key', evOrMenu) };
		menu = evOrMenu;
	}
	let [prevElem, elem] = hToggleClassMenu(ev);
	// if (VERBOSE) console.log('switchToMenu', prevElem, elem);
	if (prevElem == elem) { if (VERBOSE) console.log('same!!!'); return; }
	else if (isdef(prevElem)) DA.pollIntervalChanged = true;
	//if (VERBOSE) console.log('different', prevElem, elem);

	menu = valf(menu, elem.getAttribute('key'), DA.menu, localStorage.getItem('menu'), 'games');

	//if (VERBOSE) console.log('menu',menu); 

	DA.pollCounter = 0;
	DA.menu = menu;
	switch (menu) {
		case 'games': await showGamesAndTables(true); DA.pollCounter = 0; DA.pollInterval = 3000; break;
		case 'table': await showTable(true); DA.pollCounter = 0; DA.pollInterval = 1500; break;
	}
	localStorage.setItem('menu', menu);
}
async function switchToUser(username) {
	if (!isEmpty(username)) username = normalizeString(username);
	if (isEmpty(username)) username = 'guest';
	let res = await mPhpPost('all', { username, action: 'login' });
	U = res.userdata;
	DA.tid = localStorage.getItem('tid');
	let bg = U.color;
	let fg = colorIdealText(bg);
	mClear('dTopRight');
	mDom('dTopRight', { display: 'inline', h: '80%', bg, fg }, { tag: 'button', html: `${username}` });
	localStorage.setItem('username', username);
	setTheme(U);
	// await forceUpdate();
}

function handleVisibilityChange() {
	if (nundef(DA.pollInterval)) { console.log('no polling'); return; }
	if (document.visibilityState === "hidden") {
		pollStop();
	} else {
		pollStart();
	}
}
async function pollAndShow() {
	if (isdef(DA.bPoll)) {
		// console.log('', DA.pollCounter++, 'POLLING!!!', DA.pollIntervalChanged,DA.pollInterval);
		DA.bPoll.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500 });
		//mStyle(DA.bPoll, { opacity: .5 }); await mSleep(100);
	}

	let restartAfterPoll = DA.pollIntervalChanged == true;
	if (DA.pollIntervalChanged) {
		await pollStop();
	}

	if (DA.menu == 'games') {
		await showGamesAndTables();
	} else if (DA.menu == 'table') {
		await showTable();
	}

	if (isdef(DA.bPoll)) DA.bPoll.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500 });

	if (restartAfterPoll) { pollStart(); }

}
function pollStart() {
	if (isdef(TO.poll)) return;
	DA.pollIntervalChanged = false;
	console.log('polling started', DA.pollInterval);
	TO.poll = setInterval(pollAndShow, DA.pollInterval);
}
async function pollStop() {
	if (!TO.poll) return;
	clearInterval(TO.poll); if (VERBOSE) console.log('polling stopped', TO.poll);
	DA.pollIntervalChanged = false;
	await mSleep(100);
	TO.poll = null; // if (VERBOSE) console.log('interval reset!', TO.poll);
	await mSleep(400);
	// if (VERBOSE) console.log('all clear');

}

function onclickBlinker(ev, states) {
	let button = ev.target; //evToAttr('state');
	let ch = arrChildren(button)
	// console.log('button', button, '\nchildren', ch, '\nstates', states);
	let elem = ch.find(x => x.hasAttribute('state'));
	// console.log('elem', elem);
	let attr = elem.getAttribute('state');
	// console.log('attr', attr);
	let i = 0;//nundef(attr)?0:(Number(attr)+1) % states.length;
	if (!isNumber(attr)) i = 0; else i = (Number(attr) + 1) % states.length;

	// console.log('i', i);
	let state = states[i];
	// console.log('state', state);
	elem.setAttribute('state', i);

	mStyle(elem, { bg: state.color });
	if (state.blink) mClass(elem, 'blink'); else mClassRemove(elem, 'blink');
	if (isdef(state.f)) state.f();
}
function mToggleColorButton(dParent, styles = {}, opts = {}, states) {
	addKeys({ tag: 'button' }, opts);

	let b = mDom(dParent, styles, opts); mFlex(b, false, 'space-between', 'baseline', true);

	let sz = 16;
	let c = mDom(b, { w: sz, h: sz, round: true, bg: 'blue', position: 'relative', top: 2, left: 3 }, { state: null });
	//mClass(c, 'blink');

	if (nundef(states)) states = [{ color: 'green', blink: false, f: () => console.log('callback!') }, { color: 'red', blink: true, f: () => console.log('callback!') }];

	b.onclick = ev => onclickBlinker(ev, states);
	return b;
}
async function DAInit(TESTING = false) {
	document.addEventListener("visibilitychange", handleVisibilityChange);

	DA.pollInterval = 3000;
	DA.pollCounter = 0;
	DA.backendURL = getServer(true) + 'simple0/php'; //'https://moxito.online/mox/simple0/php';
	//if (VERBOSE) console.log('backendURL', DA.backendURL);

	DA.gamelist = ['setgame', 'button96']; //'accuse aristo bluff ferro fishgame fritz huti lacuna nations setgame sheriff spotit wise'; if (DA.TEST0) gamelist += ' a_game'; gamelist = toWords(gamelist);
	DA.funcs = { setgame: setgame(), button96: button96() }; //implemented games!
	for (const gname in DA.gamelist) {
		if (isdef(DA.funcs[gname])) continue;
		DA.funcs[gname] = defaultGameFunc();
	}
	DA.evList = [];
	await loadAssetsStatic();
	M.tables = await MPollTables();
	//if (VERBOSE) console.log('M', M);

	let elems = mLayoutTM('dPage'); mStyle('dMain', { overy: 'auto', fg: 'inherit' }); mCenterFlex('dMain');
	mLayoutTopTestExtraMessageTitle('dTop');
	let username = localStorage.getItem('username') ?? 'hans';
	if (TESTING) {
		let names = ['amanda', 'felix', 'lauren', 'mimi', 'gul'];
		let d = mBy('dTestRight'); mClass(d, 'button_container'); //mFlex(d);
		for (const name of names) { let b = mDom(d, {}, { tag: 'button', html: name, onclick: async (ev) => await switchToUser(name) }); }
		username = rChoose(names); //['felix','lauren','diana','mimi','amanda','guest','gul']); //localStorage.getItem('username') ?? 'hans'; 
	}
	await showMenuButtons();
	if (TESTING) await showTestButtons();
}
async function showTable(force = false) {
	function updateUI() {
		const area = mBy('dMain');
		area.innerHTML = '<pre>' + JSON.stringify(DA.gameState, null, 2) + '</pre>';
		if (VERBOSE) console.log("table UPDATED!!!"); //, DA.gameState);
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
		//if (VERBOSE) if (VERBOSE) console.log('Game state updated:', state);
	} else if (VERBOSE) console.log("table no change");

	return DA.gameState;

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
	let elem = null;
	if (isDict(prop) && isdef(prop.tag)) elem = prop; else elem = findElementBy(prop, val);
	//if (VERBOSE) console.log('elem', elem);
	assertion(elem, `NO elem ${prop} ${val}`);
	elem.click();

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
	M.tables = await MPollTables();
	let tables = dict2list(M.tables);
	let me = UGetName();
	tables.map(x => x.prior = x.status == 'open' ? 0 : x.turn.includes(me) ? 1 : x.playerNames.includes(me) ? 2 : 3);
	sortBy(tables, 'prior');
	tables.map(x => x.game_friendly = capitalize(MGetGameFriendly(x.game)));
	let changes = deepCompare(DA.tableList, tables);
	DA.tableList = tables;
	if (changes || force) {
		//if (VERBOSE) console.log('force', force, 'changes', changes);
		mClear(dParent);
		showTables(dParent, tables, me);
		dParent = mBy('dGameList');
		if (isdef(dParent)) { mClear(dParent); }
		else { dParent = mDom('dMain', {}, { className: 'section', id: 'dGameList' }); }
		showGames(dParent);
		if (VERBOSE) console.log('games & tables: UPDATED!!!');
	} else if (VERBOSE) console.log('games & tables: no change');
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

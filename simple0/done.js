async function onclickTest(ev) {
  let [prevElem, elem] = hToggleClassMenu(ev);
  if (prevElem == elem) { console.log('same!!!'); return; }
  console.log('different', prevElem, elem);

  await switchToMenu(elem.getAttribute('key'));

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
  clearInterval(TO.poll); console.log('polling stopped', TO.poll);
  await mSleep(100);
  TO.poll = null; console.log('interval reset!', TO.poll);
  await mSleep(400);
  console.log('all clear');

}

async function DAInit(isTest = false) {
	if (isTest) VERBOSE = true;
	DA.backendURL = getServer(true) + 'simple0/php'; //'https://moxito.online/mox/simple0/php';
	if (VERBOSE) console.log('backendURL', DA.backendURL);
	DA.gamelist = ['setgame', 'button96']; //'accuse aristo bluff ferro fishgame fritz huti lacuna nations setgame sheriff spotit wise'; if (DA.TEST0) gamelist += ' a_game'; gamelist = toWords(gamelist);
	DA.funcs = { setgame: setgame(), button96: button96() }; //implemented games!
	for (const gname in DA.gamelist) {
		if (isdef(DA.funcs[gname])) continue;
		DA.funcs[gname] = defaultGameFunc();
	}
	DA.evList = [];
	await loadAssetsStatic();
	await loadTables();
	if (VERBOSE) console.log('M', M);

	let elems = mLayoutTM('dPage'); mStyle('dMain', { overy: 'auto' }); mCenterFlex('dMain');
	mLayoutTopTestExtraMessageTitle('dTop');





}

async function switchToUser(username) {
	if (!isEmpty(username)) username = normalizeString(username);
	if (isEmpty(username)) username = 'guest';
	let res = await mPhpPost('all', { username, action: 'login' });
	U = res.userdata;
	DA.tid = localStorage.getItem('tid');
	let bg = U.color;
	let fg = U.fg ?? colorIdealText(bg);
	mStyle('dTopRight', { className: 'button', display: 'inline', h: '80%', bg, fg }, { html: `${username}` });
	localStorage.setItem('username', username);
	setTheme(U);
	// await forceUpdate();
}
async function showTable() {
	function updateUI() {
		const area = mBy('dMain');
		area.innerHTML = '<pre>' + JSON.stringify(DA.gameState, null, 2) + '</pre>';
		console.log("UI updated:", DA.gameState);
	}

	let res = await fetch(`${DA.backendURL}/get_state.php`);
	if (!res.ok) {
		console.error('Error fetching game state:', res.statusText);
		return null;
	} //else { res = await res.text(); console.log(res) }
	let state = await res.json();
	if (JSON.stringify(state) !== JSON.stringify(DA.gameState)) {
		DA.gameState = state;
		updateUI();
		if (VERBOSE) console.log('Game state updated:', state);
	}
	return DA.gameState;

}
async function MPollTables() {
	let files = await mGetFilenames('tables'); //console.log('files', files);
	M.tableFilenames = files.map(x => x.split('.')[0]);
	M.tables = {};
	for (const f of M.tableFilenames) {
		let t = await loadStaticYaml(`y/tables/${f}.yaml`); //console.log(t);
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
	if (VERBOSE) console.log('Game state saved:', data, DA.gameState);

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
		console.log('force',force,'changes', changes);
		mClear(dParent);
		showTables(dParent, tables, me);
		dParent = mBy('dGameList');
		if (isdef(dParent)) { mClear(dParent); }
		else { dParent = mDom('dMain', {}, { className: 'section', id: 'dGameList' }); }
		showGames(dParent);
	} else console.log('games & tables: no changes', changes);
}
async function showMenuButtons() {
	let d = mBy('dTopLeft'); mStyle(d, { display: 'flex', vStretch: true, gap: 10, padding: 10, box: true }); //, box:true, vStretch:true, hCenter: true, padding: 10, gap: 10 }) //mClass(d,'flex')

	let bStyles = { hPadding: 10, h: 25, wmin: 70, vPadding: 6, rounding: 10, cursor: 'pointer', className: 'hover', vCenter: true, display: 'flex', hCenter: true };
	mDom(d, bStyles, { html: 'games', onclick: onclickTest, menu: 'top', key: 'games' });
	mDom(d, bStyles, { html: 'table', onclick: onclickTest, menu: 'top', key: 'table' });
	let b = await mKey('watch', d, bStyles, { onclick: onclickTest, menu: 'top', key: 'watch' });

}
async function showTestButtons() {
	let d = mBy('dTestLeft');
	let styles = { rounding: 6, maleft: 10, h: 24, bg: 'dimgray', fg: 'white', padding: 5 };
	let label = 'polling:';
	DA.dControlUiState = await mToggleButton(d, styles, { label, key: 'hand', onclick: onclickHand }, { label, key: 'display', onclick: onclickDisplay })

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
    //console.log('have source!!!!', styles)
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
    //console.log('styles',styles)
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

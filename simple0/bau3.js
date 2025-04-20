
async function showGamesAndTables() {
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
	if (changes) {
		console.log('changes', changes)
		mClear(dParent);
		showTables(dParent, tables, me);
	} else console.log('tables: no changes', changes);
	dParent = mBy('dGameList');
	if (isdef(dParent)) { mClear(dParent); }
	else { dParent = mDom('dMain', {}, { className: 'section', id: 'dGameList' }); }
	showGames(dParent);
}
async function showMenuButtons(){
	let d = mBy('dTopLeft'); mStyle(d, { display:'flex',vStretch:true,gap:10,padding:10,box:true }); //, box:true, vStretch:true, hCenter: true, padding: 10, gap: 10 }) //mClass(d,'flex')

	let bStyles = { hPadding:10, h:25, wmin:70,vPadding:6,rounding:10, cursor:'pointer',className:'hover', vCenter:true, display:'flex',hCenter:true };
	mDom(d, bStyles, { html: 'games', onclick: onclickTest, menu: 'top', key:'games' });
	mDom(d, bStyles, { html: 'table', onclick: onclickTest, menu: 'top', key:'table' });
	// mDom(d, bStyles, { html: 'Lop', onclick: onclickTest, menu: 'top' });
	// mDom(d, bStyles, { html: 'Miq', onclick: onclickTest, menu: 'top' });
	let b=await mKey('watch', d, bStyles, { onclick: onclickTest, menu: 'top', key:'watch' }); 

}
async function showTestButtons(){
	let d=mBy('dTestLeft');
	let styles = { rounding: 6, maleft: 10, h: 24, bg: 'dimgray', fg: 'white', padding: 5 };
	let label = 'polling:';
	DA.dControlUiState = await mToggleButton(d, styles, { label, key: 'hand', onclick: onclickHand }, { label, key: 'display', onclick: onclickDisplay })

}
async function onclickHand(){
	await pollStop();
}
async function onclickDisplay(){
	await pollStart();
}

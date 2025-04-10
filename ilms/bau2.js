
async function showGamesAndTables() {
	async function showGames(dParent) {
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
	async function showTables(dParent, tables, me) {
		mText(`<h2>tables</h2>`, dParent, { maleft: 12 })
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
	if (isEmpty(tables)) { mText('no active game tables', dParent); }
	else {
		let me = UGetName();
		tables.map(x => x.prior = x.status == 'open' ? 0 : x.turn.includes(me) ? 1 : x.playerNames.includes(me) ? 2 : 3);
		sortBy(tables, 'prior');
		tables.map(x => x.game_friendly = capitalize(MGetGameFriendly(x.game)));
		let changes = deepCompare(DA.tableList, tables);
		DA.tableList = tables;

		if (changes) {
			console.log('changes', changes)
			mClear(dParent);
			await showTables(dParent, tables, me);
		} else console.log('tables: no changes', changes);
	}

	dParent = mBy('dGameList');
	if (isdef(dParent)) { mClear(dParent); }
	else { dParent = mDom('dMain', {}, { className: 'section', id: 'dGameList' }); }
	await showGames(dParent);
}
async function showTable(id) {
	let me = UGetName();
	let tid = valf(id, DA.tid);
	if (nundef(tid)) tid = valf(localStorage.getItem('tid'), arrLast(Object.keys(M.tables)));
	if (nundef(tid)) { return await showGamesAndTables(); }
	DA.tid = tid;
	let tData = await loadStaticYaml(`y/tables/${tid}.yaml`);
	if (!tData) { showMessage('table deleted!'); return await showGamesAndTables(); }
	let changes = deepCompare(M.tables[tid], tData);
	if (!changes) { return console.log('no changes', changes, tid); }
	console.log('changes', changes);
	M.tables[tid] = DA.tData = tData;
	// tablePresent(tData);
	let func = DA.funcs[tData.game];
	T = tData;
	clearMain();
	mClassRemove('dExtra', 'p10hide');
	showTitleGame(tData);
	if (func.hasInstruction) prepInstruction(tData);
	func.prepLayout(tData);
	let items = [];//func.present(tData);
	await func.stats(tData);
	if (tData.status == 'over') { showGameover(tData, 'dTitle'); return; }
	assertion(tData.status == 'started', `showTable status ERROR ${tData.status}`);
	// await updateTestButtonsLogin(table.playerNames);
	func.activate(tData, items);
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
function mTable(dParent, headers, showheaders, styles = { mabottom: 0 }, className = 'table') {
	let d = mDom(dParent);
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
function mCreate(tag, styles, id) { let d = document.createElement(tag); if (isdef(id)) d.id = id; if (isdef(styles)) mStyle(d, styles); return d; }
function mCreateFrom(htmlString) {
	var div = document.createElement('div');
	div.innerHTML = htmlString.trim();
	return div.firstChild;
}
function hFunc(content, funcname, arg1, arg2, arg3) {
	let html = `<a style='color:blue' href="javascript:${funcname}('${arg1}','${arg2}','${arg3}');">${content}</a>`;
	return html;
}
function getWaitingHtml(sz = 30) { return `<img src="../assets/icons/active_player.gif" height="${sz}" style="margin:0px ${sz / 3}px" />`; }
function jsCopyExceptKeys(o, keys = []) {
  if (!isDict(o)) return jsCopy(o);
  let onew = {};
  for (const k in o) { if (keys.includes(k)) continue; onew[k] = o[k]; }
  return JSON.parse(JSON.stringify(onew));
}
function formatLegend(key) {
  return key.includes('per') ? stringBefore(key, '_') + '/' + stringAfterLast(key, '_')
    : key.includes('_') ? replaceAll(key, '_', ' ') : key;
}
function deckDeal(deck, n) { return deck.splice(0, n); }



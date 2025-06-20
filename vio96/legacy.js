
//#region orig game menu ... (WORKS!)
async function onclickClearPlayers() {
  let me = UGetName();
  DA.playerList = [me];
  for (const name in DA.allPlayers) {
    if (name != me) unselectPlayerItem(DA.allPlayers[name]);
  }
  assertion(!isEmpty(DA.playerList), "uname removed from playerList!!!!!!!!!!!!!!!")
  DA.lastName = me;
  mRemoveIfExists('dPlayerOptions')
}
async function saveAndUpdatePlayerOptions(allPl, gamename) {
  let name = allPl.name;
  let poss = MGetGamePlayerOptionsAsDict(gamename);
  if (nundef(poss)) return;
  let opts = {};
  for (const p in poss) { allPl[p] = getRadioValue(p); if (p != 'playmode') opts[p] = allPl[p]; }
  let id = 'dPlayerOptions'; mRemoveIfExists(id); //dont need UI anymore
  let oldOpts = valf(MGetUserOptionsForGame(name, gamename), {});
  let changed = false;
  for (const p in poss) {
    if (p == 'playmode') continue;
    if (oldOpts[p] != opts[p]) { console.log('change:', p, oldOpts[p], opts[p]); changed = true; break; }
  }
  if (changed) {
    let games = valf(MGetUser(name).games, {});
    games[gamename] = opts;
    let res = await postUsers();
  }
}
async function saveDataFromPlayerOptionsUI(gamename) {
  let id = 'dPlayerOptions';
  let lastAllPl = DA.lastAllPlayerItem;
  let dold = mBy(id);
  if (isdef(dold)) { await saveAndUpdatePlayerOptions(lastAllPl, gamename); dold.remove(); }
}
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
  let poss = MGetGamePlayerOptions(gamename);
  if (nundef(poss)) return;
  let dParent = mBy('dGameMenu');
  let bg = MGetUserColor(name);
  let rounding = 6;
  let d1 = mDom(dParent, { bg: colorLight(bg, 50), border: `solid 2px ${bg}`, rounding, display: 'inline-block', hPadding: 3, rounding }, { id });
  mDom(d1, {}, { html: `${name}` }); //title
  d = mDom(d1, {}); mCenterFlex(d);
  mCenterCenter(d);
  for (const p in poss) {
    let key = p;
    let val = poss[p];
    if (isString(val)) {
      let list = val.split(',');
      let legend = formatLegend(key);
      let fs = mRadioGroup(d, { fg: 'black' }, `d_${key}`, legend);
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
    if (name == UGetName()) continue;
    lookupSetOverride(DA.allPlayers, [name, 'playmode'], 'bot');
    updateUserImageToBotHuman(name, 'bot');
  }
  let popup = mBy('dPlayerOptions');
  if (isdef(popup) && popup.firstChild.innerHTML.includes(UGetName())) return;
  setRadioValue('playmode', 'bot');
}
async function showGamesAndTables(force = false) {
  function showGames(dParent) {
    mText(`<h2>games</h2>`, dParent, { maleft: 12 });
    let d = mDom(dParent, { fg: 'white' }, { id: 'game_menu' }); mCenterCenterFlex(d); //mFlexWrap(d);
    let gamelist = DA.gamelist;
    for (const gname of gamelist) {
      let g = MGetGame(gname); console.log(gname, g);
      let bg = g.color;
      let d1 = mDom(d, { cursor: 'pointer', rounding: 10, margin: 10, padding: 10, patop: 10, w: 140, height: 100, bg, position: 'relative' }, { id: g.id });
      d1.setAttribute('gamename', gname);
      d1.onclick = onclickGameMenuItem;
      mCenterFlex(d1);
      let o = M.superdi[g.logo];
      let fg = colorIdealText(bg);
      let el = mDom(d1, { matop: 0, mabottom: 6, fz: 65, hline: 65, family: 'emoNoto', fg, display: 'inline-block' }, { html: o.emo });
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
  console.log(dParent)
  M.tables = await MPollTables();
  let tables = dict2list(M.tables);
  let me = UGetName();
  tables.map(x => x.prior = x.status == 'open' ? 0 : x.turn.includes(me) ? 1 : x.playerNames.includes(me) ? 2 : 3);
  sortBy(tables, 'prior');
  tables.map(x => x.game_friendly = capitalize(MGetGameFriendly(x.game)));
  let changes = deepCompare(DA.tableList, tables);
  DA.tableList = tables;
  if (changes || force) {
    mClear(dParent);
    showTables(dParent, tables, me);
    dParent = mBy('dGameList');
    if (isdef(dParent)) { mClear(dParent); }
    else { dParent = mDom('dMain', {}, { className: 'section', id: 'dGameList' }); }
    showGames(dParent);
    if (VERBOSE) console.log('games & tables: UPDATED!!!');
  } else if (VERBOSE) console.log('games & tables: no change');
}


//#endregion

//#region game and player menus

//v2
function showGames(dParent) {
	mText(`<h2>games</h2>`, dParent, { maleft: 12 });
	let gameMenu = mDom(dParent, { fg: 'white' }, { id: 'game_menu' });
	mCenterCenterFlex(gameMenu);
	for (const gname of DA.gamelist) {
		let g = MGetGame(gname), bg = g.color, fg = colorIdealText(bg);
		let card = mDom(gameMenu, { cursor: 'pointer', rounding: 10, margin: 10, padding: 10, patop: 10, w: 140, height: 100, bg, position: 'relative' }, { id: g.id });
		card.setAttribute('gamename', gname);
		card.onclick = onclickGameMenuItem;
		mCenterFlex(card);
		mDom(card, { matop: 0, mabottom: 6, fz: 65, hline: 65, family: 'emoNoto', fg, display: 'inline-block' }, { html: M.superdi[g.logo].emo });
		mLinebreak(card);
		mDom(card, { fz: 18, align: 'center', fg }, { html: capitalize(g.friendly) });
	}
}

async function showGamesAndTables(force = false) {
	let dTableList = mBy('dTableList') || mDom('dMain', {}, { className: 'section', id: 'dTableList' });
	M.tables = await MPollTables();
	let tables = dict2list(M.tables), me = UGetName();
	tables.map(x => {
		x.prior = x.status == 'open' ? 0 : x.turn.includes(me) ? 1 : x.playerNames.includes(me) ? 2 : 3;
		x.game_friendly = capitalize(MGetGameFriendly(x.game));
	});
	sortBy(tables, 'prior');
	let changes = deepCompare(DA.tableList, tables);
	DA.tableList = tables;
	if (!changes && !force) return;
	mClear(dTableList);
	showTables(dTableList, tables, me);
	let dGameList = mBy('dGameList') || mDom('dMain', {}, { className: 'section', id: 'dGameList' });
	mClear(dGameList);
	showGames(dGameList);
}


function showTables(dParent, tables, me) {
	mText(`<h2>tables</h2>`, dParent, { maleft: 12 });
	if (isEmpty(tables)) return mDom(dParent, { maleft: 12, fz: 24, fg: 'blue' }, { html: 'no active game tables' });
	let t = UI.tables = mDataTable(tables, dParent, null, ['friendly', 'game_friendly', 'playerNames'], 'tables', false);
	mTableCommandify(t.rowitems.filter(ri => ri.o.status != 'open'), {
		0: (item, val) => hFunc(val, 'onclickTable', item.o.id, item.id),
	});
	mTableStylify(t.rowitems.filter(ri => ri.o.status == 'open'), { 0: { fg: 'blue' } });
	for (const ri of t.rowitems) {
		let r = iDiv(ri), id = ri.o.id, status = ri.o.status, owner = ri.o.owner, playerNames = ri.o.playerNames;
		if (ri.o.prior == 1) mDom(r, {}, { tag: 'td', html: getWaitingHtml(24) });
		if (status == 'open') {
			if (playerNames.includes(me)) {
				if (owner != me) mAppend(r, mCreate('td')).innerHTML = hFunc('leave', 'onclickTableLeave', id);
			} else mAppend(r, mCreate('td')).innerHTML = hFunc('join', 'onclickTableJoin', id);
		}
		if (owner == me) {
			mAppend(r, mCreate('td')).innerHTML = hFunc('delete', 'onclickTableDelete', id);
			if (status == 'open') mAppend(r, mCreate('td')).innerHTML = hFunc('start', 'onclickTableStart', id);
		}
	}
}

async function setPlayerPlaying(allPlItem, gamename) {
	let name = allPlItem.name;
	addIf(DA.playerList, name);
	highlightPlayerItem(allPlItem);
	await saveDataFromPlayerOptionsUI(gamename);

	DA.lastAllPlayerItem = allPlItem;
	let poss = MGetGamePlayerOptions(gamename);
	if (!poss) return;

	let dParent = mBy('dGameMenu');
	let bg = MGetUserColor(name);
	let d1 = mDom(dParent, {
		bg: colorLight(bg, 50),
		border: `solid 2px ${bg}`,
		rounding: 6,
		display: 'inline-block',
		hPadding: 3
	}, { id: 'dPlayerOptions' });

	mDom(d1, {}, { html: name });
	let d = mDom(d1);
	mCenterFlex(d);

	for (const [key, val] of Object.entries(poss)) {
		if (!isString(val)) continue;
		let list = val.split(',');
		let fs = mRadioGroup(d, { fg: 'black' }, `d_${key}`, formatLegend(key));
		let handler = key == 'playmode' ? () => updateUserImageToBotHuman(name) : null;

		for (const v of list) {
			let val = isNumber(v) ? Number(v) : v;
			mRadio(v, val, key, fs, { cursor: 'pointer' }, handler, key, false);
		}

		let userval = lookup(DA.allPlayers, [name, key]);
		for (const ch of fs.children) {
			if (!ch.id) continue;
			let rval = stringAfterLast(ch.id, '_');
			if (isNumber(rval)) rval = Number(rval);
			ch.firstChild.checked = userval == rval || (nundef(userval) && `${rval}` == arrLast(list));
		}
		measureFieldset(fs);
	}

	let [r, rp] = [getRectInt(allPlItem.div, dParent), getRectInt(d1)];
	let x = Math.min(Math.max(r.x - rp.w / 2 + r.w / 2, 0), window.innerWidth - rp.w - 100);
	mIfNotRelative(dParent);
	mPos(d1, x, r.y - rp.h - 4);
	mButtonX(d1, ev => saveAndUpdatePlayerOptions(allPlItem, gamename), 20, 0, 'dimgray');

	const handleClickOutside = ev => {
		if (mBy('dMenuPlayers').contains(ev.target)) return;
		saveAndUpdatePlayerOptions(allPlItem, gamename);
		document.removeEventListener('click', handleClickOutside);
		document.removeEventListener('keydown', handleEscape);
	};

	const handleEscape = ev => {
		if (ev.key === 'Escape') {
			saveAndUpdatePlayerOptions(allPlItem, gamename);
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		}
	};

	setTimeout(() => {
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleEscape);
	}, 0);
}

//v1
async function showGamesAndTables(force = false) {
  // Get/create parent containers
  let dTableList = mBy('dTableList') || mDom('dMain', {}, { className: 'section', id: 'dTableList' });

  // Get fresh table data
  M.tables = await MPollTables();
  let tables = dict2list(M.tables);
  let me = UGetName();

  // Process table data
  tables.map(x => {
    x.prior = x.status == 'open' ? 0 : x.turn.includes(me) ? 1 : x.playerNames.includes(me) ? 2 : 3;
    x.game_friendly = capitalize(MGetGameFriendly(x.game));
  });
  sortBy(tables, 'prior');

  // Check for changes
  let changes = deepCompare(DA.tableList, tables);
  DA.tableList = tables;

  if (!changes && !force) {
    if (VERBOSE) console.log('games & tables: no change');
    return;
  }

  // Update display
  mClear(dTableList);
  showTables(dTableList, tables, me);

  let dGameList = mBy('dGameList') || mDom('dMain', {}, { className: 'section', id: 'dGameList' });
  mClear(dGameList);
  showGames(dGameList);

  if (VERBOSE) console.log('games & tables: UPDATED!!!');
}

function showGames(dParent) {
  // Add header
  mText(`<h2>games</h2>`, dParent, { maleft: 12 });

  // Create games container
  let gameMenu = mDom(dParent, { fg: 'white' }, { id: 'game_menu' });
  mCenterCenterFlex(gameMenu);

  // Create game cards
  for (const gname of DA.gamelist) {
    let g = MGetGame(gname);
    let bg = g.color;
    let fg = colorIdealText(bg);

    // Create card container
    let card = mDom(gameMenu, {
      cursor: 'pointer',
      rounding: 10,
      margin: 10,
      padding: 10,
      patop: 10,
      w: 140,
      height: 100,
      bg,
      position: 'relative'
    }, { id: g.id });

    // Add game info
    card.setAttribute('gamename', gname);
    card.onclick = onclickGameMenuItem;
    mCenterFlex(card);

    // Add logo
    mDom(card, {
      matop: 0,
      mabottom: 6,
      fz: 65,
      hline: 65,
      family: 'emoNoto',
      fg,
      display: 'inline-block'
    }, { html: M.superdi[g.logo].emo });

    mLinebreak(card);

    // Add title
    mDom(card, { fz: 18, align: 'center', fg }, { html: capitalize(g.friendly) });
  }
}

function showTables(dParent, tables, me) {
  // Add header
  mText(`<h2>tables</h2>`, dParent, { maleft: 12 });

  // Handle empty tables
  if (isEmpty(tables)) {
    mDom(dParent, { maleft: 12, fz: 24, fg: 'blue' }, { html: 'no active game tables' });
    return;
  }

  // Create table
  let t = UI.tables = mDataTable(tables, dParent, null, 
    ['friendly', 'game_friendly', 'playerNames'], 'tables', false);

  // Style closed and open tables differently
  mTableCommandify(t.rowitems.filter(ri => ri.o.status != 'open'), {
    0: (item, val) => hFunc(val, 'onclickTable', item.o.id, item.id),
  });
  mTableStylify(t.rowitems.filter(ri => ri.o.status == 'open'), { 0: { fg: 'blue' } });

  // Add action buttons to each row
  for (const ri of t.rowitems) {
    let r = iDiv(ri);
    let id = ri.o.id;
    let status = ri.o.status;
    let owner = ri.o.owner;
    let playerNames = ri.o.playerNames;

    // Add waiting indicator
    if (ri.o.prior == 1) {
      mDom(r, {}, { tag: 'td', html: getWaitingHtml(24) });
    }

    // Add join/leave buttons for open tables
    if (status == 'open') {
      if (playerNames.includes(me)) {
        if (owner != me) {
          mAppend(r, mCreate('td')).innerHTML = hFunc('leave', 'onclickTableLeave', id);
        }
      } else {
        mAppend(r, mCreate('td')).innerHTML = hFunc('join', 'onclickTableJoin', id);
      }
    }

    // Add owner controls
    if (owner == me) {
      mAppend(r, mCreate('td')).innerHTML = hFunc('delete', 'onclickTableDelete', id);
      if (status == 'open') {
        mAppend(r, mCreate('td')).innerHTML = hFunc('start', 'onclickTableStart', id);
      }
    }
  }
}



//v0

  function showGames(dParent) {
    mText(`<h2>games</h2>`, dParent, { maleft: 12 });
    let d = mDom(dParent, { fg: 'white' }, { id: 'game_menu' }); mCenterCenterFlex(d); //mFlexWrap(d);
    let gamelist = DA.gamelist;
    for (const gname of gamelist) {
      let g = MGetGame(gname); 
      let bg = g.color;
      let d1 = mDom(d, { cursor: 'pointer', rounding: 10, margin: 10, padding: 10, patop: 10, w: 140, height: 100, bg, position: 'relative' }, { id: g.id });
      d1.setAttribute('gamename', gname);
      d1.onclick = onclickGameMenuItem;
      mCenterFlex(d1);
      let o = M.superdi[g.logo];
      let fg = colorIdealText(bg);
      let el = mDom(d1, { matop: 0, mabottom: 6, fz: 65, hline: 65, family: 'emoNoto', fg, display: 'inline-block' }, { html: o.emo });
      mLinebreak(d1);
      mDom(d1, { fz: 18, align: 'center', fg }, { html: capitalize(g.friendly) });
    }
  }
async function showGamesAndTables(force = false) {
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
	//return;
  console.log(dParent)
  M.tables = await MPollTables();
  let tables = dict2list(M.tables);
  let me = UGetName();
  tables.map(x => x.prior = x.status == 'open' ? 0 : x.turn.includes(me) ? 1 : x.playerNames.includes(me) ? 2 : 3);
  sortBy(tables, 'prior');
  tables.map(x => x.game_friendly = capitalize(MGetGameFriendly(x.game)));
  let changes = deepCompare(DA.tableList, tables);
  DA.tableList = tables;
  if (changes || force) {
    mClear(dParent);
    showTables(dParent, tables, me);
    dParent = mBy('dGameList');
    if (isdef(dParent)) { mClear(dParent); }
    else { dParent = mDom('dMain', {}, { className: 'section', id: 'dGameList' }); }
    showGames(dParent);
    if (VERBOSE) console.log('games & tables: UPDATED!!!');
  } else if (VERBOSE) console.log('games & tables: no change');
}
async function setPlayerPlaying(allPlItem, gamename) {
  let [name, da] = [allPlItem.name, allPlItem.div];
  addIf(DA.playerList, name);
  highlightPlayerItem(allPlItem);
  await saveDataFromPlayerOptionsUI(gamename);
  let id = 'dPlayerOptions';
  DA.lastAllPlayerItem = allPlItem;
  let poss = MGetGamePlayerOptions(gamename);
  if (nundef(poss)) return;
  let dParent = mBy('dGameMenu');
  let bg = MGetUserColor(name);
  let rounding = 6;
  let d1 = mDom(dParent, { bg: colorLight(bg, 50), border: `solid 2px ${bg}`, rounding, display: 'inline-block', hPadding: 3, rounding }, { id });
  mDom(d1, {}, { html: `${name}` }); //title
  d = mDom(d1, {}); mCenterFlex(d);
  mCenterCenter(d);
  for (const p in poss) {
    let key = p;
    let val = poss[p];
    if (isString(val)) {
      let list = val.split(',');
      let legend = formatLegend(key);
      let fs = mRadioGroup(d, { fg: 'black' }, `d_${key}`, legend);
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
  mButtonX(d1, ev => saveAndUpdatePlayerOptions(allPlItem, gamename), 20, 0, 'dimgray');
}



//#endregion
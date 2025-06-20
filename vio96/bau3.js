

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
function sectionTitle(dParent, title) {
  mText(title, dParent, { fz:'150%',weight:'bold',margin: 12, matop:0 });
}
async function setPlayerNotPlaying(item, gamename) {
  await saveDataFromPlayerOptionsUI(gamename);
  removeInPlace(DA.playerList, item.name);
  mRemoveIfExists('dPlayerOptions');
  unselectPlayerItem(item);
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
  let d1 = mDom(dParent, { bg: colorLight(bg, 50), border: `solid 2px ${bg}`, rounding: 6, display: 'inline-block', hPadding: 3 }, { id: 'dPlayerOptions' });
  mDom(d1, {maleft:5,matop:-2}, { html: name });
  let d = mDom(d1);
  mCenterFlex(d);
  // Create radio groups without adding click handlers initially
  for (const [key, val] of Object.entries(poss)) {
    if (!isString(val)) continue;
    let list = val.split(',');
    let fs = mRadioGroup(d, { fg: 'black' }, `d_${key}`, formatLegend(key));

    for (const v of list) {
      let val = isNumber(v) ? Number(v) : v;
      let radio = mRadio(v, val, key, fs, { cursor: 'pointer' }, null, key, false);

      // Use onchange instead of onclick
      radio.firstChild.onchange = () => {
        lookupSetOverride(DA.allPlayers, [name, key], val);
        if (key === 'playmode') updateUserImageToBotHuman(name);
      };
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

  const cleanup = () => {
    document.removeEventListener('mousedown', handleClickOutside);
    document.removeEventListener('keydown', handleEscape);
  };

  const saveAndClose = () => {
    saveAndUpdatePlayerOptions(allPlItem, gamename);
    cleanup();
    d1.remove();
  };

  const handleClickOutside = ev => {
    if (ev.target.closest('#dMenuPlayers') || ev.target.closest('#dPlayerOptions')) return;
    saveAndClose();
  };

  const handleEscape = ev => {
    if (ev.key === 'Escape') saveAndClose();
  };

  // Use mousedown instead of click to prevent interference with radio clicks
  setTimeout(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
  }, 0);

  mButtonX(d1, saveAndClose, 18, 2, 'dimgray');
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
function showGames(dParent) {
  sectionTitle(dParent, 'games');
  let gameMenu = createCardContainer(dParent, {}, 'game_menu');
  for (const gname of DA.gamelist) {
    let g = MGetGame(gname);
    g.name = gname;
    createGameCard(gameMenu, g);
  }
}
function showTables(dParent, tables, me) {
  sectionTitle(dParent, 'tables');
  if (isEmpty(tables)) return mDom(dParent, { maleft: 12, fg: 'blue' }, { html: 'no active game tables' });
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
async function showGamesAndTables(force = false) {
  let dTableList = mBy('dTableList') || mDom('dMain', {}, { className: 'section', id: 'dTableList' });
  M.tables = await MPollTables();
  let tables = dict2list(M.tables), me = UGetName();

  tables.map(x => {
    x.prior = x.status == 'open' ? 0 : x.turn.includes(me) ? 1 : x.playerNames.includes(me) ? 2 : 3;
    x.game_friendly = capitalize(MGetGameFriendly(x.game));
  });
  sortBy(tables, 'prior');

  // Check if tables have changed by comparing with previous state
  let hasChanges = !DA.tableList || force;
  if (!hasChanges) {
    hasChanges = DA.tableList.length !== tables.length ||
      tables.some((t, i) => t.id !== DA.tableList[i].id || t.status !== DA.tableList[i].status);
  }

  DA.tableList = tables;
  if (!hasChanges) return;

  mClear(dTableList);
  showTables(dTableList, tables, me);
  let dGameList = mBy('dGameList') || mDom('dMain', {}, { className: 'section', id: 'dGameList' });
  mClear(dGameList);
  showGames(dGameList);
}



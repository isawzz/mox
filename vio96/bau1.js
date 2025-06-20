

function createRadioGroup(dParent, key, values, selectedValue, onOptionChange = null) {
  let list = values.split(',');
  let fs = mRadioGroup(dParent, { fg: 'black' }, `d_${key}`, formatLegend(key));

  for (const v of list) {
    let val = isNumber(v) ? Number(v) : v;
    let radio = mRadio(v, val, key, fs, { cursor: 'pointer' }, null, key, false);
    if (onOptionChange) {
      radio.firstChild.onchange = () => onOptionChange(val);
    }
  }

  for (const ch of fs.children) {
    if (!ch.id) continue;
    let rval = stringAfterLast(ch.id, '_');
    if (isNumber(rval)) rval = Number(rval);
    ch.firstChild.checked = selectedValue == rval || (nundef(selectedValue) && `${rval}` == arrLast(list));
  }

  measureFieldset(fs);
  return fs;
}
function createPlayerOptionsPopup(dParent, player, handler) {
  let bg = MGetUserColor(player);
  let d1 = mDom(dParent, {
    bg: colorLight(bg, 50),
    border: `solid 2px ${bg}`,
    rounding: 6,
    display: 'inline-block',
    hPadding: 3
  }, { id: 'dPlayerOptions' });

  mDom(d1, {}, { html: player });
  let d = mDom(d1);
  mCenterFlex(d);

  mButtonX(d1, handler, 20, 0, 'dimgray');
  return [d1, d];
}
function setupCloseHandlers(elem, onClose, excludeElemId) {
  const cleanup = () => {
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleEscape);
  };

  const handleClickOutside = ev => {
    if (mBy(excludeElemId).contains(ev.target)) return;
    onClose();
    cleanup();
  };

  const handleEscape = ev => {
    if (ev.key === 'Escape') {
      onClose();
      cleanup();
    }
  };

  setTimeout(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
  }, 0);
}
function createSection(parentId, sectionId) {
  return mBy(sectionId) || mDom(parentId, {}, { className: 'section', id: sectionId });
}
function addActionButton(row, action, handler, id) {
  return mAppend(row, mCreate('td')).innerHTML = hFunc(action, handler, id);
}
function createCardContainer(dParent, styles = {}, id) {
  let container = mDom(dParent, { fg: 'white', ...styles }, { id });
  mCenterCenterFlex(container);
  return container;
}
function createGameCard(container, game) {
  let bg = game.color, fg = colorIdealText(bg);
  let styles = { cursor: 'pointer', rounding: 10, bg, fg, fz:65,hline:65,padding:10,wmin:140,margin:10,align:'center'}; //, margin: 10, padding: 10, patop: 10, w: 140, height: 100, bg, position: 'relative' }
  let x=mKey(game.logo,container,styles,{label:capitalize(game.friendly), prefer:'emo',gamename: game.name, id:game.id, onclick: onclickGameMenuItem});
  
  return x;
  let card = mDom(container, { cursor: 'pointer', rounding: 10, margin: 10, padding: 10, patop: 10, w: 140, height: 100, bg, position: 'relative' }, { id: game.id });
  card.setAttribute('gamename', game.name);
  card.onclick = onclickGameMenuItem;
  mCenterFlex(card);
  mDom(card, { matop: 0, mabottom: 6, fz: 65, hline: 65, family: 'emoNoto', fg, display: 'inline-block' }, { html: M.superdi[game.logo].emo });
  mLinebreak(card);
  mDom(card, { fz: 18, align: 'center', fg }, { html: capitalize(game.friendly) });
  return card;
}
function setupPopupClose(popup, saveHandler, menuId = 'dMenuPlayers') {
  const cleanup = () => {
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleEscape);
  };

  const handleClickOutside = ev => {
    if (mBy(menuId).contains(ev.target)) return;
    saveHandler();
    cleanup();
  };

  const handleEscape = ev => {
    if (ev.key === 'Escape') {
      saveHandler();
      cleanup();
    }
  };

  setTimeout(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
  }, 0);
}
function createOptionsPopup(dParent, title, bg, styles = {}) {
  let d1 = mDom(dParent, {
    bg: colorLight(bg, 50),
    border: `solid 2px ${bg}`,
    rounding: 6,
    display: 'inline-block',
    hPadding: 3,
    ...styles
  }, { id: 'dPlayerOptions' });

  mDom(d1, {}, { html: title });
  let d = mDom(d1);
  mCenterFlex(d);
  return [d1, d];
}
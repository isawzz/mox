
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


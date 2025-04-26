
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








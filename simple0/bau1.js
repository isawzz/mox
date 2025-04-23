async function showTable(force=false) {
	function updateUI() {
		const area = mBy('dMain');
		area.innerHTML = '<pre>' + JSON.stringify(DA.gameState, null, 2) + '</pre>';
		ifVerbose("UI updated:", DA.gameState);
	}

	let res = await fetch(`${DA.backendURL}/get_state.php`);
	if (!res.ok) {
		console.error('Error fetching game state:', res.statusText);
		return null;
	} //else { res = await res.text(); ifVerbose(res) }
	let state = await res.json();
	if (force || JSON.stringify(state) !== JSON.stringify(DA.gameState)) {
		DA.gameState = state;
		updateUI();
		if (VERBOSE) ifVerbose('Game state updated:', state);
	}
	return DA.gameState;

}
async function switchToMenu(evOrMenu) {

	let ev = evOrMenu, menu = null;
	if (isString(evOrMenu)) {
		ev = { target: getElementWithAttribute('key', evOrMenu) };
		menu = evOrMenu;
	}
	let [prevElem, elem] = hToggleClassMenu(ev);
	if (prevElem == elem) { ifVerbose('same!!!'); return; }
	//ifVerbose('different', prevElem, elem);

	menu = valf(menu,elem.getAttribute('key'), DA.menu, localStorage.getItem('menu'), 'games');

	ifVerbose('menu',menu); //ifVerbose('evOrMenu',evOrMenu,'\nmenu',menu,'\nev',ev);

	DA.pollCounter = 0;
	DA.menu = menu;
	switch (menu) {
		case 'games': await showGamesAndTables(true); DA.pollCounter = 0; DA.pollInterval = 3000; break;
		case 'table': await showTable(true); DA.pollCounter = 0; DA.pollInterval = 1000; break;
	}
	localStorage.setItem('menu', menu);
}
async function onclickTable(id) {
	DA.id = id;
	await switchToMenu('table');
}

async function onclickWatch() {}

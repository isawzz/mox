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

async function switchToMenu(menu){
	// if (isdef(TO.poll)) await pollStop();
	menu = valf(menu,DA.menu,localStorage.getItem('menu'),'games');
	DA.pollCounter = 0;
	DA.menu = menu;
	switch(menu){
		case 'games': await showGamesAndTables(); DA.pollCounter=0;DA.pollInterval=3000;break;
		case 'table': DA.pollCounter=0;DA.pollInterval=1000;break;
	}
	localStorage.setItem('menu', menu);
	// await pollAndShow();
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



async function DAGetState() {
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
async function DAInit(isTest = false,menu='games') {
	if (isTest) VERBOSE = true;
	DA.backendURL = getServer(true) + 'simple0/php'; //'https://moxito.online/mox/simple0/php';
	if (VERBOSE) console.log('backendURL', DA.backendURL);
	DA.pollCounter = 0;
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

	DA.menu = menu;

	let username = localStorage.getItem('username') ?? 'hans';
	if (isTest) {
		let names = ['amanda', 'felix', 'lauren', 'mimi', 'gul'];
		let d = mBy('dTestRight'); mFlex(d);
		for (const name of names) { let b = mDom(d, { className: 'button' }, { tag: 'button', html: name, onclick: async(ev) => await switchToUser(name) }); }
		username = rChoose(names); //['felix','lauren','diana','mimi','amanda','guest','gul']); //localStorage.getItem('username') ?? 'hans'; 
	}

	await switchToUser(username);


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


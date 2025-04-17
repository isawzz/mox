
async function DAGetState() {
	let res = await fetch(`${DA.backendURL}/get_state.php`)
	let state = await res.json();
	if (JSON.stringify(state) !== JSON.stringify(DA.gameState)) {
		DA.gameState = state;
		updateUI();
		if (VERBOSE) console.log('Game state updated:', state);
	}
	return DA.gameState;

}
async function DAInit() {
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
	

}
async function DASaveState(state) {
	if (isdef(state)) DA.gameState = state;
	let res = await fetch(`${DA.backendURL}/save_state.php`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(DA.gameState)
	});
	let data = await res.json();
	if (VERBOSE) console.log('Game state saved:', data,DA.gameState);

	return data;
}


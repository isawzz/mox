
async function onclickTable(id) { DA.id = id; await switchToMenu('table'); }
async function startGame(gamename, players, options) {
	let table = createOpenTable(gamename, players, options);
	table = setTableToStarted(table);
	let tid = table.id;
	let tData = table;
	let res = await mPhpPost('all', { action: 'create', tid, tData });
	if (res.tid) {
		console.log("Game Creation:", res.tid);
		let data = M.tables[tid] = await tableGetDefault(res.tid); console.log(data);
		M.tableFilenames.push(tid);
		DA.tid = tid; DA.tData = tData;
	} else {
		console.log("Game Creation failed");
		return null;
	}
	return table;
}
async function onclickGameStart() {
	await saveDataFromPlayerOptionsUI(DA.gamename);
	let options = collectOptions();
	let players = collectPlayers();
	let table = await startGame(DA.gamename, players, options);
}
async function onclickTableStart(id) {
	console.log(arguments.callee.name, arguments);
	let tData = M.tables[id];
	if (!tData) { showMessage('table deleted!'); return await showGamesAndTables(); }
	tData = setTableToStarted(tData);
	let res = await mPhpPost('all', { action: 'savey', file: `tables/${id}`, o: tData });
	console.log('res', res);

}
async function onclickTableDelete(id) {
	let res = await mPhpPost('all', { action: 'deletey', file: `tables/${id}` });
	console.log('res', res);
}
async function onclickTableJoin(id) {
	let tData = jsCopy(M.tables[id]);
	let me = UGetName(); console.log('me', me)
	assertion(tData.status == 'open', 'too late to join! game has already started!')
	assertion(!tData.playerNames.includes(me), `${me} already joined!!!`);
	tData.players[me] = createGamePlayer(me, tData.game);
	tData.playerNames.push(me);
	let res = await mPhpPost('all', { action: 'savey', file: `tables/${id}`, o: tData });
	console.log('res', res);
}
async function onclickTableLeave(id) {

	let tData = jsCopy(M.tables[id]);
	let me = UGetName();
	assertion(tData.status == 'open', 'too late to leave! game has already started!')
	assertion(tData.playerNames.includes(me), `${me} NOT in joined players!!!!`);
	delete tData.players[me];
	removeInPlace(tData.playerNames, me);
	let res = await mPhpPost('all', { action: 'savey', file: `tables/${id}`, o: tData });
	console.log('res', res);

}
async function onclickTableMenu() {
	let id = getTid();
	if (nundef(id)) {
		let me = UGetName();
		let table = Serverdata.tables.find(x => x.status == 'started' && x.turn.includes(me));
		if (nundef(table)) table = Serverdata.tables.find(x => x.status == 'started' && x.playerNames.includes(me));
		if (nundef(table)) table = Serverdata.tables.find(x => x.status != 'open' && x.playerNames.includes(me));
		if (nundef(table)) table = Serverdata.tables.find(x => x.status != 'open');
		if (isdef(table)) id = table.id;
	}
	if (isdef(id)) { Tid = null; await showTable(id); } else await switchToMainMenu('play');
}








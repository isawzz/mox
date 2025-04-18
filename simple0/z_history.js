async function showTable(id) {
	let me = UGetName();
	let tid = valf(id, DA.tid);
	if (nundef(tid)) tid = valf(localStorage.getItem('tid'), arrLast(Object.keys(M.tables)));
	if (nundef(tid)) { return await showGamesAndTables(); }
	DA.tid = tid;
	let tData = await loadStaticYaml(`y/tables/${tid}.yaml`);
	if (!tData) { showMessage('table deleted!'); return await showGamesAndTables(); }
	let changes = deepCompare(M.tables[tid], tData);
	if (!changes) { return console.log('no changes', changes, tid); }
	console.log('changes', changes);
	M.tables[tid] = DA.tData = tData;
	let func = DA.funcs[tData.game];
	T = tData;
	clearMain();
	mClassRemove('dExtra', 'p10hide');
	showTitleGame(tData);
	if (func.hasInstruction) prepInstruction(tData);
	func.prepLayout(tData);
	let items = [];
	await func.stats(tData);
	if (tData.status == 'over') { showGameover(tData, 'dTitle'); return; }
	assertion(tData.status == 'started', `showTable status ERROR ${tData.status}`);
	func.activate(tData, items);
}
function pollChangeMs(state, ms) { DA.pollms[state] = ms; }
function pollChangeState(newState) {
	DA.prevState = DA.pollState;
	DA.pollState = newState;
	pollResume();
}
async function pollResume() {
	let ms = DA.pollms[DA.pollState];
	console.log('', DA.pollCounter++, ms, DA.prevState, DA.pollState);
	switch (DA.pollState) {
		case 'lobby':
			await showGamesAndTables();
			if (nundef(TO.poll)) TO.poll = setTimeout(pollResume, ms);
			break;
		case 'mymove':
			TO.poll = setTimeout(pollResume, ms);
			break;
		case 'othermove':
			TO.poll = setTimeout(pollResume, ms);
			break;
		default:
			pollStop(); break;
	}
}
function showState() {
	console.log('uiState:', DA.uiState, firstVisibleChild(DA.dControlUiState).innerHTML);
}
async function showStateButtons(d) {
	let styles = { rounding: 6, maleft: 10, h: 24, bg: 'dimgray', fg: 'white', padding: 5 };
	let label = 'ui:';
	DA.dControlUiState = mToggleButton(d, styles, { label, key: 'hand', onclick: uiManual }, { label, key: 'display', onclick: uiAuto })
	label = 'menu:';
	DA.dControlUiState = mToggleButton(d, styles, { label, key: 'list', onclick: menuLobby }, { label, key: 'round_table', onclick: menuTable })
	label = 'table:';
	DA.dControlUiState = mToggleButton(d, styles,
		{ label: `${label} none`, key: null, onclick: tableNone },
		{ label: `${label} open`, key: null, onclick: tableOpen },
		{ label: `${label} me`, key: null, onclick: tableMyMove },
		{ label: `${label} wait`, key: null, onclick: tableOtherMove },
		{ label: `${label} over`, key: null, onclick: tableGameover },
	);
	label = 'system:';
	DA.dControlUiState = mToggleButton(d, styles,
		{ label: `${label} idle`, key: null, onclick: sysIdle },
		{ label: `${label} busy`, key: null, onclick: sysBusy },
		{ label: `${label} polling`, key: null, onclick: sysPolling },
	);
}

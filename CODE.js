
async function mToggleButton(dParent, styles = {}) {
	addKeys({ display: 'flex', wrap: 'wrap', aitems: 'center' }, styles)
	let d1 = mDom(dParent, styles);
	let list = Array.from(arguments).slice(2);
	let buttons = [];
	let style = { hpadding: 4, display: 'flex', 'flex-wrap': 'nowrap', 'align-items': 'center', cursor: 'pointer' };
	for (const l of list) {
		let b = mDom(d1, style, { onclick: l.onclick });
		mDom(b, { maright: 6 }, { html: l.label });
		if (l.key) await mKey(l.key, b, { h: styles.h, fz: styles.h }); //:fz:valf(styles.h,50) });
		buttons.push(b);
	}
	return mToggleCompose(...buttons);
}
async function mToggleButton(dParent,styles={}) {
	addKeys({display: 'flex', wrap: 'wrap', aitems: 'center' },styles)
	let d1 = mDom(dParent, styles); 
	let list = Array.from(arguments).slice(2);
	let buttons = [];
	let style = { display: 'flex', 'flex-wrap':'nowrap', aitems: 'center', cursor: 'pointer' };

	let words = list.map(x => x.label);
	let w = getMaxWordWidth(words, d1) + styles.h*1.25 +2; console.log(w);
	mStyle(d1, { w });

	for (const l of list) {

		let b = mDom(d1, style, { onclick: l.onclick });
		mDom(b, {maright:6}, { html: l.label });
		await mKey(l.key, b, { h:styles.h,w:styles.h,fz:styles.h }); //:fz:valf(styles.h,50) });

		// let dAuto = mDom(d1,{ cursor: 'pointer'}, { onclick: uiAuto });	
		// mDom(dAuto, {}, { html: 'uiState:' });
		// await mKey('display', dAuto,{sz:24});

		buttons.push(b);

	}

	return mToggleCompose(...buttons);

}

function _mFlex(d, or = 'h') {
	d = toElem(d);
	d.style.display = 'flex';
	d.style.flexFlow = (or == 'v' ? 'column' : 'row') + ' ' + (or == 'w' ? 'wrap' : 'nowrap');
}
function _mFlexBaseline(d) { mStyle(d, { display: 'flex', 'align-items': 'baseline' }); }
function _mFlexLR(d) { mStyle(d, { display: 'flex', 'justify-content': 'space-between', 'align-items': 'center' }); }
function _mFlexLine(d, startEndCenter = 'center') { mStyle(d, { display: 'flex', 'justify-content': startEndCenter, 'align-items': 'center' }); }
function _mFlexSpacebetween(d) { mFlexLR(d); }
function _mFlexV(d) { mStyle(d, { display: 'flex', 'align-items': 'center' }); }
function _mFlexVWrap(d) { mStyle(d, { display: 'flex', 'align-items': 'center', 'flex-flow': 'row wrap' }); }
function _mFlexWrap(d) { mFlex(d, 'w'); }
async function showStateButtons(d) {
	//uiState manual or auto
	let d1 = mDom(d, { maleft: 10, bg: 'black', fg: 'white', hpadding: 4, h: 24, w: 84 }); mFlexV(d1);




	mDom(d1, {}, { html: 'uiState:' });
	let bManual = DA.bManual = await mKey('hand', d1, { h: 24, w: 24, cursor: 'pointer', round: true }, { id: 'bManual', onclick: uiAuto });
	let bAuto = DA.bAuto = await mKey('robot', d1, { h: 24, w: 24, cursor: 'pointer', round: true }, { id: 'bAuto', onclick: uiManual });
	DA.dControlUiState = mToggleButton(bAuto, bManual);

	// let bPoll = DA.bPoll = await mKey('circle_right', d, { fz:24,cursor: 'pointer', round: true, fg: 'green' }, { onclick: pollResume });
	// let bStop = DA.bStop = await mKey('circle_stop', d, { fz:24,cursor: 'pointer', round: true, fg: 'red' }, { onclick: pollStop });
	// dController = mToggleButton(bPoll, bStop);

}
async function test0_game1() {
	DA.gamelist = ['setgame', 'button96']; //'accuse aristo bluff ferro fishgame fritz huti lacuna nations setgame sheriff spotit wise'; if (DA.TEST0) gamelist += ' a_game'; gamelist = toWords(gamelist);
	DA.funcs = { setgame: setgame(), button96: button96() }; //implemented games!
	for (const gname in DA.gamelist) {
		if (isdef(DA.funcs[gname])) continue;
		DA.funcs[gname] = defaultGameFunc();
	}

	await loadAssetsStatic();
	await loadTables();

	let elems = mLayoutTM('dPage'); mStyle('dMain', { overy: 'auto' }); mCenterFlex('dMain');

	mLayoutTopTestExtraMessageTitle('dTop'); mFlexV('dTop'); //mStyle('dTop', { hmin: 32 }); mStyle('dExtra', { hmin: 32 })

	let names = ['amanda', 'felix', 'lauren', 'mimi', 'gul'];
	let d = mBy('dTestRight'); mFlexV(d);
	for (const name of names) { let b = mDom(d, { className: 'button' }, { tag: 'button', html: name, onclick: async () => await switchToUser(name) }); }

	//await mSleep(rNumber(0,2000));
	let username = rChoose(names); //['felix','lauren','diana','mimi','amanda','guest','gul']); //localStorage.getItem('username') ?? 'hans'; 
	//if (username == 'felix') username = 'mimi'; else { username = 'felix';}
	await switchToUser(username);

	d = mBy('dTestLeft'); mFlexV(d);
	// mDom(d, { className: 'button', bg: 'green' }, { tag: 'button', html: 'POLL', onclick: pollResume });
	// mDom(d, { className: 'button', bg: 'red' }, { tag: 'button', html: 'STOP', onclick: pollStop });
	let bPoll = await mKey('circle_right', d, { fz: 24, cursor: 'pointer', round: true, fg: 'green' }, { onclick: pollResume });
	let bStop = await mKey('circle_stop', d, { fz: 24, cursor: 'pointer', round: true, fg: 'red' }, { onclick: pollStop });
	// let bExpand = await mKey('circle_chevron_down', dParent, styles, { tag: 'button', onclick: expandAll });
	// let bCollapse = await mKey('circle_chevron_up', dParent, styles, { tag: 'button', onclick: collapseAll });
	dController = mToggleButton(bPoll, bStop);
	mDom(d, { className: 'button', maleft: 10 }, { tag: 'button', html: 'delete', onclick: async () => await tablesDeleteAll() });

	//await showGamesAndTables();
	//pollChangeState('lobby');


}
async function tableCreate(gamename, players, options) {
	if (nundef(gamename)) gamename = "setgame";
	if (nundef(players)) players = { mimi: userToPlayer('mimi', gamename), felix: userToPlayer('felix', gamename), amanda: userToPlayer('amanda', gamename) };
	if (nundef(options)) options = MGetGameOptions(gamename);
	console.log('tableCreate', gamename, players, options);
	let me = UGetName();
	let playerNames = [me]; console.log('me', me)
	assertion(me in players, "_createOpenTable without owner!!!!!")
	for (const name in players) { addIf(playerNames, name); }
	let table = {
		status: 'open',
		id: generateTableId(),
		fen: null,
		game: gamename,
		owner: playerNames[0],
		friendly: generateTableName(playerNames.length, []), //MGetTableNames()),
		players,
		playerNames: playerNames,
		options
	};
	let tid = table.id;
	let tData = table;
	let res = await mPhpPost('mox0', { action: 'create', tid, tData });
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

async function showTable(id) {
	let me = UGetName();
	DA.pollFunc = 'showTable';
	let tid = valf(id, DA.tid);
	if (nundef(tid)) tid = valf(localStorage.getItem('tid'), arrLast(Object.keys(M.tables)));
	if (nundef(tid)) { return await showTables(); }
	DA.tid = tid;
	let tData = await loadStaticYaml(`y/tables/${tid}.yaml`);
	if (!tData) { showMessage('table deleted!'); return await showTables(); }
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

async function onsockConfig(x) {
	console.log('SOCK::config', x)
	Serverdata.config = x; console.log(Serverdata.config);
}
async function onsockEvent(x) {
	console.log('SOCK::event', x)
	if (isdef(Serverdata.events)) Serverdata.events[x.id] = x;
}
async function onsockMerged(x) {
	console.log('SOCK::merged', x)
	if (!isSameTableOpen(x.id)) return;
	await showTable(x);
}
async function onsockPending(id) {
	console.log('SOCK::pending', id)
	if (!isSameTableOpen(id)) return;
	await showTable(id);
}
async function onsockSuperdi(x) {
	console.log('SOCK::superdi', x)
}
async function onsockTable(x) {
	console.log('SOCK::table', x);
	let [msg, id, turn, isNew] = [x.msg, x.id, x.turn, x.isNew];
	let menu = getMenu();
	let me = UGetName();
	console.log('menu', menu, 'me', me, 'turn', turn, 'isNew', isNew)
	if (turn.includes(me) && menu == 'play') { Tid = id; await switchToMainMenu('table'); }
	else if (isNew && menu == 'play') { Tid = id; await switchToMainMenu('table'); }
	else if (menu == 'table') await showTable(id);
	else if (menu == 'play') await showGamesAndTables();
}
async function onsockTables(x) {
	console.log('SOCK::tables', x)
	let menu = getMenu();
	if (menu == 'play') await showTables('onsockTables');
	else if (menu == 'table') {
		assertion(isdef(T), "menu table but no table!!!")
		let id = T.id;
		let exists = x.find(t => t.id == id);
		if (nundef(exists)) { Tid = T = null; await switchToMenu(UI.nav, 'play'); }
	}
}
function sockInit(port = '3000') {
	let type = detectSessionType();
	let server = type == 'live' ? `http://localhost:${port}` : type == 'fastcomet' ? `https://moxito.online:${port}` : null;//getServer(); //getServerurl();
	console.log('::sockInit:', type, server); return;
	if (!server) { console.log('::sockInit: NO SOCKETS!!!', type, server); return; }

	Socket = io(server);
	Socket.on('disconnect', x => console.log('::io disconnect:', x));
	Socket.on('connection', x => console.log('::io connect:', x));
	// Socket.on('config', onsockConfig);
	// Socket.on('event', onsockEvent);
	Socket.on('message', o => console.log('message', o)); //showChatMessage);
	// Socket.on('merged', onsockMerged);
	// Socket.on('pending', onsockPending);
	// Socket.on('table', onsockTable);
	// Socket.on('tables', onsockTables);
	// Socket.on('superdi', onsockSuperdi);
}
function sockPostUserChange(oldname, newname) {
	Socket.emit('userChange', { oldname, newname });
}
async function mPhpGetFiles(dir, projectName = 'ilms', verbose = false, jsonResult = true) {
	let server = getServer();
	if (verbose) console.log('to php:', server + `${projectName}/php/mox0.php`, dir);
	let res = await fetch(server + `${projectName}/php/list_files.php?dir=${encodeURIComponent(dir)}`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		}
	);
	let text;
	try {
		text = await res.text();
		if (!jsonResult) {
			return text;
		}
		let obj = JSON.parse(text);
		if (verbose) console.log('from php:\n', obj);
		let mkeys = ["config", "superdi", "users", "details"];
		for (const k of mkeys) {
			if (isdef(obj[k])) {
				M[k] = obj[k];
				if (k == "superdi") {
					loadSuperdiAssets();
				} else if (k == "users") {
					loadUsers();
				}
			}
		}
		return obj;
	} catch (e) {
		return isString(text) ? text : e;
	}
}

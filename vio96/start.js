
onload = start; VERBOSE = true; TESTING = true;

function start() { test0(); }

async function test0() {
	await DAInit();
	await clickOn('games');
	if (TESTING) await clickOn(rChoose(['gul', 'felix', 'amanda', 'lauren', 'mimi'])); 
	await mSleep(30);
	await clickOn('Set')
	return;
	//await loadAssetsStatic(); console.log(M);
	//let files = await mGetFilenames('tables'); console.log('files', files);
	//DA.tableIds = files.map(x => stringBefore(x, '.'));

	//let [dTop, dMain] = mLayoutTM('dPage');
	//mStyle('dMain', { overy: 'auto', padding: 0 });
	//let d = mDom(dMain, { gap: 10, padding: 10, bg: 'red', wrap: true },{className: 'flexCS'});

	// for (const i of range(10)) { showObject(DA, null, d, { bg: rColor() }); }

	//await showGamesAndTables(); console.log('tables', M.tables)
	//await showGameMenu('setgame');
}

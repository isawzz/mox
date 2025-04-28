
function tableGameover() { DA.prevTableState = DA.tableState; DA.tableState = 'gameOver'; }
async function tableGetDefault(tid = null, tData = null) {
	if (nundef(tid)) tid = valf(DA.tid, localStorage.getItem('tid'), arrLast(Object.keys(M.tables)));
	console.log(tid)
	if (nundef(tid)) return null;
	if (nundef(tData)) { tData = valf(DA.tData, await loadStaticYaml(`y/tables/${tid}.yaml`)); }
	[DA.tid, DA.tData] = [tid, tData];
	return tData ? { tid, tData } : null;
}
async function tableHasChanged() {
}
async function tableLoad(tid) {
	let o = await tableGetDefault(tid);
	if (!o) { console.log('no table found!'); return null; }
	tid = o.tid;
	let tData = o.tData;
	console.log('table loaded', tData);
	localStorage.setItem('tid', tid);
	M.tables[tid] = tData;
	return tData;
}
function tableMyMove() { DA.prevTableState = DA.tableState; DA.tableState = 'mymove'; }
function tableNone() { DA.prevTableState = DA.tableState; DA.tableState = 'none'; }
function tableOpen() { DA.prevTableState = DA.tableState; DA.tableState = 'open'; }
function tableOtherMove() { DA.prevTableState = DA.tableState; DA.tableState = 'othermove'; }
function tablePresent(tData) {
	console.log('PRESENT!!!!');
	let title = fromNormalized(tData.friendly);
	mClear('dTopLeft');
	mDom('dTopLeft', { family: 'algerian', maleft: 10 }, { html: title });
	mClear('dMain')
	mDom('dMain', { bg: 'white', fg: 'black' }, { tag: 'pre', html: jsonToYaml(tData) });
}
async function tablesDeleteAll() {
	let res = await mPhpPost('all', { action: 'delete_dir', dir: 'tables' });
	if (VERBOSE) console.log('res', res);
	DA.tid = null;
	DA.tData = null;
	localStorage.removeItem('tid');
	M.tables = {};
	//await showGamesAndTables();
}

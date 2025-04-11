
async function tablesDeleteAll() {
	//await mPhpPost('mox0', { username, action: 'login' });
	let res = await mPhpPost('mox0', { action:'delete_dir', dir: 'tables' });
	console.log('res',res);
	DA.tid = null;
	DA.tData = null;
	localStorage.removeItem('tid');
	M.tables = {};
	//mClear('dMain');
	mClear('dTopLeft');
	await showGamesAndTables();
	//console.log('all tables deleted!');
}



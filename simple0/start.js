onload = start; 

async function start() { await test0_game0(); }

async function test0_game0() {
	await DAInit(true);
	
	//await switchToMenu('games');
	let d = mBy('dTopLeft');
	let d1 = mKey('watch', d, {}, { onclick: onclickStopwatch, menu: 'top' });
	let d2 = mKey('game', d, {}, { onclick: onclickResetActions, menu: 'top' });


	//showTestButtons();

}	
async function test0_save_state() {
	await DAInit(true);
	let state = await showTable(); //console.log('vorher', jsCopy(state));

	state.num = rNumber();

	let res = await DASaveState(state); //console.log('nachher', res);

}	
async function test0_get_state() {

	await DAInit();
	let state = await showTable();

	console.log('DONE!',state);
}	
async function test0_php0() {
	await loadAssetsStatic();
	// let res = await mPhpPost('all', { action: 'dir', dir:'tables' },'simple0',true); console.log('res', res)
	// let files = await mGetFilenames('tables'); //console.log('files', files);
	await loadTables();
	console.log('M',M)
}	
async function test0() {
	console.log('YEAH!');
}	
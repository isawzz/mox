onload = start; VERBOSE = true;

async function start() { await test0_save_state(); }

async function test0_save_state() {
	await DAInit();
	let state = await DAGetState(); console.log('vorher', jsCopy(state));

	state.hallo = {word:'random'};

	let res = await DASaveState(state); console.log('nachher', res);

}	
async function test0_get_state() {

	await DAInit();
	let state = await DAGetState();

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
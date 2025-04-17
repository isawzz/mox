onload = start; VERBOSE = true;

async function start() { await test0_game0(); }

async function test0_game0() {
	await DAInit();

	let elems = mLayoutTM('dPage'); mStyle('dMain', { overy: 'auto' }); mCenterFlex('dMain');
	mLayoutTopTestExtraMessageTitle('dTop'); 

	let names = ['amanda', 'felix', 'lauren', 'mimi', 'gul'];
	let d = mBy('dTestRight'); mFlex(d);
	for (const name of names) { let b = mDom(d, { className: 'button' }, { tag: 'button', html: name, fClick: _=>switchToUser(name) }); }

	let username = rChoose(names); //['felix','lauren','diana','mimi','amanda','guest','gul']); //localStorage.getItem('username') ?? 'hans'; 
	await switchToUser(username);
}	
async function test0_save_state() {
	await DAInit();
	let state = await DAGetState(); //console.log('vorher', jsCopy(state));

	state.num = rNumber();

	let res = await DASaveState(state); //console.log('nachher', res);

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
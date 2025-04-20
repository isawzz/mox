onload = start;

async function start() { await test0_flex(); }

async function test0_flex() {
	let d = mDom('dPage', { display: 'flex', 'align-items': 'center', bg: 'blue', fg: 'white', gap: 10, padding: 10, box: true, h: 50 });

	let b = mDom(d, { className: 'vert_align_button', 'align-self': 'baseline', bg: 'red' }, { html: 'Help' });
	b = mDom(d, { className: 'vert_align_button', bg: 'red' }, { html: 'Help' });
	b = mDom(d, { className: 'vert_align_button', 'align-self': 'stretch', bg: 'red' }, { html: 'Help' });
	b = mDom(d, { className: 'vert_align_button', 'align-self': 'start', bg: 'red' }, { html: 'Help' });
	b = mDom(d, { className: 'vert_align_button', 'align-self': 'end', bg: 'red' }, { html: 'Help' });

	b = mDom(d, { 'align-self': 'baseline', bg: 'green' }, { html: 'Help' });
	b = mDom(d, { bg: 'green' }, { html: 'Help' });
	b = mDom(d, { 'align-self': 'stretch', bg: 'green' }, { html: 'Help' });
	b = mDom(d, { 'align-self': 'start', bg: 'green' }, { html: 'Help' });
	b = mDom(d, { 'align-self': 'end', bg: 'green' }, { html: 'Help' });
}
async function test0_game0() {
	await DAInit(true);
	let isTest = true;

	//if (isTest) await showTestButtons();
	// await showMenuButtons();

	//await switchToMenu('games');
	let styles = { className: 'vert_align_button', h: 30 };
	let d = mBy('dTopLeft'); mFlex(d); mStyle(d, { padding: 10, gap: 10 }) //mClass(d,'flex')
	mDom(d, styles, { html: 'game', onclick: onclickTest, menu: 'top' });
	let d1 = mDom(d, { h: 30 }, { html: 'An', onclick: onclickTest, menu: 'top' });
	mClass(d1, 'vert_align_button align_baseline');
	mDom(d, styles, { html: 'Lop', onclick: onclickTest, menu: 'top' });
	mDom(d, styles, { html: 'Miq', onclick: onclickTest, menu: 'top' });
	mKey('watch', d, styles, { onclick: onclickTest, menu: 'top' }); return;
	// let d2 = mKey('game', d, {cursor:'pointer',h100:true}, { onclick: onclickTest, menu: 'top' });

	let username = localStorage.getItem('username') ?? 'hans';
	if (isTest) {
		let names = ['amanda', 'felix', 'lauren', 'mimi', 'gul'];
		let d = mBy('dTestRight'); mFlex(d);
		for (const name of names) { let b = mDom(d, { className: 'button' }, { tag: 'button', html: name, onclick: async (ev) => await switchToUser(name) }); }
		username = rChoose(names); //['felix','lauren','diana','mimi','amanda','guest','gul']); //localStorage.getItem('username') ?? 'hans'; 
	}
	await switchToUser(username);

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

	console.log('DONE!', state);
}
async function test0_php0() {
	await loadAssetsStatic();
	// let res = await mPhpPost('all', { action: 'dir', dir:'tables' },'simple0',true); console.log('res', res)
	// let files = await mGetFilenames('tables'); //console.log('files', files);
	await loadTables();
	console.log('M', M)
}
async function test0() {
	console.log('YEAH!');
}	
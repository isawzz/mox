
function applyOpts(d, opts = {}) {
	const aliases = {
		classes: 'className',
		inner: 'innerHTML',
		html: 'innerHTML',
		w: 'width',
		h: 'height',
	};
	for (const opt in opts) {
		let name = valf(aliases[opt], opt), val = opts[opt];
		if (name == 'fClick') { d.onclick = async (ev) => { recUserEvent(); await val(ev); } }
		else if (['style', 'tag', 'innerHTML', 'className', 'checked', 'value'].includes(name) || name.startsWith('on')) d[name] = val;
		else d.setAttribute(name, val);
	}
}
async function tablesDeleteAll() {
	let res = await mPhpPost('mox0', { action:'delete_dir', dir: 'tables' });
	console.log('res',res);
	DA.tid = null;
	DA.tData = null;
	localStorage.removeItem('tid');
	M.tables = {};
	mClear('dTopLeft');
	await showGamesAndTables();
}



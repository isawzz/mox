
function mFlex(d, wrap = true, halign = 'start', valign = 'center', row = true) {
	d = toElem(d);
	mStyle(d, {
		display: 'flex',
		'flex-wrap': wrap ? 'wrap' : 'nowrap',
		'flex-direction': row ? 'row' : 'column',
		'align-items': row ? valign : halign,
		'justify-content': row ? halign : valign
	});
}
async function showUserImage(uname, d, sz = 40) {
	let u = MGetUser(uname); console.log('u', u);
	let key = u.imgKey;
	let m = M.superdi[key];
	if (nundef(m)) {
		key = 'unknown_user';
	}
	let img = mDom(d, { h: sz, w: sz, round: true, border: `${u.color} 3px solid` },{tag:'img', src:m.img});
	return img;
}



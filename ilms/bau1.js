
async function mToggleButton(dParent,styles={}) {
	addKeys({display: 'flex', wrap: 'wrap', aitems: 'center' },styles)
	let d1 = mDom(dParent, styles); 
	let list = Array.from(arguments).slice(2);
	let buttons = [];
	let style = { display: 'flex', 'flex-wrap':'nowrap', aitems: 'center', cursor: 'pointer' };

	let words = list.map(x => x.label);
	let w = getMaxWordWidth(words, d1) + styles.h*1.25; console.log(w);
	mStyle(d1, { w });

	for (const l of list) {

		let b = mDom(d1, style, { onclick: l.onclick });
		mDom(b, {}, { html: l.label });
		await mKey(l.key, b, { h:styles.h,w:styles.h,fz:styles.h }); //:fz:valf(styles.h,50) });

		// let dAuto = mDom(d1,{ cursor: 'pointer'}, { onclick: uiAuto });	
		// mDom(dAuto, {}, { html: 'uiState:' });
		// await mKey('display', dAuto,{sz:24});

		buttons.push(b);

	}

	return mToggleCompose(...buttons);

}
function mToggleCompose() {
	let list = Array.from(arguments);
	if (isEmpty(list)) return;
	let dParent = list[0].parentNode;
	let tb = mDom(dParent);
	let n = list.length;
	let i = 0;
	for (const b of list) {
		mAppend(tb, b);
		b.setAttribute('idx', i++);
		if (i < n) mStyle(b, { display: 'none' });
	}
	tb.onclick = ev => {
		let idx = Number(evToAttr(ev, 'idx'));
		let inew = (idx + 1) % n;
		let b = list[inew];
		list.map(x => mStyle(x, { display: 'none' }));
		mStyle(b, { display: 'flex' });
	}
	return tb;
}

async function postUsers() {
	let users = jsonToYaml(M.users);
	let res = await mPhpPost('mox0', { action: 'savey', file: 'users', o: M.users });
	console.log('res', res);
}
function firstVisibleChild(div) {
	if (!div || !div.children) return null;

	for (const child of div.children) {
		const style = window.getComputedStyle(child);
		if (style.display !== 'none') {
			return child;
		}
	}

	return null; // if none are visible
}
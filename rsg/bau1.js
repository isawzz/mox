

async function showCollection(k) {
	let sz = 100, gap = 10;
	mClear('dMain')
	let dParent = mDom('dMain', { display: 'flex', gap, padding: gap, wrap: true, box: true }, { id: "table", });
	mCenterFlex(dParent);
	let keys = valf(M.byCollection[k], M.byCat[k]);
	mClear(dParent);
	let style = { fz: 100, w: 150, h: 100, box: true, padding: 4, fg: 'skyblue' };
	let i = 0;
	let n = Math.floor(window.innerWidth / (style.w + 10)) * Math.floor(window.innerHeight / (style.h + 10)); console.log('n', n);
	for (const k of keys) {
		let o = M.superdi[k];
		let d1 = mDom(dParent, { display: 'grid', border: 'solid 1px orange', padding: 10, rounding: 10 });
		mKey(k, d1, style);
		mDom(d1, { w: style.w, fg: 'black', 'text-overflow': 'ellipsis', 'white-space': 'nowrap', overflow: 'hidden', fz: 16, align: 'center' }, { html: o.key, title: o.key })
		if (0 === ++i % n) await mSleep(50);
	}
}



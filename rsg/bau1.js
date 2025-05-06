
async function showCollection(key, d, styles={},opts={}) {
	mClear(d);
	mClass(d,'symbolContainer');
	mDom(d,{className:'symbol'},{html:'<div class="symbol">&#x2718;</div>'});
	mStyle(document.body,{className:'symbolContainer'})

	for (const k of M.byCollection[key]) {
		let sym = M.superdi[k];
		let d1 = mDom(d, { margin: 10 });
		//mDom(d1,{},{tag:'pre',html:sym.text});
		mDom(d1,{className:'symbol'},{html: `<div class="symbol">${sym.text}</div>` }); //sym.text
		let dimg = await mKey(k, d1, styles, opts);
		let dlabel = mDom(d1, { align: 'center', fz: 12, bg: 'yellow', fg: 'black' }, { html: k });
	}
}
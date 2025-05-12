function mKey(imgKey, d, styles = {}, opts = {}) {
	//console.log('___mKey', imgKey, styles, opts);
	styles = jsCopy(styles);
	let o = imgKey.includes('.') ? { src: imgKey } : opts.prefer == 'plain' ? { plain: imgKey } : lookup(M.superdi, [imgKey]);
	//console.log(o)
	let type = opts.prefer;
	let types = ['src', 'img', 'photo', 'uni', 'emo', 'fa6', 'fa', 'ga', 'plain'];
	if (nundef(o[type])) type = types.find(x => isdef(o[x]));
	//console.log(type, o)

	let d0 = mDom(d, styles, opts);
	mCenterCenterFlex(d0);

	if (['img', 'src', 'photo'].includes(type)) {
		let [_, h] = mSizeSuccession(styles, 40);
		console.log(':::IMAGE type',o[type],h);
		addKeys({ h, w:h, fit: 'cover', 'object-position': 'center center' }, styles);
		mDom(d0, styles, { ...opts, tag: 'img', src: o[type], alt: imgKey });
		// mDom(d0, {...styles, h, w:h, fit:'cover', round:true}, { ...opts, tag: 'img', src: o[type], alt: imgKey });
		//mImg(o.type, d0, { h: mSizeSuccession(styles, 40)[1] }, opts);
		//let [_, h] = mSizeSuccession(styles, 40);
		//copyKeys({ h, w:h, fit: 'cover', 'object-position': 'center center' }, styles);
		//copyKeys({ tag: 'img', src:o[type] }, opts)
		//let img = mDom(d0, styles, opts);
	} else {
		const families = { uni: "'Noto Sans', sans-serif", emo: 'emoNoto', fa6: 'fa6', fa: 'pictoFa', ga: 'pictoGame' };
		let family = families[type] || 'inherit';
		addKeys({ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100%', height: '100%', fontSize: styles.fz || 'inherit', family, lineHeight: '1', verticalAlign: 'middle' }, styles);
		let html = ['fa6', 'fa', 'ga'].includes(type) ? `&#x${o[type]};` : o[type];
		//console.log('mKey', imgKey, type, o[type], html, styles.family);
		mDom(d0, styles, { ...opts, html });
	}
	return d0;

}

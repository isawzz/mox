
function mKey(imgKey, d, styles = {}, opts = {}) {
	//console.log('___mKey', imgKey, styles, opts);
	styles = jsCopy(styles);
	let o = imgKey.includes('.') ? { src: imgKey } : opts.prefer == 'plain' ? { plain: imgKey } : lookup(M.superdi, [imgKey]);
	let type = opts.prefer;
	let types = ['src', 'img', 'photo', 'uni', 'emo', 'fa6', 'fa', 'ga', 'plain'];
	if (nundef(o[type])) type = types.find(x => isdef(o[x]));

	let d0 = mDom(d, styles, opts);
	mCenterCenterFlex(d0);
	let [_, h] = mSizeSuccession(styles, 100);

	if (['img', 'src', 'photo'].includes(type)) {
		addKeys({ h, w:h, fit: o && o.cats.includes('card')?'contain':'cover', 'object-position': 'center center' }, styles);

		mDom(d0, styles, { ...opts, tag: 'img', src: o[type], alt: imgKey });

	} else {
		const families = { uni: "'Noto Sans', sans-serif", emo: 'emoNoto', fa6: 'fa6', fa: 'pictoFa', ga: 'pictoGame' };
		let family = families[type] || 'inherit';
		addKeys({ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100%', height: '100%', fontSize: styles.fz || 'inherit', family, lineHeight: '1', verticalAlign: 'middle' }, styles);
		let html = ['fa6', 'fa', 'ga'].includes(type) ? `&#x${o[type]};` : o[type];

		mDom(d0, styles, { ...opts, html });

	}
	return d0;

}

function mKey(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let type = opts.prefer;
	let o = type !== 'plain' ? lookup(M.superdi, [imgKey]) : null;
	let src;

	if (!o) {
		if (imgKey.includes('.')) {
			src = imgKey;
		} else {
			type = 'plain';
		}
	} else if (!type || !o[type]) {
		console.log('o', o)
		type = isdef(o.img) ? 'img' :
			isdef(o.photo) ? 'photo' :
				isdef(o.text) ? o.colls.includes('unicode') ? 'uni' : 'text' :
					isdef(o.fa6) ? 'fa6' :
						isdef(o.fa) ? 'fa' :
							isdef(o.ga) ? 'ga' : null;
		if (type === 'img' || type === 'photo') src = o[type];
	}

	let d0 = mDom(d, styles, opts);
	mCenterCenterFlex(d0); // Ensure the container is centered
	console.log('type', type, 'imgKey', imgKey);

	if (isdef(src)) {
		let [w, h] = mSizeSuccession(styles, 40);
		let imgStyles = { h };
		let imgOpts = { tag: 'img', src };
		mImg(src, d0, imgStyles, imgOpts);
	} else if (type === 'text' || type === 'uni') {
		// Center the text inside the container
		let family = valf(styles.family,type == 'uni'? "'Noto Sans', sans-serif": 'emoNoto');
		let textStyles = {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
			width: '100%',
			height: '100%',
			fontSize: styles.fz || 'inherit',
			family,
			//fontFamily: styles.family || 'inherit',
			lineHeight: '1', // Ensure consistent vertical alignment
			verticalAlign: 'middle' // Align text vertically
		};
		mDom(d0, textStyles, { html: o.text });
	} else if (type !== 'plain') {
		// let family = type === 'fa6' ? 'Font Awesome 6 Free' : 'Font Awesome 5 Free';
		 type == 'fa6' ? 'fa6' : type == 'fa' ? 'pictoFa' : 'pictoGame';
		let html = `&#x${o[type]};`;
		addKeys({ family }, styles);
		mDom(d0, styles, { html });
	} else {
		addKeys({ html: imgKey }, opts);
		mDom(d0, styles, opts);
	}

	return d0;
}




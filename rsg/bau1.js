
function mKey2(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let o = lookup(M.superdi, [imgKey]);
	let type = determineType(o, opts.prefer);
	let src = !o ? (imgKey.includes('.') ? imgKey : null) : (type && o[type] ? o[type] : null);

	if (!o) type = src ? null : 'plain';
	else if (!type || !o[type]) type = determineType(o);

	let d0 = mDom(d, styles, opts);
	mCenterCenterFlex(d0);

	if (isdef(src)) {
		mImg(src, d0, { h: mSizeSuccession(styles, 40)[1] }, { tag: 'img', src });
	} else if (type === 'text' || type === 'uni') {
		renderContent(o.text, d0, styles, type === 'uni' ? "'Noto Sans', sans-serif" : 'emoNoto');
	} else if (type !== 'plain') {
		renderContent(`&#x${o[type]};`, d0, styles, type === 'fa6' ? 'fa6' : type === 'fa' ? 'pictoFa' : 'pictoGame');
	} else {
		mDom(d0, styles, { html: imgKey });
	}

	return d0;
}
function determineType(o, prefer) {
	return prefer == 'plain' ? prefer :
		prefer && (!o || o[prefer]) ? prefer :
			isdef(o.img) ? 'img' :
				isdef(o.photo) ? 'photo' :
					isdef(o.text) ? (o.colls.includes('unicode') ? 'uni' : 'text') :
						isdef(o.fa6) ? 'fa6' :
							isdef(o.fa) ? 'fa' :
								isdef(o.ga) ? 'ga' : 'plain';
}




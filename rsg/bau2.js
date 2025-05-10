function mKey0(imgKey, d, styles = {}, opts = {}) {
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
		//let family = type === 'fa6' ? 'Font Awesome 6 Free' : 'Font Awesome 5 Free';
		let family= type == 'fa6' ? 'fa6' : type == 'fa' ? 'pictoFa' : 'pictoGame';
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
		let html = `&#x${o[type]};`;
		addKeys({ family }, styles);
		mDom(d0, textStyles, { html });
	} else {
		addKeys({ html: imgKey }, opts);
		mDom(d0, styles, opts);
	}

	return d0;
}

function mKey1(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let type = opts.prefer;
	let o = type !== 'plain' ? lookup(M.superdi, [imgKey]) : null;
	let src;

	// Determine the type and source
	if (!o) {
			src = imgKey.includes('.') ? imgKey : null;
			type = src ? null : 'plain';
	} else if (!type || !o[type]) {
			type = determineType1(o);
			if (type === 'img' || type === 'photo') src = o[type];
	}

	// Create the container
	let d0 = mDom(d, styles, opts);
	mCenterCenterFlex(d0);

	// Render based on type
	if (isdef(src)) {
			renderImage(src, d0, styles);
	} else if (type === 'text' || type === 'uni') {
			renderText(o.text, d0, styles, type);
	} else if (type !== 'plain') {
			renderIcon(o[type], d0, styles, type);
	} else {
			renderPlain(imgKey, d0, styles, opts);
	}

	return d0;
}

// Helper to determine the type
function determineType1(o) {
	return isdef(o.img) ? 'img' :
				 isdef(o.photo) ? 'photo' :
				 isdef(o.text) ? (o.colls.includes('unicode') ? 'uni' : 'text') :
				 isdef(o.fa6) ? 'fa6' :
				 isdef(o.fa) ? 'fa' :
				 isdef(o.ga) ? 'ga' : null;
}

// Helper to render an image
function renderImage(src, d0, styles) {
	let [w, h] = mSizeSuccession(styles, 40);
	let imgStyles = { h };
	let imgOpts = { tag: 'img', src };
	mImg(src, d0, imgStyles, imgOpts);
}

// Helper to render text
function renderText(text, d0, styles, type) {
	let family = valf(styles.family, type === 'uni' ? "'Noto Sans', sans-serif" : 'emoNoto');
	let textStyles = {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
			width: '100%',
			height: '100%',
			fontSize: styles.fz || 'inherit',
			family,
			lineHeight: '1',
			verticalAlign: 'middle'
	};
	mDom(d0, textStyles, { html: text });
}

// Helper to render an icon
function renderIcon(iconCode, d0, styles, type) {
	let family = type === 'fa6' ? 'fa6' : type === 'fa' ? 'pictoFa' : 'pictoGame';
	let textStyles = {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
			width: '100%',
			height: '100%',
			fontSize: styles.fz || 'inherit',
			family,
			lineHeight: '1',
			verticalAlign: 'middle'
	};
	let html = `&#x${iconCode};`;
	mDom(d0, textStyles, { html });
}

// Helper to render plain text
function renderPlain(imgKey, d0, styles, opts) {
	addKeys({ html: imgKey }, opts);
	mDom(d0, styles, opts);
}

function mKey2(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let type = opts.prefer;
	let o = type !== 'plain' ? lookup(M.superdi, [imgKey]) : null;
	let src = !o ? (imgKey.includes('.') ? imgKey : null) : (type && o[type] ? o[type] : null);

	if (!o) type = src ? null : 'plain';
	else if (!type || !o[type]) type = determineType2(o);

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

function determineType2(o) {
	return isdef(o.img) ? 'img' :
				 isdef(o.photo) ? 'photo' :
				 isdef(o.text) ? (o.colls.includes('unicode') ? 'uni' : 'text') :
				 isdef(o.fa6) ? 'fa6' :
				 isdef(o.fa) ? 'fa' :
				 isdef(o.ga) ? 'ga' : null;
}

function renderContent(html, d0, styles, family) {
	mDom(d0, {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
			width: '100%',
			height: '100%',
			fontSize: styles.fz || 'inherit',
			family,
			lineHeight: '1',
			verticalAlign: 'middle'
	}, { html });
}

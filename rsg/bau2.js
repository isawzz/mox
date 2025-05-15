
function mKey(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let o = imgKey.includes('.') ? { src: imgKey } : opts.prefer == 'plain' ? { plain: imgKey } : lookup(M.superdi, [imgKey]);
	let type = opts.prefer;
	let types = ['src', 'img', 'photo', 'uni', 'emo', 'fa6', 'fa', 'ga', 'plain'];
	if (nundef(o[type])) type = types.find(x => isdef(o[x]));

	let d0 = mDom(d, styles, opts); 
	let [w, h] = mSizeSuccession(styles, 100);

	if (['img', 'src', 'photo'].includes(type)) {
		let astyle={ w,h, fit: o && o.cats.includes('card') ? 'contain' : 'cover', 'object-position': 'center center' };

		mDom(d0, astyle, { ...opts, tag: 'img', src: o[type], alt: imgKey });

	}else if (type == 'plain'){
		let x = mDom(d0, {}, { ...opts, html: o[type] });

	} else {
		let family = Families[type] || 'inherit';
		let text = ['fa6', 'fa', 'ga'].includes(type) ? `&#x${o[type]};` : o[type];
		let fz = type == 'plain'?18:h*.8; // h*.9;

		let astyles = {
			fz,
			family,
			//matop:-12
			// display: 'flex',
			// justifyContent: 'center',
			// alignItems: 'center',
			// align: 'center',
			// width: '100%',
			// height: '100%',
			// box: true,
			// hline: '1', // Ensure consistent vertical alignment
			// 'vertical-align': 'middle', // Align text vertically
			// padding: '0', // Remove any padding that might affect alignment
			// margin: '0' // Remove any margin that might affect alignment
		};

		// let x = mDom(d0, { family, fz, wmin: 100, align: 'center' }, { ...opts, html: text });
		let x = mDom(d0, astyles, { ...opts, html: text });

	}
	return d0;

}

function msKey(key, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let o = key.includes('.') ? { src: key } : opts.prefer == 'plain' ? { plain: key } : lookup(M.superdi, [key]);
	let type = opts.prefer;
	let types = ['src', 'img', 'photo', 'uni', 'emo', 'fa6', 'fa', 'ga', 'plain'];
	if (nundef(o[type])) type = types.find(x => isdef(o[x]));

	let d0 = mDom(d, styles, opts); 
	let [w, h] = mSizeSuccession(styles, 100);

	if (['img', 'src', 'photo'].includes(type)) {
		let astyle={ w,h, fit: o && o.cats.includes('card') ? 'contain' : 'cover', 'object-position': 'center center' };

		mDom(d0, astyle, { ...opts, tag: 'img', src: o[type], alt: key });

	}else if (type == 'plain'){
		let x = mDom(d0, {}, { ...opts, html: o[type] });

	} else {
		let family = Families[type] || 'inherit';
		let text = ['fa6', 'fa', 'ga'].includes(type) ? `&#x${o[type]};` : o[type];
		let fz = type == 'plain'?18:h*.8; // h*.9;

		let astyles = {
			fz,
			family,
			matop:-12
		};

		let x = mDom(d0, astyles, { ...opts, html: text });

	}
	return d0;

}

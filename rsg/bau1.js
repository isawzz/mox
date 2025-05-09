

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
			type = isdef(o.img) ? 'img' :
						 isdef(o.photo) ? 'photo' :
						 isdef(o.text) ? 'text' :
						 isdef(o.fa6) ? 'fa6' :
						 isdef(o.fa) ? 'fa' :
						 isdef(o.ga) ? 'ga' : null;
			if (type === 'img' || type === 'photo') src = o[type];
	}

	let d0 = mDom(d, styles, opts);
	mCenterCenterFlex(d0);

	if (isdef(src)) {
			let [w, h] = mSizeSuccession(styles, 40);
			let imgStyles = { h };
			let imgOpts = { tag: 'img', src };
			mImg(src, d0, imgStyles, imgOpts); // Use mImg directly for synchronous image creation
		} else if (type !== 'plain') {
			let family = type === 'text' ? 'emoNoto' :
									 type === 'fa6' ? 'fa6' :
									 type === 'fa' ? 'pictoFa' : 'pictoGame';
			// console.log('o', o, 'type', type, 'imgKey', imgKey);
			//let html = type === 'text' ? o.text : `&#x${o[type]};`;
			let html = type === 'text' ? o.text : String.fromCharCode('0x' + o[type]);
			addKeys({ family }, styles);
			let d1 = mDom(d0, styles, { html });
			// let r = getRect(d1);
			// let [w, h] = [r.w, r.h];
	} else {
			addKeys({ html: imgKey }, opts);
			mDom(d0, styles, opts);
	}

	return d0;
}
function stickyHeaderCode() {
	const header = document.querySelector('.sticky_header');
	const contentArea = document.querySelector('.content_area');

	// Function to set the height and top margin of the content area
	const setContentAreaHeight = () => {
		const headerHeight = header.offsetHeight;
		contentArea.style.height = `calc(100vh - ${headerHeight}px)`;
		// Although not strictly necessary with the height calculation,
		// a margin-top equal to header height can prevent content from
		// initially being hidden behind a fixed header in some layouts.
		// In this sticky/flex-like approach, height calculation is sufficient.
		// contentArea.style.marginTop = `${headerHeight}px`;
	};

	// Set the height initially
	setContentAreaHeight();

	// Recalculate height on window resize
	window.addEventListener('resize', setContentAreaHeight);

}
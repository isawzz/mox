
function mScrollBehavior(container,hScroll,hSnapp){
	// const rowHeight = 120 + 8; // row height + vertical gap
	// const hScroll=5*rowHeight;
	let isScrolling = false;
	container.tabIndex = 0;
  let isUserScrolling = false;
  let scrollTimeout;

  // Keyboard PageUp/PageDown
  container.addEventListener('keydown', (e) => {
    if (e.key === 'PageDown' || e.key === 'PageUp') {
      e.preventDefault();
      const direction = e.key === 'PageDown' ? 1 : -1;
      smoothScrollBy(container, direction * hScroll); //container.clientHeight);
    }
  });

  // Wheel scroll: scroll exactly one screen
  let wheelScrolling = false;
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (wheelScrolling) return;
    wheelScrolling = true;
    const direction = e.deltaY > 0 ? 1 : -1;
    smoothScrollBy(container, direction * hScroll); //container.clientHeight);
    setTimeout(() => {
      wheelScrolling = false;
    }, 340);
  }, { passive: false });

  // Scroll event: detect manual scrolling (including scrollbar drag/click)
  container.addEventListener('scroll', () => {
    isUserScrolling = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      snapScroll(container);
      isUserScrolling = false;
    }, 150); // adjust delay for scroll end detection
  });

  // Smooth scroll helper
  function smoothScrollBy(element, distance) {
    element.scrollBy({
      top: distance,
      behavior: 'smooth'
    });
  }

  // Snap scroll position to nearest full page (container height)
  function snapScroll(element) {
    const pageHeight = hSnapp; //element.clientHeight;
    const currentScroll = element.scrollTop;
    const pageIndex = Math.round(currentScroll / pageHeight);
    const targetScroll = pageIndex * pageHeight;

    if (Math.abs(targetScroll - currentScroll) > 2) {
      element.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  }

}
function mKey(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let o = imgKey.includes('.') ? { src: imgKey } : opts.prefer == 'plain' ? { plain: imgKey } : lookup(M.superdi, [imgKey]);
	let type = opts.prefer;
	let types = ['src', 'img', 'photo', 'uni', 'emo', 'fa6', 'fa', 'ga', 'plain'];
	if (nundef(o[type])) type = types.find(x => isdef(o[x]));

	let d0 = mDom(d, styles, opts);
	let [w, h] = mSizeSuccession(styles, 100);

	if (['img', 'src', 'photo'].includes(type)) {
		let astyle = { w, h, fit: o && o.cats.includes('card') ? 'contain' : 'cover', 'object-position': 'center center' };

		mDom(d0, astyle, { ...opts, tag: 'img', src: o[type], alt: imgKey });

	} else if (type == 'plain') {
		let x = mDom(d0, {}, { ...opts, html: o[type] });

	} else {
		let family = Families[type] || 'inherit';
		let text = ['fa6', 'fa', 'ga'].includes(type) ? `&#x${o[type]};` : o[type];
		let fz = type == 'plain' ? 18 : h * .8; // h*.9;

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

	type = 'fa6'
	let d0;

	if (['img', 'src', 'photo'].includes(type)) {
		d0 = mDom(d, {}, { ...opts, tag: 'img', src: o[type], alt: key });
	} else if (type == 'plain') {
		d0 = mDom(d, {}, { ...opts, html: o[type] });

	} else {
		let family = Families[type] || 'inherit';
		let text = ['fa6', 'fa', 'ga'].includes(type) ? `&#x${o[type]};` : o[type];
		d0 = mDom(d, { ...styles, family }, { ...opts, html: text });

	}
	return d0;
}


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
		mKey0(k, d1, style);
		mDom(d1, { w: style.w, fg: 'black', 'text-overflow': 'ellipsis', 'white-space': 'nowrap', overflow: 'hidden', fz: 16, align: 'center' }, { html: o.key, title: o.key })
		if (0 === ++i % n) await mSleep(50);
	}
}


function collectCats(klist) {
	let cats = [];
	for (const k of klist) {
		M.superdi[k].cats.map(x => addIf(cats, x));
	}
	return cats;
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
function lazyLoad(prop = 'src') {
	let dataProp = 'data-' + prop;
	let tag = prop == 'src' ? 'img' : 'div';
	const elems = document.querySelectorAll(`${tag}[${dataProp}]`);
	const observer = new IntersectionObserver((entries, obs) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const elem = entry.target;
				elem.innerHTML = elem.dataset[prop];
				//elem[prop] = elem.dataset[prop];
				elem.removeAttribute(dataProp);
				obs.unobserve(elem);
			}
		});
	});
	elems.forEach(img => observer.observe(img));
}



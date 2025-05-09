
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



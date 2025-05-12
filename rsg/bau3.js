
async function showCollection(k, d = 'dMain', outerStyles = {}, symbolStyles = {}, labelStyles = {}, opts = {}) {

	let [w, h] = mSizeSuccession(outerStyles, 100); let gap = valf(outerStyles.gap, 10)

	mClear(d)
	let dParent = mDom(d, { display: 'flex', gap, padding: gap, wrap: true, box: true }, { id: "table", });
	mCenterFlex(dParent);
	let keys = isList(k) ? k : M.byCat[k]; console.log('keys', keys);

	outerStyles = addKeys({ w, h, 'place-items': 'center', display: 'grid', border: 'solid 2px silver', bg: 'dimgray', fg: 'contrast', padding: 10, rounding: 10 }, outerStyles);
	if (opts.onclick) outerStyles.cursor = 'pointer';

	labelStyles = addKeys({ fg: 'contrast', 'text-overflow': 'ellipsis', 'white-space': 'nowrap', overflow: 'hidden', fz: 16, align: 'center' }, labelStyles);

	symbolStyles = addKeys({ h: h - labelStyles.fz, box: true, padding: 4, fg: 'skyblue' }, symbolStyles);

	addKeys({ prefer: 'img' }, opts);
	let optsSymbol = { prefer: opts.prefer };
	let i = 0;
	let n = Math.floor(window.innerWidth / (outerStyles.w + 10)) * Math.floor(window.innerHeight / (outerStyles.h + 10));
	//console.log('n', n);
	for (const k of keys) {
		// let o = M.superdi[k];
		let d1 = mDom(dParent, outerStyles, opts);
		mKey(k, d1, symbolStyles, optsSymbol);
		mDom(d1, labelStyles, { html: k, title: k })
		if (0 === ++i % n) await mSleep(50);
	}
}
function toggleItemSelection(item, classSelected = 'framedPicture', selectedItems = null) {
	if (nundef(item)) return;
	let ui = iDiv(item);
	item.isSelected = nundef(item.isSelected) ? true : !item.isSelected;
	if (item.isSelected) mClass(ui, classSelected); else mRemoveClass(ui, classSelected);
	if (isdef(selectedItems)) {
		if (item.isSelected) {
			console.assert(!selectedItems.includes(item), 'UNSELECTED PIC IN PICLIST!!!!!!!!!!!!')
			selectedItems.push(item);
		} else {
			console.assert(selectedItems.includes(item), 'PIC NOT IN PICLIST BUT HAS BEEN SELECTED!!!!!!!!!!!!')
			removeInPlace(selectedItems, item);
		}
	}
}
function toggleSelectionOfPicture(elem, selkey, selectedPics, className = 'framedPicture') {
	if (selectedPics.includes(selkey)) {
		removeInPlace(selectedPics, selkey); mUnselect(elem);
	} else {
		selectedPics.push(selkey); mSelect(elem);
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



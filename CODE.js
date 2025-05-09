
async function mKeyO(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let type = opts.prefer;
	let o = type != 'plain' ? lookup(M.superdi, [imgKey]) : null;
	let src;
	if (nundef(o) && imgKey.includes('.')) src = imgKey;
	else if (isdef(o) && (type == 'img' || type == 'photo') && isdef(o[type])) src = o[type];
	else if (isdef(o) && isdef(o.img)) src = o.img;
	if (isdef(src)) {
		let [w, h] = mSizeSuccession(styles, 40);
		addKeys({ w, h }, styles);
		addKeys({ tag: 'img', src }, opts);
		let d0 = mDom(d, styles, opts);
		mCenterCenterFlex(d0);
		let img = await mImgAsync(d0, styles, opts, roundIfTransparentCorner);
		return d0;
	} else if (isdef(o)) {
		let [w, h] = mSizeSuccession(styles, 40);
		let sz = h;
		addKeys({ h }, styles);
		if (nundef(type)) type = isdef(o.text) ? 'text' : isdef(o.fa6) ? 'fa6' : isdef(o.fa) ? 'fa' : isdef(o.ga) ? 'ga' : null;
		let family = type == 'text' ? 'emoNoto' : type == 'fa6' ? 'fa6' : type == 'fa' ? 'pictoFa' : 'pictoGame';
		let html = type == 'text' ? o.text : String.fromCharCode('0x' + o[type]);
		addKeys({ family }, styles);
		let d0 = mDom(d, styles, opts);
		mCenterCenterFlex(d0);
		let d1 = mDom(d0, {}, { html });
		let r = getRect(d1);
		[w, h] = [r.w, r.h];
		let scale = Math.min(sz / w, sz / h);
		d1.style.transformOrigin = 'center center';
		d1.style.transform = `scale(${scale})`;
		d1.style.transform = `scale(${scale})`;
		return d0;
	} else {
		addKeys({ html: imgKey }, opts)
		let img = mDom(d, styles, opts);
		return img;
	}
	console.log('type', type)
}
async function mKey(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let type = opts.prefer; console.log(type)
	let o = type != 'plain' ? lookup(M.superdi, [imgKey]) : null;
	let src;
	if (nundef(o) && imgKey.includes('.')) src = imgKey;
	else if (isdef(o) && (type == 'img' || type == 'photo') && isdef(o[type])) src = o[type];
	else if (isdef(o) && isdef(o.img) && nundef(type)) src = o.img;
	if (isdef(src)) {
		let d0 = mDom(d, styles, opts);
		mCenterCenterFlex(d0);
		let [w, h] = mSizeSuccession(styles, 40);
		let imgStyles = { h }, imgOpts = { tag: 'img', src }
		let img = await mImgAsync(d0, imgStyles, imgOpts, roundIfTransparentCorner);
		return d0;
	} else if (isdef(o)) {
		if (nundef(type)) type = isdef(o.text) ? 'text' : isdef(o.fa6) ? 'fa6' : isdef(o.fa) ? 'fa' : isdef(o.ga) ? 'ga' : null;
		let family = type == 'text' ? 'emoNoto' : type == 'fa6' ? 'fa6' : type == 'fa' ? 'pictoFa' : 'pictoGame';
		let html = type == 'text' ? o.text : String.fromCharCode('0x' + o[type]);
		addKeys({ family }, styles);
		let d0 = mDom(d, styles, opts);
		mCenterCenterFlex(d0);
		let d1 = mDom(d0, {}, { html });
		let r = getRect(d1);
		[w, h] = [r.w, r.h];
		return d0;
	} else {
		addKeys({ html: imgKey }, opts)
		let img = mDom(d, styles, opts);
		return img;
	}
}

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
				isdef(o.text) ? o.colls.includes('unicode') ? 'uni' : 'text' :
					isdef(o.fa6) ? 'fa6' :
						isdef(o.fa) ? 'fa' :
							isdef(o.ga) ? 'ga' : null;
		if (type === 'img' || type === 'photo') src = o[type];
	}

	let d0 = mDom(d, styles, opts);
	mCenterCenterFlex(d0); // Ensure the container is centered

	if (isdef(src)) {
		let [w, h] = mSizeSuccession(styles, 40);
		let imgStyles = { h };
		let imgOpts = { tag: 'img', src };
		mImg(src, d0, imgStyles, imgOpts);
	} else if (type === 'text') {
		// Center the text inside the container
		console.log('family', styles.family)
		let textStyles = {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
			width: '100%',
			height: '100%',
			fontSize: styles.fz || 'inherit',
			fontFamily: styles.family || 'inherit'
		};
		mDom(d0, textStyles, { html: o.text });
	} else if (type !== 'plain') {
		// let family = type === 'fa6' ? 'Font Awesome 6 Free' : 'Font Awesome 5 Free';
		let family = type == 'uni' ? "'Noto Sans', sans-serif" : type == 'text' ? 'emoNoto' : type == 'fa6' ? 'fa6' : type == 'fa' ? 'pictoFa' : 'pictoGame';
		//let html = type == 'text' ? o.text : String.fromCharCode('0x' + o[type]);
		let html = `&#x${o[type]};`;
		addKeys({ family }, styles);
		mDom(d0, styles, { html });
	} else {
		addKeys({ html: imgKey }, opts);
		mDom(d0, styles, opts);
	}

	return d0;
}


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


async function uiFilter(dParent, filter) {
	// Create a container for the filter bar
	let dFilterBar = mDom(dParent, { gap: 10, padding: 12, display: 'flex', alignItems: 'center', flexFlow: 'wrap' });

	// Collection input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold' }, { html: 'Collection:' });
	let collectionList = Object.keys(M.byCollection);
	let dlCollection = mDatalist(dFilterBar, collectionList, { placeholder: "<select from list>" });
	dlCollection.inpElem.oninput = ev => {
		console.log('Selected Collection:', ev.target.value);
		filter.collection = ev.target.value;
	};

	// Category input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold' }, { html: 'Category:' });
	let categoryList = Object.keys(M.byCat);
	let dlCategory = mDatalist(dFilterBar, categoryList, { placeholder: "<select from list>" });
	dlCategory.inpElem.oninput = ev => {
		console.log('Selected Category:', ev.target.value);
		filter.category = ev.target.value;
	};

	// Search input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold' }, { html: 'Search:' });
	let searchInput = mDom(dFilterBar, { width: 180, marginLeft: 4 }, { tag: 'input', className: 'input', placeholder: "<enter search term>" });
	searchInput.oninput = ev => {
		console.log('Search Term:', ev.target.value);
		filter.search = ev.target.value;
	};
}
async function uiFilter(dParent, filter) {
	// Create a container for the filter bar
	let dFilterBar = mDom(dParent, { gap: 10, padding: 12, display: 'flex', alignItems: 'center', flexFlow: 'wrap' });

	// Collection/Category input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold' }, { html: 'Filter By:' });
	let optionsList = [...Object.keys(M.byCollection), ...Object.keys(M.byCat)];
	let dlFilterBy = mDatalist(dFilterBar, optionsList, { placeholder: "<select collection or category>" });
	dlFilterBy.inpElem.oninput = ev => {
		console.log('Selected Filter:', ev.target.value);
		filter.filterBy = ev.target.value;
	};

	// Search input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold' }, { html: 'Search:' });
	let searchInput = mDom(dFilterBar, { width: 180, marginLeft: 4 }, { tag: 'input', className: 'input', placeholder: "<enter search term>" });
	searchInput.oninput = ev => {
		console.log('Search Term:', ev.target.value);
		filter.search = ev.target.value;
	};
}
async function uiFilter(dParent, filter) {
	// Create a container for the filter bar
	let dFilterBar = mDom(dParent, { gap: 10, padding: 12, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' });

	// Collection/Category input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold' }, { html: 'Filter By:' });
	let optionsList = [...Object.keys(M.byCollection), ...Object.keys(M.byCat)].sort(); // Sort alphabetically
	let dlFilterBy = mDatalist(dFilterBar, optionsList, { placeholder: "<select collection or category>" });
	dlFilterBy.inpElem.oninput = ev => {
		console.log('Selected Filter:', ev.target.value);
		filter.filterBy = ev.target.value;
	};

	// Search input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold', marginTop: 10 }, { html: 'Search:' });
	let searchInput = mDom(dFilterBar, { width: 180 }, { tag: 'input', className: 'input', placeholder: "<enter search term>" });
	searchInput.oninput = ev => {
		console.log('Search Term:', ev.target.value);
		filter.search = ev.target.value;
	};
}
function enableCustomTooltip() {
	// Create a tooltip element
	const tooltip = document.createElement('div');
	tooltip.style.position = 'absolute';
	tooltip.style.backgroundColor = 'black';
	tooltip.style.color = 'white';
	tooltip.style.padding = '5px';
	tooltip.style.borderRadius = '4px';
	tooltip.style.fontSize = '12px';
	tooltip.style.zIndex = '1000';
	tooltip.style.display = 'none'; // Initially hidden
	document.body.appendChild(tooltip);

	// Add event listeners to elements with a title attribute
	document.querySelectorAll('[title]').forEach(el => {
		el.addEventListener('mouseover', (event) => {
			const title = el.getAttribute('title');
			if (!title) return;

			// Show the tooltip
			tooltip.textContent = title;
			tooltip.style.display = 'block';

			// Position the tooltip
			const rect = el.getBoundingClientRect();
			const tooltipRect = tooltip.getBoundingClientRect();
			let top = rect.bottom + window.scrollY + 5; // Below the element
			let left = rect.left + window.scrollX;

			// Adjust if the tooltip goes out of the viewport
			if (left + tooltipRect.width > window.innerWidth) {
				left = window.innerWidth - tooltipRect.width - 5; // Adjust to fit within the viewport
			}
			if (top + tooltipRect.height > window.innerHeight) {
				top = rect.top + window.scrollY - tooltipRect.height - 5; // Place above the element
			}

			tooltip.style.top = `${top}px`;
			tooltip.style.left = `${left}px`;
		});

		el.addEventListener('mouseout', () => {
			// Hide the tooltip
			tooltip.style.display = 'none';
		});
	});
}
document.addEventListener('DOMContentLoaded', enableCustomTooltip);

function uiFilterElement() {
	let html = `
		<div class="title" style="gap: 10px; padding: 12px; display: flex; align-items: center; flex-flow: wrap;">
			<div style="display: flex; align-items: center;">
				<div style="font-size: 24px; font-weight: bold;">Collection:</div>
				<div><input class="input" placeholder="&lt;select from list&gt;" list="dl_1" style="width: 180px; margin-left: 4px;"><datalist id="dl_1" class="datalist">
				<option value="airports"></option>
				<option value="all"></option>
				<option value="amanda"></option><option value="birds"></option><option value="emo"></option><option value="fa6"></option><option value="icon"></option><option value="nations"></option><option value="spotit"></option><option value="story"></option><option value="tierspiel"></option><option value="users"></option></datalist></div></div><div style="display: flex; align-items: center;"><div edit="true" style="font-size: 24px; font-weight: bold; width: auto; text-align: right;">Filter:</div><div><input class="input" placeholder="&lt;enter value&gt;" list="dl_2" style="width: 180px; margin-left: 4px;"><datalist id="dl_2" class="datalist"><option value="animal"></option><option value="insect"></option></datalist></div></div><div style="gap: 10px; text-align: right;"><button class="input" id="bPrev" style="width: 70px; margin: 0px 0px 0px 10px;">prev</button><button class="input" id="bNext" style="width: 70px; margin: 0px 0px 0px 10px;">next</button></div></div>
	`;
	return html
}
async function uiFilterMenu(dParent, name = 'all') {
	if (nundef(name)) name = 'emo';
	let list = [];
	if (name == 'all' || isEmpty(name)) { list = Object.keys(M.superdi); }
	else if (isdef(M.byCollection[name])) { list = M.byCollection[name]; }
	else list = [];
	let dMenu = mDom(dParent)
	mClear(dMenu);
	let d = mDom(dMenu); mFlex(d);
	mDom(d, { fz: 24, weight: 'bold' }, { html: 'Collection:' });
	let collNames = M.collections;
	let dlColl = mDatalist(d, collNames, { placeholder: "<select from list>" });
	dlColl.inpElem.oninput = ev => { console.log(sisi.name, ev.target.value); simpleInit(ev.target.value, sisi); }
	dlColl.inpElem.value = name;
	list = sortByFunc(list, x => M.superdi[x].friendly);
	DA.masterKeys = list;
	let keys = DA.keys = DA.filter ? collFilterImages(sisi, sisi.filter) : list;
	let cats = collectCats(keys);
	cats.sort();
	d = mDom(dMenu); mFlex(d);
	let wLabel = 'auto'; //sisi.cols < 6 ? 117 : 'auto';
	mDom(d, { fz: 24, weight: 'bold', w: wLabel, align: 'right' }, { edit: true, html: 'Filter:' });
	let dlCat = mDatalist(d, cats, { edit: false, placeholder: "<enter value>", value: DA.filter });
	dlCat.inpElem.oninput = ev => {
		let coll = UI.simple;
		let s = ev.target.value.toLowerCase().trim();
		let list = collFilterImages(coll, s);
		coll.keys = list;
		coll.filter = s;
		coll.index = 0; coll.pageIndex = 1; simpleClearSelections();
		simpleShowImageBatch(coll, 0, false);
	};
	return keys;
	// d = mDom(dMenu, { gap: 10, align: 'right' });
	// mButton('prev', () => simpleShowImageBatch(sisi, -1), d, { w: 70, margin: 0, maleft: 10 }, 'input', 'bPrev');
	// mButton('next', () => simpleShowImageBatch(sisi, 1), d, { w: 70, margin: 0, maleft: 10 }, 'input', 'bNext');
	//simpleClearSelections();
	//simpleShowImageBatch(sisi);

}
async function _mKey(imgKey, d, styles = {}, opts = {}) {
	styles = jsCopy(styles);
	let type = opts.prefer;
	let o = type != 'plain' ? lookup(M.superdi, [imgKey]) : null;
	let src;
	if (nundef(o)) if (imgKey.includes('.')) src = imgKey; else type = 'plain';
	else if (nundef(type) || nundef(o[type])) {
		type = isdef(o.img) ? 'img' : isdef(o.photo) ? o.photo : isdef(o.text) ? 'text' : isdef(o.fa6) ? 'fa6' : isdef(o.fa) ? 'fa' : isdef(o.ga) ? 'ga' : null;
		if (type == 'img' || type == 'photo') src = o[type];
	}
	if (isdef(src)) {
		let d0 = mDom(d, styles, opts);
		mCenterCenterFlex(d0);
		let [w, h] = mSizeSuccession(styles, 40);
		let imgStyles = { h }, imgOpts = { tag: 'img', src }
		let img = await mImgAsync(d0, imgStyles, imgOpts, roundIfTransparentCorner);
		return d0;
	} else if (type != 'plain') {
		let family = type == 'text' ? 'emoNoto' : type == 'fa6' ? 'fa6' : type == 'fa' ? 'pictoFa' : 'pictoGame';
		let html = type == 'text' ? o.text : String.fromCharCode('0x' + o[type]);
		addKeys({ family }, styles);
		let d0 = mDom(d, styles, opts);
		mCenterCenterFlex(d0);
		let d1 = mDom(d0, {}, { html });
		let r = getRect(d1);
		[w, h] = [r.w, r.h];
		return d0;
	} else {
		addKeys({ html: imgKey }, opts)
		let img = mDom(d, styles, opts);
		return img;
	}
}

function createStickyAndContentDivs() {

	let stickyDiv = mDom(document.body, { position: 'sticky', top: 0, zIndex: 1000, padding: 10, bg: '#00000080' }, { id: 'dSticky' });
	mInsert('dPage', stickyDiv);
	// {box:true,className:'section',position:'sticky',height:'auto',top:0,zIndex:1000,padding:10,bg:'#00000080'},{id:'dSticky'}//const body = document.body;

	// Create the sticky div
	//const stickyDiv = document.createElement('div');
	// stickyDiv.id = 'dSticky';
	// stickyDiv.style.position = 'sticky';
	// stickyDiv.style.top = '0';
	// stickyDiv.style.zIndex = '1000';
	// stickyDiv.style.padding = '10px';
	// stickyDiv.innerText = 'I am a sticky div';
	//body.appendChild(stickyDiv);

	// // Create the content div
	// const contentDiv = document.createElement('div');
	// contentDiv.id = 'content';
	// contentDiv.style.padding = '20px';
	// contentDiv.innerText = 'This is the content below the sticky div.';
	// body.appendChild(contentDiv);

	// Adjust padding for the content div
	adjustContentPadding();
}
function createStickyAndContentDivs() {
	let stickyDiv = mDom(null, {
		position: 'sticky',
		top: 0,
		zIndex: 1000,
		padding: 10,
		bg: '#00000080',
		width: '100%', // Ensure it spans the full viewport width
		left: 0,        // Align to the left edge
		right: 0        // Align to the right edge
	}, { id: 'dSticky' });
	mInsert('dPage', stickyDiv);

	// Adjust padding for the content div
	adjustContentPadding();
}
function adjustContentPadding() {
	const sticky = document.getElementById('dSticky');
	const content = document.getElementById('dPage');
	if (sticky && content) {
		content.style.paddingTop = sticky.offsetHeight + 'px';
	}
}


function createCard1(rank = "10", suit = "♣", width = 240, height = 336) {
	const layout = {
		'2': [[1, 0], [1, 4]],
		'3': [[1, 0], [1, 2], [1, 4]],
		'4': [[0, 0], [2, 0], [0, 4], [2, 4]],
		'5': [[0, 0], [2, 0], [1, 2], [0, 4], [2, 4]],
		'6': [[0, 0], [2, 0], [0, 2], [2, 2], [0, 4], [2, 4]],
		'7': [[0, 0], [2, 0], [0, 2], [1, 1], [2, 2], [0, 4], [2, 4]],
		'8': [[0, 0], [2, 0], [0, 2], [1, 1], [2, 2], [0, 4], [2, 4], [1, 3]],
		'9': [[0, 0], [2, 0], [0, 2], [1, 1], [2, 2], [0, 4], [2, 4], [1, 3], [1, 2]],
		'10': [[0, 0], [2, 0], [0, 1.5], [2, 1.5], [1, 1], [1, 2], [1, 3], [0, 3.5], [2, 3.5], [0, 4]],
	};

	const card = document.createElement("div");
	card.style.position = "relative";
	card.style.width = width + "px";
	card.style.height = height + "px";
	card.style.border = "1px solid black";
	card.style.borderRadius = "12px";
	card.style.background = "white";
	card.style.fontFamily = "serif";

	const colX = [0.2, 0.5, 0.8].map(x => x * width);
	const rowY = [0.08, 0.23, 0.38, 0.53, 0.68].map(y => y * height);

	layout[rank].forEach(([col, row]) => {
		const pip = document.createElement("div");
		pip.textContent = suit;
		pip.style.position = "absolute";
		pip.style.left = (colX[col] - 10) + "px";
		pip.style.top = (rowY[row] - 12) + "px";
		pip.style.fontSize = Math.floor(height * 0.09) + "px";
		card.appendChild(pip);
	});

	// Top-left corner: rank and suit
	const top = document.createElement("div");
	top.innerHTML = `<div>${rank}</div><div style="text-align:center">${suit}</div>`;
	top.style.position = "absolute";
	top.style.left = "4px";
	top.style.top = "2px";
	top.style.fontSize = Math.floor(height * 0.08) + "px";
	card.appendChild(top);

	// Bottom-right corner (rotated)
	const bottom = top.cloneNode(true);
	bottom.style.left = "";
	bottom.style.right = "4px";
	bottom.style.top = "";
	bottom.style.bottom = "2px";
	bottom.style.transform = "rotate(180deg)";
	bottom.style.textAlign = "center";
	card.appendChild(bottom);

	return card;
}
function createCard2(rank = "10", suit = "♣", width = 240, height = 336) {
	const card = document.createElement("div");
	card.style.position = "relative";
	card.style.width = width + "px";
	card.style.height = height + "px";
	card.style.border = "1px solid black";
	card.style.borderRadius = "12px";
	card.style.background = "white";
	card.style.fontFamily = "serif";

	const centerX = width / 2;
	const colOffset = width * 0.25; // for left/right columns
	const colX = [centerX - colOffset, centerX, centerX + colOffset];

	const numRows = 4; // max for side columns
	const topMargin = height * 0.12;
	const pipSpacing = (height - 2 * topMargin) / (numRows - 1);

	// Pip positions for 10: 4-3-4 in 3 columns
	const pipData = [
		[0, [0, 1, 2, 3]],     // left column
		[1, [0.5, 2, 3.5]],    // center column (slightly staggered)
		[2, [0, 1, 2, 3]]      // right column
	];

	pipData.forEach(([col, rows]) => {
		rows.forEach(rowIndex => {
			const pip = document.createElement("div");
			pip.textContent = suit;
			pip.style.position = "absolute";
			pip.style.left = (colX[col] - width * 0.035) + "px";
			pip.style.top = (topMargin + pipSpacing * rowIndex - height * 0.045) + "px";
			pip.style.fontSize = Math.floor(height * 0.09) + "px";
			card.appendChild(pip);
		});
	});

	// Top-left: rank and suit
	const top = document.createElement("div");
	top.innerHTML = `<div>${rank}</div><div style="text-align:center">${suit}</div>`;
	top.style.position = "absolute";
	top.style.left = "6px";
	top.style.top = "4px";
	top.style.fontSize = Math.floor(height * 0.08) + "px";
	card.appendChild(top);

	// Bottom-right: rotated rank and suit
	const bottom = top.cloneNode(true);
	bottom.style.left = "";
	bottom.style.right = "6px";
	bottom.style.top = "";
	bottom.style.bottom = "4px";
	bottom.style.transform = "rotate(180deg)";
	bottom.style.textAlign = "center";
	card.appendChild(bottom);

	return card;
}
function createCard3(rank = "10", suit = "♣", width = 240, height = 336) {
	const card = document.createElement("div");
	card.style.position = "relative";
	card.style.width = width + "px";
	card.style.height = height + "px";
	card.style.border = "1px solid black";
	card.style.borderRadius = "12px";
	card.style.background = "white";
	card.style.fontFamily = "serif";

	const centerX = width / 2;
	const colOffset = width * 0.25;
	const colX = [centerX - colOffset, centerX, centerX + colOffset];

	const topMargin = height * 0.12;
	const pipSpacing = (height - 2 * topMargin) / 3;

	// Pip patterns for ranks 1 (Ace) to 10
	const pipPatterns = {
		1: [[1, [1.5]]],
		2: [[1, [0, 3]]],
		3: [[1, [0, 1.5, 3]]],
		4: [[0, [0, 3]], [2, [0, 3]]],
		5: [[0, [0, 3]], [1, [1.5]], [2, [0, 3]]],
		6: [[0, [0, 1.5, 3]], [2, [0, 1.5, 3]]],
		7: [[0, [0, 1.5, 3]], [1, [0]], [2, [0, 1.5, 3]]],
		8: [[0, [0, 1.5, 3]], [1, [0.75, 2.25]], [2, [0, 1.5, 3]]],
		9: [[0, [0, 1.5, 3]], [1, [0.5, 1.5, 2.5]], [2, [0, 1.5, 3]]],
		10: [[0, [0, 1, 2, 3]], [1, [0.5, 2, 3.5]], [2, [0, 1, 2, 3]]]
	};

	const value = parseInt(rank);
	const pipData = pipPatterns[value];
	const pipFontSize = height * 0.09;

	pipData.forEach(([col, rows]) => {
		rows.forEach(rowIndex => {
			const pip = document.createElement("div");
			pip.textContent = suit;
			pip.style.position = "absolute";
			pip.style.left = (colX[col] - pipFontSize * 0.35) + "px";
			pip.style.top = (topMargin + pipSpacing * rowIndex - pipFontSize * 0.5) + "px";
			pip.style.fontSize = pipFontSize + "px";
			card.appendChild(pip);
		});
	});

	// Top-left: rank and suit
	const top = document.createElement("div");
	top.innerHTML = `<div>${rank}</div><div style="text-align:center">${suit}</div>`;
	top.style.position = "absolute";
	top.style.left = "6px";
	top.style.top = "4px";
	top.style.fontSize = Math.floor(height * 0.08) + "px";
	card.appendChild(top);

	// Bottom-right: rotated rank and suit
	const bottom = top.cloneNode(true);
	bottom.style.left = "";
	bottom.style.right = "6px";
	bottom.style.top = "";
	bottom.style.bottom = "4px";
	bottom.style.transform = "rotate(180deg)";
	bottom.style.textAlign = "center";
	card.appendChild(bottom);

	return card;
}
function createCardGrid(rank = "10", suit = "♣", width = 240, height = 336) {
	const card = document.createElement("div");
	card.style.position = "relative";
	card.style.width = width + "px";
	card.style.height = height + "px";
	card.style.border = "1px solid black";
	card.style.borderRadius = "12px";
	card.style.background = "white";
	card.style.fontFamily = "serif";
	card.style.display = "grid";
	card.style.gridTemplateColumns = "1fr 1fr 1fr";
	card.style.gridTemplateRows = "repeat(12, 1fr)";
	card.style.boxSizing = "border-box";

	const pipFontSize = height * 0.09;

	// Left column (4 pips spanning 3 rows each)
	[0, 3, 6, 9].forEach(row => {
		const pip = document.createElement("div");
		pip.textContent = suit;
		pip.style.gridColumn = "1";
		pip.style.gridRow = `${row + 1} / span 3`;
		pip.style.fontSize = `${pipFontSize}px`;
		pip.style.display = "flex";
		pip.style.alignItems = "center";
		pip.style.justifyContent = "center";
		card.appendChild(pip);
	});

	// Right column (4 pips spanning 3 rows each)
	[0, 3, 6, 9].forEach(row => {
		const pip = document.createElement("div");
		pip.textContent = suit;
		pip.style.gridColumn = "3";
		pip.style.gridRow = `${row + 1} / span 3`;
		pip.style.fontSize = `${pipFontSize}px`;
		pip.style.display = "flex";
		pip.style.alignItems = "center";
		pip.style.justifyContent = "center";
		card.appendChild(pip);
	});

	// Center column (2 pips spanning 4 rows each, centered vertically)
	[2, 6].forEach(row => {
		const pip = document.createElement("div");
		pip.textContent = suit;
		pip.style.gridColumn = "2";
		pip.style.gridRow = `${row + 1} / span 4`;
		pip.style.fontSize = `${pipFontSize}px`;
		pip.style.display = "flex";
		pip.style.alignItems = "center";
		pip.style.justifyContent = "center";
		card.appendChild(pip);
	});

	// Top-left corner: rank and suit
	const top = document.createElement("div");
	top.innerHTML = `<div>${rank}</div><div style="text-align:center">${suit}</div>`;
	top.style.position = "absolute";
	top.style.left = "6px";
	top.style.top = "4px";
	top.style.fontSize = Math.floor(height * 0.08) + "px";
	card.appendChild(top);

	// Bottom-right corner: rotated rank and suit
	const bottom = top.cloneNode(true);
	bottom.style.left = "";
	bottom.style.right = "6px";
	bottom.style.top = "";
	bottom.style.bottom = "4px";
	bottom.style.transform = "rotate(180deg)";
	bottom.style.textAlign = "center";
	card.appendChild(bottom);

	return card;
}
function createCard343(rank = "10", suit = "♣", width = 240, height = 336) {
	const card = document.createElement("div");
	card.style.position = "relative";
	card.style.width = width + "px";
	card.style.height = height + "px";
	card.style.border = "1px solid black";
	card.style.borderRadius = "12px";
	card.style.background = "white";
	card.style.fontFamily = "serif";
	card.style.display = "grid";
	card.style.gridTemplateColumns = "1fr 1fr 1fr";
	card.style.gridTemplateRows = "repeat(12, 1fr)";
	card.style.boxSizing = "border-box";

	const pipFontSize = height * 0.09;

	// Utility to create and place a pip
	function placePip(col, row, span) {
		const pip = document.createElement("div");
		pip.textContent = suit;
		pip.style.gridColumn = col;
		pip.style.gridRow = `${row} / span ${span}`;
		pip.style.fontSize = `${pipFontSize}px`;
		pip.style.display = "flex";
		pip.style.alignItems = "center";
		pip.style.justifyContent = "center";
		card.appendChild(pip);
	}

	// Left column: 3 pips (each spans 3 rows), centered in 12 rows
	[1, 5, 9].forEach(r => placePip(1, r, 3));

	// Center column: 4 pips (each spans 2 rows), evenly spaced
	[1, 4, 7, 10].forEach(r => placePip(2, r, 2));

	// Right column: 3 pips (each spans 3 rows), same as left
	[1, 5, 9].forEach(r => placePip(3, r, 3));

	// Top-left corner: rank and suit
	const top = document.createElement("div");
	top.innerHTML = `<div>${rank}</div><div style="text-align:center">${suit}</div>`;
	top.style.position = "absolute";
	top.style.left = "6px";
	top.style.top = "4px";
	top.style.fontSize = Math.floor(height * 0.08) + "px";
	card.appendChild(top);

	// Bottom-right corner: rotated rank and suit
	const bottom = top.cloneNode(true);
	bottom.style.left = "";
	bottom.style.right = "6px";
	bottom.style.top = "";
	bottom.style.bottom = "4px";
	bottom.style.transform = "rotate(180deg)";
	bottom.style.textAlign = "center";
	card.appendChild(bottom);

	return card;
}


function showCollection(dParent, callback, styles = {}) {
	// {	container,	imageUrlCallback,   // function(index) => url	imageWidth = 300,	imageHeight = 200,	bufferPages = 1,	imagesPerRow = 3}) {
	let imageHeight = valf(styles.h, 100);
	let imageWidth = valf(styles.w, imageHeight);
	let bufferPages = 1;
	let wParent = mGetStyle(dParent, 'w'); console.log('parent width', dParent.clientWidth);
	let imagesPerRow = Math.floor(wParent / imageWidth); console.log(imagesPerRow); //10;
	let page = 0;
	let isLoading = false;
	const imagesPerPage = imagesPerRow * Math.ceil(window.innerHeight / imageHeight);

	function loadImages() {
		if (isLoading) return;
		isLoading = true;

		const fragment = document.createDocumentFragment();
		for (let i = 0; i < imagesPerPage * (1 + bufferPages); i++) {
			const index = page * imagesPerPage + i;
			const img = document.createElement("img");
			img.src = callback(index);
			img.loading = "lazy";
			img.className = "lazy-img";
			img.width = imageWidth;
			img.height = imageHeight;
			fragment.appendChild(img);
		}
		dParent.insertBefore(fragment, sentinel);
		page++;
		isLoading = false;
	}

	// Sentinel element to observe scrolling near bottom
	const sentinel = document.createElement("div");
	sentinel.style.height = "1px";
	dParent.appendChild(sentinel);

	const observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			loadImages();
		}
	}, {
		rootMargin: "200px"
	});

	observer.observe(sentinel);

	// Initial load
	loadImages();
}


function createLazyImageLoader({
	container,
	imageUrlCallback,   // function(index) => url
	imageWidth = 300,
	imageHeight = 200,
	bufferPages = 1,
	imagesPerRow = 3
}) {
	let page = 0;
	let isLoading = false;
	const imagesPerPage = imagesPerRow * Math.ceil(window.innerHeight / imageHeight);

	function loadImages() {
		if (isLoading) return;
		isLoading = true;

		const fragment = document.createDocumentFragment();
		for (let i = 0; i < imagesPerPage * (1 + bufferPages); i++) {
			const index = page * imagesPerPage + i;
			const img = document.createElement("img");
			img.src = imageUrlCallback(index);
			img.loading = "lazy";
			img.className = "lazy-img";
			img.width = imageWidth;
			img.height = imageHeight;
			fragment.appendChild(img);
		}
		container.insertBefore(fragment, sentinel);
		page++;
		isLoading = false;
	}

	// Sentinel element to observe scrolling near bottom
	const sentinel = document.createElement("div");
	sentinel.style.height = "1px";
	container.appendChild(sentinel);

	const observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			loadImages();
		}
	}, {
		rootMargin: "200px"
	});

	observer.observe(sentinel);

	// Initial load
	loadImages();
}

function _showCollection(key) {
	const imageContainer = document.getElementById("image-container");
	const imagesPerPage = 20; // Adjust depending on image size/layout
	let page = 0;
	let isLoading = false;

	function loadImages(pageNum) {
		if (isLoading) return;
		isLoading = true;

		// Simulated image URLs (replace with real source or API call)
		const urls = Array.from({ length: imagesPerPage }, (_, i) =>
			`https://picsum.photos/300/200?random=${pageNum * imagesPerPage + i}`
		);

		urls.forEach(url => {
			const img = document.createElement("img");
			img.src = url;
			img.loading = "lazy";
			img.style = "margin: 4px; width: 300px; height: 200px;";
			imageContainer.appendChild(img);
		});

		isLoading = false;
	}

	// Set up observer for triggering load when nearing bottom
	const sentinel = document.createElement("div");
	sentinel.id = "sentinel";
	imageContainer.appendChild(sentinel);

	const observer = new IntersectionObserver(entries => {
		if (entries[0].isIntersecting && !isLoading) {
			page++;
			loadImages(page);
		}
	}, {
		rootMargin: "100px" // Start loading slightly before reaching the bottom
	});

	observer.observe(sentinel);

	// Initial load: just enough to fill viewport + one more page
	function preloadInitial() {
		const viewportHeight = window.innerHeight;
		let imagesLoaded = 0;

		const tempImg = document.createElement("img");
		tempImg.src = "https://picsum.photos/300/200";
		tempImg.style.display = "none";
		document.body.appendChild(tempImg);

		tempImg.onload = () => {
			const imgHeight = tempImg.naturalHeight;
			const imagesPerViewport = Math.ceil(viewportHeight / imgHeight) * 2;

			for (let i = 0; i < imagesPerViewport; i++) {
				const url = `https://picsum.photos/300/200?random=${i}`;
				const img = document.createElement("img");
				img.src = url;
				img.loading = "lazy";
				img.style = "margin: 4px; width: 300px; height: 200px;";
				imageContainer.insertBefore(img, sentinel);
			}

			document.body.removeChild(tempImg);
		};
	}

	preloadInitial();
}


async function showCollection(key, d, styles = {}, opts = {}) {
	mClear(d);
	mClass(d, 'symbolContainer');
	mDom(d, { className: 'symbol' }, { html: '<div class="symbol">&#x2718;</div>' });
	mStyle(document.body, { className: 'symbolContainer' })

	for (const k of M.byCollection[key]) {
		let sym = M.superdi[k];
		let d1 = mDom(d, { margin: 10 });
		//mDom(d1,{},{tag:'pre',html:sym.text});
		mDom(d1, { className: 'symbol' }, { html: `<div class="symbol">${sym.text}</div>` }); //sym.text
		let dimg = await mKey(k, d1, styles, opts);
		let dlabel = mDom(d1, { align: 'center', fz: 12, bg: 'yellow', fg: 'black' }, { html: k });
	}
}

//#region generateSvgWithImage
// --- Example Usage (assuming you have an HTML element with id="svgContainer") ---
// You would call this function and inject the returned SVG string into your HTML.

/*
// Example: Generate SVG for a hypothetical image and display it
const myImageFilename = 'images/my_card_figure.png'; // Replace with your actual image path/URL
const svgContainer = document.getElementById('svgContainer'); // Replace with the ID of your container element

if (svgContainer) {
	const generatedSvg = generateSvgWithImage(myImageFilename, 150, 200); // Generate SVG with specific dimensions
	svgContainer.innerHTML = generatedSvg; // Inject the generated SVG into the HTML
} else {
	console.warn("HTML element with id 'svgContainer' not found. Cannot display example SVG.");
}
*/

// --- Example of how you might use this in your card display logic ---
/*
// Inside your displayCard function, when you determine the card requires an image:
const cardKey = rankKey + suitKey; // e.g., 'KH'
const imagePath = getImageForCard(cardKey); // You would need a function like this

if (imagePath) {
	const cardSVG = generateSvgWithImage(imagePath, 100, 140); // Adjust dimensions as needed
	// Then inject cardSVG into your card container HTML structure
	cardContainer.innerHTML = `
			<div class="card-corner ${textColorClass}">
					<span>${rank}</span>
					<span>${suit}</span>
			</div>
			<div class="card-figure">
					${cardSVG}
			</div>
			<div class="card-corner ${textColorClass} transform rotate-180">
					<span>${rank}</span>
					<span>${suit}</span>
			</div>
	`;
} else {
	// Fallback to text or handle cards without images
}

// You would need a function like this to map card keys to image paths
function getImageForCard(cardKey) {
	const imageMap = {
			'KH': 'images/king_of_hearts.png',
			'QS': 'images/queen_of_spades.png',
			// ... add paths for all your face card images
	};
	return imageMap[cardKey] || null; // Return image path or null if not found
}
*/

//#endregion


function replaceFillRedWithParam(svgString, color) {
	return svgString.replace(/fill=['"]red['"]/g, `fill='${color}'`);
}
function replaceStrokeRedWithParam(svgString, color) {
	return svgString.replace(/stroke=['"]red['"]/g, `stroke='${color}'`);
}
function replaceFillBlackWithParam(svgString, color) {
	return svgString.replace(/fill=['"]black['"]/g, `fill='${color}'`);
}
function replaceStrokeBlackWithParam(svgString, color) {
	return svgString.replace(/stroke=['"]black['"]/g, `stroke='${color}'`);
}
function replaceColorsInCard(s, by) {
	let snew = replaceFillRedWithParam(s, by);
	snew = replaceStrokeRedWithParam(snew, by);
	snew = replaceFillBlackWithParam(snew, by);
	snew = replaceStrokeBlackWithParam(snew, by);
	return snew;

}
function renderCard(key, color, border) {
	let svg = __cardSvgs[key];
	let [r, s] = key;
	if ('0123456789TA'.includes(r)) {
		let beforeRect = stringBeforeLast(svg, '<rect');
		let afterRect = stringAfterLast(svg, '/rect>');
		let between = stringBetween(svg, beforeRect, afterRect); console.log('between', between)
		svg = replaceColorsInCard(beforeRect, color) + replaceColorsInCard(between, border) + replaceColorsInCard(afterRect, color);

	} else {

	}
	return svg;
}
function renderCard(cardKey, targetDiv) {
	if (!targetDiv || !(targetDiv instanceof HTMLElement)) {
		throw new Error("Invalid target element.");
	}

	const svgHtml = getCardSvg(cardKey);
	targetDiv.innerHTML = svgHtml;
}

async function mToggleButton(dParent, styles = {}) {
	addKeys({ display: 'flex', wrap: 'wrap', aitems: 'center' }, styles)
	let d1 = mDom(dParent, styles);
	let list = Array.from(arguments).slice(2);
	let buttons = [];
	let style = { hpadding: 4, display: 'flex', 'flex-wrap': 'nowrap', 'align-items': 'center', cursor: 'pointer' };
	for (const l of list) {
		let b = mDom(d1, style, { onclick: l.onclick });
		mDom(b, { maright: 6 }, { html: l.label });
		if (l.key) await mKey(l.key, b, { h: styles.h, fz: styles.h }); //:fz:valf(styles.h,50) });
		buttons.push(b);
	}
	return mToggleCompose(...buttons);
}
async function mToggleButton(dParent, styles = {}) {
	addKeys({ display: 'flex', wrap: 'wrap', aitems: 'center' }, styles)
	let d1 = mDom(dParent, styles);
	let list = Array.from(arguments).slice(2);
	let buttons = [];
	let style = { display: 'flex', 'flex-wrap': 'nowrap', aitems: 'center', cursor: 'pointer' };

	let words = list.map(x => x.label);
	let w = getMaxWordWidth(words, d1) + styles.h * 1.25 + 2; console.log(w);
	mStyle(d1, { w });

	for (const l of list) {

		let b = mDom(d1, style, { onclick: l.onclick });
		mDom(b, { maright: 6 }, { html: l.label });
		await mKey(l.key, b, { h: styles.h, w: styles.h, fz: styles.h }); //:fz:valf(styles.h,50) });

		// let dAuto = mDom(d1,{ cursor: 'pointer'}, { onclick: uiAuto });	
		// mDom(dAuto, {}, { html: 'uiState:' });
		// await mKey('display', dAuto,{sz:24});

		buttons.push(b);

	}

	return mToggleCompose(...buttons);

}

function _mFlex(d, or = 'h') {
	d = toElem(d);
	d.style.display = 'flex';
	d.style.flexFlow = (or == 'v' ? 'column' : 'row') + ' ' + (or == 'w' ? 'wrap' : 'nowrap');
}
function _mFlexBaseline(d) { mStyle(d, { display: 'flex', 'align-items': 'baseline' }); }
function _mFlexLR(d) { mStyle(d, { display: 'flex', 'justify-content': 'space-between', 'align-items': 'center' }); }
function _mFlexLine(d, startEndCenter = 'center') { mStyle(d, { display: 'flex', 'justify-content': startEndCenter, 'align-items': 'center' }); }
function _mFlexSpacebetween(d) { mFlexLR(d); }
function _mFlexV(d) { mStyle(d, { display: 'flex', 'align-items': 'center' }); }
function _mFlexVWrap(d) { mStyle(d, { display: 'flex', 'align-items': 'center', 'flex-flow': 'row wrap' }); }
function _mFlexWrap(d) { mFlex(d, 'w'); }
async function showStateButtons(d) {
	//uiState manual or auto
	let d1 = mDom(d, { maleft: 10, bg: 'black', fg: 'white', hpadding: 4, h: 24, w: 84 }); mFlexV(d1);




	mDom(d1, {}, { html: 'uiState:' });
	let bManual = DA.bManual = await mKey('hand', d1, { h: 24, w: 24, cursor: 'pointer', round: true }, { id: 'bManual', onclick: uiAuto });
	let bAuto = DA.bAuto = await mKey('robot', d1, { h: 24, w: 24, cursor: 'pointer', round: true }, { id: 'bAuto', onclick: uiManual });
	DA.dControlUiState = mToggleButton(bAuto, bManual);

	// let bPoll = DA.bPoll = await mKey('circle_right', d, { fz:24,cursor: 'pointer', round: true, fg: 'green' }, { onclick: pollResume });
	// let bStop = DA.bStop = await mKey('circle_stop', d, { fz:24,cursor: 'pointer', round: true, fg: 'red' }, { onclick: pollStop });
	// dController = mToggleButton(bPoll, bStop);

}
async function test0_game1() {
	DA.gamelist = ['setgame', 'button96']; //'accuse aristo bluff ferro fishgame fritz huti lacuna nations setgame sheriff spotit wise'; if (DA.TEST0) gamelist += ' a_game'; gamelist = toWords(gamelist);
	DA.funcs = { setgame: setgame(), button96: button96() }; //implemented games!
	for (const gname in DA.gamelist) {
		if (isdef(DA.funcs[gname])) continue;
		DA.funcs[gname] = defaultGameFunc();
	}

	await loadAssetsStatic();
	await loadTables();

	let elems = mLayoutTM('dPage'); mStyle('dMain', { overy: 'auto' }); mCenterFlex('dMain');

	mLayoutTopTestExtraMessageTitle('dTop'); mFlexV('dTop'); //mStyle('dTop', { hmin: 32 }); mStyle('dExtra', { hmin: 32 })

	let names = ['amanda', 'felix', 'lauren', 'mimi', 'gul'];
	let d = mBy('dTestRight'); mFlexV(d);
	for (const name of names) { let b = mDom(d, { className: 'button' }, { tag: 'button', html: name, onclick: async () => await switchToUser(name) }); }

	//await mSleep(rNumber(0,2000));
	let username = rChoose(names); //['felix','lauren','diana','mimi','amanda','guest','gul']); //localStorage.getItem('username') ?? 'hans'; 
	//if (username == 'felix') username = 'mimi'; else { username = 'felix';}
	await switchToUser(username);

	d = mBy('dTestLeft'); mFlexV(d);
	// mDom(d, { className: 'button', bg: 'green' }, { tag: 'button', html: 'POLL', onclick: pollResume });
	// mDom(d, { className: 'button', bg: 'red' }, { tag: 'button', html: 'STOP', onclick: pollStop });
	let bPoll = await mKey('circle_right', d, { fz: 24, cursor: 'pointer', round: true, fg: 'green' }, { onclick: pollResume });
	let bStop = await mKey('circle_stop', d, { fz: 24, cursor: 'pointer', round: true, fg: 'red' }, { onclick: pollStop });
	// let bExpand = await mKey('circle_chevron_down', dParent, styles, { tag: 'button', onclick: expandAll });
	// let bCollapse = await mKey('circle_chevron_up', dParent, styles, { tag: 'button', onclick: collapseAll });
	dController = mToggleButton(bPoll, bStop);
	mDom(d, { className: 'button', maleft: 10 }, { tag: 'button', html: 'delete', onclick: async () => await tablesDeleteAll() });

	//await showGamesAndTables();
	//pollChangeState('lobby');


}
async function tableCreate(gamename, players, options) {
	if (nundef(gamename)) gamename = "setgame";
	if (nundef(players)) players = { mimi: userToPlayer('mimi', gamename), felix: userToPlayer('felix', gamename), amanda: userToPlayer('amanda', gamename) };
	if (nundef(options)) options = MGetGameOptions(gamename);
	console.log('tableCreate', gamename, players, options);
	let me = UGetName();
	let playerNames = [me]; console.log('me', me)
	assertion(me in players, "_createOpenTable without owner!!!!!")
	for (const name in players) { addIf(playerNames, name); }
	let table = {
		status: 'open',
		id: generateTableId(),
		fen: null,
		game: gamename,
		owner: playerNames[0],
		friendly: generateTableName(playerNames.length, []), //MGetTableNames()),
		players,
		playerNames: playerNames,
		options
	};
	let tid = table.id;
	let tData = table;
	let res = await mPhpPost('mox0', { action: 'create', tid, tData });
	if (res.tid) {
		console.log("Game Creation:", res.tid);
		let data = M.tables[tid] = await tableGetDefault(res.tid); console.log(data);
		M.tableFilenames.push(tid);
		DA.tid = tid; DA.tData = tData;
	} else {
		console.log("Game Creation failed");
		return null;
	}
	return table;
}

async function showTable(id) {
	let me = UGetName();
	DA.pollFunc = 'showTable';
	let tid = valf(id, DA.tid);
	if (nundef(tid)) tid = valf(localStorage.getItem('tid'), arrLast(Object.keys(M.tables)));
	if (nundef(tid)) { return await showTables(); }
	DA.tid = tid;
	let tData = await loadStaticYaml(`y/tables/${tid}.yaml`);
	if (!tData) { showMessage('table deleted!'); return await showTables(); }
	let changes = deepCompare(M.tables[tid], tData);
	if (!changes) { return console.log('no changes', changes, tid); }
	console.log('changes', changes);
	M.tables[tid] = DA.tData = tData;
	let func = DA.funcs[tData.game];
	T = tData;
	clearMain();
	mClassRemove('dExtra', 'p10hide');
	showTitleGame(tData);
	if (func.hasInstruction) prepInstruction(tData);
	func.prepLayout(tData);
	let items = [];
	await func.stats(tData);
	if (tData.status == 'over') { showGameover(tData, 'dTitle'); return; }
	assertion(tData.status == 'started', `showTable status ERROR ${tData.status}`);
	func.activate(tData, items);
}

async function onsockConfig(x) {
	console.log('SOCK::config', x)
	Serverdata.config = x; console.log(Serverdata.config);
}
async function onsockEvent(x) {
	console.log('SOCK::event', x)
	if (isdef(Serverdata.events)) Serverdata.events[x.id] = x;
}
async function onsockMerged(x) {
	console.log('SOCK::merged', x)
	if (!isSameTableOpen(x.id)) return;
	await showTable(x);
}
async function onsockPending(id) {
	console.log('SOCK::pending', id)
	if (!isSameTableOpen(id)) return;
	await showTable(id);
}
async function onsockSuperdi(x) {
	console.log('SOCK::superdi', x)
}
async function onsockTable(x) {
	console.log('SOCK::table', x);
	let [msg, id, turn, isNew] = [x.msg, x.id, x.turn, x.isNew];
	let menu = getMenu();
	let me = UGetName();
	console.log('menu', menu, 'me', me, 'turn', turn, 'isNew', isNew)
	if (turn.includes(me) && menu == 'play') { Tid = id; await switchToMainMenu('table'); }
	else if (isNew && menu == 'play') { Tid = id; await switchToMainMenu('table'); }
	else if (menu == 'table') await showTable(id);
	else if (menu == 'play') await showGamesAndTables();
}
async function onsockTables(x) {
	console.log('SOCK::tables', x)
	let menu = getMenu();
	if (menu == 'play') await showTables('onsockTables');
	else if (menu == 'table') {
		assertion(isdef(T), "menu table but no table!!!")
		let id = T.id;
		let exists = x.find(t => t.id == id);
		if (nundef(exists)) { Tid = T = null; await switchToMenu(UI.nav, 'play'); }
	}
}
function sockInit(port = '3000') {
	let type = detectSessionType();
	let server = type == 'live' ? `http://localhost:${port}` : type == 'fastcomet' ? `https://moxito.online:${port}` : null;//getServer(); //getServerurl();
	console.log('::sockInit:', type, server); return;
	if (!server) { console.log('::sockInit: NO SOCKETS!!!', type, server); return; }

	Socket = io(server);
	Socket.on('disconnect', x => console.log('::io disconnect:', x));
	Socket.on('connection', x => console.log('::io connect:', x));
	// Socket.on('config', onsockConfig);
	// Socket.on('event', onsockEvent);
	Socket.on('message', o => console.log('message', o)); //showChatMessage);
	// Socket.on('merged', onsockMerged);
	// Socket.on('pending', onsockPending);
	// Socket.on('table', onsockTable);
	// Socket.on('tables', onsockTables);
	// Socket.on('superdi', onsockSuperdi);
}
function sockPostUserChange(oldname, newname) {
	Socket.emit('userChange', { oldname, newname });
}
async function mPhpGetFiles(dir, projectName = 'ilms', verbose = false, jsonResult = true) {
	let server = getServer();
	if (verbose) console.log('to php:', server + `${projectName}/php/mox0.php`, dir);
	let res = await fetch(server + `${projectName}/php/list_files.php?dir=${encodeURIComponent(dir)}`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		}
	);
	let text;
	try {
		text = await res.text();
		if (!jsonResult) {
			return text;
		}
		let obj = JSON.parse(text);
		if (verbose) console.log('from php:\n', obj);
		let mkeys = ["config", "superdi", "users", "details"];
		for (const k of mkeys) {
			if (isdef(obj[k])) {
				M[k] = obj[k];
				if (k == "superdi") {
					loadSuperdiAssets();
				} else if (k == "users") {
					loadUsers();
				}
			}
		}
		return obj;
	} catch (e) {
		return isString(text) ? text : e;
	}
}

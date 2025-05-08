onload = start; VERBOSE = true; TESTING = true;

function start() { test0_lazyload(); }

async function test0_lazyload() {
	let t = getNow();
	t = showTimeSince(t);
	// await loadAssetsFast();
	await loadAssetsStatic();
	t = showTimeSince(t);

	createStickyAndContentDivs();

	console.log('colors',M.colorNames);
	mStyle(document.body,{bg:M.colorByName.beaver.hex,fg:'white'})
	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); mCenterFlex('dMain');
	//let dFilter = mDom('dMain',{bg:'violet'},{html:uiFilterElement()}); //mAppend('dMain', dFilter)
	for (const k in M.superdi) { M.superdi[k].key = k; }

	let dTop = mDom('dSticky',{bg:'black',fg:'white',w100:true,box:true,padding:10, gap:10, display:'flex', wrap:true}, { id: 'dTop' });
	let keys = await uiFilterMenu('dTop', 'all'); //console.log(keys)
	let dParent = mDom('dMain', { display: 'flex', gap: 10, padding: 10, wrap: true, w100: true, box: true }, { id: "table", });
	//keys = M.byCollection.emo;
	//let keys = 'turkey turtle twelve_oclock twelve_thirty two_hearts two_hump_camel two_oclock two_thirty umbrella';keys=keys.split(' ');
	let sz = 200;
	let style = { fz: sz / 1.25, w: sz, h: sz, box: true, padding: 4, fg: 'skyblue' };

	//machzuerst nur 100, dann mehr
	let i = 0;
	for (const k of keys) {
		let o = M.superdi[k];
		let d1 = mDom(dParent, { display: 'grid' });
		await mKey(k, d1, style, { prefer: 'fa6' }); //, html: o.fa6 }); //'data-innerHTML': o.fa6 });
		mDom(d1, { w100: true, wmax: sz, fg: 'black', 'text-overflow': 'ellipsis', 'white-space': 'nowrap', overflow: 'hidden', fz: 16, align: 'center' }, { html: o.key })
		if (++i % 100 == 0) await mSleep(10);
		//console.log(o); return;
	}

	// let images = keys.map(x => M.superdi[x]).filter(x => isdef(x.img)); //allImages);//.map(x => x.path); console.log(images)
	// console.log(images[10])
	// for (const o of images) {
	// 	let d1 = mDom(dParent, { display: 'grid' });
	// 	mDom(d1, style, { tag: 'img', 'data-src': o.img })
	// 	mDom(d1, { w100: true, wmax: sz, fg: 'black', 'text-overflow': 'ellipsis', 'white-space': 'nowrap', overflow: 'hidden', fz: 16, align: 'center' }, { html: o.key })
	// }

	//lazyLoad('innerHTML'); //Images();

	//downloadAsYaml(M, 'm');
}

async function test0_showCollections1() {
	await loadAssetsStatic();

	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); mCenterFlex('dMain');
	let dLeft = mBy('dLeft');
	let family = "'Noto Sans', sans-serif"; // "Arial Unicode MS"; //'"Segoe UI", "DejaVu Sans", "Arial Unicode MS", sans-serif'
	let styles = { family, fz: 48, sz: 100, bg: 'white', fg: 'black' };

	// let dParent = mDom('dMain', { display: 'flex', wrap: true, w:500 }, { id: "table", });
	let dParent = mDom('dMain', { display: 'flex', wrap: true, w100: true, box: true }, { id: "table", });
	iconViewer();
	return;

	// let container = mDom('dMain', { display: 'flex', wrap: true, w100:true, box:true }, { id: "image-container", });
	let container = mDom('dMain', { display: 'flex', wrap: true, w: 500 }, { id: "image-container", });

	// Example usage
	//const container = document.getElementById("image-container");
	let images = dict2list(M.allImages).map(x => x.path); console.log(images)

	showCollection(container, index => images[index], { h: 100 });
	// createLazyImageLoader({
	// 	container: container,
	// 	imageUrlCallback: index => images[index], //`https://picsum.photos/300/200?random=${index}`,
	// 	imageWidth: 100,
	// 	imageHeight: 100,
	// 	bufferPages: 1,
	// 	imagesPerRow: 3
	// });

	// showCollection();


	//collections and categories zeigen
	//filter zeigen
	//alles rausfiltern und zeigen
}
async function test0_showMathSymbols() {
	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); mCenterFlex('dMain');
	let d = mGrid(null, 5, 'dMain');

	for (const k of MathKeys) {
		let text = Symbols[k];
		let d1 = mDom(d, { margin: 10, display: 'grid', bg: 'pink', justify: 'center', align: 'center' });
		//mDom(d1,{},{tag:'pre',html:sym.text});
		//let dSym = mDom(d1, {  }, { html: `<div class="symbol">${text}</div>` }); //sym.text
		let dSym = mDom(d1, { className: 'symbol' }, { html: text }); //sym.text
		let dlabel = mDom(d1, { align: 'center', fz: 12, bg: 'yellow', fg: 'black' }, { html: k });
	}
}
async function test0_showSymbols() {
	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); mCenterFlex('dMain');
	let d = mGrid(null, 5, 'dMain');

	for (const k in newDict) {
		if (nundef(Symbols[k])) {
			let text = newDict[k];
			let d1 = mDom(d, { margin: 10 });
			//mDom(d1,{},{tag:'pre',html:sym.text});
			let dSym = mDom(d1, { className: 'symbol' }, { html: `<div class="symbol">${text}</div>` }); //sym.text
			let dlabel = mDom(d1, { align: 'center', fz: 12, bg: 'yellow', fg: 'black' }, { html: k });

		} else if (Symbols[k] != newDict[k]) {
			let text = newDict[k];
			let d1 = mDom(d, { margin: 10 });
			//mDom(d1, {}, {tag:'pre', html:sym.text});
			let dNew = mDom(d1, { className: 'symbol' }, { html: `<div class="symbol">${newDict[k]}</div>` }); //sym.text
			let dSym = mDom(d1, { className: 'symbol' }, { html: `<div class="symbol">${Symbols[k]}</div>` }); //sym.text
			let dlabel = mDom(d1, { align: 'center', fz: 12, bg: 'yellow', fg: 'black' }, { html: k });
			//mStyle(dSym, { bg: 'red' });
		}
	}


	console.log(arrMinus(Object.keys(newDict), Object.keys(Symbols)));
	console.log(arrMinus(Object.values(newDict), Object.values(Symbols)));
	// console.log(arrMinus(Object.keys(Symbols),Object.keys(Symbols1))); 
	return;

}
async function test0_showCollections() {

	await loadAssetsStatic();

	for (const k of MathKeys) {
		if (nundef(M.superdi[k])) console.log('missing key', k);
	}
	return;
	//console.log(M.byCollection.unicode); return;

	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); mCenterFlex('dMain');
	let dLeft = mBy('dLeft');
	let family = "'Noto Sans', sans-serif"; // "Arial Unicode MS"; //'"Segoe UI", "DejaVu Sans", "Arial Unicode MS", sans-serif'
	let styles = { family, fz: 48, sz: 100, bg: 'white', fg: 'black' };
	let opts = { prefer: 'text' };
	for (const k of M.collections) {
		mDom(dLeft, {}, { tag: 'button', 'html': k, onclick: ev => showCollection(k, 'dMain', styles, { prefer: ev.target.innerHTML == 'unicode' ? 'text' : null }) }); mLinebreak(dLeft)
	}

	await showCollection('unicode', 'dMain', styles, opts);
	return;
	let d = mDom('dPage'); mStyle(d, { gap: 10, display: 'flex', wrap: true, padding: 10 });
	let keys = filterKeys('emo', 'sport', x => x.img && x.img.includes('emo'));// console.log(keys); //return;
	for (const i of range(30)) {
		let sym = M.superdi[rChoose(keys)];// console.log(sym);
		let src = sym.img;
		let svg = generateSvgWithImage(src, 200, 200)
		let d1 = mDom(d, { h: 200, w: 200, display: 'grid' });
		mDom(d1, {}, { html: svg }); //return;
	}

}
async function test0_imageSymbols() {
	await loadAssetsStatic();
	let dict = M.c52Symbols = await loadStaticYaml('assets/c52symbols.yaml');
	//console.log('c52Symbols', M.c52Symbols);
	//console.log(M)
	let d = mDom('dPage'); mStyle(d, { gap: 10, display: 'flex', wrap: true, padding: 10 });

	mDom(d, { h: 200, w: 140 }, { html: __cardSvgs['TC'] });

	for (const rank of range(1, 11)) {
		d.appendChild(createCard('' + rank, "♣", 100));
	}

	// 	// Example usage:
	// 	d.appendChild(createCard("10", "♣", 240, 336));
	// 	d.appendChild(createCard1("10", "♣", 240, 336));
	// //	d.appendChild(createCard2("10", "♣", 240, 336));
	// 	d.appendChild(createCard3("10", "♣", 240, 336));
	// 	d.appendChild(createCard343("10", "♣", 240, 336));
	// 	d.appendChild(createCardGrid("10", "♣", 240, 336));
	return;

	let keys = filterKeys('emo', 'sport', x => x.img && x.img.includes('emo'));// console.log(keys); //return;
	for (const i of range(30)) {
		svg = createCardSVG("2H", "VC2", "SC2"); console.log(svg)
		let d1 = mDom(d);
		mAppend(d1, svg); //return;

		// let sym = M.superdi[rChoose(keys)];// console.log(sym);
		// let src = sym.img;
		// let svg = generateSvgWithImage(src, 200, 200)
		// let d1 = mDom(d, { h: 200, w: 200, display: 'grid' });
		//mDom(d1, {}, { html: svg }); return;
	}
}
async function test0_createCard() {
	await loadAssetsStatic();
	let dict = M.c52Symbols = await loadStaticYaml('assets/c52symbols.yaml');
	//console.log('c52Symbols', M.c52Symbols);
	//console.log(M)
	let d = mDom('dPage'); mStyle(d, { gap: 10, display: 'flex', wrap: true, padding: 10 });
	let keys = filterKeys('emo', 'sport', x => x.img && x.img.includes('emo'));// console.log(keys); //return;
	for (const i of range(30)) {
		svg = createCardSVG("2H", "VC2", "SC2"); console.log(svg)
		let d1 = mDom(d);
		mAppend(d1, svg);
	}
}
async function test0_displayEmoAsSymbol() {
	await loadAssetsStatic();
	let dict = M.c52Symbols = await loadStaticYaml('assets/c52symbols.yaml');
	//console.log('c52Symbols', M.c52Symbols);
	//console.log(M)
	let d = mDom('dPage'); mStyle(d, { gap: 10, display: 'flex', wrap: true, padding: 10 });
	let keys = filterKeys('emo', 'sport', x => x.img && x.img.includes('emo'));// console.log(keys); //return;
	for (const i of range(30)) {
		let sym = M.superdi[rChoose(keys)];// console.log(sym);
		let src = sym.img;
		let svg = generateSvgWithImage(src, 200, 200)
		let d1 = mDom(d, { h: 200, w: 200, display: 'grid' });
		mDom(d1, {}, { html: svg });
	}
}
async function test0_displayImgAsSymbol() {
	await loadAssetsStatic();
	let dict = M.c52Symbols = await loadStaticYaml('assets/c52Symbols.yaml');
	//console.log('c52Symbols', M.c52Symbols);
	//console.log(M)
	let d = mDom('dPage'); mStyle(d, { gap: 10, display: 'flex', wrap: true, padding: 10 });
	for (const i of range(3)) {
		let src = rChoose(Object.values(M.allImages)); console.log(src);
		let svg = generateSvgWithImage(src.path, 200, 200)
		let d1 = mDom(d, { h: 200, w: 200, display: 'grid' });
		mDom(d1, {}, { html: svg });
	}
}
async function test0_displaySymbols() {
	await loadAssetsStatic();
	let dict = M.c52Symbols = await loadStaticYaml('assets/c52Symbols.yaml');
	//console.log('c52Symbols', M.c52Symbols);
	console.log(M)
	let d = mDom('dPage'); mStyle(d, { gap: 10, display: 'flex', wrap: true, padding: 10 });
	for (const s in dict) {
		//console.log(s, dict[s]);
		let d1 = mDom(d, { h: 200, w: 200, display: 'grid' });
		displaySymbol(dict[s], d1); //return;
		mDom(d1, {}, { html: s });
	}
}
async function test0_symbols() {
	let d = mDom('dPage'); mStyle(d, { gap: 10, display: 'flex', wrap: true, padding: 10 });
	let dict = {};
	for (const key in __cardSvgs) {
		let svg = __cardSvgs[key];
		extractSymbols(svg, dict);
		//let dc = mDom(d, { h: 200, w: 140 }, { html: svg });
	}
	console.log('dict', dict);
	downloadAsYaml(dict, 'symbols');
}
async function test0_svgcard() {
	//await DAInit();
	let d = mDom('dPage'); mStyle(d, { gap: 10, display: 'flex', wrap: true, padding: 10 });
	for (const key of ['2H', 'KS', 'TC']) {
		let svg = __cardSvgs[key];
		svg = updateSuit(svg, 'H');
		let dc = mDom(d, { h: 200, w: 140 }, { html: svg });
	}
}
async function test0_c52() {
	//await DAInit();
	let d = mDom('dPage'); mStyle(d, { gap: 10, display: 'flex', wrap: true, padding: 10 });
	for (const r of toWords('2 3 4 5 6 7 8 9 T J Q K A')) {
		for (const s of toWords('S H D C')) {
			let key = `${r}${s}`;
			let svg = __cardSvgs[key];
			svg = replaceCardLabel(svg, 'H');

			let parts = svg.split("fill='white' stroke='black'");
			let [color, bg, border] = [rColor(), rColor(), rColor()];
			svg = replaceColorsInCard(parts[0], color) + ` fill='${bg}' stroke='${border}' ` + replaceColorsInCard(parts[1], color);

			//let code = renderCard(key,'green','orange'); console.log(code)
			let dc = mDom(d, { h: 200, w: 140 }, { html: svg });
			//let dc=mDom(d,{h:200,w:140});
			//renderCardInContainer(key,rColor(),rColor(),dc)

		}
	}
	// let dc = mDom(d, { h: 200, w: 140 }, { html: cardSvgs['0J'] });
	// dc = mDom(d, { h: 200, w: 140 }, { html: cardSvgs['1J'] });
	//showDeck(['2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD', 'AD'],'dPage','left',100,100);
}

async function test0_delete_and_create() {
	let res = await deleteGames(); console.log('res', res);
	res = await pyStartGame(); console.log('res', res);
}
async function test0_folding() {
	// --- Example usage ---
	const result = testCartesianFunctions();
	console.log("Compact:", result.compact);
	console.log("Expanded:", result.expanded);

}
async function test0_flask() {
	await DAInit(true);
	await clickOn('games');
	if (TESTING) await clickOn(rChoose(['gul', 'felix', 'amanda', 'lauren', 'mimi'])); await mSleep(10);
	await clickOn(DA.bPoll); //starts
	await clickOn(DA.bPoll); //stops
}
async function test0_game0() {
	await DAInit(true);

	await clickOn('games');
	if (TESTING) await clickOn(rChoose(['gul', 'felix', 'amanda', 'lauren', 'mimi']));

	clickOn(DA.bPoll);
	//console.log('....polling started',DA.pollInterval);


	//wenn mPhp... mache soll DA.bPoll ganz rot werden, danach wieder normal
	//const pulse = b.animate([{ opacity: 1 }, { opacity: 0.3 }, { opacity: 1 }], { duration: 1000, iterations: 1 });

}
async function test0_buttons_NO() {
	await DAInit(true);
	let TESTING = true;
	mStyle('dPage', { bg: 'green', fg: 'white' });
	let d = mBy('dTopLeft'); mStyle(d, { display: 'flex', vStretch: true, gap: 10, padding: 10, box: true }); //, box:true, vStretch:true, hCenter: true, padding: 10, gap: 10 }) //mClass(d,'flex')

	let bStyles = { hPadding: 10, h: 25, wmin: 70, vPadding: 6, rounding: 10, cursor: 'pointer', className: 'hover', vCenter: true, display: 'flex', hCenter: true };
	mDom(d, bStyles, { html: 'game', onclick: onclickTest, menu: 'top' });
	mDom(d, bStyles, { html: 'An', onclick: onclickTest, menu: 'top' });
	mDom(d, bStyles, { html: 'Lop', onclick: onclickTest, menu: 'top' });
	mDom(d, bStyles, { html: 'Miq', onclick: onclickTest, menu: 'top' });
	let b = mKey('watch', d, bStyles, { onclick: onclickTest, menu: 'top' });
}
async function test0_flex() {
	let d = mDom('dPage', { display: 'flex', vStretch: true, bg: 'blue', fg: 'white', gap: 10, padding: 10, box: true, h: 75 });
	let b = mDom(d, { className: 'vert_align_button', alignSelf: 'baseline', bg: 'red' }, { html: 'Help' });
	b = mDom(d, { className: 'vert_align_button', bg: 'red' }, { html: 'Help' });
	b = mDom(d, { className: 'vert_align_button', alignSelf: 'center', bg: 'red' }, { html: 'Help' });
	b = mDom(d, { className: 'vert_align_button', alignSelf: 'start', bg: 'red' }, { html: 'Help' });
	b = mDom(d, { className: 'vert_align_button', alignSelf: 'end', bg: 'red' }, { html: 'Help' });

	b = mDom(d, { alignSelf: 'baseline', bg: 'green' }, { html: 'Help' });
	b = mDom(d, { bg: 'green' }, { html: 'Help' });
	b = mDom(d, { alignSelf: 'center', bg: 'green' }, { html: 'Help' });
	b = mDom(d, { alignSelf: 'start', bg: 'green' }, { html: 'Help' });
	b = mDom(d, { alignSelf: 'end', bg: 'green' }, { html: 'Help' });
}
async function test0_save_state() {
	await DAInit(true);
	let state = await showTable(); //if (VERBOSE) console.log('vorher', jsCopy(state));

	state.num = rNumber();

	let res = await DASaveState(state); //if (VERBOSE) console.log('nachher', res);

}
async function test0_get_state() {

	await DAInit();
	let state = await showTable();

	if (VERBOSE) console.log('DONE!', state);
}
async function test0_php0() {
	await loadAssetsStatic();
	// let res = await mPhpPost('all', { action: 'dir', dir:'tables' },'simple0',true); if (VERBOSE) console.log('res', res)
	// let files = await mGetFilenames('tables'); //if (VERBOSE) console.log('files', files);
	M.tables = await MPollTables();
	if (VERBOSE) console.log('M', M)
}
async function test0() {
	if (VERBOSE) console.log('YEAH!');
}	
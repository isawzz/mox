
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
function collectCats(klist) {
	let cats = [];
	for (const k of klist) {
		M.superdi[k].cats.map(x => addIf(cats, x));
	}
	return cats;
}
async function uiFilterMenu(dParent,name='all') {
  if (nundef(name)) name='emo';
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



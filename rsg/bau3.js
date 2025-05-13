

async function showCollection(k, d = 'dMain', outerStyles = {}, symbolStyles = {}, labelStyles = {}, opts = {}) {

	let [w, h] = mSizeSuccession(outerStyles, 100); let gap = valf(outerStyles.gap, 10)

	mClear(d);
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


function simpleShowImageInBatch(key, dParent, styles = {}, opts = {}) {
  let o = M.superdi[key]; o.key = key;
  addKeys({ bg: rColor() }, styles);
  mClear(dParent);
  [w, h] = [dParent.offsetWidth, dParent.offsetHeight];
  let [sz, fz] = [.9 * w, .8 * h];
  let d1 = mDom(dParent, { position: 'relative', w: '100%', h: '100%', padding: 11, box: true });//overflow: 'hidden', 
  mCenterCenterFlex(d1)
  let el = null;
  let src = (opts.prefer == 'photo' && isdef(o.photo)) ? o.photo : valf(o.img, null);
  if (isdef(src)) {
    if (o.cats.includes('card')) {
      el = mDom(d1, { h: '100%', 'object-fit': 'cover', 'object-position': 'center center' }, { tag: 'img', src });
      mDom(d1, { h: 1, w: '100%' })
    } else {
      el = mDom(d1, { w: '100%', h: '100%', 'object-fit': 'cover', 'object-position': 'center center' }, { tag: 'img', src });
    }
  }
  else if (isdef(o.uni)) el = mDom(d1, { fz: fz, hline: fz, family: "'Noto Sans', sans-serif", fg: rColor(), display: 'inline' }, { html: o.uni });
  else if (isdef(o.emo)) el = mDom(d1, { fz: fz, hline: fz, family: 'emoNoto', fg: rColor(), display: 'inline' }, { html: o.emo });
  else if (isdef(o.fa)) el = mDom(d1, { fz: fz, hline: fz, family: 'pictoFa', bg: 'transparent', fg: rColor(), display: 'inline' }, { html: String.fromCharCode('0x' + o.fa) });
  else if (isdef(o.ga)) el = mDom(d1, { fz: fz, hline: fz, family: 'pictoGame', bg: 'beige', fg: rColor(), display: 'inline' }, { html: String.fromCharCode('0x' + o.ga) });
  else if (isdef(o.fa6)) el = mDom(d1, { fz: fz, hline: fz, family: 'fa6', bg: 'transparent', fg: rColor(), display: 'inline' }, { html: String.fromCharCode('0x' + o.fa6) });
  assertion(el, 'PROBLEM!!! ' + key);
  let label = mDom(d1, { fz: 11, cursor: 'pointer' }, { html: o.key, className: 'ellipsis hoverHue' });
  label.onclick = simpleOnclickLabel;
  mStyle(d1, { cursor: 'pointer' });
  d1.onclick = simpleOnclickItem;
  d1.setAttribute('key', key);
  d1.setAttribute('draggable', true)
  d1.ondragstart = ev => { ev.dataTransfer.setData('itemkey', key); }
  return d1;
}
async function simpleOnclickItem(ev) {
  let id = evToId(ev); console.log('item',id,DA.items[id]);
  let item = DA.items[id]; if (nundef(item)) return;
  let selkey = item.key;
  toggleSelectionOfPicture(iDiv(item), selkey, DA.selectedImages);
  //simpleCheckCommands();
}
async function simpleOnclickLabel(ev) {
  evNoBubble(ev);
  let id = evToId(ev); console.log('id', id)
  let o = lookup(UI.simple, ['items', id]);
  if (!o) return;
  console.log('clicked label of', o);
  let [key, elem, collname] = [o.key, o.name, iDiv(o)];
  let newfriendly = await mGather(ev.target);
  if (!newfriendly) return;
  if (isEmpty(newfriendly)) {
    showMessage(`ERROR: name invalid: ${newfriendly}`);
    return;
  }
  console.log('rename friendly to', newfriendly)
  let item = M.superdi[key];
  item.friendly = newfriendly;
  let di = {};
  di[key] = item;
  let res = await mPostRoute('postUpdateSuperdi', { di });
  console.log('postUpdateSuperdi', res)
  await loadAssets();
  ev.target.innerHTML = newfriendly;
}
async function simpleOnDropImage(ev, elem) {
  let dt = ev.dataTransfer;
  if (dt.types.includes('itemkey')) {
    let data = ev.dataTransfer.getData('itemkey');
    await simpleOnDroppedItem(data);
  } else {
    const files = ev.dataTransfer.files;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = async (evReader) => {
        let data = evReader.target.result;
        await simpleOnDroppedUrl(data, UI.simple);
      };
      reader.readAsDataURL(files[0]);
    }
  }
}
async function simpleOnDroppedItem(itemOrKey, key, sisi) {
  if (nundef(sisi)) sisi = UI.simple;
  let item;
  if (isString(itemOrKey)) { key = itemOrKey; item = M.superdi[key]; } else { item = itemOrKey; }
  assertion(isdef(key), 'NO KEY!!!!!');
  lookupAddIfToList(item, ['colls'], sisi.name);
  let o = M.superdi[key];
  if (isdef(o)) {
    console.log(`HA! ${key} already there`);
    let changed = false;
    for (const k in item) {
      let val = item[k];
      if (isLiteral(val) && o[k] != item[k]) { changed = true; break; }
      else if (isList(val) && !sameList(val, o[k])) { changed = true; break; }
    }
    if (!changed) return;
  }
  console.log(`........But changed!!!`);
  let di = {}; di[key] = item;
  await updateSuperdi(di);
  simpleInit(sisi.name, sisi)
}
async function simpleOnDroppedUrl(src, sisi) {
  let sz = 400;
  let dPopup = mDom(document.body, { position: 'fixed', top: 40, left: 0, wmin: sz, hmin: sz, bg: 'pink' });
  let dParent = mDom(dPopup);
  let d = mDom(dParent, { w: sz, h: sz, border: 'dimgray', margin: 10 });
  let canvas = createPanZoomCanvas(d, src, sz, sz);
  let instr = mDom(dPopup, { align: 'center', mabot: 10 }, { html: `- panzoom image to your liking -` })
  let dinp = mDom(dPopup, { padding: 10, align: 'right', display: 'inline-block' })
  mDom(dinp, { display: 'inline-block' }, { html: 'Name: ' });
  let inpFriendly = mDom(dinp, { outline: 'none', w: 200 }, { className: 'input', name: 'friendly', tag: 'input', type: 'text', placeholder: `<enter name>` });
  let defaultName = '';
  let iDefault = 1;
  let k = sisi.masterKeys.find(x => x == `${sisi.name}${iDefault}`);
  while (isdef(k)) { iDefault++; k = sisi.masterKeys.find(x => x == `${sisi.name}${iDefault}`); }
  defaultName = `${sisi.name}${iDefault}`;
  inpFriendly.value = defaultName;
  mDom(dinp, { h: 1 });
  mDom(dinp, { display: 'inline-block' }, { html: 'Categories: ' })
  let inpCats = mDom(dinp, { outline: 'none', w: 200 }, { className: 'input', name: 'cats', tag: 'input', type: 'text', placeholder: `<enter categories>` });
  let db2 = mDom(dPopup, { padding: 10, display: 'flex', gap: 10, 'justify-content': 'end' });
  mButton('Cancel', () => dPopup.remove(), db2, { w: 70 }, 'input');
  mButton('Save', () => simpleFinishEditing(canvas, dPopup, inpFriendly, inpCats, sisi), db2, { w: 70 }, 'input');
}


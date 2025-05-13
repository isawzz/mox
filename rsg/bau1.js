
function showItem(key,d){

	//mClass(d, 'magnifiable')
	let id = getUID();
	let dSym = mKey(key,d,{},{prefer:'emo'}); // simpleShowImageInBatch(key, d, {}, { prefer: 'photo' });
	//return;

	// mStyle(d,{position:'relative',pabottom:18});
  let dLabel = mDom(d, { align:'center',fz: 13, cursor: 'pointer' }, { html: key, className: 'ellipsis hoverHue' });
  dLabel.onclick = simpleOnclickLabel;
  mStyle(dSym, { cursor: 'pointer' });
  dSym.onclick = simpleOnclickItem;
  dSym.setAttribute('key', key);
  dSym.setAttribute('draggable', true)
  dSym.ondragstart = ev => { ev.dataTransfer.setData('itemkey', key); }
  return dSym;


	d.id = id; //console.log('d1', d1);
	let item = { div: d, key};
	DA.items[id] = item;
	if (isList(DA.selectedImages) && DA.selectedImages.includes(key)) mSelect(d);

}

async function initTest(){
	DA.items={};
	DA.selectedImages = [];
	await loadAssetsStatic(); //console.log('M', M);
	for (const k in M.superdi) { M.superdi[k].key = k; }
	stickyHeaderCode();

	let elems = mLayoutLM('dPage');
	mStyle('dMain', { overy: 'auto' });

	let dLeft = mBy('dLeft');
	mStyle(dLeft, { overy: 'auto' });


}

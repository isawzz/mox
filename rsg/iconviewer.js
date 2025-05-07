var IconSet, lastIndex;

function iconViewerTestKeysets() {
	let allKeys = symKeysBySet.nosymbols;
	let keys = allKeys.filter(x => isdef(symbolDict[x].best100));
	let keys1 = allKeys.filter(x => isdef(symbolDict[x].best100) && isdef(symbolDict[x].bestE));
	let keys2 = allKeys.filter(x => isdef(symbolDict[x].best50));
	let keys3 = allKeys.filter(x => isdef(symbolDict[x].best25));
	console.log(keys3);
	iconViewer(keys3);

}

function iconViewer(keys) {
	//console.log('hallo!!!')
	onclick = show100;
	IconSet = M.byCollection.emo; console.log(IconSet);//MathKeys;  // isdef(keys) ? keys : M.MathKeys; //symKeysBySet['nosymbols'];
	lastIndex = 0;
	Pictures = [];

	show100();

}
function downloadKeySet() {
	let keys = Pictures.filter(x => x.isSelected).map(x => x.info.key);
	downloadAsYaml(keys, 'keyset');
}
async function show100() {
	//assumes a div id='table'
	//console.log('hallo!!!')
	let table = mBy('table');
	mClear(table);

	mButton('download key set', downloadKeySet, table, { fz: 30 });
	mButton('next 100', () => show100(), table, { fz: 30 });
	mLinebreak(table);

	let N = 150; //100
	console.log(IconSet);
	let keys = takeFromTo(IconSet, lastIndex, lastIndex + N);//chooseRandom() ['keycap: 0', 'keycap: 1', 'keycap: #', 'keycap: *'];
	lastIndex += N;

	//gridLabeled(keys);
	//let d = mGrid(10, 10, table);
	for (const k of keys) {
		let item = await mKey(k, table, { margin: 8, w: 50, h: 70, bg: 'dimgray', fz: 30 }); 
		console.log(item); continue;
		addLabel(item, k, { fz: 12 })
		item.onclick = toggleSelectionOfPicture;
	}

}
function takeFromTo(ad, from, to) {
  if (isDict(ad)) {
    let keys = Object.keys(ad);
    return keys.slice(from, to).map(x => (ad[x]));
  } else return ad.slice(from, to);
}

function addLabel(item, label, styles) {
	item.label = label;
	let div = iDiv(item);
	//console.log(item,label,div)
	if (isdef(item.live.dLabel)) mRemove(item.live.dLabel);
	let dLabel = item.live.dLabel = mDiv(div, styles, null, label);
	mCenterFlex(div, true, true);
	mStyle(div, { 'vertical-align': 'top' });
	return dLabel;
}

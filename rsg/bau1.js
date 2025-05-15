


function showCollection(ev){
	let name = ev.target.innerHTML;
	let keys = M.byCat[name]; //Object.keys(M.superdi); // M.byCat.animal;
	showKeys(keys,'dMain');
}
async function showKeys(keys,d){
	let centered={display: 'flex', alignItems: 'center', justifyContent: 'center', baseline:'middle'};
	mClear(d);
	let [gap, w, h] = [10, 100, 100];
	let dGrid = mDom(d, { display: 'flex', fg: 'black', gap, padding: gap, wrap: true });
	let i = 0;
	let n = Math.floor(window.innerWidth / (w + gap)) * Math.floor(window.innerHeight / (h + gap)); console.log('n', n);
	for (const k of keys) {
		let d = mDom(dGrid, { bg: 'silver', padding: gap, cursor: 'pointer' }, { id: getUID(), onclick: onclickItem });

		let x=mKey(k, d, { w, h, fz:h, hline:h, box: true, fg: 'black', bg: 'white' },{special:true});

		mDom(d, { w, fg: 'black', 'text-overflow': 'ellipsis', 'white-space': 'nowrap', overflow: 'hidden', fz: 16, align: 'center' }, { html: k, title:k });
		DA.items[d.id] = { div: d, key: k };
		if (0 === ++i % n) await mSleep(20);
	}
}

function fitFzToBox(div, maxWidth, maxHeight, options = {}) {
  const {
    minFontSize = 10,
    maxFontSize = 100,
    fontStep = 1,
    lineHeight = 1
  } = options;

  const style = window.getComputedStyle(div);
  const originalText = div.textContent;

  // Create an off-screen clone for measurement
  const testDiv = document.createElement("div");
  document.body.appendChild(testDiv);
  testDiv.style.position = "absolute";
  testDiv.style.visibility = "hidden";
  testDiv.style.whiteSpace = "pre-wrap";
  testDiv.style.wordBreak = "break-word";

  // Copy CSS that affects size
  const keysToCopy = ["fontFamily", "fontWeight", "fontStyle", "letterSpacing", "padding", "border"];
  keysToCopy.forEach(key => {
    testDiv.style[key] = style[key];
  });

  let fontSize = maxFontSize;
  testDiv.textContent = originalText;

  while (fontSize >= minFontSize) {
    testDiv.style.fontSize = `${fontSize}px`;
    testDiv.style.lineHeight = lineHeight;

    if (
      testDiv.offsetWidth <= maxWidth &&
      testDiv.offsetHeight <= maxHeight
    ) {
      break;
    }

    fontSize -= fontStep;
  }

  // Apply the final font size to the actual div
  div.style.fontSize = `${fontSize}px`;
  div.style.lineHeight = lineHeight;

  document.body.removeChild(testDiv);
  return fontSize;
}

function fitTextToBox(text, family, maxWidth, maxHeight, options = {}) {
  const {
    minFontSize = 10,
    maxFontSize = 100,
    fontStep = 1,
    lineHeight = 1.2,
    weight = "normal",
    fontStyle = "normal",
    letterSpacing = "normal",
    padding = "0"
  } = options;

  // Create a hidden measuring element
  const testDiv = mDom(document.body, {}, { tag: 'div', html: text });
  mStyle(testDiv, {
    position: 'absolute',
    visibility: 'hidden',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    padding,
    family,
    weight,
    fontStyle,
    letterSpacing
  });

  let fz = maxFontSize;

  // Adjust font size to fit within the box
  while (fz >= minFontSize) {
    mStyle(testDiv, { fz, lineHeight });
    if (testDiv.offsetWidth <= maxWidth && testDiv.offsetHeight <= maxHeight) break;
    fz -= fontStep;
  }

  // Clean up and return the calculated font size
  testDiv.remove();
  return fz;
}
async function initTest() {
	DA.items = {};
	DA.selectedImages = [];
	await loadAssetsStatic(); //console.log('M', M);
	for (const k in M.superdi) { M.superdi[k].key = k; }
	stickyHeaderCode();

	let elems = mLayoutLM('dPage');
	mStyle('dMain', { overy: 'auto' });

	let dLeft = mBy('dLeft');
	mStyle(dLeft, { overy: 'auto' });


}

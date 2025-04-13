
function applyOpts(d, opts = {}) {
	const aliases = {
		classes: 'className',
		inner: 'innerHTML',
		html: 'innerHTML',
		w: 'width',
		h: 'height',
	};
	for (const opt in opts) {
		let name = valf(aliases[opt], opt), val = opts[opt];
		if (name == 'fClick') { d.onclick = async (ev) => { recUserEvent(); await val(ev); } }
		else if (['style', 'tag', 'innerHTML', 'className', 'checked', 'value'].includes(name) || name.startsWith('on')) d[name] = val;
		else d.setAttribute(name, val);
	}
}
function getMaxWordWidth(words, div) {
  if (!div || !Array.isArray(words)) return 0;

  // Create a hidden span to measure word widths
  const span = document.createElement('span');
  span.style.visibility = 'hidden';
  span.style.position = 'absolute';
  span.style.whiteSpace = 'nowrap';
  span.style.top = '-9999px';
  span.style.left = '-9999px';

  // Copy font and style from the div
  const computedStyle = window.getComputedStyle(div);
  span.style.font = computedStyle.font;
  span.style.fontSize = computedStyle.fontSize;
  span.style.fontFamily = computedStyle.fontFamily;
  span.style.fontWeight = computedStyle.fontWeight;
  span.style.letterSpacing = computedStyle.letterSpacing;
  span.style.wordSpacing = computedStyle.wordSpacing;
  span.style.textTransform = computedStyle.textTransform;

  document.body.appendChild(span);

  let maxWidth = 0;

  for (const word of words) {
    span.textContent = word;
    const width = span.offsetWidth;
    if (width > maxWidth) {
      maxWidth = width;
    }
  }

  document.body.removeChild(span);
  return maxWidth;
}
function mFlex(d, wrap = true, halign = 'start', valign = 'center', row = true) {
	d = toElem(d);
	mStyle(d, {
		display: 'flex',
		'flex-wrap': wrap ? 'wrap' : 'nowrap',
		'flex-direction': row ? 'row' : 'column',
		'align-items': row ? valign : halign,
		'justify-content': row ? halign : valign
	});
}
async function tablesDeleteAll() {
	let res = await mPhpPost('mox0', { action:'delete_dir', dir: 'tables' });
	console.log('res',res);
	DA.tid = null;
	DA.tData = null;
	localStorage.removeItem('tid');
	M.tables = {};
	mClear('dTopLeft');
	await showGamesAndTables();
}



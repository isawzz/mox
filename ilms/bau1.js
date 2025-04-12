
function mToggleButton() {
	let list = Array.from(arguments);
	if (isEmpty(list)) return;
	let dParent = list[0].parentNode;
	let tb = mDom(dParent);
	let n = list.length;
	let i = 0;
	for (const b of list) {
		mAppend(tb, b);
		b.setAttribute('idx', i++);
		if (i < n) mStyle(b, { display: 'none' });
	}
	tb.onclick = ev => {
		let idx = Number(evToAttr(ev, 'idx'));
		let inew = (idx + 1) % n;
		let b = list[inew];
		list.map(x => mStyle(x, { display: 'none' }));
		mStyle(b, { display: 'inline' });
	}
	return tb;
}

async function postUsers() {
	let users = jsonToYaml(M.users);
	let res = await mPhpPost('mox0', { action: 'savey', file: 'users', o: M.users });
	console.log('res', res);
}
function firstVisibleChild(div) {
  if (!div || !div.children) return null;

  for (const child of div.children) {
    const style = window.getComputedStyle(child);
    if (style.display !== 'none') {
      return child;
    }
  }

  return null; // if none are visible
}
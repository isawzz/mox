
function mGather(f, d, styles = {}, opts = {}) {
  return new Promise((resolve, _) => {
    let dShield = mShield();
    let fCancel = _ => { dShield.remove(); hotkeyDeactivate('Escape'); resolve(null) };
    let fSuccess = val => { dShield.remove(); hotkeyDeactivate('Escape'); resolve(val) };
    dShield.onclick = fCancel;
    hotkeyActivate('Escape', fCancel);
    let [box, inp] = mInBox(f, dShield, styles, {w100:true}, dictMerge(opts, { fSuccess }));
		let align = opts.align || 'bl';
    mAlign(box, d, { align, offx: -24 });
    inp.focus();
  });
}
async function onclickUser() {
  let uname = await mGather(mInput, 'btnUser', { w: 100, margin: 0 }, { content: 'username', align: 'br', placeholder: ' <username> ' });
  if (!uname) return;
  await switchToUser(uname);
}

async function switchToUser(username) {
  if (!isEmpty(username)) username = normalizeString(username);
  if (isEmpty(username)) username = 'guest';
  let res = await mPhpPost('all', { username, action: 'login' });
  U = res.userdata;
  DA.tid = localStorage.getItem('tid');
  let bg = U.color;
  let fg = colorIdealText(bg);
  mClear('dTopRight');
	mClass('dTopRight', 'button_container');
  mDom('dTopRight', { bg, fg }, { tag: 'button', html: `${username}`, onclick:onclickUser, id: 'btnUser' });
  localStorage.setItem('username', username);
  setTheme(U);
}


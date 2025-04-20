
function getElementWithAttribute(key, val) {
  return document.querySelector(`[${key}="${val}"]`);
}
async function mKey(imgKey, d, styles = {}, opts = {}) {
  styles = jsCopy(styles);
  let type = opts.prefer;
  let o = type != 'plain' ? lookup(M.superdi, [imgKey]) : null;
  let src;
  if (nundef(o) && imgKey.includes('.')) src = imgKey;
  else if (isdef(o) && (type == 'img' || type == 'photo') && isdef(o[type])) src = o[type];
  else if (isdef(o) && isdef(o.img)) src = o.img;
  if (isdef(src)) {
    console.log('have source!!!!', styles)
    let d0 = mDom(d, styles, opts);
    mCenterCenterFlex(d0);
    let [w, h] = mSizeSuccession(styles, 40);
    let imgStyles = { h }, imgOpts = { tag: 'img', src }
    // addKeys({ w, h }, styles); addKeys({ tag: 'img', src }, opts);
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
    //console.log('styles',styles)
    addKeys({ html: imgKey }, opts)
    let img = mDom(d, styles, opts);
    return img;
  }
  console.log('type', type)
}
function hToggleClassMenu(ev) {
  let elem = findAncestorWith(ev.target, { attribute: 'menu' });
  if (mHasClass(elem, 'active')) return [elem, elem];
  let menu = elem.getAttribute('menu');
  let others = mBy(`[menu='${menu}']`, 'query').filter(x => x != elem);
  let prev = null;
  for (const o of others) {
    assertion(o != elem);
    if (mHasClass(o, 'active')) { prev = o; mClassRemove(o, 'active'); }
  }
  mClass(elem, 'active');
  return [prev, elem];
}

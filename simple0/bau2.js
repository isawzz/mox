
function findElementBy(value,key='html') {
  const all = document.querySelectorAll('*');
  for (const el of all) {
    // Check property
    if (el[key] === value) return el;

    // Check attribute
    if (el.hasAttribute(key) && el.getAttribute(key) === value) return el;

    // Check innerHTML or textContent
		let di={html:'innerHTML', text:'textContent', caption:'innerHTML'};
		key=valf(di[key],key);
    if ((key === 'innerHTML' || key === 'textContent') && el[key] === value) return el;
  }
  return null;
}









function findAncestorWith(elem, { attribute = null, className = null, id = null }) {
	elem = toElem(elem);
	while (elem) {
		if ((attribute && elem.hasAttribute && elem.hasAttribute(attribute))
			|| (className && elem.classList && elem.classList.contains(className))
			|| (id && isdef(elem.id))) { return elem; }
		elem = elem.parentNode;
	}
	return null;
}


// --- Global STYLE_PARAMS (needed by mStyle) ---
const STYLE_PARAMS = {
	acontent: 'align-content', aitems: 'align-items', align: 'text-align', aspectRatio: 'aspect-ratio',
	bg: 'background-color', bgBlend: 'background-blend-mode', bgImage: 'background-image',
	bgRepeat: 'background-repeat', bgSize: 'background-size', deco: 'text-decoration',
	dir: 'flex-direction', family: 'font-family', fg: 'color', fontSize: 'font-size',
	fStyle: 'font-style', fz: 'font-size', gridCols: 'grid-template-columns',
	gridRows: 'grid-template-rows', h: 'height', hgap: 'column-gap', hmin: 'min-height',
	hmax: 'max-height', hline: 'line-height', jcontent: 'justify-content',
	jitems: 'justify-items', justify: 'justify-content', matop: 'margin-top',
	maleft: 'margin-left', mabottom: 'margin-bottom', maright: 'margin-right',
	origin: 'transform-origin', overx: 'overflow-x', overy: 'overflow-y',
	patop: 'padding-top', paleft: 'padding-left', pabottom: 'padding-bottom',
	paright: 'padding-right', place: 'place-items', rounding: 'border-radius',
	valign: 'align-items', vgap: 'row-gap', w: 'width', wmin: 'min-width',
	wmax: 'max-width', weight: 'font-weight', x: 'left', xover: 'overflow-x',
	y: 'top', yover: 'overflow-y', z: 'z-index'
};

// --- Core Modular Function: displayImageGallery ---
/**
 * Displays a gallery of images or symbols in a specified parent element.
 * @param {HTMLElement} parentElement - The DOM element to render the gallery into.
 * @param {Array<Object>} items - An array of item objects. Each object should describe an image/symbol.
 * Example item: {
 * key: 'unique_id', // Optional, for callbacks
 * friendlyName: 'Display Name', // For the label
 * photo: 'path/to/photo.jpg', // Path to preferred photo
 * img: 'path/to/icon.png',    // Path to alternative image/icon
 * text: '🌟',                 // Emoji or text symbol
 * fa6: 'f005',                // FontAwesome 6 hex code (without 0x)
 * // fa: '...', ga: '...' for other icon sets if fonts are configured
 * color: '#RRGGBB',           // Color for text/symbol if not default
 * cats: ['category']          // Optional, for specific styling (e.g., 'card')
 * }
 * @param {Object} options - Configuration options for the gallery.
 * Example options: {
 * columns: 4,
 * gap: 12,
 * imageWidth: 100,
 * imageHeight: 100,
 * showLabels: true,
 * imagePrefer: 'photo', // 'photo' or 'img'
 * onClickImage: function(item, event) { console.log('Clicked:', item); },
 * cellStyles: { bg: '#f0f0f0', ... }, // Styles for each cell
 * labelStyles: { fz: 10, ... }      // Styles for labels
 * }
 */
async function displayImageGallery(parentElement, items, options = {}) {
	await loadAssetsStatic();
	const defaults = {
		columns: 5,
		gap: 10,
		imageWidth: 120,
		imageHeight: 120,
		showLabels: true,
		imagePrefer: 'photo',
		onClickImage: null,
		cellStyles: { bg: '#e9e9e9', fg: '#333', box: true, overflow: 'hidden', padding: 8, rounding: 6 },
		labelStyles: { fz: 11, cursor: 'pointer', textAlign: 'center', marginTop: 5, color: '#333' },
		imageContainerStyles: { display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
		imageElementStyles: { maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', objectPosition: 'center center', borderRadius: '4px' },
		symbolStyles: { fontFamily: 'emoNoto', display: 'inline-block' }, // General style for symbols
	};

	// Merge user options with defaults
	const config = { ...defaults, ...options };
	// Deep merge for style objects
	config.cellStyles = { ...defaults.cellStyles, ...(options.cellStyles || {}) };
	config.labelStyles = { ...defaults.labelStyles, ...(options.labelStyles || {}) };
	config.imageContainerStyles = { ...defaults.imageContainerStyles, ...(options.imageContainerStyles || {}) };
	config.imageElementStyles = { ...defaults.imageElementStyles, ...(options.imageElementStyles || {}) };
	config.symbolStyles = { ...defaults.symbolStyles, ...(options.symbolStyles || {}) };


	// Adjust cell height to accommodate labels if shown
	const labelHeight = config.showLabels ? (parseInt(config.labelStyles.fz, 10) || 11) + (parseInt(config.labelStyles.marginTop, 10) || 5) + 5 : 0;
	config.cellStyles.w = config.imageWidth;
	config.cellStyles.h = config.imageHeight + labelHeight;
	config.imageContainerStyles.w = config.imageWidth;
	config.imageContainerStyles.h = config.imageHeight;


	mClear(toElem(parentElement));

	const gridContainer = mGrid(Math.ceil(items.length / config.columns), config.columns, parentElement, {
		gap: config.gap,
		margin: 'auto',
		padding: config.gap
	});
	mStyle(gridContainer, { justifyContent: 'center' }); // Ensure grid items are centered if row not full

	items.forEach(itemData => {
		const cell = mDom(gridContainer, config.cellStyles);
		mStyle(cell, { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }); // Changed to flex-start for label position

		const imageContainer = mDom(cell, config.imageContainerStyles);

		let el = null;
		const o = itemData; // Current item

		let srcPath = null;
		if (config.imagePrefer === 'photo' && o.photo) srcPath = o.photo;
		else if (o.img) srcPath = o.img;
		else if (config.imagePrefer !== 'photo' && o.photo && !o.img) srcPath = o.photo; // Fallback

		const symbolBaseStyle = {
			...config.symbolStyles, // Apply general symbol styles
			fontSize: config.imageHeight * 0.6, // fz and hline were used, approximating with fontSize
			lineHeight: `${config.imageHeight * 0.6}px`,
			color: o.color || config.cellStyles.fg, // Use item color or cell foreground
		};

		if (srcPath) {
			const imgStyles = { ...config.imageElementStyles };
			if (o.cats && o.cats.includes('card')) {
				imgStyles.objectFit = 'contain'; // Cards often need 'contain'
			}
			el = mDom(imageContainer, imgStyles, {
				tag: 'img',
				src: srcPath,
				alt: o.friendlyName || o.key || 'image'
			});
			el.onerror = () => {
				imageContainer.innerHTML = '&#10060;'; // Red X emoji
				mStyle(imageContainer, { color: 'red', fontWeight: 'bold', fontSize: `${config.imageHeight * 0.5}px` });
			};
		} else if (o.text) {
			el = mDom(imageContainer, { ...symbolBaseStyle, fontFamily: 'emoNoto' }, { html: o.text });
		} else if (o.fa6) {
			el = mDom(imageContainer, { ...symbolBaseStyle, fontFamily: 'fa6' }, { html: String.fromCharCode('0x' + o.fa6) });
		} else if (o.fa) {
			el = mDom(imageContainer, { ...symbolBaseStyle, fontFamily: 'pictoFa' }, { html: String.fromCharCode('0x' + o.fa) });
		} else if (o.ga) {
			el = mDom(imageContainer, { ...symbolBaseStyle, fontFamily: 'pictoGame' }, { html: String.fromCharCode('0x' + o.ga) });
		} else {
			el = mDom(imageContainer, { ...symbolBaseStyle, fontSize: config.imageHeight * 0.2 }, { html: o.friendlyName || o.key || 'N/A' });
		}

		if (config.showLabels && o.friendlyName) {
			const label = mDom(cell, config.labelStyles, { html: o.friendlyName, className: 'ellipsis' });
			// mStyle(label, {width: '100%'}); // Already handled by ellipsis class and cell flex props
		}

		if (config.onClickImage && typeof config.onClickImage === 'function') {
			cell.style.cursor = 'pointer';
			cell.onclick = (ev) => config.onClickImage(o, ev);
		}
	});
}

// --- Minimal Dependencies from freeclosure.js ---

// Utility: isdef
function isdef(x) { return x !== null && x !== undefined && x !== 'undefined'; }

// Utility: nundef
function nundef(x) { return x === null || x === undefined || x === 'undefined'; }

// Utility: valf - returns the first defined argument
function valf() {
	for (const arg of arguments) if (isdef(arg)) return arg;
	return null;
}

// Utility: toElem - converts ID string to element or returns element
function toElem(d) { return typeof d === 'string' ? document.getElementById(d) : d; }

// DOM: mClear - clears innerHTML of an element
function mClear(d) {
	if (isdef(d)) toElem(d).innerHTML = '';
}

// DOM: mAppend - appends a child to a parent element
function mAppend(d, child) { toElem(d).appendChild(child); return child; }

// DOM: mCreate - creates an element
function mCreate(tag, styles, id) {
	let d = document.createElement(tag);
	if (isdef(id)) d.id = id;
	if (isdef(styles)) mStyle(d, styles); // Requires mStyle
	return d;
}

// DOM: mDom - creates a DOM element with styles and attributes/properties
function mDom(dParent, styles = {}, opts = {}) {
	let tag = valf(opts.tag, 'div');
	let d = document.createElement(tag);
	if (isdef(dParent)) mAppend(toElem(dParent), d); // mAppend needs toElem

	const aliases = {
		classes: 'className', inner: 'innerHTML', html: 'innerHTML',
		w: 'width', h: 'height',
	};
	for (const opt in opts) {
		let name = valf(aliases[opt], opt);
		let val = opts[opt];
		// Simplified: only set attributes for non-standard properties
		if (typeof d[name] === 'undefined' || name === 'className' || name === 'innerHTML' || name === 'value' || name === 'src' || name === 'alt' || name.startsWith('on')) {
			if (name === 'className' && Array.isArray(val)) {
				val.forEach(cls => d.classList.add(cls));
			} else if (name === 'className' && typeof val === 'string') {
				d.className = val;
			} else if (typeof d[name] !== 'undefined' && !name.startsWith('on')) {
				d[name] = val;
			} else {
				d.setAttribute(name, val);
			}
		} else {
			d[name] = val;
		}
	}
	mStyle(d, styles); // Requires mStyle
	return d;
}


// Utility: jsCopy (simple version for objects, mStyle uses it)
function jsCopy(o) {
	if (typeof o !== 'object' || o === null) return o;
	return JSON.parse(JSON.stringify(o));
}

// Utility: makeUnitString (for mStyle)
function makeUnitString(nOrString, unit = 'px', defaultVal = '100%') {
	if (nundef(nOrString)) return defaultVal;
	if (typeof nOrString === 'number') nOrString = '' + nOrString + unit;
	return nOrString;
}

// Styling: mStyle - applies styles to an element
function mStyle(elem, styles = {}, unit = 'px') {
	elem = toElem(elem);
	if (!elem || !elem.style) return; // Basic safety check

	let styleCopy = jsCopy(styles); // Use jsCopy

	if (isdef(styleCopy.w100)) styleCopy.w = '100%';
	if (isdef(styleCopy.h100)) styleCopy.h = '100%';
	if (isdef(styleCopy.box)) styleCopy['box-sizing'] = 'border-box';
	if (isdef(styleCopy.round)) elem.style.setProperty('border-radius', '50%');


	for (const k in styleCopy) {
		if (['round', 'box', 'w100', 'h100'].includes(k)) continue;
		let val = styleCopy[k];
		let key = k;
		if (isdef(STYLE_PARAMS[k])) key = STYLE_PARAMS[k];

		if (key === 'flex' && typeof val === 'number') {
			val = `${val} 1 0%`; // common flex shorthand
		}

		// Simplified: directly set property
		// More complex parsing from original mStyle (like 'font' object, 'layout', etc.) is omitted for modularity
		if (elem.style.setProperty) {
			elem.style.setProperty(key, makeUnitString(val, unit));
		} else if (typeof elem.style[key] !== 'undefined') {
			elem.style[key] = makeUnitString(val, unit);
		}
	}
}

// Layout: mGrid - creates a grid container
function mGrid(rows, cols, dParent, styles = {}, opts = {}) {
	rows = Math.ceil(rows); // Ensure rows is an integer
	cols = Math.ceil(cols); // Ensure cols is an integer
	const gridStyles = { display: 'grid', ...styles }; // Start with display grid and merge
	gridStyles.gridTemplateColumns = `repeat(${cols}, 1fr)`; // Default to equal fraction columns

	if (isdef(styles.gridCols)) gridStyles.gridTemplateColumns = styles.gridCols; // Allow override

	if (rows > 0) { // only set gridTemplateRows if rows is positive
		gridStyles.gridTemplateRows = `repeat(${rows}, auto)`;
		if (isdef(styles.gridRows)) gridStyles.gridTemplateRows = styles.gridRows; // Allow override
	} else {
		gridStyles.overflowY = 'auto'; // If no fixed rows, allow vertical scroll
	}

	// opts might contain id, className, etc.
	return mDom(toElem(dParent), gridStyles, opts); // mDom needs toElem
}


// --- Example Usage ---
window.onload = function () {
	const galleryElement = document.getElementById('galleryRoot');

	const sampleItems = [
		{
			key: 'tree1',
			friendlyName: 'Green Tree',
			// Placeholder image from placehold.co
			photo: 'https://placehold.co/120x120/3cb44b/ffffff?text=Tree',
			img: 'https://placehold.co/100x100/228B22/ffffff?text=Icon',
			cats: ['nature']
		},
		{
			key: 'star1',
			friendlyName: 'Golden Star',
			text: '🌟', // Emoji
			color: '#FFD700'
		},
		{
			key: 'car1',
			friendlyName: 'Red Car',
			fa6: 'f1b9', // FontAwesome 6 car icon (assuming fa6 font is available)
			color: '#e6194B' // Red
		},
		{
			key: 'card_sample',
			friendlyName: 'Sample Card',
			photo: 'https://placehold.co/120x180/4363d8/ffffff?text=Card', // Taller image for card
			cats: ['card']
		},
		{
			key: 'animal_icon',
			friendlyName: 'Paw Print',
			fa: 'f1b0', // FontAwesome (v4/v5) paw icon (assuming pictoFa font is available)
			color: '#96613d' // Brown
		},
		{
			key: 'missing_image',
			friendlyName: 'Error Test',
			photo: 'path/to/nonexistent_image.jpg',
		},
		{
			key: 'settings_icon',
			friendlyName: 'Settings',
			ga: 'e994', // Example game icon (assuming pictoGame font)
			color: '#555555'
		},
		{
			key: 'long_name_test',
			friendlyName: 'This is a Very Long Name That Should Ellipsize',
			text: '🏷️',
			color: '#f58231'
		}
	];

	//const realItems = 
	displayImageGallery(galleryElement, sampleItems, {
		columns: 4,
		gap: 15,
		imageWidth: 100,
		imageHeight: 100,
		showLabels: true,
		imagePrefer: 'photo', // Try 'photo' first
		onClickImage: (item, event) => {
			console.log('Clicked on item:', item.friendlyName, 'Key:', item.key);
			alert(`You clicked on: ${item.friendlyName}`);
		},
		cellStyles: {
			bg: '#ffffff', // White background for cells
			boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
			padding: 10,
		},
		labelStyles: {
			color: '#007bff', // Blue labels
			fz: 12,
			weight: '500'
		}
	});

	// Example with fewer columns and different image sizes
	const anotherGallery = mDom(document.body, { marginTop: '30px' }, { tag: 'div', id: 'anotherGalleryRoot', className: 'gallery-container' });
	mDom(document.body, { position: 'relative', left: '20px' }, { tag: 'h2', html: 'Another Gallery (Different Config)' });


	const moreItems = [
		{ friendlyName: 'Sun', text: '☀️', color: '#ffe119' },
		{ friendlyName: 'Moon', text: '🌙', color: '#606070' },
		{ friendlyName: 'Heart', fa6: 'f004', color: '#e6194B' },
	];
	displayImageGallery(anotherGallery, moreItems, {
		columns: 3,
		gap: 20,
		imageWidth: 80,
		imageHeight: 80,
		onClickImage: (item) => alert(`Item: ${item.friendlyName}`),
		cellStyles: { bg: '#fdf5e6' } // Light beige cells
	});
};

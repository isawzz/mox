onload = start; function start() { test0(); }

async function test0() {
	await loadAssetsStatic();
	//const galleryElement = document.getElementById('galleryRoot');
	let elems = mLayoutLM('dPage'); mStyle('dMain', { overy: 'auto' }); mCenterFlex('dMain');
	let dLeft = mBy('dLeft');
	let family = "'Noto Sans', sans-serif"; // "Arial Unicode MS"; //'"Segoe UI", "DejaVu Sans", "Arial Unicode MS", sans-serif'
	let styles = { family, fz: 48, sz: 100, bg: 'white', fg: 'black' };

	// let dParent = mDom('dMain', { display: 'flex', wrap: true, w:500 }, { id: "table", });
	let galleryElement = mDom('dMain', { display: 'flex', wrap: true, w100:true, box:true }, { id: "table", });

	const sampleItems = M.byCollection.emo.map(x => M.superdi[x]); console.log('sampleItems',sampleItems);
	for(let i=0;i<sampleItems.length;i++) sampleItems[i].key=M.byCollection.emo[i];
	console.log(sampleItems[0])

	//const realItems = 
	displayImageGallery(galleryElement, sampleItems, {
		columns: 14,
		gap: 15,
		imageWidth: 100,
		imageHeight: 100,
		showLabels: true,
		imagePrefer: 'photo', // Try 'photo' first
		onClickImage: (item, event) => {
			console.log('Clicked on item:', item.friendly, 'Key:', item.key);
			//alert(`You clicked on: ${item.friendly}`);
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
	//const anotherGallery = mDom(document.body, { marginTop: '30px' }, { tag: 'div', id: 'anotherGalleryRoot', className: 'gallery-container' });
	//mDom(document.body, { position: 'relative', left: '20px' }, { tag: 'h2', html: 'Another Gallery (Different Config)' });


	// const moreItems = [
	// 	{ friendly: 'Sun', text: '☀️', color: '#ffe119' },
	// 	{ friendly: 'Moon', text: '🌙', color: '#606070' },
	// 	{ friendly: 'Heart', fa6: 'f004', color: '#e6194B' },
	// ];
	// displayImageGallery(anotherGallery, moreItems, {
	// 	columns: 3,
	// 	gap: 20,
	// 	imageWidth: 80,
	// 	imageHeight: 80,
	// 	onClickImage: (item) => alert(`Item: ${item.friendly}`),
	// 	cellStyles: { bg: '#fdf5e6' } // Light beige cells
	// });

}

function displayImageGallery(dParent, items, options = {}) {
	mClear(dParent);
	let dGrid = mDom(dParent,{display:'flex',wrap:true,gap:10,w100:true,box:true});
	// mStyle(dGrid, { justifyContent: 'center' }); // Ensure grid items are centered if row not full

	items.forEach(itemData => {
		const cell = mDom(dGrid, config.cellStyles);
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
				alt: o.friendly || o.key || 'image'
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
			el = mDom(imageContainer, { ...symbolBaseStyle, fontSize: config.imageHeight * 0.2 }, { html: o.friendly || o.key || 'N/A' });
		}

		if (config.showLabels && o.friendly) {
			const label = mDom(cell, config.labelStyles, { html: o.friendly, className: 'ellipsis' });
			// mStyle(label, {width: '100%'}); // Already handled by ellipsis class and cell flex props
		}

		if (config.onClickImage && typeof config.onClickImage === 'function') {
			cell.style.cursor = 'pointer';
			cell.onclick = (ev) => config.onClickImage(o, ev);
		}
	});
}

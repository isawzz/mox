
async function uiFilter(dParent, filter) {
	// Create a container for the filter bar
	let dFilterBar = mDom(dParent, { gap: 10, padding: 12, display: 'flex', alignItems: 'center', flexFlow: 'wrap' });

	// Collection input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold' }, { html: 'Collection:' });
	let collectionList = Object.keys(M.byCollection);
	let dlCollection = mDatalist(dFilterBar, collectionList, { placeholder: "<select from list>" });
	dlCollection.inpElem.oninput = ev => {
		console.log('Selected Collection:', ev.target.value);
		filter.collection = ev.target.value;
	};

	// Category input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold' }, { html: 'Category:' });
	let categoryList = Object.keys(M.byCat);
	let dlCategory = mDatalist(dFilterBar, categoryList, { placeholder: "<select from list>" });
	dlCategory.inpElem.oninput = ev => {
		console.log('Selected Category:', ev.target.value);
		filter.category = ev.target.value;
	};

	// Search input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold' }, { html: 'Search:' });
	let searchInput = mDom(dFilterBar, { width: 180, marginLeft: 4 }, { tag: 'input', className: 'input', placeholder: "<enter search term>" });
	searchInput.oninput = ev => {
		console.log('Search Term:', ev.target.value);
		filter.search = ev.target.value;
	};
}
async function uiFilter(dParent, filter) {
	// Create a container for the filter bar
	let dFilterBar = mDom(dParent, { gap: 10, padding: 12, display: 'flex', alignItems: 'center', flexFlow: 'wrap' });

	// Collection/Category input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold' }, { html: 'Filter By:' });
	let optionsList = [...Object.keys(M.byCollection), ...Object.keys(M.byCat)];
	let dlFilterBy = mDatalist(dFilterBar, optionsList, { placeholder: "<select collection or category>" });
	dlFilterBy.inpElem.oninput = ev => {
		console.log('Selected Filter:', ev.target.value);
		filter.filterBy = ev.target.value;
	};

	// Search input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold' }, { html: 'Search:' });
	let searchInput = mDom(dFilterBar, { width: 180, marginLeft: 4 }, { tag: 'input', className: 'input', placeholder: "<enter search term>" });
	searchInput.oninput = ev => {
		console.log('Search Term:', ev.target.value);
		filter.search = ev.target.value;
	};
}
async function uiFilter(dParent, filter) {
	// Create a container for the filter bar
	let dFilterBar = mDom(dParent, { gap: 10, padding: 12, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' });

	// Collection/Category input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold' }, { html: 'Filter By:' });
	let optionsList = [...Object.keys(M.byCollection), ...Object.keys(M.byCat)].sort(); // Sort alphabetically
	let dlFilterBy = mDatalist(dFilterBar, optionsList, { placeholder: "<select collection or category>" });
	dlFilterBy.inpElem.oninput = ev => {
			console.log('Selected Filter:', ev.target.value);
			filter.filterBy = ev.target.value;
	};

	// Search input
	mDom(dFilterBar, { fontSize: 24, fontWeight: 'bold', marginTop: 10 }, { html: 'Search:' });
	let searchInput = mDom(dFilterBar, { width: 180 }, { tag: 'input', className: 'input', placeholder: "<enter search term>" });
	searchInput.oninput = ev => {
			console.log('Search Term:', ev.target.value);
			filter.search = ev.target.value;
	};
}



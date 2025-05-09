document.addEventListener('DOMContentLoaded', () => {
	const header = document.querySelector('.sticky-header');
	const contentArea = document.querySelector('.content-area');

	// Function to set the height and top margin of the content area
	const setContentAreaHeight = () => {
		const headerHeight = header.offsetHeight;
		contentArea.style.height = `calc(100vh - ${headerHeight}px)`;
		// Although not strictly necessary with the height calculation,
		// a margin-top equal to header height can prevent content from
		// initially being hidden behind a fixed header in some layouts.
		// In this sticky/flex-like approach, height calculation is sufficient.
		// contentArea.style.marginTop = `${headerHeight}px`;
	};

	// Set the height initially
	setContentAreaHeight();

	// Recalculate height on window resize
	window.addEventListener('resize', setContentAreaHeight);
});
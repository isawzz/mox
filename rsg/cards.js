

// Function to display the card based on input from an element with id 'cardKeyInput'
// It updates the content of the element with id 'cardContainer'
// and displays errors in the element with id 'errorMessage'.
function displayCard() {
	// Get references to the input, container, and error elements
	const input = document.getElementById('cardKeyInput');
	const cardContainer = document.getElementById('cardContainer');
	const errorMessage = document.getElementById('errorMessage');

	// Ensure all required elements exist before proceeding
	if (!input || !cardContainer || !errorMessage) {
		console.error("Required HTML elements (cardKeyInput, cardContainer, errorMessage) not found.");
		return;
	}

	// Get input value and convert to uppercase for case-insensitive matching
	const cardKey = input.value.toUpperCase();

	// Clear any previous error message
	errorMessage.textContent = '';

	// Validate input length: should be exactly 2 characters
	if (cardKey.length !== 2) {
		errorMessage.textContent = 'Please enter a 2-letter key.';
		// Reset the card container to its initial state
		cardContainer.innerHTML = '<p class="text-gray-500">Enter a key to see the card</p>';
		return;
	}

	// Extract the rank and suit keys
	const rankKey = cardKey[0];
	const suitKey = cardKey[1];

	// Validate if the extracted rank and suit keys are valid according to the maps
	if (!rankMap[rankKey] || !suitMap[suitKey]) {
		errorMessage.textContent = 'Invalid card key. Use format like KH (King of Hearts).';
		// Reset the card container to its initial state
		cardContainer.innerHTML = '<p class="text-gray-500">Enter a key to see the card</p>';
		return;
	}

	// Get the display rank, suit symbol, and color based on the valid keys
	const rank = rankMap[rankKey];
	const suit = suitMap[suitKey].symbol;
	const color = suitMap[suitKey].color;

	// Determine the Tailwind CSS text color class based on the suit color
	const textColorClass = color === 'red' ? 'text-red-600' : 'text-black';

	// Generate the HTML string for the card display
	// This structure uses flexbox classes (assuming Tailwind is available)
	// to position the rank/suit in corners and the main symbol/rank in the center.
	// The bottom corner is rotated 180 degrees.
	cardContainer.innerHTML = `
			<div class="w-full flex justify-between ${textColorClass} card-corner">
					<span>${rank}</span>
					<span>${suit}</span>
			</div>
			<div class="flex flex-col items-center justify-center flex-grow ${textColorClass}">
					<span class="card-symbol">${suit}</span>
					<span class="card-rank font-bold">${rank}</span>
			</div>
			 <div class="w-full flex justify-between ${textColorClass} card-corner transform rotate-180">
					<span>${rank}</span>
					<span>${suit}</span>
			</div>
	`;

	// Note: The color is applied directly via the `textColorClass` in the HTML string.
	// The loop below is redundant if Tailwind classes are used for color.
	// Keeping it commented out as a potential alternative if direct style manipulation was needed.
	/*
	// Apply color dynamically (alternative to Tailwind classes)
	cardContainer.style.color = color; // Apply color to the container (might affect all text)
	// Or target specific elements if needed:
	// cardContainer.querySelectorAll('span').forEach(span => {
	//     span.style.color = color;
	// });
	*/
}

// Note: This script requires corresponding HTML elements with ids:
// - 'cardKeyInput' for the text input.
// - 'cardContainer' for the div where the card HTML will be injected.
// - 'errorMessage' for displaying validation messages.
// And CSS classes: 'card-corner', 'card-symbol', 'card-rank' for styling,
// as well as Tailwind CSS classes for layout and colors.

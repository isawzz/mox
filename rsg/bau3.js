
function createStickyAndContentDivs() {

	let stickyDiv = mDom(document.body,{position:'sticky',top:0,zIndex:1000,padding:10,bg:'#00000080'},{id:'dSticky'});
	mInsert('dPage',stickyDiv);
	// {box:true,className:'section',position:'sticky',height:'auto',top:0,zIndex:1000,padding:10,bg:'#00000080'},{id:'dSticky'}//const body = document.body;

	// Create the sticky div
	//const stickyDiv = document.createElement('div');
	// stickyDiv.id = 'dSticky';
	// stickyDiv.style.position = 'sticky';
	// stickyDiv.style.top = '0';
	// stickyDiv.style.zIndex = '1000';
	// stickyDiv.style.padding = '10px';
	// stickyDiv.innerText = 'I am a sticky div';
	//body.appendChild(stickyDiv);

	// // Create the content div
	// const contentDiv = document.createElement('div');
	// contentDiv.id = 'content';
	// contentDiv.style.padding = '20px';
	// contentDiv.innerText = 'This is the content below the sticky div.';
	// body.appendChild(contentDiv);

	// Adjust padding for the content div
	adjustContentPadding();
}

function adjustContentPadding() {
	const sticky = document.getElementById('dSticky');
	const content = document.getElementById('dPage');
	if (sticky && content) {
		content.style.paddingTop = sticky.offsetHeight + 'px';
	}
}




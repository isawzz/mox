
function setColors(item) {
	let bg = item.color;
	let fg = item.fg ?? colorIdealText(bg); //console.log('item',item,'fg',fg)
	mStyle('dPage', { bg, fg });
	//mStyle('dOuterTop', { bg:colorTrans(bg,.8), fg  });
}

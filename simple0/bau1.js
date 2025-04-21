
async function clickOn(prop,val){
	let elem = findElementBy(prop,val);
	console.log('elem', elem);
	elem.click();	

}
async function switchToMenu(menu) {
	let button = getElementWithAttribute('key', menu);
	hToggleClassMenu({ target: button });
	menu = valf(menu, DA.menu, localStorage.getItem('menu'), 'games');
	DA.pollCounter = 0;
	DA.menu = menu;
	switch (menu) {
		case 'games': await showGamesAndTables(true); DA.pollCounter = 0; DA.pollInterval = 3000; break;
		case 'table': await showTable(); DA.pollCounter = 0; DA.pollInterval = 1000; break;
	}
	localStorage.setItem('menu', menu);
}


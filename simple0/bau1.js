
async function DAGetState(){
	await fetch(`${DA.backendURL}/get_state.php`)
	.then(res => res.json())
	.then(state => {
		if (JSON.stringify(state) !== JSON.stringify(DA.gameState)) {
			DA.gameState = state;
			if (VERBOSE) console.log('Game state updated:', state);
		}
	});
	return DA.gameState;

}
async function DAInit(){
	DA.backendURL = getServer(true)  + 'simple0/php'; //'https://moxito.online/mox/simple0/php';
	if (VERBOSE) console.log('backendURL', DA.backendURL);
	DA.pollCounter = 0;
}
async function DASaveState(){

}


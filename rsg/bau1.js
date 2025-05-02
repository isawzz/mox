
async function testFlask(){
	let res = await startGame('tictactoe',['felix','amanda'],{});
	console.log('res',res);
	res = await getAllTables();
	console.log('res',res);
}
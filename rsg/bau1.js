
async function testFlask(){
	let res = await pyStartGame('tictactoe',['felix','amanda'],{});
	console.log('res',res);
	res = await getAllTables();
	console.log('res',res);
}
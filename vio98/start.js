onload = start; VERBOSE = true; TESTING = true; const SERVERDIR = 'vio98';

function start() { test0(); }

async function test0(){
	let files = await mGetFilenames('tables'); //ok
	console.log('files', files);
}

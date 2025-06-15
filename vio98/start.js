onload = start; VERBOSE = true; TESTING = true;

function start() { test0(); }

async function test0() {
	//DA.flaskUrl = 
	await loadAssetsStatic(); console.log(M);
	return;
	let files = await mGetFilenames('tables'); console.log('files', files);
}

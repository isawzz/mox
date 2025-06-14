onload = start; VERBOSE = true; TESTING = true; const SERVERDIR = 'vio98';

function start() { test0(); }

async function test0() {

	let url = 'https://moxito.online/flaskgame0';
	let res = await fetch(url); //, { mode: 'no-cors' });
	if (res.ok) {
		console.log('Flask server is running at', url);
	} else {
		console.log('Flask server is not running at', url);
	}
	let flask= await isServerRunning('flask', true);console.log('isServerRunning flask', flask);

	let server = getServer();console.log('server',server)
	await loadAssetsStatic(); console.log(M)
	API_BASE = getBackendUrl();

	let files = await mGetFilenames('tables'); //ok
	console.log('files', files);
}

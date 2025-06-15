onload = start; VERBOSE = true; TESTING = true;

function start() { test0(); }

async function test0() {
	let loc = window.location.href; console.log('href', loc);
	DA.isMoxito = loc.includes('moxito.online');
	DA.isLocal = !DA.isMoxito && !loc.includes('telecave');
	DA.isLive = !loc.includes('localhost');
	DA.project = stringAfterLast(stringBeforeLast(loc, '/'), '/'); console.log('project', DA.project);
	DA.staticUrl = DA.isLive ? '../' : 'https://moxito.online/';
	DA.phpUrl = (DA.isLocal ? 'http://localhost:8080/mox/' : 'https://moxito.online/') + DA.project + '/php/';
	DA.flaskUrl = (DA.isLocal ? 'http://localhost:5000/' : 'https://moxito.online/flaskgame0/');
	DA.nodeUrl = (DA.isLocal ? 'http://localhost:3000/' : 'https://games.moxito.online/');
	try {
		let flaskLocal = await fetch(DA.flaskUrl); //, { mode: 'no-cors' })
		console.log('flaskLocal', flaskLocal)
	} catch { DA.flaskUrl = 'https://moxito.online/flaskgame0/' }
	try {
		let nodeLocal = await fetch(DA.nodeUrl); //, { mode: 'no-cors' })
		console.log('nodeLocal', nodeLocal)
	} catch { DA.nodeUrl = 'https://games.moxito.online/' }
	//soll ich es so machen dass wenn local ist und local flask nicht laeuft, remote flask teste?

	showObject(DA, null, 'dPage');
	//DA.flaskUrl = 


	return;

	let url = 'https://moxito.online/flaskgame0';
	let res = await fetch(url); //, { mode: 'no-cors' });
	if (res.ok) {
		console.log('Flask server is running at', url);
	} else {
		console.log('Flask server is not running at', url);
	}
	let flask = await isServerRunning('flask', true); console.log('isServerRunning flask', flask);

	let server = getServer(); console.log('server', server)
	await loadAssetsStatic(); console.log(M)
	API_BASE = getBackendUrl();

	let files = await mGetFilenames('tables'); //ok
	console.log('files', files);
}

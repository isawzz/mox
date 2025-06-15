



function getBackendUrl(isScript = null) {
	if (nundef(DA.backendUrl)) {
		let loc = window.location.href;
		if (VERBOSE) console.log('href', loc);
		let sessionType = DA.sessionType = detectSessionType();
		if (VERBOSE) console.log('sessionType', sessionType);
		let backendUrl = DA.backendUrl = sessionType == 'live' ? 'http://localhost:5000' : 'at0' ? 'https://moxito.online/at0' : 'fastcomet' ? 'https://moxito.online' : isScript || sessionType == 'php' ? 'http://localhost:8080/mox' : '..';
		if (VERBOSE) console.log('backendUrl', backendUrl);
	}
	return DA.backendUrl;
}
function detectSessionType() {
	if (isdef(DA.project)) return DA.sessionType;
	let loc = window.location.href; console.log('BAU1.JS ??????????????????detectSessionType', loc);
	DA.project = stringAfterLast(stringBefore(loc, '/index.html'), '/'); console.log('project', DA.project);
	DA.serverdir = SERVERDIR;
	DA.sessionType =
		loc.includes('moxito.online/at0') ? 'at0' :
			loc.includes('moxito.online') ? 'fastcomet' :
				loc.includes('telecave') ? 'telecave' :
					loc.includes('8080') ? 'php' :
						loc.includes(':3000') ? 'nodejs' :
							loc.includes(':5000') ? 'flask' :
								'live'; // loc.includes('vidulus') ? 'vps' :
	return DA.sessionType;
}
function getServer(isScript = null) {
	let sessionType = detectSessionType();
	let server = sessionType == 'fastcomet' ? 'https://moxito.online/' : isScript || sessionType == 'php' ? 'http://localhost:8080/mox/' : '../';
	return server;
}
async function isServerRunning(which = 'flask', remote = false) {
	let url = remote ? 'https://moxito.online/' : 'http://localhost:5000/';
	url += which == 'flask' ? 'flaskgame0/' : 'node';
	console.log('checking url', url);
	try {
		const res = await fetch(url, {
			mode: 'no-cors',
		});
		console.log('res', res);
		return res.ok ? true : null;
	} catch (err) {
		return null;
	}
}



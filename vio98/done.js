
async function getDA(key, fast = true) {
	if (isdef(DA[key])) return DA[key];
	let loc = window.location.href; //console.log('href', loc);
	DA.isMoxito = loc.includes('moxito.online');
	DA.isLocal = !DA.isMoxito && !loc.includes('telecave');
	DA.isLive = !loc.includes('localhost');
	DA.project = stringAfterLast(stringBeforeLast(loc, '/'), '/'); //console.log('project', DA.project);
	DA.staticUrl = DA.isLive ? '../' : 'https://moxito.online/';
	DA.phpUrl = (DA.isLocal ? 'http://localhost:8080/mox/' : 'https://moxito.online/') + DA.project + '/php/';
	DA.flaskUrl = (DA.isLocal ? 'http://localhost:5000/' : 'https://moxito.online/flaskgame0/');
	DA.nodeUrl = (DA.isLocal ? 'http://localhost:3000/' : 'https://games.moxito.online/');
	if (!fast) {
		try {
			let flaskLocal = await fetch(DA.flaskUrl); //, { mode: 'no-cors' })
			//console.log('flaskLocal', flaskLocal)
		} catch { DA.flaskUrl = 'https://moxito.online/flaskgame0/' }
		//console.log('still here', DA.flaskUrl, DA.nodeUrl, DA.phpUrl, DA.staticUrl);
		try {
			let nodeLocal = await fetch(DA.nodeUrl); //, { mode: 'no-cors' })
			//console.log('nodeLocal', nodeLocal)
		} catch { DA.nodeUrl = 'https://games.moxito.online/' }
	}

	
	return DA[key];
}

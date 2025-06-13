
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

async function mPhpUrl(){
	console.log(DA);
	let session = detectSessionType();
  let server = session == 'fastcomet' ? 'https://moxito.online/' : session == 'telecave'? 'https://www.telecave.net/': `http://localhost:8080/${DA.serverdir}/`;
	return server + `${DA.project}/php/`;
}
async function mFlaskUrl(){
	console.log(DA);
	let session = detectSessionType();
  let server = sessionType == 'fastcomet' ? 'https://moxito.online/' : sessionType == 'telecave'? 'https://www.telecave.net/': `http://localhost:8080/${DA.serverdir}/`;
	return server + `${projectName}/php/`;
}
async function mNodeUrl(){
	console.log(DA);
	let session = detectSessionType();
  let server = sessionType == 'fastcomet' ? 'https://moxito.online/' : sessionType == 'telecave'? 'https://www.telecave.net/': `http://localhost:8080/${DA.serverdir}/`;
	return server + `${projectName}/php/`;
}

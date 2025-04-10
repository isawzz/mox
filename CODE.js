
function sockInit(port='3000') {
  let type = detectSessionType();
  let server = type == 'live'? `http://localhost:${port}` : type == 'fastcomet'? `https://moxito.online:${port}` : null;//getServer(); //getServerurl();
  console.log('::sockInit:', type, server); return;
  if (!server){  console.log('::sockInit: NO SOCKETS!!!', type, server); return;}

  Socket = io(server);
  Socket.on('disconnect', x => console.log('::io disconnect:', x));
  Socket.on('connection', x => console.log('::io connect:', x));
  // Socket.on('config', onsockConfig);
  // Socket.on('event', onsockEvent);
  Socket.on('message', o=>console.log('message',o)); //showChatMessage);
  // Socket.on('merged', onsockMerged);
  // Socket.on('pending', onsockPending);
  // Socket.on('table', onsockTable);
  // Socket.on('tables', onsockTables);
  // Socket.on('superdi', onsockSuperdi);
}
function sockPostUserChange(oldname, newname) {
  Socket.emit('userChange', { oldname, newname });
}
async function mPhpGetFiles(dir, projectName = 'ilms', verbose = false, jsonResult = true) {
	let server = getServer();
	if (verbose) console.log('to php:', server + `${projectName}/php/mox0.php`, dir);
	let res = await fetch(server + `${projectName}/php/list_files.php?dir=${encodeURIComponent(dir)}`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		}
	);
	let text;
	try {
		text = await res.text();
		if (!jsonResult) {
			return text;
		}
		let obj = JSON.parse(text);
		if (verbose) console.log('from php:\n', obj);
		let mkeys = ["config", "superdi", "users", "details"];
		for (const k of mkeys) {
			if (isdef(obj[k])) {
				M[k] = obj[k];
				if (k == "superdi") {
					loadSuperdiAssets();
				} else if (k == "users") {
					loadUsers();
				}
			}
		}
		return obj;
	} catch (e) {
		return isString(text) ? text : e;
	}
}

onload = start; VERBOSE = true;

async function start() { await test0_get_state(); }

async function test0_save_state() {
	DA.backendURL = getServer(true)  + 'simple0/php'; //'https://moxito.online/mox/simple0/php';
	console.log('backendURL', DA.backendURL);
	DA.pollCounter = 0;

  await fetch(`${backendURL}/save_state.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(DA.gameState)
  })
  .then(res => res.json())
  .then(data => console.log("Saved:", data))
  .catch(err => console.error("Save error:", err));

	console.log('DONE!')
}	
async function test0_get_state() {

	await DAInit();
	let state = await DAGetState();

	console.log('DONE!',state);
}	
async function test0_php0() {
	await loadAssetsStatic();
	// let res = await mPhpPost('all', { action: 'dir', dir:'tables' },'simple0',true); console.log('res', res)
	// let files = await mGetFilenames('tables'); //console.log('files', files);
	await loadTables();
	console.log('M',M)
}	
async function test0() {
	console.log('YEAH!');
}	
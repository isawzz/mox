
onload = start; VERBOSE = true; TESTING = true;

function start() { test0(); }

async function test0() {
	await DAInit();
	await clickOn('games');
	if (TESTING) await clickOn(rChoose(['gul', 'felix', 'amanda', 'lauren', 'mimi'])); 
	// await mSleep(30);
	// await clickOn('Set')
}

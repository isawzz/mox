
onload = start; VERBOSE = true; TESTING = true;

function start() { test0(); }

async function test0() {
	await DAInit();
	await switchToUser('lauren')
	await clickOnHTML('games');
	//if (TESTING) await clickOnHTML(rChoose(['gul', 'felix', 'amanda', 'lauren', 'mimi'])); 
	// await mSleep(30);
	// await clickOn('Set')
	//await clickOnHTML('Set');//await clickOnHTML('guest');
}

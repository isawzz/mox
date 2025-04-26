
async function pollAndShow() {
	if (isdef(DA.bPoll)) {
		// console.log('', DA.pollCounter++, 'POLLING!!!', DA.pollIntervalChanged,DA.pollInterval);
		DA.bPoll.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500 });
		//mStyle(DA.bPoll, { opacity: .5 }); await mSleep(100);
	}

	let restartAfterPoll = DA.pollIntervalChanged==true;
	if (DA.pollIntervalChanged) {
		await pollStop();
	}

	if (DA.menu == 'games') {
		await showGamesAndTables();
	} else if (DA.menu == 'table') {
		await showTable();
	}

	if (isdef(DA.bPoll)) DA.bPoll.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500 });

	if (restartAfterPoll) {		pollStart();	}

}
function pollStart() {
	if (isdef(TO.poll)) return;
	DA.pollIntervalChanged = false;
	console.log('polling started',DA.pollInterval);
	TO.poll = setInterval(pollAndShow, DA.pollInterval);
}
async function pollStop() {
	if (!TO.poll) return;
	clearInterval(TO.poll); if (VERBOSE) console.log('polling stopped', TO.poll);
	DA.pollIntervalChanged = false;
	await mSleep(100);
	TO.poll = null; // if (VERBOSE) console.log('interval reset!', TO.poll);
	await mSleep(400);
	// if (VERBOSE) console.log('all clear');

}







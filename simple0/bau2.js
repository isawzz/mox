
async function pollAndShow() {

  if (DA.menu == 'games') {
    await showGamesAndTables();
  } else if (DA.menu == 'table') {

  }
  
}
function pollStart(){
	if (isdef(TO.poll)) return;
  TO.poll = setInterval(pollAndShow, DA.pollInterval);	
}
async function pollStop(){
  clearInterval(TO.poll); console.log('polling stopped',TO.poll);
  await mSleep(100);
  TO.poll = null;console.log('interval reset!',TO.poll);
  await mSleep(400);
  console.log('all clear');

}








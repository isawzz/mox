
function pollChangeState(newState) {
	if (nundef(DA.pollCounter)) DA.pollCounter = 0; 
	DA.prevState = DA.state;
	DA.state = newState;
	pollResume();
}
async function pollResume() {
	console.log('', DA.pollCounter++, DA.prevState, DA.state);
	switch (DA.state) {
		case 'lobby':
			await showGamesAndTables();
			TO.poll = setTimeout(pollResume, 5000);
			break;
		case 'mymove': break;
		case 'othermove': break;
		default:

	}

	return;
	pollStop();
	DA.polling = true;
	let func = window[DA.pollFunc];
	console.log('', DA.pollCounter++, func.name);
	let res = await func();
	TO.poll = setTimeout(pollResume, valf(ms, DA.pollms));
}
function pollStop() {
	if (TO.poll) { clearTimeout(TO.poll); TO.poll = null; }
	DA.polling = false;
}

function mDataTable(reclist, dParent, rowstylefunc, headers, id, showheaders = true) {
  if (nundef(headers)) headers = Object.keys(reclist[0]);
  let t = mTable(dParent, headers, showheaders);
  if (isdef(id)) t.id = `t${id}`;
  let rowitems = [];
  let i = 0;
  for (const u of reclist) {
    let rid = isdef(id) ? `r${id}_${i}` : null;
    r = mTableRow(t, u, headers, rid);
    if (isdef(rowstylefunc)) mStyle(r.div, rowstylefunc(u));
    rowitems.push({ div: r.div, colitems: r.colitems, o: u, id: rid, index: i });
    i++;
  }
  return { div: t, rowitems: rowitems };
}



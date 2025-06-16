
onload = start; VERBOSE = true; TESTING = true;

function start() { test0(); }

async function test0() {
	await loadAssetsStatic(); console.log(M);
	let files = await mGetFilenames('tables'); console.log('files', files);

	let [dTop, dMain] = mLayoutTM('dPage');
	mStyle('dMain', { overy: 'auto',padding:0 }); //,grid: '1fr / 1fr', gap: 10, padding: 10 });
	let d = mDom(dMain,{gap:10,padding:10,bg:'red',wrap:true});  //,{className:'flex0'}); mFlex(d) //, { padding:10,flex:'center center row', wrap:true});//display: 'grid', gridCols: 2,gap:10, padding:10, bg: rColor() });
	mClass(d,'flexCS')

	for (const i of range(10)) {
		showObject(DA, null, d, { bg: rColor() });
	}
}

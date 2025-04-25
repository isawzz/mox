
function onclickBlinker(ev,states){
	let button = ev.target; //evToAttr('state');
	let ch=arrChildren(button)
	console.log('button', button,'\nchildren',ch, '\nstates',states);
	let elem = ch.find(x=>x.hasAttribute('state')); 
	console.log('elem',elem);
	let attr = elem.getAttribute('state');
	console.log('attr', attr);
let i=0;//nundef(attr)?0:(Number(attr)+1) % states.length;
	
	console.log('i', i);
	let state = states[i];
	console.log('state', state);
	elem.setAttribute('state', i);

	// let key = Object.keys(state)[0];
	// console.log('key', key);
	// let val = states[key];
	// console.log('val', val);
	//if (key == 'green') mBlinkOn(elem, key, ()=>elem.setAttribute('state', key));

}
function mBlinkOn(b,bg,callback){
	mClass(b,'blink');
	mStyle(b, {bg});	
	b.setAttribute('state',bg);
	if (isdef(callback)) callback();
}
function mBlinkOff(b,bg,callback){
	mClassRemove(b,'blink');
	mStyle(b, {bg});	
	b.setAttribute('state',bg);
	if (isdef(callback)) callback();
}
function mToggleColorButton(dParent,styles={},opts={},states){
	addKeys({tag:'button'},opts);

	let b=mDom(dParent,styles,opts);mFlex(b,false,'space-between','baseline',true);

	let sz=16;
	let c=mDom(b,{w:sz,h:sz,round:true,bg:'blue',position:'relative',top:2,left:3},{state:null});
	mClass(c,'blink');

	if (nundef(states)) states = [{color:'green',blink:false,f:()=>console.log('callback!')},{color:'red',blink:true,f:()=>console.log('callback!')}];

	b.onclick=ev=>onclickBlinker(ev,states);
	return b;
}





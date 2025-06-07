
function hexWithBorder(d,styles={}){
	d = toElem(d);
	let [w,h]=mSizeSuccession(styles,100);
	html = `
		<div class="hex-wrapper">
			<div class="hex-border"></div>
			<div class="hex-content"></div>
		</div>

		<style>
		.hex-wrapper {
			position: relative;
			width: ${w}px;
			height: ${h}px; /* ~height of a hexagon with 200px width */
		}

		.hex-border,
		.hex-content {
			position: absolute;
			width: 100%;
			height: 100%;
			clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
		}

		.hex-border {
			background: repeating-linear-gradient(60deg, black 0 5px, transparent 5px 10px);
			z-index: 1;
		}

		.hex-content {
			background: white;
			z-index: 0;
		}
		</style>

		`;
		return mDom(d,{},{html});
}

function hexWithBorder(d,styles={}){
	d = toElem(d);
	let [w,h]=mSizeSuccession(styles,100);
	html = `
<div class="hex-wrapper">
  <svg class="hex-border" viewBox="0 0 100 100" preserveAspectRatio="none">
    <polygon points="50,0 100,25 100,75 50,100 0,75 0,25"
             fill="none" stroke="black" stroke-width="4"
             stroke-dasharray="6,4" />
  </svg>
  <div class="hex-content"></div>
</div>

<style>
.hex-wrapper {
  position: relative;
  width: 200px;
  height: 173.2px; /* width * sqrt(3)/2 */
}

.hex-border {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hex-content {
display:none;
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  z-index: 1;
}
</style>

		`;
		return mDom(d,{},{html});
}



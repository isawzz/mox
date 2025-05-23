
function onclickTessName(ev){
	let name = ev.target.innerHTML;showTessJs(name)
}
function showTessJs(name){
  let shapeFunc = getTessagonDict()[name]; console.log('shapeFunc', shapeFunc)
	let res = generateSvgTessellation(2,3, shapeFunc);
	//console.log('res',res);
	showSvg('dMain',res);

}
function planeFunction(u, v) {
  return [u, v, 0]; // flat 2D plane
}
function generateSvgTessellation(u_num = 10, v_num = 10, shapeFunc = HexTessagon) {
  const options = {
    function: planeFunction,
    u_range: [0.0, 1.0],
    v_range: [0.0, 1.0],
    u_num: u_num,
    v_num: v_num,
    u_cyclic: false,
    v_cyclic: false,
    adaptor_class: SvgAdaptor
  };

  const tessagon = new shapeFunc(options); console.log(tessagon)
  //const tessagon = new SquareTessagon(options); console.log(tessagon)
  const svg = tessagon.create_mesh();
  return svg;
}
function showSvg(dParent,gCode){
  dParent = toElem(dParent);
	mClear(dParent)
	let html = `
		<svg id="svg2" width="500" height="500" viewBox="-0.1 -0.1 1.2 1.2" xmlns="http://www.w3.org/2000/svg" stroke="orange"
			fill="gold" stroke-width="0.005">
			${gCode}
		</svg>
		`;
	dParent.innerHTML = html;


}
function getTessagonDict(){
return {
  BigHexTriTessagon: BigHexTriTessagon,
  BrickTessagon: BrickTessagon,
  CloverdaleTessagon: CloverdaleTessagon,
  DissectedHexQuadTessagon: DissectedHexQuadTessagon,
  DissectedHexTriTessagon: DissectedHexTriTessagon,
  DissectedSquareTessagon: DissectedSquareTessagon,
  DissectedTriangleTessagon: DissectedTriangleTessagon,
  DodecaTessagon: DodecaTessagon,
  DodecaTriTessagon: DodecaTriTessagon,
  FloretTessagon: FloretTessagon,
  HexBigTriTessagon: HexBigTriTessagon,
  HexSquareTriTessagon: HexSquareTriTessagon,
  HexTessagon: HexTessagon,
  HexTriTessagon: HexTriTessagon,
  IslamicHexStarsTessagon: IslamicHexStarsTessagon,
  IslamicStarsCrossesTessagon: IslamicStarsCrossesTessagon,
  OctoTessagon: OctoTessagon,
  PentaTessagon: PentaTessagon,
  Penta2Tessagon: Penta2Tessagon,
  PythagoreanTessagon: PythagoreanTessagon,
  RhombusTessagon: RhombusTessagon,
  SquareTessagon: SquareTessagon,
  SquareTriTessagon: SquareTriTessagon,
  SquareTri2Tessagon: SquareTri2Tessagon,
  StanleyParkTessagon: StanleyParkTessagon,
  TriTessagon: TriTessagon,
  ValemountTessagon: ValemountTessagon,
  WeaveTessagon: WeaveTessagon,
  ZigZagTessagon: ZigZagTessagon,
};

}

function getTessagonList(){
	return  [
		'BigHexTriTessagon',
		'BrickTessagon',
		'CloverdaleTessagon',
		'DissectedHexQuadTessagon',
		"DissectedHexTriTessagon",
		"DissectedSquareTessagon",
		"DissectedTriangleTessagon",
		"DodecaTessagon",
		"DodecaTriTessagon",
		"FloretTessagon",
		"HexBigTriTessagon",
		"HexSquareTriTessagon",
		"HexTessagon",
		"HexTriTessagon",
		"IslamicHexStarsTessagon",
		"IslamicStarsCrossesTessagon",
		"OctoTessagon",
		"PentaTessagon",
		"Penta2Tessagon",
		"PythagoreanTessagon",
		"RhombusTessagon",
		"SquareTessagon",
		"SquareTriTessagon",
		"SquareTri2Tessagon",
		"StanleyParkTessagon",
		"TriTessagon",
		"ValemountTessagon",
		"WeaveTessagon",
		"ZigZagTessagon",
	];
}

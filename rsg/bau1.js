
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

  // const tessagon = new shapeFunc(options);
  const tessagon = new HexTessagon(options); console.log(tessagon)
  const svg = tessagon.createMesh();
  return svg;
}

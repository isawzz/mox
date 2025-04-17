
async function pollAndShow() {
  if (DA.menu == 'games') {

  } else if (DA.menu == 'table') {

  }
}

function updateUI() {
  const area = mBy('dMain');
  area.innerHTML = '<pre>' + JSON.stringify(DA.gameState, null, 2) + '</pre>';
  console.log("UI updated:", DA.gameState);
}






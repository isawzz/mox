
async function forceUpdate(){
	switch(DA.state){
		case 'lobby': DA.tableList = null; await showGamesAndTables(); break;
		case 'mymove': 
		case 'othermove': break;
		default: break;
	
	}
	

}
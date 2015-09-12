
function generateWorld(){
	for (var t in types) {
		window['generate'+t.charAt(0).toUpperCase() + t.slice(1)]();
	}
	paint();
}

function rand(fat){
	fat = fat || 0;
	var randX = Math.floor(Math.random() * (w-fat));
	var randY = Math.floor(Math.random() * (h-fat));
	return [randX, randY];
}

function generateAvatar(){
	var randCoords = rand();
	curpos = randCoords;
	map[randCoords[0]][randCoords[1]] = A;
	moveCamera();
}

function generateKnight(){

}

function generateTroll(){
	var randCoords = rand();
}

function generateAnimal(){

}

function checkCollision(coords, type) {
	switch (type) {
		case types.fort:
			for (var i=coords[0] - 5; i < coords[0] + 5; i++){
				for (var j=coords[1] - 5; j < coords[1] + 5; j++){
					if (map[i] && map[i][j])
						return true;
				}
			}
			return false;
			break;
		default:
			break;
	}
}

function addNumberToArray(count){
	var arr = [];
	while(count) {
		var n = Math.floor(Math.random() * 10);
		if (n % 3 != 0)
			continue;
		if (arr.indexOf(n) >= 0 )
			continue;
		arr.push(n);
		count--;
	}
	return arr;
}

function generateFort(){
	function allowFortPlacement(randCoords){
		for (var i=0;i<fortsPos.length;i++)
		{
			var maxCoordX = Math.max(fortsPos[i][0], randCoords[0]);
			var minCoordX = Math.min(fortsPos[i][0], randCoords[0]);
			var maxCoordY = Math.max(fortsPos[i][1], randCoords[1]);
			var minCoordY = Math.min(fortsPos[i][1], randCoords[1]);
			var allowByX = (maxCoordX - minCoordX) > 3*cw;
			var allowByY = (maxCoordY - minCoordY) > 3*ch;
			var ok = allowByX && allowByY;
			if (!ok)
				return false;
		}
		return true;
	}
	var fc = 0;
	while (fc < 2) {

		var randCoords = rand(1);
		var fortsPos = [];
		

		if (fc > 0) {

			if (!allowFortPlacement(randCoords)) {
				continue;
			}
		}

		if (checkCollision(randCoords, types.fort)){
			continue;		
		}
		var F = createEntity(Fort, randCoords);
		fortsPos.push(randCoords);
		fc++;
	}
}

function generateCorpse(){
}
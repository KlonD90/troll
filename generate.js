
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
	var tc = 0;

	while (tc < 1){

		if (checkCollision(randCoords, types.troll)){
			continue;		
		}
		createEntity(Troll, randCoords);
		tc++;
	}
}

function generateAnimal(){

}

function generateChest(){

}

function generateKnight(){

}

function generateBait(){

}

function generateCamp(){
	var cc = 0;
	var stKnightPos;
	var ndKnightPos;
	var rdKnightPos;
	var chPos = [];

	while (cc < 3) {

		var campTopLeft = rand(6);
		// var campsPos = [];		

		// if (cc > 0) {

		// 	if (!allowFortPlacement(randCoords)) {
		// 		continue;
		// 	}
		// }

		if (checkCollision(campTopLeft, types.camp)){
			continue;		
		}

		stKnightPos = [campTopLeft[0] + 2, campTopLeft[1]];
		createEntity(Knight, stKnightPos);

		ndKnightPos = [campTopLeft[0], campTopLeft[1] + 2];
		createEntity(Knight, ndKnightPos);

		rdKnightPos = [campTopLeft[0] + 4, campTopLeft[1] + 2];
		createEntity(Knight, rdKnightPos);

		chPos = [campTopLeft[0] + 2, campTopLeft[1] + 2]
		createEntity(Chest, chPos);
		
		cc++;
	}
}

function checkCollision(coords, type) {
	var coordX, coordY, conditionX, conditionY;
	switch (type) {
		case types.camp:
			var coordX = ( (coords[0] - 10) >= 0) ? coords[0] - 10 : 0;
			var coordY = ( (coords[1] - 10) >= 0) ? coords[1] - 10 : 0;
			conditionX = ( (coords[0] + 10) <= w) ? coords[0] + 10 : w;
			conditionY = ( (coords[1] + 10) <= h) ? coords[1] + 10 : h;

			for (var i=coordX; i < conditionX; i++){
				for (var j=coordY; j < conditionY; j++){
					if (map[i] && map[i][j])
						return true;
				}
			}
			return false;
		case types.fort:
		default:
			coordX = ( (coords[0] - 5) >= 0) ? coords[0] - 5 : 0;
			coordY = ( (coords[1] - 5) >= 0) ? coords[1] - 5 : 0;
			conditionX = ( (coords[0] + 5) <= w) ? coords[0] + 5 : w;
			conditionY = ( (coords[1] + 5) <= h) ? coords[1] + 5 : h;

			for (var i=coordX; i < conditionX; i++){
				for (var j=coordY; j < conditionY; j++){
					if (map[i] && map[i][j])
						return true;
				}
			}
			return false;
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
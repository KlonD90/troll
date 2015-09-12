var activeBtn = null;
var shiftMode = false;

function handleControls(){
	document.onkeydown = function(e){
		if (e.keyCode == 16)
			shiftMode = true;
		else
		{
			activeBtn = e.keyCode;
		}
	};
	document.onkeyup = function(e){
		if (e.keyCode == 16)
			shiftMode = false;
	};
	document.onkeypress = function(e){

	};
}

function aiStep(){

}

var stepTime = 200;
var regenStep = 1000;
var regenLast = 0;

handleControls();

function gameEngine(){
	switch(activeBtn)
	{
		//right
		case 39:
		case 68:
			move(curpos, [1,0], 'east');
			break;
		//up
		case 38:
		case 87:
			move(curpos, [0,-1], 'north');
			break;
		//down
		case 40:
		case 83:
			move(curpos, [0,1], 'south');
			break;
		//left
		case 37:
		case 65:
			move(curpos, [-1,0], 'west');
			break;
		case 32:
			alert('press space');
			break;
		default:
	}
	activeBtn = null;
	console.log('curpos:', curpos);
	if (regenLast>Date.now())
	{
		regenCycle();
		regenLast = Date.now()+regenStep;
	}
	paint();
}

function regenCycle(){
	for(var i=0;i<entitiesList;i++)
	{
		if (entitiesList[i].r)
		{
			entitiesList[i].chp+=r;
			if (entitiesList.chp>entitiesList.mhp)
				entitiesList.chp = entitiesList.mhp;
		}
	}
}

var gameInterval = setInterval(gameEngine, stepTime);
function pause(){
	clearInterval(gameInterval);
}
function reset(){
	gameInterval = setInterval(gameEngine, stepTime);
}
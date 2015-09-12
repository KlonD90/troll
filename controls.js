var activeBtn = null;
var shiftMode = false;
var actionEl = document.getElementById('actions');
var isPaused = false;

function handleControls(){
	document.onkeydown = function(e){
		if (e.keyCode == 27 && isPaused)
		{
			if (closeMessage)
			{
				closeMessage();
			}
			if (closeAction)
				closeAction();
		}
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
function actionPick(entity){
	switch(entity.type)
	{
		case types.corpse:
			if (entity.items && entity.items.length>0)
				A.i = A.i.concat(entity.items);
			deleteEntity(entity, getEntityPosition(entity));
			break;
		case types.bait:
			A.i.push('Bait');
			deleteEntity(entity, getEntityPosition(entity));
			break;
		case types.chest:
			break;
	}
	closeAction();
}
function actionDrop(items){

}
function closeMessage(){

}
function closeAction(){
	actionEl.style.display = 'none';
	reset();
}
function actionMenu(){
	var availableActions = [];
	if (A.i.length>0)
	{
		availableActions.push({label: 'Drop bait', action: actionDrop, entity: A.i});
	}
	getNeighbourhood(curpos).forEach(function(x){
		switch(x.type)
		{
			case types.bait:
				availableActions.push({label: 'Pick bait', entity: x, action: actionPick});
				break;
			case types.corpse:
				availableActions.push({label: 'Search corpse', entity: x, action: actionPick});
				break;
			case types.chest:
				availableActions.push({label: 'Steal a chest', entity: x, action: actionPick});
				break;
		}
	});
	pause();
	actionEl.style.display = 'block';
	if (availableActions.length == 0)
	{
		actionEl.innerHTML = 'Do nothing. Press esc to return to game.';
	}
	else
	{
		actionEl.innerHTML = '';
		availableActions.forEach(function(x){
			var btn = document.createElement('button');
			btn.classList.add('a-btn');
			btn.onclick = function(){
				x.action(x.entity);
			};
			btn.innerHTML = x.label;
			actionEl.appendChild(btn);
		});
	}
}

function getNeighbourhood(pos){
	var a=[];
	if (map[pos[0]-1] && map[pos[0]-1][pos[1]])
		a.push(map[pos[0]-1][pos[0]]);
	if (map[pos[0]+1] && map[pos[0]+1][pos[1]])
		a.push(map[pos[0]+1][pos[0]]);
	if (map[pos[0]][pos[1]-1])
		a.push(map[pos[0]][pos[1]-1]);
	if (map[pos[0]][pos[1]+1])
		a.push(map[pos[0]][pos[1]+1]);
	return a;
}

function aiStep(){

}

var stepTime = 100;
var regenStep = 1000;
var regenLast = 0;

handleControls();

String.prototype.firstBig = function(){
	return this.substr(0,1).toUpperCase()+this.substr(1);
};

function gameEngine(){
	var d;
	switch(activeBtn)
	{
		//right
		case 39:
		case 68:
			d = [1,0];
			if (shiftMode)
				move(curpos, d, 'east');
			else
				attack(curpos, [curpos[0]+d[0], curpos[1]+d[1]], 'east');
			break;
		//up
		case 38:
		case 87:
			d = [0,-1];
			if (shiftMode)
				move(curpos, d, 'north');
			else
				attack(curpos, [curpos[0]+d[0], curpos[1]+d[1]], 'north');
			break;
		//down
		case 40:
		case 83:
			d =[0,1];
			if (shiftMode)
				move(curpos, d, 'south');
			else
				attack(curpos, [curpos[0]+d[0], curpos[1]+d[1]], 'south');
			break;
		//left
		case 37:
		case 65:
			d = [-1,0];
			if (shiftMode)
				move(curpos, d, 'west');
			else
				attack(curpos, [curpos[0]+d[0], curpos[1]+d[1]], 'west');
			break;
		case 32:
			actionMenu();
			break;
		default:
	}
	activeBtn = null;
	console.log('curpos:', curpos);
	function normalize(x){
		return x>0?1:(x<0?-1:0);
	}
	entitiesList.forEach(function(x){
		if (x.status && x.status == 1)
		{
			var pos = getEntityPosition(x);
			var aggroPos = getEntityPosition(x.aggro);
			var xdiff = pos[0]-aggroPos[0];
			var chasePhrase = x.type.firstBig()+' chase '+x.aggro.type;
			if (xdiff)
			{
				move(pos, [normalize(-xdiff), 0], false, chasePhrase);
			}
			else
			{
				var ydiff = pos[1]-aggroPos[1];
				if (ydiff)
				{
					move(pos, [0, normalize(-ydiff)], false, chasePhrase);
				}
			}
			getNeighbourhood(pos).forEach(function(n){
				if (n== x.aggro)
				{
					attack(pos, aggroPos);
				}
			});
		}
	});
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
	isPaused = true;
}
function reset(){
	gameInterval = setInterval(gameEngine, stepTime);
	isPaused = false;
}

function message(m, f){
	pause();

}
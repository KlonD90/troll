'use strict';
/*map width and map height*/
var w=80, h=50, i=0, j=0, map = [];

var screenEl = document.getElementById('gamescreen');
for(;i<w;i++)
{
	var j=0;
	let row = [];
	for (;j<h;j++)
		row.push(0);
	map.push(row);
}

// var restrictions = {
// 	avatar: {
// 		pos: 2
// 	}
// };

//hero default position
// map[500][500] = A;



var screenEl = document.getElementById('gamescreen')

//status 0=peace 1=aggro
//range aggro range

//hero default position
// map[100][100] = A;
//camera position and size(width, height)
var cpx=0, cpy=0, cw=60, ch=20, curpos=[0,0];
moveCamera();

function paint(){
	var screen = [];
	for (var i=cpx; i<cpx+cw;i++)
	{
		let row = [];
		for (var j=cpy; j<cpy+ch;j++)
			row.push(map[i][j]);
		screen.push(row);
	}
	function renderSymbol(cls, sym){
		return '<span class="'+cls+'">'+sym+'</span>';
	}
	var html = '';
	for (var j=0;j<ch;j++)
	{
		for(var i=0;i<cw; i++)
		{
			if (!screen[i][j])
			{
				html+=renderSymbol('t','.');
				continue;
			}
			switch(screen[i][j].type){
				case types.avatar:
					html+=renderSymbol('A', '@');
					break;
				case types.fort:
					html+=renderSymbol('F','F');
					break;
				case types.chest:
					html+=renderSymbol('c', '$');
					break;
				case types.knight:
					html+=renderSymbol('K', 'K');
					break;
				case types.troll:
					html+=renderSymbol('T','T');
					break;
				case types.corpse:
					html+=renderSymbol('C','o');
					break;
				case types.animal:
					html+=renderSymbol('a','d');
					break;
				default:
					break;
			}
		}
		html+='<br/>';
	}
	screenEl.innerHTML=html;
	paintPanel();
}

generateWorld();
var curFontSize = 14;
function resize(){
	paint();
	var w = screenEl.offsetWidth;
	var h = screenEl.offsetHeight;
	while(w < window.document.documentElement.clientWidth && h < window.document.documentElement.clientHeight){
		w = screenEl.offsetWidth;
		h = screenEl.offsetHeight;
		curFontSize++;
		screenEl.style.fontSize = curFontSize+'px';
	}
	curFontSize--;
	screenEl.style.fontSize = curFontSize+'px';
}
resize();

window.onresize = resize;
//check valid of location
function checkValidMoveLocation(pos){
	if (pos[0]>w || pos[1]>h || pos[0]<0 || pos[1]<0 || map[pos[0]]==undefined || map[pos[0]][pos[1]]===undefined)
		return false;
	if (map[pos[0]][pos[1]])
	{
		let t= map[pos[0]][pos[1]].type;
		return false;
	}
	return true;
}

function checkValidAttackLocation(pos){
	if (pos[0]>w || pos[1]>h || pos[0]<0 || pos[1]<0 || map[pos[0]]==undefined || map[pos[0]][pos[1]]===undefined)
		return false;
	if (map[pos[0]][pos[1]])
	{
		let t= map[pos[0]][pos[1]].type;
		return t==types.knight || t==types.troll || t==types.avatar || t==types.animal;
	}
	return false;
}

function move(from, direction, l, log){
	var to = [from[0]+direction[0], from[1]+direction[1]];
	if (checkValidMoveLocation(to)){
		var tmp = map[from[0]][from[1]];
		map[to[0]][to[1]] = tmp;
		map[from[0]][from[1]] = 0;
		if (tmp.type == types.avatar)
		{
			curpos = to;
			moveCamera();
			LogPanel.log('Move to '+l+'.');
		}
		if (log)
			LogPanel.log(log);
	}
}

function damage(dmg){
	return Math.round((dmg-1)*Math.random())+1;
}
function attack(from, to, l){
	if (checkValidAttackLocation(to)){
		var attacker = map[from[0]][from[1]];
		var target = map[to[0]][to[1]];
		var deal = damage(attacker.dmg);
		target.chp-=deal;
		var at = attacker.type;
		var tt = target.type;
		if (target.status!=undefined)
			target.status = 1;
		target.aggro = attacker;
		LogPanel.log(at[0].toUpperCase()+at.substr(1)+' attack '+ tt+'. Deal '+deal+' damage.');
		if (target.chp<=0)
		{
			dieEntity(target, to);
			if (target.type==types.avatar)
			{
				pause();

			}
			if (attacker.aggro)
			{
				attacker.aggro = null;
				attacker.status = 0;
			}
			LogPanel.log(tt[0].toUpperCase() +tt.substr(1)+' die.');
		}
	}
	else
		move(from, [to[0]-from[0], to[1]-from[1]], l);
}

function moveCamera(){
	cpx=Math.round(curpos[0] - cw/2);
	cpy=Math.round(curpos[1] - ch/2);
	if (cpx<0)
		cpx=0;
	if (cpx+cw>w)
		cpx=w-cw;
	if (cpy<0)
		cpy=0;
	if(cpy+ch>h)
		cpy=h-ch;
}

function iterateOverMap(f){
	for (var i=0;i<w;i++)
	{
		for(var j=0;j<h;j++)
		{
			f([i, j], map[i][j]);
		}
	}
}

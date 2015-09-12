'use strict';
	/*map width and map height*/
var w=150, h=130, i=0, map = [];
for(;i<w;i++)
{
	var j=0;
	let row = [];
	for (;j<h;j++)
		row.push(0);
	map.push(row);
}
var screenEl = document.getElementById('gamescreen')

//status 0=peace 1=aggro
//range aggro range

//hero default position
map[100][100] = A;
//camera position and size(width, height)
var cpx=0, cpy=0, cw=60, ch=20, curpos=[100,100];
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
				default :
					break;
			}
		}
		html+='<br/>';
	}
	screenEl.innerHTML=html;
	paintPanel();
}

paint();
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
		return t=='bait' || t=='corpse';
	}
	return true;
}

function checkValidAtackLocation(pos){
	if (pos[0]>w || pos[1]>h || pos[0]<0 || pos[1]<0 || !map[pos[0]][pos[1]])
		return false;
	return true;
}

function move(from, direction, l){
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
	}
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
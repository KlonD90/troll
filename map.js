'use strict';
	/*map width and map height*/
var w=1000, h=1000, i=0, j=0, map = [];
for(;i<w;i++)
{
	let row = [];
	for (;j<h;j++)
		row.push(0);
	map.push(row);
}
var types = {avatar: 'avatar', knight: 'knight', troll: 'troll', corpse: 'corpse', animal: 'animal', fort: 'fort'};
var screenEl = document.getElementById('gamescreen')
var A = {
	type: types.avatar,
	mhp: 10,//max hp
	chp: 10,//current hp
	r: 0.5,//regen,
	i: []//items
};
//hero default position
map[500][500] = A;
//camera position and size(width, height)
var cpx=470, cpy=490, cw=60, ch=20;

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
				html+=renderSymbol('t','~');
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
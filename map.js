'use strict';
	/*map width and map height*/
var w=400, h=200, i=0, j=0, fc=0, map = []; //fc - forts count

var types = {avatar: 'avatar', fort: 'fort', knight: 'knight', troll: 'troll', corpse: 'corpse', animal: 'animal'};
var screenEl = document.getElementById('gamescreen');
for(;i<w;i++)
{
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
var A = {
	type: types.avatar,
	mhp: 10,//max hp
	chp: 10,//current hp
	r: 0.5,//regen,
	i: [],//items
	s: 1,//placement slots
	r: { // restrictions
		pos: 2 //how far to another type 
	}
};

var F = {
	type: types.fort,
	mhp: 100,
	chp: 100,
	r: 0,
	i: [],
	s: [2, 2],
	r: {
		'betweenSelf': [cw, ch],
	}
}
//hero default position
// map[500][500] = A;
//camera position and size(width, height)
var cpx=300, cpy=250, cw=60, ch=20;

function generateWorld(){
	for (var t in types) {
		window['generate'+t.charAt(0).toUpperCase() + t.slice(1)]();
	}
	paint();
}

function rand(){
	var randX = Math.floor(Math.random() * w);
	var randY = Math.floor(Math.random() * h);
	return [randX, randY];
}

function generateAvatar(){
	var randCoords = rand();
	map[randCoords[0]][randCoords[1]] = A;
}

function generateKnight(){

}

function generateTroll(){

}

function generateAnimal(){

}

function checkCollision(coords, type) {
	debugger;
	switch (type) {
		case types.fort:
			for (var i=coords[0] - 5; i < coords[0] + 5; i++){
				for (var j=coords[1] - 5; j < coords[1] + 5; i++){
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
function generateFort(){
	function allowFortPlacement(forts, randCoords){
		var maxCoordX = Math.max(forts[fc]['x'], randCoords);
		var minCoordX = Math.min(forts[fc]['x'], randCoords);
		var maxCoordY = Math.max(forts[fc]['y'], randCoords);
		var minCoordY = Math.min(forts[fc]['y'], randCoords);
		var allowByX = (maxCoordX - minCoordX) > 3*cw;
		var allowByY = (maxCoordY - minCoordY) > 3*ch;
		return allowByX && allowByY;
	}
	while (fc < 2) {
		var randCoords = rand();
		var forts = {};
		

		if (fc > 0) {

			if (!allowFortPlacement(forts, randCoords)) {
				return generateFort();
			}
		}

		if (checkCollision(randCoords, F.type)){
			return generateFort();			
		}

		if ( (randCoords[0] == 0) && (randCoords[1] == 0) ) {
			for (var i; i < F.s[0]; i++ ) {
				for (var j; j < F.s[1]; j++) {
					forts[fc]['x'] = randCoords[0];
					forts[fc]['y'] = randCoords[1];
					map[randCoords[0] + i][randCoords[1] + j] = F;
				}
			}
		}
		else if ( (randCoords[0] == w) && (randCoords[1] == h) ) {
			for (var i; i < F.s[0]; i++ ) {
				for (var j; j < F.s[1]; j++) {
					forts[fc]['x'] = randCoords[0];
					forts[fc]['y'] = randCoords[1];
					map[randCoords[0] - i][randCoords[1] - j] = F;
				}
			}
		}
		else {
			for (var i; i < F.s[0]; i++ ) {
				for (var j; j < F.s[1]; j++) {
					forts[fc]['x'] = randCoords[0];
					forts[fc]['y'] = randCoords[1];
					map[randCoords[0] + i][randCoords[1] + j] = F;
				}
			}
		}
		
		fc++;
	}
}

function generateCorpse(){
}



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
				default:
					break;
			}
		}
		html+='<br/>';
	}
	screenEl.innerHTML=html;
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
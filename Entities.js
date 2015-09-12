var types = {avatar: 'avatar', knight: 'knight', troll: 'troll', corpse: 'corpse', animal: 'animal', fort: 'fort', bait: 'bait'};

function Knight(){
	return {
		type: types.knight,
		mhp: 30,
		chp: 30,
		dmg: 2,
		r: 1,
		status: 0
	};
}
function Troll(){
	return {
		type: types.troll,
		mhp: 40,
		chp: 40,
		dmg: 3,
		r: 2,
		xp: 0,
		level: 1,
		status: 0
	}
}
function Animal(){
	return {
		type: types.animal,
		mhp: 20,
		chp: 20,
		dmg: 1,
		r: 0.5,
		status: 0
	}
}
function Corpse(entity){
	var t ={
		type: types.corpse,
		items: []
	};
	if (entity.type==types.animal)
		t.items.push('Bait');
	return t;
}
function Bait(){
	return {
		type: types.bait
	};
}
function Fort(){
	return {
		type: types.fort,
		mhp: 100,
		chp: 100,
		r: 10,
		dmg: 10,
		status: 0
	};
}

var A = {
	type: types.avatar,
	mhp: 10,//max hp
	chp: 10,//current hp
	r: 0.5,//regen,
	i: []//items
};
var entitiesList = [A];
function createEntity(constructor, position){
	var entity = constructor();
	entitiesList.push(entity);
	map[position[0]][position[1]] = entity;
	if (entity.type == types.fort)
	{
		map[position[0]+1][position[1]] = entity;
		map[position[0]+1][position[1]+1] = entity;
		map[position[0]][position[1]+1] = entity;
	}
	return entity;
}

function dieEntity(entity, position){
	var c = Corpse(entity);
	map[position[0]][position[1]] = c;
	entitiesList.splice(entitiesList.indexOf(entity), 1);
}

function deleteEntity(entity, position){
	map[position[0]][position[1]] = 0;
	entitiesList.splice(entitiesList.indexOf(entity), 1);
}
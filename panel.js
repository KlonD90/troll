var panelEl = document.getElementById('panel');

function paintPanel(){
	panelEl.innerHTML=`HP: ${A.mhp}/${A.chp}<br/>
	Position: ${curpos[0]}, ${curpos[1]}<br/>Items: `+(A.i.length? A.i.join(',') : 'None' );
}
var logEl = document.getElementById('console');
var LogPanel={
	log: function(m){
		logEl.innerHTML=m+'<br/>'+logEl.innerHTML;
	}
};
LogPanel.log('Welcome at Please Feed The Troll.');
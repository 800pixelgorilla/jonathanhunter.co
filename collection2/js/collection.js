var gameList = []
var mycollection = "https://bgg-json.azurewebsites.net/collection/800pixelgorilla"

var app = new Vue({
	el:"#app",
	data:{
		list:gameList,
	},
})

$.getJSON(mycollection, function(data){
	$(data).each(function(){
		var game = this
		gameList.push(game);
	})
})
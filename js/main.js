var count=0;
var gameList = [];
var mycollection = "https://www.boardgamegeek.com/xmlapi/collection/800pixelgorilla"
var callbacklimit = true;
 
/*
for(const rating in ratings) {  
  // 2
  const starPercentage = (ratings[rating] / starTotal) * 100;
  // 3
  const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
  // 4
  document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded; 
}
*/

var vm = new Vue({
	el: "#main",
	directives: {
		imagesLoaded: window.VueImagesLoaded
	},
	data: {
		list:gameList,
		selected: null,
		sortOption:null,
		filterOption:null,
		filterText: "",
		layouts: [
	      "masonry",
	      "fitRows",
	      "cellsByRow",
	      "vertical",
	      "packery",
	      "masonryHorizontal",
	      "fitColumns",
	      "cellsByColumn",
	      "horiz"
	    ],
	    currentLayout: 'masonry',
		
	    option:{
		    layoutMode: 'masonry',
	          	masonry: {
	            	gutter: 10
	          	},
	          	itemSelector: '.item',
				getSortData: {
// 					minPlayers : 'minPlayers',
// 					maxPlayers : 'maxPlayers',
	        		Name: function(itemElem){
	        			return itemElem.name.toLowerCase();     
	        		},
	        		Rating: function(itemElem){
	        			return 10-itemElem.rating;
	        		},
	        	},
	      		getFilterData:{
	      			filterByText: function(itemElem){
	        			return itemElem.name.toLowerCase().includes(_this.filterText.toLowerCase());
	        		}
	      		}
	    }
	},
	methods:{
		sort: function(key) {
	      this.$refs.cpt.sort(key);
	    },
		layout: function () {
			this.$refs.cpt.layout('fitRows');
		},
		changeLayout: function(key) {
	      this.$refs.cpt.layout(key);
	    }
	}
});

$.getJSON(mycollection, function(data) {
	console.log($(data).length);
	
	document.getElementById("title").textContent += (" - " +$(data).length);
	
	$(data).each(function(){
		var game = this;
		game.id = game.gameId;
		
		var perc = (game.rating / 10) * 100;
		
		game.starPercentage = (Math.round(perc/10) * 10)-2 + "%";
		gameList.push(game);
	})
})

function callback(instance){
   vm.layout();
   if(instance.images.length == instance.progressedCount && callbacklimit)
   {
   		callbacklimit = false;
	   $('.progressive').each(function(){
		   var bigimage = new Image();
		   var c = $(this);
		   bigimage.onload = function()
		   {
		   	  c.children('.boximage').attr('src',bigimage.src);
		   } 
		   bigimage.src = $(this).attr('href');
	   })
   }
}

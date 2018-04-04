var count=0;
var gameList = [];
var mycollection = "https://bgg-json.azurewebsites.net/collection/800pixelgorilla?grouped=true"
var callbacklimit = true;

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
	        		id: "id",
	        		name: function(itemElem){
	        			return itemElem.name.toLowerCase();     
	        		},
	        		geekRating: function(itemElem){
	        			return 10-itemElem.averageRating;
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
	$(data).each(function(){
		var game = this;
		game.id = game.gameId;
		game.geekRating = Math.round(game.averageRating)
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
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
	},
	methods:{
		getOptions: function () {
			var _this = this
			return {
				layoutMode: 'masonry',
	          	masonry: {
	            	gutter: 10
	          	},
				getSortData: {
	        		id: "id",
	        		name: function(itemElem){
	        			return itemElem.name.toLowerCase();     
	        		}
	        	},
	      		getFilterData:{
	      			isEven: function(itemElem){
	      				return itemElem.id % 2 === 0;
	      			},
	      			isOdd: function(itemElem){
	      				return itemElem.id % 2 !== 0;
	      			},
	      			filterByText: function(itemElem){
	        			return itemElem.name.toLowerCase().includes(_this.filterText.toLowerCase());
	        		}
	      		}
	      	}
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
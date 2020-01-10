define(["./slideIn"], function(slideIn) {

	return {

		previous: 0,

		loadCards: function(/*array*/ cards){
			//for(var k = 0; k < cards.length; k++){
			//TODO: Adapt to create instances of the card widget dynamically.
			for(var k = 0; k < 2; k++){
				if(cards[k].pan)	this.view[`card${k}`].pan = cards[k].pan;
				if(cards[k].holder)	this.view[`card${k}`].holder = cards[k].holder.toUpperCase();
				if(cards[k].image)	this.view[`card${k}`].image = cards[k].image;
			}
		},

		bindCarousel: function(){
			var cards = this.view.carouselFlex.widgets();
			this.view.carouselFlex.onScrollEnd = () => {
				if(cards.length > 0){
					var offset = parseInt(this.view.carouselFlex.contentOffsetMeasured.x);
					var width = parseInt(this.view.carouselFlex.frame.width);
					var index = Math.round(offset / width);
					if(index !== this.previous && typeof this.onCardSelected === "function"){
						var card = cards[index];
						kony.print(`Selected card ${card.id} at ${index}`);
						this.previous = index;
						this.onCardSelected(index, card);
					}
					//TODO: For SPA, we have to animate the selected card into focus.
				}
			};
		},

		preShow: function(){
			//Place the cards far out of sight to the right,
			//so we can slide them back in from right to left.
			this.view.carouselFlex.centerX = "140%";
		},

		postShow: function() {
			slideIn(this.view.carouselFlex);
			this.bindCarousel();
		},

		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {
			this.view.carouselFlex.showFadingEdges = false;
			this.view.preShow = this.preShow;
			this.view.postShow = this.postShow;
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {}
	};
});
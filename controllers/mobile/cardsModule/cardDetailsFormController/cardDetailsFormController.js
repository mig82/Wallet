define(["cardsModule/CardModel"], function(Card){

	return {

		init: function(){
			//Stuff you only want done once the first time the screen is visited.
		},

		preShow: function(){
			//Move stuff out of sight if you want to then animate back in.
		},

		postShow: function() {
			this.view.doneButton.onPressed = () => {kony.router.goBack();};
		},

		onHide: function(){
			//Make sure you destroy/empty large variables that won't be needed anymore.
		},

		onNavigate: function(){
			//Wire it all together.
			kony.mvc.wire(this);
		}
	};
});

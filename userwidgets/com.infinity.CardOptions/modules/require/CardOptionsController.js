define(function() {

	return {
		buttons: ["blockButton", "detailsButton", "configButton"],

		//Expose this to allow the parent to make the buttons appear.
		showButtons: function(){
			//Let's use a cumulative delay to animate the buttons one after the other.
			this.view.blockButton.showButton(0.5, 0.2);
			this.view.detailsButton.showButton(0.5, 0.4);
			this.view.configButton.showButton(0.5, 0.6);
		},

		//Expose this to allow the parent to hide the buttons.
		hideButtons: function(){
			this.view.blockButton.hideButton();
			this.view.detailsButton.hideButton();
			this.view.configButton.hideButton();
		},

		//Safely invoke the onPressed listener if assigned by the parent.
		invokeOnPressed: function(index){
			if(typeof this.onPressed === "function"){
				this.onPressed(index);
			}
		},

		preShow: function(){
			//Hide the buttons so they can be faded in.
			this.hideButtons();
		},

		postShow: function(){

			//Fade in the option buttons to make them visible.
			this.showButtons();

			//Assign a listener to onPressed of each ripple button.
			this.view.blockButton.onPressed = ()=>{
				this.invokeOnPressed(0);
			};

			this.view.detailsButton.onPressed = () => {
				this.invokeOnPressed(1);
			};

			this.view.configButton.onPressed = () => {
				this.invokeOnPressed(2);
			};
		},

		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {
			this.view.preShow = this.preShow;
			this.view.postShow = this.postShow;
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		}
	};
});
define(function() {

	function checkForKronin(){
		if(typeof kony.animations !== "object" ||
			typeof kony.animations.animate !== "function" ||
			typeof kony.animations.animate !== "function"){
			throw new Error(
				"Component com.mig82.RibbonsAnimation requires Kronin\n" +
				"Look for it at https://www.npmjs.com/package/kronin"
			);
		}
	}
	return {
		invokeAnimationDone: function(){
			//Custom event onAnimationDone must be exposed and defined so the parent
			//form can react to the animation being done.
			if (typeof this.onAnimationDone === "function"){
				this.onAnimationDone();
			}
			else{
				kony.print("Ribbons animation done!");
			}
		},

		preShow: function(){
			this.view.middleRibbonFlex.height = "0%";
			this.view.topRibbonFlex.left = "100%";
			this.view.bottomRibbonFlex.left = "-100%";
			this.view.logoImage.opacity = 0;
		},

		postShow: function(){

			checkForKronin();

			//TODO:Expose all of these animation delays and durations.
			//0.7 seconds for middle.
			kony.animations.animate(this.view.middleRibbonFlex, "height", "0%", "60%", 0.5, 0.2);
			//1.2 seconds for top and bottom.
			kony.animations.animate(this.view.topRibbonFlex, "left", "100%", "0%", 0.5, 0.7);
			kony.animations.animate(this.view.bottomRibbonFlex, "left", "-100%", "0%", 0.5, 0.7);
			//2 seconds to show image.
			kony.animations.reveal(this.view.logoImage, 0.8, 1.2);

			kony.timer.schedule2(this.invokeAnimationDone, 2.5);
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
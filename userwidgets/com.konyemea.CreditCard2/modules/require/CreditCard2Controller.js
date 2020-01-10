define(["./splitBySpaces"], function(splitBySpaces) {

	return {
		preShow: function(){
			this.view.panLabel.text = splitBySpaces(this.view.panLabel.text);
		},

		postShow: function(){},

		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {
			this.view.preShow = this.preShow;
			this.view.postShow = this.postShow;
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {}
	};
});
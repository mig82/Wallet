define(function() {

	return {
		setFocusSkins: function(){
			this.view.tileFillFlx.skin = "ButtonWithIconFlexFocusSkin";
			this.view.btnLabel.skin = "ButtonWithIconLabelFocusSkin";
		},

		setNormalSkins: function(){
			this.view.tileFillFlx.skin = "ButtonWithIconFlexSkin";
			this.view.btnLabel.skin = "ButtonWithIconLabelSkin";
		},

		postShow: function(){
			/*globals localiseWidget*/
			localiseWidget(this.view.btnLabel);
			this.view.onTouchStart = this.setFocusSkins;
			this.view.onTouchEnd = this.setNormalSkins;
		},

		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {
			this.view.postShow = this.postShow;
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		}
	};
});
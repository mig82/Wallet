define(function() {

	return {
		preShow: function(){
			if(typeof kony.i18n.localizeWidget === "undefined"){
				throw new Error(
					`Component ${this.view.id} requires Kronin's kony.i18n.localizeWidget.\n` +
					"Get it at https://www.npmjs.com/package/kronin"
				);
			}
			kony.i18n.localizeWidget(this.view.innerLabel);
		},

		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {
			this.view.preShow = this.preShow;
		},

		initGettersSetters: function() {
		}
	};
});
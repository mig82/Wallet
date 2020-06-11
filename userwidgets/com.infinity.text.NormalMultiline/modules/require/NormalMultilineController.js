define(function() {

	return {
		preShow: function(){
			kony.i18n.localizeWidget(this.view.innerTextArea.text);
		},

		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {
			this.view.preShow = this.preShow;
			this.view.innerTextArea.setEnabled(false);
		},

		initGettersSetters: function() {
			defineGetter(this, "i18n", () => {return this._i18n;});
			defineSetter(this, "i18n", (i18n) => {this._i18n = i18n;});
		}
	};
});
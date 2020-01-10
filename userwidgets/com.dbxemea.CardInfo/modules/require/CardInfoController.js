define(function() {

	return {
		showLabels(){
			/*globals reveal*/
			reveal(this.view.typeLabel, 0.5, 0.25);
			reveal(this.view.holderLabel, 0.5, 0.50);
			reveal(this.view.balanceLabel, 0.5, 0.75);
		},

		hideLabels(){
			this.view.typeLabel.opacity = 0;
			this.view.holderLabel.opacity = 0;
			this.view.balanceLabel.opacity = 0;
		},

		setCardInfo: function(type, holder, balance, limit, currency){
			this.hideLabels();
			this.view.typeLabel.text = type;
			this.view.holderLabel.text = holder;
			var localisedBalance = kony.i18n.getCurrencyAmount(balance, 2, currency);
			this.view.balanceLabel.text = localisedBalance;
			this.view.creditLimit.setBalance(balance, limit);
			this.showLabels();
		},

		preShow: function(){
			this.hideLabels();
		},

		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {
			this.view.preShow = this.preShow;
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {}
	};
});
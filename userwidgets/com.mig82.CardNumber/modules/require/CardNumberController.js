/**
* A label that behaves like a PAN. The PAN is the Payment/Primary Account Number
* —i.e. The number on the card. It's most commonly (for Master, Visa et al) a 16 digit
* number, grouped into four groups of four digits each.
* Read more at https://en.wikipedia.org/wiki/Payment_card_number.
*
* @author: Miguelangel Fernandez.
*/
define(["./splitByFours"], function(splitByFours) {

	//TODO: Implement Amex split. Grouping digits into 4, 6 and 5 —e.g. 3XXX XXXXXX XXXXX
	return {

		setNumber(number){
			this.view.panLabel.text = splitByFours(number);
		},

		preShow: function(){
			var pan = this.view.panLabel;
			if(pan.text && pan.text.trim().length>4) {
				pan.text = splitByFours(pan.text);
			}
		},

		postShow: function(){},

		onHide: function(){},

		//Use the constructor to bind preShow, postShow and onHide.
		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {
			this.view.preShow = this.preShow;
			this.view.postShow = this.postShow;
			this.view.onHide = this.onHide;
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {}
	};
});

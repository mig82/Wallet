define(["./grow"], function(grow) {

	const initialWidth = "1%";

	function calcFinalWidth(balance, limit){
		return balance*100/limit + "%";
	}

	return {
		setBalance: function(balance, limit){
			this._limit = parseFloat(limit);
			this._balance = parseFloat(balance);
			this.growBalanceBar();
		},

		growBalanceBar: function(){
			var balanceFlex = this.view.balanceFlex;
			grow(balanceFlex, balanceFlex.width || initialWidth, calcFinalWidth(
				this._balance,
				this._limit
			));
		},

		preShow: function(){
			this.view.balanceFlex.width = initialWidth;
		},

		postShow: function(){
			this.growBalanceBar();
		},

		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {
			this.view.preShow = this.preShow;
			this.view.postShow = this.postShow;
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
			//The part of the credit limit used so far.
			defineGetter(this, "balance", () => {return this._balance;});
			defineSetter(this, "balance", (balance) => {this._balance = parseFloat(balance);});

			//The max credit limit.
			defineGetter(this, "limit", () => {return this._limit;});
			defineSetter(this, "limit", (limit) => {this._limit = parseFloat(limit);});
		}
	};
});
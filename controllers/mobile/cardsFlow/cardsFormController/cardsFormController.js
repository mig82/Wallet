define(function(){

	return {

		cards: [],

		showCardDetails: function(index){
			if(this.cards.length > 0){
				var card = this.cards[index];
				this.view.CardInfo.setCardInfo(
					card.type,
					card.holder,
					card.balance,
					card.limit,
					card.currency
				);
			}
		},

		hideCardOptions: function(){
			if(kony.os.isIos()){
				this.view.blockButton.opacity = 0;
				this.view.detailsButton.opacity = 0;
				this.view.settingsButton.opacity = 0;
			}
			else{
				this.view.buttonsContainer.opacity = 0;
			}
			this.view.linkedAccountFlex.opacity = 0;
		},

		showCardOptions: function(){
			if(kony.os.isIos()){
				kony.animations.reveal(this.view.blockButton, 0.5, 0.20);
				kony.animations.reveal(this.view.detailsButton, 0.5, 0.40);
				kony.animations.reveal(this.view.settingsButton, 0.5, 0.60);
			}
			else{
				kony.animations.reveal(this.view.buttonsContainer);
			}
			kony.animations.reveal(this.view.linkedAccountFlex, 0.5, 0.80);
		},

		init: function(){
			//Stuff you only want done once the first time the screen is visited.
		},
		preShow: function(){
			//Move stuff out of sight if you want to then animate back in.
			this.hideCardOptions();
		},

		postShow: function() {
			//Call services to populate screen.
			//Animate stuff back into sight.

			const fetchCards = require("cardsFlow/fetchCards");
			fetchCards()
			.then((cards) => {
				kony.print("Cards: "+ JSON.stringify(cards));
				this.cards = cards;
				this.showCardDetails(0);
				this.view.carousel.loadCards(cards);
				//TODO: set the cards array to the carousel.
			});
			this.view.carousel.onCardSelected = this.showCardDetails;
			this.showCardOptions();
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

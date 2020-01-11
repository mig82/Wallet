define(function(){

	return {

		showCardDetails: function(index){
			const fetchCards = require("cardsFlow/fetchCards");
			fetchCards()
			.then((cards) => {
				if(cards.length > 0){
					var card = cards[index];
					this.view.CardInfo.setCardInfo(
						card.type,
						card.holder,
						card.balance,
						card.limit,
						card.currency
					);
				}
			});
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
			/*TODO: the options for each card should depend on the card selected —e.g.:
			If the card is blocked, the option to block it should not appear or be disabled.*/

			if(kony.os.isIos()){
				kony.animations.reveal(this.view.blockButton, 0.5, 0.25);
				kony.animations.reveal(this.view.detailsButton, 0.5, 0.5);
				kony.animations.reveal(this.view.settingsButton, 0.5, 0.75);
			}
			else{
				kony.animations.reveal(this.view.buttonsContainer, 0.5, 0.25);
			}
			kony.animations.reveal(this.view.linkedAccountFlex, 0.5, 0.50);
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

				//Show the type, holder and balance of the first card.
				this.showCardDetails(0);

				//Show the options for the selected card.
				this.showCardOptions();

				//Set the cards array to the carousel.
				this.view.carousel.loadCards(cards);
			});

			//Whenever a card is selected, show the details for the selected card.
			//Note that CardsCarousel.onCardSelected returns one parameter which is the index
			//of the selected card.
			this.view.carousel.onCardSelected = (index) => {
				this.hideCardOptions();
				this.showCardDetails(index);
				this.showCardOptions();
			};

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

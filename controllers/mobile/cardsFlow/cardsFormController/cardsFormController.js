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
			//TODO: Ex03.- Inform CardOptions instance to hide.
			this.view.linkedAccountFlex.opacity = 0;
		},

		showCardOptions: function(){
			/*TODO: Ex03.- Inform CardOptions instance to (re)appear and which options to show —e.g.:
			If the card is blocked, the option to block it should not appear or be disabled.*/

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

				//Hide and show card option buttons every time a card is selected.
				this.view.cardOptions1.hideButtons();
				this.view.cardOptions1.showButtons();
			};

			this.view.cardOptions1.onPressed = (index) => {
				alert("Pressed card option at " + index);
				//TODO: if 0, navigate to a screen to prompt the user for confirmation that they want to block the card.
				//TODO: if 1, show more card details.
				//TODO: if 2, navigate to a screen where the user can configure the card.

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

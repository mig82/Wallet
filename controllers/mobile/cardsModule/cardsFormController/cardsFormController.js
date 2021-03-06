define(["cardsModule/CardModel"], function(Card){

	return {

		showCardDetails: function(index){
			Card.findAll()
			.then(cards => {
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
			})
			.catch(e => {
				kony.print("Error fetching cards for this user");
				throw(e);
				//TODO: Hide card details and show a label saying "You don't have any cards yet".
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
			this.view.carousel.opacity = 0;
		},

		postShow: function() {

			//Call services to populate screen.
			//Animate stuff back into sight.

			Card.findAll()
			.then((cards) => {

				//Show the type, holder and balance of the first card.
				this.showCardDetails(0);

				//Show the options for the selected card.
				this.showCardOptions();

				//Set the cards array to the carousel.
				this.view.carousel.loadCards(cards);
				kony.animations.reveal(this.view.carousel, 0.5, 0.1);
			})
			.catch(e => {
				kony.print("Something went wrong fetching cards: " + JSON.stringify(e));
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
				//alert("Pressed card option at " + index);
				//TODO: if 0, navigate to a screen to prompt the user for confirmation that they want to block the card.
				//TODO: if 2, navigate to a screen where the user can configure the card.
				if(index === 1){
					//TODO: Set the card selected to application state.
					kony.router.goto("card");
				}
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

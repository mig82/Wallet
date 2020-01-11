define(function(){

	return {

		cards: [],

		fetchCards: function(){
			//TODO: Fetch these from the server.
			var holder = "František Koudelka";

			return Promise.resolve([
				{
					type: kony.i18n.getLocalizedString2("product.CREDIT_CARD"),
					holder,
					balance: 31084.61,
					limit: 100000,
					currency: "CZK",
					image: "card_plastic_1.png",
					pan: "5000 0012 3456 1699"
				},{
					type: kony.i18n.getLocalizedString2("product.CREDIT_CARD_CUSTOM"),
					holder,
					balance: 125.78,
					limit: 2500,
					currency: "EUR",
					image: "card_plastic_2.png",
					pan: "4000 0012 3477 9737"
				}
			]);
		},

		showCardDetails: function(index){
			if(this.cards.length > 0){
				var card = this.cards[index];
				this.view.CardInfo.setCardInfo(
					card.type,
					card.holder,//"František Koudelka",
					card.balance,//1500.45,
					card.limit, //2500,
					card.currency //"CZK"
				);
			}
		},

		hideElements: function(){
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

		showElements: function(){
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
			this.hideElements();
		},

		postShow: function() {
			//Call services to populate screen.
			//Animate stuff back into sight.

			this.fetchCards()
			.then((cards) => {
				kony.print("Cards: "+ JSON.stringify(cards));
				this.cards = cards;
				this.showCardDetails(0);
				this.view.carousel.loadCards(cards);
				//TODO: set the cards array to the carousel.
			});
			this.view.carousel.onCardSelected = this.showCardDetails;
			this.showElements();
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

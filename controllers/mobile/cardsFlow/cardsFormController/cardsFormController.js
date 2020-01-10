define(function(){

	return {

		cards: [],

		fetchCards: function(){
			//TODO: Fetch these from the server.
			var holder = "František Koudelka";
			/*globals Q*/
			return Q.when([
				{
					type: kony.i18n.getLocalizedString2("product.CREDIT_CARD"),
					holder,
					balance: 31084.61,
					limit: 100000,
					currency: "CZK",
					image: "credit_card.png",
					pan: "5000 0012 3456 1699"
				},{
					type: kony.i18n.getLocalizedString2("product.CREDIT_CARD_CUSTOM"),
					holder,
					balance: 125.78,
					limit: 2500,
					currency: "EUR",
					image: "credit_card_custom_2.png",
					pan: "5000 0012 3477 9737"
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
			/*globals reveal*/
			if(kony.os.isIos()){
				reveal(this.view.blockButton, 0.5, 0.20);
				reveal(this.view.detailsButton, 0.5, 0.40);
				reveal(this.view.settingsButton, 0.5, 0.60);
			}
			else{
				reveal(this.view.buttonsContainer);
			}
			reveal(this.view.linkedAccountFlex, 0.5, 0.80);
		},

		preShow: function(){
			this.hideElements();
		},

		postShow: function() {
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

		onNavigate: function(){
			kony.mvc.patch(this);
		}

	};
});
define(function () {

	/*Fetch cards from server, or locally if already queried before.
	Use force=true to force a new request to the server.*/
	function fetchCards(user){

		kony.print("cardsFlow/fabric/fetchCards: Fetching cards from server");

		return Promise.resolve([
			{
				type: kony.i18n.getLocalizedString2("Credit Card"),
				holder: "James M. Hendrix",
				balance: 31084.61,
				limit: 100000,
				currency: "CZK",
				image: "card_plastic_1.png",
				pan: "5000 0012 3456 1699"
			},{
				type: kony.i18n.getLocalizedString2("Business Credit Card"),
				holder: "J. M. Hendrix",
				balance: 125.78,
				limit: 2500,
				currency: "EUR",
				image: "card_plastic_2.png",
				pan: "4000 0012 3477 9737"
			}
		]);
	}

    return fetchCards;
});
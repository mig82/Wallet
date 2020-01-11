define(function () {
	
	var cards;

	/*Fetch cards from server, or locally if already queried before.
	Use force=true to force a new request to the server.*/
	function fetchCards(force){
		
		if(typeof cards === "undefined" || force){
			kony.print("Fetching cards from server");
			//TODO: Fetch these from the server.
			cards = [
				{
					type: kony.i18n.getLocalizedString2("Credit card"),
					holder: "James M. Hendrix",
					balance: 31084.61,
					limit: 100000,
					currency: "CZK",
					image: "card_plastic_1.png",
					pan: "5000 0012 3456 1699"
				},{
					type: kony.i18n.getLocalizedString2("Business credit card"),
					holder: "J. M. Hendrix",
					balance: 125.78,
					limit: 2500,
					currency: "EUR",
					image: "card_plastic_2.png",
					pan: "4000 0012 3477 9737"
				}
			];
		}
		else{ //We already have the cards and are not being asked to fetch them again.
			kony.print("We already have the cards locally");
		}
		return Promise.resolve(cards);
	}

    return fetchCards;
});
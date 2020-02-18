define(function () {

	const service = "cards";
	const operation = "get-cards";
	var cards;

	/*Fetch cards from server, or locally if already queried before.
	Use force=true to force a new request to the server.*/
	function fetchCards(force){

		if(typeof cards === "undefined" || force){
			kony.print("cardsFlow/fetchCards: Fetching cards from server");

			//Hardcoded data for the purpose of testing only.
			cards = [
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
			];
			//Replaced with PubSub
			//return Promise.resolve(cards);

			/*return new Promise((resolve, reject) => {

				try{
					var s = kony.sdk.getCurrentInstance().getIntegrationService(service);
					s.invokeOperation(
						operation,
						{}, //headers
						{}, //data
						(response) => { //onSuccess
							if(response.opstatus === 0 || response.opstatus === "0"){
								cards = response.cards;
								resolve(cards); //An array.
							}
							else{
								reject(response);
							}
						},
						(error) => { //onFailure
							reject(error);
						},
						{} //options
					);
				}
				catch(e){
					var errorMsg = e.details.errmsg;
					if (errorMsg.indexOf('Invalid session') >= 0 || errorMsg.indexOf('session expired') >= 0) {
						reject(e);
					}
					else{
						reject(new Error(`Could not find or call ${service}.${operation}:\n\t${e}`));
					}
				}
			});*/
		}
		else{ //We already have the cards and are not being asked to fetch them again.
			kony.print("cardsFlow/fetchCards: Fetching cards locally");
			//Replaced with PubSub
			//return Promise.resolve(cards);
		}
		kony.pubsub.publish("fetchCards.success", cards);
	}

    return fetchCards;
});
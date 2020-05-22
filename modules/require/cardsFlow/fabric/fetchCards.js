define(function () {

	//const service = "cards";
	const service = "IronBankOfBravos";
	const operation = "get-cards";
	var cards;

	/*Fetch cards from server, or locally if already queried before.
	Use force=true to force a new request to the server.*/
	function fetchCards(user_id){

		kony.print("cardsFlow/fabric/fetchCards: Fetching cards from server");
		/*cards = [
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
			];*/

		return new Promise((resolve, reject) => {
			try{
				var s = kony.sdk.getCurrentInstance().getIntegrationService(service);
				s.invokeOperation(
					operation,
					{}, //headers
					// Take user_id from IdP in Fabric if no value is passed.
					// Test with "00up819zaxZ8iKyFq0h7"
					user_id? {user_id}: {}, //data
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
				var errorMsg = e.message;
				if (errorMsg.indexOf('Invalid session') >= 0 || errorMsg.indexOf('session expired') >= 0) {
					reject(e);
				}
				else{
					reject(new Error(`Could not find or call ${service}.${operation}:\n\t${e}`));
				}
			}
		});
	}

    return fetchCards;
});
define(function () {

	const service = "IronBank_Cards";
	const operation = "getCards";
	var cards;

	/*Fetch cards from server, or locally if already queried before.
	Use force=true to force a new request to the server.*/
	function fetchCards(user){

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
				return s.invokeOperation(
					operation,
					{}, //headers
					// Take user_id from IdP in Fabric if no value is passed.
					// Test with "00up819zaxZ8iKyFq0h7"
					user? {user}: {}, //data
					(response) => { //onSuccess

						if(response.opstatus === 0 || response.opstatus === "0"){
							cards = response.cards || [];
							resolve(cards); //An array.
						}

						else{
							//TODO: Implement a switch for the different optstatus
							//opstatus: 10102, errmsg: "Service does not exist for the specified serviceID."
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
				reject(e);
			}
		});
	}

    return fetchCards;
});
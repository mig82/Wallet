define(function () {

	const service = "IronBank_Cards";
	const operation = "getCards";

	function fetchCards(user){

		kony.print("cardsModule/fabric/fetchCards: Fetching cards from server");

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
							resolve(response.cards || []); //An array.
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
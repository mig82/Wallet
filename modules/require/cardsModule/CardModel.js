/**
* A Model to store domain logic relevant to a Credit Card.
*/
define([
	//"authModule/login",
	//"cardsModule/fabric/fetchCards"
	"cardsModule/fabric/fetchCardsMock"
], function (
	//loginCtrl,
	fetchCards
) {

	var _cards;

	/**
	* Fetch cards from server, or locally if already queried before.
	*/
	function getCards(force){

		if(typeof _cards === "undefined" || force){

			//return fetchCards(loginCtrl.getProfile().email)
			return fetchCards()
			.then((cards) => {

				kony.print("Cards: "+ JSON.stringify(cards));

				//Save the cards fetched to application state.
				_cards = cards;

				//TODO: Convert the array into an array of instances of the Card class?
				/*_cards = cards.map(card => {
					return new Card(...)
				});*/
				//Or would it make more sense to just use tv4 to validate the JSON?

				return cards;
			})
			.catch(e => {
				kony.print(`Unable to fetch cards: ` + JSON.stringify(e));
			});
		}
		else{
			return Promise.resolve(_cards);
		}
	}

	return {
		getCards
	};
});

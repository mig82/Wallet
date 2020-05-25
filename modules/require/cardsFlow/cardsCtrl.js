/**
* A sort of business controller for the cards flow.
* It's meant to keep application state as well as implement client-side
* that is shared across views.
*
* TODO: This has ended up becoming a lot like a CardsModel. I could rename it that,
* but then the plan to add routing to it would have to change. Routing would stay in
* its own cardsFlow/router module.
*/
define([
	//"loginFlow/login",
	//"cardsFlow/fabric/fetchCards"
	"cardsFlow/fabric/fetchCardsMock"
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

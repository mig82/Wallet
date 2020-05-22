define(function () {

	var _cards = [];

	function getCards(){
		return _cards;
	}

	function setCards(cards){
		_cards = cards;
	}

    return {
        getCards,
		setCards
    };
});

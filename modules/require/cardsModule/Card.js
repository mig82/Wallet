define(function () {

	class Card {
		constructor(pan, type, holder, balance, limit, currency, image) {
			this.pan = pan; //"5000 0012 3456 1699"
			this.type = type; //kony.i18n.getLocalizedString2("Credit Card"),
			this.holder = holder; //"James M. Hendrix",
			this.balance = balance; //31084.61,
			this.limit = limit; //limit: 100000,
			this.currency = currency; //"CZK",
			this.image = image; //"card_plastic_1.png",
		}

		get pan() { return this.pan; }
		get type() { return this.type; }
		get holder() { return this.holder; }
		get balance() { return this.balance; }
		get limit() { return this.limit; }
		get currency() { return this.limit; }
		get image() { return this.image; }
	}

	return Card;
});

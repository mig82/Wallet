it("swipeForthAndBack", async function() {

	await kony.automation.playback.wait(3000);

	//Swipe right
	kony.automation.scrollToWidget(["cardsForm", "carousel", "card1"]);
	await kony.automation.playback.wait(700);

	//Swipe back left
	kony.automation.scrollToWidget(["cardsForm", "carousel", "card0"]);
	await kony.automation.playback.wait(700);

	//Verify type, holder and balance of first card.
	expect(kony.automation.widget.getWidgetProperty(["cardsForm","CardInfo","typeLabel"], "text")).toEqual("Credit Card");
	expect(kony.automation.widget.getWidgetProperty(["cardsForm","CardInfo","holderLabel"], "text")).toEqual("James M. Hendrix");
	expect(kony.automation.widget.getWidgetProperty(["cardsForm","CardInfo","balanceLabel"], "text")).toEqual("CZK31,084.61");

	//Navigate to details.
	kony.automation.button.click(["cardsForm","cardOptions1","detailsButton","button1"]);
});
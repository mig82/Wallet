it("swipeToSelect", async function() {
	await kony.automation.playback.wait(3000);
	// :User Injected Code Snippet [//Scroll to the next card - [1 lines]]
	kony.automation.scrollToWidget(["cardsForm", "carousel", "card1"])
	// :End User Injected Code Snippet {06b623f4-2913-f2c0-3fc4-a4563d3dd5f2}
	await kony.automation.playback.wait(700);
	// :User Injected Code Snippet [//Verify card data - [4 lines]]
	//Verify type, holder and balance of second card.
	expect(kony.automation.widget.getWidgetProperty(["cardsForm","CardInfo","typeLabel"], "text")).toEqual("Bussiness Credit Card");
	expect(kony.automation.widget.getWidgetProperty(["cardsForm","CardInfo","holderLabel"], "text")).toEqual("J. M. Hendrix"); 
	expect(kony.automation.widget.getWidgetProperty(["cardsForm","CardInfo","balaneLabel"], "text")).toEqual("€125.78");
	// :End User Injected Code Snippet {f471f67e-ae60-ab3b-3cef-c21b5f3722df}
	kony.automation.button.click(["cardsForm","cardOptions1","detailsButton","button1"]);
});
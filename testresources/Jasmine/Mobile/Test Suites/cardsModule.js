describe("cardsModule", function() {
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
		expect(kony.automation.widget.getWidgetProperty(["cardsForm","CardInfo","balaneLabel"], "text")).toEqual("CZK31,084.61");
	
		//Navigate to details.
		kony.automation.button.click(["cardsForm","cardOptions1","detailsButton","button1"]);
	});
	
	it("selectFirstCard", async function() {
		await kony.automation.playback.wait(3000);
	
		//Verify type, holder and balance of first card.
		expect(kony.automation.widget.getWidgetProperty(["cardsForm","CardInfo","typeLabel"], "text")).toEqual("Credit Card");
		expect(kony.automation.widget.getWidgetProperty(["cardsForm","CardInfo","holderLabel"], "text")).toEqual("James M. Hendrix");
		expect(kony.automation.widget.getWidgetProperty(["cardsForm","CardInfo","balaneLabel"], "text")).toEqual("CZK31,084.61");
	
		kony.automation.button.click(["cardsForm","cardOptions1","detailsButton","button1"]);
	});
	
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
});
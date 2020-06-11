describe("cardsModule", function() {
	it("swipeRightLeftSeeDetailsAndBack", async function() {
		await kony.automation.playback.wait(3000);
		// :User Injected Code Snippet [//Swipe right - [2 lines]]
		kony.automation.scrollToWidget(["cardsForm", "carousel", "card1"]);
		
		// :End User Injected Code Snippet {d496ccf3-a0e8-7e94-f04e-33a8472ea861}
		await kony.automation.playback.wait(2000);
		// :User Injected Code Snippet [//Swipe back left - [1 lines]]
		kony.automation.scrollToWidget(["cardsForm", "carousel", "card0"]);
		// :End User Injected Code Snippet {dd248630-12e0-0471-b523-fe9c23b32b6f}
		await kony.automation.playback.wait(2000);
		// :User Injected Code Snippet [//Check type, holder and balance - [4 lines]]
		expect(kony.automation.widget.getWidgetProperty(["cardsForm","CardInfo","typeLabel"], "text")).toEqual("Credit Card");
		expect(kony.automation.widget.getWidgetProperty(["cardsForm","CardInfo","holderLabel"], "text")).toEqual("James M. Hendrix");
		expect(kony.automation.widget.getWidgetProperty(["cardsForm","CardInfo","balanceLabel"], "text")).toEqual("CZK31,084.61");
		
		// :End User Injected Code Snippet {e96e445c-848e-7ac6-8b6f-5383d8097920}
		kony.automation.capture();
		kony.automation.widget.touch(["cardsForm","cardOptions1","detailsButton","button1"], [71,29],[[69,26],[69,23]],[193,170]);
		await kony.automation.playback.wait(1000);
		kony.automation.capture();
		kony.automation.widget.touch(["cardDetailsForm","doneButton","button1"], [186,36],[[186,35],[186,35],[186,35]],[186,35]);
		kony.automation.button.click(["cardDetailsForm","doneButton","button1"]);
		// :User Injected Code Snippet [//Check selected card - [4 lines]]
		expect(kony.automation.widget.getWidgetProperty(["cardsForm","CardInfo","typeLabel"], "text")).toEqual("Credit Card");
		expect(kony.automation.widget.getWidgetProperty(["cardsForm","CardInfo","holderLabel"], "text")).toEqual("James M. Hendrix");
		expect(kony.automation.widget.getWidgetProperty(["cardsForm","CardInfo","balanceLabel"], "text")).toEqual("CZK31,084.61");
		
		// :End User Injected Code Snippet {c97f1afe-09ef-b56a-77a1-aaadd44f3039}
	});
	
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
	
	it("selectFirstCard", async function() {
		await kony.automation.playback.wait(3000);
	
		//Verify type, holder and balance of first card.
		expect(kony.automation.widget.getWidgetProperty(["cardsForm","CardInfo","typeLabel"], "text")).toEqual("Credit Card");
		expect(kony.automation.widget.getWidgetProperty(["cardsForm","CardInfo","holderLabel"], "text")).toEqual("James M. Hendrix");
		expect(kony.automation.widget.getWidgetProperty(["cardsForm","CardInfo","balanceLabel"], "text")).toEqual("CZK31,084.61");
	
		//kony.automation.button.click(["cardsForm","cardOptions1","detailsButton","button1"]);
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
		expect(kony.automation.widget.getWidgetProperty(["cardsForm","CardInfo","balanceLabel"], "text")).toEqual("€125.78");
		// :End User Injected Code Snippet {f471f67e-ae60-ab3b-3cef-c21b5f3722df}
		kony.automation.button.click(["cardsForm","cardOptions1","detailsButton","button1"]);
		await kony.automation.playback.wait(2000);
		kony.automation.widget.touch(["cardDetailsForm","doneButton","button1"], [246,26],[[246,25]],[246,25]);
		kony.automation.button.click(["cardDetailsForm","doneButton","button1"]);
		await kony.automation.playback.wait(2000);
	});
});
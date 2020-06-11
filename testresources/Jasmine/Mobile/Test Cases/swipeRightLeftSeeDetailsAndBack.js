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
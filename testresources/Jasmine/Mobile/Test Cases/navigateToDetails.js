it("navigateToDetails", async function() {
	// :User Injected Code Snippet [// - []]
	
	// :End User Injected Code Snippet {0874d47b-e058-8d3f-1cdd-1e4f55cd5f72}
	kony.automation.button.click(["cardsForm","cardOptions1","detailsButton","button1"]);
	await kony.automation.playback.wait(2000);
	kony.automation.button.click(["cardDetailsForm","doneButton","button1"]);
	expect(kony.automation.widget.getWidgetProperty(["cardDetailsForm","doneButton","button1"], "text")).toEqual(Foo);
	await kony.automation.playback.wait(2000);
});
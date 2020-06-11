define(function () {

	//TODO: Move this into kronin.
	function isWidgetOfType(widget, widgetType){

		if(typeof widget === "undefined" || widget === null){
			return false;
		}
		else if(typeof widget.wType === "string" === typeof widgetType){
			return widget.wType.toLowerCase() === widgetType.toLowerCase();
		}
		else if(widgetType === kony.ui.Browser){
			return widget.wType === "Browser" || (
				typeof widget.evaluateJavaScriptAsync === "function" &&
				typeof widget.getHTMLFilesInWebFolder === "function"
			);
		}
		//TODO: Implement rule for other widget types.

		else{
			throw new Error(`The validation for type '${widgetType}' is not implemented yet.`);
		}
	}

	return isWidgetOfType;
});
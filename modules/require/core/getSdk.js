define(function () {

	function getSdk(){
		var sdk = kony.sdk.getCurrentInstance() || kony.sdk.getDefaultInstance();
		if(sdk === null || typeof sdk === "undefined" || !sdk){
			throw new Error(
				"Error: Null Kony SDK. There's no current or default kony.sdk instance."
			);
		}
		return sdk;
	}
	return getSdk;
});
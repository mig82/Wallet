define(["core/getSdk"], function (getSdk) {

	function getIdP(idpName){
		var sdk = getSdk();
		try{
			var idp = sdk.getIdentityService(idpName);
			if(idp === null || typeof idp === "undefined" || !idp){
				throw new Error(`Identity service '${idpName}' not found.`);
			}
			return idp;
		}
		catch(e){
			kony.print(`Error: Could not get identity service '${idpName}':\n`+ e.stack);
			throw e;
		}
	}
    return getIdP;
});
define(function () {

	function getIdP(idpName){
		try{
			return kony.sdk.getCurrentInstance().getIdentityService(idpName);
		}
		catch(e){
			let message = `Unable to get IdP ${idpName}: `+ JSON.stringify(e);
			kony.print(message);
			throw new Error(e);
		}
	}
    return getIdP;
});
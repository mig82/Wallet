define(["core/getIdP"], function (getIdP) {

	function logout(idpName, options){

		return new Promise((resolve, reject) => {
			try{
				var idp = getIdP(idpName);
				idp.logout(
					(response)=>{ //onSuccess
						//Note that response of the logout call is an empty object {} for Okta services.
						resolve(response);
					}, (response)=>{ //onFailure
						kony.print(`Error invoking logout on identity service ${idpName}\nerror:${JSON.stringify(response)}`);
						reject(response);
					},
					options
				);
			}
			catch(e){
				//TODO: Implement a switch here for the different codes.
				//"code":"AUTH_FAILURE","message":"Invalid providerName"
				kony.print(`Error: Unable to invoke fabric logout call for identity service '${idpName}'.`);
				reject(e);
			}
		});
	}

	return logout;
});

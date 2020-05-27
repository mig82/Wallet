define(["core/getIdP"], function (getIdP) {

	function login(idpName, options){

		//TODO: Test refresh_token flow. This should supposedly make the SDK try to use the refresh_token, if supported by the IdP.
		//options.requestParams = {refresh: true};

		return new Promise((resolve, reject) => {
			try{
				var idp = getIdP(idpName);
				idp.login(
					options,
					(response)=>{ //onSuccess
						//Note that response of the login call is an empty object {} for Okta services.
						resolve(response);
					}, (response)=>{ //onFailure
						kony.print(`Error invoking login in IdP ${idpName}\nerror:${JSON.stringify(response)}`);
						reject(response);
					}
				);
			}
			catch(e){
				//TODO: Implement a switch here for the different codes.
				//"code":"AUTH_FAILURE","message":"Invalid providerName"
				reject(e);
			}
		});
	}

	return login;
});

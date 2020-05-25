define(["core/getIdP"], function (getIdP) {

	function login(idpName, options){

		return new Promise((resolve, reject) => {
			try{
				var idp = getIdP(idpName);
				idp.login(
					options,
					(response)=>{ //onSuccess
						//Note that response of the login call is an empty object {} for Okta services.
						kony.print("flag-0");
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

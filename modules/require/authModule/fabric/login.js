define(["core/getIdP", "core/isWidgetOfType"], function (getIdP, isWidgetOfType) {

	const BROWSER_BASED_TYPES = ["oauth2"]; //TODO: add SAML and others that require a browser widget ref.

	function validateOptions(idp, options){

		var type = idp.getProviderType();
		if(BROWSER_BASED_TYPES.includes(type)){

			var isMvc = true; //TODO: Remove hardcoded true and detect whether the project is MVC or not.

			if(isMvc && !isWidgetOfType(options.browserWidget, kony.ui.Browser)){
				throw new Error(`Identity service '${idp.getProviderName()}' of type '${type}' `+
								`requires a browser widget reference for login, passed as options.browserWidget`);
			}
			//else free-style projects do not require a browser widget.
		}
		/*else if (type is user repository){
			//TODO: Validate options includes user and password.
		}*/
	}

	function login(idpName, options){

		//TODO: Test refresh_token flow. This should supposedly make the SDK try to use the refresh_token, if supported by the IdP.
		options.requestParams = {refresh: true};

		return new Promise((resolve, reject) => {
			try{
				var idp = getIdP(idpName);
				validateOptions(idp, options);

				idp.login(
					options,
					(response)=>{ //onSuccess
						//Note that response of the login call is an empty object {} for Okta services.
						resolve(response);
					}, (response)=>{ //onFailure
						kony.print(`Error invoking login on identity service ${idpName}\nerror:${JSON.stringify(response)}`);
						reject(response);
					}
				);
			}
			catch(e){
				//TODO: Implement a switch here for the different codes.
				//"code":"AUTH_FAILURE","message":"Invalid providerName"
				kony.print(`Error: Unable to invoke fabric login call for identity service '${idpName}'.`);
				reject(e);
			}
		});
	}

	return login;
});

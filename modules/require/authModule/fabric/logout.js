define([], function () {

	const idpName = "TpkoOktaMiguel";

	function logout(options){

		/*return new Promise((resolve, reject) => {
			try{
				var idp = kony.sdk.getCurrentInstance().getIdentityService(idpName);
				idp.logout(options, (response)=>{ //onSuccess
					resolve(response)
				}, (response)=>{ //onFailure
					kony.print(`Error invoking identity service ${idpName}\nerror:${JSON.stringify(response)}`);
					reject(response);
				});
			}
			catch(e){
				//TODO: Implement a switch here for the different codes.
				//"code":"AUTH_FAILURE","message":"Invalid providerName"
				reject(e);
			}
		});*/
	}

    return logout;
});
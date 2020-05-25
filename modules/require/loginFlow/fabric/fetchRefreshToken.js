define(["core/getIdP"], function (getIdP) {

	function fetchRefreshToken(idpName){

		return new Promise((resolve, reject) => {
			try{

				var idp = getIdP(idpName);
				idp.getSecurityAttributes(
					tokens => { //onSuccess
						kony.print("Fetched refresh token");
						//TODO: Use tv4 to validate the JSON response has a refresh token.

						if(tokens.refresh_token){
							resolve(tokens.refresh_token);
						}
						else{
							reject(new Error(`Identity servivce ${idpName} did not return a refresh token`));
						}
					},
					e => { //onFailure
						kony.print(`WARN: Failed to fetch refres_token: ${JSON.stringify(e)}.`);
						reject(e);
					});
			}
			catch(e){
				reject(e);
			}
		});
	}

    return fetchRefreshToken;
});

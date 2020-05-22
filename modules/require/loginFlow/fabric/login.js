define([], function () {

	const idpName = "TpkoOktaMiguel";

	function login(options, fetchProfile){

		return new Promise((resolve, reject) => {
			try{
				var idp = kony.sdk.getCurrentInstance().getIdentityService(idpName);
				idp.login(options, (/*response*/)=>{ //onSuccess

					idp.getProfile(fetchProfile,
							(response) => {
								kony.print(`Logged in with profile: ${JSON.stringify(response.user_attributes)}`);
								resolve(response.user_attributes);
							},
							(response)=>{
								kony.print(
									`WARN: Failed to fetch profile: ${JSON.stringify(response)}.\n` +
									`Resolving login without a full user profile.`
								);
								resolve({});
							}
						);
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
		});
	}

    return login;
});
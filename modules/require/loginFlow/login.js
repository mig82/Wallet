define(function () {

	const idpName = "TpkoOktaMiguel";

	function login(options, fetchProfile){

		return new Promise((resolve, reject) => {
			var idp = kony.sdk.getCurrentInstance().getIdentityService(idpName);
			idp.login(options, (/*response*/)=>{ //onSuccess

				idp.getProfile(fetchProfile,
						(response) => {
							kony.print(`Logged in with profile: ${JSON.stringify(response.user_attributes)}`);
							resolve(response.user_attributes);
						},
						(response)=>{
							kony.print(
								`Failed to fetch profile: ${JSON.stringify(response)}.\n` +
								`Resolving login without a full user profile.`
							);
							resolve(response.user_attributes);
						}
					);
			}, (response)=>{ //onFailure
				kony.print(`Error invoking identity service ${idpName}\nerror:${JSON.stringify(response)}`);
				reject(response);
			});
		});
	}

    return login;
});
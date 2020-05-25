define(["core/getIdP"], function (getIdP) {

	function fetchProfile(idpName){

		return new Promise((resolve, reject) => {
			try{

				var idp = getIdP(idpName);
				idp.getProfile(
					true, //Force from server.
					response => { //onSuccess
						kony.print("Fetched profile");
						var profile = response.user_attributes || response.profile_attributes || {
							userid: response.userid,
							email: response.email
						};
						kony.print(`Profile: ${JSON.stringify(profile)}`);
						resolve(profile);
					},
					e => { //onFailure
						kony.print(
							`WARN: Failed to fetch profile: ${JSON.stringify(e)}.\n` +
							`Resolving login without a full user profile.`
						);
						resolve({
							userid: "unknown",
							email: "unknown"
						});
					});
			}
			catch(e){
				reject(e);
			}
		});
	}

    return fetchProfile;
});

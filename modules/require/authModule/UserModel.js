/**
* A Model to store domain logic relevant to the User.
*/
define([
	"authModule/fabric/login",
	"authModule/fabric/fetchProfile",
	"authModule/fabric/fetchRefreshToken",
	"authModule/fabric/logout"
], function (
	login,
	fetchProfile,
	fetchRefreshToken,
	logout
) {

	/*e.g.: {
		user_id: "00urnvcim4XBcSTRC0h7",
		email: "atarg@foo.com"
	}	*/
	var _profile;
	var _refresh_token;

	//The name of the Fabric identity service you want to bind this to.
	const idpName = "TpkoOktaMiguel";

	/**
	* For external authentication —e.g. Oauth2, OpenID Connect, Okta, Google, etc,
	* pass a reference to a browser widget —e.g.: {browserWidget: this.view.loginBrowser}
	*
	* Other identity service types, like the User Repository, expect the options to include
	* the credentials —e.g.: {user: "foo@bar.com": password: "123"}
	*/
	function initSession(options){

		return login(idpName, options)
		.then( (/*result*/) => {

			return Promise.all([
				fetchProfile(idpName),
				fetchRefreshToken(idpName)
			])
			.then((results) => {
				_profile = results[0];
				_refresh_token = results[1];

				//TODO: Encrypt and store refresh token for later reauthentication.
				//kony.store.setItem("refresh_token", result.refresh_token)

			});
		})
		.catch(e => {
			kony.print(`Error: Unable to initiate user session.`);
			throw e;
		});
	}

	function getProfile(){
		if(typeof _profile === "undefined"){
			throw new Error("There's no user profile. Try starting a session first.");
		}
		return _profile;
	}

	function endSession(){
		return logout(idpName)
		.catch(e =>{
			kony.print(`Error: Unable to end user session.`);
			throw e;
		});
	}

	return {
		initSession,
		getProfile,
		endSession
    };
});

/**
* A sort of business controller for the login flow.
* It's meant to keep application state as well as implement client-side logic
* that is shared across views.
*
* TODO: This has ended up becoming a lot like a UserModel. I could rename it that,
* but then the plan to add routing to it would have to change. Routing would stay in
* its own loginFlow/router module.
*/
define([
	"loginFlow/fabric/login",
	"loginFlow/fabric/fetchProfile",
	"loginFlow/fabric/fetchRefreshToken",
	"loginFlow/fabric/logout"
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
	* For user repo options includes the user and password.
	*
	* For external authentication —e.g. Oauth2, OpenID Connect, Okta, Google, etc,
	* pass a reference to a browser widget —e.g.: {browserWidget: this.view.loginBrowser}
	*/
	function initSession(options){

		//TODO: Validate that options includes a browser widget ref or user/password depending on the IdP type?

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
			kony.print("Something went wrong with the external login:" + JSON.stringify(e));
		});
	}

	function getProfile(){
		if(typeof _profile === "undefined"){
			throw new Error("There's no user profile. Try starting a session first.");
		}
		return _profile;
	}

	function endSession(){
		throw new Error("logout is not implemented yet.");
		//TODO: Implement call to logout.
	}

    return {
		initSession,
		getProfile,
		endSession
    };
});

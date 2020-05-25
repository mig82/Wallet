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
	"loginFlow/fabric/logout"
], function (
	callLogin,
	callLogout
) {

	/*e.g.: {
		user_id: "00urnvcim4XBcSTRC0h7",
		email: "atarg@foo.com"
	}	*/
	var _profile = {};

	function login(options, fetchProfile){
		callLogin(options, fetchProfile)
		.then(result => {

			//Save the profile to the application state.
			_profile = result.profile;

			//TODO: Encrypt and store refresh token for later reauthentication.
			//kony.store.setItem("refresh_token", result.refresh_token)
		})
		.catch(e => {
			kony.print("Something went wrong with the external login:" + JSON.stringify(e));
		});
	}

	function getProfile(){
		//TODO: call login from here. Not from the form controller.
		return _profile;
	}

	function logout(){
		throw new Error("loginCtrl.logout is not implemented yet.");
	}

    return {
		login,
        getProfile,
		logout
    };
});

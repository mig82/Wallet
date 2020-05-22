define(function () {

	/*e.g.: {
		user_id: "00urnvcim4XBcSTRC0h7",
		email: "atarg@foo.com"
	}	*/
	var _profile = {};

	function getProfile(){
		return _profile;
	}

	function setProfile(profile){
		_profile = profile;
	}

    return {
        getProfile,
		setProfile
    };
});

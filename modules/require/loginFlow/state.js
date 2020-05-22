define(function () {

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

define(function(){

	return{

		preShow: function(){
			//Move stuff out of sight if you want to then animate back in.
			this.view.mainFlex.opacity = 0;
		},

		postShow: function(){
			//Call services to populate screen.
			//Animate stuff back into sight.
			kony.animations.reveal(this.view.mainFlex, 0.2, 0.2);

			this.view.cancelButton.onClick = () => {
				kony.router.goTo("login");
			};

			var state = require("loginFlow/state");
			var login = require("loginFlow/fabric/login");
			login({
				browserWidget: this.view.loginBrowser
			}, true)
			.then((profile) => {
				//alert("Profile: " + JSON.stringify(profile));
				state.setProfile(profile);
				kony.router.goto("cards", {}, true);
			});
		},

		onNavigate: function(){
			//Wire it all together.
			kony.mvc.wire(this);
		}
	};
});

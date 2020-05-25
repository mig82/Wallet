define(function(){

	var User;

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

			User.initSession({
				browserWidget: this.view.loginBrowser
			})
			.then(() => {
				kony.router.goto("cards", {}, true);
			})
			.catch(e => {
				kony.print("Failed external: " + JSON.stringify(e));
			});
		},

		onNavigate: function(){
			//Wire it all together.
			kony.mvc.wire(this);

			//Require the business controller for the login flow.
			User = require("loginFlow/UserModel");
		}
	};
});

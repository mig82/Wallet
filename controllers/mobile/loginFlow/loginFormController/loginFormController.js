define(function(){

	return{

		preShow: function(){
			//Move stuff out of sight if you want to then animate back in.
			this.view.loginButton.hideButton();
		},

		postShow: function(){
			//Call services to populate screen.
			//Animate stuff back into sight.
			this.view.loginButton.showButton(0.5, 0.2);

			const login = require("loginFlow/login");
			this.view.loginButton.onPressed = () => {
				login({}, true)
				.then((profile) => {
					alert("Navigating to cards");
					kony.router.goto("cards", {}, true);
				});
			};
		},

		onNavigate: function(){
			//Wire it all together.
			kony.mvc.wire(this);
		}
	};
});

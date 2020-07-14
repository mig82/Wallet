define(function(){

	return{

		preShow: function(){
			//Move stuff out of sight if you want to then animate back in.
			this.view.loginButton.hideButton();
			this.view.extLoginButton.hideButton();
		},

		postShow: function(){
			//Call services to populate screen.
			//Animate stuff back into sight.
			this.view.loginButton.showButton(0.5, 0.2);
			this.view.extLoginButton.showButton(0.5, 0.4);

			this.view.loginButton.onPressed = () => {
				kony.router.goto("internalLogin", {}, true);
			};

			this.view.extLoginButton.onPressed = () => {
				kony.router.goto("externalLogin", {}, true);
			};
		},

		onNavigate: function(){
			//Wire it all together.
			kony.mvc.wire(this);
		}
	};
});

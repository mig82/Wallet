/*	TODO: This creates a dependency of the component on the authentication module.
	The UserModel can still be mocked though. But is there a better way?
*/
define(["authModule/UserModel"], function(User){

	function logout(){
		User.endSession()
			.then(() => {
			//TODO: Implement navigation to the authentication module instead. Not to a specific form.
			kony.router.goto("login", {}, true);
		})
		.catch(e => {
			kony.print(`${e.message}\n${e.stack}`);
			//TODO: Show a toast instead of an alert.
			alert(e);
		});
	}

	return {
		postShow: function(){
			this.view.logoutButton.onPressed = logout;
		},

		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {
			this.view.postShow = this.postShow;
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {}
	};
});
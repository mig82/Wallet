define(function(){
	
	var privateVar = {}; //"This is a private var"
	function privateFunction(){
		//TODO
	}
	
	return{
		init: function(){
			//Stuff you only want done once the first time the screen is visited.
		},
		preShow: function(){
			//Move stuff out of sight if you want to then animate back in.
		},
		postShow: function(){
			//Call services to populate screen.
			//Animate stuff back into sight.
		},
		onHide: function(){
			//Make sure you destroy/empty large variables that won't be needed anymore.
		},
		onOrientationChange: function(){
			//Resize and resposition stuff. 
		},
		onBreakpointChange: function(){
			//For responsive web, tell your components about the change in screen width.
		},
		onNavigate: function(){
			//Wire it all together.
			this.view.init = this.init;
			this.view.preShow = this.preShow;
			this.view.postShow = this.postShow;
			this.view.onHide = this.onHide;
			this.view.onOrientationChange = this.onOrientationChange;
			this.view.onBreakpointChange = this.onBreakpointChange;
		},
		onDestroy: function(){
			//Rarely used. Just keep in mind it exists.
		}
	};
});

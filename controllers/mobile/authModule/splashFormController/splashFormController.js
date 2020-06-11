define([], function(){

	return {
		postShow: function(){
			this.view.RibbonsAnimation.onAnimationDone = () => {
				kony.router.goto("login", {}, true);
			};
		},

		onNavigate: function(){
			//Wire it all together.
			kony.mvc.wire(this);
		}
	};
});
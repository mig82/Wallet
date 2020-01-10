/**
* Slide the scroll container that holds the cards, from right to left.
*/
define(function () {

	const doNothing = ()=>{};
	const steps = {
		100: {
			centerX: "50%",
			stepConfig: {
				timingFunction: kony.anim.EASE_IN_OUT
			}
		}
	};

	const config = {
		duration: 0.5,
		iterationCount: 1,
		delay: 0.25,
		fillMode: kony.anim.FILL_MODE_FORWARDS
	};

	function slideIn(flex){

		try{
			var animation = kony.ui.createAnimation(steps);
			flex.animate(animation, config, {
				animationStart: doNothing,
				animationEnd: doNothing
			});
		}
		catch(e){
			kony.print(`Problem animating:\n\t${e}`);
		}
	}

    return slideIn;
});

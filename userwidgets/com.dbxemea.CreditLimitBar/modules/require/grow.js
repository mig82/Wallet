/**
* Grow the balance bar from left to right to a predetermined witdh.
*/
define(function () {

	const doNothing = ()=>{};

	function grow(flex, initialWidth, finalWidth, duration, delay, timing){

		const steps = {
			0: {
				width: initialWidth || "1%"
			},
			100: {
				width: finalWidth || "100%",
				stepConfig: {
					timingFunction: timing || kony.anim.EASE_IN_OUT
				}
			}
		};

		const config = {
			duration: duration || 0.5,
			iterationCount: 1,
			delay: delay || 0.25,
			fillMode: kony.anim.FILL_MODE_FORWARDS
		};

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

    return grow;
});
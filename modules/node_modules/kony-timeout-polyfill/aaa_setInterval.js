/************************************
 *        setInterval Polyfill        *
 * **********************************
 *
 * Description:
 * Defines the setInterval and clearInterval functions for non-browser
 * environments -i.e. Native mobile. This helps the Kony platform play
 * nice with other javascript modules that might depend on these function definitions
 * -e.g. Promises polyfills and Kris Kowal's Q.
 *
 * Implementation Notes:
 * 1) Uses the eval function to avoid declaring a setInterval or clearInterval
 * variable/function unless it's necessary. Declaring it and not initializing it
 * will lead to breaking the natively defined namespace on browser environments.
 *
 * 2) Can't wrap in closure notation as there seems to be no global variable -equialent
 * to window or self- in non-browser environments, so there would be nothing to attach
 * it to. Therefore it just has to be declared as a global variable.
 *
 * 3) When used on its own, give this module prefix "aaa" to force this to be loaded before
 * any other javascript libraries that might be dependant setInterval and clearInterval
 * being already defined.
 *
 * @Author Miguelángel Fernández
 */

const _setInterval = (fn, msDelay) => {  //eslint-disable-line no-unused-vars
	//TODO: Implement passing of additional parameters.
	var intervalId = "interval_" + Date.now() + "_" + Math.random();
	kony.timer.schedule(intervalId, fn, msDelay/1000, false);
	return intervalId;
};

const _clearInterval = function(intervalId){ // eslint-disable-line no-unused-vars
	kony.timer.cancel(intervalId);
};

if(typeof window === "undefined" && typeof self === "undefined"){
	eval("var setInterval = _setInterval"); // eslint-disable-line no-eval
	eval("var clearInterval = _clearInterval"); // eslint-disable-line no-eval
	kony.print("Defined setInterval polyfill to: " + setInterval); // eslint-disable-line no-undef
}
else{
	kony.print("setInterval is natively supported as: " + setInterval); // eslint-disable-line no-undef
}

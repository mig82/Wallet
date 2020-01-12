/************************************
 *        setTimout Polyfill        *
 * **********************************
 *
 * Description:
 * Defines the setTimeout and clearTimeout functions for non-browser
 * environments -i.e. Native mobile. This helps the Kony platform play
 * nice with other javascript modules that might depend on these function definitions
 * -e.g. Promises polyfills and Kris Kowal's Q.
 *
 * Implementation Notes:
 * 1) Uses the eval function to avoid declaring a setTimeout or clearTiemout
 * variable/function unless it's necessary. Declaring it and not initializing it
 * will lead to breaking the natively defined namespace on browser environments.
 *
 * 2) Can't wrap in closure notation as there seems to be no global variable -equialent
 * to window or self- in non-browser environments, so there would be nothing to attach
 * it to. Therefore it just has to be declared as a global variable.
 *
 * 3) When used on its own, give this module prefix "aaa" to force this to be loaded before
 * any other javascript libraries that might be dependant setTimeout and clearTimeout
 * being already defined.
 *
 * @Author Miguelángel Fernández
 */

const _setTimeout = (fn, msDelay) => {  //eslint-disable-line no-unused-vars
	//TODO: Implement passing of additional parameters.
	var timerId = "timer_" + Date.now() + "_" + Math.random();
	kony.timer.schedule(timerId, ()=>{
		fn();
		try{kony.timer.cancel(timerId);}
		catch(e){}
	}, msDelay/1000, false);
	return timerId;
};

const _clearTimeout = function(timerId){ // eslint-disable-line no-unused-vars
	kony.timer.cancel(timerId);
};

if(typeof window === "undefined" && typeof self === "undefined"){
	eval("var setTimeout = _setTimeout"); // eslint-disable-line no-eval
	eval("var clearTimeout = _clearTimeout"); // eslint-disable-line no-eval
	kony.print("Defined setTimeout polyfill to: " + setTimeout); // eslint-disable-line no-undef
}
else{
	kony.print("setTimeout is natively supported as: " + setTimeout); // eslint-disable-line no-undef
}

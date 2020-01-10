define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
		
		animateNotificationsIcon: function() {
			var getAnimationObj = function() {
				var transformObj1 = kony.ui.makeAffineTransform();
				transformObj1.translate3D(0, 0, 0);

				var transformObj2 = kony.ui.makeAffineTransform();
				transformObj2.translate3D(-1, 0, 0);

				var transformObj3 = kony.ui.makeAffineTransform();
				transformObj3.translate3D(2, 0, 0);

				var transformObj4 = kony.ui.makeAffineTransform();
				transformObj4.translate3D(-3, 0, 0);

			  var transformObj5 = kony.ui.makeAffineTransform();
				transformObj4.translate3D(3, 0, 0);

			  var animDefinition = {
			  "0": {
				"transform": transformObj1,
				"stepConfig":{"timingFunction":kony.anim.LINEAR}
			  },
			  "10": {
				"transform": transformObj2,
				"stepConfig":{"timingFunction":kony.anim.LINEAR}
			  },
			  "20": {
				"transform": transformObj3,
				"stepConfig":{"timingFunction":kony.anim.LINEAR}
			  },
			  "30": {
				"transform": transformObj4,
				"stepConfig":{"timingFunction":kony.anim.LINEAR}
			  },
			  "40": {
				"transform": transformObj5,
				"stepConfig":{"timingFunction":kony.anim.LINEAR}
			  },
			  "50": {
				"transform": transformObj4,
				"stepConfig":{"timingFunction":kony.anim.LINEAR}
			  },
			  "60": {
				"transform": transformObj5,
				"stepConfig":{"timingFunction":kony.anim.LINEAR}
			  },
			  "70": {
				"transform": transformObj4,
				"stepConfig":{"timingFunction":kony.anim.LINEAR}
			  },
			  "80": {
				"transform": transformObj3,
				"stepConfig":{"timingFunction":kony.anim.LINEAR}
			  },
			  "90": {
				"transform": transformObj2,
				"stepConfig":{"timingFunction":kony.anim.LINEAR}
			  },
			  "100": {
				"transform": transformObj1,
				"stepConfig":{"timingFunction":kony.anim.LINEAR}
			  }
			  };
			  return kony.ui.createAnimation(animDefinition);
			};

			var getAnimConfig = function() {
			  var animconfig = {
				"duration":1,
				"iterationCount":1,
				"direction":kony.anim.DIRECTION_ALTERNATE,
				"delay":1,
				"fillMode":kony.anim.FILL_MODE_BOTH
			  };
			  return animconfig;
			};

			var animationEndCallback = function() {
			  kony.print("in animation end...");
			};

			this.view.flexBubble.animate(
			  getAnimationObj(), 
			  getAnimConfig(), 
			  {
				animationStart: function(){kony.print("in animation start!!");},
				animationEnd: animationEndCallback()
			  }
			);
		  },
		preShowFun:function(){
		    this.view.flexBubble.setVisibility(false);
		},
		getMyBoxDocsCount:function(){
		try{
	     var self = this;
		 var operationName = "getHomepageNotificationCount";
		 var inputParams = {};
		 var headerParams = {};
		 homePageIntegServObj = KNYMobileFabric.getIntegrationService("Credem");
		 homePageIntegServObj.invokeOperation(operationName, headerParams, inputParams, function(response) {
			 if(response != null && response.opstatus == 0){
				 if(""+kony.os.toNumber(response.total) > 99){
					 self.view.lblNotificationNumber.text = "99+";
				 }
				 else{
					 self.view.lblNotificationNumber.text = response.total;
				 }
				 self.view.flexBubble.setVisibility(true);
				 self.animateNotificationsIcon();
			 }
			 else
		     {
			     showAlert("Service call failed for getting notification count");	  
			 }
			}, function(error) {
				showAlert("Failed to get docs count due to:" + JSON.stringify(error));
			}, null);
	 }
	 catch(err){
		 showAlert("Failed to get get docs count due to:"+JSON.stringify(err));
	 }
	},
	};
});
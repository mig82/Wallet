define(function() {

	return {
		headerSizeMinimised: false,
		headerSizeIsBeingMinimised: false,
		headerSizeIsBeingMaximised: false,

		onMainScroll: function(eventobject) {
			if (eventobject.contentOffsetMeasured.y > 0) {
				if (!this.headerSizeIsBeingMinimised && !this.headerSizeMinimised) {
					this.setHeaderSizeIsBeingMinimised(true);
					this.animateHeaderSizeChange(true);
				}
			} else {
				if (!this.headerSizeIsBeingMaximised && this.headerSizeMinimised) {
					this.setHeaderSizeIsBeingMaximised(true);
					this.animateHeaderSizeChange(false);
				}
			}
		},

		setHeaderSizeMinimised: function(minimised) {
			this.headerSizeMinimised = minimised;
		},

		setHeaderSizeIsBeingMinimised: function(minimised) {
			this.headerSizeIsBeingMinimised = minimised;
		},

		setHeaderSizeIsBeingMaximised: function(maximised) {
			this.headerSizeIsBeingMaximised = maximised;
		},

		animateHeaderSizeChange: function(shrink) {
			var self = this;
			var getAnimationObj = function() {
				var transformObj1 = kony.ui.makeAffineTransform();
				transformObj1.scale(1, 1);

				var transformObj2 = kony.ui.makeAffineTransform();
				transformObj2.scale(0.7, 0.7);

				// Set left property based on text label length
				var leftDPVal = 0;
				if (self.view.mainHeader.text.length >= 10) {
					leftDPVal = -20;
				} else if (self.view.mainHeader.text.length >= 6) {
					leftDPVal = -10;
				} else {
					leftDPVal = -5;
				}

				var shrinkSteps = {
					"0": {
						"left": "0dp",
						"transform": transformObj1,
						"stepConfig": {
							"timingFunction": kony.anim.EASE_IN_OUT
						}
					},
					"100": {
						"left": leftDPVal + "dp",
						"transform": transformObj2,
						"stepConfig": {
							"timingFunction": kony.anim.EASE_IN_OUT
						}
					}
				};

				var growSteps = {
					"0": {
						"left": leftDPVal + "dp",
						"transform": transformObj2,
						"stepConfig": {
							"timingFunction": kony.anim.EASE_IN_OUT
						}
					},
					"100": {
						"left": "0dp",
						"transform": transformObj1,
						"stepConfig": {
							"timingFunction": kony.anim.EASE_IN_OUT
						}
					}
				};

				if (shrink) {
					return kony.ui.createAnimation(shrinkSteps);
				} else {
					return kony.ui.createAnimation(growSteps);
				}

			};

			var getAnimConfig = function() {
				var animconfig = {
					"duration": 0.2,
					"iterationCount": 1,
					"direction": kony.anim.DIRECTION_ALTERNATE,
					"delay": 0,
					"fillMode": kony.anim.FILL_MODE_BOTH
				};
				return animconfig;
			};

			var animationEndCallback = function(self) {
				if (shrink) {
					self.setHeaderSizeMinimised(true);
					self.setHeaderSizeIsBeingMinimised(false);
					//self.view.separator.opacity = 0.01;
				} else {
					self.setHeaderSizeMinimised(false);
					self.setHeaderSizeIsBeingMaximised(false);
					//self.view.separator.opacity = 0;
				}
				self.view.forceLayout();
			};

			this.view.mainHeader.animate(
				getAnimationObj(),
				getAnimConfig(), {
					animationStart: function() {
						kony.print("in animation start!!");
					},
					animationEnd: animationEndCallback(self)
				}
			);
		},

		onClickNotificationBuble: function() {
			var view = this.view;
			if(view.notificationBubble.isVisible1){
				view.popUPContainer.setVisibility(!view.popUPContainer.isVisible);
			}
		},

		wireButtons: function(){
			this.view.backButton.onClick = ()=>{
				//alert(`History: ${JSON.stringify(kony.router.getHistory())}`);
				kony.router.goBack();
			};
			this.view.clearButton.onClick = ()=>{
				//alert(`History: ${JSON.stringify(kony.router.getHistory())}`);
				kony.router.goHome();
			};
		},

		localise: function(){
			var translate = typeof kony.i18n.getLocalizedString2 === "function"?
				kony.i18n.getLocalizedString2:
				kony.i18n.getLocalizedString;
			this.view.backButton.text = translate(this.view.backButton.text);
			this.view.clearButton.text = translate(this.view.clearButton.text);
			this.view.mainHeader.text = translate(this.view.mainHeader.text);
		},

		postShow: function(){
			this.wireButtons();
			this.localise();
		},

		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {
			this.view.postShow = this.postShow;
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {}
	};
});
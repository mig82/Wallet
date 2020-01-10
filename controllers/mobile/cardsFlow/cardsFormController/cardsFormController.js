define({
    timerCounter: 0,
    dialPadNo: "",
    lengthOfDialNo: 0,
    cardList: [],
    cardListImages: [],
    cardListIndex: 0,
    cardListLastIndex: 0,
    cardListTotalCards: 0,
    cardListWidth: 0,
    cardListCards: [],
    cardListStartScale: 0.83,
    cardListScaleGrowth: 0.2,
    cardListNumbers: [],
    currCardNumber: "",
    popUpMsg: '',

    objToSend: {},
  	init : function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {	
        loggerManager.log("#### start frmCardManageHomeController : init ####");

        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setFlowActions: function() {      
        this.view.flxNoCards.onClick = function(){kony.print("Clicked on Flx No Crads");};
      	this.view.btnCallCustomerCare.onClick = this.callCustomerCare;
        this.view.switchActiveorInactive.onSlide = this.flxActiveOrInactiveOnClick;
        this.view.flxReplaceCard.onClick = this.flxReplaceCardOnClick;
        this.view.flxReportStolenOrLost.onClick = this.flxReportStolenOrLostOnClick;
        this.view.flxCancelCard.onClick = this.flxCancelCardOnClick;
        this.view.flxChangePin.onClick = this.flxChangePinOnClick;
        this.view.customHeader.flxBack.onClick = this.navigateToMenu;
        this.view.customHeader.flxSearch.onClick = this.navigateToCardMngDetails;
        this.view.btnManageTravelPlans.onClick = this.navigateToTravelManageHome;
    },
    setPreShowData:function(){
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : preShowData ####");
    //    var bankName = applicationManager.getUserPreferencesManager().getBankName();
        this.view.title = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Hamburger.CardManagement");
        this.view.customHeader.lblLocateUs.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Hamburger.CardManagement");
        var configManager = applicationManager.getConfigurationManager();
        var MenuHandler =  applicationManager.getMenuHandler();
        MenuHandler.setUpHamburgerForForm(this, configManager.constants.MENUCARDMANAGEMENT);
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    preShow: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : preShow ####");
        applicationManager.getPresentationUtility().showLoadingScreen();
        this.view.lblNoCards.text = kony.i18n.getLocalizedString("kony.mb.cardManage.FetchingCards");
        this.view.flxNoCards.isVisible = true;
        this.view.customHeader.flxSearch.isVisible = true;
        this.setFlowActions();
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
            this.view.flxHeader.isVisible = true;
            this.view.flxFooter.isVisible = false;
        } else {
            this.view.flxHeader.isVisible = false;
          this.view.flxFooter.isVisible = true;
        }
        this.setPreShowData();
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
  
  	callCustomerCare: function(){
      applicationManager.getPresentationUtility().showLoadingScreen(); 
            var infoCall = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InformationModule");
            infoCall.presentationController.onClickCallUs();       
    }, 
  
     showDial: function (phoneNumber) {     
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.phone.dial(phoneNumber);         
    },
  
   setCardView: function(cardStatus,cardType) {
      var loggerManager = applicationManager.getLoggerManager();
      try {	
        loggerManager.log("#### start frmCardManageHomeController : setCardView ####");

        if (kony.sdk.isNullOrUndefined(cardStatus)) {
          applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.cardManage.errorFetchCards"));
          applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
    	
    	var navManager = applicationManager.getNavigationManager();
    	var frmData = navManager.getCustomInfo("frmCardManageHome");
    
    	if(!kony.sdk.isNullOrUndefined(frmData.cardData) )
    	{
          if(frmData.cardData.view === "pinChange") {
            if(kony.sdk.isNullOrUndefined(frmData.cardData.type)) {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.pinChangeMsg");
            }
            else if (frmData.cardData.type === "email") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.pinChangeMsgEmail");
            }
            else if (frmData.cardData.type === "phoneNo") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.pinChangeMsgPhone");
            }
            else if (frmData.cardData.type === "postalAddress") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.pinChangeMsgAddress");
            }
          }

		  frmData.cardData = null;
          navManager.setCustomInfo("frmCardManageHome", frmData);
          this.setViewForPinChange(cardType);
        }
        else {
          if(!kony.sdk.isNullOrUndefined(frmData.pinChange)&&frmData.pinChange==="pinChange")
            {
              frmData.pinChange="";
               navManager.setCustomInfo("frmCardManageHome", frmData);
            this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.pinChangeMsg");
            this.setViewForPinChange(cardType);
            }
          else
            {
          if (cardStatus === "Locked") {
            this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.setInActiveMsg");
            this.setCardLocked(cardType);
          }
          else if (cardStatus === "Inactive") {
            this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.setInActiveMsg");
            this.setCardInactive(cardType);
          }
          else if (cardStatus === "Active") {
            this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.setActiveMsg");
            this.setCardActive(cardType);
          }
          else if (cardStatus === "pinChange") {
            this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.pinChangeMsg");
            this.setViewForPinChange(cardType);
          }
          else if (cardStatus === "Replace Request Sent") {
            this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.replaceMsg");
            this.setViewForReplacedCard(cardType);
          }
          else if (cardStatus === "Reported Lost") {
            this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.reportMsg");
            this.setViewForStolenCard(cardType);
          }
          else if (cardStatus === "Cancelled") {
            this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.cancelMsg");
            this.setViewForCancelCard(cardType);
          }
        }
      }
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
  
    postShow: function() {
      
        var navManager = applicationManager.getNavigationManager();        
        var frmData = navManager.getCustomInfo("frmCardManageHome");
        
        if(!kony.sdk.isNullOrUndefined(frmData))
        {            
            var response = frmData.response;
              if(kony.sdk.isNullOrUndefined(response) || response.length === 0)
              {
                  var cardsManager = applicationManager.getCardsManager();
                  response = cardsManager.getCards();                                
              }
              if(!kony.sdk.isNullOrUndefined(response) && response.length > 0) {
                  this.cardList = response;
                  this.cardListTotalCards = response.length;
                  this.carouselAnimationPreShow();
                  this.getAndSetCards();
              } 
              else {
                  this.cardListTotalCards = 0;
                  this.view.lblNoCards.text = kony.i18n.getLocalizedString("kony.mb.cardManage.NoCards");
                  this.view.flxNoCards.isVisible = true;
                  this.view.customHeader.flxSearch.isVisible = false;
              }
              applicationManager.getPresentationUtility().dismissLoadingScreen();
        }        
    },
    getAndSetCards: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {	
        loggerManager.log("#### start frmCardManageHomeController : getAndSetCards ####");

        var navManager = applicationManager.getNavigationManager();
        var frmData = navManager.getCustomInfo("frmCardManageHome");
		var isMainScreen = false;
		if(!kony.sdk.isNullOrUndefined(frmData)){
			isMainScreen = frmData.isMainScreen;	
		}        
        this.cardListGetCards();
        this.cardListScrollIndex();
        if (!isMainScreen) {
          this.popupMsg = "";
          navManager.setCustomInfo("frmCardManageHome", {"isMainScreen":undefined});
          if(isMainScreen === true){
            this.cardListIndex = 0;
          }
        }
        if (this.popupMsg !== '') {
          this.showPopupSuccess();
        }
        this.view.flxNoCards.isVisible = false;
        this.view.forceLayout();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
  
    setDataForCards: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {	
        loggerManager.log("#### start frmCardManageHomeController : setDataForCards ####");

        this.cardListImages = [
          "atmcardgold.png",
          "atmcardplatinum.png",
          "atmcardblack.png",
          "atmcardgold.png",
          "atmcardplatinum.png",
          "atmcardblack.png",
          "atmcardplatinum.png",
          "atmcardblack.png",
        ];
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },

    carouselAnimationPreShow: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {	
        loggerManager.log("#### start frmCardManageHomeController : carouselAnimationPreShow ####");

        var no_of_cards = this.cardListTotalCards;
        var no_of_widgets = this.view.flxCardList.widgets().length;
        if (no_of_cards !== no_of_widgets) {
          this.cardListIndex = 0;
          this.removeExtraClonedCards();
          this.cardListCloneCards();
        }
        this.view.flxCardList.showFadingEdges = false;
        this.view.flxCardList.scrollToWidget(this.view.flxCardList.widgets()[this.cardListIndex]);
        this.setDataForCards();
        this.setCarouselAnimationActions();
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },

    removeExtraClonedCards: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {	
        loggerManager.log("#### start frmCardManageHomeController : removeExtraClonedCards ####");

        var totalCards = this.view.flxCardList.widgets().length;
        for (var i = totalCards - 1 ; i > 0; i--) {
          this.view.flxCardList.removeAt(i);
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },

    cardListCloneCards: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {	
        loggerManager.log("#### start frmCardManageHomeController : cardListCloneCards ####");

        for (var i = 1; i < this.cardListTotalCards; i++) {
          var newPage = this.view.flxCard.clone("newPage" + i);
          this.view.flxCardList.add(newPage);
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },

    setCarouselAnimationActions: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {	
        loggerManager.log("#### start frmCardManageHomeController : setCarouselAnimationActions ####");

        var scopeObj = this;
        this.view.flxCardList.onScrollStart = function() {
          scopeObj.cardListScrollStart();
        };
        this.view.flxCardList.onScrolling = function() {
          scopeObj.cardListScroll();
        };
        this.view.flxCardList.onScrollEnd = function() {
          scopeObj.cardListScrollStop();
        };
        this.view.postShow = function() {
          scopeObj.postShow();
        };
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    cardListGetCards: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {	
        loggerManager.log("#### start frmCardManageHomeController : cardListGetCards ####");

        kony.print("-- cardListGetCards Start --");
        if(!kony.sdk.isNullOrUndefined(this.view) &&
           !kony.sdk.isNullOrUndefined(this.view.flxCardList) &&
           !kony.sdk.isNullOrUndefined(this.view.flxCardList.widgets()) &&
           !kony.sdk.isNullOrUndefined(this.view.flxCard.frame))
        {
          this.cardListCards = this.view.flxCardList.widgets();
          this.cardListWidth = this.view.flxCard.frame.width;
          kony.print("-- cardListWidth = " + this.cardListWidth);
          kony.print("-- cardListGetCards End --");
          this.cardListSetCards();
        }
        else
        {
          this.cardListCards = [];
          this.cardListWidth = 0;
        }
        
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },

    cardListSetCards: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {	
        loggerManager.log("#### start frmCardManageHomeController : cardListSetCards ####");

        this.lastSetIndex = this.clone(this.cardListIndex);
        var cardListStartTransform = kony.ui.makeAffineTransform();
        cardListStartTransform.scale(this.cardListStartScale, this.cardListStartScale);
        var growEnd = this.cardListStartScale + this.cardListScaleGrowth;
        var cardListEndTransform = kony.ui.makeAffineTransform();
        cardListEndTransform.scale(growEnd, growEnd);
        for (i = 0; i < this.cardListCards.length; i++) {
          this.cardListCards[i].transform = cardListStartTransform;
          var cardListChildWidgets = this.cardListCards[i].widgets();
          
          var cardNumbers = cardListChildWidgets[1].widgets();
          var cardNumber4 = cardNumbers[3].widgets();
          cardNumber4[0].text = this.cardList[i]['cardNumber'].slice(-4); 
          this.cardListCards[i].opacity = 0.5;
          var prdName = this.cardList[i].cardProductName;
                 cardListChildWidgets[0].src = this.getCardImage(prdName);
         /* if(this.cardList[i]['cardType'].trim() === "Debit")
          {
            cardListChildWidgets[0].src = "atmcardblack.png";  
          }
          else if(this.cardList[i]['cardType'].trim() === "Credit")
          {
            cardListChildWidgets[0].src = "atmcardgold.png";  
          }
          else
          {
            cardListChildWidgets[0].src = "atmcardpetrol.png";  
          }*/
        }
        this.cardListCards[this.cardListIndex].opacity = 1;
        this.cardListCards[this.cardListIndex].transform = cardListEndTransform;
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },

    cardListScrollStart: function() {
        this.cardListLastIndex = this.cardListIndex;
    },
    getCardImage : function(cardProductName)
  {
    var cards ={
            "Eazee Food Card": 'eazee_food_card.png',
            "Gold Debit Card": 'golden_card.png',
            "Petro Card": 'petro_card.png',
            "My Platinum Credit Card": 'premium_club_credit.png',
            "PremiumCredit": 'platinum_card.png',
            "Shopping Card": 'shopping_card.png'
    };
    return cards[cardProductName];
  },

    cardListScroll: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {	
        loggerManager.log("#### start frmCardManageHomeController : cardListScroll ####");
        if (kony.sdk.isNullOrUndefined(this.view) ||
            kony.sdk.isNullOrUndefined(this.view.flxCardList) ||
            kony.sdk.isNullOrUndefined(this.view.flxCardList.widgets())
           )
        {
          return;
        }

        var scrollPosX = this.view.flxCardList.contentOffsetMeasured.x;
        var cardListFactor = [];
        var cardListScaleFactor = [];
        var cardListScale = [];
        var cardListScrollTransform = [];
        var cardListOpacity = [];

        for (i = 0; i < this.cardListCards.length; i++) {
          if(this.cardListWidth !== 0){
              cardListFactor[i] = this.roundNum(Math.min(2, (Math.max(0, (scrollPosX - (this.cardListWidth * (i - 1)))) / (this.cardListWidth))), 3);
          }
          else{
            cardListFactor[i] = 0;
          }
          kony.print("-- cardListFactor " + i + " " + cardListFactor[i]);
          if (cardListFactor[i] < 1) {
            cardListScaleFactor[i] = cardListFactor[i];
          } else {
            cardListScaleFactor[i] = this.roundNum((2 - cardListFactor[i]), 3);
          }
          kony.print("-- cardListScaleFactor " + i + " " + cardListScaleFactor[i]);
          cardListScale[i] = (this.cardListStartScale + (cardListScaleFactor[i] * (this.cardListScaleGrowth)));
          cardListScrollTransform[i] = kony.ui.makeAffineTransform();
          cardListScrollTransform[i].scale(cardListScale[i], cardListScale[i]);
          this.cardListCards[i].transform = cardListScrollTransform[i];
          cardListOpacity[i] = Math.max(0.5, (cardListScaleFactor[i]));
          this.cardListCards[i].opacity = cardListOpacity[i];
          kony.print("-- cardListIndex = " + this.cardListIndex);
          kony.print("-- cardListFactor " + i + " = " + cardListFactor[i] + " cardListScale " + i + " = " + this.roundNum(cardListScale[i], 3) + " cardListOpacity = " + cardListOpacity[i]);
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },

    cardListScrollStop: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {	
        loggerManager.log("#### start frmCardManageHomeController : cardListScrollStop ####");


        var scrollPosX = parseInt(this.view.flxCardList.contentOffsetMeasured.x);
        var cardFrameWidth = parseInt(this.view.flxCardList.frame.width);
        this.cardListIndex = parseInt((scrollPosX + 1) / cardFrameWidth);
        this.cardListScrollIndex();

        kony.print("-- cardListLastIndex = " + this.cardListLastIndex);
        kony.print("-- cardListIndex = " + this.cardListIndex);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
	setCurrentCardDetails : function(){
      var loggerManager = applicationManager.getLoggerManager();
      try {	
        loggerManager.log("#### start frmCardManageHomeController : setCurrentCardDetails ####");


        var formatUtil = applicationManager.getFormatUtilManager();
        this.view.lblAvailBal.text = kony.i18n.getLocalizedString("kony.mb.accdetails.creditLimit");
        this.view.lblAvailBalValue.text = ((this.cardList[this.cardListIndex].creditLimit!=null)?(formatUtil.formatAmountandAppendCurrencySymbol(this.cardList[this.cardListIndex].creditLimit)):"$0.00");
        if(this.cardList[this.cardListIndex].cardType === "Debit"){
          this.view.lblAvailBal.text = kony.i18n.getLocalizedString("kony.mb.cardManage.withdrawlLimit");
          this.view.lblAvailBalValue.text = ((this.cardList[this.cardListIndex].withdrawlLimit!=null)?(formatUtil.formatAmountandAppendCurrencySymbol(this.cardList[this.cardListIndex].withdrawlLimit)):"$0.00");
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    cardListScrollIndex: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {	
        loggerManager.log("#### start frmCardManageHomeController : cardListScrollIndex ####");

        kony.print("-- cardListScrollIndex Start --");
        this.currCardNumber = this.cardList[this.cardListIndex]['cardNumber'];
        var cardStatus = this.cardList[this.cardListIndex]['cardStatus'];
        var cardType = this.cardList[this.cardListIndex]['cardType'];
        this.setCurrentCardDetails();
        this.setCardView(cardStatus,cardType);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    roundNum: function(num, decimals) {
        var t = Math.pow(10, decimals);
        return (Math.round((num * t) + (decimals > 0 ? 1 : 0) * (Math.sign(num) * (10 / Math.pow(100, decimals)))) / t).toFixed(decimals);
    },
    flxActiveOrInactiveOnClick: function() {
      try {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        var cardDetails = {
          "cardId": this.getCurrentCardDetails().cardId
        };
      if (this.view.switchActiveorInactive.selectedIndex === 1) {
          cardDetails.view = "lockCard";
        } else {
          cardDetails.view = "unlockCard";
        }
        navManager.setCustomInfo("frmCardMgtSecurityCode", cardDetails);
        this.navigateToCardsEachflow();
//         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsModule");
//     	manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMgtSecurityCode");
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setCardLocked: function(cardType) {
      var loggerManager = applicationManager.getLoggerManager();
      try {	
        loggerManager.log("#### start frmCardManageHomeController : setCardInactive ####");

        this.view.flxOptionsContainer.setVisibility(true);
        this.view.flxChangePin.setVisibility(false);
        this.view.flxSeperator3.setVisibility(false);
        this.view.flxReplaceCard.setVisibility(true);
        this.view.flxSeperator4.setVisibility(true);
        this.view.flxReportStolenOrLost.setVisibility(true);
        this.view.flxSeperator5.setVisibility(true);
        this.view.flxActiveOrInactive.setVisibility(true);
        this.view.flxSeperator2.setVisibility(true);
      //  this.view.flxCancelCard.setVisibility(true);
         if(cardType == applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit)
        this.view.flxCancelCard.setVisibility(true);
      else
        this.view.flxCancelCard.setVisibility(false);
        this.view.flxSeperator6.setVisibility(false);
        this.view.flxCustomerCare.setVisibility(false);
        this.view.switchActiveorInactive.selectedIndex = 1;
        this.view.lblActiveOrInactive.text = kony.i18n.getLocalizedString("kony.mb.cardManage.cardActive");
        this.view.flxActiveOrInactive.forceLayout();
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setCardActive: function(cardType) {
      var loggerManager = applicationManager.getLoggerManager();
      try {	
        loggerManager.log("#### start frmCardManageHomeController : setCardActive ####");

        this.view.flxOptionsContainer.setVisibility(true);
        this.view.flxChangePin.setVisibility(true);
        this.view.flxSeperator3.setVisibility(true);
        this.view.flxReplaceCard.setVisibility(true);
        this.view.flxSeperator4.setVisibility(true);
        this.view.flxReportStolenOrLost.setVisibility(true);
        this.view.flxSeperator5.setVisibility(true);
        this.view.flxActiveOrInactive.setVisibility(true);
         this.view.flxSeperator2.setVisibility(true);
       // this.view.flxCancelCard.setVisibility(true);
         if(cardType == applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit)
        this.view.flxCancelCard.setVisibility(true);
      else
        this.view.flxCancelCard.setVisibility(false);
        this.view.flxSeperator6.setVisibility(false);
        this.view.flxCustomerCare.setVisibility(false);
        this.view.lblActiveOrInactive.text = kony.i18n.getLocalizedString("kony.mb.cardManage.cardActive");
        this.view.switchActiveorInactive.selectedIndex = 0;
        this.view.flxActiveOrInactive.forceLayout();
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
     showPopupSuccess: function() {
    var navManager=applicationManager.getNavigationManager();
    var navData=navManager.getCustomInfo("frmCardManageHome");
    if(!kony.sdk.isNullOrUndefined(navData) && !kony.sdk.isNullOrUndefined(navData.isMainScreen))
    {
      navData.isMainScreen=false;
      navManager.setCustomInfo("frmCardManageHome",navData);
    }
    else
    {
      navManager.setCustomInfo("frmCardManageHome",{"isMainScreen": false});
    }
    applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, this.popupMsg);
  },
  
     flxChangePinOnClick: function() {
        var cardDetails;
      var loggerManager = applicationManager.getLoggerManager();
      try {	
        loggerManager.log("#### start frmCardManageHomeController : flxChangePinOnClick ####");
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        if(this.getCurrentCardDetails().cardType=="Credit")
          {
             cardDetails =  {
              "cardId":this.getCurrentCardDetails().cardId,
              "view": "pinChange",
              "cardType": this.getCurrentCardDetails().cardType,
              "CardAccountNumber": this.getCurrentCardDetails().maskedCardNumber,
              "CardAccountName":this.getCurrentCardDetails().cardProductName,
              "AccountType": 'CARD',
              "userName": applicationManager.getUserPreferencesManager().getUserName(),
              "RequestCode":"NEW_PIN",
              "Channel":"Online"
            };
          }
        else
          {
         cardDetails =  {
         	"cardId":this.getCurrentCardDetails().cardId,
            "view": "pinChange",
          	"cardType": this.getCurrentCardDetails().cardType,
			 "Reason":"lb"
        };
          }

        navManager.setCustomInfo("frmCardMgtSecurityCode",cardDetails);
        this.navigateToCardsEachflow();
//         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsModule");
//     	manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMgtSecurityCode");
      }
      
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
  
    flxReplaceCardOnClick: function() {
      try {
        var currentCardDetails = this.getCurrentCardDetails();
        var navManager = applicationManager.getNavigationManager();
        var bankName = applicationManager.getUserPreferencesManager().getBankName();
        var cardDetails = {
            "cardId": this.getCurrentCardDetails().cardId,
            "view": "replaceCard",
            "cardNumber": currentCardDetails.cardNumber,
            "cardHolderName": currentCardDetails.cardHolderName,
            "expiryDate": currentCardDetails.expiryDate,
            "issuerName": bankName,
            "cardType": currentCardDetails.cardType
        };

        navManager.setCustomInfo("frmCardMgtSecurityCode", cardDetails);
         this.navigateToCardsEachflow();
//         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsModule");
//     	manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMgtSecurityCode");
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    flxReportStolenOrLostOnClick: function() {
      try {
        var currentCardDetails = this.getCurrentCardDetails();
        var navManager = applicationManager.getNavigationManager();
        var bankName = applicationManager.getUserPreferencesManager().getBankName();

        var cardDetails = {
            "cardId": this.getCurrentCardDetails().cardId,
            "view": "lostCard",
            "cardNumber": currentCardDetails.cardNumber,
            "cardHolderName": currentCardDetails.cardHolderName,
            "expiryDate": currentCardDetails.expiryDate,
            "issuerName": bankName,
            "cardType": currentCardDetails.cardType
        };

        navManager.setCustomInfo("frmCardMgtSecurityCode", cardDetails);
       this.navigateToCardsEachflow();
//         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsModule");
//    		manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMgtSecurityCode");
      }
      
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    flxCancelCardOnClick: function() {
      try {
        var currentCardDetails = this.getCurrentCardDetails();
        var navManager = applicationManager.getNavigationManager();
        var bankName = applicationManager.getUserPreferencesManager().getBankName();

        var cardDetails = {
            "cardId": currentCardDetails.cardId,
            "view": "cancelCard",
            "cardNumber": currentCardDetails.cardNumber,
            "cardHolderName": currentCardDetails.cardHolderName,
            "expiryDate": currentCardDetails.expiryDate,
            "issuerName": bankName,
            "cardType": currentCardDetails.cardType
        };

        navManager.setCustomInfo("frmCardMgtSecurityCode", cardDetails);
       this.navigateToCardsEachflow();
//         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsModule");
//    		manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMgtSecurityCode");
      }
      
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setViewForPinChange: function(cardType) {
        this.view.flxOptionsContainer.setVisibility(true);
      if(cardType == applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit)
        this.view.flxCancelCard.setVisibility(true);
      else
        this.view.flxCancelCard.setVisibility(false);
        this.view.flxCustomerCare.setVisibility(false);
    },
    setViewForReplaceCard: function(cardType) {
         this.view.switchActiveorInactive.selectedIndex = 1;
         this.view.flxReportStolenOrLost.setVisibility(true);
         this.view.flxSeperator5.setVisibility(true);
        this.view.flxOptionsContainer.setVisibility(true);
         if(cardType == applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit)
        this.view.flxCancelCard.setVisibility(true);
      else
        this.view.flxCancelCard.setVisibility(false);
        this.view.flxCustomerCare.setVisibility(false);
    },
    setViewForStolenCard: function(cardType) {    
       if(cardType == applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit)      
       {
          this.view.flxOptionsContainer.setVisibility(true);
           this.view.flxCustomerCare.setVisibility(false);
         this.view.flxCancelCard.setVisibility(true);
          this.view.flxChangePin.setVisibility(false);
        this.view.flxSeperator3.setVisibility(false);
        this.view.flxReplaceCard.setVisibility(false);
        this.view.flxSeperator4.setVisibility(false);
        this.view.flxReportStolenOrLost.setVisibility(false);
        this.view.flxSeperator5.setVisibility(false);
         this.view.flxActiveOrInactive.setVisibility(false);
         this.view.flxSeperator2.setVisibility(true);
       }
      else
        {
        this.view.flxCancelCard.setVisibility(false);
          this.view.flxOptionsContainer.setVisibility(false);
           this.view.flxCustomerCare.setVisibility(true);
        }
      
       
        this.view.lblActiveOrInactive.text = kony.i18n.getLocalizedString("kony.mb.cardManage.cardActive");
        this.view.switchActiveorInactive.selectedIndex = 0;
        this.view.flxActiveOrInactive.forceLayout();
    },
  	setCardInactive: function() {
      this.view.flxOptionsContainer.setVisibility(false);
        this.view.lblMsg.text = kony.i18n.getLocalizedString("kony.mb.cardManage.setInActiveMsg");
        this.view.flxCustomerCare.forceLayout();
        this.view.flxCustomerCare.setVisibility(true);
    },
    setViewForCancelCard: function() {
        this.view.flxOptionsContainer.setVisibility(false);
        this.view.lblMsg.text = kony.i18n.getLocalizedString("kony.mb.cardManage.cancelMessage");
        this.view.flxCustomerCare.forceLayout();
        this.view.flxCustomerCare.setVisibility(true);
    },
	setViewForReplacedCard: function(cardType) {
       
        this.view.lblMsg.text = kony.i18n.getLocalizedString("kony.mb.cardManage.replaceMessage");
        this.view.flxOptionsContainer.setVisibility(true);
        this.view.flxActiveOrInactive.setVisibility(false);
      this.view.flxSeperator2.setVisibility(false);
        this.view.flxChangePin.setVisibility(false);
        this.view.flxSeperator3.setVisibility(false);
        this.view.flxReplaceCard.setVisibility(false);
        this.view.flxSeperator4.setVisibility(false);
        this.view.flxReportStolenOrLost.setVisibility(true);
        this.view.flxSeperator5.setVisibility(true);
         if(cardType == applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit)
        this.view.flxCancelCard.setVisibility(true);
      else
        this.view.flxCancelCard.setVisibility(false);
       // this.view.flxCancelCard.setVisibility(true);
      //  this.view.flxSeperator6.setVisibility(true);
        this.view.flxCustomerCare.setVisibility(false);
        this.view.lblActiveOrInactive.text = kony.i18n.getLocalizedString("kony.mb.cardManage.cardActive");
        this.view.switchActiveorInactive.selectedIndex = 0;
        this.view.flxActiveOrInactive.forceLayout();
    },
    getCurrentCardDetails: function() {
        return this.cardList[this.cardListIndex];
    },
    navigateToCardMngDetails: function() {
      if(this.cardListTotalCards > 0) {
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmCardManageDetails", this.cardList[this.cardListIndex]);
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsModule");
    	manageCardsModule.presentationController.commonFunctionForNavigation("frmCardManageDetails");
      }
    },
    clone: function(obj) {
        if (null === obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    },
  
  navigateToMenu: function(){
       	var navManager = applicationManager.getNavigationManager();
    	navManager.goBack();
  },
navigateToCardsEachflow: function()
  {
    try {
          var scope = this;
          this.view.customHeader.btnRight.onClick = this.goBackToHome;
          var navManager = applicationManager.getNavigationManager();
          var frmData = navManager.getCustomInfo("frmCardMgtSecurityCode");
          if (frmData === undefined) {
            var newObj = {
              "view": "none"
            };
            frmData = newObj;
          }
          if (frmData.view === "lockCard") {
            this.setFunctionalityForLockCard(frmData);
          }
          if (frmData.view === "unlockCard") {
            this.setFunctionalityForUnlockCard(frmData);
          }
          if (frmData.view === "pinChange") {
            this.setFunctionalityForPinChange(frmData);
          }
          if (frmData.view === "replaceCard") {
            this.setFunctionalityForReplaceCard(frmData);
          }
          if (frmData.view === "lostCard") {
            this.setFunctionalityForLostCard(frmData);
          }
          if (frmData.view === "cancelCard") {
            this.setFunctionalityForCancelCard(frmData);
          }
        
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
  },	
  setFunctionalityForLockCard: function(cardData) {
        var scope = this;
      	cardData.Action = "Lock";
      	cardData.Reason = "Lock";
      //  this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.lockCard");
        //this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.lockCard");
     //   this.view.btnProceed.onClick = function() {
            scope.lockUnlockCard(cardData);
       // };
    },
    setFunctionalityForUnlockCard: function(cardData) {
        var scope = this;
      	cardData.Action = "Activate";
      	cardData.Reason = "Unlock";
      //  this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.unlockCard");
        //this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.unlockCard");
        //this.view.btnProceed.onClick = function() {
          	scope.lockUnlockCard(cardData);
       // };
    },

  	lockUnlockCard : function(cardData){
      try {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsModule");
        manageCardsModule.presentationController.updateCardData(cardData);
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
  setFunctionalityForPinChange: function(cardDetails) {
    var loggerManager = applicationManager.getLoggerManager();
    try {	
      loggerManager.log("#### start frmCardMgtSecurityCodeController : setFunctionalityForPinChange ####");

      cardDetails.Action = "PinChange"; 
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmCardMngReasons", cardDetails );
      if(cardDetails.cardType==="Credit")
      {
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsModule");
        manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngReasons");
      }
      else
      {
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsModule");
        manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngNewPin");
      }
    }
    catch(err) {
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
    }
  },

    setFunctionalityForReplaceCard: function(cardData) {
      try {
        var scope = this;
      	cardData.Action = "Replace";
       // this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.replacingCard");
        //this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.replacingCard");
        //this.view.btnProceed.onClick = function() {
			var navManager = applicationManager.getNavigationManager();
			navManager.setCustomInfo("frmCardMngReasons",cardData);
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsModule");
   			manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngReasons");
        //};
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }        
    },
    setFunctionalityForLostCard: function(cardData) {
      try {
        var scope = this;
      	cardData.Action = "Report Lost";
       // this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.stolenCreditCard");
       // this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.stolenCreditCard");
        //this.view.btnProceed.onClick = function() {
           	var navManager = applicationManager.getNavigationManager();
			navManager.setCustomInfo("frmCardMngReasons",cardData);
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsModule");
    		manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngReasons");
     //   };
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setFunctionalityForCancelCard: function(cardData) {
      try {
        var scope = this;
      	cardData.Action = "Cancel";
       // this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.cancelCardTitle");
       // this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.cancelCardTitle");
        //this.view.btnProceed.onClick = function() {
            var navManager = applicationManager.getNavigationManager();
			navManager.setCustomInfo("frmCardMngReasons",cardData);
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsModule");
          	manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngReasons");
      //  };
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }        
    },
  /**
   * @function
   * Entry to Travel Notification Management Home
   * form: frmManageTravelPlans
   */
  navigateToTravelManageHome: function(){	    
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsModule");
    	manageCardsModule.presentationController.fetchTravelPlans();
  }
  
});
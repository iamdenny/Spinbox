/**
 * @description This is spinbox module and designed by MVC pattern.
 * @author Denny Lim
 * @since Dec 21, 2011
 * @version 1.0
 * @public
 * @class Spinbox Controller
 * @example 
 * 		$Fn(function(){ 
 * 			new SpinboxController("customSpinbox", 100, 300); 
 * 		}, this).attach(document, "domready"); 
 */
var SpinboxController = $Class({
	
	/**
     * The instance of the model class
     * @private
     * @type object
     */
	_oModel : null,
	/**
     * The instance of the view class
     * @private
     * @type object
     */
	_oView : null,
	
	/**
	 * @public
	 * @constructor 
	 * @param {string} rootDivName Id of existing object which will be used as container
	 * @param {int} minNumber Minimum number of spinbox's value
	 * @param {int} maxNumber Maximum number of spinbox's value
	 */
	$init : function(rootDivName, minNumber, maxNumber) {
		if(typeof(rootDivName)=="string") {
			this._oModel = new SpinboxModel(this, minNumber, maxNumber);
			this._oView = new SpinboxView(this, rootDivName);
			this.update();	
		}
	},
	
	/**
	 * @public
	 * @description increase Number
	 */
	increaseNumber : function() {
		this._oModel.increaseNumber();
	},
	
	/**
	 * @public
	 * @description decrease Number
	 */
	decreaseNumber : function() {
		this._oModel.decreaseNumber();
	},
	
	/**
	 * @public
	 * @description update status to view
	 */
	update : function() {
		this._oView.update();
	},
	
	/**
	 * @public
	 * @description get Current Number
	 * @returns {int} current number
	 */
	getCurrentNumber : function() {
		return this._oModel.getCurrentNumber();
	},
	
	/**
	 * @public
	 * @description validate Number
	 * @param {int} number
	 */
	validateNumber : function(number) {
		this._oModel.validateNumber(number);
	}
});

/**
 * @description This is model class of spinbox
 * @author Denny Lim
 * @since Dec 21, 2011
 * @version 1.0
 *
 * @public
 * @class Spinbox Model
 */
var SpinboxModel = $Class({
	
	/**
	 * The instance of the controller class
	 * @private
	 * @type object
	 */
	_oController:null,
	/**
	 * Minimum number of spinbox's value
	 * @private
	 * @type int
	 */
	_nMinNumber:null,
	/**
	 * Maximum number of spinbox's value
	 * @private
	 * @type int
	 */
	_nMaxNumber:null,
	/**
	 * current number of spinbox's value
	 * @private
	 * @type int
	 */
	_nCurrentNumber:null, 
		
	/**
	 * @public
	 * @constructor
	 * @param {object} controller The instance of SpinboxController class
	 * @param {int} minNumber Minimum number of spinbox's value
	 * @param {int} maxNumber Maximum number of spinbox's value
	 */
	$init : function(controller, minNumber, maxNumber) {
		this._oController = controller;
		this._nMinNumber = minNumber;
		this._nMaxNumber = maxNumber;
		this._nCurrentNumber = 200;		
	},
	
	/**
	 * @public
	 * @description increase Number
	 */
	increaseNumber : function() {
		this._nCurrentNumber++;
		if(this._nCurrentNumber > this._nMaxNumber) this._nCurrentNumber = this._nMaxNumber;
		this._oController.update();
	},
	
	/**
	 * @public
	 * @description decrease Number
	 */
	decreaseNumber : function() {
		this._nCurrentNumber--;
		if(this._nCurrentNumber < this._nMinNumber) this._nCurrentNumber = this._nMinNumber;
		this._oController.update();
	},
	
	/**
	 * @public
	 * @description get Current Number
	 * @returns {int} current number
	 */
	getCurrentNumber : function() {
		return this._nCurrentNumber;
	},
	
	/**
	 * @public
	 * @description validate Number
	 */
	validateNumber : function(number){
		number = number.replace(/[^0-9]/g, '');
		if(!isNaN(number)) {
			this._nCurrentNumber = parseInt(number);
			if(number < this._nMinNumber) this._nCurrentNumber = this._nMinNumber;
			if(number > this._nMaxNumber) this._nCurrentNumber = this._nMaxNumber;			
		}
		this._oController.update();
	}
});


/**
 * @description This is view class of spinbox
 * @author Denny Lim
 * @since Dec 21, 2011
 * @version 1.0
 * 
 * @public
 * @class Spinbox View
 */
var SpinboxView = $Class({

	/**
	 * The instance of the controller class
	 * @private
	 * @type object
	 */
	_oController : null,
	/**
	 * The root element
	 * @private
	 * @type element
	 */
	_elRootDiv : null,
	/**
	 * The inputbox element
	 * @private
	 * @type element
	 */
	_elInputBox : null,
	/**
	 * The increase button element
	 * @private
	 * @type element
	 */
	_elIncreaseButton : null,
	/**
	 * The decrease button element
	 * @private
	 * @type element
	 */
	_elDecreaseButton : null,
	/**
	 * The id of setTimeout
	 * @private
	 * @type int
	 */
	_nIDofSetTimeout : null,
	
	/**
	 * @public
	 * @constructor
	 * @param {object} controller The instance of SpinboxController class
	 * @param {string} rootDivName The ID of existing object which will be used as container
	 */
	$init : function(controller, rootDivName) {
		this._oController = controller;
		try {
			this._elRootDiv = $Element(rootDivName).$value();
		} catch (e) {
			this._elRootDiv = $$.getSingle("body");
		}
		this._createSpinbox();
	},
	
	/**
	 * @private
	 * @description create Spinbox such as inputbox, increase Button and decrease Button
	 */
	_createSpinbox : function() {
		// create input box
		this._elInputBox = $("<input type='text' style='width:150px'>");
		$Fn(this._inputBoxBlur, this).attach(this._elInputBox, "blur");
		this._elRootDiv.appendChild(this._elInputBox);
		
		// create increase button
		this._elIncreaseButton = $("<input type='button' value='¡ã'>");
		$Fn(this._increaseButtonDown, this).attach(this._elIncreaseButton, "mousedown");
		$Fn(this._increaseButtonUp, this).attach(this._elIncreaseButton, "mouseup");
		$Fn(this._increaseButtonUp, this).attach(this._elIncreaseButton, "mouseout");
		this._elRootDiv.appendChild(this._elIncreaseButton);
		
		// create decrease button
		this._elDecreaseButton = $("<input type='button' value='¡å'>");
		$Fn(this._decreaseButtonDown, this).attach(this._elDecreaseButton, "mousedown");
		$Fn(this._decreaseButtonUp, this).attach(this._elDecreaseButton, "mouseup");
		$Fn(this._decreaseButtonUp, this).attach(this._elDecreaseButton, "mouseout");
		this._elRootDiv.appendChild(this._elDecreaseButton);
	},
	
	/**
	 * @public
	 * @description update status
	 */
	update : function() {
		this._elInputBox.value = this._oController.getCurrentNumber();
	},
	
	/**
	 * @private
	 * @description input box blur event
	 * @event
	 * @param {event} e Window event
	 */
	_inputBoxBlur : function(e) {
		this._oController.validateNumber(this._elInputBox.value);
	},
	
	/**
	 * @private
	 * @description increaseButton Down event
	 * @event
	 * @param {event} e Window event
	 */
	_increaseButtonDown : function(e) {
		var self = this;
		/** @inner */
		increaseNumber = function() {
			self._oController.increaseNumber();
			self._nIDofSetTimeout = setTimeout(increaseNumber, 100);
		};
		
		this._oController.increaseNumber();
		this._nIDofSetTimeout = setTimeout(increaseNumber, 500);
	},
	
	/**
	 * @private
	 * @description increaseButton Up event
	 * @event
	 * @param {event} e Window event
	 */
	_increaseButtonUp : function(e) {
		clearTimeout(this._nIDofSetTimeout);
	},
	
	/**
	 * @private
	 * @description decreaseButton Down event
	 * @event
	 * @param {event} e Window event
	 */
	_decreaseButtonDown : function(e) {
		var self = this;
		/** @inner */
		decreaseNumber = function() {
			self._oController.decreaseNumber();
			self._nIDofSetTimeout = setTimeout(decreaseNumber, 100);
		};
		
		this._oController.decreaseNumber();
		this._nIDofSetTimeout = setTimeout(decreaseNumber, 500);
	},	
	
	/**
	 * @private
	 * @description decreaseButton Up event
	 * @event
	 * @param {event} e Window event
	 */
	_decreaseButtonUp : function(e) {
		clearTimeout(this._nIDofSetTimeout);
	}
});
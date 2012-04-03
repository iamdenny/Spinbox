/**
 * @description This is view class of spinbox
 * @author Denny Lim
 * @since Dec 21, 2011
 * @version 1.0
 * 
 * @public
 * @constructor
 * @class Spinbox View
 */
var SpinboxView = $Class({
	/** @lends SpinboxView */

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
	 * @constructs
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
		this._elIncreaseButton = $("<input type='button' value='▲'>");
		$Fn(this._increaseButtonDown, this).attach(this._elIncreaseButton, "mousedown");
		$Fn(this._increaseButtonUp, this).attach(this._elIncreaseButton, "mouseup");
		$Fn(this._increaseButtonUp, this).attach(this._elIncreaseButton, "mouseout");
		this._elRootDiv.appendChild(this._elIncreaseButton);
		
		// create decrease button
		this._elDecreaseButton = $("<input type='button' value='▼'>");
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
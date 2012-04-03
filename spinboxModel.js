/**
 * @description This is model class of spinbox
 * @author Denny Lim
 * @since Dec 21, 2011
 * @version 1.0
 *
 * @public
 * @constructor
 * @class Spinbox Model
 */
var SpinboxModel = $Class({
	/** @lends SpinboxModel */
	
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
	 * @constructs
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
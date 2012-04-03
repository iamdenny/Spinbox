/**
 * @description This is spinbox module and designed by MVC pattern.
 * @author Denny Lim
 * @since Dec 21, 2011
 * @version 1.0
 * @public
 * @constructor
 * @class Spinbox Controller
 * @example 
 * 		$Fn(function(){ 
 * 			new SpinboxController("customSpinbox", 100, 300); 
 * 		}, this).attach(document, "domready"); 
 */
var SpinboxController = $Class({
	/** @lends SpinboxController */
	
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
	 * @constructs
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
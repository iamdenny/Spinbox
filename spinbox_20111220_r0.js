/**
 * This is spinbox module and controller class.
 * This module designed by MVC pattern.
 * @author Denny Lim
 * @since Dec 20, 2011
 * @version 0.1
 * @param rootDivName
 * @param minNumber
 * @param maxNumber
 */
function SpinboxController(rootDivName, minNumber, maxNumber) {
	
	/**
	 * define member variables
	 */
	this.model;		// model class
	this.view;		// view class
	
	/**
	 * constructor
	 */
	this.constructor = function(rootDivName, minNumber, maxNumber){
		this.model = new SpinboxModel(this, minNumber, maxNumber);
		this.view = new SpinboxView(this, rootDivName);
		this.update();	
	};
	
	/**
	 * increase Number
	 */
	this.increaseNumber = function() {
		this.model.increaseNumber();
	};
	
	/**
	 * decrease Number
	 */
	this.decreaseNumber = function() {
		this.model.decreaseNumber();
	};
	
	/**
	 * status update
	 */
	this.update = function() {
		this.view.update();
	};
	
	/**
	 * get Current Number
	 */
	this.getCurrentNumber = function() {
		return this.model.getCurrentNumber();
	};
	
	/**
	 * validate Number
	 */
	this.validateNumber = function(number) {
		this.model.validateNumber(number);
	};

	// execute constructor()
	this.constructor(rootDivName, minNumber, maxNumber);
	
};

/**
 * This is model class
 * @param thisController
 * @param minNumber
 * @param maxNumber
 */
function SpinboxModel(thisController, minNumber, maxNumber) {
	
	/**
	 * define member variables
	 */
	this.controller;
	this.minNumber;
	this.maxNumber;
	this.currentNumber;
	
	/**
	 * constructor
	 */
	this.constructor = function(thisController, minNumber, maxNumber) {
		this.controller = thisController;
		this.minNumber = minNumber;
		this.maxNumber = maxNumber;
		this.currentNumber = 200;		
	};
	
	/**
	 * increase Number
	 */
	this.increaseNumber = function() {
		this.currentNumber++;
		if(this.currentNumber > this.maxNumber) this.currentNumber = this.maxNumber;
		this.controller.update();
	};
	
	/**
	 * decrease Number
	 */
	this.decreaseNumber = function() {
		this.currentNumber--;
		if(this.currentNumber < this.minNumber) this.currentNumber = this.minNumber;
		this.controller.update();
	};
	
	/**
	 * get Current Number
	 */
	this.getCurrentNumber = function() {
		return this.currentNumber;
	};
	
	/**
	 * validate Number
	 */
	this.validateNumber = function(number){
		number = number.replace(/[^0-9]/g, '');
		if(!isNaN(number)) {
			this.currentNumber = parseInt(number);
			if(number < minNumber) this.currentNumber = this.minNumber;
			if(number > maxNumber) this.currentNumber = this.maxNumber;			
		}
		this.controller.update();
	};
	
	// execute constructor()
	this.constructor(thisController, minNumber, maxNumber);
};

/**
 * This is view class
 * @param thisController
 * @param rootDivName
 */
function SpinboxView(thisController, rootDivName) {

	/**
	 * define member variables
	 */
	this.controller;
	this.rootDiv;
	this.inputBox;
	this.increaseButton;
	this.decreaseButton;
	this.interval;
	
	/**
	 * constructor
	 */
	this.constructor = function(thisController, rootDivName) {
		this.controller = thisController;
		try {
			this.rootDiv = $Element(rootDivName).$value();
		} catch (e) {
			this.rootDiv = $$.getSingle("body");
		}
		this.createSpinbox();
	};
	
	/**
	 * create Spinbox such as inputbox, increase Button and decrease Button
	 */
	this.createSpinbox = function() {
		// create input box
		this.inputBox = $("<input type='text' style='width:150px'>");
		$Fn(this.inputBoxBlur, this).attach(this.inputBox, "blur");
		this.rootDiv.appendChild(this.inputBox);
		
		// create increase button
		this.increaseButton = $("<input type='button' value='¡ã'>");
		$Fn(this.increaseButtonDown, this).attach(this.increaseButton, "mousedown");
		$Fn(this.increaseButtonUp, this).attach(this.increaseButton, "mouseup");
		this.rootDiv.appendChild(this.increaseButton);
		
		// create decrease button
		this.decreaseButton = $("<input type='button' value='¡å'>");
		$Fn(this.decreaseButtonDown, this).attach(this.decreaseButton, "mousedown");
		$Fn(this.decreaseButtonUp, this).attach(this.decreaseButton, "mouseup");
		this.rootDiv.appendChild(this.decreaseButton);
	};
	
	/**
	 * update
	 */
	this.update = function() {
		this.inputBox.value = this.controller.getCurrentNumber();
	};
	
	/**
	 * input box blur event
	 */
	this.inputBoxBlur = function(e) {
		this.controller.validateNumber(this.inputBox.value);
	};

	/**
	 * increaseButton MouseDown event 
	 */
	this.increaseButtonDown = function(e) {
		var self = this;
		increaseNumber = function() {
			self.controller.increaseNumber();
			self.interval = setTimeout(increaseNumber, 100);
		};
		
		self.controller.increaseNumber();
		this.interval = setTimeout(increaseNumber, 500);
	};	

	/**
	 * increaseButton mouseUp event
	 */
	this.increaseButtonUp = function(e) {
		clearTimeout(this.interval);
	};
	
	/**
	 * decreaseButton MouseDown event
	 */
	this.decreaseButtonDown = function(e) {
		var self = this;
		decreaseNumber = function() {
			self.controller.decreaseNumber();
			self.interval = setTimeout(decreaseNumber, 100);
		};
		
		self.controller.decreaseNumber();
		this.interval = setTimeout(decreaseNumber, 500);
	};	

	/**
	 * decreaseButton MouseUp event
	 */
	this.decreaseButtonUp = function(e) {
		clearTimeout(this.interval);
	};

	// execute constructor()
	this.constructor(thisController, rootDivName);
	
};
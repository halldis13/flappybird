window.Pipe = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 20; // * 10 pixels per second
	var WIDTH = 10;
	var HEIGHT = 10;
	var INITIAL_POSITION_X = 15;
	var INITIAL_POSITION_Y = 38;

	var Pipe = function(el, game, first) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.first = first;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Pipe.prototype.reset = function() {
		if (this.first === true){
			console.log("FIRST");
			this.first = false;
		}
		if (this.first === false){
			console.log("NOT FIRST");
		}
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Pipe.prototype.onFrame = function(delta) {
		this.pos.x -= delta * SPEED;

		this.checkOutOfBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Pipe.prototype.checkOutOfBounds = function() {
		if (this.pos.x +WIDTH < 0){
			return this.reset();
		}
			
	};

	return Pipe;

})();

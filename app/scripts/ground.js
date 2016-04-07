window.Ground = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 10;
	var HEIGHT = 10;
	var INITIAL_POSITION_X = 93;
	var INITIAL_POSITION_Y = 48;

	var Ground = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 93, y: 58 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Ground.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Ground.prototype.onFrame = function(delta) {
		this.pos.x -= delta * SPEED;

		console.log(this.pos.x);
		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Ground.prototype.checkCollisionWithBounds = function() {
		console.log("------------");
		console.log(this.pos.x);
		console.log(this.game.WORLD_WIDTH);
		if (this.pos.x +WIDTH < 0)
			return this.reset();
	};

	return Ground;

})();

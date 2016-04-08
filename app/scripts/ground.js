window.Ground = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 20; // * 10 pixels per second
	var WIDTH = 10;
	var HEIGHT = 10;
	var INITIAL_POSITION_X = 103;
	var INITIAL_POSITION_Y = 48;

	var Ground = function(el, game, first, name) {
		this.el = el;
		this.name = name;
		this.game = game;
		/*this.pos = { x: 93, y: 48 };*/
		switch(this.name) {
		    case 'G1':
		        this.pos = { x: 0, y: 48 };
		        break;
			case 'G2':
		        this.pos = { x: 10, y: 48 };
		        break;
			case 'G3':
		        this.pos = { x: 20, y: 48 };
		        break;
			case 'G4':
		        this.pos = { x: 30, y: 48 };
		        break;
			case 'G5':
		        this.pos = { x: 40, y: 48 };
		        break;
			case 'G6':
		        this.pos = { x: 50, y: 48 };
		        break;
			case 'G7':
		        this.pos = { x: 60, y: 48 };
		        break;
			case 'G8':
		        this.pos = { x: 70, y: 48 };
		        break;
			case 'G9':
		        this.pos = { x: 80, y: 48 };
		        break;
			case 'G10':
		        this.pos = { x: 90, y: 48 };
		        break;
			case 'G11':
		        this.pos = { x: 100, y: 48 };
		        break;
		    case 'G12':
		        this.pos = { x: 110, y: 48 };
		        break;


		    }
		this.first = first;
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

		this.checkOutOfBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Ground.prototype.checkOutOfBounds = function() {
		if (this.pos.x +WIDTH < 0){
			return this.reset();
		}
			
	};

	return Ground;

})();

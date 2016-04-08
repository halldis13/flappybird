window.Pipe = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 20; // * 10 pixels per second
	var WIDTH = 10;
	var HEIGHT = 10;
	var INITIAL_POSITION_X = 103;
	var INITIAL_POSITION_Y = 38;

	var Pipe = function(el, game, first, name) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.first = first;
		this.name = name;
		this.mark = 0;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Pipe.prototype.reset = function(restart) {
		//If game is restarted
		if (restart === true){
			this.first = true;
		}
		//If game is restarted, pipes should wait awhile before appearing on the screen
		if (this.first === true){
			this.mark = 0;
			switch(this.name) {
		    case 'PB1':
		        this.pos.y = 38;
				this.pos.x = 123;
		        break;
		    case 'PB2':
		        this.pos.y = 38;
				this.pos.x = 163;
		        break;
		    case 'PB3':
		        this.pos.y = 38;
				this.pos.x = 203;
		        break;
		    case 'PT1':
		        this.pos.y = 0;
				this.pos.x = 123;
		        break;
		    case 'PT2':
		        this.pos.y = 0;
				this.pos.x = 163;
		        break;
		    case 'PT3':
		        this.pos.y = 0;
				this.pos.x = 203;
		        break;
			}
			this.first = false;
		}
		//Else pipes should reappear on the right whenever they go out of bounds to the left
		else if (this.first === false){
			this.pos.x = INITIAL_POSITION_X;
			this.mark = 0;
		        //default   code block
			
		}
	}

	Pipe.prototype.onFrame = function(delta) {
		this.pos.x -= delta * SPEED;
		if (this.pos.x < 31 && this.pos.x > 29 && 
			(this.name === 'PB1' || this.name === 'PB2' || this.name === 'PB3') && this.mark === 0){
			this.game.score +=1;
			console.log(this.game.score);
			this.mark = 1;
			$('div.Score').html(this.game.score);
			$('div.FinalScore').html(this.game.score);
		}
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

window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;
	var INITIAL_ROTATON = 0;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.crashsound = document.getElementById('crash');
		this.flapsound = document.getElementById('flap');
		this.score = 0;
		this.speed = SPEED;
		this.rotation = 0;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		this.score = 0;
		this.rotation = 0;
	};

	Player.prototype.onFrame = function(delta) {
		/// if space, click og tap, the player's y pos decreases and rotation decreases
		if (Controls.keys.space || Controls.keys.mouse || Controls.keys.tap){
			this.pos.y -= (delta * SPEED)*5;
			this.flapsound.play();
			if (this.rotation > 0){
				this.rotation-=10;
			}
			else if (this.rotation >= -85){
				this.rotation-=3;
			}
			this.el.find('.Player-wings').css('animation', '0.3s flap alternate infinite');
		}
		//otherwise player's y pos and rotation increase
		else{
			this.el.find('.Player-wings').css('animation', '0.3s flap alternate 0');
			
			if (this.rotation > 45){
				this.rotation+=3;
			}
			if (this.rotation <= 85){
				this.rotation+=1.5;
			}
		}
		$( ".GameCanvas" ).mousedown(function() {
  			this.pos.y -= (delta * SPEED)*4;

		});

		//otherwise it increases
		this.pos.y += delta * SPEED;

		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate('+ this.rotation + 'deg)');
	};

	Player.prototype.checkCollisionWithBounds = function() {

		if (this.pos.y < 0 || this.pos.y + HEIGHT > this.game.WORLD_HEIGHT-9.5) {
			this.crashsound.play();
			return this.game.gameover();
		}
		
	};

	return Player;

})();

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

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.crashsound = document.getElementById('crash');
		this.flapsound = document.getElementById('flap');
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.onFrame = function(delta) {
		/*commentaði út því hann á bara að breyta um y stöðu þegar ýtt er á space
		if (Controls.keys.right) {
			this.pos.x += delta * SPEED;
		}
		if (Controls.keys.left) {
			this.pos.x -= delta * SPEED;
		}
		if (Controls.keys.down) {
			this.pos.y += delta * SPEED;
		}
		if (Controls.keys.up) {
			this.pos.y -= delta * SPEED;
		}*/
		//margfalda með 5 svo hann hækki meira en hann fellur
		if (Controls.keys.space || Controls.keys.mouse || Controls.keys.tap){
			this.pos.y -= (delta * SPEED)*5;
		}

		$( ".GameCanvas" ).mousedown(function() {
  			this.pos.y -= (delta * SPEED)*4;
		});

		//test
		this.pos.y += delta * SPEED;

		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		this.flapsound.play()

		if (this.pos.y < 0 || this.pos.y + HEIGHT > this.game.WORLD_HEIGHT-9.5) {
			this.crashsound.play();
			return this.game.gameover();
		}
	};

	return Player;

})();

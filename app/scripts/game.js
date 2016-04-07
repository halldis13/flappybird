
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);

		this.pipe1 = new window.Pipe(this.el.find('.PB1'), this, true, 'PB1');
		this.pipe2 = new window.Pipe(this.el.find('.PT1'), this, true, 'PT1');
		this.pipe3 = new window.Pipe(this.el.find('.PB2'), this, true, 'PB2');
		this.pipe4 = new window.Pipe(this.el.find('.PT2'), this, true, 'PT2');
		this.pipe5 = new window.Pipe(this.el.find('.PB3'), this, true, 'PB3');
		this.pipe6 = new window.Pipe(this.el.find('.PT3'), this, true, 'PT3');
		
		this.ground = new window.Ground(this.el.find('.Ground'), this);
		this.isPlaying = false;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);

		this.pipe1.onFrame(delta);
		this.pipe2.onFrame(delta);
		this.pipe3.onFrame(delta);
		this.pipe4.onFrame(delta);
		this.pipe5.onFrame(delta);
		this.pipe6.onFrame(delta);

		this.ground.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();

		this.pipe1.reset(true);
		this.pipe2.reset(true);
		this.pipe3.reset(true);
		this.pipe4.reset(true);
		this.pipe5.reset(true);
		this.pipe6.reset(true);

		this.ground.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;

		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();



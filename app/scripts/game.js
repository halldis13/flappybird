
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.score = 0;
		this.pipeSize = 10;
		this.pipeSizeT = 10;
		this.newBSize = 10;
		this.player = new window.Player(this.el.find('.Player'), this);

		this.ground1 = new window.Ground(this.el.find('.G1'), this, true, 'G1');
		this.ground2 = new window.Ground(this.el.find('.G2'), this, true, 'G2');
		this.ground3 = new window.Ground(this.el.find('.G3'), this, true, 'G3');
		this.ground4 = new window.Ground(this.el.find('.G4'), this, true, 'G4');
		this.ground5 = new window.Ground(this.el.find('.G5'), this, true, 'G5');
		this.ground6 = new window.Ground(this.el.find('.G6'), this, true, 'G6');
		this.ground7 = new window.Ground(this.el.find('.G7'), this, true, 'G7');
		this.ground8 = new window.Ground(this.el.find('.G8'), this, true, 'G8');
		this.ground9 = new window.Ground(this.el.find('.G9'), this, true, 'G9');
		this.ground10 = new window.Ground(this.el.find('.G10'), this, true, 'G10');
		this.ground11 = new window.Ground(this.el.find('.G11'), this, true, 'G11');
		this.ground12 = new window.Ground(this.el.find('.G12'), this, true, 'G12');

		this.pipe1 = new window.Pipe(this.el.find('.PB1'), this, true, 'PB1');
		this.pipe2 = new window.Pipe(this.el.find('.PT1'), this, true, 'PT1');
		this.pipe3 = new window.Pipe(this.el.find('.PB2'), this, true, 'PB2');
		this.pipe4 = new window.Pipe(this.el.find('.PT2'), this, true, 'PT2');
		this.pipe5 = new window.Pipe(this.el.find('.PB3'), this, true, 'PB3');
		this.pipe6 = new window.Pipe(this.el.find('.PT3'), this, true, 'PT3');

		this.cloud1 = new window.Cloud(this.el.find('.D1'), this, true, 'D1');
		this.cloud2 = new window.Cloud(this.el.find('.D2'), this, true, 'D2');
		this.cloud3 = new window.Cloud(this.el.find('.D3'), this, true, 'D3');
		this.cloud4 = new window.Cloud(this.el.find('.D4'), this, true, 'D4');
		this.cloud5 = new window.Cloud(this.el.find('.D5'), this, true, 'D5');
		

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

		this.ground1.onFrame(delta);
		this.ground2.onFrame(delta);
		this.ground3.onFrame(delta);
		this.ground4.onFrame(delta);
		this.ground5.onFrame(delta);
		this.ground6.onFrame(delta);
		this.ground7.onFrame(delta);
		this.ground8.onFrame(delta);
		this.ground9.onFrame(delta);
		this.ground10.onFrame(delta);
		this.ground11.onFrame(delta);
		this.ground12.onFrame(delta);

		this.cloud1.onFrame(delta);
		this.cloud2.onFrame(delta);
		this.cloud3.onFrame(delta);
		this.cloud4.onFrame(delta);
		this.cloud5.onFrame(delta);

		this.pipe1.onFrame(delta);
		this.pipe2.onFrame(delta);
		this.pipe3.onFrame(delta);
		this.pipe4.onFrame(delta);
		this.pipe5.onFrame(delta);
		this.pipe6.onFrame(delta);



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
		this.score = 0;
		this.pipeSize = 10;
		this.pipeSizeT = 10;

		this.newBSize = 10;
		$('div.Score').html(this.score);
		$('div.FinalScore').html(this.score);
		

		/*this.cloud1.reset(true);
		this.cloud2.reset(true);
		this.cloud3.reset(true);
		this.cloud4.reset(true);
		this.cloud5.reset(true);*/

		//this.ground.reset();
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



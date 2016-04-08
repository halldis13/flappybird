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
		this.name = name;
		this.mark = 0;
		this.size = 100;
		this.crashsound = document.getElementById('crash');
	};


	/**
	 * Resets the state of the player for a new game.
	 */
	Pipe.prototype.reset = function(restart) {

		//If game is restarted, pipes should wait awhile before appearing on the screen
		if (restart){
			//reset everything
			this.size = 100;
			this.game.pipeSize = 10;
			$('.' + this.name).height(HEIGHT*10);
			$('.' + this.name).width(WIDTH*10);
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
		}
		//Else pipes should reappear on the right whenever they go out of bounds to the left
		else if (restart === false){	
			this.pos.x = INITIAL_POSITION_X;

		}
		//so scorepoint for pipe is reset
		this.mark = 0;
	}

	Pipe.prototype.onFrame = function(delta) {
		//move to the left
		this.pos.x -= delta * SPEED;

		//if flappy is above the pipe
		if (this.pos.x < 34 && this.pos.x > 19){

			//if pipe is a bottom part
			if ((this.name === 'PB1' || this.name === 'PB2' || this.name === 'PB3') && this.mark === 0){
				//set bottom pipe which is in use now
				this.game.pipeSize = this.size;

				//if flappy has gone through half the pipe, he get's a point
				if (this.pos.x < 31 && this.pos.x > 29){
					//set the score and mark this pipe so he'll only get one point for it
					this.game.score +=1;
					console.log(this.game.score);
					this.mark = 1;
					$('div.Score').html(this.game.score);
					$('div.FinalScore').html(this.game.score);

					console.log(this.game.pipeSize);
				}
				//check for collision
				this.collision(this.game.pipeY, this.game.pipeSize/10, "B");
			}
			//if pipe is a top part
			else if ((this.name === 'PT1' || this.name === 'PT2' || this.name === 'PT3') && this.mark === 0){

				//set top pipe which is in use now
				this.game.pipeSizeT = this.size;
				this.collision(this.game.pipeTY, this.game.pipeSizeT/10, "T");
			}
		}
		//checko if pipe has reach the left end	
		this.checkOutOfBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Pipe.prototype.checkOutOfBounds = function() {
		//if pipe has gone off screen
		if (this.pos.x +WIDTH < 0){
			//if it is a bottom pipe
			if (this.name === 'PB1' || this.name === 'PB2' || this.name === 'PB3'){

				//calculate the new size and y-position of the pipe when it reappears on the right side of the screen

				//randomize the size of the bottom half (min size = 0, max size = 300)
				this.size = Math.floor(Math.random() * 300) ;

				$('.' + this.name).height(this.size);

				//position of y axis is 48- size in em
				this.pos.y = 48-((this.size)/10);

				//Set the bottom half to the game so the top half can access it
				this.game.newBSize = this.size;

			}
			//If it is a top pipe	
			else{
				// the size of the top half is 300-size of the bottom half	
				$('.' + this.name).height(300-this.game.newBSize);
				this.size = 300-this.game.newBSize;
			}

			return this.reset(false);
		}

	};
	Pipe.prototype.collision = function(pos, size, part) {

		//get the y position of the bird
		var birdY = this.game.player.pos.y;

		//if checking for bottom part collision
		if (part === "B"){
			//if he collides with the pipe part, game is over
			if (birdY+5 > this.game.WORLD_HEIGHT-9.5-size){
				this.crashsound.play();
				this.first = true;
				return this.game.gameover();
			}
		
		}

		//if checking for top part collision
		if (part === "T"){
			//if he collides with the pipe part, game is over
			if (birdY < 0+size){
				this.crashsound.play();
				this.first = true;
				return this.game.gameover();
			}
		}		

	};

	return Pipe;

})();

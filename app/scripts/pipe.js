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
		this.size = 100;
		this.game.pipeSize = 100;
		this.crashsound = document.getElementById('crash');
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
			$('.' + this.name).height(HEIGHT*10);
			$('.' + this.name).width(WIDTH*10);
			switch(this.name) {
		    case 'PB1':
		        this.pos.y = 38;
				this.pos.x = 123;
				//.game.pipeSize = 100;
		        break;
		    case 'PB2':
		        this.pos.y = 38;
				this.pos.x = 163;
				//this.game.pipeSize = 100;
		        break;
		    case 'PB3':
		        this.pos.y = 38;
				this.pos.x = 203;
				//this.game.pipeSize = 100;
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
			//			
			this.pos.x = INITIAL_POSITION_X;
			this.mark = 0;
		        //default   code block
			
		}
	}

	Pipe.prototype.onFrame = function(delta) {
		this.pos.x -= delta * SPEED;
		if (this.pos.x < 36 && this.pos.x > 34 && 
			(this.name === 'PB1' || this.name === 'PB2' || this.name === 'PB3') && this.mark === 0){
			this.game.score +=1;
			this.game.pipeSize = this.size;
			this.mark = 1;
			this.game.pipeY = this.pos.y;
			$('div.Score').html(this.game.score);
			$('div.FinalScore').html(this.game.score);
			

		}
		else if (this.pos.x < 36 && this.pos.x > 34 && 
			(this.name === 'PT1' || this.name === 'PT2' || this.name === 'PT3') && this.mark === 0){
			this.mark = 1;
			this.game.pipeTY = this.pos.y;
			this.game.pipeSizeT = this.size;
			
		}
		if (this.pos.x < 34 && this.pos.x > 19){
			this.collision(this.game.pipeY, this.game.pipeSize/10, "B");
			this.collision(this.game.pipeTY, this.game.pipeSizeT/10, "T");
		}

		
		this.checkOutOfBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Pipe.prototype.checkOutOfBounds = function() {
		if (this.pos.x +WIDTH < 0){
			if (this.name === 'PB1' || this.name === 'PB2' || this.name === 'PB3'){
				//bottom pipe min 0 max 300
				/*100 - 38*
				150 - 33
				200 - 28
				250 - 23
				300 - 18
				*/
				this.size = Math.floor(Math.random() * 300) ;
				this.game.pipeSize = this.size;
				$('.' + this.name).height(this.size);

				this.pos.y = 48-((this.size)/10);

			}
			else{
				//top pipe		
				$('.' + this.name).height(300-this.game.pipeSize);
				this.size = 300-this.game.pipeSize;
				//this.pos.y = 28; //(38-10);
			}
			return this.reset();
		}

	};
	Pipe.prototype.collision = function(pos, size, part) {
		var birdY = this.game.player.pos.y;
		if (part === "B"){
			console.log("-----");
			console.log("bird: " + birdY);
			console.log("pos: " + pos);
			console.log("size: " +size);
			console.log("-----");
			if (birdY >= pos){
			this.crashsound.play();
			return this.game.gameover();
		}
		}
		

	};

	return Pipe;

})();

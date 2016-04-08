window.Cloud = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 10; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 103;
	var INITIAL_POSITION_Y = 38;

	var Cloud = function(el, game, first, name) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.first = first;
		this.name = name
		};

	/**
	 * Resets the state of the cloud.
	 			start	position 1D member	
	 	D1:   	right 	bottom		niall
	 	D2: 	left 	top 		zayne
	 	D3: 	top 	middle	 	liam
	 	D4: 	bottom 	left 		louis
	 	D5: 	corner 	topleft		harry
	 		 */
	Cloud.prototype.reset = function() {
		//clouds should wait awhile before appearing on the screen when initializing first game
		//Beginning
		if (this.first === true){
			switch(this.name) {
		    case 'D1':
		        this.pos.y = 10;
				this.pos.x = 240;
		        break;
		    case 'D2':
		        this.pos.y = 10;
				this.pos.x = 120;
		        break;
		    case 'D3':
		        this.pos.y = 120;
				this.pos.x = 30;
		        break;
		    case 'D4':
		        this.pos.y = 123;
				this.pos.x = 90;
		        break;
		    case 'D5':
		        this.pos.y = 50;
				this.pos.x = 50;
		        break;
		    default:
		        //default   code block
			}
			this.first = false;
		}
		//clouds should reappear on the right whenever they go out of bounds to the left
		//clouds stay at the same position when a game is reset
		else if (this.first === false){
			switch(this.name) {
		    case 'D1':
		        this.pos.y = 38;
				this.pos.x = 103;
		        break;
		    case 'D2':
		        this.pos.y = 10;
				this.pos.x = -100;
		        break;
		    case 'D3':
		        this.pos.y = 0;
				this.pos.x = 70;
		        break;
		    case 'D4':
		        this.pos.y = 300;
				this.pos.x = 15;
		        break;
		    case 'D5':
		        this.pos.y = -100;
				this.pos.x = -100;
		        break;
		    default:
		        //default   code block
			}
		}
	};

	Cloud.prototype.onFrame = function(delta) {
		switch(this.name) {
		    case 'D1':
		        this.pos.x -= delta * SPEED/2  ;
		        break;
		    case 'D2':
		        this.pos.x += delta * SPEED;
		        break;
		    case 'D3':
		       this.pos.y += delta * SPEED/3;
		        break;
		    case 'D4':
		        this.pos.y -= delta * SPEED;
		        break;
		    case 'D5':
		        this.pos.x += delta * SPEED/2;
		       	this.pos.y += delta * SPEED/4;
		        break;
		    default:
		        //default   code block
			}

		this.checkOutOfBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Cloud.prototype.checkOutOfBounds = function() {
		switch(this.name) {
		    case 'D1':
		       if (this.pos.x +WIDTH < 0){
					return this.reset();
				}
		        break;
		    case 'D2':
		        if (this.pos.x + WIDTH > this.game.WORLD_WIDTH){
					return this.reset();
				}
		        break;
		    case 'D3':
		        if (this.pos.y + HEIGHT > this.game.WORLD_HEIGHT){
					return this.reset();
				}
		        break;
		    case 'D4':
		        if (this.pos.y +HEIGHT < 0){
					return this.reset();
				}
		        break;
		    case 'D5':
		        if (this.pos.x + WIDTH > this.game.WORLD_WIDTH){
					return this.reset();
				}
		        if (this.pos.y + HEIGHT > this.game.WORLD_HEIGHT){
					return this.reset();
				}
		        break;
		    default:
		        //default   code block
			}
			
	};

	return Cloud;

})();
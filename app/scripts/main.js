
/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';

    var game = new window.Game($('.GameCanvas'));
    game.start();

    var song = document.getElementById('1D');
    var crash = document.getElementById('crash');
    var flap = document.getElementById('flap');
    var mute = document.getElementById('mute');

    mute.onclick = function() {
    	if(song.muted === true) {
    		song.muted = false;
    		crash.muted = false;
    		flap.muted = false;
    		mute.style.backgroundImage = ('url("/images/mute.png")');
    	}

    	else {
    		song.muted = true;
    		crash.muted = true;
    		flap.muted = true;
    		mute.style.backgroundImage = ('url("/images/unmute.png")');
    	}
    }
});

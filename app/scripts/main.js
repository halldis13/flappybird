
/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';

    var game = new window.Game($('.GameCanvas'));
    game.start();

    var song = document.getElementById('SongFile');
    var crash = document.getElementById('crash');
    var mute = document.getElementById('mute');

    mute.onclick = function() {
    	if(song.muted === true) {
    		song.muted = false;
    		crash.muted = false;
    		mute.style.backgroundImage = ('url("/images/unmute.png")');
    	}

    	else {
    		song.muted = true;
    		crash.muted = true;
    		mute.style.backgroundImage = ('url("/images/mute.png")');
    	}
    }
});

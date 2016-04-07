# HTML5 CSS-based Game

This game project has the following:

* 1024x768 pixel game canvas.
* All positions and sizes defined using a 10px em. This means that the game could be scaled up and down by changing the base font-size. This is one way to make the graphics responsive.
* A simple game loop which calculates delta and can be started and stopped.
* A player entity which can be moved around the canvas using the arrow keys.
* A "Game Over" screen when player is moved outside bounds, where the game can be restarted.

## Setup

```
npm install
bower install
grunt server
```

## TODO
* X(20%) The player character always stays in the same x position. Clicking space bar, clicking or tapping the screen makes the character jump up by a small amount, otherwise it falls down.
	* ATH, gera þannig að tapp geri það sama og space og click
* (10%) Pipes and the ground slowly move to the left.
	* Laga þannig að pipe séu með mismunandi bili
	* laga þannig að ground sé repeat
* (10%) If the player collides with the ground or a pipe, he loses instantly.
	* vantar að láta hann tapa þegar hann klessir á pípu
* (5%) Gets one point for every gap that the player successfully passes.
	* hafa counter fyrir ofan flappybird í hver sinn sem x hnit á pípu verður það sama og x hnitið hans
* (10%) If a player loses he should see his score and a button which starts the game again.
	* vantar að sjá score-ið þegar hann tapar

### Additional requirements.
* (10%) All moving elements should be hardware accelerated.
	* veit ekki hvað þetta þýðir nkl?
* (10%) There should be a background element moving in paralax to the foreground, f.ex. a repeating cloud image. Note: it is not enough that the ground moves at different speed than the rest of the scene!
	* laga þannig að það sé flottari mynd af 1D, (ekki hvítt utan um hausana)
	* breyta hraðanum á þeim svo þeir fari ekki of hratt
	* breyta þannig að þegar þeir byrji upp á nýtt séu þeir fjær í burtu svo þeir séu ekki allir á sama tíma í boxinu
* (10%) The character rotates into his direction. The player should either have a sprite animation or some element (like a wing) which animates when flapping. 
	* finna sprite og setja í staðinn fyrir kassann sem hann er núna
	* láta vængina vera flotta lika og láta þá flap-a eins og þeir gera núna 
	* í byrjun á hann að snúa áfram
	* þegar ýtt er á jump á flappy að vísa upp
	* þegar hann er búin að falla í 1 sek byrjar hann að snúa sér niður á við þangað til hann vísar alveg niður 
	* nema hann jump- i aftur þá á hann að vísa aftur upp
* (15% )Background music and sound effects for flapping and colliding. Mute support.
	* setja 8bit one direction lag (svo þetta verði eins og alvöru tölvuleikur!)
	* sound effect þegar vængirnir flap-a
	* sound effect þegar hann klessir á pípur
	* færa mute takkan neðst til hægri eða vinstri inni í leikinn (þannig það sé ofaná "moldinni")

### Bonus points.
* (10%) The game is responsive, scales down and playable on mobile and tablets.
	* tjekka hvort virki á tablets/mobiles?
	* ekki viss hvort þetta sé skalanlegt
* Other gameplay innovations are rated by the complexity of implementation.
	* strákarnir gerðu easymode/medium/hard ef við höfum tíma
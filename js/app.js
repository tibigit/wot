window.game = window.game || {};


var canvas, stage, assets, preloader;

var update = true;

var deployer, container, shitContainer;

var score = 0,
	totalCPS = 0;


function init() {

	canvas = document.getElementById("canvas");

	stage = new createjs.Stage(canvas);
	// canvas.width = window.innerWidth;
	// canvas.height = window.innerHeight;
	createjs.Touch.enable(stage);


	// enabled mouse over / out events
	stage.enableMouseOver(10);
	// keep tracking the mouse even when it leaves the canvas
	stage.mouseMoveOutside = true; 
	// a ha !
	stage.snapToPixelEnabled = true;

	createjs.Ticker.framerate = 60;

	game.assets = new game.AssetManager();

	preloadAssets();

	// manage resize
	$(window).resize(sizeAll);
	sizeAll();
}


function sizeAll() {
	var scale = Math.min( $(window).innerWidth() / 414, $(window).innerHeight() / 736 );
	console.log(scale);
	$('#game').css({ transform: "translate(-50%, -50%) " + "scale(" + scale + ")" });
}


function preloadAssets() {
	preloader = new ui.Preloader("#fff", "#fff");
	preloader.x = (stage.canvas.width/2)-preloader.width/2;
	preloader.y = (stage.canvas.height/2)-preloader.height/2;
	stage.addChild(preloader);

	game.assets.on(game.assets.ASSETS_PROGRESS, assetsProgress);
    game.assets.on(game.assets.ASSETS_COMPLETE, assetsComplete);
    game.assets.preloadAssets();
};


function assetsProgress(e) {
    preloader.update(e.target.loadProgress);
    stage.update();
}

function assetsComplete(e) {
    stage.removeChild(preloader);
    onLoadReady();
}


function onLoadReady() {

	game.worlds = new game.WorldsManager();

	var controls = new game.Controls();
	stage.addChild(controls);

	packDeployer(game.worlds.getWorld(1).evolutionsContainer);
	initScore();

	createjs.Ticker.addEventListener("tick", tick);
}




var s;
function initScore() {
	s = new game.Score();
	s.setScore(0);
	s.x = stage.canvas.width / 2;
	s.y = 17;
	stage.addChild(s);
}



function packDeployer(tgtContainer) {
	deployer = new game.Deployer(tgtContainer);
	deployer.x = 10;
	deployer.y = canvas.height - 20;

	deployer.on("newEvolution", function(e) {
		game.worlds.getWorld(1).createEvolution(e.obj.x, e.obj.y, e.obj.lvl, e.obj.cps);
	});
	deployer.on("fixZindex", function(e) {
		game.worlds.getWorld(1).fixZindex();
	});
	deployer.checkPacks();
	
	stage.addChild(deployer);
}


function tick(event) {
	// this set makes it so the stage only re-renders when an event handler indicates a change has happened.
	if (update) {
		// update = false; // only update once
		stage.update(event);
	}
}

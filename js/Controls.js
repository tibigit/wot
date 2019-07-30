(function() {
	window.game = window.game || {};

	function Controls() {
		this.initialize();
	}

	var c = Controls.prototype = new createjs.Container();
	c.Controls_initialize = c.initialize;

	c.initialize = function() {
		this.Controls_initialize();
		this.drawControls();
	}

	c.drawControls = function() {
		var topControls = new createjs.Container();
		var topControlsBg = new createjs.Bitmap(game.assets.getAsset("controlsBg"));
		topControlsBg.regX = topControlsBg.image.width/2;
		topControlsBg.regY = topControlsBg.image.height/2;
		// topControlsBg.scaleX = topControlsBg.scaleY = .53
		topControlsBg.x = canvas.width/2;
		topControlsBg.y = 20;
		topControls.addChild(topControlsBg);
		this.addChild(topControls);

		var footerControls = new createjs.Container();
		var footerControlsBg = new createjs.Bitmap(game.assets.getAsset("controlsBg"));
		footerControlsBg.regX = footerControlsBg.image.width/2;
		footerControlsBg.regY = footerControlsBg.image.height/2;
		footerControlsBg.rotation = 180;
		// footerControlsBg.scaleX = footerControlsBg.scaleY = .53
		footerControlsBg.x = canvas.width/2;
		footerControlsBg.y = stage.canvas.height - 20;
		footerControls.addChild(footerControlsBg);
		this.addChild(footerControls);
	}

	window.game.Controls = Controls;

}());
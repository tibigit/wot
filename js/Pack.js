(function () {

	window.game = window.game || {}

	var Pack  = function(img) {
		this.initialize(img);
	}

	var c = Pack.prototype = new createjs.Container();
	c.Container_initialize = c.initialize;

	c.initialize = function(img) {
		this.Container_initialize();
		this.image = img;
		this.drawPack();

		this.on("mousedown", this.dispose);
		this.intervalID = setInterval(this.jump.bind(this), 1000 + Math.random()*9000);

	}

	c.drawPack = function() {
		var visu = new createjs.Sprite(this.image, "pack");
		var bounds = visu.getBounds();
		visu.name = "Pack";
		
		this.regX = bounds.width/2;
		this.regY = bounds.height;
		this.x = canvas.width/2 + Math.random()*450 - 225;
		this.y = -100;
		this.cursor = "pointer";

		createjs.Tween.get(this)
			.to({ y: canvas.height/2 +  Math.random()*630 - 250}, 500, createjs.Ease.cubicIn)
			.call(this.fixZindex)
			.to({scaleX: 1.1, scaleY: .9}, 200, createjs.Ease.circOut)
			.to({scaleX: 1, scaleY: 1}, 150, createjs.Ease.sineOut);

		this.addChild(visu);
	}

	c.fixZindex = function() {
		this.dispatchEvent("fixZindex");
	}

	c.jump = function() {
		createjs.Tween.get(this)
			.to({scaleX: 1.1, scaleY: .9}, 200, createjs.Ease.circOut)
			.to({scaleX: 1, scaleY: 1}, 150, createjs.Ease.sineIn)
			.to({y: this.y-10}, 150, createjs.Ease.circOut)
			.to({y: this.y}, 150, createjs.Ease.sineInOut);
	}

	c.dispose = function() {
		clearInterval(this.intervalID);
		this.parent.removeChild(this);
		// createjs.Sound.play("packBreakSound");
		this.dispatchEvent("destroyed");
	}

	window.game.Pack = Pack;

}());


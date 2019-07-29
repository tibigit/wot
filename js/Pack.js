(function () {

	window.game = window.game || {}

	var Pack  = function(img) {
		this.initialize(img);
	}

	var c = Pack.prototype = new createjs.Bitmap();
	c.Shape_initialize = c.initialize;

	c.initialize = function(img) {
		this.Shape_initialize();
		this.image = img;
		this.regX = this.image.width/2;
		this.regY = this.image.height;
		this.scaleX = this.scaleY = .5;
		this.x = Math.random()*280 - 140 + canvas.width/2;
		this.y = -100;
		this.cursor = "pointer";
		createjs.Tween.get(this)
			.to({ y: 200 + Math.random()* (canvas.height - 380 ) }, 500, createjs.Ease.cubicIn)
			.call(this.fixZindex)
			.to({scaleX: .6, scaleY: .4}, 200, createjs.Ease.circOut)
			.to({scaleX: .5, scaleY: .5}, 150, createjs.Ease.sineOut);

		this.on("mousedown", this.dispose);

		this.intervalID = setInterval(this.jump.bind(this), 1000 + Math.random()*9000);
	}

	c.fixZindex = function() {
		this.dispatchEvent("fixZindex");
	}

	c.jump = function() {
		createjs.Tween.get(this)
			.to({scaleX: .6, scaleY: .4}, 200, createjs.Ease.circOut)
			.to({scaleX: .5, scaleY: .5}, 150, createjs.Ease.sineIn)
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


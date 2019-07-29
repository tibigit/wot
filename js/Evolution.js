(function() {

	window.game = window.game || {}

	var Evolution = function(level, cps) {
		this.initialize(level, cps);
	}

	var e = Evolution.prototype = new createjs.Container();
	e.Container_initialize = e.initialize;

	e.initialize = function(level, cps) {
		this.Container_initialize();
		this.level = level;
		this.cps = cps;
		this.grabbed = false;
		this.cursor = "pointer";
		this.intervalID = 0;
		this.drawEvolution(level);
		this.setListeners();
	}

	e.drawEvolution = function(level) {
		var img = game.assets.getAsset("evolution"+level);
		var visu = new createjs.Bitmap(img);
		this.regX = img.width/2;
		this.regY = img.height;

		if(level == 1) {
			this.scale = .4;
		}
		this.addChild(visu);
	}

	e.setListeners = function() {
		this.on("mousedown", function(evt) {
			this.offset = {x:this.x - evt.stageX, y:this.y - evt.stageY};
			this.grabbed = true;
			this.updateScore();
			this._fixZindex();
		});

		this.on("pressmove", function (evt) {
			this.x = evt.stageX + this.offset.x;
			this.y = evt.stageY + this.offset.y;
		});

		this.on("pressup", function(evt) {
			this.dispatchEvent("checkMerge");
			this.grabbed = false;
			this._fixZindex();
		});

		this.intervalID = setInterval(this.updateScore.bind(this), 2000);

	}

	e._fixZindex = function() {
		this.dispatchEvent("fixZindex");
	};

	e.clearListeners = function() {
		clearInterval(this.intervalID);
	}

	e.updateScore = function() {
		var ec = new game.EvolutionCoins(this.cps*2, this.x, this.y);
		var that = this;
		ec.on("complete", function() {
			that.removeChild(this);
		});

		var event = new createjs.Event("updateScore");
		event.score = this.cps*2;
		event.ec = ec;
		this.dispatchEvent(event);
	}

	window.game.Evolution = Evolution;

}());
		
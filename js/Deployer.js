(function(){

	window.game = window.game || {}

	var Deployer = function(tgt) {
		this.initialize(tgt);
	}

	var d = Deployer.prototype = new createjs.Container();
	d.width = 100;
	d.height = 10;
	d.bar;
	d.busy = false;
	d.MAX_ON_STAGE = 16;
	d.DEPLOY_INTERVAL = 2000;
	d.Container_initialize = d.initialize;

	d.initialize = function(tgt) {
		this.tgt = tgt;
		this.Container_initialize();
		this.drawDeployer();
	}

	d.drawDeployer = function () {
		var outline = new createjs.Shape();
		outline.graphics.setStrokeStyle(1);
		outline.graphics.beginStroke("#000");
		outline.graphics.drawRect(0, 0, this.width, this.height);

		this.bar = new createjs.Shape();
		this.bar.graphics.beginFill("#000");
		this.bar.graphics.drawRect(0, 0, this.width, this.height);
		this.bar.scaleX = 0;
		this.addChild(this.bar, outline);
	}

	d.checkPacks = function() {
		if(this.tgt.numChildren < this.MAX_ON_STAGE && !this.busy) {
        	var _this = this;
        	var pack = new game.Pack(game.assets.getAsset("packImg"));
			pack.on("destroyed", function() {
				var event = new createjs.Event("newEvolution");
				event.obj = {x:pack.x, y:pack.y, lvl:1, cps:0.5};
				_this.dispatchEvent(event);
				_this.checkPacks();
			});
			pack.on("fixZindex", function() {
				_this.dispatchEvent('fixZindex');
			})
			this.tgt.addChild(pack);

			this.bar.scaleX = 0;
			createjs.Tween.get(this.bar).to({ scaleX: 1 }, this.DEPLOY_INTERVAL).call(this.handleComplete.bind(this));
			this.busy = true;
		}
	}

	d.handleComplete = function() {
		this.busy = false;
		this.checkPacks();
    }

	window.game.Deployer = Deployer;

}());
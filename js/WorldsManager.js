(function() {

	window.game = window.game || {};

	var WorldsManager = function () {
		this.initialize();
	}

	var w = WorldsManager.prototype = new createjs.Container();
	w.Container_initialize = w.initialize;

	w.worlds = [];
	w.currentWorldID = 1;

	w.initialize = function() {
		this.Container_initialize();
		this.generateWorlds();
		this.initWorldSelector();
		this.setCurrentWorld(1);
		this.displacement = -1000;
	};

	w.generateWorlds = function() {
		var w1 = new game.World(game.assets.getAsset("farm"), 1);
		this.worlds.push({'id':1, 'obj':w1});
		stage.addChild(w1);

		var w2 = new game.World(game.assets.getAsset("continent"), 1);		
		this.worlds.push({'id':2, 'obj':w2});
		stage.addChild(w2);

		var w3 = new game.World(game.assets.getAsset("world"), 1);		
		this.worlds.push({'id':3, 'obj':w3});
		stage.addChild(w3);

		var w4 = new game.World(game.assets.getAsset("universe"), 1);		
		this.worlds.push({'id':4, 'obj':w4});
		stage.addChild(w4);
	}

	w.setCurrentWorld = function(id) {
		var w = this.getWorld(id) || this.getWorld(1);

		currentWorldID = id;

		this.worlds.forEach(function(el, i) {
			el.obj.alpha = 0;
			el.obj.x = this.displacement;
		});

		w.alpha = 1;
		w.scaleX = 1;
		w.scaleY = 1;

		w.x = canvas.width/2;
	}

	w.switchToWorld = function(newId) {

		if(newId > currentWorldID) {
			createjs.Tween.get(this.getWorld(currentWorldID)).to({ scaleX: 0, scaleY: 0, alpha: 0}, 500, createjs.Ease.cubicInOut).to({ x: this.displacement}, 0);
			createjs.Tween.get(this.getWorld(newId)).to({ x: canvas.width/2, scaleX: 2, scaleY: 2}, 0).wait(200).to({ scaleX: 1, scaleY: 1, alpha: 1}, 500, createjs.Ease.cubicOut);
		} else if(newId < currentWorldID) {
			createjs.Tween.get(this.getWorld(currentWorldID)).to({ scaleX: 2, scaleY: 2, alpha: 0}, 500, createjs.Ease.cubicInOut).to({ x: this.displacement}, 0);
			createjs.Tween.get(this.getWorld(newId)).to({ x: canvas.width/2, scaleX: 0, scaleY: 0}, 0).wait(200).to({ scaleX: 1, scaleY: 1, alpha: 1}, 500, createjs.Ease.cubicOut);
		}
		currentWorldID = newId;
	}

	w.initWorldSelector = function() {
		var $lvls = $('#world-selector .lvl');
		var that = this;
		$lvls.each(function(i, el) {
			$(el).on('click', function() {
				that.switchToWorld($(this).data("w"));
			});
		});
	};

	w.getWorld = function(id) {
		var world = _.find(this.worlds, function(el) {return el.id == id})
		if(world == undefined) console.log('no world with id: ' + id);
		return world.obj;
	}

	window.game.WorldsManager = WorldsManager;

}());
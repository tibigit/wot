(function() {

	window.game = window.game || {};

	var World = function(lvlBG, scaleFactor) {
		this.initialize(lvlBG, scaleFactor)
	}

	var w = World.prototype = new createjs.Container();
	w.Container_initialize = w.initialize;

	w.initialize = function(lvlBG, scaleFactor) {
		this.Container_initialize();
		this.lvlBG = lvlBG;
		this.scaleFactor = scaleFactor;
		this.regX = canvas.width/2;
		this.regY = canvas.height/2;
		this.x = canvas.width/2;
		this.y = canvas.height/2;

		this.setBG();

		this.evolutionsContainer = new createjs.Container();
		this.addChild(this.evolutionsContainer);
		
		this.shitContainer = new createjs.Container();
		this.addChild(this.shitContainer);
	}


	w.setBG = function() {
		var bgrnd = new createjs.Bitmap(this.lvlBG);
		var _w = bgrnd.image.width;
		var _h = bgrnd.image.height;
		bgrnd.regX = _w/2;
		bgrnd.regY = _h/2;
		bgrnd.x = canvas.width/2;
		bgrnd.y = canvas.height/2;

		bgrnd.scale = this.scaleFactor;

		this.addChild(bgrnd);
	}

	w.createEvolution = function(x, y, lvl, cps) {
		var _this = this;

		var ev = new game.Evolution(lvl, cps);
		ev.x = x; 
		ev.y = y;
		
		ev.on("checkMerge", function() {
			var distances = [];
			for(var i=0; i< _this.evolutionsContainer.numChildren; i++) {
				if(this != _this.evolutionsContainer.children[i] && this.level == _this.evolutionsContainer.children[i].level) {
					distances.push({obj: _this.evolutionsContainer.children[i], dist: _this.getDist(this, _this.evolutionsContainer.children[i])});
				}
			}
			distances.sort(function(obj1, obj2) {return obj1.dist - obj2.dist});

			if(distances.length > 0 && distances[0].dist < 50) {
				if(this.level+1 >= 7) {
					console.log('you have reached the maximum level');
					return;
				}

				totalCPS -= this.cps;
				totalCPS -= distances[0].obj.cps;
				this.clearListeners();
				distances[0].obj.clearListeners();
				_this.evolutionsContainer.removeChild(distances[0].obj, this);

				if(this.level+1 < 3) {
					_this.createEvolution(this.x, this.y, this.level+1, _this.getCPS(this.level, this.cps));					
				} else if(this.level+1 >= 3 && this.level+1 < 5) {
					console.log(game.worlds.getWorld(2).evolutionsContainer.numChildren);
					game.worlds.getWorld(2).createEvolution(this.x, this.y, this.level+1, _this.getCPS(this.level, this.cps));
				} else if(this.level+1 >= 5 && this.level+1 < 7) {
					game.worlds.getWorld(3).createEvolution(this.x, this.y, this.level+1, _this.getCPS(this.level, this.cps));
				}

				deployer.checkPacks();

			}
		});
		
		ev.on("updateScore", function(e) {
			score += e.score;
			s.setScore(Beautify(score));
			_this.shitContainer.addChild(e.ec);
		});
		
		ev.on("fixZindex", function() {
			_this.fixZindex();
		})


		this.evolutionsContainer.addChild(ev);
		this.fixZindex();
		totalCPS+=cps;
		s.setCPS(totalCPS);
	}


	w.fixZindex = function() {
		var grabbedElem = null;
		this.evolutionsContainer.children.sort(function(obj1, obj2) {return obj1.y - obj2.y});
		for (var i=0; i<this.evolutionsContainer.numChildren; i++) {
			this.evolutionsContainer.setChildIndex(this.evolutionsContainer.children[i], i);
			if(this.evolutionsContainer.children[i].grabbed) {
				grabbedElem = this.evolutionsContainer.children[i];
			}
		}
		if(grabbedElem != null) {
			this.evolutionsContainer.setChildIndex(grabbedElem, this.evolutionsContainer.numChildren-1);
		}
	}


	w.getCPS = function (lvl, prevCPS) {
		return 2*prevCPS+0.5*lvl;
	}

	w.getDist = function (a, b) {
		return Math.sqrt( Math.pow((a.x-b.x), 2) + Math.pow((a.y-b.y), 2) );
	}


	window.game.World = World;

}());
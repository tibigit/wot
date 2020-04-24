(function() {

	window.game = window.game || {}

	var EvolutionCoins = function(coins, x, y) {
		this.initialize(coins, x, y);
	}

	var e = EvolutionCoins.prototype = new createjs.Container();
	e.Container_initialize = e.initialize;

	e.initialize = function(coins, x, y) {
		this.Container_initialize();
		this.coins = coins;
		this.x = x + Math.random()*20 - 10;
		this.y = y - 20 + Math.random()*20 - 10;
		this.drawEvolutionCoins(coins);
	}

	e.drawEvolutionCoins = function(coins) {
		var txt = new createjs.Text("+"+coins, "bold 19px Courier new", "#fff");
		var poop = new createjs.Sprite(game.assets.getAsset("assets"), "poop-a");

		txt.textBaseline = "middle";
		txt.textAlign = "center";

		this.addChild(poop);

		this.addChild(txt);

		createjs.Tween.get(poop).wait(200)
			.to({alpha: 0 }, 700, createjs.Ease.sineOut)

		createjs.Tween.get(txt)
			.to({ y: - 40 }, 500, createjs.linear)
			.to({ y: - 70, alpha: 0 }, 700, createjs.Ease.sineOut)
			.call(this.handleComplete);
	}

	e.handleComplete = function() {
		this.dispatchEvent("complete");
	}

	window.game.EvolutionCoins = EvolutionCoins;

}());
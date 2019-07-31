(function() {

	window.game = window.game || {}

	var Score = function() {
		this.initialize();
	}

	var s = Score.prototype = new createjs.Container();
	s.Container_initialize = s.initialize;

	s.initialize = function() {
		this.Container_initialize();
		this.drawScore();
		this.drawCps();
	}

	s.drawScore = function() {
		var txt = new createjs.Text("Coins: 0", "bold 36px Courier new", "#000");
		txt.textBaseline = "middle";
		txt.textAlign = "center";
		txt.y = 10;
		this.addChild(txt);

		this.txt = txt;
	}

	s.drawCps = function() {
		var txt = new createjs.Text("0 coins/second", "bold 30px Courier new", "#000");
		txt.textBaseline = "middle";
		txt.textAlign = "center";
		txt.y = 40;
		this.addChild(txt);

		this.txtCPS = txt;
	}

	s.setScore = function(score) {
		this.txt.text = "Coins: " + score;
		document.title = this.txt.text;
	}

	s.setCPS = function(cps) {
		this.txtCPS.text = cps + " coins/second";
	}

	window.game.Score = Score;

}());
		
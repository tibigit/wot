(function() {

	window.game = window.game || {}

	var Logger = function() {
		this.initialize();
	}

	var l = Logger.prototype = new createjs.Container();
	l.Container_initialize = l.initialize;

	l.initialize = function() {
		this.Container_initialize();
		this.setupMsg();
	}

	l.setupMsg = function() {
		var txt = new createjs.Text("/debug/", "15px Verdana", "#f00");
		txt.textBaseline = "middle";
		txt.textAlign = "left";
		txt.y = 10;
		this.addChild(txt);

		this.txt = txt;
	}


	l.log = function(msg) {
		this.txt.text += "\n" + msg;
	}

	window.game.Logger = Logger;

}());
		
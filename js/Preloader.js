(function() {

	window.ui = window.ui || {};

	var Preloader = function (fill, stroke) {
		this.fillColor = fill;
		this.strokeColor = stroke;
		this.initialize();
	}
	var p = Preloader.prototype = new createjs.Container();

	p.width = 200;
	p.height = 10;
	p.bar;

	p.Container_initialize = p.initialize;

	p.initialize = function () {
		this.Container_initialize();
		this.drawPreloader();
	}

	p.drawPreloader = function () {
		var outline = new createjs.Shape();
		outline.graphics.beginStroke(this.strokeColor);
		outline.graphics.drawRoundRect(0, 0, this.width, this.height, 5, 5, 5, 5);
		this.bar = new createjs.Shape();
		this.addChild(this.bar, outline);
	}

	p.update = function (perc) {
		perc = perc > 1 ? 1 : perc;
		this.bar.graphics.clear();
		this.bar.graphics.beginFill(this.fillColor);
		this.bar.graphics.drawRoundRect(0, 0, this.width*perc, this.height, 5, 5, 5, 5);
	}

	window.ui.Preloader = Preloader;

}());
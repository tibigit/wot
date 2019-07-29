(function() {

	function ScoreEvent(type,bubbles,cancelable,score) {
		this.score = score;
		this.initialize(type,bubbles,cancelable);
	}

	var s = ScoreEvent.prototype = new createjs.Event();
	s.score = null;
	s.Event_initialize = s.initialize;

	s.initialize = function(type,bubbles,cancelable) {
		this.Event_initialize(type,bubbles,cancelable);
	}

	window.ScoreEvent = ScoreEvent;
}());
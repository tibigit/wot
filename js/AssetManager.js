(function() {

	window.game = window.game || {}

	var AssetManager = function() {
		this.initialize();
	}

	var a = AssetManager.prototype = new createjs.Container();
	
    a.Container_initialize = a.initialize;

    //events
    a.ASSETS_PROGRESS = 'assets progress';
    a.ASSETS_COMPLETE = 'assets complete';

    a.assetsPath = "img/";
    a.loadManifest = null;
    a.queue = null;
    a.loadProgress = 0;

	a.initialize = function () {
        this.Container_initialize();
        this.loadManifest = [
        	{id:"evolutions", src:this.assetsPath + "evolutions.json", "type":"spritesheet"},
        	{id:"assets", src:this.assetsPath + "assets.json", "type":"spritesheet"},

			{id:"farm", src:this.assetsPath + "backgrounds/farm.png"},
			{id:"continent", src:this.assetsPath + "backgrounds/continent.png"},
			{id:"world", src:this.assetsPath + "backgrounds/world.png"},
			{id:"universe", src:this.assetsPath + "backgrounds/universe.png"},

			{id:"controlsBg", src:this.assetsPath + "white-bg.png"}
		];
	}

	a.preloadAssets = function () {
		var progressProxy = new createjs.proxy(this.assetsProgress, this);
		var completeProxy = new createjs.proxy(this.assetsLoaded, this);

		this.queue = new createjs.LoadQueue();

		this.queue.addEventListener('complete', completeProxy);
        this.queue.addEventListener('progress', progressProxy);

        this.queue.loadManifest(this.loadManifest);

	}

	a.assetsProgress = function (e) {
        this.loadProgress = e.progress;
        var event = new createjs.Event(this.ASSETS_PROGRESS);
        this.dispatchEvent(event);
    }
    a.assetsLoaded = function (e) {
        var event = new createjs.Event(this.ASSETS_COMPLETE);
        this.dispatchEvent(event);
    }
    a.getAsset = function (asset) {
        return this.queue.getResult(asset);
    }

	window.game.AssetManager = AssetManager;

}());
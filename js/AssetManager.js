(function() {

	window.game = window.game || {}

	var AssetManager = function() {
		this.caca = "sheeit";
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
			{id:"homeBg", src:this.assetsPath + "bg-1.png"},
			{id:"lvl2Bg", src:this.assetsPath + "bg-2.png"},
			{id:"lvl3Bg", src:this.assetsPath + "bg-3.png"},
			{id:"lvl4Bg", src:this.assetsPath + "bg-4.png"},
			{id:"controlsBg", src:this.assetsPath + "white-bg.png"},
			{id:"packImg", src:this.assetsPath + "pack.png"},
			{id:"coin", src:this.assetsPath + "coin.png"},
			{id:"evolution1", src:this.assetsPath + "item-1.png"},
			{id:"evolution2", src:this.assetsPath + "item-2.png"},
			{id:"evolution3", src:this.assetsPath + "item-3.png"},
			{id:"evolution4", src:this.assetsPath + "item-4.png"},
			{id:"evolution5", src:this.assetsPath + "item-5.png"},
			{id:"evolution6", src:this.assetsPath + "item-6.png"},
			{id:"evolution7", src:this.assetsPath + "item-7.png"},
			{id:"evolution8", src:this.assetsPath + "item-8.png"},
			{id:"evolution9", src:this.assetsPath + "item-9.png"},
			{id:"evolution10", src:this.assetsPath + "item-10.png"},
			{id:"evolution11", src:this.assetsPath + "item-11.png"},
			{id:"evolution12", src:this.assetsPath + "item-12.png"},
			{id:"evolution13", src:this.assetsPath + "item-13.png"},
			{id:"evolution14", src:this.assetsPath + "item-14.png"},
			{id:"evolution15", src:this.assetsPath + "item-15.png"},
			{id:"evolution16", src:this.assetsPath + "item-16.png"},
			{id:"evolution17", src:this.assetsPath + "item-17.png"},
			{id:"evolution18", src:this.assetsPath + "item-18.png"}
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
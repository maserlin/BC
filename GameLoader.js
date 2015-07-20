console.log("GameLoader loaded");
function GameLoader(){
    PIXI.loaders.Loader.call(this);
}
GameLoader.prototype = Object.create(PIXI.loaders.Loader.prototype);
GameLoader.prototype.constructor = GameLoader;

/**
 * Remember where to call the game when ready. 
 * @param {Object} callback
 */
GameLoader.prototype.loadAssets = function(callback){
    var assets = ["assets/bgDay.jpg","assets/bgNight.jpg","assets/cupcakes.json"];
    console.log("GameLoader load:", assets);
    this.add(assets);
    this.once('complete',callback);
    this.on('progress', this.onProgress);
    this.load();
}

/**
 * Logs progress of loading to the console 
 * @param {Object} data
 */
GameLoader.prototype.onProgress = function(data){
    console.log("Loading progress:",data.progress);
}
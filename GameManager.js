console.log("GameManager loaded");
function GameManager(){
    
    this.layers = [];
    this.layers[GameManager.BACKGROUND] = new PIXI.Container();
    this.layers[GameManager.GAME] = new PIXI.Container();
    this.layers[GameManager.CONSOLE] = new PIXI.Container();
}
GameManager.BACKGROUND = "background";
GameManager.GAME = "game";
GameManager.CONSOLE = "console";
GameManager.prototype.layers = null;
GameManager.prototype.gameBackground = null;
GameManager.prototype.game = null;
GameManager.prototype.console = null;


/**
 * Add all our layers to the main stage so we can see stuff! 
 */
GameManager.prototype.onAssetsLoaded = function(){
    
    // Add our layers to the main stage
    stage.addChild(this.layers[GameManager.BACKGROUND]);    
    stage.addChild(this.layers[GameManager.GAME]);
    stage.addChild(this.layers[GameManager.CONSOLE]);
    
    // Create the things to go in the layers and add them.
    this._createBackground();
    this._createGame();
    this._createConsole();
}


/**
 * Create the actual Game: most of the code to handle paying the game goes in there! 
 */
GameManager.prototype._createGame = function(){
    this.game = new Game();
    this.layers[GameManager.GAME].addChild(this.game);
}


/**
 * Create the game background with some images. 
 * Later, we can listen out for any request by the GAME to change background. 
 */
GameManager.prototype._createBackground = function(){
    // Create a background manager with a couple of images to play with.
    this.gameBackground = new GameBackground(["assets/bgDay.jpg","assets/bgNight.jpg"]);

    // gameBackground should be able to do its own cross-fades etc because it *is*
    // a PIXI.Container: we can manage it as a single item. 
    this.layers[GameManager.BACKGROUND].addChild(this.gameBackground);
    
    // test backgrounds
    var that = this;
    setTimeout(function(){
        that.gameBackground.change(GameBackground.DAY, GameBackground.NIGHT);
    },2000);
    setTimeout(function(){
        that.gameBackground.change(GameBackground.NIGHT, GameBackground.DAY);
    },6000);
}

/**
 * Create the GameConsole and add to our list of things on the stage, so we can see it. 
 */
GameManager.prototype._createConsole = function(){
    this.console = new GameConsole();
    this.layers[GameManager.CONSOLE].addChild(this.console);
}

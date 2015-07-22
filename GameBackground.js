console.log("GameBackground loaded");
function GameBackground( bgJpgs ){
    PIXI.Container.call(this);
    this.interactive = true;
    // Create a background Sprite from each jpg image
    this.backgrounds = [];
    for( var bg in bgJpgs ){
        var bgImage = new PIXI.Sprite( PIXI.Texture.fromImage( bgJpgs[ bg ] ) );
        bgImage.anchor.x = bgImage.anchor.y = 0.5;
        this.backgrounds.push( bgImage );
    }

    // Show main bg image
    this.addChild(this.backgrounds[GameBackground.DAY]);
    
    // Define bounds
    this.getBounds = this.getBounds.bind(this);
    this.bounds = new Rectangle(this.backgrounds[GameBackground.DAY].position.x, 
                                this.backgrounds[GameBackground.DAY].position.y, 
                                this.backgrounds[GameBackground.DAY].width, 
                                this.backgrounds[GameBackground.DAY].height);
    
    // Set resizing function and listen for changes to window size
    this.resize = this.resize.bind(this);
    Events.Dispatcher.addEventListener(Event.RESIZE, this.resize);
    
    // Set functions to handle changing the background for when we have more than one.
    this.change = this.change.bind(this);
    this._swap = this._swap.bind(this);
    
}
GameBackground.prototype = Object.create(PIXI.Container.prototype);
GameBackground.prototype.constructor = GameBackground;
GameBackground.DAY = 0;
GameBackground.NIGHT = 1;
GameBackground.prototype.swapSpeed = 0.01;

/**
 * 
 * @param {Object} event: "RESIZE", event.data.size (Point), event.data.scale (Point)
 */
GameBackground.prototype.resize = function(event){
    var size = getWindowBounds()
    this.position.x = event.data.size.x/2;
    this.position.y = event.data.size.y/2;
}

/**
 * Call from Game to change from one background to another 
 * @param {Object} from : index 
 * @param {Object} to  : index 
 */
GameBackground.prototype.change = function(from, to){
    this.from = from;
    this.to = to;
    
    // Check we have a background to change to!
    if(to < this.backgrounds.length){
        this.backgrounds[this.to].alpha  = 0;
        this.addChild(this.backgrounds[this.to]);
        globalTicker.add(this._swap);
    }
}

/**
 * Called internally to swap the backgrounds. 
 */
GameBackground.prototype._swap = function(){
    this.backgrounds[this.from].alpha -= this.swapSpeed;
    this.backgrounds[this.to].alpha += this.swapSpeed;
    
    if(this.backgrounds[this.to].alpha >= 1){
        this.backgrounds[this.from].alpha = 0;
        this.backgrounds[this.to].alpha = 1;
        this.removeChild(this.backgrounds[this.from]);
        globalTicker.remove(this._swap);
    }
}

GameBackground.prototype.getBounds = function(){
    return this.bounds;
}

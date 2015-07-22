console.log("Character loaded");
function CharacterMC(name, images, x, y){
    this.name = name;
    var textures = [];
    for(var i in images){
        textures.push(new PIXI.Texture.fromFrame(images[i]+".png"));
    }
    PIXI.extras.MovieClip.call(this, textures);
    this.gotoAndStop(0);
    this.anchor = new Point(0.5, 0.5);
    this.position = new Point(x,y);
    this.interactive = true;

    this.resize = this.resize.bind(this);
    Events.Dispatcher.addEventListener(Event.RESIZE, this.resize);

  this._fadeOut = this._fadeOut.bind(this);
  this._fadeIn = this._fadeIn.bind(this);
}
CharacterMC.prototype = Object.create(PIXI.extras.MovieClip.prototype);
CharacterMC.prototype.constructor = CharacterMC;
CharacterMC.prototype.curImg = 0;
CharacterMC.prototype.swapSpeed = 0.01;

/**
 * Called internally to swap the backgrounds.
 */
CharacterMC.prototype._fadeOut = function(){
    this.alpha -= this.swapSpeed;

    if(this.alpha <= 0){
        this.alpha = 0;
        globalTicker.remove(this._fadeOut);
        this.gotoAndStop(this.curImg);
      globalTicker.add(this._fadeIn);
    }
}
CharacterMC.prototype._fadeIn = function(){


    if(this.alpha + this.swapSpeed*4 < 1){
      this.alpha += this.swapSpeed*4;
    }
    else{
      this.alpha = 1;
      globalTicker.remove(this._fadeIn);
    }
}

CharacterMC.prototype.click = function(event){
  console.log("click");
  Events.Dispatcher.dispatchEvent(new Event(Event.CHANGE_BACKGROUND));
  this.curImg = 1-this.curImg;
  globalTicker.add(this._fadeOut);
}
CharacterMC.prototype.mousedown = function(event){
  console.log("click s");
}

CharacterMC.prototype.resize = function(event){
//    this.position.x = event.data.size.x/2;
}

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
    this.on("click",function(){
      Events.Dispatcher.dispatchEvent(new Event("CLICK"));
    })

    this.resize = this.resize.bind(this);
    Events.Dispatcher.addEventListener(Event.RESIZE, this.resize);
}
CharacterMC.prototype = Object.create(PIXI.extras.MovieClip.prototype);
CharacterMC.prototype.constructor = CharacterMC;

CharacterMC.prototype.resize = function(event){
//    this.position.x = event.data.size.x/2;
}

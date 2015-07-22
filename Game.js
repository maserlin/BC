console.log("Game loaded");
function Game(background){
    PIXI.Container.call(this);
   //this.anchor = new Point(0.5,0.5);

   this.background = background;

   var c1 = new Cupcake(1,"cupcakes", 200, 520);
   this.addChild(c1);

   c1 = new Cupcake(2,"cupcakes", 900, 520);
   this.addChild(c1);

   c1 = new CharacterMC("SunMoon", ["sun","moon"], 600, 100);
   this.addChild(c1);

   c1 = new Carousel(30,30);
   this.addChild(c1);
   c1.drawEllipse();


    this.resize = this.resize.bind(this);
    Events.Dispatcher.addEventListener(Event.RESIZE, this.resize);

    // stage.interactive = true;
    // this.onMouseDown = this.onMouseDown.bind(this);
    // stage.on('mousedown', this.onMouseDown);
    // this.onMouseMove = this.onMouseMove.bind(this);
    // stage.on('mousemove', this.onMouseMove);
    // this.onMouseOut = this.onMouseOut.bind(this);
    // stage.on('mouseout', this.onMouseOut);
    // this.onMouseUp = this.onMouseUp.bind(this);
    // stage.on('mouseup', this.onMouseUp);

}
Game.prototype = Object.create(PIXI.Container.prototype);
Game.prototype.constructor = Game;


// Game.prototype.onMouseDown = function(event){
//     console.log("onMouseDown",event.data.global);
//     this.startPoint = new Point(event.data.global.x,event.data.global.y);
// }
// Game.prototype.onMouseMove = function(event){
//     //console.log("onMouseMove",event.data.global);
// }
// Game.prototype.onMouseOut = function(event){
//     console.log("onMouseOut",event.data.global);
// }
// Game.prototype.onMouseUp = function(event){
//     console.log("onMouseUp",event.data.global);
//     this.endPoint = new Point(event.data.global.x,event.data.global.y);
//     this.distX = Math.abs(this.startPoint.x-this.endPoint.x);
//     this.distY = Math.abs(this.startPoint.y-this.endPoint.y);
//     console.log("Distance x,y",this.distX,this.distY)
// }

/**
 * Pin 0,0 or this container to topleft of background
 * @param {Object} event
 */
Game.prototype.resize = function(event){
    var data = event.data;
    var topleft = new Point(this.background.position.x,this.background.position.y);
    topleft.x -= this.background.width/2;
    topleft.y -= this.background.height/2;
    this.position = topleft;
}

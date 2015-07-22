function Carousel(x,y){
  PIXI.Container.call(this);
  this.position = new Point(x,y);

  this.cupcakes = [new Cupcake(1,"cupcakes",0,0),new Cupcake(2,"cupcakes",0,0),new Cupcake(3,"cupcakes",0,0),new Cupcake(4,"cupcakes",0,0),new Cupcake(5,"cupcakes",0,0)];

  this.sw = 0;
  this.animate = this.animate.bind(this);
  this.drawEllipse = this.drawEllipse.bind(this);
}
Carousel.prototype = Object.create(PIXI.Container.prototype);
Carousel.prototype.constructor = Carousel;
Carousel.prototype.eWidth = 150;
Carousel.prototype.eHeight = 90;


Carousel.prototype.drawEllipse = function(){

  // Path to show where we should travel
  var gfx = new PIXI.Graphics();
  gfx.lineStyle(2, 0x0000ff);
  gfx.drawEllipse(this.position.x+this.eWidth, this.position.y+this.eHeight, this.eWidth, this.eHeight);
  this.addChild(gfx);

  // Control point to animate around path
  this.circle = new PIXI.Graphics();
  this.circle.lineStyle(4, 0xff0000);
  this.circle.beginFill(0xff0000);
  this.circle.drawCircle(0,0,6);
  this.addChild(this.circle);

  // Track elapsed time over life of animation
  this.elapsedTime = 0;
  // overall size of motion, somehow
  this.gridSize = 90;
  // Elliptical-ness
  this.stretchFactor = 1.68;
  //
  this.start = null
  this.duration = 4;

  this.path = [];

  this.run = this.run.bind(this);
  Events.Dispatcher.addEventListener("CLICK",this.run);

  globalTicker.add(this.animate);
}

Carousel.prototype.run = function(){

}


Carousel.prototype.animate = function(data){
  this.elapsedTime += data;

  // Adjust overall position
  var xoff = 30;
  var yoff = 30;

  // Limits of movement
  var maxX = this.eWidth*2;
  var maxY = this.eHeight*2;

  var progress, x, y, y2;

  if(this.start === null) {
    this.start = this.elapsedTime;
    this.path = [];
  }

  var speed = 50;
  progress = (this.elapsedTime - this.start) / this.duration / speed;

  var x = this.stretchFactor * Math.sin(progress * 2 * Math.PI);
  var y = Math.cos(progress * 2 * Math.PI);

  this.circle.position.x = maxX/2 + (this.gridSize * x) + xoff;
  this.circle.position.y = maxY/2 + (this.gridSize * y) + yoff;
  //this.path.push(new Point(this.circle.position.x,this.circle.position.y));

  if(progress >= 1){
    this.start = null; // reset to this.start time
    // globalTicker.remove(this.animate);
    // console.log(this.path.length);
    // for(p in this.path)console.log(this.path[p].x,this.path[p].y);
  }
}

console.log("cupcake loaded");

function Cupcake(id, imagename, x, y){
    var textures = [];

    for(var i=0; i<10; ++i)textures.push(PIXI.Texture.fromFrame(imagename + (i+1) + ".png"));
    for(var i=0; i<10; ++i)textures.push(PIXI.Texture.fromFrame(imagename + (i+1) + "b.png"));
    PIXI.extras.MovieClip.call(this, textures);

    this.id = id-1;
    this.anchor = new Point(0.5, 0.5);
    this.position = new Point(x,y);

    this.gotoAndStop(this.id);

    this.interactive = true;


    this.click = this.click.bind(this);

};

Cupcake.prototype = Object.create(PIXI.extras.MovieClip.prototype);
Cupcake.prototype.contructor = Cupcake;
Cupcake.prototype.blur = 0;

Cupcake.prototype.click = function(event){
    console.log("Click cupcake",this.id,event.data.global);
    this.id  = this.id < 9 ? this.id+1 : 0;
    console.log("cupcake new id",this.id);
    this.gotoAndStop(this.id+this.blur);
}

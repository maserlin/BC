console.log("Game loaded");
function Game(){
    PIXI.Container.call(this);


}
Game.prototype = Object.create(PIXI.Container.prototype);
Game.prototype.constructor = Game;

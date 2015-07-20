console.log("GameConsole loaded");
function GameConsole(){
    PIXI.Container.call(this);
}
GameConsole.prototype = Object.create(PIXI.Container.prototype);
GameConsole.prototype.constructor = GameConsole;

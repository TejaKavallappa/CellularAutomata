var Board = require('./board.js');

var Game = function(){
  this.board = new Board();
  this.colony = [];
};

Game.prototype.draw = function(ctx, cellCoord, cellSize){
  // Temporary function to fill a particular cell with color
  ctx.fillStyle = "green";
  ctx.fillRect(cellCoord[0]+1, cellCoord[1]+1, cellSize-2, cellSize-2);
  this.colony.push(cellCoord);
  console.log(this.colony);
};
Game.prototype.isOver = function(){
  return this.board.isOver();//When no colonies remain alive
};


Game.prototype.run = function(){};
Game.prototype.pause = function(){};
Game.prototype.step = function(){};

module.exports = Game;
window.Game = Game;

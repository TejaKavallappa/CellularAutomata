var Board = require('./board.js');

var Game = function(ctx, cellSize){
  this.board = new Board(26, ctx, cellSize);
  this.colony = [];
  this.ctx = ctx;
};
Game.DIM_X = 520;
Game.DIM_Y = 520;

Game.prototype.drawColony = function(ctx, cellCoord, cellSize){
  // Temporary function to fill a particular cell with color
  ctx.fillStyle = "green";
  ctx.fillRect(cellCoord[0]+1, cellCoord[1]+1, cellSize-2, cellSize-2);
  this.board.buildColony(cellCoord[0]/ cellSize, cellCoord[1]/ cellSize);
};

Game.prototype.isOver = function(){
  return this.board.isOver();//When no colonies remain alive
};

Game.prototype.reset = function(){
  this.board.status = "paused";
  this.board.reset();
};
Game.prototype.run = function(){};
Game.prototype.pause = function(){};

Game.prototype.step = function(){
  if (this.board.status === 'running'){
    this.board.step();
  }
};

module.exports = Game;
window.Game = Game;

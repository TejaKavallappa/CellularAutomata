var Board = require('./board.js');

var Game = function(){
  this.board = new Board();
};

Game.prototype.isOver = function(){
  return this.board.isOver();//When no colonies remain alive
};

Game.prototype.run = function(){};
Game.prototype.pause = function(){};
Game.prototype.step = function(){};
Game.prototype.draw = function(){};

module.exports = Game;

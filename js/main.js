var Game = require("./game");
var MenuBar = require("./menuBar");
var Board = require("./board");
var Colony = require("./colony");

document.addEventListener("DOMContentLoaded", function(){
  var canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  var cellSize = 20;
  var ctx = canvasEl.getContext("2d");
  var board = new Board(26, ctx, cellSize);
  var game = new Game(ctx, cellSize, board);
  var menu = new MenuBar(game, canvasEl, cellSize, ctx);
  var colony = new Colony(canvasEl, cellSize, game);
  game.start();
});

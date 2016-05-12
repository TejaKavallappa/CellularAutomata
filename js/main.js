var Game = require("./game");
var MenuBar = require("./menuBar");
var Board = require("./board");

document.addEventListener("DOMContentLoaded", function(){
  var canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  var cellSize = 20;
  var ctx = canvasEl.getContext("2d");
  var game = new Game(ctx, cellSize);
  var menu = new MenuBar(game, canvasEl, cellSize, ctx);
  var board = new Board(26, ctx, cellSize);
  board.start();
});

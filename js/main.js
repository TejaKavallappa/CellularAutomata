var Game = require("./game");
var GameView = require("./gameView");
var MenuBar = require("./menuBar");

document.addEventListener("DOMContentLoaded", function(){
  var canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = GameView.DIM_X;
  canvasEl.height = GameView.DIM_Y;

  var cellSize = 20;
  var ctx = canvasEl.getContext("2d");
  var game = new Game(ctx, cellSize);
  var menu = new MenuBar(game);
  var gv = new GameView(game, ctx, canvasEl, cellSize);
  gv.start();
});

var Game = require("./game");
var GameView = require("./gameView");

document.addEventListener("DOMContentLoaded", function(){
  var canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = GameView.DIM_X;
  canvasEl.height = GameView.DIM_Y;

  var ctx = canvasEl.getContext("2d");
  var game = new Game();
  // new GameView(game, ctx).start();
  var gv = new GameView(game,ctx, canvasEl);
  gv.start();
  
});

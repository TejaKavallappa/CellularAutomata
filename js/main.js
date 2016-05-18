var Game = require("./game");
var MenuBar = require("./menuBar");
var Board = require("./board");
var Colony = require("./colony");

document.addEventListener("DOMContentLoaded", function(){
  var canvasEl = document.getElementsByTagName("canvas")[0];
  window.WIDTH = 980;
  window.HEIGHT = 520;
  canvasEl.width = window.WIDTH;
  canvasEl.height = window.HEIGHT;
  var cellSize = 20;
  var ctx = canvasEl.getContext("2d");

  var board = new Board([canvasEl.width/ cellSize, canvasEl.height/ cellSize],
     ctx, cellSize);
  var game = new Game(ctx, cellSize, board);
  var menu = new MenuBar(game, canvasEl, cellSize, ctx);
  var colony = new Colony(canvasEl, cellSize, game);
  game.start();
});

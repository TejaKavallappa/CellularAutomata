/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(3);
	
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(2);
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Board = function(){};
	module.exports = Board;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var GameView = function (game, ctx, canvasEl) {
	  this.canvas = canvasEl;
	  this.ctx = ctx;
	  this.game = game;
	  this.cellSize = 40;
	  this.horCells = GameView.DIM_X/ this.cellSize;
	  this.verCells = GameView.DIM_Y/ this.cellSize;
	};
	
	GameView.DIM_X = 520;
	GameView.DIM_Y = 520;
	
	GameView.prototype.bindListener = function(){
	  this.canvas.addEventListener('click', this.handleClick.bind(this));
	};
	
	GameView.prototype.handleClick = function(e){
	  // Get the canvas coordinates
	  var canvasDim = this.canvas.getBoundingClientRect();
	  //Distance from left of canvas
	  var xCellNum = Math.floor((e.pageX - canvasDim.left)/ this.cellSize);
	  //Distance from top of canvas
	  var yCellNum = Math.floor((e.pageY - canvasDim.top)/ this.cellSize);
	  console.log(xCellNum, yCellNum);
	};
	
	GameView.prototype.draw = function(){
	  this.ctx.clearRect(0, 0, GameView.DIM_X, GameView.DIM_Y);
	  this.ctx.fillStyle = 'grey';
	  this.ctx.fillRect(0, 0, GameView.DIM_X, GameView.DIM_Y);
	};
	
	GameView.prototype.drawGridLines = function(lineOptions) {
	  // Draw the grid
	  //padding around grid
	  var bw = GameView.DIM_X;
	  var bh = GameView.DIM_Y;
	  //size of canvas
	  var cw = bw + 1;
	  var ch = bh + 1;
	
	  // Vertical lines
	  this.ctx.strokeStyle = "black";
	  this.ctx.lineWidth = 1.3;
	  for (var x = 0; x <= bw; x += this.cellSize) {
	      this.ctx.moveTo(x, 0);
	      this.ctx.lineTo(x, bh);
	      this.ctx.stroke();
	  }
	 // Horizontal lines
	  for (x = 0; x <= bh; x += this.cellSize) {
	      this.ctx.moveTo(0, x);
	      this.ctx.lineTo(bw, x);
	      this.ctx.stroke();
	  }
	  return;
	};
	
	
	GameView.prototype.start = function () {
	  this.lastTime = 0;
	  this.draw();
	  this.drawGridLines({lineSpacing: 40});
	  //start the animation
	  // requestAnimationFrame(this.animate.bind(this));
	};
	
	GameView.prototype.animate = function(time){
	  var timeDelta = time - this.lastTime;
	  this.drawGridLines({color: "red"});
	
	  // this.game.step(timeDelta);
	  // this.game.draw(this.ctx);
	  this.lastTime = time;
	
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	module.exports = GameView;
	window.GameView = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
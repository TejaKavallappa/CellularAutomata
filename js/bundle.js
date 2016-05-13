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
	var MenuBar = __webpack_require__(4);
	var Board = __webpack_require__(2);
	var Colony = __webpack_require__(5);
	
	document.addEventListener("DOMContentLoaded", function(){
	  var canvasEl = document.getElementsByTagName("canvas")[0];
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  var cellSize = 20;
	  var ctx = canvasEl.getContext("2d");
	  var game = new Game(ctx, cellSize);
	  var menu = new MenuBar(game, canvasEl, cellSize, ctx);
	  var board = new Board(26, ctx, cellSize);
	  var colony = new Colony(canvasEl, cellSize, game);
	  board.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(2);
	
	var Game = function(ctx, cellSize){
	  this.board = new Board(26, ctx, cellSize);
	  this.colony = [];
	  this.ctx = ctx;
	  this.cellSize = cellSize;
	};
	Game.DIM_X = 520;
	Game.DIM_Y = 520;
	
	Game.prototype.draw = function(){
	  this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  this.ctx.fillStyle = 'grey';
	  this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	};
	
	Game.prototype.drawGridLines = function() {
	  // Draw the grid
	  var bw = Game.DIM_X;
	  var bh = Game.DIM_Y;
	  //size of canvas
	  var cw = bw + 1;
	  var ch = bh + 1;
	  // Vertical lines
	  this.ctx.strokeStyle = "black";
	  this.ctx.lineWidth = 1;
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
	
	Game.prototype.start = function () {
	  this.draw();
	  this.drawGridLines();
	};
	
	
	Game.prototype.drawColony = function(cellCoord){
	  var ctx = this.ctx;
	  var cellSize = this.cellSize;
	  // Temporary function to fill a particular cell with color
	  ctx.fillStyle = "green";
	  ctx.fillRect(cellCoord[0]+1, cellCoord[1]+1, cellSize-2, cellSize-2);
	  // Swap out the hor and vertical coordinates here becuase hor => columns
	  this.board.buildColony(cellCoord[1]/ cellSize, cellCoord[0]/ cellSize);
	};
	
	Game.prototype.pause = function(){};
	
	Game.prototype.step = function(){
	    this.board.step();
	};
	
	module.exports = Game;
	window.Game = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Cell = __webpack_require__(3);
	var Board = function(numCells, ctx, cellSize){
	  // this.colony = [];
	  this.numCells = numCells;
	  this.ctx = ctx;
	  this.cellSize = cellSize;
	  this.generation = 0;
	  this.grid = this.populate();
	};
	
	Board.DIM_X = 520;
	Board.DIM_Y = 520;
	
	Board.prototype.populate = function(){
	  var grid = [];
	  for(var i = 0; i < this.numCells; i++){
	    grid.push([]);
	    for(var j = 0; j < this.numCells; j++){
	    grid[i].push(null);
	    }
	  }
	  return grid;
	};
	
	Board.prototype.buildColony = function(x, y){
	  // this.colony.push([x,y]);
	  if(x < this.numCells && y < this.numCells){
	    this.grid[x][y] = 1;
	  }
	};
	
	Board.NEIGHBORS = [
	  [0,-1],[0,1],
	  [1,0],[-1,0],
	  [-1,-1],[-1,1],
	  [1,-1],[1,1]];
	
	Board.prototype.step = function(){
	  this.newGrid = this.populate();
	  this.newCells = [];
	  for(var i = 0; i < this.numCells; i++){
	    for(var j = 0; j < this.numCells; j++){
	      var aliveNeighbors = 0;
	
	      for(var k = 0; k < Board.NEIGHBORS.length; k++){
	        var delta = Board.NEIGHBORS[k];
	        var gridVal =
	          this.grid[i+delta[0]] ? this.grid[i+delta[0]][j+delta[1]] || 0 : 0;
	        aliveNeighbors += gridVal;
	      }
	        //If cell is alive, it dies if aliveNeighbors > 4 || aliveNeighbors < 1
	        // else it lives;
	        if (this.grid[i][j] === 1){
	          if (aliveNeighbors >= 4 || aliveNeighbors <= 1){
	            this.newGrid[i][j] = null;
	            this.newCells.push(new Cell([i,j],'dead'));
	          }
	          else{
	            this.newGrid[i][j] = this.grid[i][j];
	          }
	        }
	        // If cell is dead and it has aliveNeighbors == 3, it becomes alive
	        else if (!this.grid[i][j] && aliveNeighbors === 3){
	          this.newGrid[i][j] = 1;
	          this.newCells.push(new Cell([i,j],'alive'));
	        }
	        else{
	          this.newGrid[i][j] = this.grid[i][j];
	         }
	    }//for j
	  }//for i
	  this.grid = this.newGrid;
	  this.generation += 1;
	  // this.draw();
	  this.updateGrid(this.newCells);
	};//step
	
	Board.prototype.updateGrid = function(){
	  // Iterate through new cells and only update the colours of those cells
	  var sz = this.cellSize;
	  for(var i = 0; i < this.newCells.length; i++){
	    var cell = this.newCells[i];
	    this.ctx.fillStyle = (cell.state === 'alive') ? 'yellow' : 'grey';
	    this.ctx.fillRect(cell.y*sz, cell.x*sz, sz-1, sz-1);
	  }
	};
	
	Board.prototype.draw = function(){
	  var sz = this.cellSize;
	  // Clear up the board
	  this.ctx.clearRect(0, 0, Board.DIM_X, Board.DIM_Y);
	  this.ctx.fillStyle = 'grey';
	  this.ctx.fillRect(0, 0, Board.DIM_X, Board.DIM_Y);
	  // Redraw the board
	  var self = this;
	  this.ctx.fillStyle = "yellow";
	  for(var i = 0; i < this.grid.length; i++){
	    var row = this.grid[i];
	    for(var j = 0; j < row.length; j++){
	      if(this.grid[i][j] === 1){
	        this.ctx.fillRect(j*sz, i*sz, sz-1, sz-1);
	      }
	    }
	  }
	this.drawGridLines();
	};
	
	Board.prototype.drawGridLines = function() {
	  // Draw the grid
	  //padding around grid
	  var bw = Board.DIM_X;
	  var bh = Board.DIM_Y;
	  //size of canvas
	  var cw = bw + 1;
	  var ch = bh + 1;
	  // Vertical lines
	  this.ctx.strokeStyle = "black";
	  this.ctx.lineWidth = 1;
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
	 Board.prototype.start = function () {
	  this.draw();
	  this.drawGridLines();
	};
	module.exports = Board;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Cell = function(location, state){
	  this.x = location[0];
	  this.y = location[1];
	  this.state = state;
	};
	
	module.exports = Cell;


/***/ },
/* 4 */
/***/ function(module, exports) {

	
	var MenuBar = function(game, canvasEl, cellSize, ctx){
	  this.game = game;
	  this.canvas = canvasEl;
	  this.cellSize = cellSize;
	  this.ctx = ctx;
	  this.getButtonRefs();
	  this.addButtonListeners();
	};
	MenuBar.prototype.getButtonRefs = function(){
	  this.startGOL = document.getElementById('start-button');
	  this.stopGOL = document.getElementById('stop-button');
	  this.resetGOL = document.getElementById('reset-button');
	  this.stepGOL = document.getElementById('step-button');
	};
	
	MenuBar.prototype.addButtonListeners = function(){
	  this.canvas.addEventListener('click', this.handleClick.bind(this));
	  this.startGOL.addEventListener('click', this.startGame.bind(this));
	  this.stopGOL.addEventListener('click', this.stopGame.bind(this));
	  this.resetGOL.addEventListener('click', this.resetGame.bind(this));
	  this.stepGOL.addEventListener('click', this.stepGame.bind(this));
	};
	
	MenuBar.prototype.startGame = function(){
	    this.gameRun = setInterval(this.game.step.bind(this.game), 300);
	};
	MenuBar.prototype.stopGame = function(){
	  clearInterval(this.gameRun);
	};
	
	MenuBar.prototype.resetGame = function(){
	  if (this.gameRun){
	    clearInterval(this.gameRun);
	  }
	  document.location.reload(true);
	};
	
	MenuBar.prototype.stepGame = function(){
	  this.game.step();
	};
	MenuBar.prototype.handleClick = function(e){
	  // Get the canvas coordinates
	  var canvasDim = this.canvas.getBoundingClientRect();
	  //Distance from left of canvas
	  var horCellNum = Math.floor((e.clientX - canvasDim.left)/ this.cellSize);
	  //Distance from top of canvas
	  var verCellNum = Math.floor((e.clientY - canvasDim.top)/ this.cellSize);
	
	  var cellCoord = [horCellNum* this.cellSize, verCellNum * this.cellSize];
	  this.game.drawColony(cellCoord);
	};
	module.exports = MenuBar;


/***/ },
/* 5 */
/***/ function(module, exports) {

	var Colony = function(canvasEl, cellSize, game){
	  this.blinker = [[0, 1, 0], [0, 1, 0], [0, 1, 0]];
	  this.toad_blinker = [[0, 1, 1, 1],[1, 1, 1, 0]];
	
	  this.getButtonRefs();
	  this.addButtonListeners();
	  this.canvas = canvasEl;
	  this.cellSize = cellSize;
	  this.game = game;
	};
	
	Colony.prototype.getButtonRefs = function(){
	  this.osc = document.getElementById("osc");
	  this.toad = document.getElementById("toad");
	  this.trg = document.getElementById("can-div");
	};
	
	Colony.prototype.addButtonListeners = function(){
	  this.osc.addEventListener('dragstart',
	    this.dragstart_handler.bind(this));
	  this.toad.addEventListener('dragstart',
	    this.dragstart_handler.bind(this));
	
	  this.trg.addEventListener('dragover', this.dragover_handler.bind(this));
	  this.trg.addEventListener('dragenter', this.dragover_handler.bind(this));
	  this.trg.addEventListener('drop', this.ondrop_handler.bind(this));
	
	  this.toad.addEventListener('dragover', this.dragover_handler.bind(this));
	  this.toad.addEventListener('dragenter', this.dragover_handler.bind(this));
	  this.toad.addEventListener('drop', this.ondrop_handler.bind(this));
	};
	
	Colony.prototype.dragstart_handler = function(ev) {
	 ev.dataTransfer.setData("val", ev.target.id);
	};
	
	
	Colony.prototype.ondrop_handler = function(ev) {
	  var canvasDim = this.canvas.getBoundingClientRect();
	
	  var horCellNum = Math.floor((ev.pageX - canvasDim.left)/ this.cellSize);
	  var verCellNum = Math.floor((ev.pageY - canvasDim.top)/ this.cellSize);
	
	  var cellCoord = [horCellNum* this.cellSize, verCellNum * this.cellSize];
	
	 ev.preventDefault();
	 var data = ev.dataTransfer.getData("val");
	 this.drawPattern(data, cellCoord, canvasDim);
	};
	
	Colony.prototype.drawPattern = function(patternId, cellCoord, canvasDim){
	  var data;
	  switch(patternId){
	    case "osc":
	      data = this.blinker;
	      break;
	    case "toad":
	      data = this.toad_blinker;
	      break;
	  }
	  var x = cellCoord[0];
	  var y = cellCoord[1];
	  for(var i = 0; i < data.length; i++){
	    x = cellCoord[0];
	    for(var j = 0; j < data[i].length; j++){
	      if (data[i][j] && x >= 0 && x <= canvasDim.height && y >= 0 && y <= canvasDim.width){
	        this.game.drawColony([x,y]);
	      }
	      x += this.cellSize;
	    }
	    y += this.cellSize;
	  }
	};
	Colony.prototype.dragover_handler = function(ev){
	  ev.preventDefault();
	};
	
	module.exports = Colony;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
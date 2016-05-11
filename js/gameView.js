var GameView = function (game, ctx, canvasEl, cellSize) {
  this.canvas = canvasEl;
  this.ctx = ctx;
  this.game = game;
  this.cellSize = cellSize;
  this.horCells = GameView.DIM_X/ this.cellSize;
  this.verCells = GameView.DIM_Y/ this.cellSize;
  this.bindListener();
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
  var cellCoord = [xCellNum* this.cellSize, yCellNum * this.cellSize];

  this.game.drawColony(this.ctx, cellCoord ,this.cellSize);
};

GameView.prototype.draw = function(){
  this.ctx.clearRect(0, 0, GameView.DIM_X, GameView.DIM_Y);
  this.ctx.fillStyle = 'grey';
  this.ctx.fillRect(0, 0, GameView.DIM_X, GameView.DIM_Y);
};

GameView.prototype.drawGridLines = function() {
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
  this.draw();
  this.drawGridLines();
};

module.exports = GameView;
window.GameView = GameView;

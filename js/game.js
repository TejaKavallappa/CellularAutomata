var Game = function(ctx, cellSize, board){
  this.board = board;
  this.colony = [];
  this.ctx = ctx;
  this.cellSize = cellSize;
  Game.DIM_X = window.WIDTH;
  Game.DIM_Y = window.HEIGHT;
};

Game.prototype.start = function () {
  this.draw();
  this.drawGridLines();
};

Game.prototype.draw = function(){
  this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.ctx.fillStyle = 'grey';
  this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
};

Game.prototype.drawGridLines = function() {
  // Draw the grid
  var bw = Game.DIM_X;
  var bh = Game.DIM_Y;

  // Vertical lines
  this.ctx.strokeStyle = "darkgrey";
  this.ctx.lineWidth = 1;
  for (var x = 0; x <= Game.DIM_X; x += this.cellSize) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, bh);
      this.ctx.stroke();
  }
 // Horizontal lines
  for (x = 0; x <= Game.DIM_Y; x += this.cellSize) {
      this.ctx.moveTo(0, x);
      this.ctx.lineTo(bw, x);
      this.ctx.stroke();
  }
  return;
};

Game.prototype.drawColony = function(cellCoord){
  var ctx = this.ctx;
  var cellSize = this.cellSize;
  // Temporary function to fill a particular cell with color
  ctx.fillStyle = "#2D5C8A";
  ctx.fillRect(cellCoord[0]+1, cellCoord[1]+1, cellSize-2, cellSize-2);
  // Swap out the hor and vertical coordinates here becuase hor => columns
  this.board.buildColony(cellCoord[1]/ cellSize, cellCoord[0]/ cellSize,
    cellCoord);
};

Game.prototype.step = function(){
    this.board.step();
};

module.exports = Game;

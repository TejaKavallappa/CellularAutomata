var Cell = require("./cell");
var Board = function(numCells, ctx, cellSize){
  // this.colony = [];
  this.numCells = numCells;
  this.ctx = ctx;
  this.cellSize = cellSize;
  this.generation = 0;
  this.currentGrid = this.populate();
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
  this.currentGrid[x][y] = 1;
};

Board.NEIGHBORS = [[0,-1],[0,1],[1,0],[-1,0],[-1,-1],[-1,1],[1,-1],[1,1]];

Board.prototype.reset = function(){
  this.currentGrid = [];
};

Board.prototype.step = function(){
  this.newGrid = this.populate();
  this.newCells = [];
  for(var i = 0; i < this.numCells; i++){
    for(var j = 0; j < this.numCells; j++){
      var aliveNeighbors = 0;

      for(var k = 0; k < Board.NEIGHBORS.length; k++){
        var delta = Board.NEIGHBORS[k];
        var gridVal =
          this.currentGrid[i+delta[0]] ? this.currentGrid[i+delta[0]][j+delta[1]] || 0 : 0;
        aliveNeighbors += gridVal;
      }
        //If cell is alive, it dies if aliveNeighbors > 4 || aliveNeighbors < 1
        // else it lives;
        if (this.currentGrid[i][j] === 1){
          if (aliveNeighbors >= 4 || aliveNeighbors <= 1){
            this.newGrid[i][j] = null;
            this.newCells.push(new Cell([i,j],'dead'));
          }
          else{
            this.newGrid[i][j] = this.currentGrid[i][j];
          }
        }
        // If cell is dead and it has aliveNeighbors == 3, it becomes alive
        else if (!this.currentGrid[i][j] && aliveNeighbors === 3){
          this.newGrid[i][j] = 1;
          this.newCells.push(new Cell([i,j],'alive'));
        }
        else{
          this.newGrid[i][j] = this.currentGrid[i][j];
         }
    }//for j
  }//for i
  this.currentGrid = this.newGrid;
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
  var st = new Date().getTime();
  var sz = this.cellSize;
  // Clear up the board
  this.ctx.clearRect(0, 0, Board.DIM_X, Board.DIM_Y);
  this.ctx.fillStyle = 'grey';
  this.ctx.fillRect(0, 0, Board.DIM_X, Board.DIM_Y);
  // Redraw the board
  var self = this;
  this.ctx.fillStyle = "yellow";
  for(var i = 0; i < this.currentGrid.length; i++){
    var row = this.currentGrid[i];
    for(var j = 0; j < row.length; j++){
      if(this.currentGrid[i][j] === 1){
        this.ctx.fillRect(j*sz, i*sz, sz-2, sz-2);
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
 Board.prototype.start = function () {
  this.draw();
  this.drawGridLines();
};
module.exports = Board;

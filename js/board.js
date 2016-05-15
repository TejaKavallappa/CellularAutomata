var Cell = require("./cell");
var Board = function(numCells, ctx, cellSize){
  this.numCells = numCells;
  this.ctx = ctx;
  this.cellSize = cellSize;
  this.generation = 0;
  this.grid = this.populate();
};

Board.prototype.populate = function(){
  var grid = [];
  for(var i = 0; i < this.numCells[1]; i++){
    grid.push([]);
    for(var j = 0; j < this.numCells[0]; j++){
    grid[i].push(null);
    }
  }
  return grid;
};

Board.prototype.buildColony = function(x, y, cellCoord){
  debugger;
  if(x < this.numCells[1] && y < this.numCells[0]){
    if(this.grid[x][y]){
      this.grid[x][y] = null;
      this.undoSelect(cellCoord);
    }
    else{
    this.grid[x][y] = 1;
  }
  }
};

Board.prototype.undoSelect = function(cellCoord){
  var ctx = this.ctx;
  var cellSize = this.cellSize;
  ctx.fillStyle = "grey";
  ctx.fillRect(cellCoord[0]+1, cellCoord[1]+1, cellSize-2, cellSize-2);
};

Board.NEIGHBORS = [
  [0,-1],[0,1],
  [1,0],[-1,0],
  [-1,-1],[-1,1],
  [1,-1],[1,1]];

Board.prototype.step = function(){
  this.newGrid = this.populate();
  this.newCells = [];
  for(var i = 0; i < this.numCells[1]; i++){
    for(var j = 0; j < this.numCells[0]; j++){
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
          this.alive = true;
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
  // console.log(this.generation);
  this.updateGrid(this.newCells);
};//step

Board.prototype.updateGrid = function(){
  // Iterate through new cells and only update the colours of those cells
  var sz = this.cellSize;
  for(var i = 0; i < this.newCells.length; i++){
    var cell = this.newCells[i];
    this.ctx.fillStyle = (cell.state === 'alive') ? '#2D5C8A' : '#bdbdbd';
    this.ctx.fillRect(cell.y*sz+1, cell.x*sz+1, sz-2, sz-2);
  }
};

module.exports = Board;

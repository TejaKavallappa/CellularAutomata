
var MenuBar = function(game, canvasEl, cellSize, ctx){
  this.game = game;
  this.canvas = canvasEl;
  this.cellSize = cellSize;
  this.ctx = ctx;
  this.runningState = "paused";
  this.getButtonRefs();
  this.addButtonListeners();
};
MenuBar.prototype.getButtonRefs = function(){
  this.startGOL = document.getElementById('start-button');
  // this.stopGOL = document.getElementById('stop-button');
  this.resetGOL = document.getElementById('reset-button');
  this.stepGOL = document.getElementById('step-button');
};

MenuBar.prototype.addButtonListeners = function(){
  this.canvas.addEventListener('click', this.handleClick.bind(this));
  this.startGOL.addEventListener('click', this.startGame.bind(this));
  // this.stopGOL.addEventListener('click', this.stopGame.bind(this));
  this.resetGOL.addEventListener('click', this.resetGame.bind(this));
  this.stepGOL.addEventListener('click', this.stepGame.bind(this));
};

MenuBar.prototype.startGame = function(){
    if (this.startGOL.getAttribute("start") == this.startGOL.innerHTML) {
      this.startGOL.innerHTML = this.startGOL.getAttribute("stop");
    } else {
      this.startGOL.setAttribute("stop", this.startGOL.innerHTML);
      this.startGOL.innerHTML = this.startGOL.getAttribute("start");
    }
    if (this.runningState === "paused"){
      this.runningState = "running";
      this.gameRun = setInterval(this.game.step.bind(this.game), 300);
    }
    else{
        clearInterval(this.gameRun);
        this.runningState = "paused";
    }
};
// MenuBar.prototype.stopGame = function(){
//   clearInterval(this.gameRun);
// };

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

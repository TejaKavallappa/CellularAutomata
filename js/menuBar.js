
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
    console.log("stoppping the asynchronous callback");
    clearInterval(this.gameRun);
  }
  this.game.reset();
};
MenuBar.prototype.stepGame = function(){
  this.game.step();
};
MenuBar.prototype.handleClick = function(e){
  // Get the canvas coordinates
  var canvasDim = this.canvas.getBoundingClientRect();
  //Distance from left of canvas
  var horCellNum = Math.floor((e.pageX - canvasDim.left)/ this.cellSize);
  //Distance from top of canvas
  var verCellNum = Math.floor((e.pageY - canvasDim.top)/ this.cellSize);
  var cellCoord = [horCellNum* this.cellSize, verCellNum * this.cellSize];
  this.game.drawColony(this.ctx, cellCoord ,this.cellSize);
};
module.exports = MenuBar;


var MenuBar = function(game, gv){
  this.game = game;
  this.gameView = gv;
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
module.exports = MenuBar;

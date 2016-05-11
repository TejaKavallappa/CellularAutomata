
var MenuBar = function(game, gv){
  this.game = game;
  this.gameView = gv;
  this.status = 'paused';
  var start = document.getElementById('start-button');
  var reset = document.getElementById('reset-button');
  start.addEventListener('click', this.start.bind(this));
  reset.addEventListener('click', this.reset.bind(this));
};

MenuBar.prototype.start = function(){
  if (this.status === 'paused'){
    this.status = 'running';
    this.gameRun = setInterval(this.game.step.bind(this.game), 500);
  }
  else if(this.status === 'running'){
    this.status = 'paused';
    clearInterval(this.gameRun);
  }
};

MenuBar.prototype.reset = function(){
  this.status = 'paused';
  this.game.reset();
  this.gameView.start();
};


module.exports = MenuBar;

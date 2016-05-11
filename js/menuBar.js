
var MenuBar = function(game){

  this.game = game;
  this.status = 'paused';
  var start = document.getElementById('start-button');
  start.addEventListener('click', this.start.bind(this));
};

MenuBar.prototype.start = function(){
  if (this.status === 'paused'){
    this.status = 'running';
    this.gameRun = setInterval(this.game.step.bind(this.game), 1000);
  }
  else if(this.status === 'running'){
    this.status = 'paused';
    clearInterval(this.gameRun);
  }
};

module.exports = MenuBar;

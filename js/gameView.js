var GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
};

GameView.DIM_X = 500;
GameView.DIM_Y = 500;

GameView.prototype.draw = function(){
  this.ctx.clearRect(0, 0, GameView.DIM_X, GameView.DIM_Y);
  this.ctx.fillStyle = 'grey';
  this.ctx.fillRect(0, 0, GameView.DIM_X, GameView.DIM_Y);
};

GameView.prototype.drawGridLines = function() {
  // Draw the grid
  //padding around grid
  var p = 10;
  var bw = GameView.DIM_X - 2*p;
  var bh = GameView.DIM_Y - 2*p;
  //size of canvas
  var cw = bw + (p*2) + 1;
  var ch = bh + (p*2) + 1;

  // Vertical lines
  this.ctx.strokeStyle = "black";
  this.ctx.lineWidth = 1.3;
  for (var x = 0; x <= bw; x += 40) {
      this.ctx.moveTo(0.5 + x + p, p);
      this.ctx.lineTo(0.5 + x + p, bh + p);
      this.ctx.stroke();
  }
 // Horizontal lines
  for (x = 0; x <= bh; x += 40) {
      this.ctx.moveTo(p, 0.5 + x + p);
      this.ctx.lineTo(bw + p, 0.5 + x + p);
      this.ctx.stroke();
  }
    return;
      };


GameView.prototype.start = function () {
  this.lastTime = 0;
  this.draw();
  this.drawGridLines();
  //start the animation
  // requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function(time){
  var timeDelta = time - this.lastTime;
  this.drawGridLines({color: "red", separation: 30});

  // this.game.step(timeDelta);
  // this.game.draw(this.ctx);
  this.lastTime = time;

  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;
window.GameView = GameView;

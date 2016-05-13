var Colony = function(canvasEl, cellSize, game){
  this.blinker = [[0, 1, 0], [0, 1, 0], [0, 1, 0]];

  this.getButtonRefs();
  this.addButtonListeners();
  this.canvas = canvasEl;
  this.cellSize = cellSize;
  this.game = game;
};

Colony.prototype.getButtonRefs = function(){
  this.osc = document.getElementById("osc");
  this.trg = document.getElementById("can-div");
};

Colony.prototype.addButtonListeners = function(){
  this.osc.addEventListener('dragstart',
    this.dragstart_handler.bind(this));

  this.trg.addEventListener('dragover', this.dragover_handler.bind(this));
  this.trg.addEventListener('dragenter', this.dragover_handler.bind(this));
  this.trg.addEventListener('drop', this.ondrop_handler.bind(this));
};

Colony.prototype.dragstart_handler = function(ev) {
 ev.dataTransfer.setData("val", 1);
};

Colony.prototype.ondrop_handler = function(ev) {
  var canvasDim = this.canvas.getBoundingClientRect();

  var horCellNum = Math.floor((ev.pageX - canvasDim.left)/ this.cellSize);
  var verCellNum = Math.floor((ev.pageY - canvasDim.top)/ this.cellSize);

  var cellCoord = [horCellNum* this.cellSize, verCellNum * this.cellSize];

 ev.preventDefault();
 var data = ev.dataTransfer.getData("val");
 this.drawPattern(data, cellCoord, canvasDim);
};

Colony.prototype.drawPattern = function(num, cellCoord, canvasDim){
  var data = this.blinker;
  if (num === 1){
    data = this.blinker;
  }

  var x = cellCoord[0];
  var y = cellCoord[1];
  for(var i = 0; i < data.length; i++){
    x = cellCoord[0];
    for(var j = 0; j < data[i].length; j++){
      if (data[i][j] && x >= 0 && x <= canvasDim.height && y >= 0 && y <= canvasDim.width){
        this.game.drawColony([x,y]);
      }
      x += this.cellSize;
    }
    y += this.cellSize;
  }
};
Colony.prototype.dragover_handler = function(ev){
  ev.preventDefault();
};

module.exports = Colony;

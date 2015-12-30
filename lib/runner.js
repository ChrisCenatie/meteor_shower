const Board = require('./board');
const Score = require('./score');

var Runner = function(canvas, context, gameSize) {
  this.canvas    = canvas;
  this.context   = context;
  this.gameSize  = gameSize;
  this.board     = new Board(canvas.width, canvas.height);
  this.score     = new Score(this.board);
  this.startTime = Date.now();
  this.audio     = {
                    meteorsDestroyed: [
                      './sounds/wrap-up.wav',
                      './sounds/steve.wav',
                      './sounds/dao.wav',
                    ],
                    gameOver: [
                      './sounds/american.wav',
                      './sounds/tess.wav',
                      './sounds/jeff.wav',
                      './sounds/mejia.wav'
                    ],
                    startGame: [
                      './sounds/cheek.wav',
                      './sounds/horace.wav'
                    ]
  }
};

Runner.prototype.addPlayer = function() {
  this.board.addPlayer();
}

Runner.prototype.isGameOver = function() {
  return this.board.players.length < 1
}

Runner.prototype.clearObjects = function() {
  this.board = new Board(this.canvas.width, this.canvas.height);
  this.score = new Score(this.board);
  this.startTime = Date.now();
}

Runner.prototype.draw = function(){
  this.displayScores();
  this.update(this.board);
  this.drawObjects(this.context, this.gameSize, this.board);
  this.board.removeInActiveObjects();
}

Runner.prototype.displayScores = function() {
  var results = this.score.results();
  var time = this.calculateTime();
  document.getElementById('level').innerHTML = this.score.determineLevel();
  document.getElementById('time').innerHTML = time.minutes + " mins, " + time.seconds + " secs";
  document.getElementById('meteors-destroyed').innerHTML = results.meteorsDestroyed;
  document.getElementById('score').innerHTML = results.totalScore;
}

Runner.prototype.calculateTime = function() {
  var timeSecs = Math.floor((Date.now() - this.startTime) / 1000);
  var minutes = Math.floor(timeSecs / 60);
  var seconds = timeSecs - (minutes * 60);
  return {
    minutes: minutes,
    seconds: seconds
  }
}

Runner.prototype.addMeteors = function(interval) {
  if(this.interval) {
    clearInterval(this.interval);
  }
  return this.interval = window.setInterval(function() {
    this.board.addMeteor(this.score.determineLevel());
  }.bind(this), interval);
}

Runner.prototype.drawObjects = function(context, gameSize, board) {
  context.clearRect(0, 0, gameSize.x, gameSize.y);
  var objects = board.joinObjects();
  for (var i = 0; i < objects.length; i++) {
    drawObject(objects[i].image, context, objects[i]);
  }
};

Runner.prototype.update = function(board) {
  for (var i = 0; i < board.joinObjects().length; i++) {
    board.joinObjects()[i].update();
  }
};

Runner.prototype.playScoreSound = function(oldScore) {
  var audio = new Audio(_.sample(this.audio.meteorsDestroyed));
  if(this.score.results().totalScore > oldScore){
    audio.play();
  }
}

Runner.prototype.playGameOverSound = function() {
  var audio = new Audio(_.sample(this.audio.gameOver));
  audio.play();
}

Runner.prototype.playStartGameSound = function() {
  var audio = new Audio(_.sample(this.audio.startGame));
  audio.play();
}

var drawObject = function(image, context, body) {
  context.drawImage(image, body.center.x - body.size.width / 2,
                  body.center.y - body.size.height / 2,
                  body.size.width, body.size.height);
};

module.exports = Runner;

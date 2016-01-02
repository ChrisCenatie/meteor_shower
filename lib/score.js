function Score(board) {
  this.board = board;
}

Score.prototype.calculateScore = function() {
  if (this.board.meteorsDestroyed.length > 0) {
    var points = this.board.meteorsDestroyed.map(function(meteor) {
      return meteor.pointValue;
    });
    return points.reduce(function(total, value) {
      return total + value;
    });
  } else {
    return 0;
  }
}

Score.prototype.determineLevel = function() {
  if (this.calculateScore() < 500) {
    return 1;
  } else if (this.calculateScore() < 1000) {
    return 2;
  } else if (this.calculateScore() < 1800) {
    return 3;
  } else if (this.calculateScore() < 3000) {
    return 4;
  } else {
    return 5;
  }
}

Score.prototype.results = function() {
  return {
    totalScore: this.calculateScore(),
    meteorsDestroyed: this.board.meteorsDestroyed.length
  }
}

Score.prototype.highScore = function() {
  if(document.cookie !== ""){
    var currentHighScore = getHighScore();
    var currentScore     = this.calculateScore();
    highScoreCheck(currentHighScore, currentScore);
  } else {
    document.cookie = 'highScore=0';
  }
  return getHighScore();
}

function getHighScore() {
  var parsed = document.cookie.split('=');
  return parseInt(parsed[1]);
}

function highScoreCheck(currentHighScore, currentScore) {
  if( currentHighScore < currentScore){
    document.cookie = 'highScore=' + currentScore;
  }
}


module.exports = Score;

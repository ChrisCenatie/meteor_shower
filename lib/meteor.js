var addImage = require('./images')

function Meteor(board, level) {
  this.board = board;
  this.size  = this.dimensions(level);
  this.velocity = this.velocities(level)

  var randomXPosition = Math.floor(Math.random() * this.board.width);

  this.pointValue = Math.floor(-((this.size.width + this.size.height) / 2) + 66);
  this.center = { x: randomXPosition, y: 0 - (this.size.height / 2) };
  this.active = true;
  this.board.meteors.push(this);
  this.image = addImage('meteor');
}

Meteor.prototype.dimensions = function(level) {
  level = level || 1;
  var randomWidth  = this.determineDimension(level);
  var randomHeight = this.determineDimension(level);
  return { width: randomWidth, height: randomHeight};
}

Meteor.prototype.determineDimension = function(level) {
  var sizeByLevel = {
    1: [40, 25],
    2: [25, 20],
    3: [25, 20],
    4: [10, 15],
    5: [10, 15]
  }
  return Math.floor(Math.random() * sizeByLevel[level][0])
                                  + sizeByLevel[level][1];
}

Meteor.prototype.velocities = function(level) {
  var yVelocity = Math.floor(Math.random() * 3) + 1;
  var xVelocity = Math.floor(Math.random() * 3) - Math.floor(Math.random() * 3);
  var yVelocity2 = Math.floor(Math.random() * 3) + 2;
  var yVelocity3 = Math.floor(Math.random() * 3) + 4;
  if (level < 2) {
    return { x: xVelocity, y: yVelocity };
  } else if (level < 4) {
    return { x: xVelocity, y: yVelocity2 };
  } else {
    return { x: xVelocity, y: yVelocity3 };
  }
}


Meteor.prototype.update = function() {
  this.center.y += this.velocity.y;
  this.center.x += this.velocity.x;
}

module.exports = Meteor;

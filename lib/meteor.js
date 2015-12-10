var randomWidth = Math.floor(Math.random() * 25) + 16;
var randomHeight = Math.floor(Math.random() * 25) + 16;
var randomVelocity = Math.floor(Math.random() * 3) + 1;

function Meteor(board) {
  this.board = board;

  var randomXPosition = Math.floor(Math.random() * this.board.width);

  this.size = { width: randomWidth, height: randomHeight};
  this.center = { x: randomXPosition, y: 0 - (this.size.height / 2) };
  this.velocity = { x: 0, y: randomVelocity };
  this.board.meteors.push(this);
}

Meteor.prototype.moveDown = function() {
  this.center.y += this.velocity.y;
}

Meteor.prototype.range = function() {
  return {
    xmin: this.center.x - (this.size.width / 2),
    xmax: this.center.x + (this.size.width / 2),
    ymin: this.center.y - (this.size.height / 2),
    ymax: this.center.y + (this.size.height / 2)
 }
};
module.exports = Meteor;
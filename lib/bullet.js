function Bullet(board) {
  this.board = board;
  this.size = { width: 5, height: 5 };
  this.center = {
                  x: this.board.players[0].center.x,
                  y: this.board.players[0].center.y
                };
  this.velocity = { y: -6 };
  this.board.bullets.push(this);
}

Bullet.prototype.moveUp = function() {
  this.center.y += this.velocity.y;
}

Bullet.prototype.range = function() {
  return {
    xmin: this.center.x - (this.size.width / 2),
    xmax: this.center.x + (this.size.width / 2),
    ymin: this.center.y - (this.size.height / 2),
    ymax: this.center.y + (this.size.height / 2)
 }
};

Bullet.prototype.collisionWith = function(object) {
  var withinXRange = (
    object.xmin >= this.range().xmin &&
    object.xmin <= this.range().xmax ||
    object.xmax <= this.range().xmax &&
    object.xmax >= this.range().xmin
  );
  var withinYRange = (
    object.ymin >= this.range().ymin &&
    object.ymin <= this.range().ymax ||
    object.ymax <= this.range().ymax &&
    object.ymax >= this.range().ymin
  );
  return withinXRange && withinYRange
};
module.exports = Bullet;
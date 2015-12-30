const chai = require('chai');
const assert = chai.assert;

const Board = require('../lib/board');
const Bullet = require('../lib/bullet');

describe('Bullet', function() {
  beforeEach(function() {
    this.board = new Board();
    this.player = this.board.addPlayer();
  });

  describe('instantiation', function() {
    it('should instantiate a new bullet object', function() {
      let bullet = new Bullet(this.board);
      assert.isObject(bullet);
    });

    it('should reference board object passed as the first parameter', function() {
      let bullet = new Bullet(this.board);
      assert.equal(bullet.board, this.board);
    });

    it('should initialize at center x coordinate of player object center x coordinate', function() {
      let bullet = new Bullet(this.board);
      assert.equal(this.player.x, bullet.x);
    });

    it('should initialize at center y coordinate of player object center y coordinate', function() {
      let bullet = new Bullet(this.board);
      assert.equal(this.player.y, bullet.y);
    });

    it('should have a default size of 10 by 10 pixels', function() {
      let bullet = new Bullet(this.board);
      assert.equal(bullet.size.width, 10);
      assert.equal(bullet.size.height, 10);
    });

    it('should be included in the board\'s array of bullets', function() {
      let bullet = new Bullet(this.board);
      assert.include(this.board.bullets, bullet);
    });

    it('should have an image', function() {
      let bullet = new Bullet(this.board);
      assert.equal('ruby.png', bullet.image.src.split('/')[5]);
    });
  });

  describe('movement', function() {
    it('should have a constant Y velocity of -6', function() {
      let bullet = new Bullet(this.board);

      assert.equal(bullet.velocity.y, -6);
    });

    it('should move straight up from its starting position', function() {
      let bullet = new Bullet(this.board);
      let originalCenterX = bullet.center.x;
      let originalCenterY = bullet.center.y;

      bullet.update();

      assert.equal(bullet.center.x, originalCenterX);
      assert.equal(bullet.center.y, originalCenterY - 6);
    });
  });
});

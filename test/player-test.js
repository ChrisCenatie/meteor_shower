const chai = require('chai');
const assert = chai.assert;

const Player = require('../lib/player');
const Board = require('../lib/board');

describe('Player', function() {
  beforeEach(function() {
    this.board = new Board();
    this.player = new Player(this.board);
  });

  describe('instantiation', function() {
    it('should instantiate a new player', function() {
      assert.isObject(this.player);
    });

    it('should reference the board object passed as the first parameter', function() {
      assert.equal(this.player.board, this.board);
    });

    it('should have a default center x coordinate of half the board width', function() {
      assert.equal(this.player.center.x, this.board.width / 2);
    });

    it('should have a constant center y coordinate ten less than board height', function() {
      assert.equal(this.player.center.y, this.board.height-10);
    });

    it('should have a default size of 16 by 16 pixels', function() {
      assert.equal(this.player.size.width, 50);
      assert.equal(this.player.size.height, 50);
    });

    it('should be included in the board\'s array of players', function() {
      assert.include(this.board.players, this.player);
    });

    it('should have an image', function() {
      var playerImages = [
        'alon.png', 'bret.png', 'chris.png', 'george.png', 'hecker.png',
        'holzmann.png', 'jeff.png', 'matt.png', 'mb.png', 'mimi.png', 'rose.png',
        'russell.png', 'ryan.png', 'travis.png'
      ]
      assert.include(playerImages, this.player.image.src.split('/')[5]);
    });
  });
});

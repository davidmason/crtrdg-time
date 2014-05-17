var assert = require('assert'),
    GameTime = require('./index.js')
    EventEmitter = require('events').EventEmitter;

describe('GameTime', function () {
  describe('#millis', function () {
    it('should be 0 when no updates have happened', function () {
      var game = new EventEmitter();
          time = new GameTime(game);
      assert.equal(0, time.millis);
    });
    it('should be the sum of all the update intervals so far', function () {
      var game = new EventEmitter();
          time = new GameTime(game);
      game.emit('update', 10);
      assert.equal(10, time.millis);
      game.emit('update', 12);
      assert.equal(22, time.millis);
      game.emit('update', 8);
      assert.equal(30, time.millis);
    });
  });
  describe('#seconds()', function () {
    it('should return the fractional number of seconds since the timer started', function () {
      var game = new EventEmitter();
          time = new GameTime(game);
      assert.equal(0, time.seconds());
      game.emit('update', 1);
      assert.equal(0.001, time.seconds());
      game.emit('update', 998);
      assert.equal(0.999, time.seconds());
      game.emit('update', 1);
      assert.equal(1, time.seconds());
      game.emit('update', 999);
      assert.equal(1.999, time.seconds());
      game.emit('update', 50);
      assert.equal(2.049, time.seconds());
      game.emit('update', 60000);
      assert.equal(62.049, time.seconds());
    });
  });
  describe('#minutes()', function () {
    it('should return the fractional number of minutes since the timer started', function () {
      var game = new EventEmitter();
          time = new GameTime(game);
      assert.equal(0, time.minutes());
      game.emit('update', 6000);
      assert.equal(0.1, time.minutes());
      game.emit('update', 48000);
      assert.equal(0.9, time.minutes());
      game.emit('update', 6000);
      assert.equal(1, time.minutes());
      game.emit('update', 0);
      assert.equal(1, time.minutes());
      game.emit('update', 60000);
      assert.equal(2, time.minutes());
      game.emit('update', 600000);
      assert.equal(12, time.minutes());
    });
  });
  describe('#throb(durationMillis)', function () {
    it('should start at 1', function () {
      var game = new EventEmitter();
          time = new GameTime(game);
      assert.equal(1, time.throb(1000));
    });
    it('should be 0 after half the duration', function () {
      var game = new EventEmitter();
          time = new GameTime(game);
      game.emit('update', 500);
      assert.equal(0, time.throb(1000));
      game.emit('update', 500);
      game.emit('update', 500);
      assert.equal(0, time.throb(1000));
      game.emit('update', 100000);
      assert.equal(0, time.throb(1000));
    });
    it('should be 1 after each full duration', function () {
      var game = new EventEmitter();
          time = new GameTime(game);
      game.emit('update', 1000);
      assert.equal(1, time.throb(1000));
      game.emit('update', 500);
      game.emit('update', 500);
      assert.equal(1, time.throb(1000));
      game.emit('update', 100000);
      assert.equal(1, time.throb(1000));
    });
  });
});
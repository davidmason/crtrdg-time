module.exports = GameTime;

function GameTime (game) {
  var self = this;
  this.millis = 0;
  game.on('update', function(interval){
    self.millis += interval;
  });
};

GameTime.prototype.seconds = function () {
  return this.millis / 1000;
}

GameTime.prototype.minutes = function () {
  return this.seconds() / 60;
}

/* undulate between 0 and 1 every durationMillis milliseconds */
GameTime.prototype.throb = function (durationMillis) {
  var halfDuration = durationMillis / 2;
  return Math.abs((this.millis % durationMillis) - halfDuration) / halfDuration;
}

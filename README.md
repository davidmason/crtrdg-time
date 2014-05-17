crtrdg-time
===========

Track elapsed game time in a crtrdg-gameloop


## usage

```js
var Game = require('crtrdg-gameloop'),
    game = new Game(),
    Time = require('crtrdg-time'),
    time = new Time(game);

game.on('update', function (context) {
  console.log('Milliseconds: %d, Seconds: %d, Minutes: %d, Throbber: %f', time.millis, time.seconds(), time.minutes(), time.throb(1000));
});
```

`millis`, `seconds()` and `minutes()` all return duration since the timer was created (excluding any time that the game was paused).

`throb(durationMillis)` returns a value between 0 and 1 that will rise and fall once per `durationMillis` milliseconds of game time (linear, not sine wave). To get a different range, coerce the value, e.g. if you have some text changing between 0.5 and 0.75 transparency every 2 seconds, you could use `throb(2000) * 0.25 + 0.5`


## License

MIT
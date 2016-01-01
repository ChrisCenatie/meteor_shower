$('document').ready(function() {
  const Runner = require('./runner');

  var canvas = document.getElementById('screen');
  var context = canvas.getContext('2d');
  var gameSize = { x: canvas.width, y: canvas.height };
  var runner = "initialize runner";
  var interval = "initialize addMeteor Interval";

  startGameLoop();

  function startGameLoop() {
    context.font="30px Verdana";
    context.fillStyle = "red";
    context.fillText("Choose Your Favorite", 60, 50);
    context.fillText("1507 Turing Student!", 60, 90);
    context.fillText("Then Click Here,", 120, 320);
    context.fillText("To Begin Assessments :P", 60, 360);

    startOption();
  }

  function startOption() {
    $(function() {
      $("#screen").click(function() {
        runner = new Runner(canvas, context, gameSize);
        runner.addPlayer();
        runner.playStartGameSound();
        interval = runner.addMeteors(1000);
        gameLoop();
        $("#screen").unbind("click");
      });
    });
  }

  function gameLoop(){
    if(!runner.isGameOver()) {
      var oldScore = runner.score.results().totalScore;
      runner.draw();
      runner.playScoreSound(oldScore);
      requestAnimationFrame(gameLoop)
    } else {
      clearInterval(interval);
      runner.playGameOverSound();
      gameOverLoop();
    }
  }

  function gameOverLoop() {
    clearScreen();

    context.font="40px Verdana";
    context.fillStyle = "red";
    context.fillText("Game Over!", 105, 100);

    context.fillStyle = "green";
    context.fillText("Play Again?", 105, 320);
    context.font="30px Verdana";
    context.fillText("Click Here", 145, 360);

    restartOption();
  }

  function clearScreen() {
    $(function() {
      context.clearRect(0, 0, gameSize.x, gameSize.y);
      $("#screen").css("background-image", "url('../meteor_shower/images/background/homework.png')");
      $("#screen").css("background-size", "325px 400px");
    });
  }

  function restartOption() {
    $(function() {
      $("#screen").click(function() {
        $("#screen").css("background-image", "url('../meteor_shower/images/background/turing-logo2.jpg')");
        $("#screen").css("background-size", "250px 250px");
        runner = new Runner(canvas, context, gameSize);
        runner.playStartGameSound();
        runner.clearObjects();
        runner.addPlayer();
        interval = runner.addMeteors(1000);
        gameLoop();
        $("#screen").unbind("click");
      });
    });
  }

  // gameLoop();
});

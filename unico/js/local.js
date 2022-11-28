var Local = function () {
    // objeto de juego
    var game;
  
    // intervalo de tiempo
    var INTERVAL = 300;
  
    // Temporizador
    var timer = null;
  
    // contador de tiempo
    var time = 0;
    var timeCount = 0;
  
    // Vincular eventos de teclado
    var bindKeyEvent = function () {
      document.onkeydown = function (e) {
        if (e.keyCode == 38) { // up
          game.rotate();
        } else if (e.keyCode == 39) { // right
          game.right();
        } else if (e.keyCode == 40) { // down
          game.down();
        } else if (e.keyCode == 37) { // left
          game.left();
        } else if (e.keyCode == 32) { // space
          game.fall();
        }
      }
    }
  
    // Muevete
    var move = function () {
      timeFunc();
      if (!game.down()) {
        game.fixed();
        var line = game.checkClear();
        if (line) {
          game.addScore(line);
        }
        var gameOver = game.checkGameOver();
        if (gameOver) {
          game.onGameOver(false);
          stop();
        } else {
          game.performNext(generateType(), generateDir());
        }
      }
    }
    // Genera aleatoriamente filas perturbadoras
    var generateBotLine = function (lineNum) {
      var lines = [];
      for (var i = 0; i < lineNum; i++) {
        var line = [];
        for (var j = 0; j < 10; j++) {
          line.push(Math.ceil(Math.random() * 2) - 1); // Generar 0 1 número aleatorio
        }
        lines.push(line);
      }
      return lines;
    }
    // función de temporización
    var timeFunc = function () {
      timeCount += 1;
      if (timeCount == 5) {
        timeCount = 0;
        time += 1;
        game.setTime(time);
        if (time % 60 == 0) { // Genera una fila en 60 segundos
          game.addBotLine(generateBotLine(1));
        }
      }
    }
    // Generar aleatoriamente un tipo de bloque
    var generateType = function () {
      return Math.ceil(Math.random() * 7) - 1;
    }
    // Genera aleatoriamente una cantidad de giros
    var generateDir = function () {
      return Math.ceil(Math.random() * 4) - 1;
    }
    // Finalizar
    var stop = function () {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      document.onkeydown = null;
    }
    // comienzo
    var start = function () {
      var doms = {
        gameDiv: document.getElementById('local_game'),
        nextDiv: document.getElementById('local_next'),
        timeDiv: document.getElementById('local_time'),
        scoreDiv: document.getElementById('local_score'),
        resultDiv: document.getElementById('local_gameover'),
      }
      game = new Game();
      game.init(doms, generateType(), generateDir());
      bindKeyEvent();
      game.performNext(generateType(), generateDir());
      timer = setInterval(move, INTERVAL);
    }
  
    this.start = start;
  }
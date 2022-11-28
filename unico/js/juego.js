var Game = function () {
    // elemento dom
    var gameDiv;
    var nextDiv;
    var timeDiv;
    var scoreDiv;
    var resultDiv;
  
    // fracción
    var score = 0;
  
    // matriz de juego
    var gameData = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  
    // plaza actual
    var cur;
    // próximo cuadrado
    var next;
    // divs
    var nextDivs = [];
    var gameDivs = [];
  
    // Bloque movido al fondo fijo
    var fixed = function() {
      for (var i=0; i<cur.data.length; i++) {
        for (var j=0; j<cur.data[0].length; j++) {
          if (check(cur.origin, i, j)) {
            if (gameData[cur.origin.x + i][cur.origin.y + j] == 2) {
              gameData[cur.origin.x + i][cur.origin.y + j] = 1;
            }
          }
        }
      }
      refreshDiv(gameData, gameDivs);
    }
  
    // inicializar div
    var initDiv = function (container, data, divs) {
      for (var i=0; i<data.length; i++) {
        var div = [];
        for (var j=0; j<data[0].length; j++) {
          var newNode = document.createElement('div');
          newNode.className = 'none';
          newNode.style.top = (i*20)+'px';
          newNode.style.left = (j*20)+'px';
          container.appendChild(newNode);
          div.push(newNode);
        }
        divs.push(div);
      }
    }
  
    // actualizar div
    var refreshDiv = function (data, divs) {
      for (var i=0; i<data.length; i++) {
        for (var j=0; j<data[0].length; j++) {
          if (data[i][j] == 0) {
            divs[i][j].className = 'none';
          } else if (data[i][j] == 1) {
            divs[i][j].className = 'done';
          } else if (data[i][j] == 2) {
            divs[i][j].className = 'current';
          }
        }
      }
    }
  
    // Si el punto de detección es legal
    var check = function (pos, x, y) {
      if (pos.x + x < 0) {
        return false;
      } else if (pos.x + x >= gameData.length) {
        return false;
      } else if (pos.y + y < 0) {
        return false;
      } else if (pos.y + y >= gameData[0].length) {
        return false;
      } else if (gameData[pos.x + x][pos.y + y] === 1) {
        return false;
      } else {
        return true;
      }
    }
  
    // Comprobar si los datos son legales
    var isValid = function(pos, data) {
      for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data[0].length; j++) {
              if (data[i][j] != 0) {
                  if (!check(pos, i, j)) {
                      return false;
                  }
              }
          }
      }
      return true;
    }
  
    // borrar datos
    var clearData = function () {
      for (var i=0; i<cur.data.length; i++) {
        for (var j=0; j<cur.data[0].length; j++) {
          if (check(cur.origin, i, j)) {
            gameData[cur.origin.x + i][cur.origin.y + j] = 0;
          }
        }
      }
    }
  
    // establecer datos
    var setData = function () {
      for (var i=0; i<cur.data.length; i++) {
        for (var j=0; j<cur.data[0].length; j++) {
          if (check(cur.origin, i, j)) {
            gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
          }
        }
      }
    }
  
    // rotar
    var rotate = function () {
      if (cur.canRotate(isValid)) {
        clearData();
        cur.rotate();
        setData();
        refreshDiv(gameData, gameDivs);
      }
    }
  
    // mover hacia abajo
    var down = function () {
      if (cur.canDown(isValid)) {
        clearData();
        cur.down();
        setData();
        refreshDiv(gameData, gameDivs);
        return true;
      } else {
        return false;
      }
    }
  
    // mover hacia la izquierda
    var left = function () {
      if (cur.canLeft(isValid)) {
        clearData();
        cur.left();
        setData();
        refreshDiv(gameData, gameDivs);
      }
    }
  
    // mover a la derecha
    var right = function () {
      if (cur.canRight(isValid)) {
        clearData();
        cur.right();
        setData();
        refreshDiv(gameData, gameDivs);
      }
    }
  
    // cancelación
    var checkClear = function () {
      var line = 0;
      for (var i=gameData.length-1; i>=0; i--) { // a su vez atravesar
        var clear = true;
        for (var j=0; j<gameData[0].length; j++) { // Determinar si una fila se puede borrar
          if (gameData[i][j] != 1) {
            clear = false;
            break;
          }
        }
        if (clear) {
          line++;
          for (var m=i; m>0; m--) {
            for (var n=0; n<gameData[0].length; n++) {
              gameData[m][n] = gameData[m-1][n];
            }
          }
          for (var n=0; n<gameData[0].length; n++) {
            gameData[0][n] = 0;
          }
          i++;
        }
      }
      return line;
    }
  
    // comprobar juego terminado
    var checkGameOver = function () {
      var gameOver = false;
      for (var i=0; i<gameData[0].length; i++) {
        if (gameData[1][i] == 1) {
          gameOver = true;
        }
      }
      return gameOver;
    }
  
    // usar el siguiente bloque
    var performNext = function (type, dir) {
      cur = next;
      setData();
      next = SquareFactory.prototype.make(type, dir);
      refreshDiv(gameData, gameDivs);
      refreshDiv(next.data, nextDivs);
    }
  
    // fijar tiempo
    var setTime = function (time) {
      timeDiv.innerHTML = time;
    }
  
    // Añadir puntos
    var addScore = function (line) {
      var s = 0;
      switch (line) {
        case 1:
          s = 10;
          break;
        case 2:
          s = 30;
          break;
        case 3:
          s = 60;
          break;
        case 4:
          s = 100;
          break;
        default:
          break;
      }
      score += s;
      scoreDiv.innerHTML = score;
    }
  
    // juego terminado
    var onGameOver = function (win) {
      if (win) {
        resultDiv.innerHTML = 'Tú ganas';
      } else {
        resultDiv.innerHTML = 'Juego terminado';
      }
    }
  
    // añadir fila en la parte inferior
    var addBotLine = function (lines) {
      for (var i=0; i<gameData.length - lines.length; i++) { // remar hasta
        gameData[i] = gameData[i + lines.length];
      }
      for (var i=0; i<lines.length; i++) {
        gameData[gameData.length - lines.length + i] = lines[i];
      }
      cur.origin.x = cur.origin.x - lines.length;
      if (cur.origin.x < 0) {
        cur.origin.x = 0;
      }
      refreshDiv(gameData, gameDivs);
    }
  
    // función de inicialización
    var init = function (doms, type, dir) {
      gameDiv = doms.gameDiv;
      nextDiv = doms.nextDiv;
      timeDiv = doms.timeDiv;
      scoreDiv = doms.scoreDiv;
      resultDiv = doms.resultDiv;
      next = SquareFactory.prototype.make(type, dir);
      initDiv(gameDiv, gameData, gameDivs);
      initDiv(nextDiv, next.data, nextDivs);
      refreshDiv(next.data, nextDivs);
    }
  
    // API de exportación
    this.init = init;
    this.down = down;
    this.left = left;
    this.right = right;
    this.rotate = rotate;
    this.fall = function () {while(down());};
    this.fixed = fixed;
    this.performNext = performNext;
    this.checkClear = checkClear;
    this.checkGameOver = checkGameOver;
    this.setTime = setTime;
    this.addScore = addScore;
    this.onGameOver = onGameOver;
    this.addBotLine = addBotLine;
  }
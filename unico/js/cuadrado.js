var Square = function () {
    // bloquear datos
    this.data = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    // origen
    this.origin = {
      x: 0,
      y: 0
    }
    // dirección
    this.dir = 0;
  }
  
  // rotar
  Square.prototype.canRotate = function (isValid) {
    var d = (this.dir+1) % 4;
    var test = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    for (var i=0; i<this.data.length; i++) {
      for (var j=0; j<this.data[0].length; j++) {
        test[i][j] = this.rotates[d][i][j];
      }
    }
    return isValid(this.origin, test);
  }
  Square.prototype.rotate = function (num) {
    if (!num) num = 1;
    this.dir = (this.dir+num) % 4;
    this.dir==4 ? this.dir=0 : this.dir=this.dir;  
    for (var i=0; i<this.data.length; i++) {
      for (var j=0; j<this.data[0].length; j++) {
        this.data[i][j] = this.rotates[this.dir][i][j];
      }
    }
  }
  
  // mover hacia abajo
  Square.prototype.canDown = function (isValid) {
    var test = {};
    test.x = this.origin.x + 1;
    test.y = this.origin.y;
    return isValid(test, this.data);
  }
  Square.prototype.down = function () {
    this.origin.x = this.origin.x + 1;
  }
  
  // mover hacia la izquierda
  Square.prototype.canLeft = function (isValid) {
    var test = {};
    test.x = this.origin.x;
    test.y = this.origin.y - 1;
    return isValid(test, this.data);
  }
  Square.prototype.left = function () {
    this.origin.y = this.origin.y - 1;
  }
  
  // mover a la derecha
  Square.prototype.canRight = function (isValid) {
    var test = {};
    test.x = this.origin.x;
    test.y = this.origin.y + 1;
    return isValid(test, this.data);
  }
  Square.prototype.right = function () {
    this.origin.y = this.origin.y + 1;
  }
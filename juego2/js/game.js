var myGamePiece;
var myObstacles = [];
var myScore;
var width;
var started = false;
var ended = false;
var SPEEDX = 10;
var SPEEDY = 10;

var level = {1: 10, 2: 9, 3: 8, 4: 7, 5: 6, 6: 5, 7: 4, 8: 3, 9: 2, 10: 1}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        // this.canvas.width = 480; //100%; //480;
        // this.canvas.height = 270; //50%; //270;
        this.canvas.id = "canvas";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        // this.canvas.addEventListener("touchstart", handleStart, false);
        // this.canvas.addEventListener("touchend", handleEnd, false);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        myObstacles = [];
        this.frameNo = 0;
    }
}

function startGame() {
    width = myGameArea.canvas.width;
    myGamePiece = new component(width/16, width/16, "red", 10, 120);
    myGamePiece.gravity = 0.05;
    myScore = new component(Math.floor(myGameArea.canvas.width/18)+"px", "Consolas", "black", width*0.6, width/12, "text");
    document.getElementById("iniciar").hidden = false;
    myGameArea.start();
    var canvas_elem = document.getElementById("canvas");
    canvas_elem.addEventListener('touchstart', handleMove, false);
}

function iniciar() {
    if (started || ended) {
      window.clearInterval(myGameArea.interval);
    }
    document.getElementById("iniciar").hidden = true;
    document.getElementById("reiniciar").hidden = false;
    myGameArea.interval = setInterval(updateGameArea, level[document.getElementById("level").value]);
    started = true;
}

function component(width, height, color, x, y, type) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.type = type;
  if (type == 'Obstacle') {
    this.speedY = SPEEDY;
    this.speedX = 0;
    this.color = 'black';
  } 
  if (type == 'myGamePiece') {
    this.speedY = 0;
    this.speedX = 0;
    this.color = 'yellow';
  }

  this.update = function() {
    ctx = myGameArea.context;
    if (this.type == "myScore") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle(this.color);
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.type == 'Obstacle' && this.y == 0) {
      return 1;
    } else {
      return 0;
    }
  }

  
}

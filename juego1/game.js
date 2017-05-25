
var myGamePiece;
var myObstacles = [];
var myScore;
var width;

var map_speed = {
    1: 20,
    2: 15,
    3: 10,
    4: 8,
    5: 5,
    6: 2
};


function startGame() {
    width = myGameArea.canvas.width;
    myGamePiece = new component(width/16, width/16, "red", 10, 120);
    myGamePiece.gravity = 0.05;
    myScore = new component(Math.floor(myGameArea.canvas.width/18)+"px", "Consolas", "black", width*0.6, width/12, "text");
    document.getElementById("iniciar").hidden = false;
    document.getElementById("reiniciar").hidden = true;
    myGameArea.start();
    
}

function iniciar() {
    document.getElementById("iniciar").hidden = true;
    document.getElementById("reiniciar").hidden = false;
    myGameArea.interval = setInterval(updateGameArea, map_speed[document.getElementById("level").value]);
}

function restartGame() {
    window.clearInterval(myGameArea.interval);
    myGameArea.interval = setInterval(updateGameArea, map_speed[document.getElementById("level").value]);
    myGamePiece = new component(width/16, width/16, "red", 10, 120);
    myGamePiece.gravity = 0.05;
    myScore = new component(Math.floor(myGameArea.canvas.width/18)+"px", "Consolas", "black", width*0.6, width/12, "text");
    myGameArea.clear();
    myGameArea.stop();
   
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        // this.canvas.width = 480; //100%; //480;
        // this.canvas.height = 270; //50%; //270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
		myObstacles = [];
        myGameArea.frameNo = 0;
    }

}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    document.getElementById("prueba").innerHTML = width;
    var x, height, gap, minHeight, maxHeight, minGap, maxGap, velocity;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            return;
        } 
    }
    velocity = parseInt(String(150 - myGameArea.frameNo/100));
    // document.getElementById("prueba2").innerHTML = velocity;
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(velocity)) {
        x = myGameArea.canvas.width;
        minHeight = Math.floor(width/24);
        maxHeight = Math.floor(width/2.4);
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = Math.floor(width/10);
        maxGap = Math.floor(width/2.5);
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;  //*150/velocidad;
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
    // document.getElementById("prueba").innerHTML = n;
    // for (i = 0); 
    // myObstacles[0].gravitySpeed = myObstacles[0].gravitySpeed + 10;
        // myObstacles[0].gravity
    if (n > 0) {
        myGamePiece.gravity = myGamePiece.gravity + myGameArea.frameNo/10000;
    } else {
         myGamePiece.gravity = myGamePiece.gravity - myGameArea.frameNo/10000;
         // document.getElementById("prueba").innerHTML = myScore.score;
    }
    // document.getElementById("prueba2").innerHTML = myGameArea.frameNo+10;
}


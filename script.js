

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//audio files
var fly = new Audio();
var scoreSound = new Audio();
var death = new Audio();
fly.src = "sounds/fly.mp3";
scoreSound.src = "sounds/score.mp3";
death.src = "sounds/death.mp3";

//load images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

var i1 = 0;
var i2 = 0;
var i3 = 0;
var i4 = 0;
var i5 = 0;
var i6 = 0;
var i7 = 0;


  bg.onload = function(e) {
    i1 = 1;
    if(i1 == 1 && i2 == 1 && i3 == 1 && i4 == 1 && i5 == 1){
      // draw();
      start();
    }
  }
  
  pipeNorth.onload = function(e) {
    i2 = 1;
    if(i1 == 1 && i2 == 1 && i3 == 1 && i4 == 1 && i5 == 1){
      // draw();
      start();
    }
  }

  pipeSouth.onload = function(e) {
    i3 = 1
    if(i1 == 1 && i2 == 1 && i3 == 1 && i4 == 1 && i5 == 1){
      // draw();
      start();
    }
  }

  fg.onload = function(e) {
    i4 = 1;
    if(i1 == 1 && i2 == 1 && i3 == 1 && i4 == 1 && i5 == 1){
      // draw();
      start();
    }
  }

  bird.onload = function(e) {
    i5 = 1;
    if(i1 == 1 && i2 == 1 && i3 == 1 && i4 == 1 && i5 == 1){
      // draw();
      start();
    }
  }


// // some variables
var gap = 80;
var constant = pipeNorth.height+gap;

var bx = 10;
var by = 150;

var gravity = parseInt(document.getElementById("gravity").value, 10);
var speed = parseInt(document.getElementById("speed").value, 10);
var pipeSpawn = 125;
var coin = 5;
var jump = 25;


var score = 0;
var highScore = 0;
var alive = true;
// on key down

document.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      draw();
    } else {
      moveUp();
    }
});
function moveUp(){
  by -= jump;
  fly.play();
}

// pipe coordinates
var pipe = [];
pipe[0] = {
  x : cvs.width,
  y : 0
};

function start(){
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(pipeNorth, 125, 0);
  constant = pipeNorth.height+gap;
  ctx.drawImage(pipeSouth, 125, constant);
  ctx.drawImage(fg, 0,cvs.height - fg.height);
  ctx.drawImage(bird, bx, by);
  ctx.fillStyle = "*000";
  ctx.font = "20px Verdana";
  ctx.fillText("Press Enter to Start", 40, 290);
}

// draw images
function draw(){
  ctx.drawImage(bg, 0, 0);

  for(var i = 0; i < pipe.length; i++ ){
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    constant = pipeNorth.height+gap;
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y+constant);

    pipe[i].x -= speed;
    if(pipe[i].x == pipeSpawn){
      pipe.push({
        x : cvs.width,
        y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    }

    // detect collision
    if( bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width && (by <= pipe[i].y + pipeNorth.height || by + bird.height >= pipe[i].y+ constant) || by + bird.height >= cvs.height - fg.height){
      // location.reload();
      death.play();
      alive = false;
      if(score > highScore){
        highScore = score;
      }
      document.getElementById("finalScore").innerHTML = "Score : " + score;
      document.getElementById("bestScore").innerHTML = "Best: " + highScore;4
      $('#restartModal').modal("show");
    }

    if(pipe[i].x == coin){
      score++;
      scoreSound.play();
    }

  }

  ctx.drawImage(fg, 0,cvs.height - fg.height);

  ctx.drawImage(bird, bx, by);

  by += gravity;

  ctx.fillStyle = "*000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : " + score, 10, cvs.height - 20);
  if(alive)
    requestAnimationFrame(draw);
}

function restart(){
  alive = true; 
  score = 0;
  bx = 10;
  by = 150;
  pipe = [];
  pipe[0] = {
    x : cvs.width,
    y : 0
  };
 start();
}

document.getElementById("gravity").addEventListener("change", changeGravity);
function changeGravity(){
  gravity = parseInt(document.getElementById("gravity").value, 10);
}


document.getElementById("speed").addEventListener("change", changeSpeed);
function changeSpeed(){
  speed = parseInt(document.getElementById("speed").value, 10);
  if(speed == 2){
    pipeSpawn = 124;
    coin = 4;
  }
  if(speed == 3){
    pipeSpawn = 123;
    coin = 3;
  }
}

document.getElementById("gap").addEventListener("change", changeGap);
function changeGap(){
  var level = parseInt(document.getElementById("gap").value, 10);
  if(level == 1){
    gap = 80;
  } 
  if(level == 2){
    gap = 120;
  }
  if(level == 3){
    gap = 150;
  }
}

document.getElementById("jump").addEventListener("change", changeJump);
function changeJump(){
  var level = parseInt(document.getElementById("jump").value, 10);
  if(level == 1){
    jump = 30;
  } 
  if(level == 2){
    jump = 35;
  }
  if(level == 3){
    jump = 40;
  }
}

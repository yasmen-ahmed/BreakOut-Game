//DRAW THE CANVAS ELEMENT
let myCanvas = document.getElementById("myCanvas");
let ctx = myCanvas.getContext("2d");

/****************************************************************************/

// VARIABLE DECLARATION
let padd_Width = 150;
let padd_height = 20;
let padd_margin_bottom = 40;
let leftArrow = false;
let rightArrow = false;
document.addEventListener("mousemove", mouseMoveHandler);
const ballRadius = 10;
let avail_lives = 3;
let GAME_OVER = false;
let startScreen = document.getElementById("startScreen");
let learnScreen = document.getElementById("learnScreen");
let playBtn = document.getElementById("play");
let learnBtn = document.getElementById("learn");
let backToHome = document.getElementById("backToHome");
let exitBtn = document.getElementById("exitBtn");
let comeOn = document.getElementById("comeOn");

/****************************************************************************/
// THE gameStatus FUNCTIONS
let gameStatus = document.getElementById("gameStatus");
let wonGame = document.getElementById("wonGame");
let loseGame = document.getElementById("loseGame");
let playAgain = document.getElementById("playAgain");
let img = document.getElementById("sad-img");
let cup = document.getElementById("cup-img");

playAgain.addEventListener("click", function () {
  location.reload();
});

function youWon() {
  gameStatus.style.display = "block"; // still will be added in level done func
  cup.style.display = "block";
  wonGame.style.display = "block";
  playAgain.style.display = "block";
}

function youLost() {
  gameStatus.style.display = "block";
  loseGame.style.display = "block";
  img.style.display = "block";
  playAgain.style.display = "block";
}

/****************************************************************************/

//images
const images = {
  background: new Image(),
  ball: new Image(),
  score: new Image(),
  lives: new Image(),
  level: new Image(),
};

// IMAGES OF COMPONENTS
images.background.src = "./img/1876.jpg";
images.score.src = "./img/score.png";
images.lives.src = "./img/life.png";
images.level.src = "./img/level.png";

/****************************************************************************/

const game = {
  lives: 3,
  score: 0,
  level: 1,
  MAX_LEVEL: 3,
};

/****************************************************************************/

// CONTAINER TO STORE THE BRICKIS INSIDE IT
let brickContainer = [];

// BRICK PROPERTIES
let brick = {
  rows: 2,
  cols: 5,
  height: 30,
  width: function () {
    return (myCanvas.width - (this.cols + 1) * this.offsetLeft) / this.cols;
  },
  offsetLeft: 30,
  offsetTop: 30,
  marginTop: 100,
  fillColor: "#D92BAC",
  strokeColor: "#FFF",
};
/****************************************************************************/

// PADDLE PEOPERTIES
const padd = {
  x: myCanvas.width / 2 - padd_Width / 2,
  y: myCanvas.height - padd_height - padd_margin_bottom,
  height: padd_height,
  width: padd_Width,
  dx: 5,
};

/****************************************************************************/

// DRAWING THE PADDLE
function drawingPaddle() {
  ctx.fillStyle = "#CC456D";
  ctx.fillRect(padd.x, padd.y, padd.width, padd.height);
  ctx.strokeStyle = "white";
  ctx.strokeRect(padd.x, padd.y, padd.width, padd.height);
}

/****************************************************************************/

// MOVING THE PADDLE USING KEYBOARD
document.addEventListener("keydown", function (e) {
  if (e.keyCode == 37) {
    leftArrow = true;
  } else if (e.keyCode == 39) {
    rightArrow = true;
  }
});

document.addEventListener("keyup", function (e) {
  if (e.keyCode == 37) {
    leftArrow = false;
  } else if (e.keyCode == 39) {
    rightArrow = false;
  }
});

/***************************************************************************/

// MOVING THE PADDLE USING MOUSE

function mouseMoveHandler(e) {
  //position mouse in the middle of the paddle
  const relativeX = e.clientX - myCanvas.offsetLeft;
  if (
    relativeX - padd_Width / 2 > 0 &&
    relativeX + padd_Width / 2 < myCanvas.width
  ) {
    padd.x = relativeX - padd_Width / 2;
  }
}

/****************************************************************************/

// MOVING THE PADDLE RIGHT & LEFT
function movingPaddle() {
  if (rightArrow && padd.x + padd.width < myCanvas.width) {
    padd.x += padd.dx;
  } else if (leftArrow && padd.x > 0) {
    padd.x -= padd.dx;
  }
}

/****************************************************************************/

//CREATE BRICKS ON CANVAS AT COORDINATES X & Y
function createBricks() {
  for (let r = 0; r < brick.rows; r++) {
    brickContainer[r] = [];
    for (let c = 0; c < brick.cols; c++) {
      if (r % 3 == 0 && c % 2 == 0) {
        // FOR UNbreakable BRICK
        brickContainer[r][c] = {
          x: c * (brick.width() + brick.offsetLeft) + brick.offsetLeft,
          y:
            r * (brick.height + brick.offsetTop) +
            brick.offsetTop +
            brick.marginTop,
          breakable: false,
        };
      } else {
        // FOR breakable BRICK
        brickContainer[r][c] = {
          x: c * (brick.width() + brick.offsetLeft) + brick.offsetLeft,
          y:
            r * (brick.height + brick.offsetTop) +
            brick.offsetTop +
            brick.marginTop,
          status: true,
          breakable: true,
          hitsNum: 3,
        };
      }
    }
  }
}
createBricks();
/****************************************************************************/

//DRAW BRICKS ON CANVAS
function drawBricks() {
  for (let r = 0; r < brick.rows; r++) {
    for (let c = 0; c < brick.cols; c++) {
      const b = brickContainer[r][c];
      if (b.status && b.breakable) {
        if (b.hitsNum === 2) {
          ctx.fillStyle = "#9F24FF";
          ctx.strokeStyle = brick.strokeColor;
        } else if (b.hitsNum === 3) {
          ctx.fillStyle = brick.fillColor;
          ctx.strokeStyle = brick.strokeColor;
        }
        ctx.strokeRect(b.x, b.y, brick.width(), brick.height);
        ctx.fillRect(b.x, b.y, brick.width(), brick.height);
      } else if (b.breakable == false) {
        ctx.fillStyle = "white";
        ctx.fillRect(b.x, b.y, brick.width(), brick.height);
      }
    }
  }
}

/****************************************************************************/

// BALL PROPERTIES
const ball = {
  x: myCanvas.width / 2,
  y: padd.y - ballRadius,
  r: 10, //BALL RADIUS
  speed: 4,
  dx: 3 * (Math.random() * 2 - 1),
  dy: -3,
};

/****************************************************************************/

// DRAW THE BALL
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fillStyle = "#FFCD05";
  ctx.fill();
  ctx.strokeStyle = "white";
  ctx.stroke();
  ctx.closePath();
}

/****************************************************************************/

// MOVE THE BALL
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

moveBall();

/****************************************************************************/

// BALL AND WALL COLLISION DETECTION
function ballWallCollision() {
  if (ball.x + ballRadius > myCanvas.width || ball.x - ballRadius < 0) {
    ball.dx = -ball.dx;
    WALL_HIT.play(); //sound
  }

  if (ball.y - ballRadius < 0) {
    ball.dy = -ball.dy;
    WALL_HIT.play(); //sound
  }

  if (ball.y + ballRadius > myCanvas.height) {
    game.lives--;
    LIFE_LOST.play(); //sound
    resetBall();
  }
}
ballWallCollision();

/****************************************************************************/

// BALL AND PADDLE COLLISION DETECTION
function ballPaddleCollision() {
  if (
    ball.y > padd.y &&
    ball.y < padd.y + padd.height &&
    ball.x > padd.x &&
    ball.x < padd.x + padd.width
  ) {
    PADDLE_HIT.play(); //sound

    //WHRER THE BALL HIT THE PADDLE
    let collidePoint = ball.x - (padd.x + padd.width / 2);
    //NORMALIZE THE VALUE
    collidePoint = collidePoint / (padd.width / 2);
    //CALCULATE THE ANGLE OF THE BALL with THE Y DIRECTION
    let angle = (collidePoint * Math.PI) / 3;
    //CALCULATE THE NEW DIRECTION OF THE BALL
    ball.dx = ball.speed * Math.sin(angle);
    ball.dy = -ball.speed * Math.cos(angle);
  }
}

/****************************************************************************/

// BALL AND BRICKS COLLISION DETECTION
function ballBricksCollision() {
  for (let r = 0; r < brick.rows; r++) {
    for (let c = 0; c < brick.cols; c++) {
      let b = brickContainer[r][c];
      // c
      if (b.status && b.breakable) {
        if (
          ball.x + ball.r > b.x &&
          ball.x - ball.r < b.x + brick.width() &&
          ball.y - ball.r < b.y + brick.height &&
          ball.y + ball.r > b.y
        ) {
          BRICK_HIT.play(); //sound
          b.hitsNum--;
          ctx.fillStyle = "#9F24FF";
          ctx.fillRect(b.x, b.y, brick.width(), brick.height);
          ball.dy = -ball.dy;
          if (b.hitsNum == 1) {
            b.status = false;
            game.score += 10;
          }
        }
      } else if (b.breakable == false) {
        if (
          ball.x + ball.r > b.x &&
          ball.x - ball.r < b.x + brick.width() &&
          ball.y + ball.r > b.y &&
          ball.y - ball.r < b.y + brick.height
        ) {
          WALL_HIT.play();
          ball.dy = -ball.dy;
        }
      }
    }
  }
}

/****************************************************************************/

// //level up
function levelUp() {
  let isLevelDone = true;
  for (let r = 0; r < brick.rows; r++) {
    for (let c = 0; c < brick.cols; c++) {
      isLevelDone = isLevelDone && !brickContainer[r][c].status;
    }
  }
  if (isLevelDone) {
    WIN.play(); //sound
    if (game.level >= game.MAX_LEVEL) {
      youWon();
      GAME_OVER = true;
      return;
    }
    brick.rows++;
    createBricks();
    ball.speed += 0.5;
    resetBall();
    game.level++;
    COMPLETE_LEVEL.play(); //sound
  }
}
/****************************************************************************/

// RESET THE BALL
function resetBall() {
  ball.x = myCanvas.width / 2;
  ball.y = padd.y - ballRadius;
  ball.dx = 3 * (Math.random() * 2 - 1);
  ball.dy = -3;
}

// show game stats
function showGameStats(text, textX, textY, img, imgX, imgY) {
  // draw text
  ctx.fillStyle = "#FFF";
  ctx.font = "25px Germania One";
  ctx.fillText(text, textX, textY);
  // draw IMAGE
  ctx.drawImage(img, imgX, imgY, 25, 25);
}

/****************************************************************************/

//DRAW LIVES OF GAMER
function drawLives() {
  if (game.lives > 2) {
    ctx.drawImage(images.lives, myCanvas.width - 130, 12, 25, 25);
  }
  if (game.lives > 1) {
    ctx.drawImage(images.lives, myCanvas.width - 90, 12, 25, 25);
  }
  if (game.lives > 0) {
    ctx.drawImage(images.lives, myCanvas.width - 50, 12, 25, 25);
  }
}

/****************************************************************************/
let pause = document.getElementById("pauseBtn");
pause.addEventListener("click", mouseClickHandler, false); // Added as a way to restart the game upon loss or win
var gameState;
function mouseClickHandler(e) {
  if (gameState == "playing") {
    gameState = "pause";
    pause.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
    console.log(pause);
  } else if (gameState == "pause") {
    gameState = "playing";
    pause.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
    console.log(pause);
    animation();
  }
}

function drawPause() {}

/****************************************************************************/

// HOME PAGE
//PLAT GAME
playBtn.addEventListener("click", function clicking() {
  startScreen.style = "display:none";
  myCanvas.style = "display:block";
  gameState = "playing";
  animation();
});

// LEARN
learnBtn.addEventListener("click", function clicking() {
  startScreen.style = "display:none";
  myCanvas.style = "display:none";
  learnScreen.style = "display:block";
});

// BACK TO HOME FROM LEARN SCREEN
backToHome.addEventListener("click", function clicking() {
  location.reload();
});

// BACK TO HOME FROM PLAY GAME
exitBtn.addEventListener("click", function clicking() {
  location.reload();
});

// GO TO PLAY FROM LEARN SCREEN
comeOn.addEventListener("click", function () {
  learnScreen.style = "display:none";
  myCanvas.style = "display:block";
  gameState = "playing";
  animation();
});
/****************************************************************************/

// PAINT SHAPES ON CANVAS
function paint() {
  //CLEAR PREVIOUS FRAME
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  // DRAW SCORE
  showGameStats(game.score, 35, 30, images.score, 5, 9);
  // DRAW LEVELS
  showGameStats(
    game.level,
    myCanvas.width / 2,
    30,
    images.level,
    myCanvas.width / 2 - 30,
    8
  );

  drawLives();
  drawBricks();
  drawingPaddle();
  drawBall();
}

/****************************************************************************/
// GAME OVER FUNCTION

function gameOver() {
  if (game.lives <= 0) {
    youLost();
    GAME_OVER = true;
    GAME_OVER_sound.play(); //sound
  }
}
/****************************************************************************/

// THE UPDATE FUNCTIONS
function update() {
  gameOver();
  moveBall();
  movingPaddle();
  ballWallCollision();
  ballPaddleCollision();
  ballBricksCollision();
  levelUp();
}

/****************************************************************************/
//let  music= true ;
// THE GAME LOOP FUNCTIONS
function animation() {
  if (gameState == "playing") {
    paint();
    update();
    if (!GAME_OVER) {
      requestAnimationFrame(animation);
    }
  } else if (gameState == "pause") {
    drawPause();
  }
}
if (gameState == "playing") {
  animation();
}

//select sound
const soundElement = document.getElementById("sound");

soundElement.addEventListener("click", audioManager);

function audioManager() {
  // CHANGE IMAGE SOUND_ON/OFF
  let imgSrc = soundElement.getAttribute("src");
  let SOUND_IMG =
    imgSrc == "img/SOUND_ON.png" ? "img/SOUND_OFF.png" : "img/SOUND_ON.png";

  soundElement.setAttribute("src", SOUND_IMG);

  // MUTE AND UNMUTE SOUNDS
  WALL_HIT.muted = WALL_HIT.muted ? false : true;
  PADDLE_HIT.muted = PADDLE_HIT.muted ? false : true;
  BRICK_HIT.muted = BRICK_HIT.muted ? false : true;
  WIN.muted = WIN.muted ? false : true;
  LIFE_LOST.muted = LIFE_LOST.muted ? false : true;
  GAME_OVER_sound.muted = GAME_OVER_sound.muted ? false : true;
  COMPLETE_LEVEL.muted = COMPLETE_LEVEL.muted ? false : true;
}

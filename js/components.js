/// load images
//load background img
const BG_IMG = new Image();
BG_IMG.src = "img/BZYUrG.jpg";

//load level icon
const LEVEL_IMG = new Image();
LEVEL_IMG.src = "img/level.png";

//load life icon
const LIFE_IMG = new Image();
LIFE_IMG.src = "img/life.png";

//load score icon
const SCORE_IMG = new Image();
SCORE_IMG.src = "img/score.png";

//load sounds

//wall
const WALL_HIT = new Audio();
WALL_HIT.src = "sounds/wall.mp3";

//lost life
const LIFE_LOST = new Audio();
LIFE_LOST.src = "sounds/life_lost.mp3";

//paddle
const PADDLE_HIT = new Audio();
PADDLE_HIT.src = "sounds/paddle_hit.mp3";

//win
const WIN = new Audio();
WIN.src = "sounds/win.mp3";

//brick
const BRICK_HIT = new Audio();
BRICK_HIT.src = "sounds/brick_hit.mp3";

//game over
const GAME_OVER_sound = new Audio();
// GAME_OVER_sound.src = "sounds/يالهوىىىى.m4a";
GAME_OVER_sound.src = "sounds/game-over.mp3";

//complete level
const COMPLETE_LEVEL = new Audio();
COMPLETE_LEVEL.src = "sounds/level-completed.mp3";

//background song
const BG_SOUND = new Audio();
BG_SOUND.volume = 0.5;
BG_SOUND.src = "sounds/music.mp3";

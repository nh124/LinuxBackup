const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var width = (canvas.width = 640);
var height = (canvas.height = 480);

var INTERVAL = 50;
var DEBUG = false; //true;
var SpriteRow = 0; // Row of the graphic to show
var SpriteCol = 0; // Col of the graphic to show
var MaxSpriteRow = 8; // How many rows of images
var MaxSpriteCol = 8; // How many columns of images
var tileWidth = 32; // Size of each tile (32x32)
var tileHeight = 32;
var gameover = false;
var player1Score = 0;
var player2Score = 0;
var player2move = 0;

var WIDTH = 640; // of the canvas
var HEIGHT = 480; // of the canvas
var MAXROW = 15;
var MAXCOL = 20;
var moved = false; // Did a player move?
var SpriteWidth = 30; // Width, Height of each sprite
var SpriteHeight = 30;
var squareWidth = 32; // Width, Height of the tiles (squares)
var squareHeight = 32;
var myX1 = WIDTH - 63; // Where player 1 starts
var myY1 = 224; //
var myX2 = 32; // Where player 2 starts
var myY2 = myY1; //
var directionMoving = 0; // Code for direction
var moveAmount = 8; // How many pixels to move per update.
var squareWidth = 32; // Width, Height of the square
var squareHeight = 32;
var FONTSIZE = 32;
var LEFT_GOAL = FONTSIZE + 4;
var RIGHT_GOAL = WIDTH - (FONTSIZE + 4);
var FOOTBALL = 3; // Which graphic index has the football

var SpriteImage = new Image(); // Sprite sheet
SpriteImage.src = "Pounce2.png";

var Sprite2Image = new Image(); // Sprite sheet
Sprite2Image.src = "gasouthern.png";

var footballImage = new Image(); // Sheet of tiles
footballImage.src = "football3.png";

var myInterval;

var myarray = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0,
  1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1,
  0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1,
  0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0,
  0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0,
  1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0,
  0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1,
  1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

var Direction = {
  LEFT: 0,
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
  NONE: 4,
};

//
// Change the background screen color to green.
//
function green() {
  document.bgColor = "#0f6000";
  Fill = "#0f6000";
}

function blue() {
  document.bgColor = "#000f60";
  Fill = "#0f6000";
}

function red() {
  document.bgColor = "#f60000";
  Fill = "#0f6000";
}

function grey() {
  document.bgColor = "#777777";
  Fill = "#777777";
}

// Erase the canvas
function eraseCanvas() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

// Erase a single tile from the canvas
function eraseTile(r, c, tileWidth, tileHeight) {
  // Where it goes on the canvas
  ctx.clearRect(c * tileWidth, r * tileHeight, tileWidth, tileHeight);
}

function eraseSprite(tempX, tempY) {
  // erase sprite
  ctx.clearRect(tempX, tempY, SpriteWidth, SpriteHeight);
}

// Draw a single tile on the canvas.
// tile is a code (e.g. 2) that specifies the tile to draw.
// r, c specify the row, column of where the tile should go.
function drawTile(tile, r, c, tileWidth, tileHeight) {
  ctx.drawImage(
    footballImage,
    // What part of the image (0 because there is only one row of tiles)
    tile * tileWidth,
    0,
    tileWidth,
    tileHeight,
    // Where it goes on the canvas
    c * tileWidth,
    r * tileHeight,
    tileWidth,
    tileHeight
  );
}

// Look at each tile location, and draw the tile on the canvas.
function drawTiles() {
  var index = 0;

  for (var r = 0; r < MAXROW; r++) {
    for (var c = 0; c < MAXCOL; c++) {
      tile = myarray[index]; // [r* MAXCOL + c];
      drawTile(tile, r, c, tileWidth, tileHeight);

      index++;
    }
  }
}

function drawSprite(number, tempX, tempY) {
  // console.log("Draw the sprite at " + tempX + ", " + tempY);
  if (number == 1) {
    ctx.drawImage(SpriteImage, tempX, tempY);
  } else {
    ctx.drawImage(Sprite2Image, tempX, tempY);
  }
}

function Tick() {
  movePlayer2();
  if (moved) {
    moved = false;
  }
}

function loadComplete() {
  console.log("Load is complete.");
  console.log("Start a game interval");
  myInterval = self.setInterval(function () {
    Tick();
  }, INTERVAL);
}

// Do the new coordinates cause a collision?
function checkCollision(player, newX, newY) {
  // Use floor since result should be integer
  var tempRow = Math.floor(newY / tileHeight);
  var tempCol = Math.floor(newX / tileWidth);
  // So tempRow, tempCol are integer offsets into array.
  if (myarray[tempRow * MAXCOL + tempCol] == FOOTBALL) {
    // Add 1 to the score.
    if (player == 1) player1Score += 3;
    else player2Score += 3;
    updateScore();

    // console.log(stringifyTiles());

    // Delete the football
    myarray[tempRow * MAXCOL + tempCol] = 0; // Remove it from the array
    // console.log("erase tile at " + tempRow + ", " + tempCol);
    eraseTile(tempRow, tempCol, tileWidth, tileHeight);

    return true;
  }

  // Is there a non-0 feature there?
  if (myarray[tempRow * MAXCOL + tempCol] == 0) return true;

  return false;
}

// Show the upper left tile
// under player 2 (debugging function)
function ultile() {
  // Draw a tile under the upper-left corner of the player2
  // Use floor since result should be integer
  var tempRow = Math.floor(myY2 / tileHeight);
  var tempCol = Math.floor(myX2 / tileWidth);
  drawTile(2, tempRow, tempCol, tileWidth, tileHeight);
}

// Show the upper right tile
// under player 2 (debugging function)
function urtile() {
  // Draw a tile under the upper-right corner of the player2
  // Use floor since result should be integer
  var tempRow = Math.floor(myY2 / tileHeight);
  var tempCol = Math.floor((myX2 + SpriteWidth) / tileWidth);
  drawTile(4, tempRow, tempCol, tileWidth, tileHeight);
}

// Show the lower left tile
// under player 2 (debugging function)
function lltile() {
  // Draw a tile under the upper-left corner of the player2
  // Use floor since result should be integer
  var tempRow = Math.floor((myY2 + SpriteHeight) / tileHeight);
  var tempCol = Math.floor(myX2 / tileWidth);
  drawTile(5, tempRow, tempCol, tileWidth, tileHeight);
}

// Show the lower right tile
// under player 2 (debugging function)
function lrtile() {
  // Draw a tile under the upper-left corner of the player2
  // Use floor since result should be integer
  var tempRow = Math.floor((myY2 + SpriteHeight) / tileHeight);
  var tempCol = Math.floor((myX2 + SpriteWidth) / tileWidth);
  drawTile(6, tempRow, tempCol, tileWidth, tileHeight);
}

function movePlayer2() {
  // Remember the old x,y values
  var newX2 = myX2;
  var newY2 = myY2;

  // Check all possible moves by looking at the 2 corners.
  // corners are
  //     X,Y           X+width,Y
  //     X,Y+height    X+width,Y+height
  // e.g. if we move right, we need to check X+width+delta,Y and
  //   X+width+delta,Y+height, the 2 corners on the right side.
  var canImoveLeft =
    checkCollision(2, myX2 - moveAmount, myY2) &&
    checkCollision(2, myX2 - moveAmount, myY2 + SpriteHeight);
  var canImoveRight =
    checkCollision(2, myX2 + SpriteWidth + moveAmount, myY2) &&
    checkCollision(2, myX2 + SpriteWidth + moveAmount, myY2 + SpriteHeight);
  var canImoveUp =
    checkCollision(2, myX2, myY2 - moveAmount) &&
    checkCollision(2, myX2 + SpriteWidth, myY2 - moveAmount);
  var canImoveDown =
    checkCollision(2, myX2, myY2 + SpriteHeight + moveAmount) &&
    checkCollision(2, myX2 + SpriteWidth, myY2 + SpriteHeight + moveAmount);

  // Can this sprite continue moving in the same dir?
  var canMoveSameDir = false;
  switch (directionMoving) {
    case Direction.LEFT:
      // moving left
      canMoveSameDir = canImoveLeft;
      break;
    case Direction.UP:
      // moving up
      canMoveSameDir = canImoveUp;
      break;
    case Direction.RIGHT:
      // moving right
      canMoveSameDir = canImoveRight;
      break;
    case Direction.DOWN:
      // moving down
      canMoveSameDir = canImoveDown;
      break;
  }

  // How far is player from this NPC?
  var dx = myX2 - myX1;
  var dy = myY2 - myY1;

  // agent's preference for direction
  var myPreference = [0, 1, 2, 3];
  // Assume we cannot move that way
  var myPrefAbility = [false, false, false, false];

  // If we can move any dir, which is the 1st choice?
  if (Math.abs(dx) > Math.abs(dy)) {
    // Player1 is further away along X
    if (dx > 0) {
      // Try to move left
      myPreference[0] = Direction.LEFT;
      myPrefAbility[0] = canImoveLeft;
      // Try not to move right
      myPreference[3] = Direction.RIGHT;
      myPrefAbility[3] = canImoveRight;
    } else {
      // Try to move right
      myPreference[0] = Direction.RIGHT;
      myPrefAbility[0] = canImoveRight;
      // Try not to move left
      myPreference[3] = Direction.LEFT;
      myPrefAbility[3] = canImoveLeft;
    }
    // Now figure out the secondary preferences
    if (dy > 0) {
      // Try to move up
      myPreference[1] = Direction.UP;
      myPrefAbility[1] = canImoveUp;
      // Try not to move down
      myPreference[2] = Direction.DOWN;
      myPrefAbility[2] = canImoveDown;
    } else {
      // Try to move down
      myPreference[1] = Direction.DOWN;
      myPrefAbility[1] = canImoveDown;
      // Try not to move up
      myPreference[2] = Direction.UP;
      myPrefAbility[2] = canImoveUp;
    }
  } else {
    // Player1 is further away along Y (or equi-distant)
    if (dy > 0) {
      // Try to move up
      myPreference[0] = Direction.UP;
      myPrefAbility[0] = canImoveUp;
      // Try not to move down
      myPreference[3] = Direction.DOWN;
      myPrefAbility[3] = canImoveDown;
    } else {
      // Try to move down
      myPreference[0] = Direction.DOWN;
      myPrefAbility[0] = canImoveDown;
      // Try not to move up
      myPreference[3] = Direction.UP;
      myPrefAbility[3] = canImoveUp;
    }
    // Now figure out the secondary preferences
    if (dx > 0) {
      // Try to move left
      myPreference[1] = Direction.LEFT;
      myPrefAbility[1] = canImoveLeft;
      // Try not to move right
      myPreference[2] = Direction.RIGHT;
      myPrefAbility[2] = canImoveRight;
    } else {
      // Try to move right
      myPreference[1] = Direction.RIGHT;
      myPrefAbility[1] = canImoveRight;
      // Try not to move left
      myPreference[2] = Direction.LEFT;
      myPrefAbility[2] = canImoveLeft;
    }
  }

  // attempt to move
  // Choose the best move that we can make
  //var player2move = 0;
  var m = 0;
  while (m < myPrefAbility.length && !myPrefAbility[m]) {
    m++;
  }
  player2move = myPreference[m];

  // Implement the move
  switch (player2move) {
    case Direction.LEFT:
      // Go left, player 2
      newX2 = newX2 - moveAmount;
      if (newX2 < 0) newX2 = 0;
      directionMoving = 0;
      break;
    case Direction.UP:
      // Go up, player 2
      newY2 = newY2 - moveAmount;
      if (newY2 < 0) newY2 = 0;
      directionMoving = 1;
      break;
    case Direction.RIGHT:
      // Go right, player 2
      newX2 = newX2 + moveAmount;
      if (newX2 + squareWidth > WIDTH) newX2 = WIDTH - squareWidth;
      directionMoving = 2;
      break;
    case Direction.DOWN:
      // Go down, player 2
      newY2 = newY2 + moveAmount;
      if (newY2 + squareHeight > HEIGHT) newY2 = HEIGHT - squareWidth;
      directionMoving = 3;
      break;
  }
  if (
    checkCollision(2, newX2, newY2) &&
    checkCollision(2, newX2 + SpriteWidth, newY2) &&
    checkCollision(2, newX2, newY2 + SpriteHeight) &&
    checkCollision(2, newX2 + SpriteWidth, newY2 + SpriteHeight)
  ) {
    eraseSprite(myX2, myY2);
    myX2 = newX2;
    myY2 = newY2;
    drawSprite(2, myX2, myY2);
    // Did player 2 win?
    /*
    } else {
      if (!checkCollision(2, newX2, newY2))
        console.log("cannot move p2, code " + player2move 
          + " up left blocked");
      else if (!checkCollision(2, newX2 + SpriteWidth, newY2))
        console.log("cannot move p2, code " + player2move 
          + " up right blocked");
      else if (!checkCollision(2, newX2, newY2 + SpriteHeight))
        console.log("cannot move p2, code " + player2move 
          + " down left blocked");
      else if (!checkCollision(2, newX2 + SpriteWidth, newY2 + SpriteHeight))
        console.log("cannot move p2, code " + player2move 
          + " down right blocked");
*/
  }
}

// What to do when the user presses a key.
function whenKeyPressed(key) {
  // Erase the sprites from its current location.
  if (!gameover) {
    eraseSprite(myX1, myY1);
  }
  // Remember the old x,y values
  var newX1 = myX1;
  var newY1 = myY1;

  switch (key) {
    case 28: // Right arrow was pressed
      // Go right, player 1
      newX1 = newX1 + moveAmount;
      if (newX1 + squareWidth > WIDTH) newX1 = WIDTH - squareWidth;
      moved = true;
      break;
    case 29: // Left arrow, ASCII 29
      // Go left, player 1
      newX1 = newX1 - moveAmount;
      if (newX1 < 0) newX1 = 0;
      moved = true;
      break;
    case 30: // Up arrow was pressed
      // Go up, player 1
      newY1 = newY1 - moveAmount;
      if (newY1 < 0) newY1 = 0;
      moved = true;
      break;
    case 31: // Down arrow was pressed
      // Go down, player 1
      newY1 = newY1 + moveAmount;
      if (newY1 + squareHeight > HEIGHT) newY1 = HEIGHT - squareWidth;
      moved = true;
      break;
    case 65: // A key
      // Go left, player 2
      newX2 = newX2 - moveAmount;
      if (newX2 < 0) newX2 = 0;
      moved = true;
      break;
    case 68: // D key
      // Go right, player 2
      newX2 = newX2 + moveAmount;
      if (newX2 + squareWidth > WIDTH) newX2 = WIDTH - squareWidth;
      moved = true;
      break;
    case 83: // S key
      // Go down, player 2
      newY2 = newY2 + moveAmount;
      if (newY2 + squareHeight > HEIGHT) newY2 = HEIGHT - squareWidth;
      moved = true;
      break;
    case 87: // W key
      // Go up, player 2
      newY2 = newY2 - moveAmount;
      if (newY2 < 0) newY2 = 0;
      moved = true;
      break;
  }

  // Do not move if game is over.
  if (!gameover) {
    // Check the new coords
    // newX, newY is just the upper-left corner.
    // Also check the upper-right, lower-left, and lower-right corners.
    if (
      checkCollision(1, newX1, newY1) &&
      checkCollision(1, newX1 + SpriteWidth, newY1) &&
      checkCollision(1, newX1, newY1 + SpriteHeight) &&
      checkCollision(1, newX1 + SpriteWidth, newY1 + SpriteHeight)
    ) {
      myX1 = newX1;
      myY1 = newY1;
      // Did player 1 win?
      if (myX1 < LEFT_GOAL) {
        player1Score += 6;
        gameover = true;
        whowon();
      }
    } else {
      console.log("player 1 could not move there " + newX1 + ", " + newY1);
    }
    drawSprite(1, myX1, myY1);
  }
}

document["onkeydown"] = function (event) {
  event = event || window.event;
  var key = event.which || event.cursor;
  // Check for a special key value.
  switch (key) {
    case 37: // Left arrow
      key = 29;
      break;
    case 38: // Up arrow
      key = 30;
      break;
    case 39: // Right arrow
      key = 28;
      break;
    case 40: // Down arrow
      key = 31;
      break;
  }
  whenKeyPressed(key);
};

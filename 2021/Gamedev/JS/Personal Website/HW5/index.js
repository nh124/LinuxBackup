// Width and height of the canvas
var width = 640;
var height = 480;
var ctx; // used to access the canvas
var canvas; 
interval = 50;
var gameBoard = [];
// width and height of the tiles
var tileWidth = 32;
var tileHeight = 32;
// Score for both players
Score_of_player1 = 0;
Score_of_player2 = 0;
//width and height of sprites
var sp_width = 32;
var sp_height = 32;
// the size of the game
var maxRow = 15;
var maxCol = 20;

var p1_XMovement = 100;
var p1_YMovement = 0;

var p2_XMovement = 100;
var p2_YMovement = 0;

// starting position of both players
var p1_startingPosX = width - p1_XMovement;
var p1_startingPosY = Math.floor(height/2);

var p2_startingPosX = p2_XMovement;
var p2_startingPosY = Math.floor(height/2) + p2_YMovement;

// The player will move 10 pixels per key press
var move_per_press = 10;

var fontsize = 32;
var left_goal = (fontsize+4);
var right_goal = width - (fontsize+4);

// val to represent a football
var football = 3;

var spriteRow = 0;
var spriteCol = 0;

var player1Sp = new Image();
player1Sp.src = "Pounce2.png";

var player2Sp = new Image();
player2Sp.src = "gasouthern.png";

var footBall = new Image();
footBall.src = "football.png";

for(var i = 0; i < (maxRow*maxCol); i++){
    if(i < maxCol){
        gameBoard[i] = 1;
    }else if(i > ((maxRow-1)*maxCol)-1){
      gameBoard[i] = 1;
    }else{
        gameBoard[i] = 0;
    }   
}



// function to change color 
function green() {
    document.bgColor = "#0f6000";
  }
  
function blue() {
    document.bgColor = "#000f60";
}
  
function red() {
    document.bgColor = "#f60000";
}
  
function grey() {
    document.bgColor = "#777777";
}

function eraseTile(r, c, tileWidth, tileHeight) {
    ctx.clearRect(c*tileWidth, r*tileHeight, tileWidth, tileHeight);
}

  

function draw_1_Tile(tile, r, c, tileWidth, tileHeight){
    ctx.drawImage(footBall, tile*tileWidth, 0, tileWidth, tileHeight, c*tileWidth, r*tileHeight, tileWidth, tileHeight);
}

function drawTiles(){
    var i = 0;
    for(var r = 0; r < maxRow; r++){
        for(var c = 0; c < maxCol; c++){
            tile = gameBoard[i];
            draw_1_Tile(tile,r,c, tileWidth, tileHeight);
        }
        i++;
    }
}

function draw_Sprite1(number, tempX, tempY){
    ctx.drawImage(player1Sp, tempX, tempY);
}
function draw_Sprite2(number, tempX, tempY){
    ctx.drawImage(player2Sp, tempX, tempY);
}


function updateScore(player) {
  if(player == 1)
    document.getElementById("player1stat").innerHTML = "Player 1: " + Score_of_player1;
  else
    document.getElementById("player2stat").innerHTML = "Player 2: " + Score_of_player2;
}


function whoWon() {
    updateScore();
    if (Score_of_player1 > Score_of_player2)
       blue();
    else if (Score_of_player2 > Score_of_player1)
       red();
    else 
       grey(); // Tie game
}

function drawEndZones(){
    ctx.fillStyle = "white";
    ctx.font = "bold" + fontsize + "px Arial";

    ctx.fillStyle = "white";
    //ctx.font = "bold 32px Arial";
    ctx.font = "bold " + fontsize + "px Arial";
    // This code is based on an example from
    // from https://stackoverflow.com/questions/20866249/rotate-text-in-a-canvas-with-javascript
      // left side
      var r = -90*Math.PI/180;
      ctx.save();
      ctx.rotate(r);
      ctx.translate(-282, fontsize); 
      ctx.fillText("Goal",0,0);
      ctx.restore();
      // right side
      r = 90*Math.PI/180;
      ctx.save();
      ctx.translate(width - fontsize,220);
      ctx.rotate(r);
      ctx.fillText("Goal",0,0); 
      ctx.restore();
    // end from stackoverflow.com
  
    // Draw lines on either side
    // Along left side
    ctx.strokeStyle = "#fff";
    // to the left of "goal"
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height-1);
    ctx.stroke();
    // to the right of "goal"
    ctx.moveTo(left_goal, 0);
    ctx.lineTo(left_goal, height-1);
    ctx.stroke();
  
    // Along right side
    // to the left of "goal"
    ctx.moveTo(right_goal, 0);
    ctx.lineTo(right_goal, height-1);
    ctx.stroke();
    // to the right of "goal"
    ctx.moveTo(width, 0);
    ctx.lineTo(width, height-1);
    ctx.stroke();
}

function addingAFootball(){
    var RR_of_Football;
    var RC_of_Football;
    RR_of_Football = 1 + (Math.random() * (maxRow-3));
    RC_of_Football = 1 + (Math.random() * (maxCol -3));
    gameBoard[RR_of_Football * maxCol + RC_of_Football] = 3;
}

function deleteFootball(tempRow, tempCol){
    gameBoard[tempRow * tempCol + tempCol] = 0;
}

function checkCollision(player, newX, newY) {
  // Use floor since result should be integer
  var tempRow = Math.floor(newY / tileWidth);
  var tempCol = Math.floor(newX / tileHeight);
  // So tempRow, tempCol are integer offsets into array.

  if (gameBoard[tempRow * maxCol + tempCol] == football) {
    // Add 1 to the score.
    if (player == 1){
      Score_of_player1 += 3;
    }else{
      Score_of_player2 += 3;
    }
    updateScore(1);
    updateScore(2);
    // console.log(stringifyTiles());

    // Delete the football
    gameBoard[tempRow * maxCol + tempCol] = 0;  // Remove it from the array
    // console.log("erase tile at " + tempRow + ", " + tempCol);
    eraseTile(tempRow, tempCol, tileWidth, tileHeight);

    return true;
  } 

  // Is there a non-0 feature there?
  if (gameBoard[tempRow * maxCol + tempCol] == 0)
    return true;

  return false;
}



function addAFootball() {
  // populate a random football
  var tempRow, tempCol;
  tempRow = 5 + Math.round(Math.random() * (maxRow-5));
  tempCol = 5 + Math.round(Math.random() * (maxCol-5));
  // 3 is the code for the football tile.
  gameBoard[tempRow * maxRow + tempCol] = 3;
}

function drawTiles() {
  var index = 0;

  for (var r=0; r<maxRow; r++) {
    for (var c=0; c<maxCol; c++) {
      tile = gameBoard[index]; // [r* MAXCOL + c];
      draw_1_Tile(tile, r, c, tileWidth, tileHeight);

      index++;
    }
  }
}


function loadComplete() {
    console.log("Load is complete."); 
    canvas = document.getElementById("theCanvas");
    ctx = canvas.getContext("2d");
    green();
    drawEndZones();
    draw_Sprite1(1,p1_startingPosX, p1_startingPosY);
    draw_Sprite2(2,p2_startingPosX, p2_startingPosY);

    numberOFFootballs = Math.floor(Math.random() * Math.abs(30-10) + 10);
    for(var i = 0; i < numberOFFootballs; i++) {
      addAFootball();
    }
    drawTiles();
    // my_Interval = self.setInterval(function(){Tick()}, interval);
}

function eraseSprite(tempX, tempY) {
  // erase sprite
  ctx.clearRect(tempX, tempY, sp_width, sp_height);
}

function victorOfPlayer2(playerPosX){
  if(playerPosX > 580){
    whoWon();
  }
}
function victorOfPlayer1(playerPosX){
  if(playerPosX < 40){
    whoWon();
  }
}

// up, down, left, right
function Player1(key) {
  switch (key) {
    // ---------------------------------------------------------------------------------------------//
    case 28:  // Right arrow was pressed
      eraseSprite(p1_startingPosX, p1_startingPosY);
      p1_startingPosX += 10;
      draw_Sprite1(1, p1_startingPosX, p1_startingPosY);
      checkCollision(1, p1_startingPosX, p1_startingPosY);
      victorOfPlayer1(p1_startingPosX);
      break;
    // ---------------------------------------------------------------------------------------------//    
    case 29:  // Left arrow, ASCII 29 
      eraseSprite(p1_startingPosX, p1_startingPosY);
      p1_startingPosX -=  10;
      draw_Sprite1(1, p1_startingPosX, p1_startingPosY);
      checkCollision(1, p1_startingPosX, p1_startingPosY);
      victorOfPlayer1(p1_startingPosX);
      break; 
    // ---------------------------------------------------------------------------------------------//
    case 30:  // Up arrow was pressed 
      // Go up a row
      eraseSprite(p1_startingPosX, p1_startingPosY);
      p1_startingPosY -= 10;
      draw_Sprite1(1, p1_startingPosX, p1_startingPosY);
      checkCollision(1, p1_startingPosX, p1_startingPosY);
      victorOfPlayer1(p1_startingPosX);
      break;
    // ---------------------------------------------------------------------------------------------//
    case 31:  // Down arrow was pressed 
      eraseSprite(p1_startingPosX, p1_startingPosY);
      p1_startingPosY += 10;
      draw_Sprite1(1, p1_startingPosX, p1_startingPosY);
      checkCollision(1, p1_startingPosX, p1_startingPosY);
      victorOfPlayer1(p1_startingPosX);
      break;
    
    //-Player 2-------------------------------------------------------------------------------------------------//
    case 42:  // Right arrow was pressed
        eraseSprite(p2_startingPosX, p2_startingPosY);
        p2_startingPosX += 10;
        console.log("p2_startingPosX = " + p2_startingPosX);
        draw_Sprite2(2, p2_startingPosX, p2_startingPosY);
        checkCollision(2, p2_startingPosX, p2_startingPosY);
        victorOfPlayer2(p2_startingPosX);
      break;
    case 40:  // Left arrow, ASCII 29 
        eraseSprite(p2_startingPosX, p2_startingPosY);
        p2_startingPosX -=  10;
        draw_Sprite2(2, p2_startingPosX, p2_startingPosY);
        checkCollision(2, p2_startingPosX, p2_startingPosY);
        victorOfPlayer2(p2_startingPosX);
      break; 
    case 41:  // Up arrow was pressed 
        eraseSprite(p2_startingPosX, p2_startingPosY);
        p2_startingPosY -= 10;
        draw_Sprite2(2, p2_startingPosX, p2_startingPosY);
        checkCollision(2, p2_startingPosX, p2_startingPosY);
        victorOfPlayer2(p2_startingPosX);
      break;
    case 43:  // Down arrow was pressed 
        eraseSprite(p2_startingPosX, p2_startingPosY);
        p2_startingPosY += 10;
        draw_Sprite2(2, p2_startingPosX, p2_startingPosY);
        checkCollision(2, p2_startingPosX, p2_startingPosY);
        victorOfPlayer2(p2_startingPosX);
      break;
  }
}





document['onkeydown'] = function(event) {
  event = event || window.event;
  var key = event.which || event.cursor;
  // Check for a special key value, and map it to ASCII.
  switch (key) {
    case 37:  // Left arrow, ASCII 29 
      key = 29;
      break;
    case 38:  // Up arrow, ASCII 30
      key = 30;
      break;
    case 39:  // Right arrow, ASCII 28  
      key = 28;
      break; 
    case 40:  // Down arrow, ASCII 31
      key = 31;
      break;
  }

  switch (key) {
    case 65:  // Left arrow, ASCII 29 A
      key = 40; //left
      break;
    case 87:  // Up arrow, ASCII 30 W
      key = 41; //up
      break;
    case 68:  // Right arrow, ASCII 28  D
      key = 42; // right
      break; 
    case 83:  // Down arrow, ASCII 31 S
      key = 43; //down
      break;
  }


  //document.getElementById("keydown").innerHTML =
  //  " key Down event, keycode " + key;
  Player1(key);
  // Player2(key);
 
  
};




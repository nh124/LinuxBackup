const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var width = canvas.width = 640;
var height = canvas.height = 480;

interval = 50;
var gameBoard = [];
var tileWidth = 32;
var tileHeight = 32;
var sp_width;
var sp_height;
var maxRow = 15;
var maxCol = 20;
var G_width;
var G_height;
G_width = G_height = sp_width = sp_height = 22;
var move_per_press = 10;
var spritePosX = 50;
var spritePosY = 50;
var mazeWall = 1; 
var goalGrabX = 0;
var goalGrabY = 0;
var goalGrabSizeW = 34;
var goalGrabSizeH = 40;
var sizeOfPlacementW = 25;
var sizeOfPlacementH = 32;
var playerPoints = 0;
var goalPos1X = 570;
var goalPos1Y = 400;
var goalPos2X = 470;
var goalPos2Y = 400;
var goalPos3X = 160;
var goalPos3Y = 310;
var goalPos4X = 40;
var goalPos4Y = 220;

var footBall = new Image();
footBall.src = "football.png";

var sp1 = new Image();
sp1.src = "Pounce2.png";

var goal = new Image();
goal.src = "Flag.png";


for(var i = 0; i < (maxRow*maxCol); i++){
    if(i < maxCol){
        gameBoard[i] = 1;
    }else if(i > ((maxRow-1)*maxCol)-1){
      gameBoard[i] = 1;
    }else if(i % 20 == 0){
        gameBoard[i] = 1;
        gameBoard[i-1] = 1;
    }else{  
        gameBoard[i] = 0;
    }   
}
gameBoard[279] = 1;



function lineCV(startingPos, endingPos){
    while(startingPos <= endingPos){
        gameBoard[startingPos] = 1;
        startingPos += 20;
    }
}
function lineCH(startingPos, endingPos){
    while(startingPos <= endingPos){
        gameBoard[startingPos] = 1;
        startingPos++;
    }
}

function maze(){   
    lineCH(60,63);
    lineCH(100,107);
    lineCH(70,71);
    lineCH(164,170);
    lineCH(94,96);
    lineCH(223,236);
    lineCV(26,46);
    lineCV(163, 204);
    lineCV(91,190);
    lineCV(114, 234);
    lineCV(56, 96);
    lineCV(236, 286);
}

function drawFlag(goalPosX, goalPosY){
    ctx.drawImage(goal, 
        goalGrabX ,goalGrabY, // how how of the sprite sheet im grabbing
        goalGrabSizeW,goalGrabSizeH, // how big the grab should be
        goalPosX,goalPosY, // where to place the grab
        sizeOfPlacementW,sizeOfPlacementH); // size of the placement
}

function drawSprite(SPx, SPy){
    ctx.drawImage(sp1, SPx, SPy, sp_width, sp_height );
}
function eraseSprite(SPx, SPy) {
    ctx.clearRect(SPx, SPy, sp_width, sp_height);
}

function draw_1_Tile(tile, r, c, tileWidth, tileHeight){
    ctx.drawImage(footBall, tile*tileWidth-1, 0, tileWidth, tileHeight, c*tileWidth, r*tileHeight, tileWidth, tileHeight);
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

function checkCollisionRight(newX, newY) {
    // Use floor since result should be integer
    var tempRow = Math.floor(newY / tileWidth);
    var tempCol = Math.floor(newX / tileHeight);
    // So tempRow, tempCol are integer offsets into array.
    if (gameBoard[(tempRow * maxCol + tempCol)+1] == mazeWall) {
        spritePosX -= 10;
    }   
}

function checkCollisionLeft(newX, newY) {
    // Use floor since result should be integer
    var tempRow = Math.floor(newY / tileWidth);
    var tempCol = Math.floor(newX / tileHeight);
    // So tempRow, tempCol are integer offsets into array.    
    if (gameBoard[(tempRow * maxCol + tempCol)] == mazeWall) {
        spritePosX += 10;
    }   
}

function checkCollisionUp(newX, newY) {
    // Use floor since result should be integer
    var tempRow = Math.floor(newY / tileWidth);
    var tempCol = Math.floor(newX / tileHeight);
    // So tempRow, tempCol are integer offsets into array.
   
    
    if (gameBoard[(tempRow * maxCol + tempCol)] == mazeWall) {
        spritePosY += 10;
    }   
}

function checkCollisionDown(newX, newY) {
    // Use floor since result should be integer
    var tempRow = Math.floor(newY / tileWidth);
    var tempCol = Math.floor(newX / tileHeight);
    // So tempRow, tempCol are integer offsets into array.

    if (gameBoard[(tempRow * maxCol + tempCol)+20] == mazeWall) {
        spritePosY -= 10;
    }   
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




function eraseGoal(Gx, Gy) {
    ctx.clearRect(Gx, Gy, sizeOfPlacementW, sizeOfPlacementH);
}

function updateScore(){
    document.getElementById("points").innerHTML = "Player 1: " + playerPoints;
}

function loadComplete() {
    console.log("Load is complete."); 
    maze();
    drawFlag(goalPos1X, goalPos1Y);
    drawFlag(goalPos2X, goalPos2Y);
    drawFlag(goalPos3X, goalPos3Y);
    drawFlag(goalPos4X, goalPos4Y);
    drawSprite(spritePosX, spritePosY);
    drawTiles();
  
}

function collectingPoints(pPosX, pPosY){
    if((pPosX == goalPos1X && pPosY == goalPos1Y)){
        playerPoints += 5;
        eraseGoal(pPosX, pPosY);
        goalPos1X = 0;
        goalPos1Y = 0;
        updateScore();
        if(playerPoints > 15){
            document.getElementById('win').style.visibility='visible';
            document.getElementById('win').innerHTML= "YOU WIN WITH A SCORE OF: " + playerPoints;
        }
    }
    if((pPosX == goalPos2X && pPosY == goalPos2Y) ){
        playerPoints += 5;
        eraseGoal(pPosX, pPosY);
        goalPos2X = 0;
        goalPos2Y = 0;
        updateScore();
        if(playerPoints > 15){
            document.getElementById('win').style.visibility='visible';
            document.getElementById('win').innerHTML= "YOU WIN WITH A SCORE OF: " + playerPoints;
        }
    }
    if((pPosX == goalPos3X && pPosY == goalPos3Y)){
        playerPoints += 5;
        eraseGoal(pPosX, pPosY);
        goalPos3X = 0;
        goalPos3Y = 0;
        updateScore();
        if(playerPoints > 15){
            document.getElementById('win').style.visibility='visible';
            document.getElementById('win').innerHTML= "YOU WIN WITH A SCORE OF: " + playerPoints;
        }
    }
    if((pPosX == goalPos4X && pPosY == goalPos4Y)){
        playerPoints += 5;
        eraseGoal(pPosX, pPosY);
        goalPos4X = 0;
        goalPos4Y = 0;
        updateScore();
        if(playerPoints > 15){
            document.getElementById('win').style.visibility='visible';
            document.getElementById('win').innerHTML= "YOU WIN WITH A SCORE OF: " + playerPoints;
        }
    }
    

    
}

function keyPress(key){
    switch (key){
        case 28:
            eraseSprite(spritePosX, spritePosY);
            spritePosX+=10; 
            checkCollisionRight(spritePosX, spritePosY);
            collectingPoints(spritePosX, spritePosY);
            drawSprite(spritePosX, spritePosY);
            break;
        case 29: 
            eraseSprite(spritePosX, spritePosY);
            spritePosX-=10; 
            checkCollisionLeft(spritePosX, spritePosY);
            collectingPoints(spritePosX, spritePosY);
            drawSprite(spritePosX, spritePosY);
            break;
        case 30: 
            eraseSprite(spritePosX, spritePosY);
            spritePosY-=10; 
            checkCollisionUp(spritePosX, spritePosY);
            collectingPoints(spritePosX, spritePosY);
            drawSprite(spritePosX, spritePosY);
            break;
        case 31:
            eraseSprite(spritePosX, spritePosY);
            spritePosY+=10; 
            checkCollisionDown(spritePosX, spritePosY);
            
            drawSprite(spritePosX, spritePosY);
            break;
    }
}


document['onkeydown'] = function(event) {
    event = event || window.event;
    var key = event.which || event.cursor;

    switch (key) {
        case 37:
            key = 29;
            break;
        case 38:
            key = 30;
            break;
        case 39:
            key = 28;
            break;
        case 40:
            key = 31;
            break;
    }
    keyPress(key);
}


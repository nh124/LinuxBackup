var interval = 50;
var debug = false;

var canvas;
var ctx;

var spriteRow = 0;
var spriteCol = 0;
var spriteRow_lim = 8;
var spriteCol_lim = 8;

var spriteX = 100;
var spriteY = 100;
var spriteWidth = 32;
var spriteHeight = 32;
var my_Interval;


var spriteImage = new Image();
spriteImage.src = "Pounce.png"

function loadComplete(){
    console.log("load complete");
    canvas = document.createElement("canvas");
    vtx = canvas.getContext("2d");
    my_Interval = self.setInterval(function(){Tick()}, interval);
}

function erase_Sprite(){
    ctx.clearRect(spriteX, spriteY, spriteWidth, spriteHeight);
}

function draw_Sprite(){
    ctx.drawImage(spriteImage, spriteCol * spriteWidth, spriteRow * spriteHeight,
        spriteWidth, spriteHeight, spriteX, spriteY, spriteWidth, spriteHeight);
    
    if(spriteCol >= spriteCol_lim){
        spriteCol = 0;
    }
}



function Tick(){
    erase_Sprite();

    draw_Sprite();
}

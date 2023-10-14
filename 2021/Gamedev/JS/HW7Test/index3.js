const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvasWidth = (canvas.width = 800);
const canvasHeight = (canvas.width = 700);

let gameSpeed = 5;
let SpriteRow = 1;
let SpriteCol = 0;
let MaxSpriteRow = 8;
let MaxSpriteCol = 8;
let SpriteX = 340;
let SpriteYdefault = 95;
let SpriteY = 95;
let SpriteWidth = 32;
let SpriteHeight = 32;
let PlayerFaceLeftRow = 0;
let PlayerFaceRightRow = 1;
let jumpSequence = 0;

const backgroundL1 = new Image();
backgroundL1.src = "layer-1.png";

const backgroundL2 = new Image();
backgroundL2.src = "layer-2.png";

const backgroundL3 = new Image();
backgroundL3.src = "layer-3.png";

const backgroundL4 = new Image();
backgroundL4.src = "layer-4.png";

const backgroundL5 = new Image();
backgroundL5.src = "layer-5.png";

var SpriteImage = new Image();
SpriteImage.src = "manLRUD_32x32.png";

const obstacles = new Image();
obstacles.src = "rock1.png";

class layer {
  constructor(image, x, y, width, height, speedM) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x2 = this.width;
    this.image = image;
    this.speedM = speedM;
    this.speed = gameSpeed * this.speedM;
  }
  update() {
    this.speed = gameSpeed * this.speedM;
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

class player {
  player(
    image,
    SpriteCol,
    SpriteWidth,
    SpriteRow,
    SpriteHeight,
    SpriteX,
    SpriteY
  ) {
    this.SpriteCol = SpriteCol;
    this.SpriteRow = SpriteRow;
    this.SpriteWidth = SpriteWidth;
    this.SpriteHeight = SpriteHeight;
    this.SpriteX = SpriteX;
    this.SpriteY = SpriteY;
    this.image = image;
    this.speedM = speedM;
    this.speed = gameSpeed * this.speedM;
  }
  update() {
    this.speed = gameSpeed * this.speedM;
    if (this.SpriteX <= -this.width) {
      this.SpriteX = this.width + this.x2 - this.speed;
    }
    this.SpriteX = Math.floor(this.SpriteX - this.speed);
  }
  draw() {
    if (jumpSequence > 0) {
      jumpSequence++;
      if (jumpSequence > 32) {
        SpriteY = SpriteYdefault;
        jumpSequence = 0;
      } else if (jumpSequence > 16) {
        SpriteY += 4;
      } else {
        SpriteY -= 4;
      }

      SpriteCol++;
      if (SpriteCol >= MaxSpriteCol) SpriteCol = 0;
    }
    ctx.draw(
      this.image,
      this.SpriteCol * this.SpriteWidth,
      this.SpriteRow * this.SpriteHeight,
      this.SpriteWidth,
      SpriteHeight,
      SpriteX,
      SpriteY,
      this.SpriteWidth,
      this.SpriteHeight
    );
  }
}
const layer1 = new layer(backgroundL1, 0, 0, 2400, 150, 0.2);
const layer2 = new layer(backgroundL2, 0, 0, 2400, 150, 0.4);
const layer3 = new layer(backgroundL3, 0, 0, 2400, 150, 0.6);
const layer4 = new layer(backgroundL4, 0, 0, 2400, 150, 0.7);
const layer5 = new layer(backgroundL5, 0, 0, 2400, 150, 1);
const rock1 = new layer(obstacles, 500, 85, 120, 50, 0.001);
const player1 = new player(
  SpriteImage,
  SpriteCol * SpriteWidth,
  SpriteRow * SpriteHeight,
  SpriteWidth,
  SpriteHeight,
  SpriteX,
  SpriteY,
  SpriteWidth,
  SpriteHeight
);

const layers = [layer1, layer2, layer3, layer4, layer5, rock1];

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  layers.forEach((object) => {
    object.update();
    object.draw();
  });
  ctx.drawImage(
    SpriteImage,
    SpriteCol * SpriteWidth,
    SpriteRow * SpriteHeight,
    SpriteWidth,
    SpriteHeight,
    SpriteX,
    SpriteY,
    SpriteWidth,
    SpriteHeight
  );
  requestAnimationFrame(animate);
}

function whenKeyPressed(key) {
  switch (key) {
    case 28:
      SpriteRow = PlayerFaceRightRow;
      SpriteCol++;
      if (SpriteCol >= MaxSpriteCol) SpriteCol = 0;
      SpriteX++;
      if (SpriteX >= canvas.width) {
        SpriteX = 0;
      }
      break;
    case 29:
      SpriteRow = PlayerFaceLeftRow;
      SpriteCol++;
      if (SpriteCol >= MaxSpriteCol) SpriteCol = 0;
      SpriteX--;
      if (SpriteX <= 0) {
        SpriteX = 0;
      }
      break;
    case 32:
      if (jumpSequence == 0) {
        jumpSequence = 1;
      }
      break;
  }
}

document["onkeydown"] = function (event) {
  event = event || window.event;
  var key = event.which || event.cursor;
  // Check for a special key value, and map it to ASCII.
  switch (key) {
    case 37: // Left arrow, ASCII 29
      key = 29;
      break;
    case 38: // Up arrow, ASCII 30
      key = 30;
      break;
    case 39: // Right arrow, ASCII 28
      key = 28;
      break;
    case 40: // Down arrow, ASCII 31
      key = 31;
      break;
  }
  //document.getElementById("keydown").innerHTML =
  //  " key Down event, keycode " + key;
  whenKeyPressed(key);
};

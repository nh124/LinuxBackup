const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var width = (canvas.width = 640);
var height = (canvas.height = 480);

var INTERVAL = 200;
var tileWidth = 32; // Size of each tile (32x32)
var tileHeight = 32;

var maxRow = 15;
var maxCol = 20;

var WIDTH = 640; // of the canvas
var HEIGHT = 480; // of the canvas

var tree = new Image(); // Sprite sheet
tree.src = "features_trees.png";
sizeOfPlacement = 50;

var myInterval;

imageindex = [55, 95, 125, 160, 190, 223, 255, 288, 320, 355]; //

var myarray = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

function drawTree(treeAge, r, c, tileWidth, tileHeight) {
  ctx.drawImage(
    tree,
    treeAge,
    0,
    tileWidth,
    tileHeight,
    c * tileWidth,
    r * tileHeight,
    sizeOfPlacement,
    sizeOfPlacement
  );
}

tempRow = 0;
tempCol = 0;

maxRow = 13;
maxCol = 18;
treeIndecator = 1;

function treeAge(tree) {
  if (tree < imageindex.length) {
    return imageindex[tree];
  }
  return 0;
}

function drawTrees() {
  randomRow = Math.floor(Math.random() * maxRow);
  randomCol = Math.floor(Math.random() * maxCol);

  tempCol = randomCol;
  tempRow = randomRow;
  numbOfNeighbors = numberOfneighbors(randomRow, randomCol);
  treeAgeInc = 0;
  if (numbOfNeighbors == 2) {
    treeIndecator++;
  } else if (numbOfNeighbors > 5) {
    treeIndecator++;
  }
  let CurrentTree = treeAge(treeIndecator);
  if (myarray[randomRow * randomCol] != treeIndecator) {
    drawTree(CurrentTree, randomRow, randomCol, tileWidth, tileHeight);
    myarray[randomRow * randomCol] = treeIndecator;
  }
}
function numberOfneighbors(randomRow, randomCol) {
  let numberOfneighbors = 0;
  Array = [];
  if (myarray[(randomRow + 1) * randomCol] == 1) {
    numberOfneighbors++;
    Array.push(1);
  }
  if (myarray[(randomRow - 1) * randomCol] == 1) {
    numberOfneighbors++;
    Array.push(1);
  }
  if (myarray[randomRow * (randomCol + 1)] == 1) {
    numberOfneighbors++;
    Array.push(1);
  }
  if (myarray[(randomRow - 1) * (randomCol - 1)] == 1) {
    numberOfneighbors++;
    Array.push(1);
  }
  if (myarray[(randomRow + 1) * (randomCol + 1)] == 1) {
    numberOfneighbors++;
    Array.push(1);
  }
  if (myarray[(randomRow - 1) * (randomCol - 1)] == 1) {
    numberOfneighbors++;
    Array.push(1);
  }

  if (myarray[(randomRow + 1) * (randomCol - 1)] == 1) {
    numberOfneighbors++;
    Array.push(1);
  }
  if (myarray[(randomRow - 1) * (randomCol + 1)] == 1) {
    numberOfneighbors++;
    Array.push(1);
  }
  return numberOfneighbors;
}

function Tick() {
  drawTrees();
}

function loadComplete() {
  console.log("Load is complete.");
  console.log("Start a game interval");
  myInterval = self.setInterval(function () {
    Tick();
  }, INTERVAL);
}

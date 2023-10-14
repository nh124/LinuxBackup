var DEBUG = false; //true;

var theCanvas;
var theContext;
var MAXWIDTH = 640;   // pixels across
var MAXHEIGHT = 480;  // pixels from top to bottom
var dbstr = ' ';   // for debugging

var thissound1; 
var thissound2; 
var thissound3; 
var thissound4; 
var whichSound = 1;  // Which sound played.


// See http://www.phon.ucl.ac.uk/home/mark/audio/play10.htm 
// for another example.


// centerX and centerY are used to draw rectangles on the canvas.
// Later, we use these values to determine which rectangle the user
// clicks on.
var centerX = Math.floor(MAXWIDTH/2);
var centerY = Math.floor(MAXHEIGHT/2);


var mouseX = 0;          // X and Y mouse coords, 
var mouseY = 0;          // according to its last move event.
var Xoffset = 0;         // MouseX,Y values are not correct. This corrects X.
var Yoffset = 0;         // MouseX,Y values are not correct. This corrects Y.
var lastX = 0;           // X where mouse down event was
var lastY = 0;           // Y where mouse down event was
var buttonPressed = false;   // Is user pressing the mouse button right now?


// Erase the entire canvas.
function erase_canvas() {
  theContext.clearRect(0, 0, MAXWIDTH, MAXHEIGHT);
}





// As the "onload" function, this ensures the maze is shown.
function showEverything() {

  theCanvas = document.getElementById("theCanvas");
  theContext = theCanvas.getContext("2d");

  thissound1 = document.getElementById('audio1');
  thissound2 = document.getElementById('audio2');
  thissound3 = document.getElementById('audio3');
  thissound4 = document.getElementById('audio4');

  setUpListeners();   // Map mouse move and buttons to my functions.
  calibrate();        // Find correct X,Y offsets for mouse.
  document.getElementById("theCanvas").focus();

  // Show something on the canvas.
  // Draw a green rectangle
  theContext.fillStyle = "#00ff00";
  theContext.fillRect(0, 0, centerX, centerY);
  // Draw a blue rectangle
  theContext.fillStyle = "#0000ff";
  theContext.fillRect(centerX, centerY, MAXWIDTH, MAXHEIGHT);
  // Draw a white rectangle
  theContext.fillStyle = "#ffffff";
  theContext.fillRect(0, centerY, centerX, MAXHEIGHT);
  // Draw a red rectangle
  theContext.fillStyle = "#ff0000";
  theContext.fillRect(centerX, 0, MAXWIDTH, centerY);

  document.getElementById("theCanvas").focus();
}

// 
// Change the background screen color to green.
//
function green() {
  document.bgColor = "#00ff00";
}

// 
// Change the background screen color to red.
//
function red() {
  document.bgColor = "#ff0000";
}

// 
// Change the background screen color to blue.
//
function blue() {
  document.bgColor = "#0000ff";
}

// 
// Change the background screen color to white.
//
function white() {
  document.bgColor = "#ffffff";
}

// 
// Change the background screen color to black.
//
function black() {
  document.bgColor = "#000000";
}


// Calculate the Xoffset and Yoffset.
// (This seems to change as the window loads.)
function calibrate() {
    // get canvas position
    //var canvas = document.getElementById('theCanvas');
    var obj = theCanvas;
    var top = 0;
    var left = 0;
    // Go through the page to find where the canvas is.
    // Later, we find the cursor's position, but it will be
    // from the top left corner of the page. Thus, we can subtract
    // this offset later.
    // (Loop code by html5canvastutorials.com)
    while (obj && obj.tagName != 'BODY') {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    Xoffset = -left + window.pageXOffset;
    Yoffset = -top + window.pageYOffset;
}


// User let up on the mouse button
function mouseUpEvent() {
  buttonPressed = false;
  //document.getElementById("mouse_up_status").innerHTML = t + " Mouse up at " 
  //  + mouseX + ", " + mouseY;
}


// User pressed the mouse button down.
function mouseDownEvent() {

  lastX = mouseX;
  lastY = mouseY;  
  buttonPressed = true;
 
  if (DEBUG)
    console.log(" Mouse down at " + mouseX + ", " + mouseY);

  // Assign color according to the rectangle.
  if ((mouseX > 0) && (mouseX < centerX) &&
      (mouseY > 0) && (mouseY < centerY)) {
    green();
    whichSound = 1; 
    thissound1.play();
  } else if ((mouseX > 0) && (mouseX < centerX) &&
             (mouseY > centerY) && (mouseY < MAXHEIGHT)) {
    white();
    whichSound = 2; 
    thissound2.play();
  } else if ((mouseX >= centerX) && (mouseX < MAXWIDTH) &&
             (mouseY > 0) && (mouseY < centerY)) {
    red();
    whichSound = 3; 
    thissound3.play();
  } else if ((mouseX >= centerX) && (mouseX < MAXWIDTH) &&
             (mouseY >= centerY) && (mouseY < MAXHEIGHT)) {
    blue();
    whichSound = 4; 
    thissound4.play();
  } else {
    black();
  } 

}


// Set up event listeners for the mouse. 
// Based on code from:
// http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
function setUpListeners() {
 
    document.addEventListener('mousemove', function(evt) {
        var d=new Date();
        var t=d.toLocaleTimeString();

        // Find the relative mouse position.
        mouseX = evt.clientX + Xoffset;
        mouseY = evt.clientY + Yoffset;

    }, false);

    document.addEventListener('mousedown', mouseDownEvent, false);
    document.addEventListener('mouseup', mouseUpEvent, false);
};


var sound2play = 0;
function PlayNext() {

  // see Math.random();

  switch (sound2play) {
    case 0:
      // play sound 1
      thissound1.play();
      break;
    case 1:
      // play sound 2
      thissound2.play();
      break;
    case 2:
      // play sound 3
      thissound3.play();
      break;
    case 3:
      // play sound 4
      thissound4.play();
      break;
    default:
      // turn off the Interval
      clearInterval(myInterval);
      break;
  }
  //console.log("played sound " + sound2play);

  sound2play++;

}

var myInterval;
function startButton() {

  sound2play = 0; 
  myInterval = self.setInterval(function(){PlayNext()}, 1000);

}
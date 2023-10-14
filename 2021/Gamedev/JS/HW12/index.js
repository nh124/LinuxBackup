var theCanvas = document.getElementById("canvas");
var theContext = theCanvas.getContext("2d");
var w = 800;
var h = 480;

theCanvas.width = w;
theCanvas.height = h;

theCanvas.style.width = w;
theCanvas.style.height = h;
let Yloc = 37;
let Xloc = 10;

// let options = "ABC";
let options = ["A", "B", "C"];
let promptArr = new Array();
let logs = new Array();

promptArr[0] = "When you came out did you see a car go by? ";
promptArr[1] = "Thats all we want to know for now. ";
promptArr[2] = "Did you catch a look at the license plate? ";
promptArr[3] = "Did you remember the model? Foreign or domestic? ";
promptArr[4] = "Did you see the driver? ";
promptArr[5] = "All right. Thats all for now. Dont leave town. ";

let currentPrompt = promptArr[0];
var optionsForPrompt1 = new Array();
optionsForPrompt1.push("Yes going really fast!");
optionsForPrompt1.push("No I havent seen it ");
optionsForPrompt1.push("I think I say a red car");

var optionsForPrompt2 = new Array();
optionsForPrompt2.push("Really?");
optionsForPrompt2.push("I can answer a few more questions. ");
optionsForPrompt2.push("Good. cause I got places to be, you know?");

var optionsForPrompt3 = new Array();
optionsForPrompt3.push("License plate for which car?");
optionsForPrompt3.push("What I got photographic memory? No. "); // ->
optionsForPrompt3.push("Yes I did");

var optionsForPrompt4 = new Array();
optionsForPrompt4.push("Maybe a porshe, im not a car guy"); //-->
optionsForPrompt4.push("I think I say a honda.");
optionsForPrompt4.push("I don't remember the model");

var optionsForPrompt5 = new Array();
optionsForPrompt5.push("It was a man thats all I can say"); // -->
optionsForPrompt5.push("No I didn't see it");
optionsForPrompt5.push("I was really not paying attention");

var optionsForPrompt6 = new Array();
optionsForPrompt6.push("Thanks for noting.");
optionsForPrompt6.push("Have a nice day");
optionsForPrompt6.push("Whats a waste of time");

currentOptions = optionsForPrompt1;
function isPrompt(newPrompt) {
  if (newPrompt == promptArr[0]) {
    return promptArr[0];
  } else if (newPrompt == promptArr[1]) {
    return promptArr[1];
  } else if (newPrompt == promptArr[2]) {
    return promptArr[2];
  } else if (newPrompt == promptArr[3]) {
    return promptArr[3];
  } else if (newPrompt == promptArr[4]) {
    return promptArr[4];
  } else if (newPrompt == promptArr[5]) {
    return promptArr[5];
  }
}

function showDialog(
  prompt,
  options,
  choice,
  xLoc,
  yLoc,
  letter,
  letterPressed
) {
  theContext.fillStyle = "white";
  theContext.font = "bold 20px Arial";
  theContext.fillText(currentPrompt, xLoc, yLoc); // diskplaying prompt
  LogYLoc = yLoc;
  if (logs.length != 0) {
    for (let i = 0; i < logs.length; i++) {
      theContext.fillText(logs[i], xLoc, LogYLoc + 200);
      LogYLoc += 30;
      if (yLoc > 277) {
        i = 6;
      }
    }
  }
  yLoc += 22;
  for (let i = 0; i < options.length; i++) {
    line = choice[i] + ". " + options[i];
    theContext.fillText(line, xLoc, yLoc);
    yLoc += 22;
  }
  if (
    isPrompt(currentPrompt) == promptArr[0] &&
    letter == "A" &&
    letterPressed
  ) {
    currentPrompt = promptArr[2];
    currentOptions = OptionsDet(currentPrompt); //optionsForPrompt3;
  } else if (
    letterPressed &&
    letter != "A" &&
    currentPrompt == promptArr[0] &&
    letter == "B" &&
    letterPressed
  ) {
    deleteOption(letter, options, choice);
  } else if (
    isPrompt(currentPrompt) == promptArr[2] &&
    currentPrompt != promptArr[0] &&
    letter == "B" &&
    letterPressed
  ) {
    currentPrompt = promptArr[5];
    currentOptions = OptionsDet(currentPrompt); //optionsForPrompt3;
  } else if (
    letterPressed != "B" &&
    letterPressed &&
    currentPrompt != promptArr[0] &&
    letter == "B" &&
    letterPressed
  ) {
    deleteOption(letter, options, choice);
  } else if (
    isPrompt(currentPrompt) == promptArr[5] &&
    letterPressed &&
    letter == "A" &&
    (currentPrompt != promptArr[2] || currentPrompt != promptArr[0])
  ) {
    theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
    EndOfConversation = "The end";
    theContext.fillText(EndOfConversation, xLoc, yLoc);
  }
}

function deleteOption(letter, options, choice) {
  theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
  index = choice.indexOf(letter);
  options.splice(index, 1);
  showDialog(currentPrompt, options, choice, 10, 27);
}

showDialog(currentPrompt, optionsForPrompt1, options, Xloc, Yloc, "A", false);

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
  whenKeyPressed(key);
};

function OptionsDet(currentPrompt) {
  if (currentPrompt == promptArr[0]) {
    return optionsForPrompt1;
  } else if (currentPrompt == promptArr[1]) {
    return optionsForPrompt2;
  } else if (currentPrompt == promptArr[2]) {
    return optionsForPrompt3;
  } else if (currentPrompt == promptArr[3]) {
    return optionsForPrompt4;
  } else if (currentPrompt == promptArr[4]) {
    return optionsForPrompt5;
  } else if (currentPrompt == promptArr[5]) {
    return optionsForPrompt6;
  }
}

function whenKeyPressed(key) {
  let options = ["A", "B", "C", "D"];
  switch (key) {
    case 65: // 'A'
      theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
      showDialog(currentPrompt, currentOptions, options, Xloc, Yloc, "A", true);
      logs.push("Letter A has been pressed");
      break;
    case 66: // 'B'
      showDialog(currentPrompt, currentOptions, options, Xloc, Yloc, "B", true);
      logs.push("Letter B has been pressed");
      break;
    case 67: // 'C'
      showDialog(currentPrompt, currentOptions, options, Xloc, Yloc, "C", true);
      logs.push("Letter C has been pressed");
      break;
    default:
      showDialog(currentPrompt, currentOptions, options, Xloc, Yloc, "D", true);
      logs.push("Incorrect input");
      break;
  }
}

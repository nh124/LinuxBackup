// <![CDATA[
    var INTERVAL = 50;
    var DEBUG = false; //true;
    
    var canvas;            // The canvas shown on the page.
    var ctx;                // The context, used to access the canvas.
    
    var SpriteRow = 0;      // Row of the graphic to show
    var SpriteCol = 0;      // Col of the graphic to show
    var MaxSpriteRow = 8;   // How many rows of images
    var MaxSpriteCol = 8;  // How many columns of images
    
    var SpriteX = 100;      // Position of sprite on the canvas
    var SpriteY = 100;
    var SpriteWidth = 32;   // Width, Height of each sub-image
    var SpriteHeight = 32;
    
    var SpriteImage = new Image();   // Sprite sheet
    SpriteImage.src   = "Pounce.png";
    
    
    
    // Set up a timer to execute every 50 ms.
    var myInterval;
    
    
    function eraseSprite() {
      // erase sprite
      ctx.clearRect(SpriteX, SpriteY, SpriteWidth, SpriteHeight);
    }
    
    
    function drawSprite() {
      // draw sprite
      //ctx.drawImage(SpriteImage, SpriteX, SpriteY);
      ctx.drawImage(SpriteImage, SpriteCol * SpriteWidth, SpriteRow * SpriteHeight, 
        SpriteWidth, SpriteHeight, SpriteX, SpriteY, SpriteWidth, SpriteHeight); 
    
      // update the next image to show
      //SpriteCol++;
      if (SpriteCol >= MaxSpriteCol)
        SpriteCol = 0;
    }
    
    
    function Tick() {
    
      // Erase the sprite from its current location.
      eraseSprite();
    
      // Show a new image
      drawSprite();
    }
    
    
    function loadComplete() {
      console.log("Load is complete."); 
      canvas = document.getElementById("theCanvas");
      ctx = canvas.getContext("2d");
      myInterval = self.setInterval(function(){Tick()}, INTERVAL);
    }
    
    // What to do when the user presses a key.
    function whenKeyPressed(key) {
      switch (key) {
        case 28:  // Right arrow was pressed
          SpriteX++;
          if(SpriteX > 640){
            SpriteX = 100;
          }
          break;
        case 29:  // Left arrow, ASCII 29 
          SpriteX--;
          if(SpriteX < 0)
            SpriteX = 0;
          break; 
        case 30:  // Up arrow was pressed 
          // Go up a row
          SpriteY--;
          if(SpriteY < 0){
            SpriteY = 0;
          }
          break;;
        case 31:  // Down arrow was pressed 
        SpriteY++;
          if(SpriteY > 480){
            SpriteY = 100;Sprit
          }
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
        //document.getElementById("keydown").innerHTML =
        //  " key Down event, keycode " + key;
        whenKeyPressed(key);
      };
    ///]]>
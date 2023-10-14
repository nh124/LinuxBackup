// <![CDATA[
    var INTERVAL = 50;
    var DEBUG = false; //true;
    
    // We will have a timer that executes every 50 ms.
    var myInterval;
    
    // *******************************************************
    var canvas;             // The canvas shown on the page.
    var ctx;                // The context, used to access the canvas.
    var CANVASWIDTH = 1500;
    var CANVASHEIGHT = 500;
    
    var SpriteRow = 1;      // Row of the graphic to show
    var SpriteCol = 0;      // Col of the graphic to show
    var MaxSpriteRow = 8;   // How many rows of images
    var MaxSpriteCol = 8;  // How many columns of images
    
    var SpriteX = 340;      // Position of sprite on the canvas (middle).
    var SpriteYdefault = 380;      // Put sprite at the "ground" level.
    var SpriteY = 380;      // Put sprite at the "ground" level.
    var SpriteWidth = 32;   // Width, Height of each subimage
    var SpriteHeight = 32;
    var PlayerFaceLeftRow = 0;   // Row on sprite sheet to use when facing left
    var PlayerFaceRightRow = 1;  // Row on sprite sheet to use when facing right 
    var jumpSequence = 0;        // Is the player jumping? >0 means yes
    var mountain_offset = 0;     // We move the mountains, slowly
    var tree_offset = 0;         // We move the trees, medium
    var goal_offset = 0;         // Where the goal is (a flag)
    var TREEMAX;                 // Maximum value to start trees (on left)
    var MOUNTAINMAX;             // Maximum value to start mountains (on left)
    var TreeSpeed = 8;           // How much trees move in relation to sprite  
    var MountainSpeed = 4;       // How much mountaints move in relation to sprite  
    
    var trees_loaded = false;
    var mountains_loaded = false;
    var sprite_loaded = false;
    var pageLoadComplete = false;
    var SpriteImage = new Image();   // Sprite sheet
    SpriteImage.src = "manLRUD_32x32.png";
    var mountains   = new Image();    // distant mountains
    mountains.src   = "mountains.png";
    var trees       = new Image();    // trees, not too far away
    trees.src       = "trees.png";
    var TreeHeight  = 0;
    var TreeWidth   = 0;
    var TREE_HEIGHT_FROM_GROUND = 0;  // Vertical offset for trees

    var obstacles = new Image();  
    obstacles.src = "features.png";
    var flag = new Image(); 
    flag.src = "features.png";
    var obstaclesRow = 20;
    var obstaclesCol = 0;
    var obstaclesX = 580;
    var obstaclesY = 380;
    var obstaclesWidth = 32;
    var obstaclesHeight = 32;
    obstacles_loaded = false;

    // When an image loads, set a variable.
    // This way, we can start once we have everything.
    obstacles.onload = function(){
      obstacles_loaded = true;
    }

    SpriteImage.onload = function() {
      sprite_loaded = true;
    }
    trees.onload = function() {
      TreeHeight = trees.height;
      TreeWidth = trees.width;
      // TREE_HEIGHT_FROM_GROUND controls where the tree line appears.
      // The value 150 was found experimentally, and seems good.
      TREE_HEIGHT_FROM_GROUND = 150; // CANVASHEIGHT - TreeHeight; 
      TREEMAX = TreeWidth - CANVASWIDTH;
      goal_offset = TREEMAX - 100;
      //goal_offset = TREEMAX - 9000;  // for debugging only
      trees_loaded = true;
    }
    mountains.onload = function() {
      MOUNTAINMAX = mountains.width - CANVASWIDTH;
      mountains_loaded = true;
    }

    function skyblue() {
      document.bgColor = "#00eeff";
    }
    
    function red() {
      document.bgColor = "#ff0000";
    }
    
    function green() {
      document.bgColor = "#00ee11";
    }
    
    function eraseSprite() {
      ctx.clearRect(SpriteX, SpriteY, SpriteWidth, SpriteHeight);
    }
    
    
    // Erase the entire canvas.
    function eraseEverything() {
      ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
    }

    
    function drawEverything() {
      
      ctx.drawImage(mountains, mountain_offset, 0,
        CANVASWIDTH, CANVASHEIGHT, 0, 0, CANVASWIDTH, CANVASHEIGHT);
    
      // show trees
      ctx.drawImage(trees, 
        tree_offset, 0, CANVASWIDTH, TreeHeight, 
        0, TREE_HEIGHT_FROM_GROUND, CANVASWIDTH, TreeHeight); 
    
      // show the player
      drawSprite();
      drawObstacles();
     }
     obstacles_Offset = 0;
    function drawObstacles(){ 
      ctx.drawImage(flag, 160, 0 , SpriteWidth, SpriteHeight, 1400, 380, SpriteWidth, SpriteHeight); 
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 500, 380, SpriteWidth, SpriteHeight); 
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 500, 350, SpriteWidth, SpriteHeight); 
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 520, 380, SpriteWidth, SpriteHeight); 
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 520, 350, SpriteWidth, SpriteHeight);
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 540, 380, SpriteWidth, SpriteHeight); 
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 540, 350, SpriteWidth, SpriteHeight);
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 560, 380, SpriteWidth, SpriteHeight); 
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 560, 350, SpriteWidth, SpriteHeight);

      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 800, 380, SpriteWidth, SpriteHeight); 
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 800, 350, SpriteWidth, SpriteHeight); 
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 820, 380, SpriteWidth, SpriteHeight); 
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 820, 350, SpriteWidth, SpriteHeight);
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 840, 380, SpriteWidth, SpriteHeight); 
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 840, 350, SpriteWidth, SpriteHeight);
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 860, 380, SpriteWidth, SpriteHeight); 
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 860, 350, SpriteWidth, SpriteHeight);


      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 1200, 380, SpriteWidth, SpriteHeight); 
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 1200, 350, SpriteWidth, SpriteHeight); 
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 1220, 380, SpriteWidth, SpriteHeight); 
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 1220, 350, SpriteWidth, SpriteHeight);
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 1240, 380, SpriteWidth, SpriteHeight); 
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 1240, 350, SpriteWidth, SpriteHeight);
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 1260, 380, SpriteWidth, SpriteHeight); 
      ctx.drawImage(obstacles, 20, 0 , SpriteWidth, SpriteHeight, 1260, 350, SpriteWidth, SpriteHeight);
      // for(var i = 0; i < 6; i++){
      //   ctx.drawImage(obstacles, obstaclesRow, obstaclesCol , obstaclesWidth, obstaclesHeight, obstaclesX, obstaclesY, obstaclesWidth, obstaclesHeight);
      //   if(i % 2 == 0){
      //     obstaclesX += 20;
      //     obstaclesY += 30;
      //   }
      //   if(i % 2 == 1){
      //     obstaclesY -= 30;
      //   }
        
      // }
      // console.log(obstacles + " , " +  obstaclesRow + " , " + obstaclesCol  + " , " + obstaclesWidth  + " , " + obstaclesHeight  + " , " + obstaclesX  + " , " + obstaclesY  + " , " + obstaclesWidth  + " , " +  obstaclesHeight); 
    }

    function drawSprite() {
      ctx.drawImage(SpriteImage, SpriteCol * SpriteWidth, SpriteRow * SpriteHeight, 
        SpriteWidth, SpriteHeight, SpriteX, SpriteY, SpriteWidth, SpriteHeight); 
      
    }

    function Tick() {
      eraseEverything();
    
      // Move the player if jumping
      if (jumpSequence > 0) {
        jumpSequence++;
        if (jumpSequence > 32) {
          // Reset
          SpriteY = SpriteYdefault;
          jumpSequence = 0;
        } else if (jumpSequence > 16) {
          SpriteY += 4;
        } else {
          SpriteY -= 4; 
        }
        // Update SpriteCol, though this could be done twice if also pressing L/R.
          // update the next image to show
          SpriteCol++;
          if (SpriteCol >= MaxSpriteCol)
            SpriteCol = 0;
      }
    
      // Show a new image
      drawEverything();
    
      // Did the player win?
      if (tree_offset >= goal_offset) {
        console.log("You win!");
        document.getElementById("youwin").innerHTML = "You win!";
        green();
        clearInterval(myInterval);
      }
     
    }
    
    
    function loadComplete() {
      console.log("Load is complete."); 
      canvas = document.getElementById("theCanvas");
      ctx = canvas.getContext("2d");
      pageLoadComplete = true;
      myInterval = self.setInterval(function(){check4all_loaded()}, 500);
    }
    
    
    // Loading external resources is asynchronous. 
    // We cannot start until everything is loaded.
    // This function checks to see that everything loaded.
    function check4all_loaded() {
      if ( sprite_loaded  && trees_loaded  && mountains_loaded && pageLoadComplete && obstacles_loaded) {
        // Everything has loaded.
        // Stop the check-loaded interval
        clearInterval(myInterval);
        skyblue(); // background color
        eraseEverything();
        drawEverything();
        // Start a game interval
        myInterval = self.setInterval(function(){Tick()}, INTERVAL);
      }
    }
    
    // What to do when the user presses a key.
    function whenKeyPressed(key) {
      switch (key) {
        case 28:  // Right arrow was pressed 
          SpriteRow = PlayerFaceRightRow;
          // update the next image to show
          SpriteCol++;
          if (SpriteCol >= MaxSpriteCol)
            SpriteCol = 0;
          // Make the background appear to move
          tree_offset = tree_offset + TreeSpeed;
          if (tree_offset >= TREEMAX)
            tree_offset = TREEMAX - 1;
          mountain_offset = mountain_offset + MountainSpeed;
          if (mountain_offset >= MOUNTAINMAX)
            mountain_offset = MOUNTAINMAX - 1;
          break;
        case 29:  // Left arrow, ASCII 29 
          SpriteRow = PlayerFaceLeftRow;
          // update the next image to show
          SpriteCol++;
          if (SpriteCol >= MaxSpriteCol)
            SpriteCol = 0;
          // Make the background appear to move
          tree_offset = tree_offset - TreeSpeed;
          if (tree_offset < 0)
            tree_offset = 0;
          mountain_offset = mountain_offset - MountainSpeed;
          if (mountain_offset < 0)
            mountain_offset = 0;
          break;
        case 30:  // Up arrow was pressed 
          // Go up a row
          //SpriteRow = SpriteRow - 1;
          //if (SpriteRow < 0)
          //  SpriteRow = MaxSpriteRow - 1;  
          //SpriteCol = 0; // reset column to first image
          break;
        case 31:  // Down arrow was pressed 
          // Go down a row
          //SpriteRow = SpriteRow + 1;
          //if (SpriteRow >= MaxSpriteRow)
          //  SpriteRow = 0;
          //SpriteCol = 0; // reset column to first image
          break;
        case 32:  // Space bar
          // Make sure we do not have a jump already going.
          if (jumpSequence == 0) {
            jumpSequence = 1;
          }
          break;
      }
    }
    // *******************************************************
    //  End functions for loading data, and listeners
    // *******************************************************
    
    // /]]>
        document.write('<center>');
        document.write('<canvas id="theCanvas" tabindex="1" width="' + CANVASWIDTH + '" height="' + CANVASHEIGHT + '"></canvas>');
        document.write('<h2>Space-bar = jump</h2>');
        // <!-- Make youwin text 10% of view window -->
        document.write('<h2 style="font-size:10vw" id="youwin"></h2>');
        document.write('</center>');
      //
      // Set up a function to handle key-presses.
      //
      // This should work across most browsers.
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
    
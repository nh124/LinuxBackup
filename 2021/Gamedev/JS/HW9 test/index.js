let musicSequencer = 0;
var myInterval;
musicCollection = ["Assets/glass_rubbing.ogg", "Assets/toothpicks.ogg", "Assets/grain_bag.ogg", "Assets/napkin_rustling.ogg"];

randomizedMusic = [];
randomizedMusic.length = 4;

let similarSeries = true;
playerSeq = [];
playerSeq.length = 4;
musicCatalog = 0;

var music1 = new Audio();
var music2 = new Audio();
var music3 = new Audio();
var music4 = new Audio();

var music_v2_1 = new Audio();
var music_v2_2 = new Audio();
var music_v2_3 = new Audio();
var music_v2_4 = new Audio();

function music(music,musicV2, index){
    random_music_selector = Math.floor(Math.random() * playerSeq.length);
    music.src = musicCollection[random_music_selector];
    // randomizedMusic[index] = musicCollection[random_music_selector];
    randomizedMusic[index] = random_music_selector;
    musicV2.src = musicCollection[index];
}

music(music1, music_v2_1, 0);
music(music2, music_v2_2, 1);
music(music3, music_v2_3, 2);
music(music4, music_v2_4, 3);


function getId(btn){
    switch(btn.id){
        case 'button1':
            music_v2_1.play();
            playerSeq[musicCatalog] = 0;  
            break;
        case 'button2':
            music_v2_2.play();
            playerSeq[musicCatalog] = 1; 
            break;
        case 'button3':
            music_v2_3.play();
            playerSeq[musicCatalog] = 2; 
            break;
        case 'button4':
            music_v2_4.play();
            playerSeq[musicCatalog] = 3; 
            break;
    }
    musicCatalog++;  
}

function start(){
    switch(musicSequencer){
        case 0:
            music1.play();
            break;
        case 1:
            music2.play();
            break;
        case 2:
            music3.play();
            break;
        case 3:
            music4.play();
            break;
    }
    musicSequencer++;
}

function play() {
    musicSequencer = 0; 
    myInterval = self.setInterval(function(){start()}, 1000);
}

function refresh(){
    location.reload(true);
}

function submit(){
    for(i = 0; i < playerSeq.length; i++){
        if(playerSeq[i] != randomizedMusic[i]){
            console.log("playerSeq -> " + playerSeq[i] + "\trandomizedMusic -> " + randomizedMusic[i]);
                similarSeries = false;
        }
    }
    if(similarSeries == true){
        document.getElementById('done').style.visibility = 'visible';
        document.getElementById('done').innerHTML= "CORRECT!";
    }else if(similarSeries == false){
        document.getElementById('done').style.visibility = 'visible';
        document.getElementById('done').innerHTML= "INCORRECT!";
    }
       
}

// url: https://gamedev.cs.gsu.edu/~nhaque2/HW9%20test/

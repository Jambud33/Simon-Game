//DEFINE VARS******************
var buttonColors= ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var i=0;
var gameOverSound = new Audio ('sounds/wrong.mp3');



// START SCRIPT ******************
//starts sequence on first keypress event
//page loads
// user press key
// first run of newSequence (push randomChosenColor to gamePattern[0])

startGame();



$(".row div").on("click", function(){             //does stuff when user clicks:                            
   var userChosenColor = event.srcElement.id;     // record which color user clicks, store in ucc variable
   userClickedPattern.push(userChosenColor);      // add ucc to end of userClickedPattern array
   checkAnswer(userClickedPattern.length);        //check answer based on length of userClickedPattern array
   return userClickedPattern;                     //return has to go last in a function. Nothing after it will work
});



//DEFINE FUNCTIONS**************************

function startGame() {
$("body").on("click", function(){
    newSequence();
    $("body").off("click");
    console.log(event);
});
}

//sound when button chosen
function playSound(name){
    var sound = new Audio('./sounds/' + name + '.mp3'); //pick out sound to play based on randomly chosen color
    sound.play();  // play sound based on randomly selected color
}

//animation when button chosen
function animatePress(currentColor){
     $("#"+currentColor).addClass("pressed");
     setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");}, 100);
}

//pc generates new random selection and stores it in gamePattern array
function newSequence(){
    i++;
    var randomNumber = Math.floor(Math.random()*4); //create random number bw 0-3
    var randomChosenColor = buttonColors[randomNumber]; //choose random color from array based on random number
    gamePattern.push(randomChosenColor);  // add randomly chosen color to sequence
    
    $("#" + randomChosenColor).fadeOut(200).fadeIn(200); // animate randomly chosen color
    playSound(randomChosenColor);
    $("h1").text("Level " + i);   
    
    console.log("gamePattern from nS fn: "+ gamePattern);

    return gamePattern;
   
}

//this is inside the event listener, so any time the user clicks, the 
function checkAnswer(currentLevel){
         console.log("currentLevel: "+userClickedPattern.length); 
         console.log("ucp: " + userClickedPattern);
         console.log("gp: " + gamePattern);
         console.log("ucp[cL-1]: "+userClickedPattern[currentLevel-1]);
         console.log("gp[cL-1]: "+gamePattern[currentLevel-1]);
          
            if(userClickedPattern[currentLevel-1]===gamePattern[currentLevel-1]){
            animatePress(userClickedPattern.at(-1));
            playSound(userClickedPattern.at(-1));
            
                if(currentLevel === gamePattern.length){
                setTimeout(function(){
                newSequence();},1500);
                userClickedPattern=[];
            }
        } 
            //if the user's selection [currentLevel] does not match the gamePattern[currentLevel], game over 
            else {
            gameOverSound.play();
            $("h1").text("Game Over. You made it to level "+i+ " .Click anywhere in background area to restart.");
            $("body").addClass("game-over");
            setTimeout( function(){
                $("body").removeClass("game-over");
            }, 1000);
            gamePattern= [];
            userClickedPattern=[];
            i=0;
            setTimeout(function(){
            startGame();},3000);
        }}
          console.log("----------");
        

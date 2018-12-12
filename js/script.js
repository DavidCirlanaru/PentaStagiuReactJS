var playing = false;
var score = 0;
var action;
var timeRemaining;
var numberOfBoxes = 5;
var correctAnswer;
const startButton = document.getElementById("startGame");
var resetButton = document.getElementById("resetGame");
var timeRemainingButton = document.getElementById('timeRemaining');
var gameOverDisplay = document.getElementById('gameOver');

//if we click on the start/reset
document.getElementById("startGame").onclick = function(){
    
    //if we are playing
    
    if(playing == true){
        
        location.reload(); //reload page
        
    }else{//if we are not playing
        
        //change mode to playing
        
        playing = true;
        
        //set score to 0
        
        score = 0;
        document.getElementById("scoreValue").innerHTML = score;
     
        //show countdown box 
        
        show("timeRemaining");
        timeRemaining = 60;
        document.getElementById("timeLeft").innerHTML = timeRemaining;
        
        //hide game over box
        
        hide("gameOver");
        
        //change button to reset
        timeRemainingButton.style.display = "block";
        //hide start button
        startButton.style.display = "none";
        //show reset button
        resetButton.style.display = "block";
        
        //start countdown
        
        startCountdown();

        //optional reset
        resetGame();
        
        //generate a new Q&A
        
        generateQA();
    }
    
}

//Clicking on an answer box

for(i = 1; i < numberOfBoxes; i++){
    document.getElementById("box" + i).onclick = function(){
    //check if we are playing     
    if(playing == true){//yes
        if(this.innerHTML == correctAnswer){
        //correct answer
            
            //increase score by 2
            score ++;            
            document.getElementById("scoreValue").innerHTML = score;            
            
            //hide wrong box and show correct box
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");   
            }, 1000);
            
            //Generate new Q&A
            
            generateQA();

            //wrong answer
        }else{
            //Decrease score
            score --;
            document.getElementById("scoreValue").innerHTML = score; 
            
            hide("correct");
            show("wrong");
            
            setTimeout(function(){
                hide("wrong");   
            }, 1000);
        }
    }
}   
}

//functions

//start counter

function startCountdown(){
    action = setInterval(function(){
        timeRemaining -= 1;
        document.getElementById("timeLeft").innerHTML = timeRemaining;
        if(timeRemaining == 0){// game over
            stopCountdown();
            show("gameOver");          
          document.getElementById("gameOver").innerHTML = "<p>Game over!</p>"+ "<br>"+
          "Your Final Score: " + score;
            initiateNewGame();
            hide("timeRemaining");
            hide("correct");
            hide("wrong");
            gameOverDisplayTime();          
            playing = false;
            
        }
    }, 2000);    
}

//optional reset

function resetGame () {
  resetButton.addEventListener("click", function(){
    location.reload(); });
  playing = true;
}


//stop counter
function initiateNewGame () {
  gameOverCounter = setInterval(function () {
       //game over
        location.reload();

  }, 3000);
}

function stopCountdown(){
    clearInterval(action);   
}

//hide an element

function hide(Id){
    document.getElementById(Id).style.display = "none";   
}

//show an element

function show(Id){
    document.getElementById(Id).style.display = "block";   
}

function gameOverDisplayTime () {
  initiate = setInterval(function () {
       //game over
        gameOverDisplay.style.display = "block";

  }, 1000);

}

//generate question and multiple answers

function generateQA(){
    var x = 1+ Math.round(9*Math.random());
    var y = 1+ Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1+ Math.round(3*Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer
    
    //fill other boxes with wrong answers
    
    var answers = [correctAnswer];
    
    for(i = 1; i < numberOfBoxes; i++){
        if(i != correctPosition) {
            var wrongAnswer;
        
            do{
                wrongAnswer = (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random())); //a wrong answer
            }while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}
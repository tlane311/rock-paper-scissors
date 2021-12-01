
/*
    computerPlay() chooses one of rock, paper and scissors and returns that choice as a string
    playRound() simulates one round of the game
    The Round class is just a convenient way of storing the result of a round. The Round.score is intended to take on three values: -1, 0, 1 siginifying (resp.) loss, draw or win (from player perspective)
 */


function computerPlay(){
    const choice = 3*Math.random();
    if (choice <= 1) return "rock";
    if (choice <= 2) return "paper";
    return "scissors";
}
// beats[key] = value is equivalent to "key beats value" in rock, paper, scissors
const beats = {
    "rock": "scissors",
    "scissors": "paper",
    "paper": "rock",
}

function playRound(playerSelection, computerSelection){
    if (playerSelection===computerSelection) return new Round(playerSelection,computerSelection,0);


    if (beats[playerSelection] === computerSelection) return new Round(playerSelection,computerSelection,1);
    // if (beats[playerSelection] === computerSelection) return `You Win! ${playerSelection} beats ${computerSelection}`;
    return new Round(playerSelection,computerSelection,-1);
    // return `You Lose! ${computerSelection} beats ${playerSelection}`;
}

class Round{
    constructor(playerChoice, computerChoice, score){
        this.playerChoice=playerChoice;
        this.computerChoice=computerChoice;
        this.score=score;
    }
}

/*
  This game uses totalScore to store state. The function updateDom() consults totalScore and updates the match history section accordingly.
 */

let totalScore = {
    computer:0,
    player:0,
    lastComputerChoice:"",
    lastPlayerChoice:"",
    matchHistory:[],
}

function checkForWinner(){
    let {player, computer} = totalScore;
    return computer >=5 || player>=5;
}

function buttonHandler(e){
    let choice = e.target.innerText.toLowerCase();
    let outcome = playRound(choice, computerPlay());
    if (outcome.score < 0) {
        totalScore.computer++;
    } else if (outcome.score > 0){
        totalScore.player++;
    }
    totalScore.matchHistory.unshift(outcome);
    totalScore.lastPlayerChoice = totalScore.matchHistory[0].playerChoice;
    totalScore.lastComputerChoice = totalScore.matchHistory[0].computerChoice;

    updateDom();
}





const buttons = [...document.querySelectorAll('button')].filter( button => button.innerText !=='Restart');
buttons.forEach( button => {

    button.addEventListener('click', buttonHandler);
})



/*
    We dynamically generate html mostly for the fun of it. It would be more efficient to set this up in index.html.
 */

const results = document.querySelector("#results");

const playerScore = document.createElement('li');
const computerScore = document.createElement('li');
const matchHistory = document.createElement('div');

const matchHistoryHeader = document.createElement('h2');
matchHistoryHeader.innerText='Match History';

const matchHistoryOl = document.createElement('ol');


matchHistory.appendChild(matchHistoryHeader);
matchHistory.appendChild(matchHistoryOl)



function updateDom(){
    playerScore.innerText = "Player Score: " + totalScore.player;
    computerScore.innerText = "Computer Score: " + totalScore.computer;
    let matchElmt = document.createElement('li');
    let lastMatch = totalScore.matchHistory[0];
    matchElmt.innerText = `${lastMatch.score > 0 ? 'Player Wins!' : lastMatch.score == 0 ? 'Draw.' : 'Computer Wins!'}     Player: ${lastMatch.playerChoice.toUpperCase()} - Computer: ${lastMatch.computerChoice.toUpperCase()}.`;
    matchHistoryOl.prepend(matchElmt);


    const thereIsAWinner = checkForWinner();
    if (thereIsAWinner){
        const winnerIs = totalScore.player >=5 ? 'Player' : 'Computer'
        alert(`${winnerIs} wins!`);
        // buttons is actually globally defined in this file.
        // we define it again here just so that this logic is independent
        const buttons = [...document.querySelectorAll('button')];
        buttons.forEach( button => {
            if (button.innerText !== 'Restart'){
                button.disabled= true
            }
            
        })
    }

}

const restartBtn = document.querySelector('#restart-btn');

restartBtn.addEventListener('click', restartHandler);

function restartHandler(e){
    totalScore = {
        computer:0,
        player:0,
        lastComputerChoice:"",
        lastPlayerChoice:"",
        matchHistory:[],
    }
    // buttons is actually globally defined in this file.
    // we define it again here just so that this logic is independent
    const buttons = [...document.querySelectorAll('button')];
    buttons.forEach( button => {
        if (button.innerText !== 'Restart'){
            button.disabled= false
        }
        
    })

    updateDom();
}

results.appendChild(playerScore);
results.appendChild(computerScore);
results.appendChild(matchHistory);


















function validate(input){
    input = input.toLowerCase();
    return ['rock', 'paper', 'scissors'].includes(input);
}

function game(){
    let playerScore = 0;
    let computerScore = 0;
    let numberOfGames = 0;

    while (numberOfGames < 5 && playerScore <= 2 && computerScore <= 2){
        numberOfGames++;
        let playerInput = prompt("Rock, Paper, or Scissors?")
        
        //validating player input
        
        if (!validate(playerInput)){
            playerInput = prompt("Illegal choice detected. Please, choose either: rock, paper, or scissors.")
            if (!validate(playerInput)){
                //player has chosen to forfeit
                computerScore = 10;
                console.log('Player forfeits and computer wins!')
                break;
            }
        }

        let computerInput = computerPlay();
        let result = playRound(playerInput, computerInput);
        console.log(result);
        if (result.toLowerCase()==="draw"){
            // if it's a draw, we repeat the round
            numberOfGames--;
        } else {
            // if it isn't a draw, check the fourth character of result for W or L corresponding to win or loss to computer
            if(result[4].toLowerCase() === "w"){
                playerScore++;
                console.log(`The score is: ${playerScore} to ${computerScore}`);
                if (playerScore===3){
                    console.log('Player wins!');
                }
            } else {
                computerScore++;
                console.log(`The score is: ${playerScore} to ${computerScore}`);
                if (computerScore===3){
                    console.log('Computer wins!');
                }
            }
        }

    }


    
}
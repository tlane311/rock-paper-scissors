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
    //handling capitalization differences
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    
    if (playerSelection===computerSelection) return "Draw";

    if (beats[playerSelection] === computerSelection) return `You Win! ${playerSelection} beats ${computerSelection}`;
    return `You Lose! ${computerSelection} beats ${playerSelection}`;
}

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
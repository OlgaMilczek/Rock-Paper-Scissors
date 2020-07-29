var MOVES = ['rock', 'paper', 'scissors'];

const buttons = document.querySelectorAll('button');
const playerScore = document.querySelector('#player-score');
const drawScore = document.querySelector('#draw-score');
const computerScore = document.querySelector('#computer-score');
const finaleScore = document.querySelector('#winner');
const refButton = document.querySelectorAll('#refresh')
const computerSepection = document.querySelector('#computer-move');
const roundScore = document.querySelector('#round-score');


let youScore = 0;
let compScore = 0;
let draw = 0; 

buttons.forEach((button) => 
    button.addEventListener('click', setPlayerMove))

function setPlayerMove() {
    let playerSelection = this.id;
    playRound(playerSelection);
    }

function playRound(playerSelection) {
    let results = {
        'rock': {'rock': 0, 'paper': -1, 'scissors': 1},
        'scissors': {'rock': -1, 'paper': 1, 'scissors': 0},
        'paper': {'rock': 1, 'paper': 0, 'scissors': -1}
    }
    let computerSelection = computerPlay()
    switch (results[playerSelection][computerSelection]) {
        case 0:
            roundScore.textContent = "It's a draw."
            draw += 1;
            break;
        case 1:
            roundScore.textContent = "Player wins round."
            youScore += 1;
            break;
        case -1:
            roundScore.textContent = "Computer wins round."
            compScore += 1;
            break;
        default:
            alert('Internal error!')
    }
    updateScores();
    findWiner();
}

function findWiner() {
    if (youScore === 5) {
        createRefreshButton('player')
        deactivateButtons()
    }
    else if (compScore=== 5) {
        createRefreshButton('computer')
        deactivateButtons()
    }
    }

function createRefreshButton(winner) {
    if (winner==='player') {
        finaleScore.textContent = 'The winner is Player!';
        const refButton = document.createElement('button');
        refButton.textContent = 'One more?';
        refButton.classList.add('refresh');
        finaleScore.appendChild(refButton);
    }
    else if (winner==='computer') {
        finaleScore.textContent = 'Computer wins!';
        const refButton = document.createElement('button');
        refButton.classList.add('refresh');
        refButton.textContent = 'Try again?';
        finaleScore.appendChild(refButton);   
    }
    activeRefreshButton()
}

function activeRefreshButton() {
    const refButton = document.querySelector('.refresh');
    refButton.addEventListener('click', resetGame);
}

function updateScores() {
    playerScore.innerText = youScore; 
    computerScore.innerText = compScore; 
    drawScore.innerText = draw; 
}

function random(number) {
    let randomNum = Math.floor(Math.random()*number);
    return randomNum
}

function computerPlay() {
    let moveNumbers = MOVES.length;
    let computerMove = MOVES[random(moveNumbers)];
    computerSepection.textContent = `Computer plays ${computerMove}.`;
    return computerMove;
}

function resetGame() {
            location.reload();
}

function deactivateButtons() {
    buttons.forEach(button => button.removeEventListener('click', setPlayerMove));
}

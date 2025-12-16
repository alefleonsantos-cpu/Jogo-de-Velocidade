const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-button');
const messageOverlay = document.getElementById('message');
const gameArea = document.querySelector('.game-area');

let score = 0;
let timer = 10;
let gameInterval;
let timerInterval;

function moveTarget() {
    const gameAreaWidth = gameArea.clientWidth;
    const gameAreaHeight = gameArea.clientHeight;
    
    const targetSize = target.clientWidth;
    
    const maxPosX = gameAreaWidth - targetSize;
    const maxPosY = gameAreaHeight - targetSize;
    
    const randomX = Math.floor(Math.random() * maxPosX);
    const randomY = Math.floor(Math.random() * maxPosY);
    
    target.style.left = randomX + 'px';
    target.style.top = randomY + 'px';
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        timerDisplay.textContent = timer;
        
        if (timer <= 0) {
            endGame();
        }
    }, 1000);
}

function startGame() {
    score = 0;
    timer = 10;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timer;
    messageOverlay.style.display = 'none';
    target.style.display = 'block';
    
    moveTarget();
    startTimer();
    
    gameInterval = setInterval(moveTarget, 1000); 
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    target.style.display = 'none';
    
    messageOverlay.querySelector('p').textContent = `Fim de Jogo! Sua pontuação final: ${score}`;
    startButton.textContent = 'JOGAR NOVAMENTE';
    messageOverlay.style.display = 'flex';
}

target.addEventListener('click', () => {
    if (timer > 0) {
        score++;
        scoreDisplay.textContent = score;
        moveTarget();
    }
});

startButton.addEventListener('click', startGame);
const ball = document.getElementById('ball');
const paddle = document.getElementById('paddle');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('startButton');
const hitSound = document.getElementById('hitSound');
const gameOverSound = document.getElementById('gameOverSound');

let ballX = 290, ballY = 200;
let ballSpeedX = 0, ballSpeedY = 0;  // Ball remains stationary until game starts
let paddleX = 240;
let score = 0;
let gameRunning = false;

// Paddle movement with arrow keys
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && paddleX > 0) {
    paddleX -= 30;
  } else if (e.key === 'ArrowRight' && paddleX < 480) {
    paddleX += 30;
  }
  paddle.style.left = `${paddleX}px`;
});

// Start game when Start Button is clicked
startButton.addEventListener('click', () => {
  if (!gameRunning) {
    gameRunning = true;
    ballSpeedX = 4;
    ballSpeedY = 4;
    startButton.style.display = 'none';  // Hide the button after starting the game
    updateGame();
  }
});

// Game update loop
function updateGame() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Bounce off walls
  if (ballX <= 0 || ballX >= 580) ballSpeedX *= -1;
  if (ballY <= 0) ballSpeedY *= -1;

  // Paddle collision detection
  if (ballY >= 370 && ballX + 20 >= paddleX && ballX <= paddleX + 120) {
    ballSpeedY *= -1;
    score++;
    hitSound.play();
    scoreDisplay.textContent = `Score: ${score}`;

    // Increase speed and change ball color
    ballSpeedX += (ballSpeedX > 0 ? 0.5 : -0.5);
    ballSpeedY += (ballSpeedY > 0 ? 0.5 : -0.5);
    ball.style.backgroundColor = getRandomColor();
  }

  // Game over condition
  if (ballY >= 400) {
    gameOverSound.play();
    alert(`Game Over! Your score: ${score}`);
    resetGame();
  }

  // Update ball position
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  if (gameRunning) {
    requestAnimationFrame(updateGame);
  }
}

// Reset game function
function resetGame() {
  gameRunning = false;
  ballX = 290;
  ballY = 200;
  score = 0;
  ballSpeedX = 0;
  ballSpeedY = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  startButton.style.display = 'block';  // Show the Start Button again
}

// Generate random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

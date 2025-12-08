const objectImage = new Image();
objectImage.src = "assets/apple.png"; // path to your image
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");

const scoreSpan = document.getElementById("score");
const missSpan = document.getElementById("miss");

let basket = { x: 250, y: 350, width: 100, height: 40 };
let basketSpeed = 10;

let objects = [];
let objectSpeed = 2;

let score = 0;
let missed = 0;
let gameInterval;

// Start Game
function startGame() {
  startScreen.style.display = "none";
  canvas.style.display = "block";
  score = 0;
  missed = 0;
  objects = [];
  scoreSpan.textContent = "Score: 0";
  missSpan.textContent = "Missed: 0";
  gameInterval = setInterval(updateGame, 20);
  spawnObject();
}

// Restart Game
function restartGame() {
  gameOverScreen.style.display = "none";
  startGame();
}

// Key Controls
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") basket.x -= basketSpeed;
  if (e.key === "ArrowRight") basket.x += basketSpeed;
  if (basket.x < 0) basket.x = 0;
  if (basket.x + basket.width > canvas.width) basket.x = canvas.width - basket.width;
});

// Object Constructor
function FallingObject(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
}

function spawnObject() {
  const x = Math.random() * (canvas.width - 20);
  const size = 20;
  objects.push(new FallingObject(x, 0, size));
  setTimeout(spawnObject, 1500); // new object every 1.5s
}

// Update Game
function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw basket
  const basketImg = new Image();
  basketImg.src = "assets/basket.png";
  ctx.fillStyle = "purple";
  ctx.drawImage(basketImg, basket.x, basket.y, basket.width, basket.height);

  // Draw objects
  ctx.fillStyle = "purple";
  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i];
    obj.y += objectSpeed;
    ctx.drawImage(objectImage, obj.x, obj.y, obj.size, obj.size);

    // Collision detection
    if (
      obj.y + obj.size >= basket.y &&
      obj.x + obj.size >= basket.x &&
      obj.x <= basket.x + basket.width
    ) {
      score++;
      scoreSpan.textContent = "Score: " + score;
      objects.splice(i, 1);
      i--;
    } else if (obj.y > canvas.height) {
      missed++;
      missSpan.textContent = "Missed: " + missed;
      objects.splice(i, 1);
      i--;
      if (missed >= 3) endGame();
    }
  }
}

// End Game
function endGame() {
  clearInterval(gameInterval);
  canvas.style.display = "none";
  gameOverScreen.style.display = "block";
  finalScore.textContent = "Your Score: " + score;
}

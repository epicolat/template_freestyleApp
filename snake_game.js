/* This file implements the game logic for the Snake Game */

// Define variables to store the game state
var gridSize = 20;
var snake = [{x: 10, y: 10}];
var food = {x: 15, y: 10};
var direction = "right";
var score = 0;
var gameRunning = false;

// Function to start the game
function startGame() {
  gameRunning = true;
  renderGameBoard();
}

// Function to handle user input
function handleInput(event) {
  if (event.key === "ArrowUp" || event.key === "w") {
    direction = "up";
  } else if (event.key === "ArrowDown" || event.key === "s") {
    direction = "down";
  } else if (event.key === "ArrowLeft" || event.key === "a") {
    direction = "left";
  } else if (event.key === "ArrowRight" || event.key === "d") {
    direction = "right";
  }
}

// Function to update the game state
function updateGameState() {
  var head = Object.assign({}, snake[0]);
  if (direction === "up") {
    head.y -= 1;
  } else if (direction === "down") {
    head.y += 1;
  } else if (direction === "left") {
    head.x -= 1;
  } else if (direction === "right") {
    head.x += 1;
  }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score += 1;
    generateFood();
  } else {
    snake.pop();
  }
  if (isCollision()) {
    gameRunning = false;
    alert("Game Over! Your score is: " + score);
    resetGame();
  }
}

// Function to render the game board
function renderGameBoard() {
  var gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  for (var y = 0; y < gridSize; y++) {
    for (var x = 0; x < gridSize; x++) {
      var cell = document.createElement("div");
      cell.style.gridColumn = x + 1;
      cell.style.gridRow = y + 1;
      if (x === food.x && y === food.y) {
        cell.classList.add("food");
      }
      for (var i = 0; i < snake.length; i++) {
        if (x === snake[i].x && y === snake[i].y) {
          cell.classList.add("snake");
        }
      }
      gameBoard.appendChild(cell);
    }
  }
  var scoreCounter = document.createElement("div");
  scoreCounter.textContent = "Score: " + score;
  gameBoard.appendChild(scoreCounter);
}

// Function to generate new food
function generateFood() {
  food.x = Math.floor(Math.random() * gridSize);
  food.y = Math.floor(Math.random() * gridSize);
  for (var i = 0; i < snake.length; i++) {
    if (food.x === snake[i].x && food.y === snake[i].y) {
      generateFood();
      break;
    }
  }
}

// Function to check for collision
function isCollision() {
  var head = snake[0];
  if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
    return true;
  }
  for (var i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// Function to reset the game
function resetGame() {
  snake = [{x: 10, y: 10}];
  direction = "right";
  score = 0;
}

// Event listener for key presses
document.addEventListener("keydown", handleInput);

// Main game loop
function gameLoop() {
  if (gameRunning) {
    updateGameState();
    renderGameBoard();
    setTimeout(gameLoop, 100);
  }
}

// Start the game loop
document.getElementById("startButton").addEventListener("click", startGame);

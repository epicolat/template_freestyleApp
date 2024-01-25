/* snake_game.js */

// Variables to store the game state
let snakePosition;
let snakeDirection;
let snakeLength;
let foodPosition;
let score;

// Function to handle user input and control the snake's movement
function handleUserInput() {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowUp') {
            snakeDirection = 'up';
        } else if (event.key === 'ArrowDown') {
            snakeDirection = 'down';
        } else if (event.key === 'ArrowLeft') {
            snakeDirection = 'left';
        } else if (event.key === 'ArrowRight') {
            snakeDirection = 'right';
        }
    });
}

// Function to generate and update the position of the food element
function updateFoodPosition() {
    const maxX = 10;
    const maxY = 10;
    foodPosition = {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY)
    };
}

// Function to detect collisions between the snake and the boundaries of the game area
function detectBoundaryCollisions() {
    if (
        snakePosition.x < 0 ||
        snakePosition.x >= maxX ||
        snakePosition.y < 0 ||
        snakePosition.y >= maxY
    ) {
        handleGameOver();
    }
}

// Function to detect collisions between the snake and itself
function detectSelfCollisions() {
    for (let i = 1; i < snakeLength; i++) {
        if (
            snakePosition.x === snakePosition[i].x &&
            snakePosition.y === snakePosition[i].y
        ) {
            handleGameOver();
        }
    }
}

// Function to update the game state and render the game elements
function updateGameState() {
    if (snakeDirection === 'up') {
        snakePosition.y--;
    } else if (snakeDirection === 'down') {
        snakePosition.y++;
    } else if (snakeDirection === 'left') {
        snakePosition.x--;
    } else if (snakeDirection === 'right') {
        snakePosition.x++;
    }

    detectBoundaryCollisions();
    detectSelfCollisions();

    if (snakePosition.x === foodPosition.x && snakePosition.y === foodPosition.y) {
        snakeLength++;
        score++;
        updateFoodPosition();
    }

    renderGame();
}

// Function to handle game over conditions and display the game over screen
function handleGameOver() {
    clearInterval(gameLoop);
    alert('Game Over! Final Score: ' + score);
    showGameOverScreen();
}

// Function to start and restart the game
function startGame() {
    snakePosition = { x: 0, y: 0 };
    snakeDirection = 'right';
    snakeLength = 1;
    score = 0;
    hideGameOverScreen();
    updateFoodPosition();
    gameLoop = setInterval(updateGameState, 1000);
}

// Function to handle the game difficulty level
function handleDifficultyLevel() {
    const difficultyLevel = document.getElementById('difficulty-level').value;
    if (difficultyLevel === 'easy') {
        clearInterval(gameLoop);
        gameLoop = setInterval(updateGameState, 1000);
    } else if (difficultyLevel === 'medium') {
        clearInterval(gameLoop);
        gameLoop = setInterval(updateGameState, 500);
    } else if (difficultyLevel === 'hard') {
        clearInterval(gameLoop);
        gameLoop = setInterval(updateGameState, 250);
    }
}

// Function to play sound effects or background music
function playSoundEffects() {
    // Play audio files when certain events occur in the game
}

// Function to render the game elements in the game area
function renderGame() {
    // Render the snake and food elements in the game area
}

// Function to show the game over screen to the user
function showGameOverScreen() {
    // Show the game over screen to the user
}

// Function to hide the game over screen
function hideGameOverScreen() {
    // Hide the game over screen
}

// Call the startGame function to start the game
startGame();

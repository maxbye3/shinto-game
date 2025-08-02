const character = document.getElementById("character");
const map = document.getElementById("map");
const goal = document.getElementById("goal");

const charSize = 27; // Updated to match 3/4 smaller sprite size
const mapSize = 400;
const speed = 1;

let position = { top: 100, left: 100 };
let pressedKeys = new Set();
let animationFrame = 0;
let animationTimer = 0;
const animationSpeed = 8; // Frames per animation cycle
let currentDirection = 'down'; // Track current direction

// Track key presses
document.addEventListener("keydown", (e) => {
    pressedKeys.add(e.key);
});

// Track key releases
document.addEventListener("keyup", (e) => {
    pressedKeys.delete(e.key);
});

// Update character sprite animation
function updateAnimation(isMoving) {
    if (isMoving) {
        animationTimer++;
        if (animationTimer >= animationSpeed) {
            animationFrame = (animationFrame + 1) % 9; // 9 frames in the top row
            animationTimer = 0;
        }
    } else {
        animationFrame = 0; // Reset to first frame when not moving
        animationTimer = 0;
    }

    // Determine which row to use based on direction
    let rowY = 0; // Default to first row (down)
    if (currentDirection === 'right' || currentDirection === 'left') {
        rowY = 54; // Third row (27px * 2 = 54px)
    } else if (currentDirection === 'up') {
        rowY = 108; // Fifth row (27px * 4 = 108px)
    }

    // Special case: when both down and right are pressed
    if (pressedKeys.has("ArrowDown") && pressedKeys.has("ArrowRight")) {
        rowY = 27; // Second row (27px * 1 = 27px)
    }

    // Special case: when both down and left are pressed
    if (pressedKeys.has("ArrowDown") && pressedKeys.has("ArrowLeft")) {
        rowY = 27; // Second row (27px * 1 = 27px)
    }

    // Special case: when both up and right are pressed
    if (pressedKeys.has("ArrowUp") && pressedKeys.has("ArrowRight")) {
        rowY = 81; // Fourth row (27px * 3 = 81px)
    }

    // Special case: when both up and left are pressed
    if (pressedKeys.has("ArrowUp") && pressedKeys.has("ArrowLeft")) {
        rowY = 81; // Fourth row (27px * 3 = 81px)
    }

    // Update sprite position (each frame is 27px wide)
    character.style.backgroundPosition = `${-animationFrame * 27}px ${-rowY}px`;

    // Flip horizontally for left direction
    if (currentDirection === 'left' || (pressedKeys.has("ArrowDown") && pressedKeys.has("ArrowLeft")) || (pressedKeys.has("ArrowUp") && pressedKeys.has("ArrowLeft"))) {
        character.style.transform = 'scaleX(-1)';
    } else {
        character.style.transform = 'scaleX(1)';
    }
}

// Game loop for smooth movement
function gameLoop() {
    let moved = false;
    let nextTop = position.top;
    let nextLeft = position.left;

    // Check all pressed keys
    if (pressedKeys.has("ArrowUp")) {
        nextTop -= speed;
        moved = true;
        currentDirection = 'up';
    }
    if (pressedKeys.has("ArrowDown")) {
        nextTop += speed;
        moved = true;
        currentDirection = 'down';
    }
    if (pressedKeys.has("ArrowLeft")) {
        nextLeft -= speed;
        moved = true;
        currentDirection = 'left';
    }
    if (pressedKeys.has("ArrowRight")) {
        nextLeft += speed;
        moved = true;
        currentDirection = 'right';
    }

    // Only update position if movement occurred
    if (moved) {
        // Clamp within map bounds
        nextTop = Math.max(0, Math.min(mapSize - charSize, nextTop));
        nextLeft = Math.max(0, Math.min(mapSize - charSize, nextLeft));

        position.top = nextTop;
        position.left = nextLeft;

        character.style.top = `${position.top}px`;
        character.style.left = `${position.left}px`;

        // Check for collision with goal
        const goalPosition = { top: 200, left: 200 }; // goal position from CSS
        const goalSize = 50;

        if (checkCollision(position, charSize, goalPosition, goalSize)) {
            character.style.backgroundColor = "pink";
        }
    }

    // Update animation
    updateAnimation(moved);

    // Continue the game loop
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
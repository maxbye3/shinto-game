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

    // Update sprite position (each frame is 27px wide, top row is at y=0)
    character.style.backgroundPosition = `${-animationFrame * 27}px 0px`;
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
    }
    if (pressedKeys.has("ArrowDown")) {
        nextTop += speed;
        moved = true;
    }
    if (pressedKeys.has("ArrowLeft")) {
        nextLeft -= speed;
        moved = true;
    }
    if (pressedKeys.has("ArrowRight")) {
        nextLeft += speed;
        moved = true;
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
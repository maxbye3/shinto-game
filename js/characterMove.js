const character = document.getElementById("player");
const map = document.getElementById("map");
const conclusion = document.getElementById("conclusion");

const playerSize = 27; // Updated to match 3/4 smaller sprite size
const mapWidth = 350;
const mapHeight = 400;
const speed = 1;

let position = { top: 590, left: 180 };
let playerAnimationsAccelerated = false;
let landingAnimationInProgress = false;
let pressedKeys = new Set();
let animationFrame = 0;
let animationTimer = 0;
const animationSpeed = 8; // Frames per animation cycle
let currentDirection = 'down'; // Track current direction
let isSuccess = false; // Track if player has collided with success blocks

// Track key presses
document.addEventListener("keydown", (e) => {
    pressedKeys.add(e.key);
});

// Track key releases
document.addEventListener("keyup", (e) => {
    pressedKeys.delete(e.key);
});

// Listen for messages from parent page
window.addEventListener('message', (event) => {
    if (event.data.type === 'WALK_RIGHT') {
        if (event.data.action === 'start') {
            pressedKeys.add('ArrowRight');
        } else if (event.data.action === 'stop') {
            pressedKeys.delete('ArrowRight');
        }
    } else if (event.data.type === 'WALK_LEFT') {
        if (event.data.action === 'start') {
            pressedKeys.add('ArrowLeft');
        } else if (event.data.action === 'stop') {
            pressedKeys.delete('ArrowLeft');
        }
    } else if (event.data.type === 'WALK_UP') {
        if (event.data.action === 'start') {
            pressedKeys.add('ArrowUp');
        } else if (event.data.action === 'stop') {
            pressedKeys.delete('ArrowUp');
        }
    } else if (event.data.type === 'WALK_DOWN') {
        if (event.data.action === 'start') {
            pressedKeys.add('ArrowDown');
        } else if (event.data.action === 'stop') {
            pressedKeys.delete('ArrowDown');
        }
    } else if (event.data.type === 'WALK_UP_LEFT') {
        if (event.data.action === 'start') {
            pressedKeys.add('ArrowUp');
            pressedKeys.add('ArrowLeft');
        } else if (event.data.action === 'stop') {
            pressedKeys.delete('ArrowUp');
            pressedKeys.delete('ArrowLeft');
        }
    } else if (event.data.type === 'WALK_UP_RIGHT') {
        if (event.data.action === 'start') {
            pressedKeys.add('ArrowUp');
            pressedKeys.add('ArrowRight');
        } else if (event.data.action === 'stop') {
            pressedKeys.delete('ArrowUp');
            pressedKeys.delete('ArrowRight');
        }
    } else if (event.data.type === 'WALK_DOWN_LEFT') {
        if (event.data.action === 'start') {
            pressedKeys.add('ArrowDown');
            pressedKeys.add('ArrowLeft');
        } else if (event.data.action === 'stop') {
            pressedKeys.delete('ArrowDown');
            pressedKeys.delete('ArrowLeft');
        }
    } else if (event.data.type === 'WALK_DOWN_RIGHT') {
        if (event.data.action === 'start') {
            pressedKeys.add('ArrowDown');
            pressedKeys.add('ArrowRight');
        } else if (event.data.action === 'stop') {
            pressedKeys.delete('ArrowDown');
            pressedKeys.delete('ArrowRight');
        }
    } else if (event.data.type === 'CYCLE_MESSAGE') {
        if (event.data.action === 'cycle') {
            // Call the cycle function from sign.js
            if (typeof cycleShintoMessage === 'function') {
                cycleShintoMessage();
            }
        }
    } else if (event.data.type === 'RESUME_MOVEMENT') {
        // Re-enable player movement and temporarily ignore sign collision until exit
        window.stopPlayerMovement = false;
        window.ignoreSignCollisionUntilExit = true;
    } else if (event.data.type === 'HIDE_SQUARES') {
        // Hide all red and blue squares (in case duplicates exist)
        const squares = document.querySelectorAll('#dialogue-container, #dialogue-box-title');
        squares.forEach((el) => el.remove());
} else if (event.data.type === 'READ_SIGN') {
    // Enter reading mode: stop movement, create squares
    window.stopPlayerMovement = true;
    if (typeof createdialogueContent === 'function') createdialogueContent();
    if (typeof createdialogueTitle === 'function') createdialogueTitle();
} else if (event.data.type === 'BUS_SKIP_SPEEDUP') {
    speedUpPlayerAnimations();
}
});

function startPlayerLandingAnimation() {
    if (!character || landingAnimationInProgress || position.top <= 360) {
        return;
    }

    const duration = playerAnimationsAccelerated ? 0.3 : 3;

    landingAnimationInProgress = true;
    character.style.animation = 'none';
    void character.offsetWidth;
    character.style.animation = `player-landing ${duration}s linear forwards`;
}

function speedUpPlayerAnimations() {
    if (!character) {
        return;
    }

    playerAnimationsAccelerated = true;

    if (landingAnimationInProgress) {
        character.style.animation = 'none';
        void character.offsetWidth;
        character.style.animation = 'player-landing 0.3s linear forwards';
    }
}

window.startPlayerLandingAnimation = startPlayerLandingAnimation;

// Update character sprite animation
function updateAnimation(isMoving) {
    // Check if character element exists
    if (!character) {
        return;
    }

    // Don't update animation if character is in "facing up" state after collision
    if (currentDirection === 'up' && !isMoving) {
        return; // Keep the manual sprite position
    }

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
    // Check if player movement should be stopped due to sign collision
    if (window.stopPlayerMovement) {
        // Update animation without movement
        updateAnimation(false);
        // Continue the game loop but don't process movement
        requestAnimationFrame(gameLoop);
        return;
    }

    let moved = false;
    let nextTop = position.top;
    let nextLeft = position.left;
    let diagonalMovement = false;

    // Check all pressed keys
    if (pressedKeys.has("ArrowUp")) {
        nextTop -= speed;
        moved = true;
        if (!pressedKeys.has("ArrowLeft") && !pressedKeys.has("ArrowRight")) {
            currentDirection = 'up';
        }
    }
    if (pressedKeys.has("ArrowDown")) {
        nextTop += speed;
        moved = true;
        if (!pressedKeys.has("ArrowLeft") && !pressedKeys.has("ArrowRight")) {
            currentDirection = 'down';
        }
    }
    if (pressedKeys.has("ArrowLeft")) {
        nextLeft -= speed;
        moved = true;
        if (!pressedKeys.has("ArrowUp") && !pressedKeys.has("ArrowDown")) {
            currentDirection = 'left';
        }
    }
    if (pressedKeys.has("ArrowRight")) {
        nextLeft += speed;
        moved = true;
        if (!pressedKeys.has("ArrowUp") && !pressedKeys.has("ArrowDown")) {
            currentDirection = 'right';
        }
    }

    // Check if moving diagonally
    if ((pressedKeys.has("ArrowUp") || pressedKeys.has("ArrowDown")) &&
        (pressedKeys.has("ArrowLeft") || pressedKeys.has("ArrowRight"))) {
        diagonalMovement = true;
    }

    // Only update position if movement occurred
    if (moved) {
        // Normalize diagonal movement speed
        if (diagonalMovement) {
            const diagonalSpeed = speed / Math.sqrt(2); // Normalize to same speed as single direction
            nextTop = position.top + (nextTop - position.top) * (diagonalSpeed / speed);
            nextLeft = position.left + (nextLeft - position.left) * (diagonalSpeed / speed);
        }

        // Clamp within map bounds
        nextTop = Math.max(0, Math.min(mapHeight - playerSize, nextTop));
        nextLeft = Math.max(0, Math.min(mapWidth - playerSize, nextLeft));

        // Check for obstacle collision before updating position
        const nextPosition = { top: nextTop, left: nextLeft };
        if (!checkObstacleCollision(nextPosition, playerSize)) {
            position.top = nextTop;
            position.left = nextLeft;

            if (character) {
                character.style.top = `${position.top}px`;
                character.style.left = `${position.left}px`;
            }
        }

        // Check for collision with sign
        checkSignCollisionInGameLoop(position);

        // Check for collision with success blocks
        if (checkSuccessCollision(position, playerSize)) {
            isSuccess = true;
        }

        // Check for collision with failure block
        if (checkFailureCollision(position, playerSize)) {
            isSuccess = false;
        }

        // Check for collision with conclusion
        const conclusionPosition = { top: 100, left: 0 }; // conclusion position from CSS
        const conclusionSize = { width: 350, height: 50 }; // width: 100% of 350px map width, height: 50px

        if (checkCollision(position, playerSize, conclusionPosition, conclusionSize)) {
            if (isSuccess) {
                // If success achieved, create success squares instead of reset behavior
                if (typeof createSuccessSquares === 'function') {
                    createSuccessSquares();
                }
            } else {
                document.body.classList.add('glitch-effect');

                // Create and trigger black overlay
                const overlay = document.createElement('div');
                overlay.className = 'game-over-overlay';
                document.body.appendChild(overlay);

                // Remove the glitch effect and overlay after 0.75 seconds
                setTimeout(() => {
                    document.body.classList.remove('glitch-effect');
                    if (overlay.parentNode) {
                        overlay.parentNode.removeChild(overlay);
                    }
                }, 750);

                setTimeout(() => {
                    // Set character to face up and prevent animation override
                    currentDirection = 'up';
                    if (character) {
                        character.style.backgroundPosition = '0px -108px';
                        character.style.transform = 'scaleX(1)';
                        // Reset character position
                        position.top = 335;
                        position.left = 235;
                        character.style.top = `${position.top}px`;
                        character.style.left = `${position.left}px`;
                    }
                    // Enter reading state: stop movement and show sign content
                    window.stopPlayerMovement = true;
                    if (typeof createdialogueContent === 'function') createdialogueContent();
                    if (typeof createdialogueTitle === 'function') createdialogueTitle();
                    if (window.parent && window.parent !== window) {
                        window.parent.postMessage({ type: 'ENTER_READING' }, '*');
                    }
                    // Reset animation frame to prevent override
                    animationFrame = 0;
                    animationTimer = 0;
                }, 500);
            }
        }
    }

    // Update animation
    updateAnimation(moved);

    // Continue the game loop
    requestAnimationFrame(gameLoop);
}

// Start the game loop when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (character) {
        character.style.animation = 'none';
        character.addEventListener('animationend', (event) => {
            if (event.animationName === 'player-landing') {
                position.top = 360;
                character.style.top = `${position.top}px`;
                character.style.animation = 'none';
                landingAnimationInProgress = false;
            }
        });
    }

    if (window.parent === window || !document.querySelector('.bus')) {
        startPlayerLandingAnimation();
    }

    gameLoop();
});

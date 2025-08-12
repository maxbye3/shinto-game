// Collision detection functions
function checkCollision(playerPosition, playerSize, conclusionPosition, conclusionSize) {
    const playerRect = {
        left: playerPosition.left,
        right: playerPosition.left + playerSize,
        top: playerPosition.top,
        bottom: playerPosition.top + playerSize
    };

    // Handle both single number and object formats for conclusionSize
    const conclusionWidth = typeof conclusionSize === 'object' ? conclusionSize.width : conclusionSize;
    const conclusionHeight = typeof conclusionSize === 'object' ? conclusionSize.height : conclusionSize;

    const conclusionRect = {
        left: conclusionPosition.left,
        right: conclusionPosition.left + conclusionWidth,
        top: conclusionPosition.top,
        bottom: conclusionPosition.top + conclusionHeight
    };

    return !(playerRect.left > conclusionRect.right ||
        playerRect.right < conclusionRect.left ||
        playerRect.top > conclusionRect.bottom ||
        playerRect.bottom < conclusionRect.top);
}

// Obstacle collision detection
function checkObstacleCollision(playerPosition, playerSize) {
    const obstacles = [
        { top: 214, left: 122, width: 26, height: 40 }, // obstacle1
        { top: 214, left: 243, width: 26, height: 40 }  // obstacle2
    ];

    const playerRect = {
        left: playerPosition.left,
        right: playerPosition.left + playerSize,
        top: playerPosition.top,
        bottom: playerPosition.top + playerSize
    };

    for (let obstacle of obstacles) {
        const obstacleRect = {
            left: obstacle.left,
            right: obstacle.left + obstacle.width,
            top: obstacle.top,
            bottom: obstacle.top + obstacle.height
        };

        // Check if player collides with obstacle
        if (!(playerRect.left > obstacleRect.right ||
            playerRect.right < obstacleRect.left ||
            playerRect.top > obstacleRect.bottom ||
            playerRect.bottom < obstacleRect.top)) {
            return true; // Collision detected
        }
    }

    return false; // No collision
}

// Success collision detection
function checkSuccessCollision(playerPosition, playerSize) {
    const successBlocks = [
        { top: 220, left: 145, width: 30, height: 30 }, // success1
        { top: 220, left: 215, width: 30, height: 30 }  // success2
    ];

    const playerRect = {
        left: playerPosition.left,
        right: playerPosition.left + playerSize,
        top: playerPosition.top,
        bottom: playerPosition.top + playerSize
    };

    for (let successBlock of successBlocks) {
        const successRect = {
            left: successBlock.left,
            right: successBlock.left + successBlock.width,
            top: successBlock.top,
            bottom: successBlock.top + successBlock.height
        };

        // Check if player collides with success block
        if (!(playerRect.left > successRect.right ||
            playerRect.right < successRect.left ||
            playerRect.top > successRect.bottom ||
            playerRect.bottom < successRect.top)) {
            return true; // Collision detected
        }
    }

    return false; // No collision
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { checkCollision, checkObstacleCollision, checkSuccessCollision };
} 
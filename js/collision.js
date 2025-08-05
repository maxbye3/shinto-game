// Collision detection functions
function checkCollision(playerPosition, playerSize, resetPosition, resetSize) {
    const playerRect = {
        left: playerPosition.left,
        right: playerPosition.left + playerSize,
        top: playerPosition.top,
        bottom: playerPosition.top + playerSize
    };

    const resetRect = {
        left: resetPosition.left,
        right: resetPosition.left + resetSize,
        top: resetPosition.top,
        bottom: resetPosition.top + resetSize
    };

    return !(playerRect.left > resetRect.right ||
        playerRect.right < resetRect.left ||
        playerRect.top > resetRect.bottom ||
        playerRect.bottom < resetRect.top);
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

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { checkCollision, checkObstacleCollision };
} 
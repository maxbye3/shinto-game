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
    // Dynamically find all elements with the "obstacle" class
    const obstacleElements = document.querySelectorAll('.obstacle');

    if (obstacleElements.length === 0) {
        return false; // No obstacles found
    }

    const playerRect = {
        left: playerPosition.left,
        right: playerPosition.left + playerSize,
        top: playerPosition.top,
        bottom: playerPosition.top + playerSize
    };

    for (let obstacleElement of obstacleElements) {
        const rect = obstacleElement.getBoundingClientRect();
        const mapRect = document.getElementById('map').getBoundingClientRect();

        // Calculate obstacle position relative to the map
        const obstacleRect = {
            left: rect.left - mapRect.left,
            right: rect.right - mapRect.left,
            top: rect.top - mapRect.top,
            bottom: rect.bottom - mapRect.top
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
        { top: 220, left: 135, width: 30, height: 30 }, // success1
        { top: 220, left: 225, width: 30, height: 30 }  // success2
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

// Failure collision detection
function checkFailureCollision(playerPosition, playerSize) {
    const failureBlock = { top: 220, left: 180, width: 30, height: 30 }; // failureCollision

    const playerRect = {
        left: playerPosition.left,
        right: playerPosition.left + playerSize,
        top: playerPosition.top,
        bottom: playerPosition.top + playerSize
    };

    const failureRect = {
        left: failureBlock.left,
        right: failureBlock.left + failureBlock.width,
        top: failureBlock.top,
        bottom: failureBlock.top + failureBlock.height
    };

    // Check if player collides with failure block
    return !(playerRect.left > failureRect.right ||
        playerRect.right < failureRect.left ||
        playerRect.top > failureRect.bottom ||
        playerRect.bottom < failureRect.top);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { checkCollision, checkObstacleCollision, checkSuccessCollision, checkFailureCollision };
} 
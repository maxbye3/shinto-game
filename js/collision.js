// Collision detection functions
function checkCollision(playerPosition, playerSize, goalPosition, goalSize) {
    const playerRect = {
        left: playerPosition.left,
        right: playerPosition.left + playerSize,
        top: playerPosition.top,
        bottom: playerPosition.top + playerSize
    };

    const goalRect = {
        left: goalPosition.left,
        right: goalPosition.left + goalSize,
        top: goalPosition.top,
        bottom: goalPosition.top + goalSize
    };

    return !(playerRect.left > goalRect.right ||
        playerRect.right < goalRect.left ||
        playerRect.top > goalRect.bottom ||
        playerRect.bottom < goalRect.top);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { checkCollision };
} 
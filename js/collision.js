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

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { checkCollision };
} 
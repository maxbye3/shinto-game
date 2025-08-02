// Collision detection functions
function checkCollision(characterPosition, characterSize, goalPosition, goalSize) {
    const charRect = {
        left: characterPosition.left,
        right: characterPosition.left + characterSize,
        top: characterPosition.top,
        bottom: characterPosition.top + characterSize
    };

    const goalRect = {
        left: goalPosition.left,
        right: goalPosition.left + goalSize,
        top: goalPosition.top,
        bottom: goalPosition.top + goalSize
    };

    return !(charRect.left > goalRect.right ||
        charRect.right < goalRect.left ||
        charRect.top > goalRect.bottom ||
        charRect.bottom < goalRect.top);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { checkCollision };
} 
// Game over and collision handling
function handleresetCollision(character, position, playerSize, currentDirection) {
    const resetPosition = { top: 200, left: 200 }; // reset position from CSS
    const resetSize = 50;

    if (checkCollision(position, playerSize, resetPosition, resetSize)) {
        // Trigger game over effects
        character.style.backgroundColor = "pink";
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

        // Reset player position and direction after delay
        setTimeout(() => {
            // Set character to face up
            currentDirection = 'up';
            character.style.backgroundPosition = '0px -108px';
            character.style.transform = 'scaleX(1)';
            // Reset character position
            position.top = 360;
            position.left = 300;
            character.style.top = `${position.top}px`;
            character.style.left = `${position.left}px`;
        }, 500);

        return currentDirection;
    }

    return currentDirection;
} 
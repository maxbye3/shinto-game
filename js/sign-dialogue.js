// sign.js - Handles collision between character and sign
const sign = document.getElementById("sign");

// Sign position and size
const signSize = 40;
const signPosition = { top: 298, left: 235 }; // matches CSS position

// Function to check collision between character and sign
function checkSignCollision(characterPosition, characterSize) {
    const characterRect = {
        left: characterPosition.left,
        right: characterPosition.left + characterSize,
        top: characterPosition.top,
        bottom: characterPosition.top + characterSize
    };

    const signRect = {
        left: signPosition.left,
        right: signPosition.left + signSize,
        top: signPosition.top,
        bottom: signPosition.top + signSize
    };

    return !(characterRect.left > signRect.right ||
        characterRect.right < signRect.left ||
        characterRect.top > signRect.bottom ||
        characterRect.bottom < signRect.top);
}

// Shinto messages array
const shintoMessages = [
    "Pass through the torii gate, but remember that the middle is reserved for the kami.",
    "In Shinto, the traditional religion of Japan, kami (神) are sacred spirits, forces, or deities that inhabit all things in nature and beyond.",
    "Kami are believed to dwell in natural phenomena like mountains, rivers, rocks, trees, and even in human beings, ancestors, or extraordinary people.",
    "They can be grand and powerful like Amaterasu (the sun goddess), or humble and local, like the kami of a particular tree or stream near a village shrine.",
    "Praying to the kami is seen less as demanding miracles and more as forming a respectful connection, acknowledging that humans live alongside powerful, mysterious natural forces."
];

const successMessages = [
    // "Congrats! </br> The center of the gate is reserved for the kami. </br></br>  You’ve reached the rank of: </br></br> “incompetent gaijin”",
    "Well done! When approaching a shrine you should pass through a torii gate but superstitiously the centre of the gate is reserved for the kami."
];

let currentMessageIndex = 0;

// Function to create blue square on the map
function createdialogueContent() {
    // Remove existing instance to prevent duplicates
    const existingContent = document.getElementById('dialogue-container');
    if (existingContent) existingContent.remove();

    // Create blue square element
    const dialogueContent = document.createElement('div');
    dialogueContent.id = 'dialogue-container';
    dialogueContent.textContent = shintoMessages[currentMessageIndex];

    // Add blue square to the map
    const map = document.getElementById('map');
    if (map) {
        map.appendChild(dialogueContent);
    }
}

// Function to cycle through messages
function cycleShintoMessage() {
    const dialogueContent = document.getElementById('dialogue-container');
    if (dialogueContent) {
        currentMessageIndex = (currentMessageIndex + 1) % shintoMessages.length;
        dialogueContent.textContent = shintoMessages[currentMessageIndex];
    }
}

// Function to create red square on the map
function createdialogueTitle() {
    // Remove existing instance to prevent duplicates
    const existingTitle = document.getElementById('dialogue-box-title');
    if (existingTitle) existingTitle.remove();

    // Create red square element
    const dialogueTitle = document.createElement('div');
    dialogueTitle.id = 'dialogue-box-title';
    dialogueTitle.innerHTML = '<img src="img/sign.png" alt="Sign" class="sign-icon" style="margin-right: 5px; width: 20px; height: 20px;"> Sign';

    // Add red square to the map
    const map = document.getElementById('map');
    if (map) {
        map.appendChild(dialogueTitle);
    }
}

// Function to create success squares (blue and red) with success message
function createSuccessSquares() {
    // Create blue square with success message
    const dialogueContent = document.createElement('div');
    dialogueContent.id = 'dialogue-container';
    dialogueContent.innerHTML = successMessages[0];

    // Create red square
    const dialogueTitle = document.createElement('div');
    dialogueTitle.id = 'dialogue-box-title';
    dialogueTitle.textContent = 'nice';

    // Add both squares to the map
    const map = document.getElementById('map');
    if (map) {
        map.appendChild(dialogueContent);
        map.appendChild(dialogueTitle);
    }
}

// Track if collision has already been triggered
let signCollisionTriggered = false;
// Global flag to track if sign has been touched
window.signTouched = false;
// Global flag to track if player should be stopped
window.stopPlayerMovement = false;
// When true, do not re-trigger sign collision until player exits sign bounds
window.ignoreSignCollisionUntilExit = false;
// Track if we're currently colliding to detect exit
let wasColliding = false;

// Function to check for sign collision in game loop
function checkSignCollisionInGameLoop(characterPosition) {
    const isColliding = checkSignCollision(characterPosition, 27);

    // If we're ignoring sign collision until the player exits the bounds
    if (window.ignoreSignCollisionUntilExit) {
        if (isColliding) {
            return; // Still overlapping; do nothing
        } else {
            window.ignoreSignCollisionUntilExit = false; // Exited; re-arm collision
            return;
        }
    }

    // Check for collision entry
    if (!signCollisionTriggered && isColliding) {
        signCollisionTriggered = true;
        wasColliding = true;
        window.signTouched = true; // Set global flag
        // Don't stop movement yet; just notify parent to show Read sign button

        if (window.parent && window.parent !== window) {
            window.parent.postMessage({
                type: 'SIGN_COLLISION'
            }, '*');
        }

        setTimeout(() => {
            signCollisionTriggered = false;
        }, 3000);
    }

    // Continuously update button visibility based on collision state
    if (!window.stopPlayerMovement) { // Only when not in reading mode
        if (isColliding && !wasColliding) {
            // Just entered collision area
            wasColliding = true;
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({
                    type: 'SIGN_COLLISION'
                }, '*');
            }
        } else if (!isColliding && wasColliding) {
            // Just exited collision area
            wasColliding = false;
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({
                    type: 'SIGN_EXIT'
                }, '*');
            }
        }
    }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { checkSignCollision, showBlackOverlay, checkSignCollisionInGameLoop, createSuccessSquares };
} 
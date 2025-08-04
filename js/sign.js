// sign.js - Handles collision between character and sign
const sign = document.getElementById("sign");

// Sign position and size
const signSize = 40;
const signPosition = { top: 350, left: 10 }; // 400 - 40 - 10 = 350 from top

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
    "Kami are believed to dwell in natural phenomena like mountains, rivers, rocks, trees, and even in human beings, ancestors, or extraordinary people. They can be grand and powerful like Amaterasu (the sun goddess), or humble and local, like the kami of a particular tree or stream near a village shrine.",
    "Praying to the kami is seen less as demanding miracles and more as forming a respectful connection, acknowledging that humans live alongside powerful, mysterious natural forces and ancestors."
];

let currentMessageIndex = 0;

// Function to create blue square on the map
function createBlueSquare() {
    // Create blue square element
    const blueSquare = document.createElement('div');
    blueSquare.id = 'blue-square';
    blueSquare.textContent = shintoMessages[currentMessageIndex];

    // Add blue square to the map
    const map = document.getElementById('map');
    if (map) {
        map.appendChild(blueSquare);
    }
}

// Function to cycle through messages
function cycleShintoMessage() {
    const blueSquare = document.getElementById('blue-square');
    if (blueSquare) {
        currentMessageIndex = (currentMessageIndex + 1) % shintoMessages.length;
        blueSquare.textContent = shintoMessages[currentMessageIndex];
    }
}

// Function to create red square on the map
function createRedSquare() {
    // Create red square element
    const redSquare = document.createElement('div');
    redSquare.id = 'red-square';
    redSquare.textContent = 'sign';

    // Add red square to the map
    const map = document.getElementById('map');
    if (map) {
        map.appendChild(redSquare);
    }
}

// Track if collision has already been triggered
let signCollisionTriggered = false;

// Function to check for sign collision in game loop
function checkSignCollisionInGameLoop(characterPosition) {
    if (!signCollisionTriggered && checkSignCollision(characterPosition, 27)) {
        signCollisionTriggered = true;
        createBlueSquare();
        createRedSquare();

        // Reset collision flag after 3 seconds
        setTimeout(() => {
            signCollisionTriggered = false;
        }, 3000);
    }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { checkSignCollision, showBlackOverlay, checkSignCollisionInGameLoop };
} 
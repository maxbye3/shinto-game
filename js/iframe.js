// iframe.js - Handles communication between parent page and iframe
const iframe = document.querySelector('iframe');

// Function to send message to iframe
function sendMessageToIframe(message) {
    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(message, '*');
    }
}

// Function to make character walk right
function walkRight() {
    sendMessageToIframe({
        type: 'WALK_RIGHT',
        action: 'start'
    });
}

// Function to make character walk left
function walkLeft() {
    sendMessageToIframe({
        type: 'WALK_LEFT',
        action: 'start'
    });
}

// Function to make character walk up
function walkUp() {
    sendMessageToIframe({
        type: 'WALK_UP',
        action: 'start'
    });
}

// Function to make character walk down
function walkDown() {
    sendMessageToIframe({
        type: 'WALK_DOWN',
        action: 'start'
    });
}

// Function to make character walk up-left
function walkUpLeft() {
    sendMessageToIframe({
        type: 'WALK_UP_LEFT',
        action: 'start'
    });
}

// Function to make character walk up-right
function walkUpRight() {
    sendMessageToIframe({
        type: 'WALK_UP_RIGHT',
        action: 'start'
    });
}

// Function to make character walk down-left
function walkDownLeft() {
    sendMessageToIframe({
        type: 'WALK_DOWN_LEFT',
        action: 'start'
    });
}

// Function to make character walk down-right
function walkDownRight() {
    sendMessageToIframe({
        type: 'WALK_DOWN_RIGHT',
        action: 'start'
    });
}

// Function to stop character movement
function stopWalking() {
    sendMessageToIframe({
        type: 'WALK_RIGHT',
        action: 'stop'
    });
    sendMessageToIframe({
        type: 'WALK_LEFT',
        action: 'stop'
    });
    sendMessageToIframe({
        type: 'WALK_UP',
        action: 'stop'
    });
    sendMessageToIframe({
        type: 'WALK_DOWN',
        action: 'stop'
    });
    sendMessageToIframe({
        type: 'WALK_UP_LEFT',
        action: 'stop'
    });
    sendMessageToIframe({
        type: 'WALK_UP_RIGHT',
        action: 'stop'
    });
    sendMessageToIframe({
        type: 'WALK_DOWN_LEFT',
        action: 'stop'
    });
    sendMessageToIframe({
        type: 'WALK_DOWN_RIGHT',
        action: 'stop'
    });
}

// Add event listeners for button presses
document.addEventListener('keydown', (e) => {
    // Prevent default behavior for movement keys
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D' ||
        e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A' ||
        e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' ||
        e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
    }

    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        walkRight();
    } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        walkLeft();
    } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        walkUp();
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        walkDown();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D' ||
        e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A' ||
        e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' ||
        e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        stopWalking();
    }
});

// Function to focus the iframe
function focusIframe() {
    if (iframe) {
        iframe.focus();
    }
}

// Add click event to iframe to ensure it gets focus
document.addEventListener('DOMContentLoaded', () => {
    if (iframe) {
        iframe.addEventListener('click', () => {
            focusIframe();
        });
    }
});

// Add button click event listener
document.addEventListener('DOMContentLoaded', () => {
    const walkRightBtn = document.getElementById('walk-right-btn');
    const walkLeftBtn = document.getElementById('walk-left-btn');
    const walkUpBtn = document.getElementById('walk-up-btn');
    const walkDownBtn = document.getElementById('walk-down-btn');
    const walkUpLeftBtn = document.getElementById('walk-up-left-btn');
    const walkUpRightBtn = document.getElementById('walk-up-right-btn');
    const walkDownLeftBtn = document.getElementById('walk-down-left-btn');
    const walkDownRightBtn = document.getElementById('walk-down-right-btn');

    // Focus iframe when page loads
    focusIframe();

    if (walkRightBtn) {
        walkRightBtn.addEventListener('mousedown', () => {
            focusIframe();
            walkRight();
        });

        walkRightBtn.addEventListener('mouseup', () => {
            stopWalking();
        });

        walkRightBtn.addEventListener('mouseleave', () => {
            stopWalking();
        });
    }

    if (walkLeftBtn) {
        walkLeftBtn.addEventListener('mousedown', () => {
            focusIframe();
            walkLeft();
        });

        walkLeftBtn.addEventListener('mouseup', () => {
            stopWalking();
        });

        walkLeftBtn.addEventListener('mouseleave', () => {
            stopWalking();
        });
    }

    if (walkUpBtn) {
        walkUpBtn.addEventListener('mousedown', () => {
            focusIframe();
            walkUp();
        });

        walkUpBtn.addEventListener('mouseup', () => {
            stopWalking();
        });

        walkUpBtn.addEventListener('mouseleave', () => {
            stopWalking();
        });
    }

    if (walkDownBtn) {
        walkDownBtn.addEventListener('mousedown', () => {
            focusIframe();
            walkDown();
        });

        walkDownBtn.addEventListener('mouseup', () => {
            stopWalking();
        });

        walkDownBtn.addEventListener('mouseleave', () => {
            stopWalking();
        });
    }

    if (walkUpLeftBtn) {
        walkUpLeftBtn.addEventListener('mousedown', () => {
            focusIframe();
            walkUpLeft();
        });

        walkUpLeftBtn.addEventListener('mouseup', () => {
            stopWalking();
        });

        walkUpLeftBtn.addEventListener('mouseleave', () => {
            stopWalking();
        });
    }

    if (walkUpRightBtn) {
        walkUpRightBtn.addEventListener('mousedown', () => {
            focusIframe();
            walkUpRight();
        });

        walkUpRightBtn.addEventListener('mouseup', () => {
            stopWalking();
        });

        walkUpRightBtn.addEventListener('mouseleave', () => {
            stopWalking();
        });
    }

    if (walkDownLeftBtn) {
        walkDownLeftBtn.addEventListener('mousedown', () => {
            focusIframe();
            walkDownLeft();
        });

        walkDownLeftBtn.addEventListener('mouseup', () => {
            stopWalking();
        });

        walkDownLeftBtn.addEventListener('mouseleave', () => {
            stopWalking();
        });
    }

    if (walkDownRightBtn) {
        walkDownRightBtn.addEventListener('mousedown', () => {
            focusIframe();
            walkDownRight();
        });

        walkDownRightBtn.addEventListener('mouseup', () => {
            stopWalking();
        });

        walkDownRightBtn.addEventListener('mouseleave', () => {
            stopWalking();
        });
    }

    // Add cycle message button event listener
    const cycleMessageBtn = document.getElementById('cycle-message-btn');
    if (cycleMessageBtn) {
        cycleMessageBtn.addEventListener('click', () => {
            // Send message to iframe to cycle the Shinto message
            sendMessageToIframe({
                type: 'CYCLE_MESSAGE',
                action: 'cycle'
            });
        });
    }
});

// Listen for messages from iframe (if needed)
window.addEventListener('message', (event) => {
    // Handle any messages from iframe if needed
    console.log('Message from iframe:', event.data);
}); 
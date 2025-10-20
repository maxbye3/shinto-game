// iframe.js - Handles communication between parent page and iframe
const iframe = document.querySelector('iframe');
let skipIntroButton = null;

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

function setSkipIntroVisibility(isVisible) {
    if (!skipIntroButton) {
        skipIntroButton = document.getElementById('skip-intro');
    }

    if (!skipIntroButton) {
        return;
    }
    const readBtn = document.getElementById('read-sign-btn');
    if (readBtn) {
        readBtn.style.display = isVisible ? 'none' : 'block';
    }
    skipIntroButton.style.display = isVisible ? 'flex' : 'none';
    skipIntroButton.style.opacity = isVisible ? '1' : '0';
    skipIntroButton.style.pointerEvents = isVisible ? 'auto' : 'none';
}

// Add click event to iframe to ensure it gets focus
document.addEventListener('DOMContentLoaded', () => {
    if (iframe) {
        iframe.addEventListener('click', () => {
            focusIframe();
        });
    }

    skipIntroButton = document.getElementById('skip-intro');
    if (skipIntroButton) {
        skipIntroButton.addEventListener('click', () => {
            sendMessageToIframe({
                type: 'BUS_SKIP_SPEEDUP'
            });
            setSkipIntroVisibility(false);
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

    // Helper function to add both mouse and touch events
    function addButtonEvents(button, walkFunction) {
        if (!button) return;

        // Mouse events
        button.addEventListener('mousedown', (e) => {
            e.preventDefault();
            focusIframe();
            walkFunction();
        });

        button.addEventListener('mouseup', (e) => {
            e.preventDefault();
            stopWalking();
        });

        button.addEventListener('mouseleave', (e) => {
            e.preventDefault();
            stopWalking();
        });

        // Touch events for mobile
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            focusIframe();
            walkFunction();
        });

        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            stopWalking();
        });

        button.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            stopWalking();
        });
    }

    // Add events to all movement buttons
    addButtonEvents(walkRightBtn, walkRight);
    addButtonEvents(walkLeftBtn, walkLeft);
    addButtonEvents(walkUpBtn, walkUp);
    addButtonEvents(walkDownBtn, walkDown);
    addButtonEvents(walkUpLeftBtn, walkUpLeft);
    addButtonEvents(walkUpRightBtn, walkUpRight);
    addButtonEvents(walkDownLeftBtn, walkDownLeft);
    addButtonEvents(walkDownRightBtn, walkDownRight);

});

window.addEventListener('message', (event) => {
    if (!event || !event.data) {
        return;
    }

    if (event.data.type === 'BUS_SKIP_VISIBILITY') {
        setSkipIntroVisibility(Boolean(event.data.visible));
    }
});

// sign-interaction.js - Handles all sign interaction functionality

// Function to send message to iframe (duplicate from iframe.js for independence)
function sendMessageToIframe(message) {
    const iframe = document.querySelector('iframe');
    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(message, '*');
    }
}

// Function to hide movement buttons
function hideMovementButtons() {
    const dpadContainer = document.querySelector('.dpad-container');
    if (dpadContainer) {
        dpadContainer.style.display = 'none';
    }
}

// Function to show movement buttons
function showMovementButtons() {
    const dpadContainer = document.querySelector('.dpad-container');
    if (dpadContainer) {
        dpadContainer.style.display = 'flex';
    }
}

// Ensure Cycle Message button is visible
function showCycleMessageButton() {
    const cycleMessageBtn = document.getElementById('cycle-message-btn');
    if (cycleMessageBtn) {
        cycleMessageBtn.style.display = 'block';
    }
}

// Show/Hide Stop Reading button
function showStopReadingButton() {
    const stopBtn = document.getElementById('stop-reading-btn');
    if (stopBtn) {
        stopBtn.style.display = 'block';
    }
}

function hideStopReadingButton() {
    const stopBtn = document.getElementById('stop-reading-btn');
    if (stopBtn) {
        stopBtn.style.display = 'none';
    }
}

// Initialize sign interaction functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('Sign interaction script loaded');

    hideMovementButtons();

    // Read sign button events
    const readSignBtn = document.getElementById('read-sign-btn');
    if (readSignBtn) {
        console.log('Read sign button found');
        const onRead = (e) => {
            e.preventDefault();
            console.log('Start reading button clicked');
            // Shrink controls square height on mobile only
            if (window.innerWidth <= 875) {
                const controlsSquare = document.querySelector('.controls-square');
                if (controlsSquare) {
                    controlsSquare.style.height = '60px';
                }
            }
            // Hide the Read sign button immediately to avoid layout shifts
            const readSignBtn = document.getElementById('read-sign-btn');
            if (readSignBtn) {
                readSignBtn.style.display = 'none';
                readSignBtn.style.pointerEvents = 'none';
            }
            // Stop player movement view-side and hide movement buttons
            hideMovementButtons();
            showStopReadingButton();
            // Show the cycle message button
            const cycleMessageBtn = document.getElementById('cycle-message-btn');
            if (cycleMessageBtn) {
                cycleMessageBtn.style.display = 'block';
            }
            // Tell iframe to stop player and show content
            sendMessageToIframe({ type: 'READ_SIGN' });
        };
        readSignBtn.addEventListener('click', onRead);
        readSignBtn.addEventListener('touchstart', onRead);
    } else {
        console.log('Read sign button NOT found');
    }

    // Cycle message button (manual cycle inside reading mode)
    const cycleMessageBtn = document.getElementById('cycle-message-btn');
    if (cycleMessageBtn) {
        console.log('Cycle message button found');
        const onCycle = (e) => {
            e.preventDefault();
            sendMessageToIframe({ type: 'CYCLE_MESSAGE', action: 'cycle' });
        };
        cycleMessageBtn.addEventListener('click', onCycle);
        cycleMessageBtn.addEventListener('touchstart', onCycle);
    } else {
        console.log('Cycle message button NOT found');
    }

    // Stop Reading button events
    const stopReadingBtn = document.getElementById('stop-reading-btn');
    if (stopReadingBtn) {
        console.log('Stop reading button found');
        const onStop = (e) => {
            e.preventDefault();
            console.log('Stop reading button clicked');
            // Restore controls square height on mobile only
            if (window.innerWidth <= 875) {
                const controlsSquare = document.querySelector('.controls-square');
                if (controlsSquare) {
                    controlsSquare.style.height = '140px';
                }
            }
            hideStopReadingButton();
            showMovementButtons();
            // Show the Read sign button again
            const readSignBtn = document.getElementById('read-sign-btn');
            if (readSignBtn) {
                readSignBtn.style.display = 'block';
                readSignBtn.style.pointerEvents = 'auto';
            }
            // Hide the cycle message button
            const cycleMessageBtn = document.getElementById('cycle-message-btn');
            if (cycleMessageBtn) {
                cycleMessageBtn.style.display = 'none';
            }
            // Hide the red and blue squares
            sendMessageToIframe({ type: 'HIDE_SQUARES' });
            // Allow player to move again in iframe and ignore sign until exit
            sendMessageToIframe({ type: 'RESUME_MOVEMENT' });
        };
        stopReadingBtn.addEventListener('click', onStop);
        stopReadingBtn.addEventListener('touchstart', onStop);
    } else {
        console.log('Stop reading button NOT found');
    }
});

// Listen for messages from iframe related to sign interactions
window.addEventListener('message', (event) => {
    // Handle any messages from iframe if needed
    console.log('Message from iframe:', event.data);

    // Check if sign collision occurred
    if (event.data.type === 'SIGN_COLLISION') {
        console.log('Sign collision detected');
        // Show the Read sign button, but do not hide movement buttons yet
        const readSignBtn = document.getElementById('read-sign-btn');
        if (readSignBtn) {
            readSignBtn.style.opacity = '1';
            readSignBtn.style.pointerEvents = 'auto';
        }
    }

    // Enter reading UI (used by gameover)
    if (event.data.type === 'ENTER_READING') {
        console.log('Enter reading mode');
        hideMovementButtons();
        showStopReadingButton();
        const cycleMessageBtn = document.getElementById('cycle-message-btn');
        if (cycleMessageBtn) {
            cycleMessageBtn.style.display = 'block';
        }
    }

    if (event.data.type === 'BUS_INTRO_COMPLETE') {
        console.log('Bus intro complete, showing movement buttons');
        showMovementButtons();
    }

    // Check if sign exit occurred
    if (event.data.type === 'SIGN_EXIT') {
        console.log('Sign exit detected');
        // Hide the Read sign button when player moves away
        const readSignBtn = document.getElementById('read-sign-btn');
        if (readSignBtn) {
            readSignBtn.style.opacity = '0';
            readSignBtn.style.pointerEvents = 'none';
        }
    }
});

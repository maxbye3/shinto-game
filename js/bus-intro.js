document.addEventListener('DOMContentLoaded', () => {
    const busElement = document.querySelector('.bus');

    if (!busElement || window.parent === window) {
        return;
    }

    const SPEED_MULTIPLIER = 10;
    let skipActivated = false;

    const parseTimeList = (value) => value
        .split(',')
        .map((part) => parseFloat(part.trim()) || 0);

    const formatTimeList = (values) => values
        .map((value) => `${Math.round(value * 100) / 100}s`)
        .join(', ');

    const computedStyle = getComputedStyle(busElement);
    const baseDurations = parseTimeList(computedStyle.animationDuration);
    const baseDelays = parseTimeList(computedStyle.animationDelay);

    const notifyParent = (visible) => {
        window.parent.postMessage({
            type: 'BUS_SKIP_VISIBILITY',
            visible
        }, '*');
    };

    const accelerateAnimations = () => {
        if (!skipActivated) {
            return;
        }

        let updated = false;

        if (typeof busElement.getAnimations === 'function') {
            const animations = busElement.getAnimations();

            if (animations.length) {
                animations.forEach((animation) => {
                    animation.playbackRate = SPEED_MULTIPLIER;
                });
                updated = true;
            }
        }

        if (!updated) {
            const acceleratedDurations = baseDurations.map((duration) => duration / SPEED_MULTIPLIER);
            const acceleratedDelays = baseDelays.map((delay) => delay / SPEED_MULTIPLIER);

            busElement.style.animationDuration = formatTimeList(acceleratedDurations);
            busElement.style.animationDelay = formatTimeList(acceleratedDelays);
        }
    };

    const speedUpBusAnimation = () => {
        if (skipActivated) {
            return;
        }

        skipActivated = true;
        accelerateAnimations();
        requestAnimationFrame(accelerateAnimations);
    };

    // Ensure the button appears as soon as the bus sequence starts.
    notifyParent(true);

    busElement.addEventListener('animationstart', (event) => {
        if (event.animationName === 'bus-drive-in') {
            notifyParent(true);
        }

        if (skipActivated) {
            requestAnimationFrame(accelerateAnimations);
        }
    });

    busElement.addEventListener('animationend', (event) => {
        if (event.animationName === 'bus-drive-out') {
            notifyParent(false);
        }
    });

    window.addEventListener('message', (event) => {
        if (!event || event.source !== window.parent || !event.data) {
            return;
        }

        if (event.data.type === 'BUS_SKIP_SPEEDUP') {
            speedUpBusAnimation();
        }
    });
});

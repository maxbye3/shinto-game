document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mapElement = document.getElementById('map');

    if (!mapElement) {
        return;
    }

    const backgroundSrc = 'img/bg.png';
    const backgroundImage = new Image();
    let completed = false;

    const finishLoading = () => {
        if (completed) {
            return;
        }

        completed = true;
        window.gameBackgroundReady = true;

        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }

        mapElement.hidden = false;

        const busElement = mapElement.querySelector('.bus');
        if (busElement) {
            busElement.style.animationPlayState = 'running';
        }

        document.dispatchEvent(new Event('backgroundLoaded'));
    };

    backgroundImage.addEventListener('load', finishLoading);
    backgroundImage.addEventListener('error', finishLoading);
    backgroundImage.src = backgroundSrc;

    if (backgroundImage.complete) {
        finishLoading();
    }
});

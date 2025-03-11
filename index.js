addListeners();

let heartBeatAnimation = null;

function addListeners() {
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().fadeIn(block, 5000);
        });
    document.getElementById('fadeInReset')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().resetFadeIn(block);
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().move(block, 1000, {x: 100, y: 10});
        });
    document.getElementById('moveReset')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().resetMoveAndScale(block);
        });
    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().scale(block, 1000, 1.25);
        });
    document.getElementById('scaleReset')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().resetMoveAndScale(block);
        });
    
    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().fadeOut(block, 5000);
        });
    document.getElementById('fadeOutReset')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().resetFadeOut(block);
        });
    document.getElementById('moveAndHide')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            animaster().moveAndHide(block, 5000);
        });

    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animaster().showAndHide(block, 5000);
        });

    document.getElementById('heartBeating')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            heartBeatAnimation = animaster().heartBeating(block);
        });

    document.getElementById('heartBeatingStop')
        .addEventListener('click', function () {
            if (heartBeatAnimation && heartBeatAnimation.stop) {
                heartBeatAnimation.stop();
            }
        });
}

function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}

function animaster() {

    function fadeIn(element, duration) {
        element.style.transitionDuration = `${duration}ms`;
        element.classList.remove('hide');
        element.classList.add('show');
    }

    function fadeOut(element, duration) {
        element.style.transitionDuration = `${duration}ms`;
        element.classList.remove('show');
        element.classList.add('hide');
    }

    function move(element, duration, translation) {
        element.style.transitionDuration = `${duration}ms`;
        element.style.transform = getTransform(translation, null);
    }

    function scale(element, duration, ratio) {
        element.style.transitionDuration = `${duration}ms`;
        element.style.transform = getTransform(null, ratio);
    }

    function moveAndHide(element, duration) {
        move(element, 2 / 5 * duration, {x: 100, y: 20});
        setTimeout(fadeOut, duration * 2 / 5, element, duration * 3 / 5);
    }

    function showAndHide(element, duration) {
        fadeIn(element, duration * 1 / 3);
        setTimeout(fadeOut, duration * 2 / 3, element, duration * 1 / 3);
    }

    function heartBeating(element) {
        const timerId = setInterval(() => {
            scale(element, 500, 1.4);
            setTimeout(() => scale(element, 500, 5 / 7), 500);
        }, 1000);

        return {
            stop: () => clearInterval(timerId)
        };
    }

    function resetFadeIn(element) {
        // Сбрасываем стили, заданные fadeIn
        element.style.transitionDuration = null;
        // Возвращаем исходное состояние классов: убираем 'show', добавляем 'hide'
        element.classList.remove('show');
        element.classList.add('hide');
    }

    function resetFadeOut(element) {
        // Сбрасываем стили, заданные fadeOut
        element.style.transitionDuration = null;
        // Возвращаем исходное состояние классов: убираем 'hide', добавляем 'show'
        element.classList.remove('hide');
        element.classList.add('show');
    }

    function resetMoveAndScale(element) {
        // Сбрасываем все inline-стили, установленные методами move и scale
        element.style.transitionDuration = null;
        element.style.transform = null;
    }

    return {
        fadeIn: fadeIn,
        fadeOut: fadeOut,
        move: move,
        scale: scale,
        moveAndHide: moveAndHide,
        showAndHide: showAndHide,
        heartBeating: heartBeating,
        resetFadeOut: resetFadeOut,
        resetFadeIn: resetFadeIn,
        resetMoveAndScale: resetMoveAndScale
    }
}

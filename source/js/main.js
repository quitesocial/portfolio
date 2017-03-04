(() => {
    let parallaxContainer = document.getElementById('parallax'),
        layers = parallaxContainer.getElementsByClassName('parallax-layer');

    window.addEventListener('mousemove', (e) => {
        let pageX = e.pageX,
            pageY = e.pageY,
            initialX = (window.innerWidth / 2) - pageX,
            initialY = (window.innerHeight / 2) - pageY;

        [].slice.call(layers).forEach((layer, i) => {
            let divider = (i + 1) / 100,
                positionX = initialX * divider,
                positionY = initialY * divider,
                layerStyle = layer.style,
                transformString = 'translate3d(' + positionX + 'px, ' + positionY + 'px, 0)';

            layerStyle.transform = transformString;
            layerStyle.msTransform = transformString;
            layerStyle.webkitTransform = transformString;
            layerStyle.oTransform = transformString;
            layerStyle.mozTransform = transformString;
        });
    });
})();

(() => {

    let parallaxScroll = (() => {

        let bg = document.querySelector('.parallax-bg'),
            user = document.querySelector('.parallax-user'),
            sectionName = document.querySelector('.parallax-name');

        return {
            move: (block, windowScroll, strafeAmount) => {
                let strafe = windowScroll / -strafeAmount + '%',
                    style = block.style;

                style.marginTop = strafe;
            },

            init: function (wScroll) {
                this.move(bg, wScroll, 45);
                this.move(sectionName, wScroll, 35);
                this.move(user, wScroll, 25);
            }
        }

    })();

    window.onscroll = () => {

        let wScroll = window.pageYOffset;

        parallaxScroll.init(wScroll);
    };
})();

(() => {

    let button = $('.auth__button'),
        flipContainer = $('.flipper'),
        backButton = $('.auth__back-button');

    button.on('click', () => {
       flipContainer.addClass('flip');
       button.addClass('auth__button_hidden');
    });

    backButton.on('click', () => {
       flipContainer.removeClass('flip');
       button.removeClass('auth__button_hidden');
    });

})();

console.log('hello!');
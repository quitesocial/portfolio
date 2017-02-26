(function () {
    var parallaxContainer = document.getElementById('parallax'),
        layers = parallaxContainer.getElementsByClassName('parallax-layer');

    window.addEventListener('mousemove', function(e) {
        var pageX = e.pageX,
            pageY = e.pageY,
            initialX = (window.innerWidth / 2) - pageX,
            initialY = (window.innerHeight / 2) - pageY;

        [].slice.call(layers).forEach(function(layer, i) {
            var divider = (i + 1) / 100,
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

(function() {

    var parallaxScroll = (function () {

        var bg = document.querySelector('.parallax-bg'),
            user = document.querySelector('.parallax-user'),
            sectionName = document.querySelector('.parallax-name');

        return {
            move: function (block, windowScroll, strafeAmount) {
                var strafe = windowScroll / -strafeAmount + '%',
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

    window.onscroll = function() {

        var wScroll = window.pageYOffset;

        parallaxScroll.init(wScroll);
    };
})();

(function() {

    var button = $('.auth__button'),
        flipContainer = $('.wrapper'),
        backButton = $('.auth__back-button');

    button.on('click', function() {
       flipContainer.addClass('flip');
       button.addClass('auth__button_hidden');
    });

    backButton.on('click', function () {
       flipContainer.removeClass('flip');
       button.removeClass('auth__button_hidden');
    });

})();
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

        // console.log(initialX, initialY);
    });
})();
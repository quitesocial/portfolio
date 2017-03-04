// parallax on mouse move

let parallaxMouseMove = (() => {
    let parallaxContainer = document.getElementById('parallax'),
        layers = parallaxContainer.getElementsByClassName('parallax-layer');
    return {
        init: function init() {
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
            })
        }
    }
})();

// parallax on scroll

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
        init: function init(wScroll) {
            this.move(bg, wScroll, 45);
            this.move(sectionName, wScroll, 35);
            this.move(user, wScroll, 25);
        }
    }
})();

// welcome page flipper

let flipper = (() => {
    return {
        init: function init() {
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
        }
    }
})();

// hamburger main menu

// let menu = (() => {
//     return {
//         init: function init() {
//             let hamburger = $('.menu-button'),
//                 mainMenu = $('.main-menu');
//             hamburger.on('click', () => {
//                 mainMenu.toggleClass('main-menu_opened');
//             });
//         }
//     }
// })();

let menu = (() => {
    return {
        init: function init() {
            let hamburger = $('.menu-button'),
                mainMenu = $('.main-menu');
            hamburger.on('click', () => {
                mainMenu.toggleClass('main-menu_opened');
                hamburger.toggleClass('is-active');
            });
        }
    }
})();

// init block

window.onload = () => {
    parallaxMouseMove.init();
    flipper.init();
    menu.init();
};

window.onscroll = () => {
    let wScroll = window.pageYOffset;
    parallaxScroll.init(wScroll);
};
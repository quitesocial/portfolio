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

// sticky blog navigation

let blogMenu = (() => {
    return {
        init: function init() {
            let nav = $('.blog-nav__list'),
                startPos = nav.offset().top;
            $(window).scroll(() => {
                if ($(window).scrollTop() >= startPos) {
                    if (nav.hasClass() == false) {
                        nav.addClass('blog-nav__list_totop');
                    }
                }
                else {
                    nav.removeClass('blog-nav__list_totop');
                }
            });
        }
    }
})();

// active post blog navigation scroll

let activePostChanger = (() => {
    return {
        init: function init() {
            var menu_selector = ".blog-nav";

            function onScroll() {
                var scroll_top = $(document).scrollTop() / 1.08;
                $(menu_selector + " a").each(function () {
                    var hash = $(this).attr("href");
                    var target = $(hash);
                    if (target.position().top <= scroll_top && (target.position().top * 2) + target.outerHeight() > scroll_top) {
                        $(menu_selector + " a.blog-nav__link_active").removeClass("blog-nav__link_active");
                        $(this).addClass("blog-nav__link_active");
                    } else {
                        $(this).removeClass("blog-nav__link_active");
                    }
                });
            };
            $(document).on("scroll", onScroll);
            $("a[href^='#']").click(function (e) {
                e.preventDefault();
                $(document).off("scroll");
                $(menu_selector + " a.blog-nav__link_active").removeClass("blog-nav__link_active");
                $(this).addClass("blog-nav__link_active");
                var hash = $(this).attr("href");
                var target = $(hash);
                $("html, body").animate({
                    scrollTop: target.offset().top
                }, 500, function () {
                    window.location.hash = hash;
                    $(document).on("scroll", onScroll);
                });
            });
        }
    }
})();

// init block

window.onload = () => {
    parallaxMouseMove.init();
    flipper.init();
    menu.init();
    if ($('.blog-nav__list').length) {
        blogMenu.init();
        activePostChanger.init();
    }
};

window.onscroll = () => {
    let wScroll = window.pageYOffset;
    parallaxScroll.init(wScroll);
};
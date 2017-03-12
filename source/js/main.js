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
        init: function init(navBlockString) {
            var menu_selector = navBlockString;

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
            }

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

// mobile blog navigation menu

let mobileNav = (() => {
    let nav = $('.touch-nav .blog-nav__list'),
        button = $('.touch-button'),
        openedString = 'blog-nav__list_opened';
    return {
        init: function init() {
            button.on('click', () => {
                nav.toggleClass(openedString);
            });
        }
    }
})();

// easy portfolio slider

let easySlider = (() => {
    let points = document.querySelectorAll('.easy-slider__item');
    let slider = document.querySelector('#slider');
    let pointActive = 0;
    let prev = document.querySelector('#prev');
    let next = document.querySelector('#next');
    return {
        init: function init() {
            let setClickedItem = (e) => {
                removeActivePoints();
                let clickedPoint = e.target;
                pointActive = clickedPoint.itemID;
                changePosition(clickedPoint);
            };
            points[pointActive].classList.add("easy-slider__item_active");
            let removeActivePoints = () => {
                for (let i = 0; i < points.length; i++) {
                    points[i].classList.remove("easy-slider__item_active");
                }
            };
            let changePosition = (point) => {
                point.classList.add("easy-slider__item_active");
                slider.style.left = point.getAttribute("data-pos");
            };
            for (let i = 0; i < points.length; i++) {
                let point = points[i];
                point.addEventListener('click', setClickedItem, false);
                point.itemID = i;
            }
            prev.addEventListener('click', (e) => {
                if (points[0].classList.contains('easy-slider__item_active')) {
                    e.preventDefault();
                } else if (points[1].classList.contains('easy-slider__item_active')) {
                    slider.style.left = '0';
                    removeActivePoints();
                    changePosition(points[0]);
                } else if (points[2].classList.contains('easy-slider__item_active')) {
                    slider.style.left = '100%';
                    removeActivePoints();
                    changePosition(points[1]);
                } else if (points[3].classList.contains('easy-slider__item_active')) {
                    slider.style.left = '200%';
                    removeActivePoints();
                    changePosition(points[2]);
                }
            });
            next.addEventListener('click', (e) => {
                if (points[0].classList.contains('easy-slider__item_active')) {
                    slider.style.left = '-100%';
                    removeActivePoints();
                    changePosition(points[1]);
                } else if (points[1].classList.contains('easy-slider__item_active')) {
                    slider.style.left = '-200%';
                    removeActivePoints();
                    changePosition(points[2]);
                } else if (points[2].classList.contains('easy-slider__item_active')) {
                    slider.style.left = '-300%';
                    removeActivePoints();
                    changePosition(points[3]);
                } else if (points[3].classList.contains('easy-slider__item_active')) {
                    e.preventDefault();
                }
            });
        }
    }
})();

// preloader

let preloader = (() => {
    let preloader = $('.preloader');
    let percentsTotal = 0;
    let imgPath = $('*').map((ndx, element) => {
        let background = $(element).css('background-image');
        let isImg = $(element).is('img');
        let path = '';
        if (background != 'none') {
            path = background.replace('url("', '').replace('")', '');
        }
        if (isImg) path = $(element).attr('src');
        if (path) return path;
    });

    let setPercents = (total, current) => {
        let percents = Math.ceil(current / total * 100);
        $('.preloader__percents').text(percents + '%');
        if (percents >= 100) preloader.fadeOut();
    };
    let loadImages = (images) => {
        if (!images.length) preloader.fadeOut();
        images.forEach((img, i, images) => {
            let fakeImage = $('<img>', {
                attr: {
                    src: img
                }
            });
            fakeImage.on('load error', () => {
                percentsTotal++;
                setPercents(images.length, percentsTotal);
            });
        });
    };
    return {
        init: function () {
            let imgs = imgPath.toArray();
            loadImages(imgs);
        }
    }
})();

// arrows scrolls

let arrowScroll = (() => {
    return {
        init: function init() {
            $('.header__next, .totop').click((e) => {
                e.preventDefault();
                $(document).off("scroll");
                let hash = $(e.currentTarget).attr('href');
                let target = $(hash);
                $("html, body").animate({
                    scrollTop: target.offset().top
                }, 600, function () {
                    window.location.hash = hash;
                });
            });
        }
    }
})();

// init block

$(function () {
    preloader.init();
});

window.onload = () => {
    parallaxMouseMove.init();
    flipper.init();
    arrowScroll.init();
    menu.init();
    if ($('.blog-nav__list').length) {
        blogMenu.init();
        activePostChanger.init('.blog-nav');
        activePostChanger.init('.touch-nav');
        mobileNav.init();
    }
    if ($('#slider').length) {
        easySlider.init();
    }

// google maps

    if ($('#map').length) {
        var map;
        var styles = [
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "weight": 4
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#6c9c5a"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#6c9c5a"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#6c9c5a"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#c0c0c0"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#c0c0c0"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#c0c0c0"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#c0c0c0"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#6c9c5a"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#6c9c5a"
                    }
                ]
            }
        ];

        function initMap() {
            if (window.outerWidth >= 800) {
                var mapOptions = {
                    zoom: 15,
                    center: {lat: 55.657478, lng: 37.469733},
                    disableDefaultUI: true,
                    draggable: false,
                    scrollwheel: false,
                    disableDoubleClickZoom: true
                };
            } else {
                var mapOptions = {
                    zoom: 13,
                    center: {lat: 55.657478, lng: 37.469733},
                    disableDefaultUI: true,
                    draggable: false,
                    scrollwheel: false,
                    disableDoubleClickZoom: true
                };
            }
            map = new google.maps.Map(document.getElementById('map'), mapOptions);
            map.setOptions({styles: styles});
            var image = 'assets/images/map_marker.png';
            var marker = new google.maps.Marker({
                position: {lat: 55.657702, lng: 37.482361},
                map: map,
                draggable: false,
                animation: google.maps.Animation.DROP,
                title: 'Позвоните мне, если хотите сделать классный сайт!',
                icon: image
            });
        }

        initMap();
    }
};

window.onscroll = () => {
    let wScroll = window.pageYOffset;
    parallaxScroll.init(wScroll);
};
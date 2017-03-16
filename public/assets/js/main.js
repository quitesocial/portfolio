'use strict';

// parallax on mouse move

var parallaxMouseMove = function () {
    var parallaxContainer = document.getElementById('parallax'),
        layers = parallaxContainer.getElementsByClassName('parallax-layer');
    return {
        init: function init() {
            window.addEventListener('mousemove', function (e) {
                var pageX = e.pageX,
                    pageY = e.pageY,
                    initialX = window.innerWidth / 2 - pageX,
                    initialY = window.innerHeight / 2 - pageY;
                [].slice.call(layers).forEach(function (layer, i) {
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
        }
    };
}();

// parallax on scroll

var parallaxScroll = function () {
    var bg = document.querySelector('.parallax-bg'),
        user = document.querySelector('.parallax-user'),
        sectionName = document.querySelector('.parallax-name');
    return {
        move: function move(block, windowScroll, strafeAmount) {
            var strafe = windowScroll / -strafeAmount + '%',
                style = block.style;
            style.marginTop = strafe;
        },
        init: function init(wScroll) {
            this.move(bg, wScroll, 45);
            this.move(sectionName, wScroll, 35);
            this.move(user, wScroll, 25);
        }
    };
}();

// welcome page flipper

var flipper = function () {
    return {
        init: function init() {
            var button = $('.auth__button'),
                flipContainer = $('.flipper'),
                backButton = $('.auth__back-button');
            button.on('click', function () {
                flipContainer.addClass('flip');
                button.addClass('auth__button_hidden');
            });
            backButton.on('click', function () {
                flipContainer.removeClass('flip');
                button.removeClass('auth__button_hidden');
            });
        }
    };
}();

// hamburger main menu

var menu = function () {
    return {
        init: function init() {
            var hamburger = $('.menu-button'),
                mainMenu = $('.main-menu');
            hamburger.on('click', function () {
                mainMenu.toggleClass('main-menu_opened');
                hamburger.toggleClass('is-active');
            });
        }
    };
}();

// sticky blog navigation

var blogMenu = function () {
    return {
        init: function init() {
            var nav = $('.blog-nav__list'),
                startPos = nav.offset().top;
            $(window).scroll(function () {
                if ($(window).scrollTop() >= startPos) {
                    if (nav.hasClass() == false) {
                        nav.addClass('blog-nav__list_totop');
                    }
                } else {
                    nav.removeClass('blog-nav__list_totop');
                }
            });
        }
    };
}();

// active post blog navigation scroll

var activePostChanger = function () {
    return {
        init: function init(navBlockString) {
            var menu_selector = navBlockString;

            function onScroll() {
                var scroll_top = $(document).scrollTop() / 1.08;
                $(menu_selector + " a").each(function () {
                    var hash = $(this).attr("href");
                    var target = $(hash);
                    if (target.position().top <= scroll_top && target.position().top * 2 + target.outerHeight() > scroll_top) {
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
    };
}();

// mobile blog navigation menu

var mobileNav = function () {
    var nav = $('.touch-nav .blog-nav__list'),
        button = $('.touch-button'),
        openedString = 'blog-nav__list_opened';
    return {
        init: function init() {
            button.on('click', function () {
                nav.toggleClass(openedString);
            });
        }
    };
}();

// easy portfolio slider

var easySlider = function () {
    var points = document.querySelectorAll('.easy-slider__item');
    var slider = document.querySelector('#slider');
    var pointActive = 0;
    var prev = document.querySelector('#prev');
    var next = document.querySelector('#next');
    return {
        init: function init() {
            var setClickedItem = function setClickedItem(e) {
                removeActivePoints();
                var clickedPoint = e.target;
                pointActive = clickedPoint.itemID;
                changePosition(clickedPoint);
            };
            points[pointActive].classList.add("easy-slider__item_active");
            var removeActivePoints = function removeActivePoints() {
                for (var i = 0; i < points.length; i++) {
                    points[i].classList.remove("easy-slider__item_active");
                }
            };
            var changePosition = function changePosition(point) {
                point.classList.add("easy-slider__item_active");
                slider.style.left = point.getAttribute("data-pos");
            };
            for (var i = 0; i < points.length; i++) {
                var point = points[i];
                point.addEventListener('click', setClickedItem, false);
                point.itemID = i;
            }
            prev.addEventListener('click', function (e) {
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
            next.addEventListener('click', function (e) {
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
    };
}();

// preloader

var preloader = function () {
    var preloader = $('.preloader');
    var percentsTotal = 0;
    var imgPath = $('*').map(function (ndx, element) {
        var background = $(element).css('background-image');
        var isImg = $(element).is('img');
        var path = '';
        if (background != 'none') {
            path = background.replace('url("', '').replace('")', '');
        }
        if (isImg) path = $(element).attr('src');
        if (path) return path;
    });

    var setPercents = function setPercents(total, current) {
        var percents = Math.ceil(current / total * 100);
        $('.preloader__percents').text(percents + '%');
        if (percents >= 100) preloader.fadeOut();
    };
    var loadImages = function loadImages(images) {
        if (!images.length) preloader.fadeOut();
        images.forEach(function (img, i, images) {
            var fakeImage = $('<img>', {
                attr: {
                    src: img
                }
            });
            fakeImage.on('load error', function () {
                percentsTotal++;
                setPercents(images.length, percentsTotal);
            });
        });
    };
    return {
        init: function init() {
            var imgs = imgPath.toArray();
            loadImages(imgs);
        }
    };
}();

// arrows scrolls

var arrowScroll = function () {
    return {
        init: function init() {
            $('.header__next, .totop').click(function (e) {
                e.preventDefault();
                $(document).off("scroll");
                var hash = $(e.currentTarget).attr('href');
                var target = $(hash);
                $("html, body").animate({
                    scrollTop: target.offset().top
                }, 600, function () {
                    window.location.hash = hash;
                });
            });
        }
    };
}();

// feedback form validation

var formValidator = function () {
    var init = function init(form) {
        validate(form);
    };
    var validate = function validate(form) {
        var error = $('.feedback__error');
        form.on('submit', function (e) {
            e.preventDefault();
            var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]');
            var valid = true;
            $.each(elements, function (index, value) {
                var element = $(value);
                var val = element.val();
                if (val.length === 0) {
                    element.next(error).addClass('feedback__error_is-error');
                    element.addClass('error');
                    valid = false;
                } else {
                    element.next(error).removeClass('feedback__error_is-error');
                    element.removeClass('error');
                    element.addClass('success');
                }
            });
            console.log(valid);
        });
        form.on('reset', function (e) {
            error.removeClass('feedback__error_is-error');
            error.prev().removeClass('error');
            error.prev().removeClass('success');
        });
        form.on('change', function (e) {
            var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]');
            var valid = true;
            $.each(elements, function (index, value) {
                var element = $(value);
                var val = element.val();
                if (val.length === 0) {
                    element.next(error).addClass('feedback__error_is-error');
                    element.addClass('error');
                    valid = false;
                } else {
                    element.next(error).removeClass('feedback__error_is-error');
                    element.removeClass('error');
                    element.addClass('success');
                }
            });
        });
    };
    return {
        init: init
    };
}();

// login form validation

var loginValidator = function () {
    var init = function init(form) {
        validate(form);
    };
    var validate = function validate(form) {
        var error = $('.auth__error');
        form.on('submit', function (e) {
            e.preventDefault();
            var elements = form.find('input').not('input[type="file"], input[type="hidden"], input[type="checkbox"], input[type="radio"]');
            var valid = true;
            $.each(elements, function (index, value) {
                var element = $(value);
                var icon = element.prev('.auth__input-icon');
                var val = element.val();
                if (val.length === 0) {
                    element.next(error).addClass('auth__error_is-error');
                    icon.removeClass('auth__input-icon_success');
                    element.removeClass('success-login');
                    icon.addClass('auth__input-icon_error');
                    element.addClass('error-login');
                    valid = false;
                } else {
                    element.next(error).removeClass('auth__error_is-error');
                    icon.removeClass('auth__input-icon_error');
                    element.removeClass('error-login');
                    icon.addClass('auth__input-icon_success');
                    element.addClass('success-login');
                }
            });
            console.log(valid);
        });
        form.on('change', function (e) {
            var elements = form.find('input').not('input[type="file"], input[type="hidden"], input[type="checkbox"], input[type="radio"]');
            var valid = true;
            $.each(elements, function (index, value) {
                var element = $(value);
                var icon = element.prev('.auth__input-icon');
                var val = element.val();
                if (val.length === 0) {
                    element.next(error).addClass('auth__error_is-error');
                    icon.removeClass('auth__input-icon_success');
                    element.removeClass('success-login');
                    icon.addClass('auth__input-icon_error');
                    element.addClass('error-login');
                    valid = false;
                } else {
                    element.next(error).removeClass('auth__error_is-error');
                    icon.removeClass('auth__input-icon_error');
                    element.removeClass('error-login');
                    icon.addClass('auth__input-icon_success');
                    element.addClass('success-login');
                }
            });
        });
    };
    return {
        init: init
    };
}();

// init block

$(function () {
    preloader.init();
});

window.onload = function () {
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
    if ($('#feedback, #auth').length) {
        formValidator.init($('#feedback'));
        loginValidator.init($('#auth'));
    }

    // google maps

    if ($('#map').length) {
        var initMap = function initMap() {
            if (window.outerWidth >= 800) {
                var mapOptions = {
                    zoom: 15,
                    center: { lat: 55.657478, lng: 37.469733 },
                    disableDefaultUI: true,
                    draggable: false,
                    scrollwheel: false,
                    disableDoubleClickZoom: true
                };
            } else {
                var mapOptions = {
                    zoom: 13,
                    center: { lat: 55.657478, lng: 37.469733 },
                    disableDefaultUI: true,
                    draggable: false,
                    scrollwheel: false,
                    disableDoubleClickZoom: true
                };
            }
            map = new google.maps.Map(document.getElementById('map'), mapOptions);
            map.setOptions({ styles: styles });
            var image = 'assets/images/map_marker.png';
            var marker = new google.maps.Marker({
                position: { lat: 55.657702, lng: 37.482361 },
                map: map,
                draggable: false,
                animation: google.maps.Animation.DROP,
                title: 'Позвоните мне, если хотите сделать классный сайт!',
                icon: image
            });
        };

        var map;
        var styles = [{
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative.land_parcel",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape.man_made",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [{
                "weight": 4
            }]
        }, {
            "featureType": "landscape.natural",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#6c9c5a"
            }]
        }, {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#6c9c5a"
            }]
        }, {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#6c9c5a"
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#c0c0c0"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#c0c0c0"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#c0c0c0"
            }]
        }, {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#c0c0c0"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "transit",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#6c9c5a"
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#6c9c5a"
            }]
        }];

        initMap();
    }
};

window.onscroll = function () {
    var wScroll = window.pageYOffset;
    parallaxScroll.init(wScroll);
};

console.log('backend-lol');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsicGFyYWxsYXhNb3VzZU1vdmUiLCJwYXJhbGxheENvbnRhaW5lciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJsYXllcnMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiaW5pdCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicGFnZVgiLCJwYWdlWSIsImluaXRpYWxYIiwiaW5uZXJXaWR0aCIsImluaXRpYWxZIiwiaW5uZXJIZWlnaHQiLCJzbGljZSIsImNhbGwiLCJmb3JFYWNoIiwibGF5ZXIiLCJpIiwiZGl2aWRlciIsInBvc2l0aW9uWCIsInBvc2l0aW9uWSIsImxheWVyU3R5bGUiLCJzdHlsZSIsInRyYW5zZm9ybVN0cmluZyIsInRyYW5zZm9ybSIsIm1zVHJhbnNmb3JtIiwid2Via2l0VHJhbnNmb3JtIiwib1RyYW5zZm9ybSIsIm1velRyYW5zZm9ybSIsInBhcmFsbGF4U2Nyb2xsIiwiYmciLCJxdWVyeVNlbGVjdG9yIiwidXNlciIsInNlY3Rpb25OYW1lIiwibW92ZSIsImJsb2NrIiwid2luZG93U2Nyb2xsIiwic3RyYWZlQW1vdW50Iiwic3RyYWZlIiwibWFyZ2luVG9wIiwid1Njcm9sbCIsImZsaXBwZXIiLCJidXR0b24iLCIkIiwiZmxpcENvbnRhaW5lciIsImJhY2tCdXR0b24iLCJvbiIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJtZW51IiwiaGFtYnVyZ2VyIiwibWFpbk1lbnUiLCJ0b2dnbGVDbGFzcyIsImJsb2dNZW51IiwibmF2Iiwic3RhcnRQb3MiLCJvZmZzZXQiLCJ0b3AiLCJzY3JvbGwiLCJzY3JvbGxUb3AiLCJoYXNDbGFzcyIsImFjdGl2ZVBvc3RDaGFuZ2VyIiwibmF2QmxvY2tTdHJpbmciLCJtZW51X3NlbGVjdG9yIiwib25TY3JvbGwiLCJzY3JvbGxfdG9wIiwiZWFjaCIsImhhc2giLCJhdHRyIiwidGFyZ2V0IiwicG9zaXRpb24iLCJvdXRlckhlaWdodCIsImNsaWNrIiwicHJldmVudERlZmF1bHQiLCJvZmYiLCJhbmltYXRlIiwibG9jYXRpb24iLCJtb2JpbGVOYXYiLCJvcGVuZWRTdHJpbmciLCJlYXN5U2xpZGVyIiwicG9pbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsInNsaWRlciIsInBvaW50QWN0aXZlIiwicHJldiIsIm5leHQiLCJzZXRDbGlja2VkSXRlbSIsInJlbW92ZUFjdGl2ZVBvaW50cyIsImNsaWNrZWRQb2ludCIsIml0ZW1JRCIsImNoYW5nZVBvc2l0aW9uIiwiY2xhc3NMaXN0IiwiYWRkIiwibGVuZ3RoIiwicmVtb3ZlIiwicG9pbnQiLCJsZWZ0IiwiZ2V0QXR0cmlidXRlIiwiY29udGFpbnMiLCJwcmVsb2FkZXIiLCJwZXJjZW50c1RvdGFsIiwiaW1nUGF0aCIsIm1hcCIsIm5keCIsImVsZW1lbnQiLCJiYWNrZ3JvdW5kIiwiY3NzIiwiaXNJbWciLCJpcyIsInBhdGgiLCJyZXBsYWNlIiwic2V0UGVyY2VudHMiLCJ0b3RhbCIsImN1cnJlbnQiLCJwZXJjZW50cyIsIk1hdGgiLCJjZWlsIiwidGV4dCIsImZhZGVPdXQiLCJsb2FkSW1hZ2VzIiwiaW1hZ2VzIiwiaW1nIiwiZmFrZUltYWdlIiwic3JjIiwiaW1ncyIsInRvQXJyYXkiLCJhcnJvd1Njcm9sbCIsImN1cnJlbnRUYXJnZXQiLCJmb3JtVmFsaWRhdG9yIiwiZm9ybSIsInZhbGlkYXRlIiwiZXJyb3IiLCJlbGVtZW50cyIsImZpbmQiLCJub3QiLCJ2YWxpZCIsImluZGV4IiwidmFsdWUiLCJ2YWwiLCJjb25zb2xlIiwibG9nIiwibG9naW5WYWxpZGF0b3IiLCJpY29uIiwib25sb2FkIiwiaW5pdE1hcCIsIm91dGVyV2lkdGgiLCJtYXBPcHRpb25zIiwiem9vbSIsImNlbnRlciIsImxhdCIsImxuZyIsImRpc2FibGVEZWZhdWx0VUkiLCJkcmFnZ2FibGUiLCJzY3JvbGx3aGVlbCIsImRpc2FibGVEb3VibGVDbGlja1pvb20iLCJnb29nbGUiLCJtYXBzIiwiTWFwIiwic2V0T3B0aW9ucyIsInN0eWxlcyIsImltYWdlIiwibWFya2VyIiwiTWFya2VyIiwiYW5pbWF0aW9uIiwiQW5pbWF0aW9uIiwiRFJPUCIsInRpdGxlIiwib25zY3JvbGwiLCJwYWdlWU9mZnNldCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQSxJQUFBQSxvQkFBQSxZQUFBO0FBQ0EsUUFBQUMsb0JBQUFDLFNBQUFDLGNBQUEsQ0FBQSxVQUFBLENBQUE7QUFBQSxRQUNBQyxTQUFBSCxrQkFBQUksc0JBQUEsQ0FBQSxnQkFBQSxDQURBO0FBRUEsV0FBQTtBQUNBQyxjQUFBLFNBQUFBLElBQUEsR0FBQTtBQUNBQyxtQkFBQUMsZ0JBQUEsQ0FBQSxXQUFBLEVBQUEsVUFBQUMsQ0FBQSxFQUFBO0FBQ0Esb0JBQUFDLFFBQUFELEVBQUFDLEtBQUE7QUFBQSxvQkFDQUMsUUFBQUYsRUFBQUUsS0FEQTtBQUFBLG9CQUVBQyxXQUFBTCxPQUFBTSxVQUFBLEdBQUEsQ0FBQSxHQUFBSCxLQUZBO0FBQUEsb0JBR0FJLFdBQUFQLE9BQUFRLFdBQUEsR0FBQSxDQUFBLEdBQUFKLEtBSEE7QUFJQSxtQkFBQUssS0FBQSxDQUFBQyxJQUFBLENBQUFiLE1BQUEsRUFBQWMsT0FBQSxDQUFBLFVBQUFDLEtBQUEsRUFBQUMsQ0FBQSxFQUFBO0FBQ0Esd0JBQUFDLFVBQUEsQ0FBQUQsSUFBQSxDQUFBLElBQUEsR0FBQTtBQUFBLHdCQUNBRSxZQUFBVixXQUFBUyxPQURBO0FBQUEsd0JBRUFFLFlBQUFULFdBQUFPLE9BRkE7QUFBQSx3QkFHQUcsYUFBQUwsTUFBQU0sS0FIQTtBQUFBLHdCQUlBQyxrQkFBQSxpQkFBQUosU0FBQSxHQUFBLE1BQUEsR0FBQUMsU0FBQSxHQUFBLFFBSkE7QUFLQUMsK0JBQUFHLFNBQUEsR0FBQUQsZUFBQTtBQUNBRiwrQkFBQUksV0FBQSxHQUFBRixlQUFBO0FBQ0FGLCtCQUFBSyxlQUFBLEdBQUFILGVBQUE7QUFDQUYsK0JBQUFNLFVBQUEsR0FBQUosZUFBQTtBQUNBRiwrQkFBQU8sWUFBQSxHQUFBTCxlQUFBO0FB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LENBQ0E7QUFDQSx5QkFBQTtBQURBLGFBREE7QUFIQSxTQS9FQSxFQXdGQTtBQUNBLDJCQUFBLGNBREE7QUFFQSwyQkFBQSxlQUZBO0FBR0EsdUJBQUEsQ0FDQTtBQUNBLHlCQUFBO0FBREEsYUFEQTtBQUhBLFNBeEZBLEVBaUdBO0FBQ0EsMkJBQUEsY0FEQTtBQUVBLDJCQUFBLGlCQUZBO0FBR0EsdUJBQUEsQ0FDQTtBQUNBLHlCQUFBO0FBREEsYUFEQTtBQUhBLFNBakdBLEVBMEdBO0FBQ0EsMkJBQUEsZ0NBREE7QUFFQSwyQkFBQSxlQUZBO0FBR0EsdUJBQUEsQ0FDQTtBQUNBLHlCQUFBO0FBREEsYUFEQTtBQUhBLFNBMUdBLEVBbUhBO0FBQ0EsMkJBQUEsWUFEQTtBQUVBLDJCQUFBLGVBRkE7QUFHQSx1QkFBQSxDQUNBO0FBQ0EseUJBQUE7QUFEQSxhQURBO0FBSEEsU0FuSEEsRUE0SEE7QUFDQSwyQkFBQSxTQURBO0FBRUEsdUJBQUEsQ0FDQTtBQUNBLDhCQUFBO0FBREEsYUFEQTtBQUZBLFNBNUhBLEVBb0lBO0FBQ0EsMkJBQUEsT0FEQTtBQUVBLDJCQUFBLGVBRkE7QUFHQSx1QkFBQSxDQUNBO0FBQ0EseUJBQUE7QUFEQSxhQURBO0FBSEEsU0FwSUEsRUE2SUE7QUFDQSwyQkFBQSxPQURBO0FBRUEsMkJBQUEsaUJBRkE7QUFHQSx1QkFBQSxDQUNBO0FBQ0EseUJBQUE7QUFEQSxhQURBO0FBSEEsU0E3SUEsQ0FBQTs7QUF5TEFmO0FBQ0E7QUFDQSxDQWxOQTs7QUFvTkE1SSxPQUFBbUssUUFBQSxHQUFBLFlBQUE7QUFDQSxRQUFBL0gsVUFBQXBDLE9BQUFvSyxXQUFBO0FBQ0EzSSxtQkFBQTFCLElBQUEsQ0FBQXFDLE9BQUE7QUFDQSxDQUhBOztBQUtBbUcsUUFBQUMsR0FBQSxDQUFBLGFBQUEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHBhcmFsbGF4IG9uIG1vdXNlIG1vdmVcclxuXHJcbmxldCBwYXJhbGxheE1vdXNlTW92ZSA9ICgoKSA9PiB7XHJcbiAgICBsZXQgcGFyYWxsYXhDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFyYWxsYXgnKSxcclxuICAgICAgICBsYXllcnMgPSBwYXJhbGxheENvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwYXJhbGxheC1sYXllcicpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBwYWdlWCA9IGUucGFnZVgsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVkgPSBlLnBhZ2VZLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxYID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgLSBwYWdlWCxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsWSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIHBhZ2VZO1xyXG4gICAgICAgICAgICAgICAgW10uc2xpY2UuY2FsbChsYXllcnMpLmZvckVhY2goKGxheWVyLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpdmlkZXIgPSAoaSArIDEpIC8gMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblggPSBpbml0aWFsWCAqIGRpdmlkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWSA9IGluaXRpYWxZICogZGl2aWRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXJTdHlsZSA9IGxheWVyLnN0eWxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoJyArIHBvc2l0aW9uWCArICdweCwgJyArIHBvc2l0aW9uWSArICdweCwgMCknO1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyU3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyU3R5bGUubXNUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJTdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJTdHlsZS5vVHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyU3R5bGUubW96VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuLy8gcGFyYWxsYXggb24gc2Nyb2xsXHJcblxyXG5sZXQgcGFyYWxsYXhTY3JvbGwgPSAoKCkgPT4ge1xyXG4gICAgbGV0IGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhcmFsbGF4LWJnJyksXHJcbiAgICAgICAgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYXJhbGxheC11c2VyJyksXHJcbiAgICAgICAgc2VjdGlvbk5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFyYWxsYXgtbmFtZScpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBtb3ZlOiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnLFxyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBibG9jay5zdHlsZTtcclxuICAgICAgICAgICAgc3R5bGUubWFyZ2luVG9wID0gc3RyYWZlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCh3U2Nyb2xsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZShiZywgd1Njcm9sbCwgNDUpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmUoc2VjdGlvbk5hbWUsIHdTY3JvbGwsIDM1KTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKHVzZXIsIHdTY3JvbGwsIDI1KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG4vLyB3ZWxjb21lIHBhZ2UgZmxpcHBlclxyXG5cclxubGV0IGZsaXBwZXIgPSAoKCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICBsZXQgYnV0dG9uID0gJCgnLmF1dGhfX2J1dHRvbicpLFxyXG4gICAgICAgICAgICAgICAgZmxpcENvbnRhaW5lciA9ICQoJy5mbGlwcGVyJyksXHJcbiAgICAgICAgICAgICAgICBiYWNrQnV0dG9uID0gJCgnLmF1dGhfX2JhY2stYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmbGlwQ29udGFpbmVyLmFkZENsYXNzKCdmbGlwJyk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uYWRkQ2xhc3MoJ2F1dGhfX2J1dHRvbl9oaWRkZW4nKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGJhY2tCdXR0b24ub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmxpcENvbnRhaW5lci5yZW1vdmVDbGFzcygnZmxpcCcpO1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLnJlbW92ZUNsYXNzKCdhdXRoX19idXR0b25faGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuXHJcbi8vIGhhbWJ1cmdlciBtYWluIG1lbnVcclxuXHJcbmxldCBtZW51ID0gKCgpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgbGV0IGhhbWJ1cmdlciA9ICQoJy5tZW51LWJ1dHRvbicpLFxyXG4gICAgICAgICAgICAgICAgbWFpbk1lbnUgPSAkKCcubWFpbi1tZW51Jyk7XHJcbiAgICAgICAgICAgIGhhbWJ1cmdlci5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtYWluTWVudS50b2dnbGVDbGFzcygnbWFpbi1tZW51X29wZW5lZCcpO1xyXG4gICAgICAgICAgICAgICAgaGFtYnVyZ2VyLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuLy8gc3RpY2t5IGJsb2cgbmF2aWdhdGlvblxyXG5cclxubGV0IGJsb2dNZW51ID0gKCgpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgbGV0IG5hdiA9ICQoJy5ibG9nLW5hdl9fbGlzdCcpLFxyXG4gICAgICAgICAgICAgICAgc3RhcnRQb3MgPSBuYXYub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPj0gc3RhcnRQb3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmF2Lmhhc0NsYXNzKCkgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF2LmFkZENsYXNzKCdibG9nLW5hdl9fbGlzdF90b3RvcCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdi5yZW1vdmVDbGFzcygnYmxvZy1uYXZfX2xpc3RfdG90b3AnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuLy8gYWN0aXZlIHBvc3QgYmxvZyBuYXZpZ2F0aW9uIHNjcm9sbFxyXG5cclxubGV0IGFjdGl2ZVBvc3RDaGFuZ2VyID0gKCgpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdChuYXZCbG9ja1N0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgbWVudV9zZWxlY3RvciA9IG5hdkJsb2NrU3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gb25TY3JvbGwoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsX3RvcCA9ICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpIC8gMS4wODtcclxuICAgICAgICAgICAgICAgICQobWVudV9zZWxlY3RvciArIFwiIGFcIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhhc2ggPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKGhhc2gpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQucG9zaXRpb24oKS50b3AgPD0gc2Nyb2xsX3RvcCAmJiAodGFyZ2V0LnBvc2l0aW9uKCkudG9wICogMikgKyB0YXJnZXQub3V0ZXJIZWlnaHQoKSA+IHNjcm9sbF90b3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChtZW51X3NlbGVjdG9yICsgXCIgYS5ibG9nLW5hdl9fbGlua19hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJibG9nLW5hdl9fbGlua19hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJibG9nLW5hdl9fbGlua19hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImJsb2ctbmF2X19saW5rX2FjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJChkb2N1bWVudCkub24oXCJzY3JvbGxcIiwgb25TY3JvbGwpO1xyXG4gICAgICAgICAgICAkKFwiYVtocmVmXj0nIyddXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vZmYoXCJzY3JvbGxcIik7XHJcbiAgICAgICAgICAgICAgICAkKG1lbnVfc2VsZWN0b3IgKyBcIiBhLmJsb2ctbmF2X19saW5rX2FjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImJsb2ctbmF2X19saW5rX2FjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJibG9nLW5hdl9fbGlua19hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGFzaCA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJChoYXNoKTtcclxuICAgICAgICAgICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxyXG4gICAgICAgICAgICAgICAgfSwgNTAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBoYXNoO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKFwic2Nyb2xsXCIsIG9uU2Nyb2xsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG4vLyBtb2JpbGUgYmxvZyBuYXZpZ2F0aW9uIG1lbnVcclxuXHJcbmxldCBtb2JpbGVOYXYgPSAoKCkgPT4ge1xyXG4gICAgbGV0IG5hdiA9ICQoJy50b3VjaC1uYXYgLmJsb2ctbmF2X19saXN0JyksXHJcbiAgICAgICAgYnV0dG9uID0gJCgnLnRvdWNoLWJ1dHRvbicpLFxyXG4gICAgICAgIG9wZW5lZFN0cmluZyA9ICdibG9nLW5hdl9fbGlzdF9vcGVuZWQnO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICBidXR0b24ub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmF2LnRvZ2dsZUNsYXNzKG9wZW5lZFN0cmluZyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuXHJcbi8vIGVhc3kgcG9ydGZvbGlvIHNsaWRlclxyXG5cclxubGV0IGVhc3lTbGlkZXIgPSAoKCkgPT4ge1xyXG4gICAgbGV0IHBvaW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lYXN5LXNsaWRlcl9faXRlbScpO1xyXG4gICAgbGV0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzbGlkZXInKTtcclxuICAgIGxldCBwb2ludEFjdGl2ZSA9IDA7XHJcbiAgICBsZXQgcHJldiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmV2Jyk7XHJcbiAgICBsZXQgbmV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXh0Jyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgIGxldCBzZXRDbGlja2VkSXRlbSA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVBY3RpdmVQb2ludHMoKTtcclxuICAgICAgICAgICAgICAgIGxldCBjbGlja2VkUG9pbnQgPSBlLnRhcmdldDtcclxuICAgICAgICAgICAgICAgIHBvaW50QWN0aXZlID0gY2xpY2tlZFBvaW50Lml0ZW1JRDtcclxuICAgICAgICAgICAgICAgIGNoYW5nZVBvc2l0aW9uKGNsaWNrZWRQb2ludCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHBvaW50c1twb2ludEFjdGl2ZV0uY2xhc3NMaXN0LmFkZChcImVhc3ktc2xpZGVyX19pdGVtX2FjdGl2ZVwiKTtcclxuICAgICAgICAgICAgbGV0IHJlbW92ZUFjdGl2ZVBvaW50cyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJlYXN5LXNsaWRlcl9faXRlbV9hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGxldCBjaGFuZ2VQb3NpdGlvbiA9IChwb2ludCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcG9pbnQuY2xhc3NMaXN0LmFkZChcImVhc3ktc2xpZGVyX19pdGVtX2FjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlci5zdHlsZS5sZWZ0ID0gcG9pbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1wb3NcIik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9pbnQgPSBwb2ludHNbaV07XHJcbiAgICAgICAgICAgICAgICBwb2ludC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNldENsaWNrZWRJdGVtLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBwb2ludC5pdGVtSUQgPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvaW50c1swXS5jbGFzc0xpc3QuY29udGFpbnMoJ2Vhc3ktc2xpZGVyX19pdGVtX2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb2ludHNbMV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdlYXN5LXNsaWRlcl9faXRlbV9hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlci5zdHlsZS5sZWZ0ID0gJzAnO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUFjdGl2ZVBvaW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZVBvc2l0aW9uKHBvaW50c1swXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvaW50c1syXS5jbGFzc0xpc3QuY29udGFpbnMoJ2Vhc3ktc2xpZGVyX19pdGVtX2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyLnN0eWxlLmxlZnQgPSAnMTAwJSc7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQWN0aXZlUG9pbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlUG9zaXRpb24ocG9pbnRzWzFdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9pbnRzWzNdLmNsYXNzTGlzdC5jb250YWlucygnZWFzeS1zbGlkZXJfX2l0ZW1fYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXIuc3R5bGUubGVmdCA9ICcyMDAlJztcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVBY3RpdmVQb2ludHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VQb3NpdGlvbihwb2ludHNbMl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9pbnRzWzBdLmNsYXNzTGlzdC5jb250YWlucygnZWFzeS1zbGlkZXJfX2l0ZW1fYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXIuc3R5bGUubGVmdCA9ICctMTAwJSc7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQWN0aXZlUG9pbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlUG9zaXRpb24ocG9pbnRzWzFdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9pbnRzWzFdLmNsYXNzTGlzdC5jb250YWlucygnZWFzeS1zbGlkZXJfX2l0ZW1fYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXIuc3R5bGUubGVmdCA9ICctMjAwJSc7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQWN0aXZlUG9pbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlUG9zaXRpb24ocG9pbnRzWzJdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9pbnRzWzJdLmNsYXNzTGlzdC5jb250YWlucygnZWFzeS1zbGlkZXJfX2l0ZW1fYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXIuc3R5bGUubGVmdCA9ICctMzAwJSc7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQWN0aXZlUG9pbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlUG9zaXRpb24ocG9pbnRzWzNdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9pbnRzWzNdLmNsYXNzTGlzdC5jb250YWlucygnZWFzeS1zbGlkZXJfX2l0ZW1fYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuXHJcbi8vIHByZWxvYWRlclxyXG5cclxubGV0IHByZWxvYWRlciA9ICgoKSA9PiB7XHJcbiAgICBsZXQgcHJlbG9hZGVyID0gJCgnLnByZWxvYWRlcicpO1xyXG4gICAgbGV0IHBlcmNlbnRzVG90YWwgPSAwO1xyXG4gICAgbGV0IGltZ1BhdGggPSAkKCcqJykubWFwKChuZHgsIGVsZW1lbnQpID0+IHtcclxuICAgICAgICBsZXQgYmFja2dyb3VuZCA9ICQoZWxlbWVudCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyk7XHJcbiAgICAgICAgbGV0IGlzSW1nID0gJChlbGVtZW50KS5pcygnaW1nJyk7XHJcbiAgICAgICAgbGV0IHBhdGggPSAnJztcclxuICAgICAgICBpZiAoYmFja2dyb3VuZCAhPSAnbm9uZScpIHtcclxuICAgICAgICAgICAgcGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzSW1nKSBwYXRoID0gJChlbGVtZW50KS5hdHRyKCdzcmMnKTtcclxuICAgICAgICBpZiAocGF0aCkgcmV0dXJuIHBhdGg7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgc2V0UGVyY2VudHMgPSAodG90YWwsIGN1cnJlbnQpID0+IHtcclxuICAgICAgICBsZXQgcGVyY2VudHMgPSBNYXRoLmNlaWwoY3VycmVudCAvIHRvdGFsICogMTAwKTtcclxuICAgICAgICAkKCcucHJlbG9hZGVyX19wZXJjZW50cycpLnRleHQocGVyY2VudHMgKyAnJScpO1xyXG4gICAgICAgIGlmIChwZXJjZW50cyA+PSAxMDApIHByZWxvYWRlci5mYWRlT3V0KCk7XHJcbiAgICB9O1xyXG4gICAgbGV0IGxvYWRJbWFnZXMgPSAoaW1hZ2VzKSA9PiB7XHJcbiAgICAgICAgaWYgKCFpbWFnZXMubGVuZ3RoKSBwcmVsb2FkZXIuZmFkZU91dCgpO1xyXG4gICAgICAgIGltYWdlcy5mb3JFYWNoKChpbWcsIGksIGltYWdlcykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZmFrZUltYWdlID0gJCgnPGltZz4nLCB7XHJcbiAgICAgICAgICAgICAgICBhdHRyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBpbWdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGZha2VJbWFnZS5vbignbG9hZCBlcnJvcicsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcclxuICAgICAgICAgICAgICAgIHNldFBlcmNlbnRzKGltYWdlcy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGltZ3MgPSBpbWdQYXRoLnRvQXJyYXkoKTtcclxuICAgICAgICAgICAgbG9hZEltYWdlcyhpbWdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG4vLyBhcnJvd3Mgc2Nyb2xsc1xyXG5cclxubGV0IGFycm93U2Nyb2xsID0gKCgpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgJCgnLmhlYWRlcl9fbmV4dCwgLnRvdG9wJykuY2xpY2soKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9mZihcInNjcm9sbFwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBoYXNoID0gJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSAkKGhhc2gpO1xyXG4gICAgICAgICAgICAgICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wXHJcbiAgICAgICAgICAgICAgICB9LCA2MDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGhhc2g7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuLy8gZmVlZGJhY2sgZm9ybSB2YWxpZGF0aW9uXHJcblxyXG5sZXQgZm9ybVZhbGlkYXRvciA9ICgoKSA9PiB7XHJcbiAgICBsZXQgaW5pdCA9IChmb3JtKSA9PiB7XHJcbiAgICAgICAgdmFsaWRhdGUoZm9ybSk7XHJcbiAgICB9O1xyXG4gICAgbGV0IHZhbGlkYXRlID0gZm9ybSA9PiB7XHJcbiAgICAgICAgbGV0IGVycm9yID0gJCgnLmZlZWRiYWNrX19lcnJvcicpO1xyXG4gICAgICAgIGZvcm0ub24oJ3N1Ym1pdCcsIGUgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50cyA9IGZvcm0uZmluZCgnaW5wdXQsIHRleHRhcmVhJykubm90KCdpbnB1dFt0eXBlPVwiZmlsZVwiXSwgaW5wdXRbdHlwZT1cImhpZGRlblwiXScpO1xyXG4gICAgICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAkLmVhY2goZWxlbWVudHMsIChpbmRleCwgdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gJCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gZWxlbWVudC52YWwoKTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5uZXh0KGVycm9yKS5hZGRDbGFzcygnZmVlZGJhY2tfX2Vycm9yX2lzLWVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnZXJyb3InKTtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm5leHQoZXJyb3IpLnJlbW92ZUNsYXNzKCdmZWVkYmFja19fZXJyb3JfaXMtZXJyb3InKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ3N1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZhbGlkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBmb3JtLm9uKCdyZXNldCcsIGUgPT4ge1xyXG4gICAgICAgICAgICBlcnJvci5yZW1vdmVDbGFzcygnZmVlZGJhY2tfX2Vycm9yX2lzLWVycm9yJyk7XHJcbiAgICAgICAgICAgIGVycm9yLnByZXYoKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcclxuICAgICAgICAgICAgZXJyb3IucHJldigpLnJlbW92ZUNsYXNzKCdzdWNjZXNzJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZm9ybS5vbignY2hhbmdlJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50cyA9IGZvcm0uZmluZCgnaW5wdXQsIHRleHRhcmVhJykubm90KCdpbnB1dFt0eXBlPVwiZmlsZVwiXSwgaW5wdXRbdHlwZT1cImhpZGRlblwiXScpO1xyXG4gICAgICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAkLmVhY2goZWxlbWVudHMsIChpbmRleCwgdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gJCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gZWxlbWVudC52YWwoKTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5uZXh0KGVycm9yKS5hZGRDbGFzcygnZmVlZGJhY2tfX2Vycm9yX2lzLWVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnZXJyb3InKTtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm5leHQoZXJyb3IpLnJlbW92ZUNsYXNzKCdmZWVkYmFja19fZXJyb3JfaXMtZXJyb3InKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ3N1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBpbml0LFxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuLy8gbG9naW4gZm9ybSB2YWxpZGF0aW9uXHJcblxyXG5sZXQgbG9naW5WYWxpZGF0b3IgPSAoKCkgPT4ge1xyXG4gICAgbGV0IGluaXQgPSAoZm9ybSkgPT4ge1xyXG4gICAgICAgIHZhbGlkYXRlKGZvcm0pO1xyXG4gICAgfTtcclxuICAgIGxldCB2YWxpZGF0ZSA9IGZvcm0gPT4ge1xyXG4gICAgICAgIGxldCBlcnJvciA9ICQoJy5hdXRoX19lcnJvcicpO1xyXG4gICAgICAgIGZvcm0ub24oJ3N1Ym1pdCcsIGUgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50cyA9IGZvcm0uZmluZCgnaW5wdXQnKS5ub3QoJ2lucHV0W3R5cGU9XCJmaWxlXCJdLCBpbnB1dFt0eXBlPVwiaGlkZGVuXCJdLCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0sIGlucHV0W3R5cGU9XCJyYWRpb1wiXScpO1xyXG4gICAgICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAkLmVhY2goZWxlbWVudHMsIChpbmRleCwgdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gJCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWNvbiA9IGVsZW1lbnQucHJldignLmF1dGhfX2lucHV0LWljb24nKTtcclxuICAgICAgICAgICAgICAgIGxldCB2YWwgPSBlbGVtZW50LnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm5leHQoZXJyb3IpLmFkZENsYXNzKCdhdXRoX19lcnJvcl9pcy1lcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGljb24ucmVtb3ZlQ2xhc3MoJ2F1dGhfX2lucHV0LWljb25fc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3N1Y2Nlc3MtbG9naW4nKTtcclxuICAgICAgICAgICAgICAgICAgICBpY29uLmFkZENsYXNzKCdhdXRoX19pbnB1dC1pY29uX2Vycm9yJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnZXJyb3ItbG9naW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm5leHQoZXJyb3IpLnJlbW92ZUNsYXNzKCdhdXRoX19lcnJvcl9pcy1lcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGljb24ucmVtb3ZlQ2xhc3MoJ2F1dGhfX2lucHV0LWljb25fZXJyb3InKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdlcnJvci1sb2dpbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGljb24uYWRkQ2xhc3MoJ2F1dGhfX2lucHV0LWljb25fc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ3N1Y2Nlc3MtbG9naW4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZhbGlkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBmb3JtLm9uKCdjaGFuZ2UnLCBlID0+IHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnRzID0gZm9ybS5maW5kKCdpbnB1dCcpLm5vdCgnaW5wdXRbdHlwZT1cImZpbGVcIl0sIGlucHV0W3R5cGU9XCJoaWRkZW5cIl0sIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXSwgaW5wdXRbdHlwZT1cInJhZGlvXCJdJyk7XHJcbiAgICAgICAgICAgIGxldCB2YWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgICQuZWFjaChlbGVtZW50cywgKGluZGV4LCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSAkKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGxldCBpY29uID0gZWxlbWVudC5wcmV2KCcuYXV0aF9faW5wdXQtaWNvbicpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IGVsZW1lbnQudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubmV4dChlcnJvcikuYWRkQ2xhc3MoJ2F1dGhfX2Vycm9yX2lzLWVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbi5yZW1vdmVDbGFzcygnYXV0aF9faW5wdXQtaWNvbl9zdWNjZXNzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygnc3VjY2Vzcy1sb2dpbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGljb24uYWRkQ2xhc3MoJ2F1dGhfX2lucHV0LWljb25fZXJyb3InKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdlcnJvci1sb2dpbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubmV4dChlcnJvcikucmVtb3ZlQ2xhc3MoJ2F1dGhfX2Vycm9yX2lzLWVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbi5yZW1vdmVDbGFzcygnYXV0aF9faW5wdXQtaWNvbl9lcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2Vycm9yLWxvZ2luJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbi5hZGRDbGFzcygnYXV0aF9faW5wdXQtaWNvbl9zdWNjZXNzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnc3VjY2Vzcy1sb2dpbicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGluaXQsXHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG4vLyBpbml0IGJsb2NrXHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgIHByZWxvYWRlci5pbml0KCk7XHJcbn0pO1xyXG5cclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgIHBhcmFsbGF4TW91c2VNb3ZlLmluaXQoKTtcclxuICAgIGZsaXBwZXIuaW5pdCgpO1xyXG4gICAgYXJyb3dTY3JvbGwuaW5pdCgpO1xyXG4gICAgbWVudS5pbml0KCk7XHJcbiAgICBpZiAoJCgnLmJsb2ctbmF2X19saXN0JykubGVuZ3RoKSB7XHJcbiAgICAgICAgYmxvZ01lbnUuaW5pdCgpO1xyXG4gICAgICAgIGFjdGl2ZVBvc3RDaGFuZ2VyLmluaXQoJy5ibG9nLW5hdicpO1xyXG4gICAgICAgIGFjdGl2ZVBvc3RDaGFuZ2VyLmluaXQoJy50b3VjaC1uYXYnKTtcclxuICAgICAgICBtb2JpbGVOYXYuaW5pdCgpO1xyXG4gICAgfVxyXG4gICAgaWYgKCQoJyNzbGlkZXInKS5sZW5ndGgpIHtcclxuICAgICAgICBlYXN5U2xpZGVyLmluaXQoKTtcclxuICAgIH1cclxuICAgIGlmICgkKCcjZmVlZGJhY2ssICNhdXRoJykubGVuZ3RoKSB7XHJcbiAgICAgICAgZm9ybVZhbGlkYXRvci5pbml0KCQoJyNmZWVkYmFjaycpKTtcclxuICAgICAgICBsb2dpblZhbGlkYXRvci5pbml0KCQoJyNhdXRoJykpO1xyXG4gICAgfVxyXG5cclxuLy8gZ29vZ2xlIG1hcHNcclxuXHJcbiAgICBpZiAoJCgnI21hcCcpLmxlbmd0aCkge1xyXG4gICAgICAgIHZhciBtYXA7XHJcbiAgICAgICAgdmFyIHN0eWxlcyA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlXCIsXHJcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlLmxhbmRfcGFyY2VsXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubWFuX21hZGVcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZS5uYXR1cmFsXCIsXHJcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2VpZ2h0XCI6IDRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubmF0dXJhbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNmM5YzVhXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubmF0dXJhbC50ZXJyYWluXCIsXHJcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNmM5YzVhXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubmF0dXJhbC50ZXJyYWluXCIsXHJcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM2YzljNWFcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXHJcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYzBjMGMwXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcclxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNjMGMwYzBcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxyXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYzBjMGMwXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXkuY29udHJvbGxlZF9hY2Nlc3NcIixcclxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNjMGMwYzBcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIixcclxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXRcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNmM5YzVhXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNmM5YzVhXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0TWFwKCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93Lm91dGVyV2lkdGggPj0gODAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWFwT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB6b29tOiAxNSxcclxuICAgICAgICAgICAgICAgICAgICBjZW50ZXI6IHtsYXQ6IDU1LjY1NzQ3OCwgbG5nOiAzNy40Njk3MzN9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVEZWZhdWx0VUk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZURvdWJsZUNsaWNrWm9vbTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBtYXBPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHpvb206IDEzLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlcjoge2xhdDogNTUuNjU3NDc4LCBsbmc6IDM3LjQ2OTczM30sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZURlZmF1bHRVSTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlRG91YmxlQ2xpY2tab29tOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCBtYXBPcHRpb25zKTtcclxuICAgICAgICAgICAgbWFwLnNldE9wdGlvbnMoe3N0eWxlczogc3R5bGVzfSk7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZSA9ICdhc3NldHMvaW1hZ2VzL21hcF9tYXJrZXIucG5nJztcclxuICAgICAgICAgICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHtsYXQ6IDU1LjY1NzcwMiwgbG5nOiAzNy40ODIzNjF9LFxyXG4gICAgICAgICAgICAgICAgbWFwOiBtYXAsXHJcbiAgICAgICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBnb29nbGUubWFwcy5BbmltYXRpb24uRFJPUCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn0J/QvtC30LLQvtC90LjRgtC1INC80L3QtSwg0LXRgdC70Lgg0YXQvtGC0LjRgtC1INGB0LTQtdC70LDRgtGMINC60LvQsNGB0YHQvdGL0Lkg0YHQsNC50YIhJyxcclxuICAgICAgICAgICAgICAgIGljb246IGltYWdlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdE1hcCgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxud2luZG93Lm9uc2Nyb2xsID0gKCkgPT4ge1xyXG4gICAgbGV0IHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICBwYXJhbGxheFNjcm9sbC5pbml0KHdTY3JvbGwpO1xyXG59O1xyXG5cclxuY29uc29sZS5sb2coJ2JhY2tlbmQtbG9sJyk7Il19

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

// admin tabs

var adminTabs = function () {
    var init = function init() {
        switchTab();
    };
    var tab = $('.admin-nav__item');
    var section = $('.admin');
    var activeTab = 'admin-nav__item_active';
    var activeSection = 'admin_active';
    var switchTab = function switchTab() {
        tab.on('click', function (e) {
            e.preventDefault();
            var tabPosition = $(e.currentTarget).index();
            section.eq(tabPosition).addClass(activeSection).siblings().removeClass(activeSection);
            tab.eq(tabPosition).addClass(activeTab).siblings().removeClass(activeTab);
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
    if ($('.admin').length) {
        adminTabs.init();
    }
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsicGFyYWxsYXhNb3VzZU1vdmUiLCJwYXJhbGxheENvbnRhaW5lciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJsYXllcnMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiaW5pdCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicGFnZVgiLCJwYWdlWSIsImluaXRpYWxYIiwiaW5uZXJXaWR0aCIsImluaXRpYWxZIiwiaW5uZXJIZWlnaHQiLCJzbGljZSIsImNhbGwiLCJmb3JFYWNoIiwibGF5ZXIiLCJpIiwiZGl2aWRlciIsInBvc2l0aW9uWCIsInBvc2l0aW9uWSIsImxheWVyU3R5bGUiLCJzdHlsZSIsInRyYW5zZm9ybVN0cmluZyIsInRyYW5zZm9ybSIsIm1zVHJhbnNmb3JtIiwid2Via2l0VHJhbnNmb3JtIiwib1RyYW5zZm9ybSIsIm1velRyYW5zZm9ybSIsInBhcmFsbGF4U2Nyb2xsIiwiYmciLCJxdWVyeVNlbGVjdG9yIiwidXNlciIsInNlY3Rpb25OYW1lIiwibW92ZSIsImJsb2NrIiwid2luZG93U2Nyb2xsIiwic3RyYWZlQW1vdW50Iiwic3RyYWZlIiwibWFyZ2luVG9wIiwid1Njcm9sbCIsImZsaXBwZXIiLCJidXR0b24iLCIkIiwiZmxpcENvbnRhaW5lciIsImJhY2tCdXR0b24iLCJvbiIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJtZW51IiwiaGFtYnVyZ2VyIiwibWFpbk1lbnUiLCJ0b2dnbGVDbGFzcyIsImJsb2dNZW51IiwibmF2Iiwic3RhcnRQb3MiLCJvZmZzZXQiLCJ0b3AiLCJzY3JvbGwiLCJzY3JvbGxUb3AiLCJoYXNDbGFzcyIsImFjdGl2ZVBvc3RDaGFuZ2VyIiwibmF2QmxvY2tTdHJpbmciLCJtZW51X3NlbGVjdG9yIiwib25TY3JvbGwiLCJzY3JvbGxfdG9wIiwiZWFjaCIsImhhc2giLCJhdHRyIiwidGFyZ2V0IiwicG9zaXRpb24iLCJvdXRlckhlaWdodCIsImNsaWNrIiwicHJldmVudERlZmF1bHQiLCJvZmYiLCJhbmltYXRlIiwibG9jYXRpb24iLCJtb2JpbGVOYXYiLCJvcGVuZWRTdHJpbmciLCJlYXN5U2xpZGVyIiwicG9pbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsInNsaWRlciIsInBvaW50QWN0aXZlIiwicHJldiIsIm5leHQiLCJzZXRDbGlja2VkSXRlbSIsInJlbW92ZUFjdGl2ZVBvaW50cyIsImNsaWNrZWRQb2ludCIsIml0ZW1JRCIsImNoYW5nZVBvc2l0aW9uIiwiY2xhc3NMaXN0IiwiYWRkIiwibGVuZ3RoIiwicmVtb3ZlIiwicG9pbnQiLCJsZWZ0IiwiZ2V0QXR0cmlidXRlIiwiY29udGFpbnMiLCJwcmVsb2FkZXIiLCJwZXJjZW50c1RvdGFsIiwiaW1nUGF0aCIsIm1hcCIsIm5keCIsImVsZW1lbnQiLCJiYWNrZ3JvdW5kIiwiY3NzIiwiaXNJbWciLCJpcyIsInBhdGgiLCJyZXBsYWNlIiwic2V0UGVyY2VudHMiLCJ0b3RhbCIsImN1cnJlbnQiLCJwZXJjZW50cyIsIk1hdGgiLCJjZWlsIiwidGV4dCIsImZhZGVPdXQiLCJsb2FkSW1hZ2VzIiwiaW1hZ2VzIiwiaW1nIiwiZmFrZUltYWdlIiwic3JjIiwiaW1ncyIsInRvQXJyYXkiLCJhcnJvd1Njcm9sbCIsImN1cnJlbnRUYXJnZXQiLCJmb3JtVmFsaWRhdG9yIiwiZm9ybSIsInZhbGlkYXRlIiwiZXJyb3IiLCJlbGVtZW50cyIsImZpbmQiLCJub3QiLCJ2YWxpZCIsImluZGV4IiwidmFsdWUiLCJ2YWwiLCJjb25zb2xlIiwibG9nIiwibG9naW5WYWxpZGF0b3IiLCJpY29uIiwiYWRtaW5UYWJzIiwic3dpdGNoVGFiIiwidGFiIiwic2VjdGlvbiIsImFjdGl2ZVRhYiIsImFjdGl2ZVNlY3Rpb24iLCJ0YWJQb3NpdGlvbiIsImVxIiwic2libGluZ3MiLCJvbmxvYWQiLCJpbml0TWFwIiwib3V0ZXJXaWR0aCIsIm1hcE9wdGlvbnMiLCJ6b29tIiwiY2VudGVyIiwibGF0IiwibG5nIiwiZGlzYWJsZURlZmF1bHRVSSIsImRyYWdnYWJsZSIsInNjcm9sbHdoZWVsIiwiZGlzYWJsZURvdWJsZUNsaWNrWm9vbSIsImdvb2dsZSIsIm1hcHMiLCJNYXAiLCJzZXRPcHRpb25zIiwic3R5bGVzIiwiaW1hZ2UiLCJtYXJrZXIiLCJNYXJrZXIiLCJhbmltYXRpb24iLCJBbmltYXRpb24iLCJEUk9QIiwidGl0bGUiLCJvbnNjcm9sbCIsInBhZ2VZT2Zmc2V0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBLElBQUFBLG9CQUFBLFlBQUE7QUFDQSxRQUFBQyxvQkFBQUMsU0FBQUMsY0FBQSxDQUFBLFVBQUEsQ0FBQTtBQUFBLFFBQ0FDLFNBQUFILGtCQUFBSSxzQkFBQSxDQUFBLGdCQUFBLENBREE7QUFFQSxXQUFBO0FBQ0FDLGNBQUEsU0FBQUEsSUFBQSxHQUFBO0FBQ0FDLG1CQUFBQyxnQkFBQSxDQUFBLFdBQUEsRUFBQSxVQUFBQyxDQUFBLEVBQUE7QUFDQSxvQkFBQUMsUUFBQUQsRUFBQUMsS0FBQTtBQUFBLG9CQUNBQyxRQUFBRixFQUFBRSxLQURBO0FBQUEsb0JBRUFDLFdBQUFMLE9BQUFNLFVBQUEsR0FBQSxDQUFBLEdBQUFILEtBRkE7QUFBQSxvQkFHQUksV0FBQVAsT0FBQVEsV0FBQSxHQUFBLENBQUEsR0FBQUosS0FIQTtBQUlBLG1CQUFBSyxLQUFBLENBQUFDLElBQUEsQ0FBQWIsTUFBQSxFQUFBYyxPQUFBLENBQUEsVUFBQUMsS0FBQSxFQUFBQyxDQUFBLEVBQUE7QUFDQSx3QkFBQUMsVUFBQSxDQUFBRCxJQUFBLENBQUEsSUFBQSxHQUFBO0FBQUEsd0JBQ0FFLFlBQUFWLFdBQUFTLE9BREE7QUFBQSx3QkFFQUUsWUFBQVQsV0FBQU8sT0FGQTtBQUFBLHdCQUdBRyxhQUFBTCxNQUFBTSxLQUhBO0FBQUEsd0JBSUFDLGtCQUFBLGlCQUFBSixTQUFBLEdBQUEsTUFBQSxHQUFBQyxTQUFBLEdBQUEsUUFKQTtBQUtBQywrQkFBQUcsU0FBQSxHQUFBRCxlQUFBO0FBQ0FGLCtCQUFBSSxXQUFBLEdB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LGlCQUZBO0FBR0EsdUJBQUEsQ0FDQTtBQUNBLHlCQUFBO0FBREEsYUFEQTtBQUhBLFNBakdBLEVBMEdBO0FBQ0EsMkJBQUEsZ0NBREE7QUFFQSwyQkFBQSxlQUZBO0FBR0EsdUJBQUEsQ0FDQTtBQUNBLHlCQUFBO0FBREEsYUFEQTtBQUhBLFNBMUdBLEVBbUhBO0FBQ0EsMkJBQUEsWUFEQTtBQUVBLDJCQUFBLGVBRkE7QUFHQSx1QkFBQSxDQUNBO0FBQ0EseUJBQUE7QUFEQSxhQURBO0FBSEEsU0FuSEEsRUE0SEE7QUFDQSwyQkFBQSxTQURBO0FBRUEsdUJBQUEsQ0FDQTtBQUNBLDhCQUFBO0FBREEsYUFEQTtBQUZBLFNBNUhBLEVBb0lBO0FBQ0EsMkJBQUEsT0FEQTtBQUVBLDJCQUFBLGVBRkE7QUFHQSx1QkFBQSxDQUNBO0FBQ0EseUJBQUE7QUFEQSxhQURBO0FBSEEsU0FwSUEsRUE2SUE7QUFDQSwyQkFBQSxPQURBO0FBRUEsMkJBQUEsaUJBRkE7QUFHQSx1QkFBQSxDQUNBO0FBQ0EseUJBQUE7QUFEQSxhQURBO0FBSEEsU0E3SUEsQ0FBQTs7QUF5TEFmO0FBQ0E7QUFDQSxDQXJOQTs7QUF1TkFySixPQUFBNEssUUFBQSxHQUFBLFlBQUE7QUFDQSxRQUFBeEksVUFBQXBDLE9BQUE2SyxXQUFBO0FBQ0FwSixtQkFBQTFCLElBQUEsQ0FBQXFDLE9BQUE7QUFDQSxDQUhBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBwYXJhbGxheCBvbiBtb3VzZSBtb3ZlXHJcblxyXG5sZXQgcGFyYWxsYXhNb3VzZU1vdmUgPSAoKCkgPT4ge1xyXG4gICAgbGV0IHBhcmFsbGF4Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhcmFsbGF4JyksXHJcbiAgICAgICAgbGF5ZXJzID0gcGFyYWxsYXhDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFyYWxsYXgtbGF5ZXInKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFnZVggPSBlLnBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VZID0gZS5wYWdlWSxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gcGFnZVgsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBwYWdlWTtcclxuICAgICAgICAgICAgICAgIFtdLnNsaWNlLmNhbGwobGF5ZXJzKS5mb3JFYWNoKChsYXllciwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXZpZGVyID0gKGkgKyAxKSAvIDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25YID0gaW5pdGlhbFggKiBkaXZpZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblkgPSBpbml0aWFsWSAqIGRpdmlkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyU3R5bGUgPSBsYXllci5zdHlsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKCcgKyBwb3NpdGlvblggKyAncHgsICcgKyBwb3NpdGlvblkgKyAncHgsIDApJztcclxuICAgICAgICAgICAgICAgICAgICBsYXllclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICBsYXllclN0eWxlLm1zVHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyU3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyU3R5bGUub1RyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICBsYXllclN0eWxlLm1velRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuXHJcbi8vIHBhcmFsbGF4IG9uIHNjcm9sbFxyXG5cclxubGV0IHBhcmFsbGF4U2Nyb2xsID0gKCgpID0+IHtcclxuICAgIGxldCBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYXJhbGxheC1iZycpLFxyXG4gICAgICAgIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFyYWxsYXgtdXNlcicpLFxyXG4gICAgICAgIHNlY3Rpb25OYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhcmFsbGF4LW5hbWUnKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbW92ZTogKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUFtb3VudCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VudCArICclJyxcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gYmxvY2suc3R5bGU7XHJcbiAgICAgICAgICAgIHN0eWxlLm1hcmdpblRvcCA9IHN0cmFmZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQod1Njcm9sbCkge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmUoYmcsIHdTY3JvbGwsIDQ1KTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKHNlY3Rpb25OYW1lLCB3U2Nyb2xsLCAzNSk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZSh1c2VyLCB3U2Nyb2xsLCAyNSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuLy8gd2VsY29tZSBwYWdlIGZsaXBwZXJcclxuXHJcbmxldCBmbGlwcGVyID0gKCgpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgbGV0IGJ1dHRvbiA9ICQoJy5hdXRoX19idXR0b24nKSxcclxuICAgICAgICAgICAgICAgIGZsaXBDb250YWluZXIgPSAkKCcuZmxpcHBlcicpLFxyXG4gICAgICAgICAgICAgICAgYmFja0J1dHRvbiA9ICQoJy5hdXRoX19iYWNrLWJ1dHRvbicpO1xyXG4gICAgICAgICAgICBidXR0b24ub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmxpcENvbnRhaW5lci5hZGRDbGFzcygnZmxpcCcpO1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLmFkZENsYXNzKCdhdXRoX19idXR0b25faGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBiYWNrQnV0dG9uLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGZsaXBDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2ZsaXAnKTtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5yZW1vdmVDbGFzcygnYXV0aF9fYnV0dG9uX2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG4vLyBoYW1idXJnZXIgbWFpbiBtZW51XHJcblxyXG5sZXQgbWVudSA9ICgoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgIGxldCBoYW1idXJnZXIgPSAkKCcubWVudS1idXR0b24nKSxcclxuICAgICAgICAgICAgICAgIG1haW5NZW51ID0gJCgnLm1haW4tbWVudScpO1xyXG4gICAgICAgICAgICBoYW1idXJnZXIub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbWFpbk1lbnUudG9nZ2xlQ2xhc3MoJ21haW4tbWVudV9vcGVuZWQnKTtcclxuICAgICAgICAgICAgICAgIGhhbWJ1cmdlci50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuXHJcbi8vIHN0aWNreSBibG9nIG5hdmlnYXRpb25cclxuXHJcbmxldCBibG9nTWVudSA9ICgoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgIGxldCBuYXYgPSAkKCcuYmxvZy1uYXZfX2xpc3QnKSxcclxuICAgICAgICAgICAgICAgIHN0YXJ0UG9zID0gbmF2Lm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID49IHN0YXJ0UG9zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hdi5oYXNDbGFzcygpID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdi5hZGRDbGFzcygnYmxvZy1uYXZfX2xpc3RfdG90b3AnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBuYXYucmVtb3ZlQ2xhc3MoJ2Jsb2ctbmF2X19saXN0X3RvdG9wJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuXHJcbi8vIGFjdGl2ZSBwb3N0IGJsb2cgbmF2aWdhdGlvbiBzY3JvbGxcclxuXHJcbmxldCBhY3RpdmVQb3N0Q2hhbmdlciA9ICgoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQobmF2QmxvY2tTdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIG1lbnVfc2VsZWN0b3IgPSBuYXZCbG9ja1N0cmluZztcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbF90b3AgPSAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSAvIDEuMDg7XHJcbiAgICAgICAgICAgICAgICAkKG1lbnVfc2VsZWN0b3IgKyBcIiBhXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBoYXNoID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJChoYXNoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LnBvc2l0aW9uKCkudG9wIDw9IHNjcm9sbF90b3AgJiYgKHRhcmdldC5wb3NpdGlvbigpLnRvcCAqIDIpICsgdGFyZ2V0Lm91dGVySGVpZ2h0KCkgPiBzY3JvbGxfdG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQobWVudV9zZWxlY3RvciArIFwiIGEuYmxvZy1uYXZfX2xpbmtfYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYmxvZy1uYXZfX2xpbmtfYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiYmxvZy1uYXZfX2xpbmtfYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJibG9nLW5hdl9fbGlua19hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKFwic2Nyb2xsXCIsIG9uU2Nyb2xsKTtcclxuICAgICAgICAgICAgJChcImFbaHJlZl49JyMnXVwiKS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub2ZmKFwic2Nyb2xsXCIpO1xyXG4gICAgICAgICAgICAgICAgJChtZW51X3NlbGVjdG9yICsgXCIgYS5ibG9nLW5hdl9fbGlua19hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJibG9nLW5hdl9fbGlua19hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiYmxvZy1uYXZfX2xpbmtfYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhhc2ggPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQoaGFzaCk7XHJcbiAgICAgICAgICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3BcclxuICAgICAgICAgICAgICAgIH0sIDUwMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaGFzaDtcclxuICAgICAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbihcInNjcm9sbFwiLCBvblNjcm9sbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuLy8gbW9iaWxlIGJsb2cgbmF2aWdhdGlvbiBtZW51XHJcblxyXG5sZXQgbW9iaWxlTmF2ID0gKCgpID0+IHtcclxuICAgIGxldCBuYXYgPSAkKCcudG91Y2gtbmF2IC5ibG9nLW5hdl9fbGlzdCcpLFxyXG4gICAgICAgIGJ1dHRvbiA9ICQoJy50b3VjaC1idXR0b24nKSxcclxuICAgICAgICBvcGVuZWRTdHJpbmcgPSAnYmxvZy1uYXZfX2xpc3Rfb3BlbmVkJztcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgYnV0dG9uLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG5hdi50b2dnbGVDbGFzcyhvcGVuZWRTdHJpbmcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG4vLyBlYXN5IHBvcnRmb2xpbyBzbGlkZXJcclxuXHJcbmxldCBlYXN5U2xpZGVyID0gKCgpID0+IHtcclxuICAgIGxldCBwb2ludHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZWFzeS1zbGlkZXJfX2l0ZW0nKTtcclxuICAgIGxldCBzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2xpZGVyJyk7XHJcbiAgICBsZXQgcG9pbnRBY3RpdmUgPSAwO1xyXG4gICAgbGV0IHByZXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJldicpO1xyXG4gICAgbGV0IG5leHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV4dCcpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICBsZXQgc2V0Q2xpY2tlZEl0ZW0gPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQWN0aXZlUG9pbnRzKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2xpY2tlZFBvaW50ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICBwb2ludEFjdGl2ZSA9IGNsaWNrZWRQb2ludC5pdGVtSUQ7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VQb3NpdGlvbihjbGlja2VkUG9pbnQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBwb2ludHNbcG9pbnRBY3RpdmVdLmNsYXNzTGlzdC5hZGQoXCJlYXN5LXNsaWRlcl9faXRlbV9hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIGxldCByZW1vdmVBY3RpdmVQb2ludHMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50c1tpXS5jbGFzc0xpc3QucmVtb3ZlKFwiZWFzeS1zbGlkZXJfX2l0ZW1fYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBsZXQgY2hhbmdlUG9zaXRpb24gPSAocG9pbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHBvaW50LmNsYXNzTGlzdC5hZGQoXCJlYXN5LXNsaWRlcl9faXRlbV9hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXIuc3R5bGUubGVmdCA9IHBvaW50LmdldEF0dHJpYnV0ZShcImRhdGEtcG9zXCIpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvaW50ID0gcG9pbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgcG9pbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZXRDbGlja2VkSXRlbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgcG9pbnQuaXRlbUlEID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcmV2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChwb2ludHNbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdlYXN5LXNsaWRlcl9faXRlbV9hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9pbnRzWzFdLmNsYXNzTGlzdC5jb250YWlucygnZWFzeS1zbGlkZXJfX2l0ZW1fYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXIuc3R5bGUubGVmdCA9ICcwJztcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVBY3RpdmVQb2ludHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VQb3NpdGlvbihwb2ludHNbMF0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwb2ludHNbMl0uY2xhc3NMaXN0LmNvbnRhaW5zKCdlYXN5LXNsaWRlcl9faXRlbV9hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlci5zdHlsZS5sZWZ0ID0gJzEwMCUnO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUFjdGl2ZVBvaW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZVBvc2l0aW9uKHBvaW50c1sxXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvaW50c1szXS5jbGFzc0xpc3QuY29udGFpbnMoJ2Vhc3ktc2xpZGVyX19pdGVtX2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyLnN0eWxlLmxlZnQgPSAnMjAwJSc7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQWN0aXZlUG9pbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlUG9zaXRpb24ocG9pbnRzWzJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG5leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvaW50c1swXS5jbGFzc0xpc3QuY29udGFpbnMoJ2Vhc3ktc2xpZGVyX19pdGVtX2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyLnN0eWxlLmxlZnQgPSAnLTEwMCUnO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUFjdGl2ZVBvaW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZVBvc2l0aW9uKHBvaW50c1sxXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvaW50c1sxXS5jbGFzc0xpc3QuY29udGFpbnMoJ2Vhc3ktc2xpZGVyX19pdGVtX2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyLnN0eWxlLmxlZnQgPSAnLTIwMCUnO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUFjdGl2ZVBvaW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZVBvc2l0aW9uKHBvaW50c1syXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvaW50c1syXS5jbGFzc0xpc3QuY29udGFpbnMoJ2Vhc3ktc2xpZGVyX19pdGVtX2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyLnN0eWxlLmxlZnQgPSAnLTMwMCUnO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUFjdGl2ZVBvaW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZVBvc2l0aW9uKHBvaW50c1szXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvaW50c1szXS5jbGFzc0xpc3QuY29udGFpbnMoJ2Vhc3ktc2xpZGVyX19pdGVtX2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG4vLyBwcmVsb2FkZXJcclxuXHJcbmxldCBwcmVsb2FkZXIgPSAoKCkgPT4ge1xyXG4gICAgbGV0IHByZWxvYWRlciA9ICQoJy5wcmVsb2FkZXInKTtcclxuICAgIGxldCBwZXJjZW50c1RvdGFsID0gMDtcclxuICAgIGxldCBpbWdQYXRoID0gJCgnKicpLm1hcCgobmR4LCBlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgbGV0IGJhY2tncm91bmQgPSAkKGVsZW1lbnQpLmNzcygnYmFja2dyb3VuZC1pbWFnZScpO1xyXG4gICAgICAgIGxldCBpc0ltZyA9ICQoZWxlbWVudCkuaXMoJ2ltZycpO1xyXG4gICAgICAgIGxldCBwYXRoID0gJyc7XHJcbiAgICAgICAgaWYgKGJhY2tncm91bmQgIT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0ltZykgcGF0aCA9ICQoZWxlbWVudCkuYXR0cignc3JjJyk7XHJcbiAgICAgICAgaWYgKHBhdGgpIHJldHVybiBwYXRoO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHNldFBlcmNlbnRzID0gKHRvdGFsLCBjdXJyZW50KSA9PiB7XHJcbiAgICAgICAgbGV0IHBlcmNlbnRzID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XHJcbiAgICAgICAgJCgnLnByZWxvYWRlcl9fcGVyY2VudHMnKS50ZXh0KHBlcmNlbnRzICsgJyUnKTtcclxuICAgICAgICBpZiAocGVyY2VudHMgPj0gMTAwKSBwcmVsb2FkZXIuZmFkZU91dCgpO1xyXG4gICAgfTtcclxuICAgIGxldCBsb2FkSW1hZ2VzID0gKGltYWdlcykgPT4ge1xyXG4gICAgICAgIGlmICghaW1hZ2VzLmxlbmd0aCkgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxuICAgICAgICBpbWFnZXMuZm9yRWFjaCgoaW1nLCBpLCBpbWFnZXMpID0+IHtcclxuICAgICAgICAgICAgbGV0IGZha2VJbWFnZSA9ICQoJzxpbWc+Jywge1xyXG4gICAgICAgICAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYzogaW1nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBmYWtlSW1hZ2Uub24oJ2xvYWQgZXJyb3InLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwZXJjZW50c1RvdGFsKys7XHJcbiAgICAgICAgICAgICAgICBzZXRQZXJjZW50cyhpbWFnZXMubGVuZ3RoLCBwZXJjZW50c1RvdGFsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBpbWdzID0gaW1nUGF0aC50b0FycmF5KCk7XHJcbiAgICAgICAgICAgIGxvYWRJbWFnZXMoaW1ncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuLy8gYXJyb3dzIHNjcm9sbHNcclxuXHJcbmxldCBhcnJvd1Njcm9sbCA9ICgoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgICQoJy5oZWFkZXJfX25leHQsIC50b3RvcCcpLmNsaWNrKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vZmYoXCJzY3JvbGxcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGFzaCA9ICQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gJChoYXNoKTtcclxuICAgICAgICAgICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxyXG4gICAgICAgICAgICAgICAgfSwgNjAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBoYXNoO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcclxuXHJcbi8vIGZlZWRiYWNrIGZvcm0gdmFsaWRhdGlvblxyXG5cclxubGV0IGZvcm1WYWxpZGF0b3IgPSAoKCkgPT4ge1xyXG4gICAgbGV0IGluaXQgPSAoZm9ybSkgPT4ge1xyXG4gICAgICAgIHZhbGlkYXRlKGZvcm0pO1xyXG4gICAgfTtcclxuICAgIGxldCB2YWxpZGF0ZSA9IGZvcm0gPT4ge1xyXG4gICAgICAgIGxldCBlcnJvciA9ICQoJy5mZWVkYmFja19fZXJyb3InKTtcclxuICAgICAgICBmb3JtLm9uKCdzdWJtaXQnLCBlID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudHMgPSBmb3JtLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYScpLm5vdCgnaW5wdXRbdHlwZT1cImZpbGVcIl0sIGlucHV0W3R5cGU9XCJoaWRkZW5cIl0nKTtcclxuICAgICAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgJC5lYWNoKGVsZW1lbnRzLCAoaW5kZXgsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9ICQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IGVsZW1lbnQudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubmV4dChlcnJvcikuYWRkQ2xhc3MoJ2ZlZWRiYWNrX19lcnJvcl9pcy1lcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2Vycm9yJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5uZXh0KGVycm9yKS5yZW1vdmVDbGFzcygnZmVlZGJhY2tfX2Vycm9yX2lzLWVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygnZXJyb3InKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdzdWNjZXNzJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh2YWxpZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZm9ybS5vbigncmVzZXQnLCBlID0+IHtcclxuICAgICAgICAgICAgZXJyb3IucmVtb3ZlQ2xhc3MoJ2ZlZWRiYWNrX19lcnJvcl9pcy1lcnJvcicpO1xyXG4gICAgICAgICAgICBlcnJvci5wcmV2KCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XHJcbiAgICAgICAgICAgIGVycm9yLnByZXYoKS5yZW1vdmVDbGFzcygnc3VjY2VzcycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZvcm0ub24oJ2NoYW5nZScsIGUgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudHMgPSBmb3JtLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYScpLm5vdCgnaW5wdXRbdHlwZT1cImZpbGVcIl0sIGlucHV0W3R5cGU9XCJoaWRkZW5cIl0nKTtcclxuICAgICAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgJC5lYWNoKGVsZW1lbnRzLCAoaW5kZXgsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9ICQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IGVsZW1lbnQudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubmV4dChlcnJvcikuYWRkQ2xhc3MoJ2ZlZWRiYWNrX19lcnJvcl9pcy1lcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2Vycm9yJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5uZXh0KGVycm9yKS5yZW1vdmVDbGFzcygnZmVlZGJhY2tfX2Vycm9yX2lzLWVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygnZXJyb3InKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdzdWNjZXNzJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogaW5pdCxcclxuICAgIH1cclxufSkoKTtcclxuXHJcbi8vIGxvZ2luIGZvcm0gdmFsaWRhdGlvblxyXG5cclxubGV0IGxvZ2luVmFsaWRhdG9yID0gKCgpID0+IHtcclxuICAgIGxldCBpbml0ID0gKGZvcm0pID0+IHtcclxuICAgICAgICB2YWxpZGF0ZShmb3JtKTtcclxuICAgIH07XHJcbiAgICBsZXQgdmFsaWRhdGUgPSBmb3JtID0+IHtcclxuICAgICAgICBsZXQgZXJyb3IgPSAkKCcuYXV0aF9fZXJyb3InKTtcclxuICAgICAgICBmb3JtLm9uKCdzdWJtaXQnLCBlID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudHMgPSBmb3JtLmZpbmQoJ2lucHV0Jykubm90KCdpbnB1dFt0eXBlPVwiZmlsZVwiXSwgaW5wdXRbdHlwZT1cImhpZGRlblwiXSwgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdLCBpbnB1dFt0eXBlPVwicmFkaW9cIl0nKTtcclxuICAgICAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgJC5lYWNoKGVsZW1lbnRzLCAoaW5kZXgsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9ICQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGljb24gPSBlbGVtZW50LnByZXYoJy5hdXRoX19pbnB1dC1pY29uJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gZWxlbWVudC52YWwoKTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5uZXh0KGVycm9yKS5hZGRDbGFzcygnYXV0aF9fZXJyb3JfaXMtZXJyb3InKTtcclxuICAgICAgICAgICAgICAgICAgICBpY29uLnJlbW92ZUNsYXNzKCdhdXRoX19pbnB1dC1pY29uX3N1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdzdWNjZXNzLWxvZ2luJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbi5hZGRDbGFzcygnYXV0aF9faW5wdXQtaWNvbl9lcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2Vycm9yLWxvZ2luJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5uZXh0KGVycm9yKS5yZW1vdmVDbGFzcygnYXV0aF9fZXJyb3JfaXMtZXJyb3InKTtcclxuICAgICAgICAgICAgICAgICAgICBpY29uLnJlbW92ZUNsYXNzKCdhdXRoX19pbnB1dC1pY29uX2Vycm9yJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygnZXJyb3ItbG9naW4nKTtcclxuICAgICAgICAgICAgICAgICAgICBpY29uLmFkZENsYXNzKCdhdXRoX19pbnB1dC1pY29uX3N1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdzdWNjZXNzLWxvZ2luJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh2YWxpZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZm9ybS5vbignY2hhbmdlJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50cyA9IGZvcm0uZmluZCgnaW5wdXQnKS5ub3QoJ2lucHV0W3R5cGU9XCJmaWxlXCJdLCBpbnB1dFt0eXBlPVwiaGlkZGVuXCJdLCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0sIGlucHV0W3R5cGU9XCJyYWRpb1wiXScpO1xyXG4gICAgICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAkLmVhY2goZWxlbWVudHMsIChpbmRleCwgdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gJCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWNvbiA9IGVsZW1lbnQucHJldignLmF1dGhfX2lucHV0LWljb24nKTtcclxuICAgICAgICAgICAgICAgIGxldCB2YWwgPSBlbGVtZW50LnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm5leHQoZXJyb3IpLmFkZENsYXNzKCdhdXRoX19lcnJvcl9pcy1lcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGljb24ucmVtb3ZlQ2xhc3MoJ2F1dGhfX2lucHV0LWljb25fc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3N1Y2Nlc3MtbG9naW4nKTtcclxuICAgICAgICAgICAgICAgICAgICBpY29uLmFkZENsYXNzKCdhdXRoX19pbnB1dC1pY29uX2Vycm9yJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnZXJyb3ItbG9naW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm5leHQoZXJyb3IpLnJlbW92ZUNsYXNzKCdhdXRoX19lcnJvcl9pcy1lcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGljb24ucmVtb3ZlQ2xhc3MoJ2F1dGhfX2lucHV0LWljb25fZXJyb3InKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdlcnJvci1sb2dpbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGljb24uYWRkQ2xhc3MoJ2F1dGhfX2lucHV0LWljb25fc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ3N1Y2Nlc3MtbG9naW4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBpbml0LFxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuLy8gYWRtaW4gdGFic1xyXG5cclxubGV0IGFkbWluVGFicyA9ICgoKSA9PiB7XHJcbiAgICBsZXQgaW5pdCA9ICgpID0+IHtcclxuICAgICAgICBzd2l0Y2hUYWIoKTtcclxuICAgIH07XHJcbiAgICBsZXQgdGFiID0gJCgnLmFkbWluLW5hdl9faXRlbScpO1xyXG4gICAgbGV0IHNlY3Rpb24gPSAkKCcuYWRtaW4nKTtcclxuICAgIGxldCBhY3RpdmVUYWIgPSAnYWRtaW4tbmF2X19pdGVtX2FjdGl2ZSc7XHJcbiAgICBsZXQgYWN0aXZlU2VjdGlvbiA9ICdhZG1pbl9hY3RpdmUnO1xyXG4gICAgbGV0IHN3aXRjaFRhYiA9ICgpID0+IHtcclxuICAgICAgICB0YWIub24oJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgIGxldCB0YWJQb3NpdGlvbiA9ICQoZS5jdXJyZW50VGFyZ2V0KS5pbmRleCgpO1xyXG4gICAgICAgICAgIHNlY3Rpb24uZXEodGFiUG9zaXRpb24pLmFkZENsYXNzKGFjdGl2ZVNlY3Rpb24pLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoYWN0aXZlU2VjdGlvbik7XHJcbiAgICAgICAgICAgdGFiLmVxKHRhYlBvc2l0aW9uKS5hZGRDbGFzcyhhY3RpdmVUYWIpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoYWN0aXZlVGFiKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGluaXRcclxuICAgIH1cclxufSkoKTtcclxuXHJcbi8vIGluaXQgYmxvY2tcclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gICAgcHJlbG9hZGVyLmluaXQoKTtcclxufSk7XHJcblxyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gICAgcGFyYWxsYXhNb3VzZU1vdmUuaW5pdCgpO1xyXG4gICAgZmxpcHBlci5pbml0KCk7XHJcbiAgICBhcnJvd1Njcm9sbC5pbml0KCk7XHJcbiAgICBtZW51LmluaXQoKTtcclxuICAgIGlmICgkKCcuYWRtaW4nKS5sZW5ndGgpIHtcclxuICAgICAgICBhZG1pblRhYnMuaW5pdCgpO1xyXG4gICAgfVxyXG4gICAgaWYgKCQoJy5ibG9nLW5hdl9fbGlzdCcpLmxlbmd0aCkge1xyXG4gICAgICAgIGJsb2dNZW51LmluaXQoKTtcclxuICAgICAgICBhY3RpdmVQb3N0Q2hhbmdlci5pbml0KCcuYmxvZy1uYXYnKTtcclxuICAgICAgICBhY3RpdmVQb3N0Q2hhbmdlci5pbml0KCcudG91Y2gtbmF2Jyk7XHJcbiAgICAgICAgbW9iaWxlTmF2LmluaXQoKTtcclxuICAgIH1cclxuICAgIGlmICgkKCcjc2xpZGVyJykubGVuZ3RoKSB7XHJcbiAgICAgICAgZWFzeVNsaWRlci5pbml0KCk7XHJcbiAgICB9XHJcbiAgICBpZiAoJCgnI2ZlZWRiYWNrLCAjYXV0aCcpLmxlbmd0aCkge1xyXG4gICAgICAgIGZvcm1WYWxpZGF0b3IuaW5pdCgkKCcjZmVlZGJhY2snKSk7XHJcbiAgICAgICAgbG9naW5WYWxpZGF0b3IuaW5pdCgkKCcjYXV0aCcpKTtcclxuICAgIH1cclxuXHJcbi8vIGdvb2dsZSBtYXBzXHJcblxyXG4gICAgaWYgKCQoJyNtYXAnKS5sZW5ndGgpIHtcclxuICAgICAgICB2YXIgbWFwO1xyXG4gICAgICAgIHZhciBzdHlsZXMgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZS5sYW5kX3BhcmNlbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlLm1hbl9tYWRlXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGUubmF0dXJhbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndlaWdodFwiOiA0XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlLm5hdHVyYWxcIixcclxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzZjOWM1YVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlLm5hdHVyYWwudGVycmFpblwiLFxyXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzZjOWM1YVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlLm5hdHVyYWwudGVycmFpblwiLFxyXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNmM5YzVhXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcclxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMuaWNvblwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5hcnRlcmlhbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2MwYzBjMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXHJcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYzBjMGMwXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcclxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2MwYzBjMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5LmNvbnRyb2xsZWRfYWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjYzBjMGMwXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmxvY2FsXCIsXHJcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzZjOWM1YVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcclxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcclxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzZjOWM1YVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdE1hcCgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5vdXRlcldpZHRoID49IDgwMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1hcE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgem9vbTogMTUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyOiB7bGF0OiA1NS42NTc0NzgsIGxuZzogMzcuNDY5NzMzfSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVEb3VibGVDbGlja1pvb206IHRydWVcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWFwT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB6b29tOiAxMyxcclxuICAgICAgICAgICAgICAgICAgICBjZW50ZXI6IHtsYXQ6IDU1LjY1NzQ3OCwgbG5nOiAzNy40Njk3MzN9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVEZWZhdWx0VUk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZURvdWJsZUNsaWNrWm9vbTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwgbWFwT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIG1hcC5zZXRPcHRpb25zKHtzdHlsZXM6IHN0eWxlc30pO1xyXG4gICAgICAgICAgICB2YXIgaW1hZ2UgPSAnYXNzZXRzL2ltYWdlcy9tYXBfbWFya2VyLnBuZyc7XHJcbiAgICAgICAgICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiB7bGF0OiA1NS42NTc3MDIsIGxuZzogMzcuNDgyMzYxfSxcclxuICAgICAgICAgICAgICAgIG1hcDogbWFwLFxyXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkRST1AsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ9Cf0L7Qt9Cy0L7QvdC40YLQtSDQvNC90LUsINC10YHQu9C4INGF0L7RgtC40YLQtSDRgdC00LXQu9Cw0YLRjCDQutC70LDRgdGB0L3Ri9C5INGB0LDQudGCIScsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBpbWFnZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXRNYXAoKTtcclxuICAgIH1cclxufTtcclxuXHJcbndpbmRvdy5vbnNjcm9sbCA9ICgpID0+IHtcclxuICAgIGxldCB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgcGFyYWxsYXhTY3JvbGwuaW5pdCh3U2Nyb2xsKTtcclxufTsiXX0=

$(function () {

    //slick

    $('.burger-slider').slick({
        prevArrow: $('.burger-slider__prev'),
        nextArrow: $('.burger-slider__next')
    });

    //team accordion

    $('.accordion').accordion({
        transitionSpeed: 600
    });

    //horizontal menu accordion

    $('.menu__trigger').on('click', function (e) {
        var $item = $(this).closest('.menu__list-item');

        if ($item.hasClass('menu__list-item_active')) {
            $('.menu__list-item').removeClass('menu__list-item_active');
        } else {
            $('.menu__list-item').removeClass('menu__list-item_active');
            $item.addClass('menu__list-item_active');
        }
    });

    $(document).on('click', function (e) {
        var $acco = $('.menu__list');

        if (!$acco.is(e.target) && $acco.has(e.target).length === 0) {
            $('.menu__list-item').removeClass('menu__list-item_active');
        }
    });

    //fancybox modal for review

    $(".fancybox").fancybox({
        autoSize: false,
        width: 400,
        height: 'auto',
        arrows: false,
        closeBtn: false,
        helpers: {
            overlay: {
                locked: false
            }
        },
    });

    $('.review-modal__close').on('click', function (event) {
        event.preventDefault();
        $.fancybox.close();
    });

    //phone mask +7 (999) 999 99 99

    $('.phone-mask').inputmask({
        mask: "+7 (999) 999 99 99"
    });

    //OnePageScroll

    $('.wrapper').onepage_scroll({
        sectionContainer: "section",
        easing: "ease",
        animationTime: 1000,
        pagination: true,
        loop: false
    });

    $('.next').on('click', function (e) {
        $('.wrapper').moveDown();
    });

    $('.header__nav-item_first').on('click', function (e) {
        $('.wrapper').moveTo(2);
    });

    $('.header__nav-item_second').on('click', function (e) {
        $('.wrapper').moveTo(3);
    });

    $('.header__nav-item_third').on('click', function (e) {
        $('.wrapper').moveTo(4);
    });

    $('.header__nav-item_fourth').on('click', function (e) {
        $('.wrapper').moveTo(5);
    });

    $('.header__nav-item_fifth').on('click', function (e) {
        $('.wrapper').moveTo(6);
    });

    $('.header__nav-item_sixth').on('click', function (e) {
        $('.wrapper').moveTo(8);
    });

    $('.header__button').on('click', function (e) {
        $('.wrapper').moveTo(7);
    });
});

//yandex map

ymaps.ready(init);

function init() {

    var myMap;

    myMap = new ymaps.Map("map", {
        center: [59.93, 30.28],
        zoom: 11,
        controls: []
    });

    myMap.behaviors.disable('scrollZoom');

    myMap.controls.add("zoomControl", {
        position: {top: 15, left: 15}
    });

    var myPlacemark1 = new ymaps.Placemark([59.93, 30.28],
        {balloonContent: 'Best Burgers EVER!!!'},
        {
            iconLayout: 'default#image',
            iconImageHref: './img/icons/map-marker.svg',
            iconImageSize: [40, 51],
            iconImageOffset: [-20, -47]
        });
    var myPlacemark2 = new ymaps.Placemark([59.95, 30.33],
        {balloonContent: 'Best Burgers EVER!!!'},
        {
            iconLayout: 'default#image',
            iconImageHref: './img/icons/map-marker.svg',
            iconImageSize: [40, 51],
            iconImageOffset: [-20, -47]
        });
    var myPlacemark3 = new ymaps.Placemark([59.91, 30.23],
        {balloonContent: 'Best Burgers EVER!!!'},
        {
            iconLayout: 'default#image',
            iconImageHref: './img/icons/map-marker.svg',
            iconImageSize: [40, 51],
            iconImageOffset: [-20, -47]
        });

    myMap.geoObjects.add(myPlacemark1);
    myMap.geoObjects.add(myPlacemark2);
    myMap.geoObjects.add(myPlacemark3);

};

//form submit AJAX

$(function() {

    $('#order-form').on('submit', function(e) {

        e.preventDefault();

        var form = $(this),
            formData = form.serialize();

        $.ajax({
            url: './mail.php',
            type: 'POST',
            data: formData,
            success: function(data) {

                var popup = data.status ? '#success' : '#error';

                $.fancybox.open([
                    {href : popup}
                ], {
                    type: 'inline',
                    maxWidth: 350,
                    fitToView: false,
                    padding: 10,
                    closeBtn: false,
                    afterClose: function() {
                        form.trigger('reset');
                    }
                });
            }
        })
    });

    $('.close-button').on('click', function (event) {
        event.preventDefault();
        $.fancybox.close();
    });
});
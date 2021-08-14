$(document).ready(function() {

    $('.view-prototype').click(function(event) {
        $(this).modal({
            fadeDuration: 200
        });
        return false;
    });

    $('.nav-toggle').click(function(event) {
        $('.nav').slideToggle(200);
        $('.navbar').toggleClass('open');
        $(this).toggleClass('open');
    });

    setTimeout(function() {
        $('#nickname').hide(500);
        $('#nickname').html('Ice Cream');
        $('#nickname').show(500);

        $('#nickname_l').hide(500);
        $('#nickname_l').html('Ice Cream');
        $('#nickname_l').show(500);
    }, 4000);

    $('.responsive').slick({
        dots: true,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});
$(document).ready(function () {

    $('#fullpage').fullpage({
        autoScrolling: true,
        scrollHorizontally: true,
        scrollOverflow: false,
        menu: '#myMenu',
        anchors: ['HOME', 'PROJECT', 'PROJECT_UIUX', 'PROJECT_WEB', 'PROJECT_POSTER', 'PROJECT_ANI', 'CONTACT'],
        navigation: true,
        navigationPosition: 'right',
        slidesNavigation: true,
        slidesNavPosition: 'bottom',

        afterLoad: function (origin, destination, direction) {
            const sectionAnchor = destination.anchor;
            if (sectionAnchor === 'PROJECT_POSTER') {
                $('.poster-carousel-container').css('transform', 'translateX(0px)');
                setTimeout(function() {
                    $('.poster-carousel-container').addClass('animate');
                }, 50); 
            } else {
                $('.poster-carousel-container').removeClass('animate');
                $('.poster-carousel-container').css('transform', 'translateX(0px)');
            }
        },

        onLeave: function (origin, destination, direction) {
            const leavingSectionAnchor = origin.anchor;
            if (direction === 'down') {
                $('header').addClass('hide');
            } else if (direction === 'up') {
                $('header').removeClass('hide');
            }
            if (leavingSectionAnchor === 'PROJECT_POSTER') {
                $('.poster-carousel-container').removeClass('animate');
                $('.poster-carousel-container').css('transform', 'translateX(0px)');
            }
        },

        afterSlideLoad: function (section, origin, destination, direction) {
            // Nothing specific for this context
        }
    });

    $('.menu ul li button').on('click', function (e) {
        e.preventDefault();
        const filter = $(this).data('filter');

        $('.menu ul li button').removeClass('active');
        $(this).addClass('active');

        $('.card .content').removeClass('active').css({
            display: 'none',
            opacity: 0,
            transform: 'translateY(40px)',
            pointerEvents: 'none'
        });

        const targets = $(`.card .content.${filter}`);
        targets.each(function (i) {
            $(this).css('display', 'block');
            gsap.to(this, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power2.out',
                onStart: () => {
                    $(this).addClass('active').css('pointer-events', 'auto');
                }
            });
        });
    });

    $('.poster-carousel img').on('click', function () {
        const popupSrc = $(this).data('popup-src');
        $('.popup-image').attr('src', popupSrc);
        $('.poster-popup').fadeIn();
    });

    $('.close-popup, .poster-popup').on('click', function (e) {
        if ($(e.target).is('.popup-image')) return;
        $('.poster-popup').fadeOut();
    });

});
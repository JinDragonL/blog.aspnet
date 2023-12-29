(function () {
    'use strict';
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        }
        , BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        }
        , iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        }
        , Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        }
        , Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        }
        , any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    // Full Height
    var fullHeight = function () {
        if (!isMobile.any()) {
            $('.js-fullheight').css('height', $(window).height());
            $(window).resize(function () {
                $('.js-fullheight').css('height', $(window).height());
            });
        }
    };
    // Animations
    var contentWayPoint = function () {
        var i = 0;
       
    };
    // Burger Menu 
    var burgerMenu = function () {
        $('.js-doro-nav-toggle').on('click', function (event) {
            event.preventDefault();
            var $this = $(this);
            if ($('body').hasClass('offcanvason')) {
                $this.removeClass('active');
                $('body').removeClass('offcanvason');
            }
            else {
                $this.addClass('active');
                $('body').addClass('offcanvason');
            }
        });
    };
    // Click outside of offcanvass
    var mobileMenuOutsideClick = function () {
        $(document).click(function (e) {
            var container = $("#doro-aside, .js-doro-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('offcanvason')) {
                    $('body').removeClass('offcanvason');
                    $('.js-doro-nav-toggle').removeClass('active');
                }
            }
        });
        $(window).scroll(function () {
            if ($('body').hasClass('offcanvason')) {
                $('body').removeClass('offcanvason');
                $('.js-doro-nav-toggle').removeClass('active');
            }
        });
    };
    // Slider
    var sliderMain = function () {
       
    };
    // Sticky 
    var stickyFunction = function () {
        var h = $('.image-content').outerHeight();
        if ($(window).width() <= 992) {
            $("#sticky_item").trigger("sticky_kit:detach");
        }
        else {
            $('.sticky-parent').removeClass('stick-detach');
            $("#sticky_item").trigger("sticky_kit:detach");
            $("#sticky_item").trigger("sticky_kit:unstick");
        }
        $(window).resize(function () {
            var h = $('.image-content').outerHeight();
            $('.sticky-parent').css('height', h);
            if ($(window).width() <= 992) {
                $("#sticky_item").trigger("sticky_kit:detach");
            }
            else {
                $('.sticky-parent').removeClass('stick-detach');
                $("#sticky_item").trigger("sticky_kit:detach");
                $("#sticky_item").trigger("sticky_kit:unstick");
                $("#sticky_item").stick_in_parent();
            }
        });
        $('.sticky-parent').css('height', h);
    };
    // Document on load.
    $(function () {
        fullHeight();
        contentWayPoint();
        burgerMenu();
        mobileMenuOutsideClick();
        sliderMain();
        stickyFunction();
    });
}());


// Contact Form
    var form = $('.contact__form'),
        message = $('.contact__msg'),
        form_data;
    // success function
    function done_func(response) {
        message.fadeIn().removeClass('alert-danger').addClass('alert-success');
        message.text(response);
        setTimeout(function () {
            message.fadeOut();
        }, 2000);
        form.find('input:not([type="submit"]), textarea').val('');
    }
    // fail function
    function fail_func(data) {
        message.fadeIn().removeClass('alert-success').addClass('alert-success');
        message.text(data.responseText);
        setTimeout(function () {
            message.fadeOut();
        }, 2000);
    }
    form.submit(function (e) {
        e.preventDefault();
        form_data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: form_data
        })
        .done(done_func)
        .fail(fail_func);
    });
    

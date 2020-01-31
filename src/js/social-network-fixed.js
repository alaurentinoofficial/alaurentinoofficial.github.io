var sociallocation = -10 + $('#dashboard .social-container').position().top  + parseInt($('#dashboard .social-container').css("margin-top").replace('px', ''));

$(window).bind('resize', function() {
    if($('.social-container').hasClass('fixed'))
    {
        $('.social-container').removeClass('fixed');
        $('.social-sparse').removeClass('active');
    }

    sociallocation = -10 + $('#dashboard .social-container').position().top  + parseInt($('#dashboard .social-container').css("margin-top").replace('px', ''));

    if ($(window).scrollTop() > sociallocation) {
        $('.social-container').addClass('fixed');
        $('.social-sparse').addClass('active');
    } else {
        $('.social-container').removeClass('fixed');
        $('.social-sparse').removeClass('active');
    }
})

$(window).bind('scroll', function (e) {
    if ($(window).scrollTop() > sociallocation) {
        $('.social-container').addClass('fixed');
        $('.social-sparse').addClass('active');
    } else {
        $('.social-container').removeClass('fixed');
        $('.social-sparse').removeClass('active');
    }
});
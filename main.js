$(function() {
    // Initial setup stuff
    $('canvas').width($(window).width());
    $('canvas').height($(window).height());
    $('#welcomeBanner').css('opacity', '0.0').animate({'opacity': '.9'}, 5000);

    // Window resizing things
    $(window).resize(function() {
        $('canvas').width($(window).width());
        $('canvas').height($(window).height());
    });
});
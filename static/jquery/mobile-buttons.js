$(document).ready(function () {
    $(".checkbox-button").click(function () {

        $(this).next().toggleClass('expand', 500);
    });

    $(".expand-button").click(function () {

        $(this).next().toggleClass('expand', 500);
    });

    $("#filter-menu-btn").click(function () {
        $('.filter-menu').toggleClass('expand', 500)
    })
});

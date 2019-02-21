$(document).ready(function () {
    $(".checkbox-button").click(function () {

        $(this).next().toggleClass('expand', 500)
    })

    $(".expand-button").click(function () {

        $(this).next().toggleClass('expand', 500)
    })
})

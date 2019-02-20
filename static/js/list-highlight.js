$(document).ready(function () {
    setInterval(function () {
        $(".restaurant-list-item").click(function () {

            $(".restaurant-list-item").removeClass('hovered')
            $(this).addClass('hovered')
        })

    }, 500);
})
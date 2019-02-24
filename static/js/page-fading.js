
// Fades the #restaurant-detail element out and in again.
function fadeElements() {
    $('#api-wrapper').hide('fade', 1000);
    $('#restaurant-detail').hide('fade', 1000);
    $('#restaurant-list').hide('fade', 1000);
    $(".city-overlay").hide('fade', 1000)
    $(".box").hide('fade', 1000)
    setTimeout(
        function () {
            $('#restaurant-detail').show('fade', 1000);
            $('.select-restaurant').show('fade', 1000);
        }, 1000);
}

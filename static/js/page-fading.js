function onApiKeyEnterFade() {
    $('#api-wrapper').hide('fade', 1000);
    $('.adelaide').hide('fade', 1000);
    $('.overlay').hide('fade', 1000);
    $('#restaurant-detail').hide('fade', 1000);
    setTimeout(
        function () {
            $('#restaurant-detail').show('fade', 1000);
            $('.select-restaurant').show('fade', 1000);
        }, 1000);
};

function noApiKeyEnterFade() {
    $('#api-wrapper').hide();
    $('#restaurant-detail').hide();
    $('.adelaide').hide('fade', 3000);
    $('.overlay').hide('fade', 3000);
};
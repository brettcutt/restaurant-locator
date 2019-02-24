function onCityChoice() {
    $(".city-overlay").show('fade', 1000)
    $(".box").show('fade', 1000)

}
function getCityValue(boxNumber) {

    // gets any values from the filters to appeand to the string.
    // Will be an empty string if no values are selected.
    var cuisineString = filterCuisine();
    var categoryString = filterCategory();
    var keywordString = keywordSearch();

    apiKey = document.getElementById('api').value;
    cityId = document.querySelector('#' + boxNumber + '').getAttribute('value');

    apiUrl = 'https://developers.zomato.com/api/v2.1/search?entity_id=' + cityId + '&entity_type=city&apikey='

    //set the global variable to this string. located in main.js line 4
    restaurantData = apiUrl + apiKey + cuisineString + categoryString + keywordString;


    //below determines the background picture
    cities = [
        { 'id': 297, 'name': 'adelaide' },
        { 'id': 259, 'name': 'melbourne' },
        { 'id': 260, 'name': 'sydney' },
        { 'id': 298, 'name': 'brisbane' }
    ]

    var cityPic
    cities.forEach(function (city) {
        if (city['id'] == cityId) {
            cityPic = city['name']
        }
    })

    // changes the city background pic on #restaurant-detail
    // fades out the old picture, changes the picture and fades in the new picture.
    $("#city-pic").hide('fade', 500)
    setTimeout(function () {
        document.querySelector('#restaurant-detail').innerHTML = `<h2 class='select-restaurant'>Select a restaurant or filter a search!</h2>`
        document.querySelector('#city-pic').style.backgroundImage = "url(static/images/" + cityPic + ".jpg)"
        $("#city-pic").show('fade', 500)
    }, 600)

    // Start the main function
    startMain()

}

function changeCity() {
    $(".city-overlay").show('fade', 1000)
    $(".box").show('fade', 1000)
}
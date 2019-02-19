
function restaurantList(restaurants) {

    var result = [];
    restaurants.forEach(function (restaurant) {

        result.push(
            `<li>
                 <a href="#">${restaurant.restaurant.name}</a>
             </li>`
        )

    })
    return result.join(" ")
}

window.onload = function () {
    $.when(
        $.getJSON("https://developers.zomato.com/api/v2.1/search?entity_id=297&entity_type=city&q=RESTAURANT_URL&category=7%2C9&apikey=<YOUR_API_KEY>")
    ).then(
        function (response) {
            restaurants = response.restaurants
            console.log(restaurants)
            document.getElementById('restaurant-list').innerHTML = restaurantList(restaurants);

        }, function (errorResponse) {

            if (errorResponse.status === 404) {
                $("#restaurant-list").html(`<h2> No restaurants found!</h2 > `);
            } else {
                console.log(errorResponse);
                $("#restaurant-list").html(
                    `< h2 > Error: ${errorResponse.responseJSON.message}</h2 > `
                );
            }
        }
    )
}
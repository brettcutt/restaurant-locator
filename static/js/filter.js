// Gets the amount values from slide.js


function filterRestaurants() {
    $.when(
        $.getJSON(restaurantData)
    ).then(
        function (response) {
            restaurants = response.restaurants
        }
    )

    var checkedCuisine = []
    $("input:checkbox[name=cuisine-checkbox]:checked").each(function () {
        checkedCuisine.push($(this).val());
    });
    getAmountValues(amountValues)
    getRatingValues(ratingValues)
    console.log(checkedCuisine)

    // Checkbox filter. What ever cuisine checkboxes are selected, they are then matched with
    // the restaurants that have the same cuisine type.
    var result = [];
    restaurants.forEach(function (restaurant) {
        var restaurantCuisines = restaurant.restaurant.cuisines.split(", ")
        restaurantCuisines
        console.log('test', restaurantCuisines)
        restaurantCuisines.forEach(function (cuisine) {
            if (checkedCuisine.includes(cuisine)) {
                result.push(restaurant)

            }

        })
    })

    document.getElementById('restaurant-list').innerHTML = getRestaurantList(result)


    console.log("results", result)

}
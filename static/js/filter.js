// Gets the amount values from slide.js


function filterRestaurants() {
    $.when(
        $.getJSON(restaurantData)
    ).then(
        function (response) {
            restaurants = response.restaurants
        }
    )

    var filterByCuisine = filterCuisine(restaurants);

    var filteredByPrice = filterPrice(filterByCuisine);

    var filteredByRating = filterRating(filteredByPrice);

    document.getElementById('restaurant-list').innerHTML = getRestaurantList(filteredByRating)

}

// Checkbox filter. What ever cuisine checkboxes are selected, they are then matched with
// the restaurants that have the same cuisine type.
function filterCuisine(restaurants) {
    console.log(restaurants)
    var checkedCuisine = [];
    $("input:checkbox[name=cuisine-checkbox]:checked").each(function () {
        checkedCuisine.push($(this).val());
    });

    var filterByCuisine = [];
    if (checkedCuisine != "") {

        restaurants.forEach(function (restaurant) {
            var restaurantCuisines = restaurant.restaurant.cuisines.split(", ")
            restaurantCuisines
            restaurantCuisines.forEach(function (cuisine) {
                if (checkedCuisine.includes(cuisine)) {
                    filterByCuisine.push(restaurant)
                }
            })
        })
    } else {
        filterByCuisine = restaurants;
    }
    return filterByCuisine
}

// Filter Restaurant by its price
function filterPrice(filterByCuisine) {

    var priceRange = getAmountValues()

    var filteredByPrice = []

    filterByCuisine.forEach(function (restaurant) {

        var restaurantPrice = restaurant.restaurant.price_range

        if (restaurantPrice >= priceRange[0] && restaurantPrice <= priceRange[1]) {
            filteredByPrice.push(restaurant)
        }
    })

    return filteredByPrice
}

// Filter Restaurant by its price
function filterRating(filteredByPrice) {

    // Filter Restaurant by its rating
    var ratingRange = getRatingValues()

    var filteredByRating = []

    filteredByPrice.forEach(function (restaurant) {

        var restaurantRating = restaurant.restaurant.user_rating.aggregate_rating;

        if (restaurantRating >= ratingRange[0] && restaurantRating <= ratingRange[1]) {
            filteredByRating.push(restaurant)
        }
    })

    return filteredByRating;
}
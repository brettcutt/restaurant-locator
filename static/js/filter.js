
function filterRestaurants() {

    // calls the function to filter the cuisines selected in the cuisines checkboxes
    var cuisineString = filterCuisine()

    // calls the function to filter the categories selected in the cuisines checkboxes
    var categoryString = filterCategory()

    var apiString = apiUrl + apiKey + cuisineString + categoryString
    $.when(
        $.getJSON(apiString)
    ).then(
        function (response) {
            restaurants = response.restaurants

            // calls the function to filter by the pricing slider
            var filteredByPrice = filterPrice(restaurants);

            // calls the function to filter by the rating slider
            var filteredByRating = filterRating(filteredByPrice);

            // restaurantData on line 3 in restaurant-api.js
            restaurantData = filteredByRating;

            document.getElementById('restaurant-list').innerHTML = getRestaurantList(restaurantData)
        }
    )

}
// Filter Restaurant by its cuisine. This grabs all the cuisine id values from the checked boxes
// and creates a string that appends to the new api url.
// eg. &cuisines=969%2C147%2C84, &cusisines= Modern Australia, Morocan, Pizza 
function filterCuisine() {
    var cuisineString = ""

    $("input:checkbox[name=cuisine-checkbox]:checked").each(function () {
        if (cuisineString.length == 0) {

            cuisineString += "&cuisines=" + $(this).val();
        } else {
            cuisineString += "%2C" + $(this).val();
        }
    });

    return cuisineString
}

// Filter Restaurant by its category. This grabs all the category id values from the checked boxes
// and creates a string that appends to the new api url.
// eg. &category=969%2C147%2C84, &cusisines= Modern Australia, Morocan, Pizza
function filterCategory() {
    var categoryString = ""
    $("input:checkbox[name=category-checkbox]:checked").each(function () {
        if (categoryString.length == 0) {

            categoryString += "&category=" + $(this).val();
        } else {
            categoryString += "%2C" + $(this).val();
        }
    });
    return categoryString
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


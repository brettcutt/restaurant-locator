function filterRestaurants() {

    // Returns a string with cuisine values and formatted to be read by the api url.
    var cuisineString = filterCuisine();

    // Returns a string with category values and formatted to be read by the api url.
    var categoryString = filterCategory();

    // Returns a string with a keyword and formatted to be read by the api url.
    var keywordString = keywordSearch();

    // the api combination to query the Zomato api database
    var apiString = apiUrl + apiKey + cuisineString + categoryString + keywordString;
    $.when(
        $.getJSON(apiString)
    ).then(
        function (response) {
            // restaurantData is the global varaible from restaurant-api.js
            // all function have access to retrieved restaurant data.
            restaurantData = response.restaurants;

            // fade hide and show the restaurant-list element 
            $('#restaurant-list').hide('fade', 500);
            setTimeout(
                function () {
                    $('#restaurant-list').show('fade', 500);

                    // Adds a list of restaurants to #restaurant-list(ul)
                    document.getElementById('restaurant-list').innerHTML = getRestaurantList(restaurantData);
                }, 500);
        }
    );

}
// Filter Restaurant by its cuisine. This grabs all the cuisine id values from the checked boxes
// and creates a string that appends to the new api url.
// eg. &cuisines=969%2C147%2C84, &cusisines= Modern Australia, Morocan, Pizza 
function filterCuisine() {
    var cuisineString = "";

    $("input:checkbox[name=cuisine-checkbox]:checked").each(function () {
        if (cuisineString.length == 0) {

            cuisineString += "&cuisines=" + $(this).val();
        } else {
            cuisineString += "%2C" + $(this).val();
        }
    });

    return cuisineString;
}

// Filter Restaurant by its category. This grabs all the category id values from the checked boxes
// and creates a string that appends to the new api url.
// eg. &category=969%2C147%2C84, &cusisines= Modern Australia, Morocan, Pizza
function filterCategory() {
    var categoryString = "";
    $("input:checkbox[name=category-checkbox]:checked").each(function () {
        if (categoryString.length == 0) {

            categoryString += "&category=" + $(this).val();
        } else {
            categoryString += "%2C" + $(this).val();
        }
    });
    return categoryString;
}

// Filter Restaurant by its price
function filterPrice() {
    var priceRange = getAmountValues();

    var filteredByPrice = [];

    restaurantData.forEach(function (restaurant) {

        var restaurantPrice = restaurant.restaurant.price_range;

        if (restaurantPrice >= priceRange[0] && restaurantPrice <= priceRange[1]) {
            filteredByPrice.push(restaurant);
        }
    });
    document.getElementById('restaurant-list').innerHTML = getRestaurantList(filteredByPrice);
    // return filteredByPrice
}

// Filter Restaurant by its price
function filterRating() {

    // Filter Restaurant by its rating
    var ratingRange = getRatingValues();

    var filteredByRating = [];

    restaurantData.forEach(function (restaurant) {

        var restaurantRating = restaurant.restaurant.user_rating.aggregate_rating;

        if (restaurantRating >= ratingRange[0] && restaurantRating <= ratingRange[1]) {
            filteredByRating.push(restaurant);
        }
    });
    document.getElementById('restaurant-list').innerHTML = getRestaurantList(filteredByRating);
    // return filteredByRating;
}

// Filter Restaurant by a keyword
function keywordSearch() {
    var keyword = "&q=" + document.getElementById('keyword-search').value;

    return keyword;
}


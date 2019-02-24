let apiKey = "<YOUR API-KEY-HERE>";
let city = "297"
let apiUrl = 'https://developers.zomato.com/api/v2.1/search?entity_id=' + city + '&entity_type=city&apikey=';
let restaurantData = apiUrl + apiKey;


window.onload = function () {

    //refer to city-choice.js
    onCityChoice()

    if (apiKey != '<YOUR API-KEY-HERE>') {

        $('#api-wrapper').hide()
        document.querySelector('#api').value = apiKey;

        //refer to city-choice.js
        onCityChoice();
    }
};


// Once an api key has been entered, this is the main function that will start.
function startMain() {

    // Make a call to the Zomato API
    $.when(
        $.getJSON(restaurantData)
    ).then(
        function (response) {
            restaurants = response.restaurants;

            // refer to page-fading.js
            fadeElements();

            // fades #restaurant-list element out and in again

            setTimeout(
                function () {

                    $('#restaurant-list').show('fade', 1000);
                    $('#restaurant-detail').show('fade', 1000);

                    // Adds a list of restaurants to #restaurant-list(ul). Refer to function below.
                    document.getElementById('restaurant-list').innerHTML = getRestaurantList(restaurants);

                    //set the global variable to this array of objects. located in main.js line 4
                    restaurantData = restaurants;

                }, 1000);

        }, function (errorResponse) {

            if (errorResponse.status === 404) {
                $("#error").html(`<h2> No restaurants found!</h2 > `);
            } else {
                console.log(errorResponse);
                $("#error").html(
                    `<h2> ${errorResponse.responseJSON.message}</h2> `
                );
                $('#api-wrapper').show('fade', 1000)
            }
        }
    )
}

// creates and formats the list of restaurants
function getRestaurantList(restaurants) {
    console.log("selected", restaurants);
    var result = [];
    if (restaurants == "") {
        result.push(`<li class="no-restaurants">No restaurants found!</li?`);

    } else {
        restaurants.forEach(function (restaurant) {
            // when searching the restaurant name, apostrophes are removed to prevent an error occuring.
            var nameWithRemovedComma = restaurant.restaurant.name.replace(/'/g, '');
            result.push(
                `
                <li>
                    <a href="#bottom-page" class="restaurant-list-item" name="${restaurant.restaurant.name}" 
                    onclick="onSelectRestaurant('${nameWithRemovedComma}')">${restaurant.restaurant.name}</a>
                </li>
                 `
            );
        });
    }

    return result.join(" ");
}

// creates the individual restaurant detail view.
function onSelectRestaurant(restaurantName) {

    restaurants = restaurantData;
    // when searching the restaurant name, apostrophes are removed to prevent an error occuring.
    var restaurant = restaurants.find(i => i.restaurant.name.replace(/'/g, '') == restaurantName);

    restaurant = restaurant.restaurant;

    var delivery = deliveryService(restaurant);

    var bookings = tableBooking(restaurant);

    var restaurantPrice = restaurantPricing(restaurant);

    var restaurantRating = restaurantUserRating(restaurant);

    $('#restaurant-detail').hide('fade', 1000);

    setTimeout(
        function () {
            $('#restaurant-detail').show('fade', 1000);
            document.getElementById('restaurant-detail').innerHTML = `
                    <div class="col-xs-12 col-md-6">
                        <img class="restaurant-image" src="${restaurant.thumb}" alt="${restaurant.name}" ;'>
                    </div>
                    <div class="details col-xs-12 col-md-6">
                        <h3>${restaurant.name}</h3>
                        <p class='restaurant-location'>${restaurant.location.address}</p>
                        <div class='bookings-delivery'>
                            ${delivery}
                            ${bookings}
                        </div>
                        <p class='heading'>CUISINES</p>
                        <p class='restaurant-cuisine'>${restaurant.cuisines}</p>
                        <p class='heading'>PRICE: ${restaurantPrice[2]}</p>
                        <div class="progress">
                            <div class="progress-bar ${restaurantPrice[0]}" role="progressbar" style="width:${restaurantPrice[1]}%" aria-valuenow="${restaurant.price_range}" aria-valuemin="0" aria-valuemax="5"></div>  
                        </div>
                        
                        <p class='heading'>CUSTOMER RATING: ${restaurantRating[1]}</p>
                        <div class="progress">
                            <div class="progress-bar ${restaurantRating[2]}" role="progressbar" style="width:${restaurantRating[0]}%" aria-valuenow="${restaurantRating[0]}" aria-valuemin="0" aria-valuemax="5"></div>
                        </div>
                        <a class='restaurant-url-btn' target="_blank" href="${restaurant.menu_url}">See Menu</a>
                        <a class='restaurant-url-btn' target="_blank" href="${restaurant.url}">More Details</a>
                        
                    </div>
                    `;
        }, 1000);
}

function tableBooking(restaurant) {
    restaurant.has_table_booking == 1 || restaurant.is_table_reservation_supported == 1 ?
        bookings = `<p class='restaurant-booking'><i class="fas fa-check "></i> Bookings Avaliable</p>` :
        bookings = `<p class='restaurant-booking'><i class="fas fa-times"></i> No Bookings</p>`;

    return bookings;
}

function deliveryService(restaurant) {
    restaurant.has_online_delivery == 0 || restaurant.is_delivering_now == 0 ?
        delivery = `<p class='restaurant-delivery'><i class="fas fa-check "></i> Delivery Avaliable</p>` :
        delivery = `<p class='restaurant-delivery'><i class="fas fa-times"></i> No Delivery</p>`;
    return delivery;
}
function restaurantPricing(restaurant) {

    // Determines the pricing bar colour
    var barColor = "";
    if (restaurant.price_range == 1) {
        restaurant.price_range = 1.1;
        barColor = 'bar-green';
    } else if (restaurant.price_range == 2) {
        barColor = 'bar-yellow';
    } else if (restaurant.price_range == 3) {
        barColor = 'bar-orange';
    } else if (restaurant.price_range == 4) {
        barColor = 'bar-red';
    }

    // Determines the pricing bar length
    var barLength = (restaurant.price_range - 1) * 33;

    // Determines the number of dollar symbols
    var dollarSymbolRepeat = `<i class="fas fa-dollar-sign"></i>`.repeat(restaurant.price_range);

    return [barColor, barLength, dollarSymbolRepeat];
}

function restaurantUserRating(restaurant) {

    var ratingPercentage = ((restaurant.user_rating.aggregate_rating / 5) * 100).toFixed(1);

    // Determines the rating bar colour
    var barColor = "";
    if (ratingPercentage >= 0 && ratingPercentage <= 25) {
        barColor = 'bar-red';
    } else if (ratingPercentage > 25 && ratingPercentage <= 50) {
        barColor = 'bar-orange';
    } else if (ratingPercentage > 50 && ratingPercentage <= 75) {
        barColor = 'bar-yellow';
    }
    else if (ratingPercentage > 75 && ratingPercentage <= 100) {
        barColor = 'bar-green';
    }

    var barLength = "";
    if (restaurant.user_rating.rating_text == "Not rated") {
        ratingPercentage = "No Rating!";
    } else {
        ratingPercentage = ratingPercentage + "%";
        barLength = (restaurant.user_rating.aggregate_rating * 10) * 2;
    }

    return [barLength, ratingPercentage, barColor];
}
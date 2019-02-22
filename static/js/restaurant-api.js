let apiKey = "<YOUR API-KEY-HERE>";
let apiUrl = 'https://developers.zomato.com/api/v2.1/search?entity_id=297&entity_type=city&apikey=';
let restaurantData = apiUrl + apiKey;


window.onload = function () {
    if (apiKey != '<YOUR API-KEY-HERE>') {
        start();
    }
};

// If an api key hasn't been entered above but in the browser the function will trigger.
// Location index.html <button onclick="apikey()">
function apikey() {
    apiKey = document.getElementById('api').value;
    restaurantData = apiUrl + apiKey;
    start();
};

// Once an api key has been entered, this is the main function that will start.
function start() {
    $.when(
        $.getJSON(restaurantData)
    ).then(
        function (response) {
            restaurants = response.restaurants;

            // Fades the #restaurant-detail element out and in again.
            // refer to page-fading.js
            onApiKeyEnterFade();

            // fades #restaurant-list elment out and in again
            $('#restaurant-list').hide('fade', 1000);
            setTimeout(
                function () {
                    $('#restaurant-list').show('fade', 1000);

                    // Adds a list of restaurants to #restaurant-list(ul)
                    document.getElementById('restaurant-list').innerHTML = getRestaurantList(restaurants);

                    // line 3 restaurant data = the array of the restaurant objects.
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
    };

    return result.join(" ");
}

// creates the individual restaurant detail view.
function onSelectRestaurant(restaurantName) {

    restaurants = restaurantData;
    // when searching the restaurant name, apostrophes are removed to prevent an error occuring.
    var restaurant = restaurants.find(i => i.restaurant.name.replace(/'/g, '') == restaurantName);

    restaurant = restaurant.restaurant;

    restaurant.has_online_delivery == 0 || restaurant.is_delivering_now == 0 ?
        delivery = `<p class='restaurant-delivery'><i class="fas fa-check "></i> Delivery Avaliable</p>` :
        delivery = `<p class='restaurant-delivery'><i class="fas fa-times"></i> No Delivery</p>`;

    restaurant.has_table_booking == 1 || restaurant.is_table_reservation_supported == 1 ?
        bookings = `<p class='restaurant-booking'><i class="fas fa-check "></i> Bookings Avaliable</p>` :
        bookings = `<p class='restaurant-booking'><i class="fas fa-times"></i> No Bookings</p>`;


    var restaurantRating = (restaurant.user_rating.aggregate_rating * 10) * 2;
    $('#restaurant-detail').hide('fade', 1000);

    setTimeout(
        function () {
            $('#restaurant-detail').show('fade', 1000);
            document.getElementById('restaurant-detail').innerHTML = `
                    <div class="col-xs-12 col-md-6">
                        <img class="restaurant-image" src="${restaurant.thumb}" alt="${restaurant.name}" ;'>
                    </div>
                    <div class="col-xs-12 col-md-6">
                        <h3>${restaurant.name}</h3>
                        <p class='restaurant-location'>${restaurant.location.address}</p>
                        <div class='bookings-delivery'>
                            ${delivery}
                            ${bookings}
                        </div>
                        <p class='heading'>CUISINES</p>
                        <p class='restaurant-cuisine'>${restaurant.cuisines}</p>
                        <p class='heading'>PRICE</p>
                        <div class="progress">
                            <div class="progress-bar bar1" role="progressbar" style="width:${restaurant.price_range * 2}0%" aria-valuenow="${restaurant.price_range}" aria-valuemin="0" aria-valuemax="5"></div>  
                        </div>
                        <p class='heading'>CUSTOMER RATING</p>
                        <div class="progress">
                            <div class="progress-bar bar2" role="progressbar" style="width:${restaurantRating}%" aria-valuenow="${restaurantRating}" aria-valuemin="0" aria-valuemax="5"></div>
                        </div>
                        <a class='restaurant-url-btn' target="_blank" href="${restaurant.menu_url}">See Menu</a>
                        <a class='restaurant-url-btn' target="_blank" href="${restaurant.url}">More Details</a>
                        
                    </div>
                    `;
        }, 1000);
}


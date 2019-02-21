const apiKey = "&apikey=<YOUR API-KEY-HERE>"
let restaurantData = "https://developers.zomato.com/api/v2.1/search?entity_id=297&entity_type=city" + apiKey;


// On browser load, make a call to the api and create a list of restaurants
window.onload = function () {

    document.getElementById('restaurant-detail').innerHTML = `
    <p class='onload-note'>Please select a restaurant!</p>`

    $.when(
        $.getJSON(restaurantData)
    ).then(
        function (response) {

            restaurants = response.restaurants

            document.getElementById('restaurant-list').innerHTML = getRestaurantList(restaurants);
            restaurantData = restaurants;

        }, function (errorResponse) {

            if (errorResponse.status === 404) {
                $("#restaurant-detail").html(`<h2> No restaurants found!</h2 > `);
            } else {
                console.log(errorResponse);
                $("#restaurant-detail").html(
                    `<h2> Error: ${errorResponse.responseJSON.message}</h2> `
                );
            }
        }
    )
}

// creates and formats the list of restaurants
function getRestaurantList(restaurants) {
    console.log("selected", restaurants)
    var result = [];
    if (restaurants == "") {
        result.push(`
        <li class="no-restaurants">No restaurants found!</li?
        `)
    } else {

        restaurants.forEach(function (restaurant) {
            result.push(
                `
                <li>
                    <a href="#bottom-page" class="restaurant-list-item" name="${restaurant.restaurant.name}" onclick="onSelectRestaurant('${restaurant.restaurant.name}')">${restaurant.restaurant.name}</a>
                </li>
                 `
            )
        })
    }

    return result.join(" ");
}

// creates the individual restaurant detail view.
function onSelectRestaurant(restaurantName) {

    console.log(restaurantData)
    restaurants = restaurantData;
    var restaurant = restaurants.find(i => i.restaurant.name == restaurantName)

    restaurant = restaurant.restaurant;
    restaurant.has_online_delivery == 1 ? delivery = `<p class='restaurant-delivery'><i class="fas fa-check "></i> Delivery Avaliable</p>` : delivery = `<p class='restaurant-delivery'><i class="fas fa-times"></i> No Delivery</p>`;

    restaurant.has_table_booking == 1 ? bookings = `<p class='restaurant-booking'><i class="fas fa-check "></i> Bookings Avaliable</p>` : bookings = `<p class='restaurant-booking'><i class="fas fa-times"></i> No Booking</p>`;
    restaurant.phone_number ? phone_number = `<p class='restaurant-number'>${restaurant.phone_number}</p>` : phone_number = `<p class='restaurant-number'>No data</p>`;

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
                <p class='heading'>PHONE NUMBER</p>
                ${phone_number}
                <p class='heading'>OPENING HOURS</p>
                <p class='restaurant-number'>No data</p>
                <P></P>
            </div>
            `
}


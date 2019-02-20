// On browser load, make a call to the api and create a list of restaurants
const restaurantData = "https://developers.zomato.com/api/v2.1/search?entity_id=297&entity_type=city&q=RESTAURANT_URL&category=7%2C9&<YOUR API-KEY-HERE>"
window.onload = function () {
    $.when(
        $.getJSON(restaurantData)
    ).then(
        function (response) {
            restaurants = response.restaurants

            document.getElementById('restaurant-list').innerHTML = getRestaurantList(restaurants);
            createCuisineCheckbox(restaurants)
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

// creates and formats the list of restaurants
function getRestaurantList(restaurants) {
    var result = [];
    restaurants.forEach(function (restaurant) {

        result.push(
            `<li>
                 <a href="#" onclick="onSelectRestaurant('${restaurant.restaurant.name}')">${restaurant.restaurant.name}</a>
             </li>`
        )
    })
    return result.join(" ");
}

// creates the individual restaurant detail view.
function onSelectRestaurant(restaurantName) {
    $.when(
        $.getJSON(restaurantData)
    ).then(
        function (response) {
            restaurants = response.restaurants;
            var restaurant = restaurants.find(i => i.restaurant.name == restaurantName)
            restaurant = restaurant.restaurant;
            restaurant.has_table_booking == 1 ? delivery = `<p><i class="fas fa-check"></i> Bookings avaliable</p>` : delivery = `<p><i class="fas fa-times"></i> No Booking</p>`;
            restaurant.has_online_delivery == 1 ? bookings = `<p><i class="fas fa-check"></i> Delivery avaliable</p>` : bookings = `<p><i class="fas fa-times"></i> No Delivery</p>`;
            restaurant.phone_number ? phone_number = `<p>${restaurant.phone_number}</p>` : phone_number = `<p>No data</p>`;
            restaurant.phone_number ? phone_number = `<p>${restaurant.phone_number}</p>` : phone_number = `<p>No data</p>`;


            document.getElementById('restaurant-detail').innerHTML = `
            <div class="col-xs-5">
                <img src="${restaurant.thumb}" alt="" style='width: 300px;'>
            </div>
            <div class="col-xs-7">
                <h4>${restaurant.name}</h4>
                <p>${restaurant.location.address}</p>
                ${delivery}
                ${bookings}
                <p>CUISINES</p>
                <p>${restaurant.cuisines}</p>
                <p>PHONE NUMBER</p>
                ${phone_number}
                <p>OPENING HOURS</p>
                <P>${restaurant.events_url}</P>
            </div>
            `
        }
    )
}


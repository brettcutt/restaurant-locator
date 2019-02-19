window.onload = function () {
    $.when(
        $.getJSON("data.json")
        // $.getJSON("https://developers.zomato.com/api/v2.1/search?entity_id=297&entity_type=city&q=RESTAURANT_URL&category=7%2C9&apikey=<YOUR_API_KEY>")
    ).then(
        function (response) {
            restaurants = response.restaurants
            console.log(restaurants)
            document.getElementById('restaurant-list').innerHTML = getRestaurantList(restaurants);

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


function onSelectRestaurant(restaurantName) {
    $.when(
        $.getJSON("data.json")
    ).then(
        function (response) {
            restaurants = response.restaurants;
            var restaurant = restaurants.find(i => i.restaurant.name == restaurantName)
            restaurant = restaurant.restaurant;
            restaurant.has_table_booking == 1 ? delivery = `<p><i class="fas fa-check"></i> Bookings avaliable</p>` : delivery = `<p><i class="fas fa-times"></i> No Booking</p>`;
            restaurant.has_online_delivery == 1 ? bookings = `<p><i class="fas fa-check"></i> Delivery avaliable</p>` : bookings = `<p><i class="fas fa-times"></i> No Delivery</p>`;
            restaurant.phone_number ? phone_number = `<p>${restaurant.phone_number}</p>` : phone_number = `<p>No data</p>`;
            restaurant.phone_number ? phone_number = `<p>${restaurant.phone_number}</p>` : phone_number = `<p>No data</p>`;
            console.log(restaurant.cuisines)
            document.getElementById('restaurant-detail').innerHTML = `
            <div class="col-xs-5">
                <img src="${restaurant.featured_image}" alt="" style='width: 300px;'>
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
                <P></P>
            </div>
            `


        }
    )
}
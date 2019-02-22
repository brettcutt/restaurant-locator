function createCheckbox() {

    $.when(
        $.getJSON('data/checkboxes.json')
    ).then(
        function (response) {
            // Category checkboxes
            var categories = response.categories
            var result = []
            categories.forEach(function (category) {
                result.push(`<li><input name='category-checkbox' class='category-checkbox' onclick="filterRestaurants()" type="checkbox" value='${category.categories.id}'>${category.categories.name}</li>`)
            })

            result = result.join("")
            document.getElementById('category-search').innerHTML = result;


            // Cuisine checkboxes
            var cuisines = response.cuisines
            var result = []
            cuisines.forEach(function (cuisine) {
                result.push(`<li><input name='cuisine-checkbox' class='cuisine-checkbox' onclick="filterRestaurants()" type="checkbox" value='${cuisine.cuisine.cuisine_id}'>${cuisine.cuisine.cuisine_name}</li>`)
            })

            result = result.join("")
            document.getElementById('cuisine-search').innerHTML = result
        }
    )
}

createCheckbox()
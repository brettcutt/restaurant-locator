function createCheckbox() {

    $.when(
        $.getJSON('data/checkboxes.json')
    ).then(
        function (response) {
            // Category checkboxes
            var categories = response.categories;
            var categoryResult = [];
            categories.forEach(function (category) {
                categoryResult.push(
                    `<li><input name='category-checkbox' 
                class='category-checkbox' onclick="filterRestaurants()" 
                type="checkbox" value='${category.categories.id}'>
                ${category.categories.name}
                </li>`
                );
            });

            categoryResult = categoryResult.join("");
            document.getElementById('category-search').innerHTML = categoryResult;


            // Cuisine checkboxes
            var cuisines = response.cuisines;
            var cuisineResult = [];
            cuisines.forEach(function (cuisine) {
                cuisineResult.push(
                    `<li><input name='cuisine-checkbox' 
                class='cuisine-checkbox' onclick="filterRestaurants()" 
                type="checkbox" 
                value='${cuisine.cuisine.cuisine_id}'>
                ${cuisine.cuisine.cuisine_name}
                </li>`
                );
            });

            cuisineResult = cuisineResult.join("");
            document.getElementById('cuisine-search').innerHTML = cuisineResult;
        }
    );
}

createCheckbox();
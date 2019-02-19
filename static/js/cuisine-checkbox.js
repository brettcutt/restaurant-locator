function createCuisineCheckbox(data) {
    console.log(data)

    var cuisineList = []
    data.forEach(function (item) {

        cuisine = item.restaurant.cuisines

        if (cuisine.includes(", ")) {

            var cuisines = cuisine.split(", ")
            cuisines.forEach(function (item2) {
                cuisineList.push(item2)
            })

        } else {
            cuisineList.push(cuisine)
        }
    })

    let uniqueCuisineArray = [...new Set(cuisineList)];
    console.log(uniqueCuisineArray)



    document.getElementById('cuisine-search').innerHTML = checkboxHtml(uniqueCuisineArray)
}

function checkboxHtml(uniqueCuisineArray) {

    var result = []
    uniqueCuisineArray.forEach(function (cuisine) {
        result.push(`
        <li><input name='cuisine-checkbox' class='cuisine-checkbox' oninput="filterRestaurants()" type="checkbox" value='${cuisine}'>${cuisine}</li>
        `)
    })
    return result.join("");
}
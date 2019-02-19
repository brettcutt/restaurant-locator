// produces the values for the amount slider and passes the values to "getAmountValues" in
// restaurant-api.js
var amountValues = [1, 4]

$(function () {
    $("#amount-range").slider({
        range: true,
        min: 1,
        max: 4,
        values: [1, 4],
        slide: function (event, ui) {
            $("#amount-slider").val("$" + ui.values[0] + " - $" + ui.values[1]);
            amountValues[0] = ui.values[0]
            amountValues[1] = ui.values[1]
            getAmountValues(amountValues)
        }
    },
    );

    $("#amount-slider").val("$" + $("#amount-range").slider("values", 0) +
        " - $" + $("#amount-range").slider("values", 1));

});

function getAmountValues(values) {
    return values
}


// produces the values for the rating slider and passes the values to "getRatingValues" in
// restaurant-api.js

var ratingValues = [1, 5]

$(function () {
    $("#rating-range").slider({
        range: true,
        min: 0,
        max: 5,
        step: .1,
        values: [0, 5],
        slide: function (event, ui) {
            $("#rating-slider").val(ui.values[0] + " - " + ui.values[1]);
            ratingValues[0] = ui.values[0]
            ratingValues[1] = ui.values[1]
            getRatingValues(ratingValues)
        }
    },
    );

    $("#rating-slider").val($("#rating-range").slider("values", 0) +
        " - " + $("#rating-range").slider("values", 1));

});


// Gets the rating values from slide.js
function getRatingValues(values) {
    return values
}




// var city = $('#city');
var city = 'Москва';


$.ajax({
    method: "GET",
    url: "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + city + "&format=json&callback=wikiCallback",
    // context: document.body,
    jsonp: "callback",
    dataType: "jsonp",
    data: {
        format: "json"
    },

    // Work with the response
    success: function( response ) {
        $('#cityLink').attr("href", response[3][0]);
        console.log( response[3][0]); // server response
    }
});


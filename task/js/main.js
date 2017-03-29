$(document).ready(function() {

	$('#submit-btn').click(function(event) {
		var street = $('#street').val();
		var city = $('#city').val();
		var imgUrl = `https://maps.googleapis.com/maps/api/streetview?size=1200x900&location=${street},${city}`;
		var img = $('<img class="bgimg" />');
		if ($('.bgimg').length) {
			$('.bgimg').fadeOut().attr('src', imgUrl).fadeIn();
		} else {
			$('body').append(img);
			$('.bgimg').attr('src', imgUrl).fadeIn();
		}
		event.preventDefault();
		$.ajax({
			url: `http://en.wikipedia.org/w/api.php?action=opensearch&search=${city}&format=json&callback=wikiCallback`,
			async: false,
			type: 'GET',
			dataType: 'JSONP'
		}).then(function(result) {
			$('#wikiLinksList').empty()
			for (var i = 0; i < result[1].length; i++) {
				$('#wikiLinksList').append($('<li></li>').append($('<a target="_blank"></a>').attr('href', result[3][i]).text(result[1][i])));
			}
		}).fail(function() {
			console.error('Wrong request!');
		})
	})
})

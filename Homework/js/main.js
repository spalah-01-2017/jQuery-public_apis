$('#submit-btn').click(function(e){
	e.preventDefault();
	var nameCity = $('#city').val();
	var nameStreet =$('#street').val();
	var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+nameCity+'&format=json&callback=wikiCallback'
	$.ajax({
		type: "GET",
		url: url,
		dataType: "JSONP",
		cache: false,
		success: function(data){
			function addImg(nameStreet,nameCity) {
			  $('body').append('<img src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location='+nameStreet+','+nameCity+'" class="bgimg" alt="" />');
			}
			addImg(nameStreet,nameCity);
			$('#wikiLinksList').html('<li><a href='+data[data.length-1][0]+'>'+data[0]+'</a></li>');
		}
	});
});

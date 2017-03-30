$('#submit-btn').click(function(e){
	e.preventDefault();
	var nameCity = $('#city').val();
	var nameStreet =$('#street').val();
	var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+nameCity+'&format=json&callback=wikiCallback'
	if(nameCity.trim() != "" && nameStreet.trim() != ""){
		function addImg(nameStreet,nameCity) {
			$('img').remove();
			$('body').append('<img src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location='+nameStreet+','+nameCity+'" class="bgimg" alt="" />');
		};
		addImg(nameStreet,nameCity);
		$.ajax({
			type: "GET",
			url: url,
			dataType: "JSONP",
			cache: false
		})
		.then(function(data){
			$('#wikiLinksList').empty();
			for(var i=0; i<data[data.length-1].length; i++){
				$('#wikiLinksList').append('<li><a href='+data[data.length-1][i]+'>'+data[1][i]+'</a></li>');
			}
		})
		.fail(function(){
			alert('Что-то пошло не так!');
		})
	}else{
		alert("Заполните все поля!")
	};
});
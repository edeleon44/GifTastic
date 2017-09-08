$(function(){
	populateButtons(searchArray,'searchButton','#buttonArea');
})

var searchArray = ['Dog','Cat','Bird'];

function populateButtons(searchArray,classToAdd,areaToAddTo){
	$(areaToAddTo).empty();
	for (var i=0;i<searchArray.length;i++){
		var a = $('<button>');
		a.addClass(classToAdd);
		a.attr('data-type',searchArray[i]);
		a.text(searchArray[i]);
		$(areaToAddTo).append(a);
	}
}

$('#search-input').on('click',function(e){
	e.preventDefault();
	$('#searches').empty();
	var type = $(this).data('type');
	var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=221d9697ada14f88998c0b21c19d5cdb&q='+type+'&limit=25&offset=0&rating=G&lang=en';
	$.ajax({url:queryURL,method:'GET'})
		.done(function(response){
			for(var i=0;i<response.data.length;i++){
				var searchDiv = $('<div class="search-item">');
				var rating = response.data[i].rating;
				var p = $('<p>').text('Rating: '+rating);
				var animated = response.data[i].images.fixed_height.url; 
				var still = response.data[i].images.fixed_height_still.url;
				var image = $('<img>');
				image.attr('src',still);
				image.attr('data-still',still);
				image.attr('data-animated',animated);
				image.attr('data-state','still');
				image.addClass('searchImage');
				searchDiv.append(p);
				searchDiv.append(image);
				$('#searches').append(searchDiv);
			}
		})

				
	
});
$(document).on('click')

$('#addSearch').on('click',function(e){
	e.preventDefault();
	var newSearch = $('#search-input').eq(0).val();
	searchArray.push(newSearch);
	console.log(searchArray);
	var a = $('<button>');
	a.addClass('searchButton');
	a.attr("data-type",searchArray[searchArray.length - 1]);
	a.text(searchArray[searchArray.length - 1]);
	$('#buttonArea').append(a);
});

$('#search-input').on('click',function(e){
	e.preventDefault();
	var newSearch = $('input').eq(0).val();
	searchArray.push(newSearch);	
	populateButtons(searchArray,'searchButton','#buttonArea');
	
	//We return false--> We do this b/c we have an input type submit. It wants to reload page and it would keep the original three. We want it to return the new ones awell.
		
});


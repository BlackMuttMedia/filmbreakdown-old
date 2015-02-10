successCB = function(data)
{
	console.log(JSON.parse(data).results);
};

errorCB = function(data)
{
	console.log(data);
};

isNullOrWhitespace = function( input ) {

    if (typeof input === 'undefined' || input == null) return true;

    return input.replace(/\s/g, '').length < 1;
}

getFormattedTitle = function(item)
{
	var label = '';
	if(!(item === 'undefined' || item == null || isNullOrWhitespace(item.title)))
	{
		label = item.title;
		if(!isNullOrWhitespace(item.release_date))
		{
			label = label + ' (' + item.release_date.substring(0, 4) + ')';
		}
	}

	return label;
};

getFilmUrl = function(item)
{
	var url = '/film/';
	if(!(item === 'undefined' || item == null || isNullOrWhitespace(item.title)))
	{
		url = url + item.id + '-' + item.title.replace(' ', '-');
		if(!isNullOrWhitespace(item.release_date))
		{
			url = url + '-' + item.release_date.substring(0, 4);
		}
	}

	return url;
};

  $(document).ready(function() {
    $('.titleSearch').autocomplete({
      source: function( request, response ) {
  		theMovieDb.search.getMovie({"query":escape(request.term), "search_type":"ngram", "include_adult":"false"}, 
  			function(data)
  			{ 
  				var results = _.first(JSON.parse(data).results, 8);
  				response(results); 
  			}, 
  			function(data) { response(null); });
      },
      minLength: 3,
      select: function( event, ui ) {
      	if(ui.item)
      	{
      		var newUrl = getFilmUrl(ui.item);
      		window.location.href = newUrl;
      	}
        console.log( ui.item ?
          ui.item :
          "Nothing selected, input was " + this.value);
      },
      open: function() {
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      },
      close: function() {
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      },
      focus: function(event, ui) {
      	$(this).val(getFormattedTitle(ui.item));
      	event.preventDefault();
      },
      delay: 0
    })
    .autocomplete("instance")
    ._renderItem = function(ul, item)
    {
    	$(ul).addClass('search-dropdown small').data('dropdown-content');
    	var imageUrl = '';

		var listItem = $("<li>").addClass('row');
		listItem.data("ui-autocomplete-item", item);
		$(ul).append(listItem);

		var anchor = $('<div>'); // { class: 'row'});
		listItem.append(anchor);

		var div =$('<div>').addClass('small-3').addClass('medium-3').addClass('large-3').addClass('column'); //'<div>', { class: 'small-3 medium-3 large-3 column'});
 		listItem.append(div);

    	if(!(typeof item.poster_path === 'undefined' || item.poster_path == null || item.poster_path.replace(/\s/g, '').length < 1))
    	{
    		imageUrl = "http://image.tmdb.org/t/p/w45/" + item.poster_path ;
    		div.append($('<img></img>').attr('src', imageUrl)); // '<img>', { src: imageUrl });
    	}
    	var titleDiv = $('<div>').addClass('small-9').addClass('right'); //'<div>', { class: 'small-9 right' })
    	titleDiv.append(getFormattedTitle(item));

		listItem.append(titleDiv);

    	return  ul;
    }
  });

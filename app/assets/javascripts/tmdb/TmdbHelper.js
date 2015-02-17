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
		label	 = getFormattedTitleFromParts(item.title);
	}

	return label;
};

getFormattedTitleFromParts = function(title, releaseDate){
		var formattedTitle = title;
		if(!isNullOrWhitespace(releaseDate))
		{
			formattedTitle = formattedTitle + ' (' + releaseDate.substring(0, 4) + ')';
		}

		return formattedTitle;
};

getFilmUrl = function(item)
{
	var url = '/film/';
	if(!(item === 'undefined' || item == null || isNullOrWhitespace(item.title)))
	{
		url = url + item.id + '-' + item.title.split(' ').join('-').split('%20').join('-'); //.replace(' ', '-').replace('%20', '-');
		if(!isNullOrWhitespace(item.release_date))
		{
			url = url + '-' + item.release_date.substring(0, 4);
		}
	}

	return url;
};


isNullOrWhitespace =  function(stringValue) {
  return (typeof stringValue === 'undefined' || stringValue == null || stringValue.replace(/\s/g, '').length < 1);
};

getTmdbThumbnailUrl = function(poster_path)
{
  return this.isNullOrWhitespace(poster_path) ? null : "http://image.tmdb.org/t/p/w45/aaaaa" + poster_path;
};

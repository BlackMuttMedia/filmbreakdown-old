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
	var fullUrl;

	if(!(item === 'undefined' || item == null || isNullOrWhitespace(item.title))){
		fullUrl = getUrlFromParts('/films/', item.id, item.title, item.release_date);
	}

	return fullUrl;
};

getGenreUrl = function(item)
{
	var fullUrl;

	if(!(item === 'undefined' || item == null || isNullOrWhitespace(item.title))){
		console.log(item.id);
		fullUrl = getUrlFromParts('/genres/', item.id, item.title, item.release_date);
	}

	return fullUrl;
};

getItemUrl = function(item)
{
	var fullUrl;

	if(!(item === 'undefined' || item == null || isNullOrWhitespace(item.title))){
		fullUrl = getUrlFromParts((item.baseUrl || ''), item.id, item.title, item.release_date);
	}

	return fullUrl;
};

getUrlFromParts = function(baseUrl, id, title, releaseDate)
{
	var url = baseUrl + id + '-' +  getUrlKey(title);

	if(!isNullOrWhitespace(releaseDate))
	{
		url = url + '-' + releaseDate.substring(0, 4);
	}
	
	return url;
}

getUrlKey = function(title)
{
	return title.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]+/g, ""); 
}


isNullOrWhitespace =  function(stringValue) {
  return (typeof stringValue === 'undefined' || stringValue == null || stringValue.replace(/\s/g, '').length < 1);
};

getTmdbThumbnailUrl = function(poster_path)
{
  return this.isNullOrWhitespace(poster_path) ? null : "http://image.tmdb.org/t/p/w45/aaaaa" + poster_path;
};

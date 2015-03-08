window.loadGenreShow = function(genreInfo, element) {
  /* Load the Fluxxor store and render React components to the page */
  fluxGenresStore.init();
  React.render(<GenreDetail flux={fluxGenresStore.flux} genreId={genreInfo.genreId} endpointUrl={genreInfo.endpointUrl} name={genreInfo.name}
  	parentId={genreInfo.parentId} userId={genreInfo.userId} noUserAnchorHref={genreInfo.noUserAnchorHref} noUserAnchorText={genreInfo.noUserAnchorText}
  	defaultText={genreInfo.defaultText} descriptions={genreInfo.descriptions} />, 
    element);
}

var element = document.getElementById('genre-show-detail');

if(typeof element != 'undefined' && typeof genreInfo != 'undefined'){

	$(document).ready(function() {
	  window.loadGenreShow(genreInfo, element);
	});
}

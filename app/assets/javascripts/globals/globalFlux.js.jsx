window.loadGenreShow = function(genreInfo, element) {
  /* Load the Fluxxor store and render React components to the page */
  fluxGenresStore.init();
  React.render(<GenreDetail flux={fluxGenresStore.flux} genreInfo={genreInfo} />, element);
}

var element = document.getElementById('genre-show-detail');

if(typeof element != 'undefined' && typeof genreInfo != 'undefined'){

	$(document).ready(function() {
	  window.loadGenreShow(genreInfo, element);
	});
}

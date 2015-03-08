if(typeof fluxGenresStore == 'undefined') {
  var fluxGenresStore = {}; 
}

fluxGenresStore.init = function(genres) {
  var tempStore = {
    GenresStore: new fluxGenresStore.store({
      genres: genres
    })
  };
  fluxGenresStore.flux = new Fluxxor.Flux(tempStore, fluxGenresStore.actions);
}
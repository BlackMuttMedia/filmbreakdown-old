if(typeof fluxGenresStore == 'undefined') {
  var fluxGenresStore = {}; 
}

fluxGenresStore.store = Fluxxor.createStore({
  initialize: function(options) {
    /* We'll have genres */
    this.genres = options.genres || [];
    /* Those genres can be updated and deleted */
    this.bindActions(fluxGenresStore.constants.UPDATE_GENRE_DESCRIPTION, this.onUpdateDescription, 
      fluxGenresStore.constants.ADD_GENRE_DESCRIPTION, this.onAddDescription);
  },
  getState: function() {
    /* If someone asks the store what the genres are, show them */
    return {
      genres: this.genres,
    };
  },
  onUpdateDescription: function(payload) {
    /* Update the model if an ingredient is renamed */
    payload.ingredient.item = payload.new_name;
    this.emit("change")
  },
  onAddDescription: function(payload) {
    /* Update the model if an ingredient is deleted */
    this.genres = this.genres.filter(function(ingredient) {
      return ingredient.id != payload.ingredient.id
    });
    this.emit("change");
  }
});

  fluxGenresStore.init(null);
if(typeof fluxGenresStore == 'undefined') {
  var fluxGenresStore = {}; 
}

fluxGenresStore.actions = {
  updateIngredient: function(ingredient, new_name) {
    /* First, update the model by calling the function above */
    this.dispatch(fluxGenresStore.constants.UPDATE_INGREDIENT, {
      ingredient: ingredient,
      new_name: new_name
    });
    /* Then, update the server and show a success message */
    $.ajax({
      type: "PUT",
      url: "/ingredient_suggestions/" + ingredient.id,
      data: {
        item: new_name
      },
      success: function() {
        $.growl.notice({
          title: "Ingredient suggestion updated",
        });
      },
      failure: function() {
        $.growl.error({
          title: "Error updating ingredient suggestion",
        });
      }
    });
  },
  deleteIngredient: function(ingredient) {
    /* First, update the model by calling the function above */
    this.dispatch(fluxGenresStore.constants.DELETE_INGREDIENT, {
      ingredient: ingredient
    });
    /* Then, delete it on the server and show a success message */
    $.ajax({
      type: "DELETE",
      url: "/ingredient_suggestions/" + ingredient.id,
      success: function(data) {
        $.growl.notice({
          title: "Ingredient suggestion deleted",
        });
      }.bind(this),
      failure: function() {
        $.growl.error({
          title: "Error deleting ingredient suggestion",
        });
      }
    });
  }
};
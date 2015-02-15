var SearchBox = React.createClass({
	render: function() { 
		return (
			  <div className="row collapse">
	      		<div id="searchContainer" className="small-9 medium-9 large-10 columns">
	      			<SearchBoxInput />
	      		</div>
	      		<div className="small-3 medium-3 large-2 end columns">
	      			<a href="#" className="tiny button secondary">Go</a>
	      		</div>
	  		  </div>
		)
	}, 
});

var SearchBoxInput = React.createClass({
	render: function(){
	    return(
    		<input type="text" className="titleSearch" placeholder="Search For Movies" />
    	);
	},
	componentDidMount: function() {

	    $(this.getDOMNode()).autocomplete({
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

		  	var listItem = <SearchBoxItem baseImageUrl="http://image.tmdb.org/t/p/w45/" posterPath={item.poster_path} filmTitle={getFormattedTitle(item)} />;
		  	var renderedListItem = React.renderToString(listItem);

		  	$(ul).append(renderedListItem);
		  	$(ul[0].lastChild).data("ui-autocomplete-item", item);

	  		//React.render(listItem, ul[0]);
	    	return  ul;
	    }
	}
})

var SearchBoxItem = React.createClass({
     render: function() {
     	var searchBoxImage;

     	if(!isNullOrWhitespace(this.props.posterPath))
     	{
     		searchBoxImage = <SearchBoxItemImage baseImageUrl={this.props.baseImageUrl} posterPath={this.props.posterPath} />;
     	}
	    return(
          <li className="row">
            <div className="small-3 medium-3 large-3 column">
               {searchBoxImage}
            </div>
           <div className="small-9 medium-9 large-9 right">{this.props.filmTitle}</div>
       	  </li>
	    );
     }
});

var SearchBoxItemImage = React.createClass({
     render: function() {
        return(<img src={this.props.baseImageUrl + this.props.posterPath} />);
     }
});

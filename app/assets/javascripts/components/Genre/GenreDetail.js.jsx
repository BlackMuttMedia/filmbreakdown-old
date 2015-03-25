var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var GenreDetail = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin("GenresStore")],
  getStateFromFlux: function() {
    var flux = fluxGenresStore.flux; //this.getFlux();
    return {
      genres: flux.store("GenresStore").getState().genres
    };
  },
	getInitialState: function() {
		var config = theMovieDb.configurations.getConfiguration(this.setConfig, this.setError);
		var genres = theMovieDb.genres.getMovies({id: this.props.genreInfo.genreId, synchronous: true}, this.setFilms, this.setError);

		return {config: {}, films: new Array(), filmsPage: 0, error: {}};
	},
	render: function() { 
		var image, baseUrl, posterPath, backgroundPath, randomIndex;
		var summaryStyle = {
	    textShadow: '2px 2px 2px #444'
		};

		if(this.state.config.images && this.state.config.images.base_url)
		{
			baseUrl = this.state.config.images.base_url;
		}

		if( Object.prototype.toString.call( this.state.films ) === '[object Array]'  && this.state.films.length > 0) {
			randomIndex = Math.floor(Math.random() * this.state.films.length);
			backgroundPath = this.state.films[randomIndex].backdrop_path;
			//posterPath = this.state.films[randomIndex].poster_path;
		}

		return (
		  <div>
		  	<GenreBackground baseUrl={baseUrl} backgroundPath={backgroundPath} />
	  		<p className="notice"></p>
	  		<div className="row">
  			</div>
			  <div style={summaryStyle} className="row">
			    <GenreContent userid={this.props.genreInfo.userid} films={this.state.films} baseUrl='/films/' name={this.props.genreInfo.name} 
			    	parentId={this.props.genreInfo.parentId} defaultText={this.props.genreInfo.defaultText} endpointUrl={this.props.genreInfo.endpointUrl}
			    	noUserAnchorHref={this.props.genreInfo.noUserAnchorHref} noUserAnchorText={this.props.genreInfo.noUserAnchorText}
			    	descriptions={this.props.genreInfo.descriptions} />
			  </div>
			  <ElementSummaryReveal />
		  </div>
		);
	},
	setConfig: function(data){
		this.setState({config: JSON.parse(data)});
	},
	setFilms: function(data){
		var dataItem = JSON.parse(data);

		this.setState({filmsPage: dataItem.page, films: dataItem.results});
	},
	setError: function(data){
		this.setState({error: JSON.parse(data)});
	}
});



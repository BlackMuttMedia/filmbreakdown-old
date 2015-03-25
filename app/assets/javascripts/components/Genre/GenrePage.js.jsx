var GenrePage = React.createClass({
	getInitialState: function() {
		var self = this;
		theMovieDb.configurations.getConfiguration(this.setConfig, this.setError);
		theMovieDb.genres.getList({}, this.setGenres, this.setError);

		return {genres: [], error: {}};
	},
	render: function(){
		return <ItemList items={this.state.genres} baseItemUrl='/genres/' />
	},
	setConfig: function(data){
		var config = JSON.parse(data);

		if(config && config.images){
			this.setState({ config: config });
		}
	},
	setGenres: function(jsonData){
		var data = JSON.parse(jsonData);
		var mappedData = [];

		if(Object.prototype.toString.call( data.genres ) === '[object Array]')
		{
			var self = this;
			_.each(data.genres, function(item) {
				theMovieDb.genres.getMovies({id: item.id, synchronous: true}, self.setGenreFilms, self.setError);
				
				mappedData[item.id] = item;
			});
		} 

		this.setState({ genres: mappedData });
	},
	setGenreFilms: function(jsonData){
		var data = JSON.parse(jsonData);
		var backgroundPath;
		var failCount = 0;
		var newState = this.state.genres;

		while(!backgroundPath && failCount < 20)
		{
			if( Object.prototype.toString.call( data.results ) === '[object Array]'  && data.results.length > 0) {
				randomIndex = Math.floor(Math.random() * data.results.length);
				backgroundPath = data.results[randomIndex].backdrop_path;
			}

			failCount++;
		}

		if(backgroundPath)
		{
			var genre = newState[data.id];
			if(genre)
			{
				genre.backgroundPath = backgroundPath;
			}
		}

		this.setState({ genres: newState });
	},
	setError: function(data){
		this.setState({error: JSON.parse(data)});
	}
});

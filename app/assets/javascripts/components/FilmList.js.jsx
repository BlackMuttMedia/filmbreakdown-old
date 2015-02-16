var FilmList = React.createClass({
	getInitialState: function() {
		var self = this;
		theMovieDb.configurations.getConfiguration(this.setConfig, this.setError);
		_.each(this.props.filmIds, function(film){
			theMovieDb.movies.getById({id: film.tmdb_id, synchronous: true}, self.setFilm, self.setError);

		})

		return {films: [], error: {}};
	},
	render: function(){
		var items = this.getFilmListItems();

		return (
			<ul className="small-block-grid-1">
				{items}
			</ul>);
	},
	setConfig: function(data){
		var config = JSON.parse(data);
		if(config && config.images){
			this.setState({ baseUrl: config.images.base_url });
		}
	},
	setFilm: function(jsonData){
		var baseUrl, posterPath;
		var newState = Object.prototype.toString.call( this.state.films ) === '[object Array]' ? 
			this.state.films : [];
		var data = JSON.parse(jsonData);

		newState.push({ tmdbId: data.id, title: data.title, posterPath: data.poster_path, releaseDate: data.release_date  });
		newState = _.sortBy(newState, function(film){ return film.title });

		this.setState({ films: newState });
	},
	setError: function(data){
		this.setState({error: JSON.parse(data)});
	},
	getFilmListItems: function() {
		var self = this;

		var films = this.state.films.map(
			function(film){
				if(film.tmdbId == 0)
				{
					return;
				}

				return <FilmListItem key={film.tmdbId} tmdbId={film.tmdbId} title={film.title} posterPath={film.posterPath} releaseDate={film.releaseDate} baseUrl={self.state.baseUrl} />;
		});

		return films;
	}
});

var FilmListItem = React.createClass({
	render: function() {
		var filmUrl = getFilmUrl({ id: this.props.tmdbId, title: this.props.title });
		var listStyle = {
		};
		var anchorStyle = {
			margin: '0px',
			display: 'block',
			width: '100%',
			height: '100%'
		};

		return (
			<li style={listStyle}>
				<a href={filmUrl} style={anchorStyle}>
					<FilmListImage baseUrl={this.props.baseUrl} posterPath={this.props.posterPath} />
					<FilmListTitle title={this.props.title} />
				</a>
			</li>
		);
	}
});

var FilmListImage = React.createClass({
	render: function() {
		var image;

		if(this.props.baseUrl && this.props.posterPath)
		{
			image = <img className="th radius" src={this.props.baseUrl + 'w92' + this.props.posterPath} />;
		}

		return (
	    <div className="small-3 columns">
	    	<div className="row">
	    		<div className="small-12 columns">
			      {image}
		      </div>
	      </div>
	    </div>
		);
	}
});

var FilmListTitle = React.createClass({
	render: function() { 
		return (
			<div className="small-9 columns">
				{this.props.title}
			</div>
		);
	}
});


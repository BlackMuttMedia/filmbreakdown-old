var GenreList = React.createClass({
	getInitialState: function() {
		var self = this;
		theMovieDb.configurations.getConfiguration(this.setConfig, this.setError);
		theMovieDb.genres.getList({}, this.setGenres, this.setError);

		return {genres: [], error: {}};
	},
	render: function(){
		var items = this.getGenreListItems();

		return (
			<ul className="small-block-grid-2 medium-block-grid-4">
				{items}
			</ul>);
	},
	setConfig: function(data){
		var config = JSON.parse(data);

		if(config && config.images){
			this.setState({ baseUrl: config.images.base_url });
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
				
				mappedData[item.id] = { tmdbId: item.id, title: item.name };
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
	},
	getGenreListItems: function() {
		var self = this;
		var genres = []; 

		if(Object.prototype.toString.call( this.state.genres ) === '[object Array]')
		{
			genres = this.state.genres.map(
				function(genre){
					if(genre.tmdbId == 0)
					{
						return;
					}

					return <GenreListItem key={genre.tmdbId} tmdbId={genre.tmdbId} title={genre.title} baseUrl={self.state.baseUrl} backgroundPath={genre.backgroundPath} />;
			});
		}

		return genres;
	}
});

var GenreListItem = React.createClass({
	render: function() {
		var genreUrl = getGenreUrl({ id: this.props.tmdbId, title: this.props.title });
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
				<a href={genreUrl} style={anchorStyle}>
					<GenreListImage baseUrl={this.props.baseUrl} backgroundPath={this.props.backgroundPath} title={this.props.title} />
				</a>
			</li>
		);
	}
});

var GenreListImage = React.createClass({
	getInitialState: function() {
		var imageStyle = {
			zIndex: '-1',
			opacity: .6
		};

		return { imageStyle: imageStyle };
	},
	render: function() {
		var image;
		var divStyle = {
			position: 'relative'
		};

		if(this.props.baseUrl && this.props.backgroundPath)
		{
			image = React.DOM.img({
				onMouseEnter: this.__onMouseEnter,
				onMouseLeave: this.__onMouseLeave,
				className: 'th radius',
				style: this.state.imageStyle,
				src: this.props.baseUrl + 'w300' + this.props.backgroundPath
			});
		}

		return (
	    		<div style={divStyle}>
			      {image}&nbsp;
						<GenreListTitle title={this.props.title} />
		      </div>
		);
	},
	__onMouseEnter: function() {
		var imageStyle = this.state.imageStyle;
		imageStyle.opacity = 1;

		this.setState({ imageStyle: imageStyle });
	},
	__onMouseLeave: function() {
		var imageStyle = this.state.imageStyle;
		imageStyle.opacity = .6;

		this.setState({ imageStyle: imageStyle });
	}
});

var GenreListTitle = React.createClass({
	render: function() { 
		var titleStyle = {
			position: 'absolute',
			bottom: '28',
			left: '4',
			right: '4',
			padding: '0.4rem',
		  background: 'rgb(0, 0, 0)',
		  background: 'rgba(0, 0, 0, 0.7)'
		};

		return (
			<div style={titleStyle}>
				{this.props.title}
			</div>
		);
	}
});


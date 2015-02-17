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
			<ul className="no-bullet">
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
			mappedData = data.genres.map(function(item) {
				return { tmdbId: item.id, title: item.name };
			});
		} 

		this.setState({ genres: mappedData });
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

					return <GenreListItem key={genre.tmdbId} tmdbId={genre.tmdbId} title={genre.title} baseUrl={self.state.baseUrl} />;
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
					<GenreListImage baseUrl={this.props.baseUrl} posterPath={this.props.posterPath} />
					<GenreListTitle title={this.props.title} />
				</a>
			</li>
		);
	}
});

var GenreListImage = React.createClass({
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
			      {image}&nbsp;
		      </div>
	      </div>
	    </div>
		);
	}
});

var GenreListTitle = React.createClass({
	render: function() { 
		return (
			<div className="small-9 columns">
				{this.props.title}
			</div>
		);
	}
});


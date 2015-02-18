var FilmDetail = React.createClass({
	getInitialState: function() {
		var config = theMovieDb.configurations.getConfiguration(this.setConfig, this.setError);
		var film = theMovieDb.movies.getById({id: this.props.filmId, synchronous: true}, this.setFilm, this.setError);
		var credits = theMovieDb.movies.getCredits({id: this.props.filmId, synchronous: true}, this.setCredits, this.setError);

		return {film: {}, config: {}, credits: {}, error: {}};
	},
	render: function() { 
		var image, baseUrl, posterPath, backgroundPath;
		var summaryStyle = {
	    textShadow: '2px 2px 2px #444'
		};

		if(this.state.config.images && this.state.config.images.base_url && this.state.film.poster_path)
		{
			baseUrl = this.state.config.images.base_url;
			posterPath = this.state.film.poster_path;
			backgroundPath = this.state.film.backdrop_path;
		}

		return (

		  //<!-- First Band (Image) -->
		  <div>
		  	<FilmBackground baseUrl={baseUrl} backgroundPath={backgroundPath} />
			  <div style={summaryStyle} className="row summary">
		  		<p className="notice"></p>
			    <FilmPosterImage baseUrl={baseUrl} posterPath={posterPath} />
			    <FilmContent filmData={this.state.film} genres={this.state.genres} creditData={this.state.credits} />
			    <FilmConversation />
			  </div>
		  </div>
		);
	},
	setConfig: function(data){
		this.setState({config: JSON.parse(data)});
	},
	setFilm: function(data){
		var film = JSON.parse(data);
		var self = this;

		this.setState({film: film});

		if(Object.prototype.toString.call( film.genres ) === '[object Array]')
		{
			_.each(film.genres, function(item, index) {
				theMovieDb.genres.getMovies({id: item.id, synchronous: true}, self.setGenreFilms, self.setError);
			});
		} 
	},
	setCredits: function(data){
		this.setState({credits: JSON.parse(data)});
	},
	setGenreFilms: function(jsonData){
		var data = JSON.parse(jsonData);
		var backgroundPath;
		var failCount = 0;
		var newState = this.state.film;

		while(!backgroundPath && failCount < 20)
		{
			if( Object.prototype.toString.call( data.results ) === '[object Array]'  && data.results.length > 0) {
				randomIndex = Math.floor(Math.random() * data.results.length);
				backgroundPath = data.results[randomIndex].backdrop_path;
			}

			failCount++;
		}

		if(backgroundPath && newState && newState.genres)
		{
			_.findWhere(newState.genres, { id: data.id }).backgroundPath = backgroundPath;
		}

		this.setState({ film: newState });
	},
	setError: function(data){
		this.setState({error: JSON.parse(data)});
	}
});

var FilmPosterImage = React.createClass({
	render: function() {
		var image;

		if(this.props.baseUrl && this.props.posterPath)
		{
			image = <img className="th radius" src={this.props.baseUrl + 'w154' + this.props.posterPath} />;
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

var FilmBackground = React.createClass({
	render: function() {
		var backgroundStyle = {
			position: 'absolute',
	    backgroundSize: 'cover',
	    left: 0,
	    height: '100%',
	    width: '100%',
	    backgroundRepeat: 'no-repeat',
	    opacity: '0.4'
		};

		if(this.props.baseUrl && this.props.backgroundPath)
		{
			backgroundStyle.backgroundImage = 'url(' + this.props.baseUrl + 'w1280' + this.props.backgroundPath + ')';
		}

		return(
			<div style={backgroundStyle}></div>
		);
	}
});

var FilmContent = React.createClass({
	render: function() {
		var year, genres = [], cast = [], directors = [], cast = [];

		if(this.props.filmData && this.props.filmData.release_date)
		{
			year = this.props.filmData.release_date.substring(0,4);
		}

		if(this.props.filmData && this.props.filmData.genres)
		{
			genres = this.props.filmData.genres;
		}

		if(this.props.creditData)
		{
			directors = this.getDirectors();

			if(this.props.creditData.cast)
			{
				cast = this.getCast();
			}
		}

		return (
		    <div className="small-6 columns">
		    	<FilmTitle titleText={this.props.filmData.title} year={year} />
		    	<FilmOverview overviewText={this.props.filmData.overview} />
		    	<FilmDetailsList label="Directed By" items={directors} />
		    	<GenreSection genres={genres} />
		    	<FilmDetailsList label="Top Cast" items={cast} />
		    </div>
	    );
	},
	getGenres: function() {
		var genres = [];
		if(this.props.filmData.genres)
		{
			genres = this.props.filmData.genres;
		}
		return genres;
	},
	getDirectors: function() {
		var directors = _.where(this.props.creditData.crew, { department: "Directing"}).map(
			function(credit){
				return {id: credit.credit_id, name: credit.name}; 
		});

		return directors;
	},
	getCast: function() {		var castMembers = this.props.creditData.cast.map(
			function(cast){
				var displayValue = cast.name + ' ..... ' + cast.character;
				return { id: cast.cast_id, name: cast.name, displayValue: displayValue }; 
		});

		return castMembers;
	}
});

var FilmTitle = React.createClass({
	render: function() { 
		return (
		<div className="row">
			<div>
				<h1>{this.props.titleText}</h1>
			</div>
			<div>
				<h4 className="subheader">{this.props.year}</h4>
			</div>
		</div>
	)}
});

var GenreSection = React.createClass({
	render: function() {
		return(
  		<div className="row">
	    	<h5 className="small-4 columns">Genres</h5>
	    	<div className="small-8 columns">
	      	<ItemList items={this.props.genres} smallColumns="2" mediumColumns="2" largeColumns="2" baseItemUrl='/genres/' />
	      </div>
	    </div>
    );
	}
});

var FilmDetailsList = React.createClass({
	render: function() {
		var items = this.getItems();

  	return (
  		<div className="row">
	    	<h5 className="small-4 columns">{this.props.label}</h5>
	    	<h6 className="small-8 columns subheader">
	      	{items}
	      </h6>
	    </div>
    );
	},
	getItems: function() {
		var self = this;
		var details = this.props.items.map(
			function(item){
				var urlKey = item.id + '-' + item.name;
				return <FilmDetailItem key={item.id} name={item.name} urlKey={urlKey} baseUrl={self.props.baseUrl} displayValue={item.displayValue} />;
		});

		return details;
	}
});

var FilmDetailItem = React.createClass({
	render: function() {
		var detailItem;
		var label = this.props.displayValue || this.props.name;

		if(this.props.baseUrl)
		{
			var urlKey = getUrlKey((this.props.urlKey || this.state.key));
			var fullUrl = this.props.baseUrl + urlKey;
			detailItem = 
				<div className="row">
					<a href={fullUrl}>{label}</a>
				</div>;
		}
		else
		{
			detailItem = <div className="row">{label}</div>;
		} 

		return detailItem;
	}
});

var FilmOverview = React.createClass({
	render: function() { 
		return <p>{this.props.overviewText}</p>;
	}
});

var FilmConversation = React.createClass({
	render: function() {
		return <div className="small-3 columns" />;
	}
});

var FilmCreditTabs = React.createClass({
	render: function() {
		var tabStyle = {
	    textShadow: 'none'
		};

		return (
			<div className="row" style={tabStyle}>
				<ul className="tabs" data-tab>
				  <li className="tab-title active"><a href="#panel11">Tab 1</a></li>
				  <li className="tab-title"><a href="#panel21">Tab 2</a></li>
				  <li className="tab-title"><a href="#panel31">Tab 3</a></li>
				  <li className="tab-title"><a href="#panel41">Tab 4</a></li>
				</ul>
				<div className="tabs-content">
				  <div className="content active" id="panel11">
				    <p>This is the first panel of the basic tab example. You can place all sorts of content here including a grid.</p>
				  </div>
				  <div className="content" id="panel21">
				    <p>This is the second panel of the basic tab example. This is the second panel of the basic tab example.</p>
				  </div>
				  <div className="content" id="panel31">
				    <p>This is the third panel of the basic tab example. This is the third panel of the basic tab example.</p>
				  </div>
				  <div className="content" id="panel41">
				    <p>This is the fourth panel of the basic tab example. This is the fourth panel of the basic tab example.</p>
				  </div>
				</div>
			</div>
		);
	}
});
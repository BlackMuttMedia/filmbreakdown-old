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
			    <FilmPosterImage baseUrl={baseUrl} posterPath={posterPath} />
			    <FilmContent filmData={this.state.film} creditData={this.state.credits} />
			    <FilmConversation />
			  </div>
		  </div>
		);
	},
	setConfig: function(data){
		this.setState({config: JSON.parse(data)});
	},
	setFilm: function(data){
		this.setState({film: JSON.parse(data)});
		this.render();
	},
	setCredits: function(data){
		this.setState({credits: JSON.parse(data)});
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
			image = <img src={this.props.baseUrl + 'w154' + this.props.posterPath} />;
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
		var year;
		if(this.props.filmData && this.props.filmData.release_date)
		{
			year = this.props.filmData.release_date.substring(0,4);
		}
		return (
		    <div className="small-6 columns">
		    	<FilmTitle titleText={this.props.filmData.title} year={year} />
		    	<FilmOverview overviewText={this.props.filmData.overview} />
		    	<FilmDirectorList	creditData={this.props.creditData} />
		    </div>
	    );
	}
})

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

var FilmDirectorList = React.createClass({
	render: function() {
		var directors = this.getDirectors();

  	return (
  		<div className="row">
	    	<h5 className="small-4 columns">Directed By</h5>
	    	<h6 className="small-8 columns subheader">
	      	{directors}
	      </h6>
	    </div>
    );
	},
	getDirectors: function() {
		var directors = _.where(this.props.creditData.crew, { department: "Directing"}).map(
			function(credit){
				return <FilmDirector key={credit.credit_id} name={credit.name} />;
		});

		return directors;
	}
})

var FilmDirector = React.createClass({
	render: function() {
		return <div className="row">{this.props.name}</div>;
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
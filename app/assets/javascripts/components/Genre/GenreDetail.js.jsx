var GenreDetail = React.createClass({
	getInitialState: function() {
		var config = theMovieDb.configurations.getConfiguration(this.setConfig, this.setError);
		var genres = theMovieDb.genres.getMovies({id: this.props.genreId, synchronous: true}, this.setFilms, this.setError);

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
			    <GenreContent userid={this.props.userid} films={this.state.films} baseUrl='/films/' name={this.props.name} 
			    	parentId={this.props.parentId} defaultText={this.props.defaultText} endpointUrl={this.props.endpointUrl}
			    	noUserAnchorHref={this.props.noUserAnchorHref} noUserAnchorText={this.props.noUserAnchorText}
			    	descriptions={this.props.descriptions} />
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

var GenreBackground = React.createClass({
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

var GenreContent = React.createClass({
	render: function() {
		//console.log(this.props.films);
		var films = (this.props.films || new Array())
			.map(function(item){
				return { id: item.id, name: item.title, backgroundPath: item.backdrop_path };
			});
		var headerRowStyle = {
			position: 'relative'
		};

		var headerContentStyle = {
			position: 'absolute',
			bottom: '0px',
			right: '0px'
		};

		return (
		    <div className="small-12 columns">
		    	<div className="row" style={headerRowStyle}>
		    		<div className="small-9 columns">
				    	<GenreTitle name={this.props.name} />
				    	<PostListComponent anchorText="Add Description ..." postText="Post Description" 
				    		placeholderText="Enter a description ..." parentId={this.props.parentId}
				    		endpointUrl={this.props.endpointUrl} defaultText={this.props.defaultText}
				    		userid={this.props.userid} noUserAnchorHref={this.props.noUserAnchorHref} 
				    		noUserAnchorText={this.props.noUserAnchorText} posts={this.props.descriptions} />
				    	<hr />
			    	</div>
		    	</div>
		    	<div className="row">
		    		<div className="small-9 columns">
		    			<ItemList items={films} baseItemUrl='/films/' />
	    			</div>
	    			<div className="small-3 columns">
			    		{false ? <GenreConversationHeader genrename={this.props.name} /> : null }
					    <TabbedSidebar />
			    	</div>
		    	</div>
		    </div>
	    );
	}
});

var GenreTitle = React.createClass({
	render: function() { 
		return (
		<div className="row">
			<div>
				<h1>{this.props.name}</h1>
			</div>
		</div>
	)}
});

var DetailsList = React.createClass({
	render: function() {
		var items = this.getItems();
		var fullClass='';

		return (
			<ul className={fullClass}>
				{items}
			</ul>);
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
		var details = [];

		if( Object.prototype.toString.call( this.props.items ) === '[object Array]' ) {
			details = this.props.items.map(
				function(item){
					return <DetailItem key={item.id} id={item.id} name={item.name} baseUrl={self.props.baseUrl} displayValue={item.displayValue} />;
			});
		}

		return details;
	}
});

var DetailItem = React.createClass({
	render: function() {
		var detailItem;
		var label = this.props.displayValue || this.props.name;

		if(this.props.baseUrl)
		{
			var fullUrl = this.props.baseUrl + this.props.id + '-' + getUrlKey(this.props.name);

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

var GenreConversationHeader = React.createClass({
	render: function() {
		var headerStyle = {
			fontWeight: 'bold',
			fontSize: '125%',
			paddingBottom: '10px'
		};

		return(
			<div style={headerStyle}>
				{this.props.genrename} Details
			</div>
		);
	}
})
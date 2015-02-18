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

var ItemList = React.createClass({
	getInitialState: function() {
		var self = this;
		theMovieDb.configurations.getConfiguration(this.setConfig, this.setError);

		return {items: [], error: {}};
	},
	render: function(){
		var items = this.getItemListItems();
		var smallClass = 'small-block-grid-' + (this.props.smallColumns ? this.props.smallColumns : '2');
		var mediumClass = ' medium-block-grid-' + (this.props.mediumColumns ? this.props.mediumColumns : '4');
		var largeClass = this.props.largeColumns ? (' large-block-grid-' + this.props.largeColumns) : '';
		var fullClass = smallClass + mediumClass + largeClass;

		return (
			<ul className={fullClass}>
				{items}
			</ul>);
	},
	setConfig: function(data){
		var config = JSON.parse(data);

		if(config && config.images){
			this.setState({ config: config });
		}
	},
	setError: function(data){
		this.setState({error: JSON.parse(data)});
	},
	getItemListItems: function() {
		var self = this;
		var items = [], backdropSize; 

		if(Object.prototype.toString.call( this.props.items ) === '[object Array]' && self.state.config 
				&& self.state.config.images && self.state.config.images.backdrop_sizes)
		{
			items = this.props.items.map(
				function(item){
					if(item.id == 0)
					{
						return;
					}
					backdropSize = self.state.config.images.backdrop_sizes[0];

					return (<ItemListItem key={item.id} id={item.id} title={item.name} 
										baseUrl={self.state.config.images.base_url} backgroundPath={item.backgroundPath} 
										size={backdropSize} baseItemUrl={self.props.baseItemUrl} />);
			});
		}

		return items;
	}
});

var ItemListItem = React.createClass({
	render: function() {
		var itemUrl = getItemUrl({ id: this.props.id, title: this.props.title, baseUrl: this.props.baseItemUrl });
		var listStyle = {
		};
		var anchorStyle = {
			margin: '0px',
			display: 'block',
			position: 'relative'
		};

		return (
			<li style={listStyle}>
				<a href={itemUrl} style={anchorStyle}>
					<GenreListImageBody baseUrl={this.props.baseUrl} backgroundPath={this.props.backgroundPath} size={this.props.size} title={this.props.title} />
				</a>
			</li>
		);
	}
});

var GenreListImageBody = React.createClass({
	render: function() {
		var image;
		var divStyle = {
			position: 'relative'
		};

		if(this.props.baseUrl && this.props.backgroundPath && this.props.size)
		{
			var imageWidth = this.props.size.substring(1);
			image = <LabeledImage src={this.props.baseUrl + this.props.size + this.props.backgroundPath} 
								title={this.props.title} imageWidth={imageWidth} />;
		}

		return (
	    		<div ref="mainDiv" style={divStyle}>
			      {image}
		      </div>
		);
	}
});

var LabeledImage = React.createClass({
	getInitialState: function() {
		var imageStyle = {
			zIndex: '-1',
			opacity: .6
		};

		var divStyle = {
			backgroundColor: "rgb(70,70,70)"
		};

		var titleStyle = {
			position: 'absolute',
			bottom: '4',
			left: '4',
			right: '4',
			padding: '0.4rem',
		  background: 'rgb(0, 0, 0)',
		  background: 'rgba(0, 0, 0, 0.7)'
		};

		return { imageStyle: imageStyle, divStyle: divStyle, titleStyle: titleStyle };
	},
	render: function() {
		return (
			<div style={this.state.divStyle}>
				<img className='th radius' style={this.state.imageStyle} onMouseLeave={this.__onMouseLeave} 
						onMouseEnter={this.__onMouseEnter} src={this.props.src}
						ref="image" />
				<GenreListTitle titleStyle={this.state.titleStyle} title={this.props.title} />
			</div>
		);
	},
	componentDidMount: function() { 
		var imageNode = this.refs['image'].getDOMNode();
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

		return (
			<div style={this.props.titleStyle}>
				{this.props.title}
			</div>
		);
	}
});


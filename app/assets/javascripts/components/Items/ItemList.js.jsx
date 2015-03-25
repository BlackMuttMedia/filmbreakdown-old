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
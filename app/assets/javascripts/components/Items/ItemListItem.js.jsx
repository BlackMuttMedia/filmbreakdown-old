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
					<ItemListImageBody baseUrl={this.props.baseUrl} backgroundPath={this.props.backgroundPath} size={this.props.size} title={this.props.title} />
				</a>
			</li>
		);
	}
});

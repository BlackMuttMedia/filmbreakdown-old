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

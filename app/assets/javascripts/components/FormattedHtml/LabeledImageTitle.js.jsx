var LabeledImageTitle = React.createClass({
	render: function() { 

		return (
			<div style={this.props.titleStyle}>
				{this.props.title}
			</div>
		);
	}
});

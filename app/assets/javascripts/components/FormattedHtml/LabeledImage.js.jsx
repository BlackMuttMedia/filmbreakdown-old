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
				<LabeledImageTitle titleStyle={this.state.titleStyle} title={this.props.title} />
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
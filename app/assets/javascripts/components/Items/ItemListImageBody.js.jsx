var ItemListImageBody = React.createClass({
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

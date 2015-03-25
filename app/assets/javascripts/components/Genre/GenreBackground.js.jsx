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

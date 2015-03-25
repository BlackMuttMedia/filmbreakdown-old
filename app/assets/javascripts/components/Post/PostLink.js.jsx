var PostLink = React.createClass({
	render: function() {
		var postLink;
		if(this.props.userid > 0){
			postLink = <a onClick={this.props.handleClick} href={this.props.anchorHref || '#'}>{this.props.anchorText || 'Add Post ...'}</a>;
		}
		else{
			postLink = <a href={this.props.noUserAnchorHref || '#'}>{this.props.noUserAnchorText || 'Log In to Add Post ...'}</a>;
		}

		return(
			<div className="row">
				<div className="small-12 text-right columns">
					{postLink}
				</div>
			</div>
		);
	}
});

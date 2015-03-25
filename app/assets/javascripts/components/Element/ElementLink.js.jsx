var ElementLink = React.createClass({
	render: function() {
		var ElementLink;
		if(this.props.userid > 0){
			ElementLink = <a onClick={this.props.handleClick} href={this.props.anchorHref || '#'}>{this.props.anchorText || 'Add Element ...'}</a>;
		}
		else{
			ElementLink = <a href={this.props.noUserAnchorHref || '#'}>{this.props.noUserAnchorText || 'Log In to Add Element ...'}</a>;
		}

		return(
			<div className="row">
				<div className="small-12 text-right columns">
					{ElementLink}
				</div>
			</div>
		);
	}
});

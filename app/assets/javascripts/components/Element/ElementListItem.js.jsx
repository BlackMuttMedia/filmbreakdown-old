var ElementListItem = React.createClass({
	render: function() {
		return(
			<div className="row">
				<div className="small-12 columns">
					<p>{this.props.itemContent}</p>
					{ this.props.showSeparator == true ? <hr /> : null }
				</div>
			</div>
		);
	}
});

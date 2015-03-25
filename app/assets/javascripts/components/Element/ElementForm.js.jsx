var ElementForm = React.createClass({
	render: function() {
		return(
			<div className="row">
				<div className="small-12 columns">
					<div className="row">
						<div className="small-12 columns">
							<textarea ref="ElementContent" placeholder={this.props.placeholderText}></textarea>
						</div>
					</div>
					<div className="row">
						<div className="small-12 text-right columns">
							<a onClick={this.handleSubmit} href="#">{this.props.ElementText || 'Element'}</a>
						</div>
					</div>
				</div>
			</div>
		);
	},
	handleSubmit: function(e) {
		var ElementContent = this.refs.ElementContent.getDOMNode().value.trim();
		this.props.handleElement({ ElementContent: ElementContent }, e);
	}
});

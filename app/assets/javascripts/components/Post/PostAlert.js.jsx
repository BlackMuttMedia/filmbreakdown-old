var PostAlert = React.createClass({
	render: function() {
		return (
			<div data-alert className={this.props.alertClass}>
			  {this.props.alertMessage}
			  <a onClick={this.props.handleClose} href="#" className="close">&times;</a>
			</div>
	);
	}
});

var ElementSummary = React.createClass({
	render: function(){

		return (
			<div>
				<h2>{this.props.heading}</h2>
				<PostDisplay genreName={this.props.genreName} elementName={this.props.elementName} />
				<PostDisplay genreName={this.props.genreName} elementName={this.props.elementName} />
				<PostDisplay genreName={this.props.genreName} elementName={this.props.elementName} />
				<div className="row">
					<div className="small-12 columns text-right">
						<a href="#">Add more ...</a>
					</div>
				</div>
			</div>
		);
	},
	handleClick: function(e) {
		this.refs['foundationReveal'].handleClick(e);
	}
});

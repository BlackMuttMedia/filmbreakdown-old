var ElementSummaryReveal = React.createClass({
	render: function(){
		var revealContent = 
			<div>
				<h2>Summary</h2>
				<PostDisplay genreName={this.props.genreName} elementName={this.props.elementName} />
				<PostDisplay genreName={this.props.genreName} elementName={this.props.elementName} />
				<PostDisplay genreName={this.props.genreName} elementName={this.props.elementName} />
			</div>;

		return (
			<FoundationReveal ref='foundationReveal' revealContent={revealContent} revealStyle={this.props.revealStyle} />
		);
	},
	handleClick: function(e) {
		this.refs['foundationReveal'].handleClick(e);
	}
});

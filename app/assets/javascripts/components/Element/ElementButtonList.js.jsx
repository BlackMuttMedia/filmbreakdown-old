var ElementButtonList = React.createClass({
	getInitialState: function() {

		return { elementName: null, genreName: null };
	},
	render: function() {
		var categoryHeaderStyle = {
			fontWeight: 'bold'
		};

		var buttonStyle = {
			padding: '8px;'
		};
		var item = <ElementSummary heading={this.state.genreName + ' Summary'} genreName={this.state.genreName} elementName={this.state.elementName} />;

		return( 
			<div className="row">
				<div className="small-12 columns">
					<span style={categoryHeaderStyle}>Atmosphere</span>
					<div className="row">
						<div className="small-12 columns">
							<ul className="inline-list">
				        {_.map(this.props.items, function(item, i) {
				          return (
				            <li key={i}><a href="#" onClick={this.handleClick.bind(this, i)} style={buttonStyle} className="button tiny radius">{item}</a></li>
				          );
				        }, this)}
							</ul>
						</div>
					</div>
				</div>
				<FoundationReveal ref='summaryReveal' revealContent={item} revealStyle={this.props.revealStyle} />
			</div>
		);
	},
	handleClick: function(i, e) {
		e.preventDefault();
		var elementName = this.props.items[i];
		var genreName = "Adventure";
		this.setState({ elementName: elementName, genreName: genreName }, 
			function() { this.refs.summaryReveal.handleClick(); });
	}
});

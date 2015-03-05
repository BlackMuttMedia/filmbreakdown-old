var PlaceHolderGenreConversation = React.createClass({
	render: function() {
		var categoryHeaderStyle = {
			fontWeight: 'bold'
		};

		var buttonStyle = {
			padding: '8px;'
		};

		var revealStyle = {
			color: '#666666'
		};

		return( 
			<div className="small-12 columns">
				<h2>{this.props.heading}</h2>
				<div className="row">
					<div className="small-12 columns">
						<span style={categoryHeaderStyle}>Atmosphere</span>
						<div className="row">
							<div className="small-12 columns">
								<ul className="inline-list">
									<li><a href="#" onClick={this.handleClick} style={buttonStyle} className="button tiny radius">Bleak</a></li>
									<li><a href="#" onClick={this.handleClick} style={buttonStyle} className="button tiny radius">Dark</a></li>
									<li><a href="#" onClick={this.handleClick} style={buttonStyle} className="button tiny radius">Chilling</a></li>
									<li><a href="#" onClick={this.handleClick} style={buttonStyle} className="button tiny radius">Ugly</a></li>
									<li><a href="#" onClick={this.handleClick} style={buttonStyle} className="button tiny radius">Scary</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="small-12 columns">
						<span style={categoryHeaderStyle}>Stock Characters</span>
						<div className="row">
							<div className="small-12 columns">
								<ul className="inline-list">
									<li><a href="#" onClick={this.handleClick} style={buttonStyle} className="button tiny radius">Detective</a></li>
									<li><a href="#" onClick={this.handleClick} style={buttonStyle} className="button tiny radius">Goofy Sidekick</a></li>
									<li><a href="#" onClick={this.handleClick} style={buttonStyle} className="button tiny radius">Femme Fatale</a></li>
									<li><a href="#" onClick={this.handleClick} style={buttonStyle} className="button tiny radius">Corrupt Police Officer</a></li>
									<li><a href="#" onClick={this.handleClick} style={buttonStyle} className="button tiny radius">Anti-Hero</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="small-12 columns">
						<span style={categoryHeaderStyle}>Techniques</span>
						<div className="row">
							<div className="small-12 columns">
								<ul className="inline-list">
									<li><a href="#" onClick={this.handleClick} style={buttonStyle} className="button tiny radius">Long Take</a></li>
									<li><a href="#" onClick={this.handleClick} style={buttonStyle} className="button tiny radius">Dutch Angle</a></li>
									<li><a href="#" onClick={this.handleClick} style={buttonStyle} className="button tiny radius">Low Angle</a></li>
									<li><a href="#" onClick={this.handleClick} style={buttonStyle} className="button tiny radius">Backlighting</a></li>
									<li><a href="#" onClick={this.handleClick} style={buttonStyle} className="button tiny radius">Establishing Shots</a></li>
								</ul>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="small-12 columns text-right">
							<a href="#">Add more ...</a>
						</div>
					</div>
				</div>
				<ElementSummaryReveal ref='summaryReveal' revealStyle={revealStyle} />
			</div>
		);
	},
	handleClick: function(e) {
		this.refs['summaryReveal'].handleClick(e);
	}
});
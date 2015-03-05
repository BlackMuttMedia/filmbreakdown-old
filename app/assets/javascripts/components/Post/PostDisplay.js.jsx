var PostDisplay = React.createClass({
	render: function(){
		var isSidebar = this.props.sidebar && this.props.sidebar === true;
		var ratingsClass =  isSidebar ?
			"small-12 columns" :
			"small-6 medium-2 columns";

		var ratingsCountClass = isSidebar ?
			"small-12 medium-6 columns" :
			"small-3 medium-2 large-1 columns";

		var userClass = isSidebar ? 
			"small-12 columns" : 
			"small-12 medium-6 large-8 columns text-right";

		return (
			<div className="row">
				<div className="small-12 columns">
					<div className="panel radius">
						<div className="row">
							<div className="small-12 columns">
								<p>The {this.props.genreName} uses the {this.props.elementName} in such a way. It helps to communicate the fragility of fragile things 
								and the reasons for the way our faces are.</p>
							</div>
						</div>
						<div className="row">
							<div className={ratingsClass}>Ratings:</div>
							<div className={ratingsCountClass}><i className="fi-arrow-up alert"></i>300</div>
							<div className={ratingsCountClass}><i className="fi-arrow-down alert"></i>-20</div>
							<div className={userClass}>
								Jimmy Userguy
							</div>
						</div>
					</div>
				</div>
			</div>
		)}
});
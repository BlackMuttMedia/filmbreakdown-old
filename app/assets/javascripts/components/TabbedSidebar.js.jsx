var TabbedSidebar = React.createClass({
	render: function(){
		var panelStyle = {
	    textShadow: 'none'
		};

		var postDisplay = <PostDisplay sidebar={true} />;
		var elementButtonList = <ElementButtonList items={['Bleak', 'Dark', 'Chilling', 'Ugly', 'Scary']} />;

		return(
			<div style={this.props.panelStyle || panelStyle}>
			  <TabbedSidebarItem contentItem={elementButtonList} />
			  <TabbedSidebarItem contentItem={postDisplay} />
			</div>
		);
	}
});

var TabbedSidebarItem = React.createClass({
	render: function() {
		return(
		  <section role="tabpanel" aria-hidden="false" className="content active" id="panel2-1">
		  	<div className="row">
		  		<div className="small-12 columns">
		  			<h4>Contexts</h4>
		  		</div>
		  	</div>
		  	<div className="row">
		  		<div className="small-12 columns">
						{this.props.contentItem}
					</div>
				</div>
		  	<div className="row">
		  		<div className="small-6 columns">
						<a href="#" onClick={this.handleAddClick}>Add ...</a>
					</div>
		  		<div className="small-6 columns text-right">
						<a href="#" onClick={this.handleMoreClick}>See More ...</a>
					</div>
				</div>
		  </section>
		)
	},
	handleMoreClick: function(e) {
		alert('Showing More');

		e.preventDefault();
	},
	handleAddClick: function(e) {
		alert('Showing Add');
		
		e.preventDefault();
	}
});
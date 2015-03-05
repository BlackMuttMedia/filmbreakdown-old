var TabbedSidebar = React.createClass({
	render: function(){
		var panelStyle = {
	    textShadow: 'none'
		};

		var postDisplay = <PostDisplay sidebar={true} />;
		var elementButtonList = <ElementButtonList items={['Bleak', 'Dark', 'Chilling', 'Ugly', 'Scary']} />;

		return(
			<div style={this.props.panelStyle || panelStyle}>
			  <TabbedSidebarItem contentItem={elementButtonList} heading="Elements" />
			  <TabbedSidebarItem contentItem={postDisplay} heading="Contexts" />
			</div>
		);
	}
});

var TabbedSidebarItem = React.createClass({
	render: function() {
		var seeMoreContent = this.props.heading == 'Elements' ? 
			<PlaceHolderGenreConversation /> :
			<ElementSummary heading="See More" genreName="See More" elementName="Seymour" />;
		var addContent = <AddPlaceholder />;

		return(
		  <section role="tabpanel" aria-hidden="false" className="content active" id="panel2-1">
		  	<div className="row">
		  		<div className="small-12 columns">
		  			<h4>{this.props.heading}</h4>
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
					<FoundationReveal ref="moreReveal" revealContent={seeMoreContent} />
					<FoundationReveal ref="addReveal" revealContent={addContent} />
				</div>
		  </section>
		)
	},
	handleMoreClick: function(e) {
		this.refs.moreReveal.handleClick(e);
		e.preventDefault();
	},
	handleAddClick: function(e) {
		this.refs.addReveal.handleClick(e);
		e.preventDefault();
	}
});

var AddPlaceholder = React.createClass({
	render: function(){
		return(
			<div>
				<h2>Add New Things</h2>
				<div className="row">
					<div className="small-12 columns">
						<p>
							This is just a placeholder add new content. You could have a form here to add to stuff and things.
							There would be a few things that could go here. For one, you can add new contexts, like the place that a film 
							or a genre has in history. You could bring up things like how Expressionism came about because of the 
							state that Germany was in after war made them broke, the bleak nature of Noir as a result of the 
							realities of war ... apparently, how all genres relate to war.
						</p>
					</div>
				</div>
				<div className="row">
					<div className="small-12 columns">
						<input type="text" placeholder="Post Conteent Goes Here ..." /> 
					</div>
				</div>
				<div className="row">
					<div className="small-12 columns">
						<input type="text" placeholder="Here's Another Field ..." />
					</div>
				</div>
				<div className="row">
					<div className="small-12 columns">
						<input type="text" placeholder="And Finally This Field ..." />
					</div>
				</div>
				<div className="row">
					<div className="small-12 columns">
						<input type="submit" />
					</div>
				</div>
			</div>
		);
	}
});
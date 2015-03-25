var GenreContent = React.createClass({
	render: function() {
		//console.log(this.props.films);
		var films = (this.props.films || new Array())
			.map(function(item){
				return { id: item.id, name: item.title, backgroundPath: item.backdrop_path };
			});
		var headerRowStyle = {
			position: 'relative'
		};

		var headerContentStyle = {
			position: 'absolute',
			bottom: '0px',
			right: '0px'
		};

		return (
		    <div className="small-12 columns">
		    	<div className="row" style={headerRowStyle}>
		    		<div className="small-9 columns">
				    	<GenreTitle name={this.props.name} />
				    	<PostListComponent anchorText="Add Description ..." postText="Post Description" 
				    		placeholderText="Enter a description ..." parentId={this.props.parentId}
				    		endpointUrl={this.props.endpointUrl} defaultText={this.props.defaultText}
				    		userid={this.props.userid} noUserAnchorHref={this.props.noUserAnchorHref} 
				    		noUserAnchorText={this.props.noUserAnchorText} posts={this.props.descriptions} />
				    	<hr />
			    	</div>
		    	</div>
		    	<div className="row">
		    		<div className="small-9 columns">
		    			<ItemList items={films} baseItemUrl='/films/' />
	    			</div>
	    			<div className="small-3 columns">
			    		{false ? <GenreConversationHeader genrename={this.props.name} /> : null }
					    <TabbedSidebar />
			    	</div>
		    	</div>
		    </div>
	    );
	}
});

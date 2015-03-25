var PostList = React.createClass({
	render: function() {
		var self = this;
		var posts = this.props.posts;
		return (
			<div className="row">
				<div className="small-12 columns">
					{posts && typeof posts[0] !== 'undefined' && posts[0] !== null ? 
						posts.map(function(post){
							return <PostListItem key={post.id} itemContent={post.content} showSeparator={self.props.showSeparator} />
						}) : 
						<p>{this.props.defaultText}</p>
					} 
				</div>
			</div>
		);
	}
});

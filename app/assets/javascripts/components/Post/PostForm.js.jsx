var PostForm = React.createClass({
	render: function() {
		return(
			<div className="row">
				<div className="small-12 columns">
					<div className="row">
						<div className="small-12 columns">
							<textarea ref="postContent" placeholder={this.props.placeholderText}></textarea>
						</div>
					</div>
					<div className="row">
						<div className="small-12 text-right columns">
							<a onClick={this.handleSubmit} href="#">{this.props.postText || 'Post'}</a>
						</div>
					</div>
				</div>
			</div>
		);
	},
	handleSubmit: function(e) {
		var postContent = this.refs.postContent.getDOMNode().value.trim();
		this.props.handlePost({ postContent: postContent }, e);
	}
});

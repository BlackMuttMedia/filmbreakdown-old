var PostListComponent = React.createClass({
  getInitialState: function() {
      return { 
      	showPostBox: false, 
      	showPostLink: true, 
      	posts: this.props.posts, 
      	postContent: null,
      	showAlert: false,
      	alertMessage: null,
      	alertClass: null };
  },
	render: function() {
		return(
			<div>				
				<div className="row">
					<div className="small-12 columns">
						{this.props.header ? <PostHeader headerContent={this.props.header} /> : null }
						<PostList posts={this.state.posts} showSeparator={this.props.showSeparator} defaultText={this.props.defaultText} />
						{ this.state.showAlert ? <PostAlert alertMessage={this.state.alertMessage} alertClass={this.state.alertClass } handleClose={this.hideAlert} /> : null }
						{ this.state.showPostBox ? <PostForm postText={this.props.postText} placeholderText={this.props.placeholderText} handlePost={this.handleSubmit} /> : null }
						{ this.state.showPostLink ? <PostLink anchorText={this.props.anchorText} handleClick={this.showPostBox} userid={this.props.userid}
								noUserAnchorHref={this.props.noUserAnchorHref} noUserAnchorText={this.props.noUserAnchorText}  /> : null }
					</div>
				</div>
			</div>
		);
	},
	showPostBox: function(e) {
    this.setState({ showPostBox: true, showPostLink: false });
    e.preventDefault();
	},
	handleSubmit: function(data, e) {
		var postContent = data.postContent;
		var postData = { 
			parentId: this.props.parentId, 
			content: postContent,
			userid: this.props.userid
		};

		this.setState({ postContent: postContent });

		$.ajax({
		  type: "POST",
		  url: this.props.endpointUrl,
		  data: postData,
		  success: this.handleSubmitSuccess,
		  error: this.handleSubmitFailure,
		  dataType: 'json'
		});

		e.preventDefault();
	},
	handleSubmitSuccess: function(data){
		if(data.status == 'ok') {
			var posts = this.state.posts || [];
			posts.push(data.object)

			this.setState({
				alertMessage: this.props.successMessage || 'Post submitted' ,
				alertClass: 'alert-box success radius',
				showAlert: true,
				posts: posts,
				showPostBox: false, 
				showPostLink: true 
			});
		}
		else{
			this.setState({
				alertMessage: data.message || 'There was an error submitting your post' ,
				alertClass: 'alert-box alert radius',
				showAlert: true
			});
		}
	},
	handleSubmitFailure: function(xhr, ajaxOptions, thrownError){
			this.setState({
				alertMessage: thrownError || 'There was an error submitting your post' ,
				alertClass: 'alert-box alert radius',
				showAlert: true
			});
	},
	hideAlert: function(e)
	{
		this.setState({
			alertMessage: null,
			alertClass: null,
			showAlert: false
		});
		e.preventDefault();
	}
});

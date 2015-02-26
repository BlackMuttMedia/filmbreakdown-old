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
						{ this.state.showPostBox ? <PostForm postText={this.props.postText} placeholderText={this.props.placeholderText} handlePost={this.handleSubmit} /> : null }
						{ this.state.showAlert ? <PostAlert alertMessage={this.state.alertMessage} alertClass={this.state.alertClass } handleClose={this.hideAlert} /> : null }
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
	hidePostBox: function(e) {
    this.setState({ showPostBox: false, showPostLink: true });
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

		this.hidePostBox(e);
	},
	handleSubmitSuccess: function(data){
		//var posts = this.state.posts || [];
		//posts.push(data.newPost);

		if(data.status == 'ok') {
			console.log(data);
			var posts = this.state.posts || [];
			posts.push(data.object)

			this.setState({
				alertMessage: this.props.successMessage || 'Post submitted' ,
				alertClass: 'alert-box success radius',
				showAlert: true,
				posts: posts
			});
		}
		else{
			this.setState({
				alertMessage: data.message || 'There was an error submitting your post' ,
				alertClass: 'alert-box alert radius',
				showAlert: true
			});
		}

		//this.setState({ posts: posts });
	},
	handleSubmitFailure: function(xhr, ajaxOptions, thrownError){
        alert(xhr.status);
        alert(thrownError);
		//var posts = this.state.posts || [];
		//posts.push(data.newPost);
			this.setState({
				alertMessage: data.message || 'There was an error submitting your post' ,
				alertClass: 'alert-box alert radius'
			});

		//this.setState({ posts: posts });
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

var PostHeader = React.createClass({
	render: function() { 
		return (
			<h1>{this.props.headerContent}</h1>
		);
	}
});

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

var PostListItem = React.createClass({
	render: function() {
		return(
			<div className="row">
				<div className="small-12 columns">
					<p>{this.props.itemContent}</p>
					{ this.props.showSeparator == true ? <hr /> : null }
				</div>
			</div>
		);
	}
});

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

var PostLink = React.createClass({
	render: function() {
		var postLink;
		if(this.props.userid > 0){
			postLink = <a onClick={this.props.handleClick} href={this.props.anchorHref || '#'}>{this.props.anchorText || 'Add Post ...'}</a>;
		}
		else{
			postLink = <a href={this.props.noUserAnchorHref || '#'}>{this.props.noUserAnchorText || 'Log In to Add Post ...'}</a>;
		}

		return(
			<div className="row">
				<div className="small-12 text-right columns">
					{postLink}
				</div>
			</div>
		);
	}
});

var PostAlert = React.createClass({
	render: function() {
		return (
			<div data-alert className={this.props.alertClass}>
			  {this.props.alertMessage}
			  <a onClick={this.props.handleClose} href="#" className="close">&times;</a>
			</div>
	);
	}
})

/*var header = 'Post Mock';
var anchorText = 'Add a description ...';
var posts =
	[
	  {id: 1, content: "Boy, am I a wonderful description of things and stuff."},
	  {id: 2, content: "I'm another great description. Boy am I descriptive"},
	  {id: 3, content: "What's with those other descriptions? What's wrong with Lorem Ipsum?"}
	];
var targetElement = document.getElementById('reactContent');

if(targetElement) {
	React.render(<PostListWithHeader anchorText={anchorText} header={header} posts={posts} />, targetElement);
}*/


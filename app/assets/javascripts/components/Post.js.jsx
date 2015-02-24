var Post = React.createClass({
  getInitialState: function() {
      return { showPostBox: false, showPostLink: true };
  },
	render: function(){
		return (
			<div>
				{ this.state.showPostBox ? <ReactPostBox anchorText='Post' handlePost={this.hidePostBox} /> : null }
				{ this.state.showPostLink ? <ReactPostLink anchorText={this.props.anchorText} handleClick={this.showPostBox} /> : null }
			</div>
		);
	},
	handleClick: function(){
		var reveal = this.refs['postReveal'].getDOMNode();
		$(reveal).foundation('reveal', 'open');
	},
	showPostBox: function(e) {
    this.setState({ showPostBox: true, showPostLink: false });
    e.preventDefault();
	},
	hidePostBox: function(e) {
    this.setState({ showPostBox: false, showPostLink: true });
    e.preventDefault();
	}
});

var ReactPostBox = React.createClass({
	render: function() {
		return(
				<div className="row">
					<div className="small-12 right columns">
						<div className="row hidden input" ref="postBox">
							<div className="small-12 right columns">
								<textarea onEnter={this.props.handlePost} ref="postContent" />
							</div>
						</div>
						<div className="row hidden input" ref="postButton">
							<div className="small-12 text-right columns">
								<a onClick={this.props.handlePost} href="#">{this.props.anchorText}</a>
							</div>
						</div>
					</div>
				</div>
		);
	}
});

var ReactPostLink = React.createClass({
	render: function() {
		return(
			<div className="row" ref="addLink">
				<div className="small-12 text-right columns">
					<a onClick={this.props.handleClick} href="#">{this.props.anchorText}</a>
				</div>
			</div>
		);
	}
});

var ReactPostReveal = React.createClass({
	render: function() {
		return(
			<div ref="postReveal" className="reveal-modal" data-reveal>
				<form>
					<p>{this.props.revealHeader}</p>
					<div class="row">
						<div class="small-12 columns">
							<input type="text" placeholder={this.props.placeholderText} />
						</div>
					</div>
					<div class="row">
						<div class="small-12 columns">
							<input type="submit">Submit</input>
						</div>
					</div>
					<a className="close-reveal-modal">&#215;</a>
				</form>
			</div>
		);
	}
});


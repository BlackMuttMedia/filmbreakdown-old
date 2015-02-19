var Post = React.createClass({
	render: function(){
		return (
			<div>
				<div className="row">
					<div className="small-12 right columns">
						<a onClick={this.handleClick} href="#">{this.props.anchorText}</a>
					</div>
				</div>
				<div ref="postReveal" className="reveal-modal" data-reveal>
					<form>
						<h2>{this.props.revealHeader}</h2>
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
			</div>
		);
	},
	handleClick: function(){
		var reveal = this.refs['postReveal'].getDOMNode();
		$(reveal).foundation('reveal', 'open');
	}
});